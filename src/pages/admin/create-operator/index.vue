<template>
    <section class="page-profile">
        <SectionBox :is-not-pagination="true" content title="Создать нового оператора">
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
                            Электронная почта:
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

                    <div class="page-profile__inp page-profile__inp-pass">
                        <UiInput
                            v-model="form.password"
                            :value="form.password"
                        >
                            Пароль:
                        </UiInput>
                    </div>

                    <div class="page-profile__inp page-profile__inp-username">
                        <UiInput
                            v-model="form.username"
                            :value="form.username"
                        >
                            Логин:
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
                        <UiBtn :loading="isLoading" @click="sendInfo">Создать</UiBtn>
                    </div>
                </div>
            </template>
        </SectionBox>
    </section>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import SectionBox from '@/components/sections/box'
import BlockDragFile from '@/components/blocks/drag-and-drop-file'
import store from '@/store'

export default {
    metaInfo() {
        return {
            title: `Создать оператора`
        }
    },
    components: {
        SectionBox,
        BlockDragFile
    },
    data() {
        return {
            isLoading: false,
            form: {
                first_name: '',
                last_name: '',
                username: '',
                languages: [],
                phone: '',
                email: '',
                password: '',
                // photo: null,
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
        ...mapState('langs', ['langs'])
    },
    methods: {
        ...mapActions('users', ['stCreateUser']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        async sendInfo() {
            this.isLoading = true
            const isSuccess = await this.stCreateUser(this.form)
            if (isSuccess) {
                this.ADD_ALERT(['positive', 'Оператор успешно создан'])
            } else {
                this.ADD_ALERT(['negative'])
            }
            this.isLoading = false
        }
    },
    watch: {
        // langs(val) {
        //     let obj = []
        //     val.forEach(item => obj.push({title: item}))
        //     this.form.languages = obj
        // }
    },
    async beforeRouteEnter(to, from, next) {
        const response = await Promise.all([
            store.dispatch('langs/stGetAllLangs'),
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
            next()
        } else {
            next(false)
            store.commit('alerts/ADD_ALERT', ['negative'])
        }
        store.commit('TOGGLE_PROGRESS_ACTIVE', false)
    },

}
</script>

<style lang="scss" scoped>
.page-profile {
    display: flex;
    align-self: flex-start;
    width: 100%;
    padding-bottom: 30px;

    &__content {
        display: grid;
        grid-template-columns: 1fr 1fr minmax(420px, 1fr);
        grid-gap: 20px;
        align-content: start;
        width: 100%;
        padding: 30px;
        grid-auto-rows: minmax(30px, auto);
        grid-template-areas:
        'first-name last-name file'
        'email phone file'
        'langs langs .'
        'username new-pass .'
        'save-btn . .';
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

        &-langs {
            grid-area: langs;
        }

        &-pass {
            grid-area: new-pass;
        }

        &-username {
            grid-area: username;
        }

        &-file {
            grid-area: file;
        }

        &-save-btn {
            margin-top: auto;
            grid-area: save-btn;
        }
    }

    &__inp {

        &-file {
            display: flex;
            height: 100%;
        }

        &-langs {
            margin-top: 30px;
            margin-bottom: 30px;
        }

        &-save-btn {
            align-self: end;
            margin-top: 60px;
        }
    }

}
</style>
