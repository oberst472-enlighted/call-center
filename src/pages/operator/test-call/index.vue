<template>
    <div class="test-call-page">
        <div class="test-call-page__video-wrapper">
            <video id="localVideo" ref="localVideo" autoplay class="test-call-page__video" muted playsinline></video>
            <video id="remoteVideo" ref="remoteVideo" autoplay class="test-call-page__video" playsinline></video>
        </div>

        <div>
            <button @click="onCallBtnClick">Начать webRTC соединение</button>
        </div>

        <div>
            <h3>Мой ID: </h3><span id="myid"></span>
        </div>

        <div v-if="isBtnsPanelActive">
            <button @click="callAnswer">Принять звонок</button>
            <button @click="callAnswer">Отклонить звонок</button>
        </div>


        <div v-if="isCallStart">
            <p>Идет звонок</p>
            <button @click="callClose">Завершить звонок</button>
        </div>
    </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import Peer from 'peerjs'

export default {
    data() {
        return {
            socket: null,
            isSocketOpen: false,
            peer: '',
            peercall: '',


            isBtnsPanelActive: false,
            isCallStart: false,

            callCenterId: '5f119d7ee6b5a61d04e7cba9'
        }
    },
    methods: {
        socketConnect() {
            // const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im9wZXJhdG9yIiwiZXhwIjoxNjA0NzQ3ODU4LCJlbWFpbCI6bnVsbCwib3JpZ19pYXQiOjE2MDQ2NjE0NTh9.rhWZgXdEGLdNrRMS-2z_NMsAYoodi9SYZ4pg92fwYfU'
            const callCenterId = 'Q2FsbENlbnRlcjox'
            const type = 'operator'
            const url = `wss://vc-dev.enlighted.ru/ws/call-center-channel/${callCenterId}/?type=${type}&token=${token}`

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
                return true
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
            this.call()
        },
        onStopBtnClick() {
            console.log('click stop')
        },

        call() {
            const options = {
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
            }
            this.peer = new Peer({config: options});
            console.log(this.peer)
            this.peer.on('open', peerID => {
                console.log(66)
                document.getElementById('myid').innerHTML = peerID;
            });
            console.log(77)

            this.peer.on('call', call => {
                // Answer the call, providing our mediaStream
                this.peercall = call;
                this.isBtnsPanelActive = true
            });

        },
        callAnswer() {
            console.log('answer')
            navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(mediaStream => {
                let video = this.$refs.localVideo
                this.peercall.answer(mediaStream); // отвечаем на звонок и передаем свой медиапоток собеседнику
                //peercall.on ('close', onCallClose); //можно обработать закрытие-обрыв звонка
                video.srcObject = mediaStream; //помещаем собственный медиапоток в объект видео (чтоб видеть себя)
                this.isCallStart = true //информируем, что звонок начат, и выводим кнопку Завершить
                video.onloadedmetadata = e => { //запускаем воспроизведение, когда объект загружен
                    video.play();
                    console.log(e)
                };
                setTimeout(() => {
                    //входящий стрим помещаем в объект видео для отображения
                    this.$refs.remoteVideo.srcObject = this.peercall.remoteStream;
                    this.$refs.remoteVideo.onloadedmetadata = e => {
// и запускаем воспроизведение когда объект загружен
                        this.$refs.remoteVideo.play();
                        console.log(e)
                    };
                }, 1500);

            }).catch(function(err) { console.log(err.name + ': ' + err.message); });
        },
        callCancel() { //отклонить звонок при вызове
            console.log('cancel')
        },
        callClose() { //закрыть звонок
            console.log('close')
        },


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
