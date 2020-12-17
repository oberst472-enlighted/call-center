<template>
    <div class="section-header">
        <div :class="{'section-header__back-box--active': !isBackBtnActive}" class="section-header__back-box">
            <UiBack @click="$router.go(-1)"/>
        </div>

        <transition mode="out-in" name="fade">
            <div v-if="isSessionActive" :key="'options'" class="section-header__options">
                <div :class="{'section-header__toggle-box--disabled': isPauseLoading}" class="section-header__toggle-box">
                    <UiToggle
                        :default-value="isSessionBreak"
                        @click="_togglePauseSession"
                    />
                </div>

                <div class="section-header__timer-box">
                    <UiStopWatchNew :default-value="timeTimezone"
                                    :start-watch="isSessionActive"
                                    :stop-watch="!isSessionActive"
                    />
                </div>

                <div class="section-header__btn-box">
                    <UiBtn theme="negative"
                           @click="_stopSession"
                    >
                        Завершить смену
                    </UiBtn>
                </div>
            </div>

            <div v-else :key="'start'" class="section-header__start-btn-box">
                <UiBtn theme="positive"
                       @click="_startSession"
                >
                    Начать смену
                </UiBtn>
            </div>
        </transition>

        <div class="section-header__user-box">
            <BlockUserShortstory/>
        </div>
    </div>
</template>

<script>
import BlockUserShortstory from '@/components/blocks/user-shortstory'
import {mapActions, mapMutations, mapState} from 'vuex'
import {customLog} from '@/utils/console-group'
import {convertSecondsUTCToSecondsMyZone} from '@/utils/convertDateTime'

export default {
    components: {
        BlockUserShortstory
    },
    data() {
        return {
            isActive: false,
            isPauseLoading: false,
        }
    },
    computed: {
        ...mapState('sessions', ['isSessionActive', 'isSessionBreak', 'startSessionTime', 'sessionId']),
        ...mapState('webrtc/webrtcSockets', ['heartbeat']),
        ...mapState(['isBackBtnActive']),
        timeTimezone() {
            const secUtc = this.startSessionTime
            const secMyZone = convertSecondsUTCToSecondsMyZone(secUtc)
            return secMyZone
        },
    },
    methods: {
        ...mapMutations('sessions', ['TOGGLE_SESSION_BREAK']),
        ...mapActions('sessions', ['stStartSession', 'stStopSession', 'stStartSessionBreak', 'stStopSessionBreak']),
        ...mapActions('stat', ['stGetStatForTheSession']),
        ...mapActions('webrtc/webrtcSockets', ['stStartHeartbeat']),
        _togglePauseSession(val) {
            this.isPauseLoading = true
            if (val) {
                const isSuccess = this.stStartSessionBreak()
                if (isSuccess) {
                    this.stStartHeartbeat(this.heartbeat.statuses.operatorBreak)
                    customLog('_togglePauseSession', 'Начался перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не начался либо вы уже на перерыве', 'red')
                    //TODO обработать ошибку
                }

            } else {
                const isSuccess = this.stStopSessionBreak()
                if (isSuccess) {
                    this.stStartHeartbeat(this.heartbeat.statuses.operatorOnline)
                    customLog('_togglePauseSession', 'Закончился перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не закончен или не начался')
                    // TODO обработать ошибку
                }
            }
            this.isPauseLoading = false
        },
        async _startSession() {
            const isSuccess = await this.stStartSession()
            await this.stGetStatForTheSession()
            if (isSuccess) {
                this.stStartHeartbeat(this.heartbeat.statuses.operatorOnline)
                console.log('Новая сессия открыта')
            } else {
                console.log('Новая сессия не открыта')
                // TODO обработать ошибку
            }
        },
        async _stopSession() {
            const isSuccess = await this.stStopSession()
            this.TOGGLE_SESSION_BREAK(false)
            if (isSuccess) {
                this.stStartHeartbeat(this.heartbeat.statuses.operatorUnavailable)
                console.log('Сессия закрыта')
            } else {
                console.log('Сессия не закрыта')
                // TODO обработать ошибку
            }
        },
    },

}
</script>

<style lang='scss' scoped>

.section-header {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 84px;
    padding: 15px 0;

    &__options {
        display: flex;
        align-items: center;
        transition-duration: 0.3s;
    }

    &__start-btn-box {
        transition-duration: 0.3s;
    }

    &__toggle-box {
        flex-shrink: 0;
        width: 100%;
        max-width: 200px;
        margin-right: 18px;

        &--disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    }

    &__timer-box {
        flex-shrink: 0;
        margin-right: 18px;
        font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
        font-size: 14px !important;

        /deep/ .ui-stopwatch__number {
            width: 12px !important;
            color: $color--primary
        }

        /deep/ .ui-stopwatch__dot {
            display: inline-flex;
            justify-content: center;
            width: auto !important;
            color: $color--primary
        }
    }

    &__btn-box {
        //min-width: 150px;
    }

    &__user-box {
        flex-shrink: 0;
        margin-left: auto;
    }

    &__back-box {
        width: 50px;
        overflow: hidden;
        transition-duration: 0.3s;

        &--active {
            opacity: 0;

            & + .section-header__options {
                transform: translateX(-50px);
            }

            & + .section-header__start-btn-box {
                transform: translateX(-50px);
            }
        }
    }

}
</style>
