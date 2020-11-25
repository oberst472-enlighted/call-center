<template>
    <div class="section-header">
        <div class="section-header__back-box" v-if="false">
            <LocalHeaderBack/>
        </div>

        <transition name="fade" mode="out-in">
            <div class="section-header__options" v-if="isActive" :key="'options'">
                <div class="section-header__toggle-box">
                    <UiToggle/>
                </div>

                <div class="section-header__timer-box">
                    <LocalHeaderOperatorTimer/>
                </div>

                <div class="section-header__btn-box">
                    <UiBtn @click="isActive = false"
                           theme="negative"
                    >
                        Завершить смену
                    </UiBtn>
                </div>
            </div>

            <div class="section-header__start-btn-box" v-else :key="'start'">
                <UiBtn @click="isActive = true"
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
import LocalHeaderOperatorTimer from './header-operator-timer'
import LocalHeaderOperatorUSer from './header-operator-user'
import apiRequest from '@/utils/apiRequest'

export default {
    components: {
        LocalHeaderBack,
        LocalHeaderOperatorTimer,
        LocalHeaderOperatorUSer
    },
    data() {
        return {
            isActive: false,
            activeMod: 'online'
        }
    },
    computed: {
        userData() {
            return this.$store.state.userData
        },
        workStatus() {
            return this.$store.state.workStatus
        }

    },
    methods: {
        pauseSession(val) {
            console.log(val)
        },
        toggleMode(type) {
            this.$store.commit('toggleWorkingStatus', type)
        },
        async startSession() {
            try {
                if (!this.$store.state.isActiveWorkShift) {
                    await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}/start-session/`)
                    this.$store.dispatch('startWorkShift')
                }
            } catch (e) {
                console.log(e)
            }
        },
        async closeSession() {
            try {
                if (this.$store.state.isActiveWorkShift) {
                    await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}/stop-session/`)
                }
            } catch (e) {
            }
            console.log(`Вы закончили работу. Проработано ${this.$store.state.totalTime} секунд. Или ${this.formatTime}`)
            this.$store.dispatch('endWorkShift')
        },
        async logOut() {
            try {
                if (this.$store.state.isActiveWorkShift) {
                    await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}/stop-session/`)
                }
            } catch (e) {
            }

            this.$store.dispatch('endWorkShift')
            this.$store.dispatch('logOut')
            this.$router.push('/login')
        },
        onEditProfileClick() {
            this.$router.push('/profile')
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
.lol-enter-active, .lol-leave-active {
    transition: opacity 0.3s;
}
.lol-enter, .lol-leave-to {
    opacity: 0;
}
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
