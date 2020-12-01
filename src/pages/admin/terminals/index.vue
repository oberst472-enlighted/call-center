<template>
    <section class="page-terminals">
        <SectionBox
            class="page-terminals__box"
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
                    :to="{name: 'detail-terminal_admin', params: {id: item.id}}"
                />
            </div>
        </SectionBox>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions} from 'vuex'
import SectionBox from '@/components/sections/box'
import BlockShortstoryItem from '@/components/blocks/terminal-shortstory-item'
export default {
    components: {
        SectionBox,
        BlockShortstoryItem
    },
    computed: {
        ...mapState('devices', ['items']),

    },
    methods: {
        ...mapActions('devices', ['stGetDevices']),
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        const response = await Promise.all([
            store.dispatch('devices/stGetDevices'),
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
//.page-terminals {
//    padding-bottom: 30px;
//    width: 100%;
//    display: grid;
//    grid-template-columns: 1fr;
//    grid-template-rows: minmax(300px, calc(100vh - 104px));
//    grid-gap: $gutter;
//    grid-template-areas:
//        'calls';
//    &__calls {
//        grid-area: calls;
//        display: flex;
//    }
//}
.page-terminals {
    width: 100%;
    padding-bottom: 30px;
    max-height: calc(100vh - 84px);

    .page-terminals__box {
        width: 100%;
    }

    &__cont {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 20px;
    }

    &__item {
        border-top: 1px solid #efeff4;
    }
}
</style>
