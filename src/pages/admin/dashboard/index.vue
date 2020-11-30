<template>
    <section class="page-home">
        <div class="page-home__stat">
            <BlockStat :info="stat"/>
        </div>

        <div class="page-home__users">
            <SectionBox
                gutters
                scroll
                head
                title="Сотрудники"
                subtitle="Онлайн"
                :items-length="callsPerShift.calls.length"
                :is-not-pagination="true"
            >
                <BlockUserShortstoryItem
                    class="page-home__users__item"
                    v-for="item in users"
                    :key="item.id"
                    :info="item"
                    :to="{name: 'user-fullstory-admin', params: {id: item.id}}"
                />
            </SectionBox>
        </div>

        <div class="page-home__stat-call">
        </div>

        <div class="page-home__rating">
        </div>

        <div class="page-home__terminals">
            <BlockTerminals
                :info="items"
                @download-next-page="downloadNextPageTerminals"
                :items-length="items.length"
                :is-not-pagination="true"
            />
        </div>

        <div class="page-home__password-reset"></div>

        <div class="page-home__call-history">
            <SectionBox
                gutters
                scroll
                head
                title="История звонков"
                subtitle="Последние"
                @download-next-page="downloadNextPageCalls"
                :items-length="callsPerShift.calls.length"
                :is-not-pagination="true"
            >
                <div class="lol">
                    <BlockCallShortstoryItem
                        class="page-home__calls-history__item"
                        v-for="item in callsPerShift.calls"
                        :key="item.id"
                        :info="item"
                        :to="{name: 'call-fullstory', params: {id: item.id}}"
                    />
                </div>
            </SectionBox>
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import BlockTerminals from '@/components/blocks/terminals'
import BlockStat from '@/components/blocks/stat'
import BlockUserShortstoryItem from '@/components/blocks/user-shortstory-item'
import SectionBox from '@/components/sections/box'
import BlockCallShortstoryItem from '@/components/blocks/call-shortstory-item'
export default {
    components: {
        SectionBox,
        BlockTerminals,
        BlockStat,
        BlockUserShortstoryItem,
        BlockCallShortstoryItem
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('calls', ['callsPerShift', 'callQueue']),
        ...mapState('devices', ['items', 'isNotDevicesPagination']),
        ...mapState('stat', ['stat']),
        ...mapState('users', ['users']),
        ...mapState('sessions', ['isSessionBreak']),
        ...mapGetters('middleware', ['isAdmin', 'isAuth'])
    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),

        ...mapActions('calls', ['stGetAllCallsForTheCurrentSession']),
        ...mapMutations('calls', ['SET_PAGINATION_PAGE']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapMutations(['TOGGLE_PROGRESS_ACTIVE']),

        ...mapActions('devices', ['stGetDevices']),
        ...mapActions('users', ['stGetUsers']),
        ...mapMutations('devices', ['SET_DEVICES_PAGINATION_PAGE']),

        async downloadNextPageCalls() {
            this.SET_PAGINATION_PAGE()
            const isSuccess = await this.stGetAllCallsForTheCurrentSession()
            console.log(isSuccess)
        },
        async downloadNextPageTerminals() {
            this.SET_DEVICES_PAGINATION_PAGE()
            // eslint-disable-next-line no-unused-vars
            const isSuccess = await this.stGetDevices()
        }
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
        /deep/ .page-home__calls-history__item {
            border-top: 1px solid #efeff4;
        }
        .lol {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px;
        }
        //align-self: start;

    }
    .content {
        overflow: auto;
        height: 100%;
        padding: 15px;
    }
}
</style>
