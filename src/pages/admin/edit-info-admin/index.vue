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
import store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
import SectionBox from '@/components/sections/box'
// import BlockFile from '@/components/blocks/file'
import BlockDragFile from '@/components/blocks/drag-and-drop-file'
import {getJsonFromString} from '@/utils/json'

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
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('sessions', ['isSessionBreak']),
        ...mapState('users', ['userInfo']),
    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),
        ...mapActions('users', ['stEditUserById']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        async sendInfo() {
            this.isLoading = true
            const info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
            const infoObj = getJsonFromString(info)
            const isSuccess = await this.stEditUserById({id: infoObj.id, body: this.form})
            console.log(isSuccess)
            if (isSuccess) {
                const data = localStorage.getItem('userData')
                const storage = data ? localStorage : sessionStorage
                console.log(this.userInfo)
                storage.setItem('userinfo', this.userInfo)
                this.ADD_ALERT(['positive', 'Данные успешно изменены'])
            }
            else {
                this.ADD_ALERT(['negative'])
            }
            this.isLoading = false
        }
    },
    async beforeRouteEnter(to, from, next) {
        const info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
        const infoObj = getJsonFromString(info)
        const response = await Promise.all([
            store.dispatch('users/stGetUserById', infoObj.id),
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
            next()
        } else {
            next(false)
            // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
        }
        // store.dispatch('toggleLoading', false)
    },
    mounted() {
        // const info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
        // const infoObj = getJsonFromString(info)
        console.log(this.userInfo.first_name)
        this.form.first_name = this.userInfo.first_name
        this.form.last_name = this.userInfo.last_name
        this.form.email = this.userInfo.email
        this.form.phone = this.userInfo.phone

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
