<template>
    <section class="page-calls">
        <div class="page-calls__calls">
            <BlockUsers
                :info="users"
                :items-length="users.length"
                is-not-pagination
                title="все сотрудники"
                subtitle="операторы"

            />
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions} from 'vuex'
import BlockUsers from '@/components/blocks/users'
export default {
    components: {
        BlockUsers,
    },
    computed: {
        ...mapState('users', ['users']),

    },
    methods: {
        ...mapMutations(['TOGGLE_PROGRESS_ACTIVE']),
        ...mapActions('users', ['stGetUsers']),
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        const response = await Promise.all([
            store.dispatch('users/stGetUsers'),
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
    grid-template-rows: minmax(300px, calc(100vh - 114px));
    grid-gap: $gutter;
    grid-template-areas:
        'calls';
    align-items: start;
    &__calls {
        grid-area: calls;
        display: flex;
    }
}
</style>
