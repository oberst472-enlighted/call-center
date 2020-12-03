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
            statusVal: '',
            operatorVal: ''

        }
    },
    computed: {
        ...mapState('csv', ['statuses']),
        ...mapState('users', ['users']),
        modifiedStatuses() {
            const arr = [
                {title: 'Все статусы', code: 'all', id: '1'}
            ]
            for (let value in this.statuses) {
                arr.push({title: this.statuses[value], code: value, id: value})
            }
            return arr
        },
        modifiedOperators() {
            const arr = [
                {title: 'Все операторы', code: 'all', id: '1'}
            ]
            this.users.forEach(item => {
                arr.push({title: `${item.first_name} ${item.last_name}`, code: item.id, id: item.id})
            })
            return arr
        },
    },
    methods: {
        ...mapActions('csv', ['stDownloadCsw']),
        openPeriod() {
            this.periodString = JSON.stringify(this.periodVal)
        },
        closePeriod() {
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
            this.operatorVal = payload.code
        },
        async sendInfo() {

            const from = Math.round(+new Date(this.periodVal.start) / 1000)
            const to = Math.round(+new Date(this.periodVal.end) / 1000)

            const params = `?from=${from}&to=${to}&status=${this.statusVal}&user=${this.operatorVal}`
            const res = await this.stDownloadCsw(params)
            window.open(res.data.file)
        },
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        try {
            const response = await Promise.all([
                store.dispatch('csv/stGetAllStatuses'),
                store.dispatch('users/stGetUsers')
            ])
            const isSuccess = response.every(item => item)
            if (isSuccess) {
                next()
            } else {
                next(false)
            }
        } catch (e) {
            console.log(e)
        } finally {
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        }
    },
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
