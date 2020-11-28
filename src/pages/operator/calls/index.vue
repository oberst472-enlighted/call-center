<template>
    <section class="page-calls">
        <div class="page-calls__stat">
            <BlockStat :info="stat"/>
        </div>

        <div class="page-calls__call">
            <SectionBox>
                <BlockCallWindowSmall
                    :is-incoming-call="isIncomingCall"
                    @click="stClickTheCallBtn"
                />
            </SectionBox>
        </div>

        <div class="page-calls__calls">
            <BlockCalls
                :info="callsPerShift.calls"
                @download-next-page="downloadNextPageCalls"
                :items-length="callsPerShift.calls.length"
                :is-not-pagination="callsPerShift.isNotPagination"
            />
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import BlockCalls from '@/components/blocks/calls'
import BlockStat from '@/components/blocks/stat'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
export default {
    components: {
        SectionBox,
        BlockCalls,
        BlockStat,
        BlockCallWindowSmall,
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('calls', ['callsPerShift']),
        ...mapState('stat', ['stat']),
        ...mapState('sessions', ['isSessionBreak']),
    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),

        ...mapActions('calls', ['stGetCallsPerWorkShift']),
        ...mapMutations('calls', ['SET_PAGINATION_PAGE']),


        async downloadNextPageCalls() {
            this.SET_PAGINATION_PAGE()
            const isSuccess = await this.stGetCallsPerWorkShift()
            console.log(isSuccess)
        },
    },
    async beforeRouteEnter(to, from, next) {
        const response = await Promise.all([
            store.dispatch('calls/stGetCallsPerWorkShift')
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
           next()

        } else {
            next(false)
            // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
        }
        // store.dispatch('toggleLoading', false)
    },
}
</script>

<style scoped lang="scss">
.page-calls {
    padding-bottom: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 300px;
    grid-template-rows: minmax(187px, auto) minmax(400px, calc(100vh - 319px));
    grid-gap: $gutter;
    grid-template-areas:
        'stat call'
        'calls calls';
    &__stat {
        grid-area: stat;
        display: flex;
    }
    &__call {
        grid-area: call;
        display: flex;
    }
    &__calls {
        grid-area: calls;
        display: flex;
    }
}
</style>
