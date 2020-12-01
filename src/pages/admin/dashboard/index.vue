<template>
    <section class="page-home">
        <div class="page-home__stat">
            <BlockStat :info="stat"/>
        </div>

        <div class="page-home__users">
            <LocalDashboardUsers :items="users"/>
        </div>

        <div class="page-home__stat-call">
            <LocalDashboardGraph/>
        </div>

        <div class="page-home__rating">
            <LocalDashboardRating/>
        </div>

        <div class="page-home__terminals">
            <LocalDashboardTerminals :items="items"/>
        </div>

        <div class="page-home__password-reset">
            <LocalDashboardResetPass/>
        </div>

        <div class="page-home__call-history">
            <LocalDashboardCalls :items="allCalls"/>
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions} from 'vuex'
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
    computed: {
        ...mapState('calls', ['allCalls']),
        ...mapState('devices', ['items', 'isNotDevicesPagination']),
        ...mapState('stat', ['stat']),
        ...mapState('users', ['users']),
    },
    methods: {

        ...mapActions('calls', ['stGetAllCallsForTheCurrentSession']),
        ...mapMutations('calls', ['SET_PAGINATION_PAGE']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapMutations(['TOGGLE_PROGRESS_ACTIVE']),

        ...mapActions('devices', ['stGetDevices']),
        ...mapActions('users', ['stGetUsers']),
        ...mapMutations('devices', ['SET_DEVICES_PAGINATION_PAGE']),

    },
    async beforeRouteEnter(to, from, next) {
        if (!to.params.doNotLoadData) {
            store.commit('TOGGLE_PROGRESS_ACTIVE')
            const response = await Promise.all([
                store.dispatch('stat/stGetAdminStat'),
                store.dispatch('calls/stGetAllCalls'),
                store.dispatch('devices/stGetDevices'),
                store.dispatch('users/stGetUsers'),
            ])
            const isSuccess = response.every(item => item)
            if (isSuccess) {
                next()
                store.commit('TOGGLE_PROGRESS_ACTIVE', false)
            } else {
                next(false)
                store.commit('TOGGLE_PROGRESS_ACTIVE', false)
                this.ADD_ALERT(['negative'])
            }
        }
        else {
            next()
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        }
        // store.dispatch('toggleLoading', false)
    },
}
</script>

<style scoped lang="scss">
.page-home {
    padding-bottom: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 300px;
    grid-template-rows:
        minmax(175px, auto)
        minmax(245px, auto)
        minmax(200px, 400px)
        minmax(200px, 400px);
    grid-gap: $gutter;
    grid-template-areas:
        'stat stat users'
        'stat-call rating users'
        'terminals terminals password-reset'
        'call-history call-history call-history';
    &__stat {
        grid-area: stat;
        display: flex;
    }

    &__users {
        grid-area: users;
        display: flex;
        /deep/ .page-home__users__item {
            border-top: 1px solid #efeff4;
        }
    }

    &__stat-call {
        grid-area: stat-call;
        display: flex;
    }

    &__rating {
        grid-area: rating;
        display: flex;
    }

    &__terminals {
        grid-area: terminals;
        display: flex;
    }

    &__password-reset {
        grid-area: password-reset;
        height: auto;
        align-self: auto;
        &__item {
            border-top: 1px solid #efeff4;
        }
        //align-self: start;

    }
    &__call-history {
        grid-area: call-history;
        height: auto;
        align-self: auto;
        //align-self: start;

    }
    .content {
        overflow: auto;
        height: 100%;
        padding: 15px;
    }
}
</style>
