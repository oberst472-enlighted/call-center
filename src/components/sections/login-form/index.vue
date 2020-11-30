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
import {mapActions, mapMutations, mapGetters} from 'vuex'

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
        ...mapGetters('middleware', ['isAdmin', 'isAuth', 'isOperator']),
        isFormFilled() {
            return Boolean(this.form.username && this.form.password)
        }
    },
    methods: {
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapActions('login', ['stLogin']),
        ...mapActions('users', ['stGetUserById', 'stGetUsers']),
        ...mapActions('calls', ['stGetAllCallsForTheCurrentSession', 'stGetAllCalls']),
        ...mapActions('devices', ['stGetDevices']),
        ...mapActions('stat', ['stGetAdminStat']),


        async send() {
            if (!this.isLoading) {
                try {
                    if (this.isFormFilled) {
                        this.isError = false
                        this.isLoading = true

                        const response = await this.stLogin(this.form)
                        if (response.isSuccess) {
                            this.saveInfoOnStorage(response.response.data)
                                this.goToAdminPanel()

                        } else {
                            this.isError = true
                            this.isLoading = false
                        }
                    } else {
                        this.showEmptyErrors()
                        this.isLoading = false
                    }
                } catch {
                    this.ADD_ALERT(['negative'])
                }
            }

        },
        saveInfoOnStorage(payload) {
            const storage = this.rememberMe ? localStorage : sessionStorage

            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')

            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userInfo')

            storage.setItem('token', payload.token)
            storage.setItem('userInfo', JSON.stringify(payload.user))


        },
        toggleSaveLoginAndPasswordInStorage(val) {
            if (this.rememberMe) {
                val ?
                    localStorage.setItem('userData', JSON.stringify(this.form)) :
                    localStorage.removeItem('userData')
            } else {
                localStorage.removeItem('userData')
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

        async goToAdminPanel() {
            if (this.isAuth) {
                if (this.isAdmin) {
                    const isSuccess = await this.loadInitialAdminData()
                    if (isSuccess) {
                        this.$router.push({name: `home-admin`, params: {doNotLoadData: true}})
                    } else {
                        this.ADD_ALERT(['negative'])
                    }
                    this.isLoading = false
                } else if (this.isOperator) {
                    console.log('isOperator')
                    const isSuccess = await this.loadInitialData()
                    if (isSuccess) {
                        this.$router.push({name: `home-operator`, params: {doNotLoadData: true}})
                    } else {
                        this.ADD_ALERT(['negative'])
                    }
                    this.isLoading = false

                }
            } else {
                this.ADD_ALERT(['negative'])
            }
        },

        async loadInitialData() {
            try {
                await this.stGetStat()
                this.stGetAllCallsForTheCurrentSession()
                const response = await Promise.all([
                    await this.stGetDevices(),
                ])
                console.log(response)
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
    created() {
        const data = localStorage.getItem('userData')
        if (data) {
            this.rememberMe = true
            this.form.username = JSON.parse(data).username
            this.form.password = JSON.parse(data).password
        }
    }
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
