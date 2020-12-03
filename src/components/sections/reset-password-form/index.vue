<template>
    <form class="section-reset-password" @submit.prevent="send">
        <div class="section-reset-password__header-box">
            <BlockFormHeader
                title="Восстановление пароля"
                subtitle="Введите свой email"
            />
        </div>

        <div class="section-reset-password__body">
            <transition name="fade">
                <span
                    v-if="isError"
                    class="section-reset-password__error-text"
                >
                    Данные введены не верно <br> или пользователя с такими данными нет
                </span>
            </transition>

            <div class="section-reset-password__inp-box">
                <UiInput
                    v-model="form.username"
                    :is-empty="isLoginEmpty"
                    icon="iconUser"
                    placeholder="Введите логин"
                />
            </div>
        </div>

        <div class="section-reset-password__footer">
            <div class="section-reset-password__btn-box">
                <UiBtn :loading="isLoading">Запросить новый пароль</UiBtn>
            </div>

            <div class="section-reset-password__pass-box">
                <UiLink @click="$router.push({name: 'login'})">Назад</UiLink>
            </div>
        </div>
    </form>
</template>

<script>
import BlockFormHeader from '@/components/blocks/form-header'
import {mapActions} from 'vuex'

export default {
    components: {
        BlockFormHeader
    },
    data() {
        return {
            form: {
                username: '',
            },
            isError: false,
            isLoading: false,
            isLoginEmpty: false,
        }
    },

    metaInfo() {
        return {
            title: `Восстановление пароля`
        }
    },
    computed: {
        isFormFilled() {
            return Boolean(this.form.username)
        }
    },
    methods: {
        ...mapActions('login', ['stLogin']),
        ...mapActions('users', ['stGetUserById']),
        ...mapActions('alerts', ['showAlert']),
        async send() {
            // if (!this.isLoading) {
            //     try {
            //         if (this.isFormFilled) {
            //             this.isError = false
            //             this.isLoading = true
            //             const response = await this.stLogin(this.form)
            //             if (response.isSuccess) {
            //                 this.saveInfoOnStorage(response.response.data)
            //
            //             } else {
            //                 this.isError = true
            //             }
            //         } else {
            //             this.showEmptyErrors()
            //             console.error('Одно или несколько полей формы пусты')
            //         }
            //     } catch {
            //         this.showAlert(['negative', 'Возник системный сбой, перезагрузите страницу и повторите операцию!'])
            //         console.error('Системный сбой')
            //     } finally {
            //         this.isLoading = false
            //     }
            // }

        },
        showEmptyErrors() {
            if (!this.form.username.length) {
                this.isLoginEmpty = true
            }
        }
    },
    watch: {
        'form.username'(val) {
            if (val) {
                this.isLoginEmpty = false
                this.isError = false
            }
        }
    }
}
</script>

<style lang='scss'>
.section-reset-password {
    background-color: #fff;
    padding: $gutter / 2;

    &__header-box {
        margin-top: 10px;
    }

    &__body {
        position: relative;
        margin-top: $gutter * 2;
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
        justify-content: flex-end;
        margin-top: $gutter;
        padding: 0 $gutter / 2;
    }

    &__pass-box {
        width: 100%;
        margin-top: $gutter + 20px;
        text-align: center;
    }

}
</style>
