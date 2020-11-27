<template>
    <div class="section-header">
        <div class="section-header__back-box" v-if="false">
            <LocalHeaderBack/>
        </div>

        <transition name="fade" mode="out-in">
            <div class="section-header__options" v-if="isStartWorkShift" :key="'options'">
                <div class="section-header__toggle-box" :class="{'section-header__toggle-box--disabled': isPauseLoading}">
                    <UiToggle @click="_togglePauseSession"/>
                </div>

                <div class="section-header__timer-box">
                    <UiStopWatch :start-watch="isStartWorkShift"
                                 :stop-watch="!isStartWorkShift"/>
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
            <LocalHeaderOperatorUSer/>
        </div>
    </div>
</template>

<script>
import LocalHeaderBack from './header-operator-back'
import LocalHeaderOperatorUSer from './header-operator-user'
import {mapState, mapMutations, mapActions} from 'vuex'
import dayjs from 'dayjs'
import {customLog} from '@/utils/console-group'

export default {
    components: {
        LocalHeaderBack,
        LocalHeaderOperatorUSer
    },
    data() {
        return {
            isActive: false,
            isPauseLoading: false,
        }
    },
    computed: {
        ...mapState('workShift', ['isStartWorkShift', 'startWorkShiftTime', 'workShiftID']),
        tim() {
            console.log(this.startWorkShiftTime)
            console.log('--')
            console.log(dayjs(this.startWorkShiftTime).format('hh:mm:ss'))
            return 1
        },
        userData() {
            return this.$store.state.userData
        },
        workStatus() {
            return this.$store.state.workStatus
        }

    },
    methods: {
        ...mapActions('workShift', ['stStartWorkShift', 'stStopWorkShift', 'stGetCurrentSession', 'stStartBreak', 'stStopBreak']),
        ...mapActions('socket', ['stBreak', 'stBreakDisable']),
        ...mapMutations('workShift', ['TOGGLE_START_WORK_SHIFT']),
        _togglePauseSession(val) {
            this.isPauseLoading = true
            if (!val) {
                const isSuccess = this.stStartBreak()
                if (isSuccess) {
                    this._saveStopBreakSessionToStorage()
                    customLog('_togglePauseSession', 'Начался перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не начался либо вы уже на перерыве', 'red')
                }
                this.stBreak()

            } else {
                const isSuccess = this.stStopBreak()
                if (isSuccess) {
                    this._saveStartBreakSessionToStorage()
                    customLog('_togglePauseSession', 'Закончился перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не закончен или не начался')
                }
                this.stBreakDisable()
            }
            this.isPauseLoading = false
        },
        async _startSession() {
            const isSuccess = await this.stStartWorkShift()
            if (isSuccess) {
                this._saveSessionIDToStorage()
            } else {
                const isSuccess = await this.stGetCurrentSession()
                if (isSuccess) {
                    this._saveSessionIDToStorage()
                    console.log('получили сохраненную сессию')
                }
                else {
                    console.log('нет сохраненной сессии')
                }
            }
        },
        async _stopSession() {
            const isSuccess = await this.stStopWorkShift()
            if (isSuccess) {
                this._deleteSessionIDToStorage()
            }
            else {
                console.log('Сессия не остановлена')
            }
        },
        _saveSessionIDToStorage() {
            localStorage.setItem('workShiftID', this.workShiftID)
        },
        _deleteSessionIDToStorage() {
            localStorage.removeItem('workShiftID')
        },
        _saveStartBreakSessionToStorage() {
            sessionStorage.removeItem('isStopBreak')
            sessionStorage.setItem('isStartBreak', '1')
        },
        _saveStopBreakSessionToStorage() {
            sessionStorage.removeItem('isStartBreak')
            sessionStorage.setItem('isStopBreak', '1')
        }
    },
    created() {
        if (localStorage.getItem('workShiftID')) {
            this.TOGGLE_START_WORK_SHIFT()
        }
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
    }
    &__btn-box {
        //min-width: 150px;
    }
    &__user-box {
        margin-left: auto;
        flex-shrink: 0;
    }

}
</style>
