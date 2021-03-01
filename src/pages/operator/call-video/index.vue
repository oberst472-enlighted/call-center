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

                    <transition-group
                        class="section-call-video__icons-box"
                        name="icons"
                        tag="div"
                    >
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

            <transition mode="out-in" name="fade">
                <div
                    v-if="!isCallOver"
                    key="video"
                    class="section-call-video__partner-video"
                >
                    <video
                        ref="partnerVideo"
                        autoplay
                    />
                </div>

                <div v-else key="stop" class="section-call-video__stop">
                    <LocalCallVideoStop @click="_closeCallVideoPage"/>
                </div>
            </transition>
        </div>

        <div class="section-call-video__aside">
            <div class="section-call-video__aside-head">
                <BlockCallWindowSmall
                    :is-block-options-disable="isCallOver"
                    is-block-options-active
                    is-disable-btns-box
                    is-disable-passive-box
                    @stop-call="stEndCall({role: 'user'})"
                    @toggle-micro="_toggleAudio"
                    @toggle-camera="_toggleCamera"
                />
            </div>

            <div class="section-call-video__aside-info">
                <LocalCallVideoInfo/>
            </div>

            <div class="section-call-video__aside-chat">
                <LocalCallVideoChat
                    :is-success="isSuccessSaveComment"
                    @input="debounceSendComment"
                />
            </div>

            <!--            <div class="section-call-video__aside-forwarding">-->
            <!--                <LocalCallVideoForwarding :operators="modifiedOperators"/>-->
            <!--            </div>-->
        </div>
    </section>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import LocalCallVideoStop from './call-video-stop'
import LocalCallVideoInfo from './call-video-info'
import LocalCallVideoChat from './call-video-chat'
// import LocalCallVideoForwarding from './call-video-forwarding'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
import RecordRTC from 'recordrtc'

export default {
    metaInfo() {
        return {
            title: `Звонок`
        }
    },
    components: {
        LocalCallVideoStop,
        LocalCallVideoInfo,
        LocalCallVideoChat,
        // LocalCallVideoForwarding,
        BlockCallWindowSmall,
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
            isBlockOptionsDisable: false,

            debounce: false,
            isReady: true,
            isSuccessSaveComment: false
        }
    },

    computed: {
        ...mapState('webrtc/webrtcPeerConnection', ['userStream', 'partnerStream']),
        ...mapState('webrtc/webrtcCalls', ['isCallOver', 'isCallAnswered', 'videoToken', 'videoID']),
        modifiedOperators() {
            const arr = [
                {title: 'Все операторы', code: 'all', id: '1'}
            ]
            for (let value in this.statuses) {
                arr.push({title: this.statuses[value], code: value, id: value})
            }
            return arr
        },
    },
    methods: {
        ...mapMutations('webrtc/webrtcPeerConnection', ['TOGGLE_AUDIO', 'TOGGLE_CAMERA']),
        ...mapMutations('webrtc/webrtcCalls', ['TOGGLE_CALL_OVER', 'TOGGLE_IS_OPERATOR_BUSY']),


        ...mapActions('webrtc/webrtcCalls', ['stEndCall', 'stCloseVideoSection']),
        ...mapActions('calls', ['stSendACommentToTheCall']),
        ...mapActions('formData', ['stSendVideo']),
        async sendComment(payload) {
            let info = {
                callID: this.$route.params.id,
                info: {
                    comment: payload
                }
            }
            const isSuccess = await this.stSendACommentToTheCall(info)
            if (isSuccess) {
                this.isSuccessSaveComment = true
            }
        },
        debounceSendComment(payload) {
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                this.sendComment(payload)
            }, 500)
        },
        throttle(payload) {
            this.isSuccessSaveComment = false
            if (this.isReady) {
                this.isReady = false
                setTimeout(() => {
                    this.sendComment(payload)
                    this.isReady = true
                }, 2000)
            }
        },
        _toggleAudio(payload) {
            this.isAudioDisable = !payload
            this.TOGGLE_AUDIO(payload)
        },
        _toggleCamera(payload) {
            this.isCameraDisable = !payload
            this.TOGGLE_CAMERA(payload)
        },

        _closeCallVideoPage() {
            this.$router.go(-1)
        },

        startRecord() {
            this.recorder = RecordRTC([this.userStream, this.partnerStream], {
                type: 'video',
                checkForInactiveTracks: true,
                timeSlice: 1000,
            })
            this.recorder.startRecording()
        },
        stopRecord() {
            if (this.recorder) {
                this.recorder.stopRecording(() => {
                    const blob = this.recorder.getBlob()
                    const data = new FormData()

                    data.append('video_file', blob, 'long.webm')
                    this.stSendVideo({token: this.videoToken, id: this.videoID, data})

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
            this.$refs.userVideo.srcObject = this.userStream
            this.$refs.partnerVideo.srcObject = this.partnerStream
            setTimeout(() => {
                this.startRecord()
              }, 1000);
        },
        isSuccessSaveComment(val) {
            if (val) {
                setTimeout(() => {
                    this.isSuccessSaveComment = false
                }, 1000)
            }
        },

        isCallOver() {
            this.stopRecord()
        }
    },
    created() {
        this.TOGGLE_CALL_OVER(false)
        // if (!this.isCallAnswered) {
        //     this.$router.push({name: 'home_operator'})
        // }
    },
    beforeRouteEnter(to, from, next) {
        if (!from.name) {
            next({name: 'home_operator'})
        }
        else {
            next()
        }
    },
    beforeDestroy() {
        this.TOGGLE_IS_OPERATOR_BUSY(false)
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
        background-color: #4c3b60;
        overflow: hidden;
    }

    &__aside-info {
        padding: 15px 15px 0 15px;
    }

    &__aside-forwarding {
        outline: 1px solid red;
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }

    &__aside-chat {
        padding: 15px 20px 0 20px;
    }

}
</style>
