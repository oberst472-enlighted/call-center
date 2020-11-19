<template>
    <div class="test-call-page">
        <div class="test-call-page__video-wrapper">
            <video id="localVideo" ref="userVideo" autoplay class="test-call-page__video" muted playsinline></video>
            <video id="remoteVideo" ref="partnerVideo" autoplay class="test-call-page__video" muted></video>
        </div>

        <div>
            <div>{{ userStream }}</div>
            <br>
            <div>
                {{ partnerStream }}
            </div>
            <uiBtn @click="pickUpThePhone">Ответить на звонок</uiBtn>
        </div>
    </div>
</template>

<script>

import RecordRTC from 'recordrtc'
import axios from 'axios'

export default {
    data() {
        return {
            recoder: null,
            socket: null,
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
            // callCenterId: '5f119d7ee6b5a61d04e7cba9'
        }
    },
    methods: {
        log(title = 'console group title', text = '', color = 'aqua') {
            console.group(`%c ${title}`, `font-size: 13px; color: ${color}; border: 1px solid ${color}`);
            console.info(text);
            console.log('');
            console.groupEnd();
        },
        socketConnect() {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im9wZXJhdG9yIiwiZXhwIjoxNjA1ODA1NDI2LCJlbWFpbCI6bnVsbCwib3JpZ19pYXQiOjE2MDU3MTkwMjZ9.FDqzr8RyIniVk2UAsJXyGfu-OaukZNDhj5zVYEwdmcM'
            const callCenterId = 'Q2FsbENlbnRlcjox'
            const type = 'operator'
            const url = `wss://vc-dev.enlighted.ru/ws/call-center-channel/${callCenterId}/?type=${type}&token=${token}`


            this.socket = new WebSocket(url)

            this.socket.addEventListener('open', this.socketOpen)
            this.socket.addEventListener('error', this.socketError)
            this.socket.addEventListener('message', this.socketMessage)
            this.socket.addEventListener('close', this.socketClose)
        },
        socketRetryConnect() {
            console.info('повторная попытка подключения к сокету')
            setTimeout(() => {
                this.socketConnect()
            }, 5000)
        },
        socketDisconnect() {
            if (this.socket) {
                this.socket.close(1000)
                this.isSocketOpen = false
            }
        },
        socketOpen() {
            this.log('socketOpen', 'Cокет соединение открыто')
            this.isSocketOpen = true
        },
        socketError() {
            console.error('ошибка сокет соединения')
            this.socketRetryConnect()
        },
        socketMessage(data) {
            this.messageProcessing(data)
        },
        socketClose() {
            this.log('socketClose', 'Cокет соединение закрыто', 'red')
        },
        getJsonFromString(payload) {
            return JSON.parse(payload)
        },
        getStringFromJson(payload) {
            return JSON.stringify(payload)
        },

        async messageProcessing(data) {
            const payload = this.getJsonFromString(data.data)

            const info = payload.data
            const eventName = payload.event

            const isIncomingCallEvent = eventName === 'incoming_call' //идет запрос на звонок от терминала
            const isEndCallByEvent = eventName === 'end_call_by' //терминал завершил звонок
            const isCallAnsweredEvent = eventName === 'call_answered' //оператор поднял трубку
            const isMessageEvent = eventName === 'message' // пришло сообщение от терминала


            if (isIncomingCallEvent) {
                this.log('isEndCallByEvent', `Идет запрос на звонок от терминала, id звонка: ${info.call_id}`)
                this.log('isEndCallByEvent', info)
                this.callID = info.call_id
                this.videoToken = info['video_token']
                this.videoID = info['video_id']
            }

            if (isEndCallByEvent) {
                this.log('isEndCallByEvent', 'Терминал завершил звонок')
                this.stopCall()
            }


            if (isCallAnsweredEvent) {
                this.log('isCallAnsweredEvent', `Оператор снял трубку: id звонка ${info.call_id}`)
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
    },
    watch: {
        partnerStream() {
            if (this.userStream) {
                this.startRecord()
            }
        }
    },

    mounted() {
        this.socketConnect()
    },
    beforeDestroy() {
        this.socketDisconnect()
    }
}
</script>

<style lang="scss">
.test-call-page {
    width: 100%;
    outline: 1px solid red;
    height: 300px;

    &__video-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 100%;
        margin-bottom: 30px;

    }

    &__video {
        width: calc(50% - 15px);
        height: 300px;
        outline: 1px solid red

    }

    &__call-btn {
        display: block;
        margin: 10px auto;
        padding: 5px;
        font-size: 20px;
    }

    &__callcenter {
        height: 40px;
        margin: 0 auto;
        margin-top: 10px;
        padding: 5px;
        font-size: 13px;

        &-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
        }
    }
}
</style>
