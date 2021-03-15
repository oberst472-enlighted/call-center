<template>
    <section class="page-profile">
        <SectionBox :is-not-pagination="true" content>
            <template #content>
                <div class="page-profile__content">
                    <div class="page-profile__inp page-profile__inp-first-name">
                        <UiInput
                            v-model="form.first_name"
                            :is-empty="empty.isFirstNameEmpty"
                            :value="form.first_name"
                        >
                            Имя:
                        </UiInput>
                    </div>
                    <div class="page-profile__inp page-profile__inp-last-name">
                        <UiInput
                            v-model="form.last_name"
                            :is-empty="empty.isLastNameEmpty"
                            :value="form.last_name"
                        >
                            Фамилия:
                        </UiInput>
                    </div>
                    <div class="page-profile__inp page-profile__inp-email">
                        <UiInput
                            v-model="form.email"
                            :value="form.email"
                            validation-rule="@"
                            validation-text="Ошибка, это не email"
                            @isValid="validation.isEmailValid = $event"
                        >
                            Электронная почта
                        </UiInput>
                    </div>

                    <div class="page-profile__inp page-profile__inp-phone">
                        <UiInput
                            v-model="form.phone"
                            :is-empty="empty.isPhoneEmpty"
                            :value="form.phone"
                            placeholder="89261234567"
                            validation-rule="^\d+$"
                            validation-text="Ошибка, только цифры!"
                            @isValid="validation.isPhoneValid = $event"
                        >
                            Телефон:
                        </UiInput>
                    </div>

                    <div class="page-profile__inp page-profile__inp-langs">
                        <UiCheckboxGroup v-model="form.languages" :values="langs">
                            Язык:
                        </UiCheckboxGroup>
                    </div>

                    <div class="page-profile__inp page-profile__inp-new-pass">
                        <UiInput
                            v-model="form.password"
                            :value="form.password"
                        >
                            Новый пароль
                        </UiInput>
                    </div>

                    <div class="page-profile__inp page-profile__inp-file">
                        <BlockDragFile>
                            <!-- v-model="form.photo"-->
                            <!--                            :default-value="form.photo"-->
                            <!--                            />-->
                        </blockdragfile>
                    </div>

                    <div class="page-profile__inp page-profile__inp-save-btn">
                        <UiBtn @click="sendInfo" :loading="isLoading">Сохранить</UiBtn>
                    </div>
                </div>
            </template>
        </SectionBox>
    </section>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import SectionBox from '@/components/sections/box'
// import BlockFile from '@/components/blocks/file'
import BlockDragFile from '@/components/blocks/drag-and-drop-file'
import store from '@/store'

export default {
    components: {
        SectionBox,
        // BlockFile
        BlockDragFile
    },
    data() {
        return {
            isLoading: false,
            form: {
                first_name: '',
                last_name: '',
                phone: '',
                languages: [],
                email: '',
                password: '',
                photo: null,
            },
            empty: {
                isFirstNameEmpty: false,
                isLastNameEmpty: false,
                isPhoneEmpty: false,
            },
            validation: {
                isPhoneValid: false,
                isEmailValid: false
            },

        }
    },
    computed: {
        ...mapState('langs', ['langs']),
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('sessions', ['isSessionBreak']),
        ...mapState('users', ['userInfo']),
    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),
        ...mapActions('users', ['stEditUserById']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapMutations('users', ['SET_MAIN_USER_INFO']),
        async sendInfo() {
            try {
                this.isLoading = true
                const isSuccess = await this.stEditUserById({id: this.userInfo.id, body: this.form})
                if (isSuccess) {
                    // this.SET_MAIN_USER_INFO(isSuccess)
                    this.ADD_ALERT(['positive', 'Данные успешно изменены'])
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
    created() {
        this.form.first_name = this.userInfo.first_name
        this.form.last_name = this.userInfo.last_name
        this.form.email = this.userInfo.email
        this.form.phone = this.userInfo.phone
        this.form.languages = this.userInfo.languages.map(item => item.id)

    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        const id = to.params.id ? to.params.id : from.params.id
        const response = await Promise.all([
            store.dispatch('users/stGetUserById', id),
            store.dispatch('langs/stGetAllLangs'),
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
            next()

        } else {
            next(false)
            // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
        }
        store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        // store.dispatch('toggleLoading', false)
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
        grid-template-columns: 1fr 1fr minmax(420px, 1fr);
        grid-gap: 20px;
        width: 100%;
        padding: 30px;
        grid-auto-rows: minmax(60px, auto);
        grid-template-areas:
        'first-name last-name file'
        'email phone file'
        'langs . .'
        'new-pass . save-btn';
    }

    &__inp {
        &-first-name {
            grid-area: first-name;
        }

        &-last-name {
            grid-area: last-name;
        }

        &-email {
            grid-area: email;
        }

        &-phone {
            grid-area: phone;
        }

        &-new-pass {
            margin-top: 60px;
            grid-area: new-pass;
        }
        &-langs {
            grid-area: langs;
        }

        &-file {
            display: flex;
            height: 100%;
            grid-area: file;
        }

        &-save-btn {
            align-self: end;
            margin-top: 60px;
            margin-left: auto;
            grid-area: save-btn;
        }
    }

}
</style>
