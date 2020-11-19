<template>
    <div class="layout-default">
        <aside class="layout-default__aside">
            <div class="layout-default__aside-box">
                <router-view name="aside"/>
            </div>
        </aside>

        <main class="layout-default__body">
            <header class="layout-default__header">
                <div class="wrapper">
                    <router-view name="header"/>
                </div>
            </header>

            <section class="layout-default__main">
                <div class="wrapper">
                    <router-view/>
                </div>
            </section>
        </main>

        <div class="layout-default__call-video" v-if="true">
            <SectionCallVideo/>
        </div>
    </div>
</template>

<script>
import {customLog} from '@/utils/console-group'
import {mapState, mapMutations, mapActions} from 'vuex'
import SectionCallVideo from '@/components/sections/call-video'
import RecordRTC from 'recordrtc'
import axios from 'axios'

export default {
    components: {
        SectionCallVideo
    },
    data() {
        return {
            socket: null,
            socketRetryConnectTime: 5000, //повторно подключение при разрыве соединения,
            audio: new Audio('/assets/call-melody.mp3'),

            recoder: null,
            isSocketOpen: false,

            peer: null,

            userStream: '',
            partnerStream: '',

            options: {audio: true, video: true},

            callID: '',
            clientChannel: '',
            videoToken: '',
            videoID: '',

            constraints: {
                iceServers: [
                    {url: 'stun:stun1.l.google.com:19302'},
                    {url: 'stun:stun2.l.google.com:19302'},
                    {url: 'stun:stun3.l.google.com:19302'},
                    {
                        url: 'turn:coturn.sverstal.ru:3478',
                        username: 'tab1',
                        credential: '123456',
                    },
                ],
            },
            offerOptions: {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            },
        }
    },
    computed: {
        ...mapState('socket', ['isIncomingCall'])
    },
    methods: {

        ...mapActions('socket', ['incomingCall']),
        ...mapMutations('socket', ['TOGGLE_INCOMING_CALL']),
        getJsonFromString(payload) {
            return JSON.parse(payload)
        },
        getStringFromJson(payload) {
            return JSON.stringify(payload)
        },
        _socketConnect() {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im9wZXJhdG9yIiwiZXhwIjoxNjA1ODA1NDI2LCJlbWFpbCI6bnVsbCwib3JpZ19pYXQiOjE2MDU3MTkwMjZ9.FDqzr8RyIniVk2UAsJXyGfu-OaukZNDhj5zVYEwdmcM'
            const callCenterId = 'Q2FsbENlbnRlcjox'
            const type = 'operator'
            const url = `wss://vc-dev.enlighted.ru/ws/call-center-channel/${callCenterId}/?type=${type}&token=${token}`


            this.socket = new WebSocket(url)

            this.socket.addEventListener('open', this._socketOpen)
            this.socket.addEventListener('error', this._socketError)
            this.socket.addEventListener('message', this._socketMessage)
            this.socket.addEventListener('close', this._socketClose)
        },
        _socketRetryConnect() {
            customLog('socketRetryConnect', 'Повторная попытка подключения к сокету')
            setTimeout(() => {
                this._socketConnect()
            }, this.socketRetryConnectTime)
        },
        _socketDisconnect() {
            if (this.socket) {
                this.socket.close(1000)
                this.isSocketOpen = false
            }
        },
        _socketOpen() {
            customLog('socketOpen', 'Cокет соединение открыто')
            this.isSocketOpen = true
        },
        _socketError() {
            customLog('_socketError', 'Ошибка сокет соединения', 'red')
            this._socketRetryConnect()
        },
        _socketMessage(data) {
            this._messageProcessing(data)
        },
        _socketClose() {
            customLog('socketClose', 'Cокет соединение закрыто', 'red')
        },

        async _messageProcessing(data) {
            const payload = this.getJsonFromString(data.data)

            const info = payload.data
            const eventName = payload.event

            const isIncomingCallEvent = eventName === 'incoming_call' //идет запрос на звонок от терминала
            const isEndCallByEvent = eventName === 'end_call_by' //терминал завершил звонок
            const isCallAnsweredEvent = eventName === 'call_answered' //оператор поднял трубку
            const isMessageEvent = eventName === 'message' // пришло сообщение от терминала


            if (isIncomingCallEvent) {
                customLog('isIncomingCallEvent', `Входящий звонок, id звонка: ${info.call_id}`)
                this.incomingCall(info)
                this.TOGGLE_INCOMING_CALL()
            }

            if (isEndCallByEvent) {
                customLog('isEndCallByEvent', 'Терминал завершил звонок')
                // this.stopCall()
            }


            if (isCallAnsweredEvent) {
                customLog('isIncomingCallEvent', `Оператор снял трубку: id звонка ${info.call_id}`)
            }

            if (isMessageEvent) {
                this.clientChannel = info.from
                const messageData = info.message_data
                const data = messageData.data

                const isIceCandidateEvent = messageData.event === 'ice-candidate'
                const isOfferEvent = messageData.event === 'offer' //получение офера с терминала

                if (isIceCandidateEvent) {
                    this._handleNewICECandidateMsg(data.candidate)
                }

                if (isOfferEvent) {
                    await this._createAnswer(data)
                }
            }
        },

        _handleNewICECandidateMsg(incoming) {
            const candidate = new RTCIceCandidate(incoming)
            try {
                this.peer.addIceCandidate(candidate)
            } catch (e) {
                this.log('_handleNewICECandidateMsg-1', candidate, 'red')
                this.log('_handleNewICECandidateMsg-2', e, 'red')
            }
        },

        async _createPeer() {
            this.peer = await new RTCPeerConnection(this.constraints)

            this.peer.onicecandidate = e => {
                if (e.candidate) {

                    const data = {
                        to: this.clientChannel,
                        message_data: {
                            event: 'ice-candidate',
                            data: {
                                event: 'ice-candidate',
                                candidate: e.candidate,
                            }
                        }
                    }

                    this.sendMessage('message_to', data)
                }
            }

            this.peer.ontrack = e => {
                if (e) {
                    this.$refs.partnerVideo.srcObject = e.streams[0]
                    this.partnerStream = e.streams[0]
                    this.log('ontrack', 'Монтирование видео партнера', 'lightgreen')
                } else {
                    this.log('ontrack', e, 'red')
                }
            }
            // eslint-disable-next-line require-await

            const stream = await navigator.mediaDevices.getUserMedia(this.options)

            this.$refs.userVideo.srcObject = stream
            this.userStream = stream
            console.log(this.userStream)
        },

        async _createAnswer(payload) {
            await this._createPeer()
            const desc = await new RTCSessionDescription(payload.sdp)
            this.userStream.getTracks().forEach(track => this.peer.addTrack(track, this.userStream))

            //передаем offer терминала в в webRTC с помощью setRemoteDescription
            await this.peer.setRemoteDescription(desc)

            const answer = await this.peer.createAnswer(this.offerOptions)
            await this.peer.setLocalDescription(answer)
            const data = {
                to: this.clientChannel,
                message_data: {
                    event: 'answer',
                    data: {
                        sdp: this.peer.localDescription
                    }
                }
            }
            this.sendMessage('message_to', data)
        },


        pickUpThePhone() {
            const data = {
                call_id: this.callID
            }
            this.sendMessage('picked_up', data)
        },
        sendMessage(eventName, data) {
            const payload = {
                event: eventName,
                data
            }
            this.socket.send(this.getStringFromJson(payload))
        },

        stopCall() {
            this.stopRecord()
        },

        startRecord() {
            this.recorder = RecordRTC([this.userStream, this.partnerStream], {
                type: 'video',
                checkForInactiveTracks: true,
                timeSlice: 1000,
                // ondataavailable(blob) {
                //     console.log('has data');
                // },
                // onStateChange(state) {
                //     console.log(state)
                // },
            })
            this.recorder.startRecording()
        },
        stopRecord() {

            if (this.recorder) {
                this.recorder.stopRecording(() => {
                    const blob = this.recorder.getBlob()
                    console.log(blob)
                    const data = new FormData()

                    data.append('video_file', blob, 'long.webm')

                    console.log(data)
                    console.log(`Authorization: token ${this.videoToken}`)
                    const lol = `/videos/${this.videoID}/`
                    axios.patch(lol, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `token ${this.videoToken}`
                        },
                    }).then(result => {
                        console.log(result)
                    })
                        .catch(e => {
                            console.log(e)
                        })

                    this.recorder.destroy()
                    this.recorder = null
                })
            } else {
                console.log('recorder not found')
            }


        },

        startAudio() {
            const promise = this.audio.play()
            if (promise !== undefined) {
                promise.then(() => {
                    customLog('startAudio', 'Звук звонка работает')
                }).catch(error => {
                    customLog('startAudio', 'Звук звонка не работает', 'red')
                    customLog('startAudio', error, 'red')
                });
            }
        },
    },
        watch: {
            isIncomingCall: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.startAudio()
                    }
                }
            },
            partnerStream() {
                if (this.userStream) {
                    this.startRecord()
                }
            }
        },
        created() {
            this._socketConnect()
        }
}

</script>

<style lang="scss" scoped>
.layout-default {
    display: flex;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;

    &__header {
    }

    &__body {
        flex-grow: 1;
        height: 100vh;
        max-height: 100vh;
        overflow: auto;
        display: flex;
        flex-direction: column;


    }

    &__aside {
        display: flex;
        flex-shrink: 0;
        height: 100vh;
        transition: all ease 0.3s;

        &-box {
            top: 0;
            left: 0;
            display: flex;
            width: inherit;
        }
    }

    &__call-video {
        position: fixed;
        top: 0;
        left: 0;
        background-color: red;
        z-index: 10;
    }

    &__main {
        flex-grow: 1;
        display: flex;
    }

    &--aside-active {
        .layout-default__aside {
            width: 200px;
        }
    }
}
</style>
