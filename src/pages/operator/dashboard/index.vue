<template>
    <section class="page-home">
        <div class="page-home__stat">
            <BlockStat :info="stat"/>
        </div>

        <div class="page-home__call">
            <SectionBox>
                <BlockCallWindowSmall
                    :is-incoming-call="isIncomingCall"
                    @click="stClickTheCallBtn"
                />
            </SectionBox>
        </div>

        <div class="page-home__terminals">
            <BlockTerminals
                :info="items"
                @download-next-page="downloadNextPageTerminals"
                :items-length="items.length"
                :is-not-pagination="true"
            />
        </div>

        <div class="page-home__calls-history">
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
                <BlockCallShortstoryItem
                    class="page-home__calls-history__item"
                    v-for="item in callsPerShift.calls"
                    :key="item.id"
                    :info="item"
                    :to="{name: 'call-fullstory', params: {id: item.id}}"
                />
            </SectionBox>
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import BlockTerminals from '@/components/blocks/terminals'
import BlockStat from '@/components/blocks/stat'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
import BlockCallShortstoryItem from '@/components/blocks/call-shortstory-item'
export default {
    components: {
        SectionBox,
        BlockTerminals,
        BlockStat,
        BlockCallWindowSmall,
        BlockCallShortstoryItem
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('calls', ['callsPerShift', 'callQueue']),
        ...mapState('devices', ['items', 'isNotDevicesPagination']),
        ...mapState('stat', ['stat']),
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
        ...mapMutations('devices', ['SET_DEVICES_PAGINATION_PAGE']),

        async downloadNextPageCalls() {
            this.SET_PAGINATION_PAGE()
            const isSuccess = await this.stGetAllCallsForTheCurrentSession()
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

            store.dispatch('stat/stGetStat')
            const response = await Promise.all([
                store.dispatch('calls/stGetAllCallsForTheCurrentSession'),
                store.dispatch('devices/stGetDevices'),
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
    grid-template-columns: minmax(300px, 1fr) 300px;
    grid-template-rows: minmax(187px, auto) minmax(400px, calc(100vh - 319px));
    grid-gap: $gutter;
    grid-template-areas:
        'stat call'
        'terminals history';
    &__stat {
        grid-area: stat;
        display: flex;
    }
    &__call {
        grid-area: call;
        display: flex;
        /deep/ .section-box {
            background-color: #4c3b60;
        }
    }
    &__terminals {
        grid-area: terminals;
        display: flex;
    }
    &__calls-history {
        grid-area: history;
        height: auto;
        align-self: auto;
        &__item {
            border-top: 1px solid #efeff4;
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
