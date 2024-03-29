<template>
    <SectionBox
        is-not-pagination
        content
        class="section-csv-form"
        :class="{'section-csv-form--admin': isAdmin}"
    >
        <template #content>
            <div class="section-csv-form__content">
                <div class="section-csv-form__inp section-csv-form__inp-calendar">
                    <component
                        :is="`div`"
                        :key="periodKey"
                    >
                        <UiInputPeriod
                            class="section-csv-form__select-period"
                            :show-placeholder="Boolean(periodVal)"
                            @show="openPeriod"
                            @hidden="closePeriod"
                            @input="periodVal = $event"
                            placeholder="За все время"
                        />
                    </component>
                </div>

                <div class="page-stat__inp page-stat__inp-last-operators" v-if="isAdmin">
                    <UiSelect
                        class="block-download-csv__select"
                        placeholder="Статус"
                        :items="operators"
                        default-value="all"
                        @input="changeOperator"
                        shadow
                    />
                </div>

                <div class="section-csv-form__inp section-csv-form__inp-statuses">
                    <UiSelect
                        class="block-download-csv__select"
                        placeholder="Статус"
                        :items="statuses"
                        default-value="all"
                        @input="changeStatus"
                        shadow
                    />
                </div>


                <div class="section-csv-form__inp section-csv-form__inp-save-btn">
                    <UiBtn @click="sendInfo" :loading="loading">Выгрузить</UiBtn>
                </div>
            </div>
        </template>
    </SectionBox>
</template>

<script>
import SectionBox from '@/components/sections/box'
import {isRoleAdmin} from '@/utils/middleware'
export default {
    components: {
        SectionBox,
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        statuses: {
            type: Array,
            default: () => []
        },
        operators: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            isAdmin: false,
            periodVal: null,
            periodString: '',
            periodKey: 1,
            statusVal: '',
            operatorVal: ''
        }
    },
    computed: {
    },
    methods: {
        openPeriod() {
            this.periodString = JSON.stringify(this.periodVal)
        },
        closePeriod() {
            if (Boolean(!this.periodVal.start) ||
                Boolean(!this.periodVal.end)) {
                this.periodVal = ''
                this.periodKey += 1
            }
        },
        changeStatus(payload) {
            this.statusVal = payload.code
        },
        changeOperator(payload) {
            this.operatorVal = payload.code
        },
        sendInfo() {
            const from = this.periodVal ?
                Math.round(+new Date(this.periodVal.start) / 1000) :
                ''
            const to = this.periodVal ?
                Math.round(+new Date(this.periodVal.end) / 1000) :
                ''
                this.$emit('submit', {from: from, to: to, status: this.statusVal, user: this.operatorVal === 'all' ? '' : this.operatorVal })
        }
    },
    mounted() {
        this.isAdmin = isRoleAdmin()
    }
}
</script>

<style scoped lang="scss">
.section-csv-form {
    &__content {
        padding: 30px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        grid-auto-rows: minmax(33px, auto);
        grid-template-areas:
        'calendar statuses .'
        'save-btn . .';
    }
    &__inp {
        &-calendar {
            grid-area: calendar;
        }

        &-statuses {
            grid-area: statuses;
        }
        &-save-btn {
            grid-area: save-btn;
        }
    }
    &--admin {
        .section-csv-form__content {
            grid-template-areas:
        'calendar operators statuses'
        'save-btn . .';
        }
        &__inp {
            &-operators {
                grid-area: operators;
            }
        }
    }
}
</style>
