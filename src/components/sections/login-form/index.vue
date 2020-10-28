<template>
    <form class="section-login" @submit.prevent="send">
        <div class="section-login__header">
            <img alt="logo" class="section-login__logo" src="@/assets/icons/Chat.svg">
            <div class="section-login__text">
                <span class="section-login__text-top">Вход в колл-центр</span>
                <span class="section-login__text-bottom">Введите свои данные</span>
            </div>
        </div>

        <div class="section-login__body">
            <transition name="fade">
                <span v-if="isError" class="section-login__error-text">Такого пользователя нет <br> или данные введены не корректно</span>
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
                >
                    Запомнить меня
                </UiCheckbox>
            </div>

            <div class="section-login__send-btn-box">
                <UiBtn :loading="isLoading">Войти</UiBtn>
            </div>

            <div class="section-login__send-pass-box">
                <UiLink @click="$router.push('restore-pass')">Забыл пароль?</UiLink>
            </div>
        </div>
    </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    components: {},
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
        isFormFilled() {
            return Boolean(this.form.username && this.form.password)
        }
    },
    methods: {
        ...mapActions('login', ['stLogin']),
        ...mapActions('users', ['stGetUserById']),
        async send() {
            if (!this.isLoading) {
                if (this.isFormFilled) {
                    this.isError = false
                    this.isLoading = true
                    const response = await this.stLogin(this.form)
                    if (response.isSuccess) {
                        this.saveInfoOnStorage(response.response.data)
                        this.isLoading = false

                    } else {
                        this.isError = true
                        this.isLoading = false
                    }
                } else {
                    //логика если поля пустые
                    this.showEmptyErrors()
                    this.isLoading = false
                    console.error('Одно или несколько полей формы пусты')
                }
            }

        },
        saveInfoOnStorage(payload) {
            console.log(payload)

        },
        toggleSaveLoginAndPasswordInStorage(val) {
            val ?
                localStorage.setItem('userData', JSON.stringify(this.form)) :
                localStorage.removeItem('userData')
        },
        showEmptyErrors() {
            if (!this.form.username.length) {
                this.isLoginEmpty = true
            }
            if (!this.form.password.length) {
                this.isPasswordEmpty = true
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

<style lang='scss'>
.section-login {
    background-color: #fff;

    &__header {
        display: flex;
        margin-top: 10px;
    }

    &__logo {
        width: 62px;
        margin-right: 20px;
    }

    &__text {
        display: flex;
        flex-direction: column;

        &-top {
            font-size: 17px;
            color: #362b4f;
            font-weight: 400;
        }

        &-bottom {
            font-size: 15px;
            color: #cfcbd5;
            font-weight: 400;
        }
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
        margin-top: $gutter + 20px;
        text-align: center;
    }

}
</style>
