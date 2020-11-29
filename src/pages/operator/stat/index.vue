<template>
    <section class="page-stat">
        <SectionBox :is-not-pagination="true" content>
            <template #content>
                <div class="page-stat__content">
                    <div class="page-stat__inp page-stat__inp-first-calendar">
                        <component
                            :is="`div`"
                            :key="periodKey"
                        >
                            <UiInputPeriod
                                class="block-download-csv__select-period"
                                :show-placeholder="Boolean(periodVal)"
                                @show="openPeriod"
                                @hidden="closePeriod"
                                @input="periodVal = $event"
                                placeholder="За все время"
                            />
                        </component>
                    </div>
                    <div class="page-stat__inp page-stat__inp-last-operators">
                        <UiSelect
                            class="block-download-csv__select"
                            placeholder="Статус"
                            :items="modifiedOperators"
                            default-value="all"
                            @input="changeOperator"
                            shadow
                        />
                    </div>
                    <div class="page-stat__inp page-stat__inp-statuses">
                        <UiSelect
                            class="block-download-csv__select"
                            placeholder="Статус"
                            :items="modifiedStatuses"
                            default-value="all"
                            @input="changeStatus"
                            shadow
                        />
                    </div>


                    <div class="page-stat__inp page-stat__inp-save-btn">
                        <UiBtn @click="sendInfo">Выгрузить</UiBtn>
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
export default {
    components: {
        SectionBox,
    },
    data() {
        return {
            periodVal: null,
            periodString: '',
            periodKey: 1,
            statusVal: ''

        }
    },
    computed: {
        modifiedStatuses() {
            return [
                {title: 'Оператор 1', code: '1', id: 'all'},
                {title: 'Оператор 2', code: '2', id: 'all'},
                {title: 'Оператор 3', code: '3', id: 'all'},
            ]
            // const stats = [...this.statuses]
            // stats.unshift({title: 'Все статусы', code: '', id: 'all'})
            // return stats
        },
        modifiedOperators() {
            return [
                {title: 'Принято', code: '1', id: 'all'},
                {title: 'Не принято', code: '2', id: 'all'},
                {title: 'Закрыто', code: '3', id: 'all'},
            ]
            // const stats = [...this.statuses]
            // stats.unshift({title: 'Все статусы', code: '', id: 'all'})
            // return stats
        },
    },
    methods: {
        ...mapActions('csv', ['stDownloadCsw']),
        openPeriod() {
            console.log(6)
            this.periodString = JSON.stringify(this.periodVal)
        },
        closePeriod() {
            console.log(5)
            // if (Boolean(!this.periodVal.start) ||
            //     Boolean(!this.periodVal.end)) {
            //     this.periodVal = ''
            //     this.periodKey += 1
            // }
        },
        changeStatus(payload) {
            this.statusVal = payload.code
        },
        changeOperator(payload) {
            this.statusVal = payload.code
        },
        async sendInfo() {
            const res = await this.stDownloadCsw(this.$route.params.id)
            window.open(res.data.file)
        }
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
        //outline: 1px solid red;
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
