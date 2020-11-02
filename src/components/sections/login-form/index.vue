<template>
    <form class="section-login" @submit.prevent="send">
        <div class="section-login__header-box">
            <BlockFormHeader
                title="Вход в колл-центр"
                subtitle="Введите свои данные"
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
import {mapGetters, mapActions} from 'vuex'

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
        ...mapGetters('middleware', ['isAdmin', 'isAuth', 'isOperator', 'isAdmin']),
        isFormFilled() {
            return Boolean(this.form.username && this.form.password)
        }
    },
    methods: {
        ...mapActions('login', ['stLogin']),
        ...mapActions('users', ['stGetUserById']),
        ...mapActions('alerts', ['showAlert']),
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
                        }
                    } else {
                        this.showEmptyErrors()
                        console.error('Одно или несколько полей формы пусты')
                    }
                } catch {
                    this.showAlert(['negative', 'Возник системный сбой, перезагрузите страницу и повторите операцию!'])
                    console.error('Системный сбой')
                } finally {
                    this.isLoading = false
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
            }
            else {
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
        goToAdminPanel() {
            if (this.isAuth) {
                if (this.isAdmin) {
                    this.$router.push({name: 'home-admin'})
                }
                else if (this.isOperator) {
                    this.$router.push({name: 'home-operator'})
                }
            }
            else {
                console.error('Системный сбой')
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
