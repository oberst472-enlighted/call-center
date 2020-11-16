<template>
    <div class="test-call-page">
        <div class="test-call-page__video-wrapper">
            <video id="localVideo" ref="userVideo" autoplay class="test-call-page__video" muted playsinline></video>
            <video id="remoteVideo" ref="partnerVideo" autoplay class="test-call-page__video" muted></video>
        </div>

        <div>
            <uiBtn @click="pickUpThePhone">Ответить на звонок</uiBtn>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            socket: null,
            isSocketOpen: false,
            lol: '',

            peer: null,

            userStream: '',

            options: {audio: true, video: true},

            callID: '',
            clientChannel: '',
            constraints: {
                configuration: {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                },
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
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            },
            // callCenterId: '5f119d7ee6b5a61d04e7cba9'
        }
    },
    methods: {
        socketConnect() {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im9wZXJhdG9yIiwiZXhwIjoxNjA1NTkyNzM1LCJlbWFpbCI6bnVsbCwib3JpZ19pYXQiOjE2MDU1MDYzMzV9.Oa4pgwi1mXp-OsBukEtNWkugsHjlCWXR3S_blmfoAzM'
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
            console.info('сокет соединение открыто')
            this.isSocketOpen = true
        },
        socketError() {
            console.error('ошибка сокет соединения')
            this.socketRetryConnect()
        },
        socketMessage(data) {
            // console.info('---получены данные по сокет соединению')
            this.messageProcessing(data)
        },
        socketClose() {
            console.error('сокет соединение закрыто')
            this.socketRetryConnect()
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
            const isCallAnsweredEvent = eventName === 'call_answered' //оператор поднял трубку
            const isMessageEvent = eventName === 'message' // пришло сообщение от терминала


            if (isIncomingCallEvent) {
                console.info(`идет запрос на звонок от терминала, id звонка: ${info.call_id}`)
                this.callID = info.call_id
            }

            if (isCallAnsweredEvent) {
                console.info(`оператор снял трубку: id звонка ${info.call_id}`)
                // await this._mediaStream()
            }

            if (isMessageEvent) {
                this.clientChannel = info.from
                const messageData = info.message_data
                const data = messageData.data

                const isIceCandidateEvent = messageData.event === 'ice-candidate'
                const isOfferEvent = messageData.event === 'offer' //получение офера с терминала


                if (isIceCandidateEvent) {
                    await this._handleNewICECandidateMsg(data.candidate)

                }

                if (isOfferEvent) {
                    await this._createAnswer(data)
                }

            }
        },

        async _handleNewICECandidateMsg(incoming) {
            const candidate = await new RTCIceCandidate(incoming)
            this.peer.addIceCandidate(candidate)
                .catch(e => console.log(e))
        },

        async _mediaStream() {
            const stream = await navigator.mediaDevices.getUserMedia(this.options)

            this.$refs.userVideo.srcObject = stream
            this.userStream = stream
            console.log(this.userStream)

            await this._callUser()
        },

        async _callUser() {
            console.log(111)
            await this._createPeer()
            this.userStream.getTracks().forEach(track => this.peer.addTrack(track, this.userStream));
        },

        async _createPeer() {
            this.peer = await new RTCPeerConnection(this.constraints)

            this.peer.onicecandidate = e => {
                console.log('ONICECANDIDATE')
                console.log(e.candidate)
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
                console.log('ОТРАБОТАЛ ONTRACK!!!!!')
                if (e) {
                    console.log('загружаем видео в partner')
                    this.$refs.partnerVideo.srcObject = e.streams[0]
                } else {
                    console.log('ontrack не отработал, e пустой!!!')
                }
            }
            // this.peer.onnegotiationneeded = () => {
            //     console.log(1234)
            //     this._createAnswer(this.lol)
            // }
        },

        async _createAnswer(payload) {
            await this._mediaStream()
            console.log(payload)
            const desc = await new RTCSessionDescription(payload.sdp)
            console.log(desc)
            await this.peer.setRemoteDescription(desc)

            // this.userStream.getTracks().forEach(track => this.peer.addTrack(track, this.userStream));

            // await this._mediaStream()

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
    },

    mounted() {
        console.log(66)
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
