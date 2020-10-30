<template>
    <div id="Header">
        <div class="nav">
            <div class="nav-left">
                <forward v-if="$route.meta.gotForward"/>

                <div class="ui-toggle-box">
                    <UiToggle/>
                </div>

                <div
                    v-if="$store.state.isActiveWorkShift"
                    class="time"
                >
                    {{ formatTime }}
                </div>
                <UiBtn @click="pauseSession">начать смену</UiBtn>
            </div>

            <div class="nav-right"
                 @click.stop="$store.dispatch('popup/setPopup', 'user')"
            >
                <div
                    v-if="true"
                    class="user"
                >
                    <div class="user-info">
                        <div class="user-name">{{ userData.user.firstName }} {{ userData.user.lastName }}</div>
                        <div v-if="$store.state.userStatus === 'admin'" class="user-operator">администратор</div>
                        <div v-else class="user-operator">оператор # <span>{{ userData.user.number }}</span></div>
                    </div>
                    <div class="user-avatar">
                        <img
                            :src="userData.photo ? `https://calls-dev.enlighted.ru${userData.photo}` : require('@/assets/icons/User.svg')"
                            alt=""
                        >
                    </div>
                </div>
                <div
                    :class="{active : $store.state.popup.popupActive === `user`}"
                    class="popup"
                >
                    <div class="popup-item" @click="logOut">Выйти</div>
                    <template v-if="userData">
                        <div v-if="userData.user.userType === 'OPERATOR'" class="popup-item" @click="onEditProfileClick">
                            Редактировать
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import forward from '@/components/ui/forward'
import apiRequest from '@/utils/apiRequest'

export default {
    components: {forward},
    data() {
        return {
            activeMod: 'online'
        }
    },
    computed: {
        userData() {
            return this.$store.state.userData
        },
        formatTime() {
            let pad = function(num, size) {
                return ('000' + num).slice(size * -1)
            }
            let time = parseFloat(this.$store.state.totalTime).toFixed(3)
            let hours = Math.floor(time / 60 / 60)
            let minutes = Math.floor(time / 60) % 60
            let seconds = Math.floor(time - minutes * 60)
            return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
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
.ui-toggle-box {
    width: 100%;
    max-width: 150px;
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


    .time {
        width: 115px;
        margin: 0 18px;
        font-size: 20px;
        color: #4c3b60;
        font-weight: 400;
        text-align: center;
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
