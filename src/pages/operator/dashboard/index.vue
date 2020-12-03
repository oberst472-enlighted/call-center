<template>
    <section class="page-home">
        <div class="page-home__stat">
            <BlockStat :info="statForTheSession"/>
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
                :is-not-pagination="true"
                :items-length="items.length"
                @download-next-page="downloadNextPageTerminals"
            />
        </div>

        <div class="page-home__calls-history">
            <SectionBox
                :is-not-pagination="true"
                :items-length="callsPerShift.calls.length"
                gutters
                head
                scroll
                subtitle="Последние"
                title="История звонков"
                @download-next-page="downloadNextPageCalls"
            >
                <BlockCallShortstoryItem
                    v-for="item in callsPerShift.calls"
                    :key="item.id"
                    :info="item"
                    no-operator-info
                    :to="{name: 'detail-call_operator', params: {id: item.id}}"
                    class="page-home__calls-history__item"
                />
            </SectionBox>
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
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
        ...mapState('stat', ['statForTheSession']),
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
        if (from.name !== 'call-form-data' && !to.params.doNotLoadData) {
            store.commit('TOGGLE_PROGRESS_ACTIVE')
        }
        try {
            if (!to.params.doNotLoadData) {
                store.dispatch('stat/stGetStatForTheSession')
                const response = await Promise.all([
                    store.dispatch('calls/stGetAllCallsForTheCurrentSession'),
                    store.dispatch('devices/stGetDevices'),
                ])
                const isSuccess = response.every(item => item)
                if (isSuccess) {
                    next()
                } else {
                    next(false)
                    this.ADD_ALERT(['negative'])
                }
            } else {
                next()
            }
        } catch (e) {
            console.log(e)
        }
        finally {
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        }
        // store.dispatch('toggleLoading', false)
    },
}
</script>

<style lang="scss" scoped>
.page-home {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 300px;
    grid-gap: $gutter;
    width: 100%;
    padding-bottom: 30px;
    grid-template-rows: minmax(187px, auto) minmax(300px, calc(100vh - 339px));
    grid-template-areas:
        'stat call'
        'terminals history';

    &__stat {
        display: flex;
        grid-area: stat;
    }

    &__call {
        display: flex;
        grid-area: call;

        /deep/ .section-box {
            background-color: #4c3b60;
        }
    }

    &__terminals {
        display: flex;
        grid-area: terminals;
    }

    &__calls-history {
        align-self: auto;
        height: auto;
        grid-area: history;

        &__item {
            border-top: 1px solid #efeff4;
        }

        //align-self: start;

    }

    .content {
        height: 100%;
        padding: 15px;
        overflow: auto;
    }
}
</style>
