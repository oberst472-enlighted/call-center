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
                    <UiBtn @click="stopSession"
                           theme="negative"
                    >
                        Завершить смену
                    </UiBtn>
                </div>
            </div>

            <div class="section-header__start-btn-box" v-else :key="'start'">
                <UiBtn @click="startSession"
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
import {mapState, mapActions} from 'vuex'
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
        _togglePauseSession(val) {
            this.isPauseLoading = true
            if (!val) {
                const isSuccess = this.stStartBreak()
                if (isSuccess) {
                    customLog('_togglePauseSession', 'Начался перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не начался либо вы уже на перерыве', 'red')
                }
            } else {
                const isSuccess = this.stStopBreak()
                if (isSuccess) {
                    customLog('_togglePauseSession', 'Закончился перерыв')
                } else {
                    customLog('_togglePauseSession', 'Перерыв не закончен или не начался')
                }
            }
            this.isPauseLoading = false
        },
        async startSession() {
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
        async stopSession() {
            const isSuccess = await this.stStopWorkShift()
            console.log(this.isSuccess)
            if (isSuccess) {
                this._deleteSessionIDToStorage()
            }
            else {
                console.log('Сессия не остановлена')
            }
        },
        async closeSession() {
        },
        async logOut() {
        },
        _saveSessionIDToStorage() {
            localStorage.setItem('workShiftID', this.workShiftID)
        },
        _deleteSessionIDToStorage() {
            localStorage.removeItem('workShiftID')
        },
        onEditProfileClick() {
        }
    },
    mounted() {
        setInterval(() => {
            this.timeNow = new Date()
        }, 1000)
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
#Header {
    width: 100%;
    min-height: 83px;
    padding: 25px 0;

    .popup {
        position: absolute;
        top: 80%;
        left: 50px;
        z-index: 15;
        display: block;
        width: 0;
        height: 0;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
        overflow: hidden;
        transition: height ease 0.5s;

        &-item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 33px;
            font-size: 12px;
            line-height: 14px;
            color: #4c3b60;
            font-weight: 400;
            cursor: pointer;
        }

        &-item:hover {
            background-color: #f4f3f7;
        }
    }

    .popup.active {
        z-index: 99;
        width: 100px;
        height: 66px;
        transition: height ease 0.5s;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-right {
            position: relative;
            cursor: pointer;
        }

        &-btn {
            height: 33px;
            padding: 0 15px;
            font-size: 12px;
            color: #ffffff;
            font-weight: 400;
            border: none;
            border-radius: 8px;
            outline: none;
            background-color: inherit;
            cursor: pointer;
        }

        &-left {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .user {
        display: flex;

        &-info {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            flex-direction: column;
        }

        &-name {
            font-size: 12px;
            line-height: 12px;
            font-weight: 700;
        }

        &-operator {
            font-size: 12px;
            line-height: 12px;
            font-weight: 400;
        }

        &-avatar {
            margin-left: 5px;
        }
    }

    .close-session {
        background-color: #f04265;
    }

    .dash-nav-buttons {
        display: flex;
        align-items: center;

        .button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 33px;
            margin-right: 20px;
            padding: 0 10px;
            font-size: 12px;
            color: #ffffff;
            font-weight: 400;
            border-radius: 8px;
            background-color: #66538a;
            cursor: pointer;

            &:hover {
                transform: scale(1.03);
            }
        }
    }
}
</style>
