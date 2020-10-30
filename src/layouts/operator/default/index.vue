<template>
    <div class="layout-default">
        <aside class="layout-default__aside">
            <div class="layout-default__aside-box">
                <router-view name="aside"/>
            </div>
        </aside>

        <main class="layout-default__body">
            <header class="layout-default__header">
                <div class="wrapper">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad, adipisci aliquid asperiores, deserunt dicta ducimus harum hic ipsum modi molestiae nam nemo quasi quos sapiente tempora, voluptatum. Cumque, esse.
                </div>
                <!--            <router-view name="header"/>-->
            </header>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam commodi culpa eius harum inventore magnam maiores minima molestias nam nemo nesciunt numquam rerum, sint sit tenetur, ut voluptas. Adipisci, harum!</div>
            <section class="layout-default__main">
                <div class="wrapper">
                    <router-view/>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            actClass: false
        }
    },
    computed: {
        ...mapState(['isAsideActive'])
    }
}
</script>

<style scoped lang="scss">
.layout-default {
    background-color: #d4bfbf;
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    &__header {
        background-color: rgba(aqua, 0.4);
        height: 50px;
        top: 0;
    }
    &__body {
        flex-grow: 1;
        height: 100vh;
        max-height: 100vh;
        overflow: auto;

    }
    &__aside {
        background-color: rgba(blue, 0.2);
        transition: all ease 0.3s;
        flex-shrink: 0;
        height: 100vh;
        display: flex;
        &-box {
            width: inherit;
            display: flex;
            left: 0;
            top: 0;
        }


    }
    &__main {
        background-color: rgba(orange, 0.6);
    }
    &--aside-active {
        .layout-default__aside {
            width: 200px;
        }
    }
}
</style>
