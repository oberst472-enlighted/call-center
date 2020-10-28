<template>
    <div id="DashBoard">
        <div class="row">
            <div class="col-left">
                <BlockStatusAdminDashboard v-if="isStatusAdminDashboardActive"/>

                <BlockStatusOperatorDashboard v-else-if="isOperator && $store.state.userData"/>

                <div class="row" v-if="isAdmin">
                    <div class="col">
                        <BlockGraph/>
                    </div>
                    <div class="col" v-if="stat">
                        <BlockRating :data="stat.callsHelpfulness"/>
                    </div>
                </div>

                <div class="row">
                    <BlockAvailableTerminals/>
                </div>

                <div class="row" v-if="isAdmin">
                    <BlockCallHistoryBig/>
                </div>

            </div>
            <div class="col-right">
                <BlockCallWindow
                    v-if="isOperator"
                    @click="answer"
                />

                <BlockUserSmall v-if="isBlockUserSmallActive"/>

                <BlockCallHistorySmall
                    v-else-if="isOperator && callsOperator"
                    :data="callsOperator"
                />

                <BlockRestoreQue v-if="isAdmin"/>

            </div>
        </div>
    </div>
</template>

<script>
import BlockStatusAdminDashboard from '@/components/blocks/status-admin-dashboard'
import BlockCallWindow from '@/components/blocks/call-window'
import BlockUserSmall from '@/components/blocks/user-small'
import BlockGraph from '@/components/blocks/graph'
import BlockAvailableTerminals from '@/components/blocks/available-terminals'
import BlockCallHistoryBig from '@/components/blocks/call-history-big'
import BlockCallHistorySmall from '@/components/blocks/call-history-small'
import BlockRestoreQue from '@/components/blocks/restore-que'
import BlockStatusOperatorDashboard from '@/components/blocks/status-operator-dashboard'

import BlockRating from '@/components/blocks/rating'
import {mapState, mapMutations} from 'vuex'
import store from '@/store'

export default {
    components: {
        BlockCallWindow,
        BlockStatusAdminDashboard,
        BlockStatusOperatorDashboard,
        BlockUserSmall,
        BlockGraph,
        BlockAvailableTerminals,
        BlockCallHistoryBig,
        BlockCallHistorySmall,
        BlockRestoreQue,
        BlockRating,
    },
    props: {
        answer: Function,
    },
    metaInfo() {
        return {
            title: `Dashboard - Колл-центр ${localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')}`
        }
    },
    data() {
        return {
            statisticsAdmin: null,
            statisticsOperator: null,
            graphData: [],
            callsAdmin: null,
        }
    },
    computed: {
        ...mapState(['callsOperator', 'userStatus']),
        ...mapState('stat', ['stat']),
        ...mapMutations(['TOGGLE_BG_ACTIVE']),
        isStatusAdminDashboardActive() {
            return this.$store.state.userStatus === 'admin' && this.stat
        },
        isBlockUserSmallActive() {
            return this.$store.state.userStatus === 'admin'
        },
        isAdmin() {
            return this.userStatus === 'admin'
        },
        isOperator() {
            return this.userStatus === 'operator'
        }
    },
    async beforeRouteEnter(to, from, next) {
        //если авторизован оператор
        if(store.getters.getIsRoleOperator) {
            const response = await Promise.all([
                store.dispatch('users/stCallsOperator', store.getters.getUserId),
            ])
            if (response.every(item => item)) {
                next()
            } else {
                next(false)
                //выводим попап с ошибкой
            }
        }
        //если авторизован админ
        else {
            this.TOGGLE_BG_ACTIVE()
            const response = await Promise.all([
                store.dispatch('users/stGetUsers'),
                store.dispatch('stat/stGetStat', store.getters.getCallCenterId),
                store.dispatch('calls/stGetCalls'),
            ])
            if (response.every(item => item)) {
                this.TOGGLE_BG_ACTIVE(false)
                next()
            } else {
                this.TOGGLE_BG_ACTIVE(false)
                next(false)
                //выводим попап с ошибкой
            }
        }
    }
}
</script>

<style lang='scss'>
#DashBoard {
    .row {
        display: flex;
        padding-top: 20px;

        .col-left {
            width: 68%;
            margin-right: 20px;
        }

        .col-right {
            width: 300px;
        }

        .col {
            width: 50%;

            &:first-child {
                margin-right: 10px;
            }

            &:last-child {
                margin-left: 10px;
            }
        }
    }
}
</style>
