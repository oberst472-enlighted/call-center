<template>
    <section class="page-calls">
        <div class="page-calls__stat">
            <BlockStat :info="statForTheSession"/>
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
            <SectionBox
                class="block-calls__box"
                gutters
                scroll
                head
                not-content-text="Нет звонков"
                :is-not-content="!callsPerShift.calls.length"
                title="История звонков"
                subtitle="Последние"
                @download-next-page="$emit('download-next-page')"
            >
                <div class="page-calls__subbox">
                    <BlockCallShortstoryItem
                        class="page-calls__calls-item"
                        v-for="item in callsPerShift.calls"
                        :key="item.id"
                        :info="item"
                        no-operator-info
                        :to="{name: 'detail-call_operator', params: {id: item.id}}"
                    />
                </div>
            </SectionBox>
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import BlockStat from '@/components/blocks/stat'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
import BlockCallShortstoryItem from '@/components/blocks/call-shortstory-item'
export default {
    metaInfo() {
        return {
            title: `Звонки`
        }
    },
    components: {
        SectionBox,
        BlockCallShortstoryItem,
        BlockStat,
        BlockCallWindowSmall,
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('calls', ['callsPerShift']),
        ...mapState('stat', ['statForTheSession']),
        ...mapState('sessions', ['isSessionBreak']),

    },
    methods: {
        ...mapMutations(['TOGGLE_PROGRESS_ACTIVE']),
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),

        ...mapActions('calls', ['stGetAllCallsForTheCurrentSession']),
        ...mapMutations('calls', ['SET_PAGINATION_PAGE']),


    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        const response = await Promise.all([
            store.dispatch('calls/stGetAllCallsForTheCurrentSession')
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
           next()

        } else {
            next(false)
            // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
        }
        store.commit('TOGGLE_PROGRESS_ACTIVE', false)
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
    grid-template-rows: minmax(187px, auto) minmax(300px, calc(100vh - 339px));
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
        /deep/ .section-box {
            background-color: #4c3b60;
        }
    }
    &__calls {
        grid-area: calls;
        display: flex;
    }
    &__box {}
    &__subbox {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
    }
    &__calls-item {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        border-top: 1px solid #efeff4;
    }
}
</style>
