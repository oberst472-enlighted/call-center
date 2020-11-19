<template>
    <div id="CallPage">
        <!--    <div style="position: fixed; top: 50%; left: 0; width: 100px; height: 100px; background-color: orange; z-index: 99999" @click="answerCall"></div>-->
        <div class="viewport" :class="{'call-active': true}">
            <video
                id="remoteVideo"
                ref="remoteVideo"
                autoplay
                v-if="true"
            />

            <div class="viewport-call" v-show="true">
                <div class="viewport-call-status">ЗВОНОК ЗАВЕРШЕН</div>
                <div class="viewport-call-status" v-if="true">{{ terminatedBy }}</div>
                <div
                    class="viewport-call-button"
                    @click="onReturnToWorkClick()"
                >
                    ПРОДОЛЖИТЬ РАБОТУ
                </div>
                <div class="viewport-call-time">{{ formatTime }}</div>
            </div>
            <div class="viewport-call" v-show="true">
                <video
                    class="viewport-call-admin"
                    id="localVideo"
                    autoplay muted
                    v-show="true"
                />
            </div>
        </div>
        <div class="sidebar" :class="{'call-active': $store.state.callLogic.isCallInProgress}">
            <div class="call-window">
                <div class="call-window-head" v-if="$store.state.callLogic.incomingData">
                    <div class="call-window-head-new">
                        НОВЫЙ ЗВОНОК <span>{{ 'RUS' }}</span>
                    </div>
                    <div class="call-window-head-name">{{ $store.state.callLogic.incomingData.station }}</div>
                    <div class="call-window-head-terminal">
                        терминал #{{ '1532' }}
                    </div>
                    <div class="call-window-head-terminal">{{ 'описание терминала' }}</div>
                </div>
                <div class="call-window-bottom" v-if="true">
                    <div
                        class="call-window-bottom-endcall"
                        @click="hangup"
                    >
                        <img src="@/assets/icons/Phone.svg" alt=""/>
                    </div>
                    <div
                        class="call-window-bottom-microphone"
                        @click="stopAudio"
                        v-show="isSoundOn"
                    >
                        <img src="@/assets/icons/microphome.svg" alt=""/>
                    </div>
                    <div
                        class="call-window-bottom-microphone"
                        @click="continueAudio"
                        v-show="!isSoundOn"
                    >
                        <img src="@/assets/icons/microphomeON.svg" alt=""/>
                    </div>
                    <div
                        class="call-window-bottom-video"
                        @click="stopVideo"
                        v-show="isVideoOn"
                    >
                        <img src="@/assets/icons/video.svg" alt=""/>
                    </div>
                    <div
                        class="call-window-bottom-video"
                        @click="continueVideo"
                        v-show="!isVideoOn"
                    >
                        <img src="@/assets/icons/videoON.svg" alt=""/>
                    </div>
                </div>
                <div class="call-window-end" v-else>
                    <img src="@/assets/icons/Telephone.png" style="margin-right: 15px" alt="">
                    ЗВОНОК ЗАВЕРШЕН
                </div>
            </div>
            <div class="col">
                <div class="call-timer">
                    <div class="call-timer-header">ПРОДОЛЖИТЕЛЬНОСТЬ ЗВОНКА</div>

                    <div class="call-timer-wrapper" v-if="true">
                        <div class="call-timer-time">{{ formatTime }}</div>
                    </div>

                    <div class="call-timer-wrapper" v-else>
                        <div class="call-timer-date">{{ $store.state.callLogic.callDate }}</div>
                        <div class="call-timer-time">
                            {{ $store.state.callLogic.startTime }} - {{ $store.state.callLogic.endTime }}
                        </div>
                    </div>
                </div>

                <div class="call-chat">
                    <div class="call-chat-header">КОММЕНТАРИЙ ОПЕРАТОРА</div>
                    <div class="call-chat-box">
                        <textarea class="call-chat-box__inner" v-model="message"/>

                        <div class="call-chat-box-bottom">сохранено</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import socket from '@/utils/socket'
import apiRequest from '@/utils/apiRequest'
export default {
    props: {

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
        }
    }

}
</script>

<style lang='scss'>
#CallPage {
    position: fixed;
    top: 0;
    z-index: 900;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .col {
        margin: 15px 20px;
    }

    /*---------------------------------------------------------------For pink window background*/
    .pink {
        background-color: #f04265 !important;
    }

    /*---------------------------------------------------------------For pink window background*/

    .viewport {
        width: 100%;
        background: #2e2e2e url("~@/assets/images/backgroung.png");
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &-call {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &-status {
                color: #ffffff;
                font-size: 18px;
                font-weight: 400;
            }

            &-button {
                width: 290px;
                height: 67px;
                border-radius: 34px;
                background-color: #f04265;
                color: #ffffff;
                font-size: 14px;
                font-weight: 700;
                line-height: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 45px;
                margin-bottom: 35px;
                cursor: pointer;
            }

            &-time {
                color: #ffffff;
                font-size: 20px;
                font-weight: 300;
            }

            &-admin {
                position: absolute;
                width: 238px;
                height: 148px;
                background-color: white;
                top: 28px;
                right: 28px;
                z-index: 1000;
                border-radius: 10px;
            }
        }
    }

    .viewport.call-active {
        /*background: url("../../assets/images/call1.png") no-repeat;*/
        /*background-size: cover;*/
    }

    .sidebar {
        width: 281px;
        border-radius: 8px;
        background-color: #ffffff;
    }

    .call-window {
        width: 281px;
        height: 175px;
        box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
        border-radius: 0 0 8px 8px;
        background-color: #4c3b60;

        &-head {
            height: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &-new {
                opacity: 0.7;
                color: #ffffff;
                font-size: 11px;
                font-weight: 300;
                margin-bottom: 7px;

                span {
                    color: #ffffff;
                    font-weight: 500;
                }
            }

            &-name {
                color: #ffffff;
                font-size: 14px;
                line-height: 15px;
                font-weight: 700;
            }

            &-terminal {
                text-align: center;
                color: #ffffff;
                font-size: 14px;
                font-weight: 400;
            }
        }

        &-bottom {
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            cursor: pointer;

            .call-window-bottom-endcall, .call-window-bottom-microphone, .call-window-bottom-video {
                border-radius: 50%;
                width: 52px;
                height: 52px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .call-window-bottom-endcall {
                background-color: #f04265;
            }

            .call-window-bottom-microphone, .call-window-bottom-video {
                background-color: #ffffff;
            }

        }

        &-end {
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 40px;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
        }
    }

    .call-timer {
        min-height: 85px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 6px;

        &-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &-header {
            opacity: 0.7;
            color: #685c7b;
            font-size: 11px;
            font-weight: 300;
            margin-bottom: 9px;
        }

        &-date {
            font-size: 13px;
            font-weight: 400;
            color: #685c7b;
            margin-bottom: 10px;
        }

        &-time {
            font-weight: 400;
            color: #685c7b;
            font-size: 20px;
        }
    }

    .call-status {
        min-height: 85px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 6px;

        &-header {
            opacity: 0.7;
            color: #685c7b;
            font-size: 11px;
            font-weight: 300;
            margin-bottom: 9px;
        }

        &-buttons {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        &-button {
            cursor: pointer;
            height: 20px;
            line-height: 20px;
            color: #4fd161;
            font-size: 12px;
            font-weight: 700;
            border-radius: 10px;
            border: 1px solid #4fd161;
            text-align: center;
            padding: 0 7px;
        }

        &-button.red {
            color: #f04265;
            border: 1px solid #f04265;
        }

        &-button.active {
            color: #ffffff;
            background-color: #4fd161;
        }

        &-button.red.active {
            background-color: #f04265;
        }
    }

    .call-chat {
        &-header {
            opacity: 0.7;
            color: #685c7b;
            font-size: 11px;
            font-weight: 300;
            margin-bottom: 9px;
            text-align: center;
        }

        &-box {
            width: 100%;
            min-height: 296px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;

            textarea {
                width: 100%;
                padding: 13px;
                padding-bottom: 30px;
                min-height: 296px;
                border-radius: 8px;
                border: 1px solid #dee2e6;
                resize: none;
                outline: none;
            }

            &-bottom {
                position: absolute;
                bottom: 10px;
                left: 10px;
                color: #c8bfd4;
                font-size: 10px;
                font-weight: 500;
            }
        }
    }

    #remoteVideo {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100vh;
        z-index: 999;
    }
}
</style>
