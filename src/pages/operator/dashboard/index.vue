<template>
    <section class="page-home">
        <div class="page-home__stat">
            <SectionBox gutters>
                stat
            </SectionBox>
        </div>

        <div class="page-home__call">
            <SectionBox>
                <BlockCallWindowSmall
                    :is-incoming-call="isIncomingCall"
                    @click="pickUpThePhone"
                />
            </SectionBox>
        </div>

        <div class="page-home__terminals">
            <SectionBox gutters>
                Ожидание терминалов
            </SectionBox>
        </div>

        <div class="page-home__calls-history">
            <SectionBox
                gutters
                scroll
                head
                title="История звонков"
                subtitle="Последние"
            >
                <BlockCallShortstoryItem class="page-home__calls-history__item" v-for="item in calls" :key="item.id" :info="item"/>
            </SectionBox>
        </div>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapActions, mapGetters} from 'vuex'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
import BlockCallShortstoryItem from '@/components/blocks/call-shortstory-item'
export default {
    components: {
        SectionBox,
        BlockCallWindowSmall,
        BlockCallShortstoryItem
    },
    computed: {
        ...mapState('socket', ['isIncomingCall']),
        ...mapState('calls', ['calls']),
        ...mapGetters('middleware', ['isAdmin', 'isAuth'])
    },
    methods: {
        ...mapActions('socket', ['socketConnect', 'pickUpThePhone'])
    },
    async beforeRouteEnter(to, from, next) {
        // store.dispatch('toggleLoading')
        const response = await Promise.all([
            store.dispatch('calls/stGetAllCallsPerWorkShift'),
            // store.dispatch('tasks/stGetTasksTypes'),
            // store.dispatch('users/stAllUsers', ['contractor'])
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
    mounted() {
        // const date1 = dayjs().format()
        // console.log(date1)
    }
}
</script>

<style scoped lang="scss">
.page-home {
    padding-bottom: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 300px;
    grid-template-rows: minmax(187px, auto) minmax(400px, calc(100vh - 319px));
    grid-gap: $gutter;
    grid-template-areas:
        'stat call'
        'terminals history';
    &__stat {
        grid-area: stat;
        display: flex;
    }
    &__call {
        grid-area: call;
        display: flex;
    }
    &__terminals {
        grid-area: terminals;
        display: flex;
    }
    &__calls-history {
        grid-area: history;
        height: auto;
        align-self: auto;
        &__item {
            border-top: 1px solid #efeff4;
        }
        //align-self: start;

    }
    .content {
        overflow: auto;
        height: 100%;
        padding: 15px;
    }
}
</style>
