<template>
    <section class="page-calls">
        <SectionBox
            class="page-calls__box"
            gutters
            scroll
            head
            not-content-text="Нет звонков"
            :is-not-content="!allCalls.length"
            title="История звонков"
            subtitle="Последние"
            :is-not-pagination="true"
        >
            <div class="page-calls__sub-box">
                <BlockShortstoryItem
                    class="page-calls__item"
                    no-icon-message
                    v-for="item in allCalls"
                    :key="item.id"
                    :info="item"
                    :to="{name: 'detail-call_admin', params: {id: item.id}}"
                />
            </div>
        </SectionBox>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions} from 'vuex'
import SectionBox from '@/components/sections/box'
import BlockShortstoryItem from '@/components/blocks/call-shortstory-item'
export default {
    components: {
        SectionBox,
        BlockShortstoryItem
    },
    computed: {
        ...mapState('calls', ['allCalls']),

    },
    methods: {
        ...mapActions('webrtc/webrtcCalls', ['stClickTheCallBtn']),

        ...mapActions('calls', ['stGetAllCallsForTheCurrentSession']),
        ...mapMutations('calls', ['SET_PAGINATION_PAGE']),
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        const response = await Promise.all([
            store.dispatch('calls/stGetAllCalls')
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
    height: calc(100vh - 84px);
    &__box {

    }
    &__sub-box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
    }
    &__item {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        border-top: 1px solid #efeff4;

    }
}
</style>
