<template>
    <section class="page-terminals" :class="classes">
        <div class="page-terminals__stat" v-if="isOperator">
            <BlockStat :info="statForTheSession"/>
        </div>

        <div class="page-terminals__call" v-if="isOperator">
            <SectionBox :is-not-pagination="true">
                <BlockCallWindowSmall
                    :is-incoming-call="isIncomingCall"
                    @click="stClickTheCallBtn"
                />
            </SectionBox>
        </div>

        <SectionBox
            class="page-terminals__calls"
            gutters
            scroll
            head
            title="Доступность терминалов"
            subtitle="Доступные вам терминалы"
        >
            <div class="page-terminals__cont">
                <BlockShortstoryItem
                    class="page-terminals__item"
                    v-for="item in items"
                    :key="item.id"
                    :info="item"
                    :to="{name: 'device-fullstory', params: {id: item.id}}"
                />
            </div>
        </SectionBox>
    </section>
</template>

<script>
import store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
import {isRoleAdmin, isRoleOperator} from '@/utils/middleware'
import BlockShortstoryItem from '@/components/blocks/terminal-shortstory-item'
import BlockStat from '@/components/blocks/stat'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'

export default {
    metaInfo() {
        return {
            title: `Терминалы`
        }
    },
    components: {
        SectionBox,
        BlockShortstoryItem,
        BlockStat,
        BlockCallWindowSmall,
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isIncomingCall']),
        ...mapState('devices', ['items']),
        ...mapState('stat', ['statForTheSession']),
        isAdmin() {
            return isRoleAdmin()
        },
        isOperator() {
            return isRoleOperator()
        },
        classes() {
            return [
                {'page-terminals--admin': this.isAdmin},
                {'page-terminals--operator': this.isOperator}
            ]
        }
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
            next(isSuccess)
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
    width: 100%;
    padding-bottom: 30px;

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

    &__cont {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 20px;
    }

    &__box {
        width: 100%;
    }

    &__item {
        border-top: 1px solid #efeff4;
    }

    &--admin {
        max-height: calc(100vh - 84px);
    }

    &--operator {
        display: grid;
        grid-template-columns: minmax(300px, 1fr) 300px;
        grid-gap: $gutter;
        grid-template-rows: minmax(187px, auto) minmax(300px, calc(100vh - 339px));
        grid-template-areas:
        'stat call'
        'calls calls';
    }
}
</style>
