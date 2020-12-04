<template>
    <section class="page-home">
        <div class="page-home__stat">
            <BlockStat :info="adminStat" class="admin-stat"/>
        </div>

        <div class="page-home__users">
            <LocalDashboardUsers :items="users"/>
        </div>

        <div class="page-home__stat-call">
            <LocalDashboardGraph :items="adminStat.success_statistic"/>
        </div>

        <div class="page-home__rating">
            <LocalDashboardRating/>
        </div>

        <div class="page-home__terminals">
            <LocalDashboardTerminals :items="items"/>
        </div>

        <div class="page-home__password-reset">
            <LocalDashboardResetPass :items="passwordResetRequests"/>
        </div>

        <div class="page-home__call-history">
            <LocalDashboardCalls :items="allCalls"/>
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
import LocalDashboardUsers from './dashboard-users'
import LocalDashboardTerminals from './dashboard-terminals'
import LocalDashboardRating from './dashboard-rating'
import LocalDashboardGraph from './dashboard-graph'
import LocalDashboardResetPass from './dashboard-reset-pass'
import LocalDashboardCalls from './dashboard-calls'

import BlockStat from '@/components/blocks/stat'

export default {
    components: {
        LocalDashboardUsers,
        LocalDashboardTerminals,
        LocalDashboardRating,
        LocalDashboardCalls,
        LocalDashboardResetPass,
        LocalDashboardGraph,
        BlockStat,
    },
    data() {
        return {
            interval: null
        }
    },
    computed: {
        ...mapState('calls', ['allCalls']),
        ...mapState('devices', ['items', 'isNotDevicesPagination']),
        ...mapState('stat', ['adminStat']),
        ...mapState('users', ['users']),
        ...mapState('login', ['passwordResetRequests']),
    },
    methods: {

        ...mapActions('calls', ['stGetAllCallsForTheCurrentSession']),
        ...mapMutations('calls', ['SET_PAGINATION_PAGE']),

        ...mapMutations('alerts', ['ADD_ALERT']),

        ...mapActions('devices', ['stGetDevices']),
        ...mapActions('users', ['stGetUsers']),
        ...mapActions('stat', ['stGetAdminStat']),
        ...mapMutations('devices', ['SET_DEVICES_PAGINATION_PAGE']),
        async getAdminStat() {
            await this.stGetAdminStat()
        }

    },
    async beforeRouteEnter(to, from, next) {
        if (to.params.doNotLoadData) {
            next()
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        } else {
            store.commit('TOGGLE_PROGRESS_ACTIVE', true)
            const response = await Promise.all([
                store.dispatch('stat/stGetAdminStat'),
                store.dispatch('calls/stGetAllCalls'),
                store.dispatch('devices/stGetDevices'),
                store.dispatch('users/stGetUsers'),
                store.dispatch('login/stGetAllPasswordResetRequests'),
            ])
            const isSuccess = response.every(item => item)
            if (isSuccess) {
                next()
            } else {
                next(false)
                store.commit('alerts/ADD_ALERT', ['negative'])
            }
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.getAdminStat()
        }, 20000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
    }
}
</script>

<style lang="scss" scoped>
.page-home {
    display: grid;
    grid-template-columns: 1fr 1fr 300px;
    grid-gap: $gutter;
    width: 100%;
    padding-bottom: 30px;
    grid-template-rows:
        minmax(160px, 180px)
        minmax(227px, 260px)
        minmax(115px, 200px)
        minmax(115px, 200px)
        minmax(200px, 400px);
    grid-template-areas:
        'stat stat users'
        'stat-call stat-call users'
        'terminals terminals rating'
        'terminals terminals password-reset'
        'call-history call-history call-history';

    &__stat {
        display: flex;
        grid-area: stat;
    }

    &__users {
        display: flex;
        grid-area: users;

        /deep/ .page-home__users__item {
            border-top: 1px solid #efeff4;
        }
    }

    &__stat-call {
        display: flex;
        grid-area: stat-call;
    }

    &__rating {
        display: flex;
        grid-area: rating;
    }

    &__terminals {
        display: flex;
        grid-area: terminals;
    }

    &__password-reset {
        align-self: auto;
        height: auto;
        grid-area: password-reset;

        &__item {
            border-top: 1px solid #efeff4;
        }
    }

    &__call-history {
        align-self: auto;
        height: auto;
        grid-area: call-history;
    }

    .content {
        height: 100%;
        padding: 15px;
        overflow: auto;
    }
}
</style>
