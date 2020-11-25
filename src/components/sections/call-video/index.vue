<template>
    <section class="section-call-video">
        <div class="section-call-video__main">
            <transition name="fade">
                <div v-if="!isCallOver" class="section-call-video__client-video">

                    <video
                        ref="userVideo"
                        autoplay
                        muted
                    />

                    <transition-group class="section-call-video__icons-box" name="icons" tag="div">
                        <IconCameraOff
                            v-if="isCameraDisable"
                            key="camera"
                            class="section-call-video__icon"
                        />
                        <IconMicroOff
                            v-if="isAudioDisable"
                            key="audio"
                            class="section-call-video__icon section-call-video__icon-micro"
                        />
                    </transition-group>
                </div>
            </transition>

            <transition name="fade" mode="out-in">
                <div v-if="!isCallOver" class="section-call-video__partner-video" key="video">
                    <video
                        ref="partnerVideo"
                        autoplay
                    />
                </div>

                <div v-else class="section-call-video__stop" key="stop">
                    <LocalCallVideoStop @click="closeSectionCallVideo"/>
                </div>
            </transition>
        </div>

        <div class="section-call-video__aside">
            <div class="section-call-video__aside-head">
                <BlockCallWindowSmall
                    is-block-options-active
                    :is-block-options-disable="isBlockOptionsDisable"
                    is-disable-btns-box
                    is-disable-passive-box
                    @stop-call="stopCall"
                    @toggle-micro="_toggleAudio"
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
import {mapActions, mapMutations, mapState} from 'vuex'
import LocalCallVideoStop from './call-video-stop'
import LocalCallVideoInfo from './call-video-info'
import LocalCallVideoChat from './call-video-chat'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
import RecordRTC from 'recordrtc'
import axios from 'axios'

export default {
    components: {
        LocalCallVideoStop,
        LocalCallVideoInfo,
        BlockCallWindowSmall,
        LocalCallVideoChat
    },
    data() {
        return {
            isAudioDisable: false,
            isCameraDisable: false,
            recoder: null,
            status: null,
            isVideoOn: true,
            isSoundOn: true,
            terminatedBy: '',
            isBlockOptionsDisable: false
        }
    },

    computed: {
        ...mapState('socket', ['userStream', 'partnerStream', 'isCallOver', 'identifiersCroup']),
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
    },
    methods: {
        ...mapMutations('socket', ['TOGGLE_AUDIO', 'TOGGLE_CAMERA', 'TOGGLE_CALL_ANSWERED', 'TOGGLE_CALL_OVER']),
        ...mapActions('socket', ['stStopCall']),
        _toggleAudio(payload) {
            this.isAudioDisable = !payload
            this.TOGGLE_AUDIO(payload)
        },
        _toggleCamera(payload) {
            this.isCameraDisable = !payload
            this.TOGGLE_CAMERA(payload)
        },

        getTime() {
            const date = new Date()
            const hours = `${date.getHours()}`.length === 1 ? `0${date.getHours()}` : `${date.getHours()}`
            const minutes = `${date.getMinutes()}`.length === 1 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
            const seconds = `${date.getSeconds()}`.length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`
            return `${hours}:${minutes}:${seconds}`
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
                    console.log(this.identifiersCroup)
                    const lol = `api/v1/videos/${this.identifiersCroup.videoID}`
                    axios.patch(lol, data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `token ${this.identifiersCroup.videoToken}`
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

        stopCall() {
            this.stStopCall()
            this.isBlockOptionsDisable = true
        },
        closeSectionCallVideo() {
            this.TOGGLE_CALL_ANSWERED(false)
            this.TOGGLE_CALL_OVER(false)
        }
    },
    watch: {

        partnerStream: {
            immediate: true,
            handler(val) {
                this.$refs.userVideo.srcObject = this.userStream
                this.$refs.partnerVideo.srcObject = val
                if (val) {
                    // this.startRecord()
                }
            }
        },

        isCallOver() {
            this.stopRecord()
        }
    }

}
</script>

<style lang="scss" scoped>
.icons-enter, .icons-leave-to {
    opacity: 0;
}

.icons-leave-active {
    position: absolute;
}

.section-call-video {
    display: grid;
    grid-template-columns: [main] 1fr [aside] 280px;
    width: 100%;
    height: 100%;

    &__main {
        position: relative;
        display: flex;
        background-color: #2e2e2e;
        background-image: url('/assets/images/map.webp');
        background-repeat: no-repeat;
        background-size: cover;
        grid-column: main;
    }

    &__aside {
        background-color: #fff;
        grid-column: aside;
    }

    &__client-video {
        position: absolute;
        top: $gutter;
        right: $gutter;
        z-index: 2;
        width: 240px;
        height: 160px;
        border-radius: 8px;
        overflow: hidden;

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__icons-box {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        box-sizing: border-box;
        display: grid;
        grid-gap: 15px;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px;
        color: #fff !important;
        opacity: 0.3;
        grid-auto-flow: column;
    }

    &__icon {
        left: 50%;
        width: 80px !important;
        height: 80px !important;
        transition: all 0.3s;

        &-micro {
            width: 70px !important;
            height: 70px !important;
        }
    }

    &__partner-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        video {
            z-index: 1;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__stop {
        top: 50%;
        margin: auto;
    }

    &__aside-head {
        display: flex;
        min-height: 160px;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        overflow: hidden;
        background-color: #4c3b60;
    }

    &__aside-info {
        padding: 15px 15px 0 15px;
    }

    &__aside-chat {
        padding: 15px 20px 0 20px;
    }

}
</style>
