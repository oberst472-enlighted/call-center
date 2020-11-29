<template>
    <div class="section-header">
        <div class="section-header__back-box" :class="{'section-header__back-box--active': this.$route.name !== 'home-operator'}">
            <LocalHeaderBack/>
        </div>

        <transition name="fade" mode="out-in">
            <div class="section-header__options" v-if="isSessionActive" :key="'options'">
                <div class="section-header__toggle-box" :class="{'section-header__toggle-box--disabled': isPauseLoading}">
                    <UiToggle
                        @click="_togglePauseSession"
                        :default-value="isSessionBreak"
                    />
                </div>

                <div class="section-header__timer-box">
                    <UiStopWatch :start-watch="isSessionActive"
                                 :stop-watch="!isSessionActive"/>
                </div>

                <div class="section-header__btn-box">
                    <UiBtn @click="_stopSession"
                           theme="negative"
                    >
                        Завершить смену
                    </UiBtn>
                </div>
            </div>

            <div class="section-header__start-btn-box" v-else :key="'start'">
                <UiBtn @click="_startSession"
                       theme="positive"
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
import LocalHeaderBack from './header-operator-back'
import BlockUserShortstory from '@/components/blocks/user-shortstory'
import {mapState, mapMutations, mapActions} from 'vuex'
import {customLog} from '@/utils/console-group'
import store from '@/store'

export default {
    components: {
        LocalHeaderBack,
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
    },
    methods: {
        ...mapActions('sessions', ['stStartSession', 'stStopSession', 'stStartSessionBreak', 'stStopSessionBreak']),
        ...mapMutations('sessions', ['TOGGLE_SESSION_BREAK']),
        ...mapActions('stat', ['stGetStat']),
        _togglePauseSession(val) {
            this.isPauseLoading = true
            if (val) {
                const isSuccess = this.stStartSessionBreak()
                if (isSuccess) {
                    customLog('_togglePauseSession', 'Начался перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не начался либо вы уже на перерыве', 'red')
                }

            } else {
                const isSuccess = this.stStopSessionBreak()
                if (isSuccess) {
                    // this._saveStartBreakSessionToStorage()
                    customLog('_togglePauseSession', 'Закончился перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не закончен или не начался')
                }
            }
            this.isPauseLoading = false
        },
        async _startSession() {
            const isSuccess = await this.stStartSession()
                await this.stGetStat()
            if (isSuccess) {
                console.log('Новая сессия открыта')
            } else {
                console.log('Новая сессия не открыта')
            }
        },
        async _stopSession() {
            const isSuccess = await this.stStopSession()
            this.TOGGLE_SESSION_BREAK(false)
            if (isSuccess) {
                console.log('Сессия закрыта')
            }
            else {
                console.log('Сессия не закрыта')
            }
        },
        // _saveSessionIDToStorage() {
        //     localStorage.setItem('workShiftID', this.workShiftID)
        // },
        // _deleteSessionIDToStorage() {
        //     localStorage.removeItem('workShiftID')
        // },
        // _saveStartBreakSessionToStorage() {
        //     sessionStorage.removeItem('isStopBreak')
        //     sessionStorage.setItem('isStartBreak', '1')
        // },
        // _saveStopBreakSessionToStorage() {
        //     sessionStorage.removeItem('isStartBreak')
        //     sessionStorage.setItem('isStopBreak', '1')
        // }
    },
    created() {
        // if (localStorage.getItem('workShiftID')) {
        //     this.TOGGLE_START_WORK_SHIFT()
        // }
    }
}
</script>

<style lang='scss' scoped>

.section-header {
    display: flex;
    width: 100%;
    min-height: 84px;
    align-items: center;
    padding: 15px 0;
    &__options {
        display: flex;
        align-items: center;
    }
    &__toggle-box {
        max-width: 200px;
        width: 100%;
        margin-right: 18px;
        flex-shrink: 0;
        &--disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    }
    &__timer-box {
        margin-right: 18px;
        flex-shrink: 0;
        font-size: 14px !important;
        font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
        /deep/ .ui-stopwatch__number {
            width: 12px !important;
            color: $color--primary
        }
        /deep/ .ui-stopwatch__dot {
            width: auto !important;
            display: inline-flex;
            justify-content: center;
            color: $color--primary
        }
    }
    &__btn-box {
        //min-width: 150px;
    }
    &__user-box {
        margin-left: auto;
        flex-shrink: 0;
    }
    &__back-box {
        width: 0;
        overflow: hidden;
        transition-duration: 0.3s;
        &--active {
            width: 50px;
        }
    }

}
</style>
