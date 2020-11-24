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
            <SectionBox scroll>
                <div class="content">
                    история звонков
                </div>
            </SectionBox>
        </div>
    </section>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
export default {
    components: {
        SectionBox,
        BlockCallWindowSmall
    },
    computed: {
        ...mapState('socket', ['isIncomingCall']),
        ...mapGetters('middleware', ['isAdmin', 'isAuth'])
    },
    methods: {
        ...mapActions('socket', ['socketConnect', 'pickUpThePhone'])
    },
    mounted() {
        // this.socketConnect()
    }
}
</script>

<style scoped lang="scss">
.page-home {
    padding-bottom: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 300px;
    grid-template-rows: minmax(175px, auto) minmax(400px, calc(100vh - 319px));
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
        //align-self: start;

    }
    .content {
        overflow: auto;
        height: 100%;
        padding: 15px;
    }
}
</style>
