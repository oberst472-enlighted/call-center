<template>
    <div class="layout-default">
        <aside class="layout-default__aside">
            <div class="layout-default__aside-box">
                <router-view name="aside"/>
            </div>
        </aside>

        <main class="layout-default__body">
            <header class="layout-default__header">
                <div class="wrapper">
                    <router-view name="header"/>
                </div>
            </header>

            <section class="layout-default__main">
                <div class="wrapper">
                    <router-view/>
                </div>
            </section>
        </main>

        <div class="layout-default__call-video" v-if="isCallAnswered">
            <SectionCallVideo/>
        </div>
    </div>
</template>

<script>
import {customLog} from '@/utils/console-group'
import {mapState, mapMutations, mapActions} from 'vuex'
import SectionCallVideo from '@/components/sections/call-video'
import RecordRTC from 'recordrtc'
import axios from 'axios'

export default {
    components: {
        SectionCallVideo
    },
    data() {
        return {
            audio: new Audio('/assets/call-melody.mp3'),
            recoder: null,
        }
    },
    computed: {
        ...mapState('socket', ['isIncomingCall', 'isCallAnswered'])
    },
    methods: {

        ...mapActions('socket', ['incomingCall', 'socketConnect']),


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

        startAudio() {
            const promise = this.audio.play()
            if (promise !== undefined) {
                promise.then(() => {
                    customLog('startAudio', 'Браузер разрешил воспроизведение звука')
                }).catch(error => {
                    customLog('startAudio', 'Браузер запретил воспроизведение звука', 'red')
                    customLog('startAudio', error, 'red')
                });
            }
        },
        stopAudio() {
            this.audio.pause()
            this.audio.currentTime = 0
        },
    },
        watch: {
            isIncomingCall: {
                immediate: true,
                handler(val) {
                    val ? this.startAudio() : this.audio.pause()
                }
            },
            // partnerStream() {
            //     if (this.userStream) {
            //         this.startRecord()
            //     }
            // }
        },
        created() {
        this.socketConnect()
        }
}

</script>

<style lang="scss" scoped>
.layout-default {
    display: flex;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;

    &__header {
    }

    &__body {
        flex-grow: 1;
        height: 100vh;
        max-height: 100vh;
        overflow: auto;
        display: flex;
        flex-direction: column;


    }

    &__aside {
        display: flex;
        flex-shrink: 0;
        height: 100vh;
        transition: all ease 0.3s;

        &-box {
            top: 0;
            left: 0;
            display: flex;
            width: inherit;
        }
    }

    &__call-video {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    &__main {
        flex-grow: 1;
        display: flex;
    }

    &--aside-active {
        .layout-default__aside {
            width: 200px;
        }
    }
}
</style>
