<template>
    <section class="page-terminals">
        <div class="page-terminals__stat">
            <BlockStat :info="statForTheSession"/>
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
                :is-not-pagination="true"
                :items-length="items.length"
                subtitle="Доступные вам терминалы"
                title="Доступность терминалов"
            />
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
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
        ...mapState('devices', ['items', 'isNotDevicesPagination']),
        ...mapState('stat', ['statForTheSession']),
        ...mapState('sessions', ['isSessionBreak']),
    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),
        ...mapMutations(['TOGGLE_PROGRESS_ACTIVE'])
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        try {
            const response = await Promise.all([
                store.dispatch('devices/stGetDevices'),
            ])
            const isSuccess = response.every(item => item)
            if (isSuccess) {
                next()
            } else {
                next(false)
            }
        } catch (e) {
            console.log(e)
        } finally {
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        }
    }
}
</script>

<style lang="scss" scoped>
.page-terminals {
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 300px;
    grid-gap: $gutter;
    width: 100%;
    padding-bottom: 30px;
    grid-template-rows: minmax(187px, auto) minmax(300px, calc(100vh - 339px));
    grid-template-areas:
        'stat call'
        'calls calls';

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

    &__calls {
        display: flex;
        grid-area: calls;
    }
}
</style>
