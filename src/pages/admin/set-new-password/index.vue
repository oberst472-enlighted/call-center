<template>
    <section class="page-profile">
        <SectionBox :is-not-pagination="true" content>
            <template #content>
                <div class="page-profile__content">
                    <div class="page-profile__inp page-profile__inp-first-name">
                        <UiInput
                            v-model="form.password"
                            :is-empty="empty.isPasswordEmpty"
                            :value="form.isPasswordValid"
                            type="password"
                        >
                            Новый пароль:
                        </UiInput>
                    </div>

                    <div class="page-profile__inp page-profile__inp-last-name">
                        <UiInput
                            v-model="form.password2"
                            :is-empty="empty.isPassword2Empty"
                            :value="form.isPassword2Valid"
                            type="password"
                        >
                            Повторите пароль:
                        </UiInput>
                    </div>

                    <div class="page-profile__inp page-profile__inp-save-btn">
                        <UiBtn @click="sendInfo" :loading="isLoading" :disabled="passwordsDoNotMatch">Изменить</UiBtn>
                    </div>
                </div>
            </template>
        </SectionBox>
    </section>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import SectionBox from '@/components/sections/box'
// import BlockFile from '@/components/blocks/file'

export default {
    components: {
        SectionBox,
        // BlockFile
    },
    data() {
        return {
            isLoading: false,
            form: {
                password: '',
                password2: '',
            },
            empty: {
                isPasswordEmpty: false,
                isPassword2Empty: false,
            },
            validation: {
                isPasswordValid: false,
                isPassword2Valid: false,
            },

        }
    },
    computed: {
        passwordsDoNotMatch() {
            return this.form.password !== this.form.password2
        }
    },
    methods: {
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapActions('login', ['stSetNewPasswordToOperator']),
        async sendInfo() {
            try {
                this.isLoading = true
                const isSuccess = await this.stSetNewPasswordToOperator({id: this.$route.params.id, body: this.form})
                if (isSuccess) {
                    this.ADD_ALERT(['positive', 'Новый пароль для оператора успещно установлен'])
                }
                else {
                    this.ADD_ALERT(['negative'])
                }
                this.isLoading = false
            } catch (e) {
                console.log(e)
                this.isLoading = false
                this.ADD_ALERT(['negative'])
            }
        }
    },

}
</script>

<style lang="scss" scoped>
.page-profile {
    display: flex;
    width: 100%;
    padding-bottom: 30px;

    &__content {
        display: grid;
        grid-template-columns: 200px 200px;
        grid-gap: 20px;
        width: 100%;
        padding: 30px;
        grid-auto-rows: minmax(60px, auto);
        grid-template-areas:
        'pass pass2'
        'save-btn .';
    }

    &__inp {
        &-first-name {
            grid-area: pass;
        }

        &-last-name {
            grid-area: pass2;
        }

        &-save-btn {
            align-self: end;
            margin-top: 60px;
            grid-area: save-btn;
        }
    }

}
</style>
