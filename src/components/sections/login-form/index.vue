<template>
    <form class="section-login" @submit.prevent="send">
        <div class="section-login__header">
            <img class="section-login__logo" src="@/assets/icons/Chat.svg" alt="logo">
            <div class="section-login__text">
                <span class="section-login__text-top">Вход в колл-центр</span>
                <span class="section-login__text-bottom">Введите свои данные</span>
            </div>
        </div>

        <div class="section-login__body">
            <div class="section-login__inp-box">
                <UiInput
                    placeholder="Введите логин"
                    icon="iconUser"
                    v-model="form.login"
                />
            </div>

            <div class="section-login__inp-box">
                <UiInput
                    placeholder="Введите пароль"
                    icon="IconKey"
                    type="password"
                    v-model="form.password"
                />
            </div>
        </div>

        <div class="section-login__footer">
            <div class="section-login__check-box">
                <UiCheckbox
                    @click="form.remember_me"
                >
                    Запомнить меня
                </UiCheckbox>
            </div>

            <div class="section-login__send-btn-box">
                <UiBtn>Войти</UiBtn>
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
    components: {
    },
    data() {
        return {
            form: {
                login: '',
                password: '',
                remember_me: ''
            },
            login: '',
            password: '',
            rememberMe: false,
            error: false
        }
    },

    metaInfo() {
        return {
            title: `Вход в систему`
        }
    },
    methods: {
        ...mapActions('login', ['stLogin']),
        async send() {
            if (this.form.login && this.form.password) {
              const isSuccess = await this.stLogin(this.form)
                console.log(isSuccess)
            }
            else {
                //логика если поля пустые
                console.log('поля формы пустые')
            }
        },
        async submitRegistration() {
            this.error = await this.$store.dispatch('logIn', {
                login: this.login.trim(),
                password: this.password.trim(),
                rememberMe: this.rememberMe
            })


            if (sessionStorage.getItem('isUserLoggedIn')) {
                this.$router.push('/dashboard')
            } else if (localStorage.getItem('isUserLoggedIn')) {
                this.$router.push('/dashboard')
            }

            this.$store.commit('toggleWorkingStatus', 'online')

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
            color: #362b4f;
            font-size: 17px;
            font-weight: 400;
        }
        &-bottom {
            color: #cfcbd5;
            font-size: 15px;
            font-weight: 400;
        }
    }
    &__body {
        padding: 0 $gutter / 2;
        margin-top: $gutter + 10px;
    }
    &__inp-box {
        & + & {
            margin-top: $gutter / 2;
        }
    }
    &__footer {
        padding: 0 $gutter / 2;
        margin-top: $gutter / 2;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    &__send-btn-box {
        margin-top: $gutter / 2;
    }
    &__send-pass-box {
        margin-top: $gutter * 2;
        width: 100%;
        text-align: center;
    }

}
//.icon-user__box {
//    width:16px;
//    height:16px;
//    color: $color--primary;
//}
//#Login {
//    .log {
//        width: 250px;
//        height: 50px;
//        position: fixed;
//        color: white;
//        font-weight: 700;
//        font-size: 20px;
//        display: flex;
//        align-items: center;
//        justify-content: center;
//        left: 10px;
//        cursor: pointer;
//    }
//
//    .operator {
//        background-color: #3e58fe;
//        top: 40%;
//    }
//
//    .adm {
//        background-color: #4a4355;
//        top: 50%;
//
//    }
//
//    width: 430px;
//    height: 409px;
//    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
//    border-radius: 8px;
//    background-color: #ffffff;
//    display: flex;
//    flex-direction: column;
//    justify-content: space-between;
//    padding: 35px 48px;
//
//    .header {
//        display: flex;
//
//        &-chat {
//            margin-right: 18px;
//        }
//
//
//    }
//
//    .inputs {
//        margin-top: 30px;
//
//        .input {
//            display: flex;
//            margin-bottom: 17px;
//
//            &-icon {
//                width: 39px;
//                height: 39px;
//                border-radius: 8px 0 0 8px;
//                background-color: #f4f3f7;
//                display: flex;
//                justify-content: center;
//                align-items: center;
//            }
//
//            &-field {
//                flex: 1 1 auto;
//                height: 39px;
//                border-radius: 0 8px 8px 0;
//                border: 1px solid #dddddd;
//                outline: none;
//                padding: 0 13px;
//            }
//        }
//    }
//
//    .checkbox {
//        display: flex;
//        align-items: center;
//        color: #4e545b;
//        font-size: 12px;
//        font-weight: 400;
//        cursor: pointer;
//
//        .checkmark {
//            width: 18px;
//            height: 18px;
//            margin-right: 10px;
//            border-radius: 50%;
//            background-color: #f4f3f7;
//            cursor: pointer;
//        }
//
//        .checkmark:hover {
//            background-color: #ccc;
//        }
//
//        .checkmark.active {
//            background-color: #4caf50;
//        }
//    }
//
//    .button {
//        display: block;
//        align-self: end;
//        width: 100px;
//        height: 33px;
//        border-radius: 8px;
//        background-color: #66538a;
//        margin-left: 235px;
//        color: #ffffff;
//        font-size: 12px;
//        font-weight: 400;
//        outline: none;
//        border: none;
//        margin-bottom: 40px;
//        cursor: pointer;
//
//        &:disabled {
//            background-color: #2e2e2e;
//        }
//
//        &:hover {
//            transform: scale(1.03);
//        }
//
//        &:disabled:hover {
//            transform: scale(1);
//        }
//    }
//
//    .bottom {
//        display: flex;
//        flex-direction: column;
//        align-items: center;
//        margin-bottom: 10px;
//
//        .bottom__top, .bottom__bottom {
//            color: #4e545b;
//            font-size: 12px;
//            font-weight: 400;
//            cursor: pointer;
//        }
//    }
//
//    .error-text {
//        margin-top: 15px;
//        color: red;
//        text-align: center;
//        font-size: 13px;
//    }
//}
</style>
