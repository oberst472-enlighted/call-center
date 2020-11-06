<template>
    <div class="test-call-page">
        <div class="test-call-page__video-wrapper">
            <video id="localVideo" ref="localVideo" autoplay class="test-call-page__video" muted playsinline></video>
            <video id="remoteVideo" ref="remoteVideo" autoplay class="test-call-page__video" playsinline></video>
        </div>

        <template v-if="callingSessionActive">
            <button class="test-call-page__call-btn" @click="onStopBtnClick">Stop</button>
        </template>

        <template v-else>
            <div class="test-call-page__callcenter-wrapper">
                <span>Callceter ID</span>
                <input v-model="callCenterId" class="test-call-page__callcenter" placeholder="CallCenter ID" type="text">
            </div>
            <button class="test-call-page__call-btn" @click="onCallBtnClick">Call</button>
        </template>
    </div>
</template>

<script>
import io from '@/assets/js/socket.io'
import {baseAppUrl} from '@/utils/const'

export default {
    data() {
        return {
            socket: null,
            isSocketOpen: false,

            localStream: null,
            pc: null,
            callingSessionActive: false,
            callCenterId: '5f119d7ee6b5a61d04e7cba9'
        }
    },
    methods: {
        socketConnect() {
            const callCenterId = 'Q2FsbENlbnRlcjox'
            const url = `wss://vc-dev.enlighted.ru/ws/call-center-channel/${callCenterId}/`

            const socketMessageListener = data => {
                console.log('send message')
                console.log(data)
            }

            const socketOpenListener = () => {
                this.isSocketOpen = true
                console.log('open socket')
            }

            const socketErrorListener = evt => {
                console.log('socketErrorListener')
                console.log(evt)
            }

            const socketCloseListener = () => {
                console.log('socketCloseListener')
                if (this.socket) {
                    this.isSocketOpen = false
                }
                if (!this.isSocketOpen) {
                    this.socket = new WebSocket(url)
                    this.socket.addEventListener('open', socketOpenListener)
                    this.socket.addEventListener('error', socketErrorListener)
                    this.socket.addEventListener('message', socketMessageListener)
                    this.socket.addEventListener('close', socketCloseListener)
                }
            }
            socketCloseListener()
        },
        socketDisconnect() {
            if (this.socket) {
                this.socket.close(1000)
                this.isSocketOpen = false
            }
        },
        onCallBtnClick() {
            console.log('click call')
        },
        onStopBtnClick() {
            console.log('click stop')
        }
    },
    mounted() {
        this.socketConnect()
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
