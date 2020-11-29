<template>
    <section class="page-profile">
        <SectionBox :is-not-pagination="true" content>
            <template #content>
                <div class="page-profile__content">
                    <div class="page-profile__inp page-profile__inp-first-name">
                        <UiInput
                            v-model="form.first_name"
                            :value="form.first_name"
                            :is-empty="empty.isFirstNameEmpty"
                        >
                            Имя <span class="negative">*</span>
                        </UiInput>
                    </div>
                    <div class="page-profile__inp page-profile__inp-last-name">
                        <UiInput
                            v-model="form.last_name"
                            :value="form.last_name"
                            :is-empty="empty.isLastNameEmpty"
                        >
                            Фамилия <span class="negative">*</span>
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
                            :value="form.phone"
                            placeholder="89261234567"
                            validation-rule="^\d+$"
                            validation-text="Ошибка, только цифры!"
                            @isValid="validation.isPhoneValid = $event"
                            :is-empty="empty.isPhoneEmpty"
                        >
                            Телефон <span class="negative">*</span>
                        </UiInput>
                    </div>
                    <div class="page-profile__inp page-profile__inp-new-pass">
                        <UiInput
                            v-model="form.new_password"
                            :value="form.new_password"
                        >
                            Новый пароль
                        </UiInput>
                    </div>

                    <div class="page-profile__inp page-profile__inp-file">
                        <BlockDragFile
                            :default-value="form.file"
                            v-model="form.file"
                        />
                    </div>

                    <div class="page-profile__inp page-profile__inp-save-btn">
                        <UiBtn>Сохранить</UiBtn>
                    </div>
                </div>
            </template>
        </SectionBox>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapActions} from 'vuex'
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
            form: {
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                new_password: '',
                file: null,
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
        ...mapState('terminals', ['items', 'isNotDevicesPagination']),
        ...mapState('stat', ['stat']),
        ...mapState('sessions', ['isSessionBreak']),
    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),
    },
    async beforeRouteEnter(to, from, next) {
        const info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
        const infoObj = getJsonFromString(info)
        console.log(infoObj)
        const response = await Promise.all([
            store.dispatch('users/stGetUserById', infoObj),
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
    created() {
        const info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
        const infoObj = getJsonFromString(info)
        this.form.first_name = infoObj.first_name
        this.form.last_name = infoObj.last_name
        this.form.email = infoObj.email
        this.form.phone = infoObj.phone

        console.log(infoObj)
    }
}
</script>

<style scoped lang="scss">
.page-profile {
    padding-bottom: 30px;
    width: 100%;
    display: flex;
    &__content {
        padding: 30px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr minmax(420px, 1fr);
        grid-gap: 20px;
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
            grid-area: new-pass;
            margin-top: 60px;
        }
        &-file {
            grid-area: file;
            height: 100%;
            display: flex;
        }
        &-save-btn {
            align-self: end;
            margin-left: auto;
            margin-top: 60px;
            grid-area: save-btn;
        }
    }

}
</style>
