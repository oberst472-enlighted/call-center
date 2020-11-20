<template>
    <section class="section-call-video">
        <div class="section-call-video__main">
            <div class="section-call-video__client-video" v-if="!isCallOver">
                <video
                    ref="userVideo"
                    autoplay
                    muted
                />
            </div>


            <div class="section-call-video__partner-video" v-if="!isCallOver">
                <video
                    ref="partnerVideo"
                    autoplay
                />
            </div>





            <div class="section-call-video__stop" v-if="isCallOver">
                <LocalCallVideoStop/>
            </div>
        </div>

        <div class="section-call-video__aside">
            <div class="section-call-video__aside-head">
                <BlockCallWindowSmall
                    is-block-options-active
                    is-disable-passive-box
                    is-disable-btns-box
                    @stop-call="stStopCall()"
                    @toggle-micro="_toggleMicro"
                    @toggle-camera="_toggleCamera"
                />
            </div>

            <div class="section-call-video__aside-info">
                <LocalCallVideoInfo/>
            </div>


            <div class="section-call-video__aside-chat">
                <LocalCallVideoChat/>
            </div>
        </div>
    </section>
</template>

<script>
import apiRequest from '@/utils/apiRequest'
import {mapState, mapActions} from 'vuex'
import LocalCallVideoStop from './call-video-stop'
import LocalCallVideoInfo from './call-video-info'
import LocalCallVideoChat from './call-video-chat'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'

export default {
    components: {
        LocalCallVideoStop,
        LocalCallVideoInfo,
        BlockCallWindowSmall,
        LocalCallVideoChat
    },
    data() {
        return {
            status: null,
            isVideoOn: true,
            isSoundOn: true,
            terminatedBy: ''
        }
    },

    computed: {
        ...mapState('socket', ['userStream', 'partnerStream', 'isCallOver']),
        message: {
            get: function() {
                return this.$store.state.callLogic.messageText
            },
            set: function(newValue) {
                this.$store.commit('callLogic/setMessage', newValue)
            }
        },
        getCallTime() {
            return +this.$store.state.callLogic.callTime
        },
        formatTime() {
            let pad = function(num, size) {
                return ('000' + num).slice(size * -1)
            }
            let time = parseFloat(this.getCallTime).toFixed(3)
            let hours = Math.floor(time / 60 / 60)
            let minutes = Math.floor(time / 60) % 60
            let seconds = Math.floor(time - minutes * 60)
            return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
        },
        isActiveWorkShift() {
            return this.$store.state.isActiveWorkShift
        },
    },
    methods: {
        ...mapActions('socket', ['stStopCall']),
        _stopCall() {
            this.stStopCall()
        },
        _toggleMicro(payload) {
            console.log(this.$refs.partnerVideo.muted)
            this.$refs.partnerVideo.muted = payload
            console.log(payload)
        },
        _toggleCamera(payload) {
            console.log(payload)
        },

        onReturnToWorkClick() {
            this.closeModal()
            this.$store.dispatch('updateWorkingShiftStats')
        },
        // СБРОСИТЬ ТРУБКУ
        hangup() {
            let date = new Date()
            this.terminatedBy = 'ОПЕРАТОРОМ'

            let hours = `${date.getHours()}`.length === 1 ? `0${date.getHours()}` : `${date.getHours()}`
            let minutes = `${date.getMinutes()}`.length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
            let seconds = `${date.getSeconds()}`.length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`

            this.$store.commit('callLogic/setEndTime', `${hours}:${minutes}:${seconds}`)

            this.stop()
            this.socket.emit('bye')
            this.socket.emit('change_status', 'UNAVALIABLE')
        },
        async closeModal() {
            console.log('WAITING')
            this.$store.commit('callLogic/cleanCallTime')

            console.log(this.$store.state.callLogic.messageText)
            let resp = await apiRequest.post(`/api/calls/${this.callObjectId}/comment/`, {
                comment: this.$store.state.callLogic.messageText
            })
            console.log(resp)

            this.$store.commit('callLogic/setMessage', '')

            this.socket.emit('change_status', 'WAITING')
            this.$store.commit('callLogic/closeCallPage')
        },
        stopAudio() {
            this.isSoundOn = false

            let audio = this.localStream.getTracks().forEach(item => {
                if (item.kind === 'audio') {
                    item.enabled = !item.enabled
                }
            })
            console.log(audio)

            // audio.muted = true
            // audio.stop()
        },
        stopVideo() {
            this.isVideoOn = false
            let video = this.localStream.getTracks().forEach(item => {
                if (item.kind === 'video') {
                    item.enabled = !item.enabled
                }
            })
            console.log(video)

            // video.stop()
        },
        continueAudio() {
            this.isSoundOn = true

            let audio = this.localStream.getTracks().forEach(item => {
                if (item.kind === 'audio') {
                    item.enabled = !item.enabled
                }
            })
            console.log(audio)
            // audio.muted = false

            // audio.play()
        },
        continueVideo() {
            this.isVideoOn = true
            let video = this.localStream.getTracks().forEach(item => {
                if (item.kind === 'video') {
                    item.enabled = !item.enabled
                }
            })
            console.log(video)

            // video.play()
        },
        gotStream(stream) {
            this.local = document.getElementById('localVideo')
            this.local.srcObject = stream
            this.localStream = stream
            this.sendMessage('got user media')
        },
    },
    watch: {
        getCallStatus(val) {
            console.error(val)
            if (val) {
                this.interval = setInterval(() => {
                    this.$store.commit('callLogic/incrementCallTime')
                }, 1000)
            } else {
                clearInterval(this.interval)
                this.$store.commit('callLogic/cleanCallTime')

            }
        },
        userStream: {
            immediate: true,
            handler(val) {
                this.$refs.userVideo.srcObject = val
                console.log(this.$refs.userVideo.srcObject)
            }
        },
        partnerStream: {
            immediate: true,
            handler(val) {
                this.$refs.partnerVideo.srcObject = val
                console.log(this.$refs.userVideo.srcObject)
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.section-call-video {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: [main] 1fr [aside] 280px;
    &__main {
        background-color: #2e2e2e;
        grid-column: main;
        background-image: url('/assets/images/map.webp');
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        display: flex;
    }
    &__aside {
        grid-column: aside;
        background-color: #fff;
    }

    &__client-video {
        position: absolute;
        width: 240px;
        height: 160px;
        background-color: $color--primary;
        top: $gutter;
        right: $gutter;
        border-radius: 8px;
        overflow: hidden;
        z-index: 2;
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__partner-video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        video {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }
    }

    &__stop {
        margin: auto;
        top: 50%;
    }

    &__aside-head {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        overflow: hidden;
        min-height: 175px;
        display: flex;
    }
    &__aside-info {
        padding: 15px 15px 0 15px;
    }
    &__aside-chat {
        padding: 15px 20px 0 20px;
    }

}
</style>
