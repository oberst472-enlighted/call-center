<template>
    <section class="page-home">
        <div class="page-home__stat">
            <SectionBox gutters>
                stat
            </SectionBox>
        </div>

        <div class="page-home__call">
            <SectionBox>
                <BlockCallWindowSmall/>
            </SectionBox>
        </div>

        <div class="page-home__terminals">
            <SectionBox>
                Ожидание терминалов
            </SectionBox>
        </div>

        <div class="page-home__calls-history">
            <SectionBox scroll>
                <div class="content">
                    история звонков
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!
                    <!--                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!-->
                    <!--                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!-->
                    <!--                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!-->
                    <!--                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!-->
                    <!--                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!-->
                    <!--                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!-->
                    <!--                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad autem culpa doloremque eligendi est ex ipsum laborum laudantium nam numquam placeat quaerat rerum tempore tenetur ullam unde, ut veniam!-->
                </div>
            </SectionBox>
        </div>
    </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SectionBox from '@/components/sections/box'
import BlockCallWindowSmall from '@/components/blocks/call-window-small'
export default {
    components: {
        SectionBox,
        BlockCallWindowSmall
    },
    computed: {
        ...mapGetters('middleware', ['isAdmin', 'isAuth'])
    },
    methods: {
        ...mapActions('socket', ['socketConnect'])
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
