<template>
    <section class="page-stat">
        <SectionBox :is-not-pagination="true" content>
            <template #content>
                <div class="page-stat__content">
                    <div class="page-stat__inp page-stat__inp-first-calendar">
                        calendar
                    </div>
                    <div class="page-stat__inp page-stat__inp-last-operators">
                        operator-list
                    </div>
                    <div class="page-stat__inp page-stat__inp-statuses">
                        status-list
                    </div>


                    <div class="page-stat__inp page-stat__inp-save-btn">
                        <UiBtn>Выгрузить</UiBtn>
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
import {getJsonFromString} from '@/utils/json'
export default {
    components: {
        SectionBox,
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
    },
    methods: {
    },
    // async beforeRouteEnter(to, from, next) {
    //     const response = await Promise.all([
    //         // store.dispatch('users/stGetUserById', infoObj),
    //     ])
    //     const isSuccess = response.every(item => item)
    //     if (isSuccess) {
    //         next()
    //     } else {
    //         next(false)
    //         // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
    //     }
    //     // store.dispatch('toggleLoading', false)
    // },
}
</script>

<style scoped lang="scss">
.page-stat {
    padding-bottom: 30px;
    width: 100%;
    display: flex;
    &__content {
        padding: 30px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        grid-auto-rows: minmax(33px, auto);
        grid-template-areas:
        'calendar operators statuses'
        'save-btn . .';
    }
    &__inp {
        outline: 1px solid red;
        &-calendar {
            grid-area: calendar;
        }
        &-operators {
            grid-area: operators;
        }
        &-statuses {
            grid-area: statuses;
        }
        &-save-btn {
            grid-area: save-btn;
        }
    }

}
</style>
