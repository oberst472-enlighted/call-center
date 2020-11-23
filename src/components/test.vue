<template>
    <div class="test-call-page">
        <div class="test-call-page__video-wrapper">
            <video id="localVideo" ref="userVideo" autoplay class="test-call-page__video" muted playsinline></video>
            <video id="remoteVideo" ref="partnerVideo" autoplay class="test-call-page__video"></video>
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
            lol: false,

            peer: null,

            userStream: '',

            options: {audio: true, video: true},

            callID: '',
            clientChannel: '',
            constraints: {
                // iceServers: [
                //     { urls: 'stun:vc-dev.enlighted.ru:3478' },
                //     {
                //         urls: 'turn:vc-dev.enlighted.ru:3478',
                //         username: 'tab1',
                //         credential: '123456',
                //     },
                // ],
                // iceServers: [
                //     { urls: 'stun:stun.l.google.com:19302' },
                //     { urls: 'stun:stun1.l.google.com:19302' },
                //     { urls: 'stun:stun2.l.google.com:19302' },
                //     { urls: 'stun:stun3.l.google.com:19302' },
                //     {
                //         urls: 'turn:vc-dev.enlighted.ru:3478',
                //         username: 'tab1',
                //         credential: '123456',
                //     },
                // ],
                iceServers: [
                    { url: 'stun:stun1.l.google.com:19302' },
                    { url: 'stun:stun2.l.google.com:19302' },
                    { url: 'stun:stun3.l.google.com:19302' },
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
            console.group(`%c ${title}`, `font-size: 13px; color: ${color}; border: 1px solid ${color}`)
            console.info(text)
            console.groupEnd()
        },
        socketConnect() {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
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
            const isEndCallByEvent = eventName === 'end_call_by' //терминал заершил звонок
            const isCallAnsweredEvent = eventName === 'call_answered' //оператор поднял трубку
            const isMessageEvent = eventName === 'message' // пришло сообщение от терминала


            if (isIncomingCallEvent) {
                this.log('isEndCallByEvent', `Идет запрос на звонок от терминала, id звонка: ${info.call_id}`)
                this.callID = info.call_id
            }

            if (isEndCallByEvent) {
                this.log('isEndCallByEvent', 'Терминал завершил звонок')
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
                    if (this.lol) {
                        this._handleNewICECandidateMsg(data.candidate)
                    }
                }

                if (isOfferEvent) {

                    this.lol = true
                    await this._createAnswer(data)
                }
            }
        },

        _handleNewICECandidateMsg(incoming) {
            const candidate = new RTCIceCandidate(incoming)
            try {
                console.log(55)
                console.log(this.peer)
                this.peer.addIceCandidate(candidate)
            } catch (e) {
                this.log('_handleNewICECandidateMsg-1', candidate, 'red')
                this.log('_handleNewICECandidateMsg-2', e, 'red')
            }
        },

        async _mediaStream() {
            const stream = await navigator.mediaDevices.getUserMedia(this.options)

            this.$refs.userVideo.srcObject = stream
            this.userStream = stream
            console.log(this.userStream)

            await this._callUser()
        },

        // eslint-disable-next-line require-await
        async _callUser() {
            // await this._createPeer()
            // this.userStream.getTracks().forEach(track => this.peer.addTrack(track, this.userStream));
        },

        async _createPeer() {
            const stream = await navigator.mediaDevices.getUserMedia(this.options)
            console.log(stream)
            this.$refs.userVideo.srcObject = stream
            this.userStream = stream
            this.peer = await new RTCPeerConnection(this.constraints)

            this.userStream.getTracks().forEach(track => this.peer.addTrack(track, this.userStream))

            this.peer.onicecandidate = e => {
                this.log('onicecandidate1', 'ice кандидат пришел', 'yellow')
                this.log('onicecandidate2', e, 'yellow')
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
                    this.log('ontrack', 'Монтирование видео партнера', 'lightgreen')
                    console.log(e.streams[0])
                    console.log(this.$refs.partnerVideo.srcObject)
                } else {
                    this.log('ontrack', e, 'red')
                }
            }
            // eslint-disable-next-line require-await

        },

        async _createAnswer(payload) {
            await this._createPeer()

            const desc = new RTCSessionDescription(payload.sdp)
            // this.userStream.getTracks().forEach(track => this.peer.addTrack(track, this.userStream))
            // this.peer.addTrack(this.userStfghbitkream)

            //передаем offer терминала в в webRTC с помощью setRemoteDescription
            await this.peer.setRemoteDescription(desc)
            const answer = await this.peer.createAnswer()
            await this.peer.setLocalDescription(new RTCSessionDescription(answer))
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
    height: 300px;
    outline: 1px solid red;

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
