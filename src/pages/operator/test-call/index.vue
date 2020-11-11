<template>
    <div class="test-call-page">
        <div class="test-call-page__video-wrapper">
            <video id="localVideo" ref="localVideo" autoplay class="test-call-page__video" muted playsinline></video>
            <video id="remoteVideo" ref="remoteVideo" autoplay class="test-call-page__video" playsinline></video>
        </div>

        <div>
            <uiBtn @click="pickUpThePhone">Ответить на звонок</uiBtn>
        </div>

        <!--        <div v-if="isBtnsPanelActive">-->
        <!--            <button @click="callAnswer">Принять звонок</button>-->
        <!--            <button @click="callAnswer">Отклонить звонок</button>-->
        <!--        </div>-->


        <!--        <div v-if="isCallStart">-->
        <!--            <p>Идет звонок</p>-->
        <!--            <button @click="callClose">Завершить звонок</button>-->
        <!--        </div>-->
    </div>
</template>

<script>

export default {
    data() {
        return {
            socket: null,
            isSocketOpen: false,

            callID: ''
            // callCenterId: '5f119d7ee6b5a61d04e7cba9'
        }
    },
    methods: {
        socketConnect() {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im9wZXJhdG9yIiwiZXhwIjoxNjA1MTYyNzQ0LCJlbWFpbCI6bnVsbCwib3JpZ19pYXQiOjE2MDUwNzYzNDR9.xTDeA8CukaQKMCnVE_kdc4tpj80Fwj64buY-A33gM_s'
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

        messageProcessing(data) {
            const payload = this.getJsonFromString(data.data)

            const info = payload.data
            const eventName = payload.event

            const isIncomingCallEvent = eventName === 'incoming_call' //идет запрос на звонок от терминала
            const isCallAnsweredEvent = eventName === 'call_answered' //оператор поднял трубку
            const isMessageEvent = eventName === 'message' // пришло сообщение от терминала

            if (data.type === 'message') {
                if (isIncomingCallEvent) {
                    console.info(`идет запрос на звонок от терминала, id звонка: ${info.call_id}`)
                    this.callID = info.call_id
                }

                if (isCallAnsweredEvent) {
                    console.info(`оператор снял трубку: id звонка ${info.call_id}`)
                }

                if (isMessageEvent) {
                    // eslint-disable-next-line no-unused-vars
                    const {from: clientChannel, message_data: messageData} = info
                    console.info(`пришло сообщение от терминала с id канала: ${clientChannel} на установку webRTC`)

                    setTimeout(() => {
                        const data = {
                            to: clientChannel,
                            message_data: {
                                lol: 'test-operator'
                            }
                        }
                        this.sendMessage('message_to', data)
                    }, 3000);
                }


            }
            else {
                console.info('data.type !== message')
            }
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
