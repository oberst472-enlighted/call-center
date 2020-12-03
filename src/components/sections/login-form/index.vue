<template>
    <form class="section-login" @submit.prevent="send">
        <div class="section-login__header-box">
            <BlockFormHeader
                subtitle="Введите свои данные"
                title="Вход в колл-центр"
            />
        </div>

        <div class="section-login__body">
            <transition name="fade">
                <span
                    v-if="isError"
                    class="section-login__error-text"
                >
                    Такого пользователя нет <br> или данные введены не корректно
                </span>
            </transition>

            <div class="section-login__inp-box">
                <UiInput
                    v-model="form.username"
                    :is-empty="isLoginEmpty"
                    icon="iconUser"
                    placeholder="Введите логин"
                />
            </div>

            <div class="section-login__inp-box">
                <UiInput
                    v-model="form.password"
                    :is-empty="isPasswordEmpty"
                    icon="IconKey"
                    placeholder="Введите пароль"
                    type="password"
                />
            </div>
        </div>

        <div class="section-login__footer">
            <div class="section-login__check-box">
                <UiCheckbox
                    v-model="rememberMe"
                    :checked="rememberMe"
                    :disabled="!isFormFilled && !rememberMe"
                >
                    Запомнить меня
                </UiCheckbox>
            </div>

            <div class="section-login__send-btn-box">
                <UiBtn :loading="isLoading">Войти</UiBtn>
            </div>

            <div class="section-login__send-pass-box">
                <UiLink @click="$router.push({name: 'resetPassword'})">Забыл пароль?</UiLink>
            </div>
        </div>
    </form>
</template>

<script>
import BlockFormHeader from '@/components/blocks/form-header'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    components: {
        BlockFormHeader
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rememberMe: false,
            isError: false,
            isLoading: false,
            isLoginEmpty: false,
            isPasswordEmpty: false
        }
    },

    metaInfo() {
        return {
            title: `Вход в систему`
        }
    },
    computed: {
        ...mapGetters('middleware', ['isAdmin', 'isAuth', 'isOperator', 'isRememberMe']),
        isFormFilled() {
            return Boolean(this.form.username && this.form.password)
        }
    },
    methods: {
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapMutations(['TOGGLE_PROGRESS_LOGIN_ACTIVE']),
        ...mapActions('login', ['stLogin']),
        ...mapActions('users', ['stGetUserById', 'stGetUsers']),
        ...mapActions('calls', ['stGetAllCallsForTheCurrentSession', 'stGetAllCalls']),
        ...mapActions('devices', ['stGetDevices']),
        ...mapActions('stat', ['stGetStatForTheSession', 'stGetAdminStat']),


        async send() {
            if (!this.isLoading) {
                try {
                    if (this.isFormFilled) {
                        this.isError = false
                        this.isLoading = true

                        const response = await this.stLogin(this.form)
                        if (response.isSuccess) {
                            this.saveInfoOnStorage(response.response.data)
                            this.goToAdminPanel(response.response.data)

                        } else {
                            this.isError = true
                            this.isLoading = false
                            this.TOGGLE_PROGRESS_LOGIN_ACTIVE(false)
                        }
                    } else {
                        this.showEmptyErrors()
                        this.isLoading = false
                        this.TOGGLE_PROGRESS_LOGIN_ACTIVE(false)
                    }
                } catch (e) {
                    console.log(e)
                    this.ADD_ALERT(['negative'])
                    this.TOGGLE_PROGRESS_LOGIN_ACTIVE(false)
                }
            }

        },
        saveInfoOnStorage(payload) {
            const storage = this.rememberMe ? localStorage : sessionStorage

            localStorage.removeItem('token')
            localStorage.removeItem('сс_main_user_info')

            sessionStorage.removeItem('token')
            sessionStorage.removeItem('сс_main_user_info')

            storage.setItem('token', payload.token)
            storage.setItem('сс_main_user_info', JSON.stringify(payload.user))

        },
        toggleSaveLoginAndPasswordInStorage(val) {
            if (this.rememberMe) {
                val ?
                    localStorage.setItem('cc_user_data', JSON.stringify(this.form)) :
                    localStorage.removeItem('cc_user_data')
            } else {
                localStorage.removeItem('cc_user_data')
            }
        },
        showEmptyErrors() {
            if (!this.form.username.length) {
                this.isLoginEmpty = true
            }
            if (!this.form.password.length) {
                this.isPasswordEmpty = true
            }
        },

        async goToAdminPanel(payload) {
            if (payload.user.role === 'administrator') {
                const isSuccess = await this.loadInitialAdminData()
                if (isSuccess) {
                    this.$router.push({name: `home_admin`, params: {doNotLoadData: true}})
                    this.TOGGLE_PROGRESS_LOGIN_ACTIVE(false)
                } else {
                    this.ADD_ALERT(['negative'])
                    this.TOGGLE_PROGRESS_LOGIN_ACTIVE(false)
                }
                this.isLoading = false
            } else if (payload.user.role === 'operator') {
                const isSuccess = await this.loadInitialData()
                if (isSuccess) {
                    this.$router.push({name: `home_operator`, params: {doNotLoadData: true}})
                    // this.TOGGLE_PROGRESS_LOGIN_ACTIVE(false)
                } else {
                    this.ADD_ALERT(['negative'])
                    this.TOGGLE_PROGRESS_LOGIN_ACTIVE(false)

                }
                this.isLoading = false
            } else {
                this.isLoading = false
                this.ADD_ALERT(['negative'])
            }
        },

        async loadInitialData() {
            try {
                await this.stGetStatForTheSession()
                this.stGetAllCallsForTheCurrentSession()
                const response = await Promise.all([
                    await this.stGetDevices(),
                ])
                const isSuccess = response.every(item => item)
                return isSuccess
            } catch (e) {
                return false
            }
        },
        async loadInitialAdminData() {
            try {
                this.stGetAllCallsForTheCurrentSession()
                const response = await Promise.all([
                    await this.stGetUsers(),
                    this.stGetAdminStat(),
                    this.stGetDevices(),
                    this.stGetAllCalls()
                ])
                const isSuccess = response.every(item => item)
                return isSuccess
            } catch (e) {
                return false
            }
        }
    },
    watch: {
        'form.username'(val) {
            if (val) {
                this.toggleSaveLoginAndPasswordInStorage(val)
                this.isLoginEmpty = false
                this.isError = false
            }
        },
        'form.password'(val) {
            if (val) {
                this.toggleSaveLoginAndPasswordInStorage(val)
                this.isPasswordEmpty = false
                this.isError = false
            }
        },
        rememberMe(val) {
            this.toggleSaveLoginAndPasswordInStorage(val)
        }
    },
    async created() {
            if (this.isRememberMe) {
                this.rememberMe = true
                this.form.username = JSON.parse(localStorage.getItem('cc_user_data')).username
                this.form.password = JSON.parse(localStorage.getItem('cc_user_data')).password
            }
            if (this.isRememberMe && !this.$route.params.noRemember) {
                this.TOGGLE_PROGRESS_LOGIN_ACTIVE()
                await this.send()
            }
    },
    // beforeRouteEnter(to, from, next) {
    //     if(localStorage.getItem('cc_user_data')) {
    //
    //     }
    //
    //     next()
    // },
}
</script>

<style lang='scss' scoped>
.section-login {
    padding: $gutter / 2;
    background-color: #fff;

    &__header-box {
        margin-top: 10px;
    }

    &__body {
        position: relative;
        margin-top: $gutter + 10px;
        padding: 0 $gutter / 2;
    }

    &__error-text {
        position: absolute;
        top: -$gutter - 5px;
        left: 0;
        width: 100%;
        color: $color--negative;
        text-align: center;
    }

    &__inp-box {
        & + & {
            margin-top: $gutter;
        }
    }

    &__footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: $gutter;
        padding: 0 $gutter / 2;
    }

    &__send-btn-box {
        margin-top: $gutter / 2;
    }

    &__send-pass-box {
        width: 100%;
        margin-top: $gutter + 10px;
        text-align: center;
    }

}
</style>
