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
import io from '../assets/js/socket.io'
import {baseAppUrl} from '../utils/const'

export default {
    data() {
        return {
            socket: null,
            localStream: null,
            pc: null,
            callingSessionActive: false,
            callCenterId: '5f119d7ee6b5a61d04e7cba9'
        }
    },
    methods: {
        onCallBtnClick() {
            this.initSocket()
            this.setRTC()
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then(this.gotStream).then(() => {
                this.pc.addStream(this.localStream)
                this.socket.emit('entered', 'device_dev', 'client', this.callCenterId)
                this.callingSessionActive = true
            })
        },
        onStopBtnClick() {
            this.pc.close()
            this.callingSessionActive = false
            this.socket.emit('bye')
            this.socket.disconnect()
        },
        gotStream(stream) {
            this.$refs.localVideo.srcObject = stream
            this.localStream = stream
            this.sendMessage('got user media')
        },
        sendMessage(message) {
            this.socket.emit('message', message)
        },
        handleIceCandidate() {
            console.log('handleIceCandidate')
        },
        setRTC() {

            this.pc = new RTCPeerConnection({
                'iceServers': [
                    {'url': 'stun:stun1.l.google.com:19302'},
                    {'url': 'stun:stun2.l.google.com:19302'},
                    {'url': 'stun:stun3.l.google.com:19302'},
                    {
                        'url': 'turn:coturn.sverstal.ru:3478',
                        'username': 'tab1',
                        'credential': '123456',
                    },
                ],
            })
            this.pc.onaddstream = this.handleRemoteStreamAdded
        },
        handleRemoteStreamAdded(event) {
            this.remoteStream = event.stream
            document.getElementById('remoteVideo').srcObject = event.stream
        },
        createdOffer(description) {
            console.log('createdOffer')
            console.log(description)
            this.pc.setLocalDescription(description)
                .then(() => {
                    this.socket.emit('message', description)
                    // setLocalDescriptionSuccess(localPeerConnection);
                }).catch(e => {
                console.log(e)
            })
        },
        initSocket() {
            this.socket = io.connect(baseAppUrl)
            this.socket.on('has_operator', (roomId) => {
                console.log(roomId)
                console.log('has_operator')
                this.socket.emit('join', roomId, 'client')
                this.socket.emit('calling')
            })
            this.socket.on('message', m => {
                console.log('alert from operator: ', m)
                if (m === 'receiverReadyToCall') {
                    this.pc.createOffer({offerToReceiveVideo: 1,})
                        .then(this.createdOffer)
                } else if (m.type === 'answer') {
                    this.pc.setRemoteDescription(new RTCSessionDescription(m)).then(() => {
                        console.log('remote desc set')
                    }, (err) => {
                        console.log(err)
                    })
                } else if (m.type === 'candidate') {
                    const candidate = new RTCIceCandidate({
                        sdpMLineIndex: m.label,
                        candidate: m.candidate,
                    })
                    // console.log('add ice candidate');
                    this.pc.addIceCandidate(candidate).then(() => {
                        // console.log('ice candidate added')
                    }, (err) => {
                        // console.log('ice candidate err');
                        console.log(err)
                    })
                }

            })
            this.socket.on('bye', () => {
                this.pc.close()
                this.socket.disconnect()
                this.callingSessionActive = false
            })
        }
    },
    mounted() {
        this.initSocket()
    }
}
</script>

<style lang="scss" scoped>
.test-call-page {
    &__video-wrapper {
        display: flex;
        justify-content: center;
    }

    &__video {
        height: 500px;
        margin-right: 15px;
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
