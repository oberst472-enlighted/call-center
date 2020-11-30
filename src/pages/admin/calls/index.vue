<template>
    <section class="page-calls">
        <div class="page-calls__calls">
            <BlockCalls
                :info="allCalls"
                @download-next-page="downloadNextPageCalls"
                :items-length="allCalls.length"
                :is-not-pagination="true"
            />
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions} from 'vuex'
import BlockCalls from '@/components/blocks/calls'
export default {
    components: {
        BlockCalls,
    },
    computed: {
        ...mapState('calls', ['allCalls']),

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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(300px, calc(100vh - 104px));
    grid-gap: $gutter;
    grid-template-areas:
        'calls';
    &__calls {
        grid-area: calls;
        display: flex;
    }
}
</style>
