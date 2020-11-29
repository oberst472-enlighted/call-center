<template>
    <section class="page-terminals">
        <div class="page-terminals__stat">
            <BlockStat :info="stat"/>
        </div>

        <div class="page-terminals__call">
            <SectionBox :is-not-pagination="true">
                <BlockCallWindowSmall
                    :is-incoming-call="isIncomingCall"
                    @click="stClickTheCallBtn"
                />
            </SectionBox>
        </div>

        <div class="page-terminals__calls">
            <BlockTerminals
                :info="items"
                :items-length="items.length"
                :is-not-pagination="true"
                title="Доступность терминалов"
                subtitle="Доступные вам терминалы"
            />
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapActions} from 'vuex'
import BlockTerminals from '@/components/blocks/terminals'
import BlockStat from '@/components/blocks/stat'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
export default {
    components: {
        SectionBox,
        BlockStat,
        BlockCallWindowSmall,
        BlockTerminals
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('terminals', ['items', 'isNotDevicesPagination']),
        ...mapState('stat', ['stat']),
        ...mapState('sessions', ['isSessionBreak']),
    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),
    },
    async beforeRouteEnter(to, from, next) {
        const response = await Promise.all([
            store.dispatch('terminals/stGetDevices'),
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
            next()
        } else {
            next(false)
            // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
        }
        // store.dispatch('toggleLoading', false)
    }
}
</script>

<style scoped lang="scss">
.page-terminals {
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
        /deep/ .section-box {
            background-color: #4c3b60;
        }
    }
    &__calls {
        grid-area: calls;
        display: flex;
    }
}
</style>
