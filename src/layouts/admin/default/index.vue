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
                    <router-view name="header"/>
                </div>
            </header>

            <section class="layout-default__main">
                <div class="wrapper">
                    <!--                    <transition name="layout-fade" mode="out-in">-->
                    <router-view/>
                    <!--                    </transition>-->
                </div>
            </section>
        </main>

        <!--        <div class="layout-default__call-form-data" v-if="true">-->
        <!--            <SectionCallVideo/>-->
        <!--        </div>-->
    </div>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations} from 'vuex'
import {getJsonFromString} from '@/utils/json'
export default {
    components: {
    },
    data() {
        return {
            recoder: null,
        }
    },
    computed: {
        ...mapState('users', ['mainUserInfo'])
    },
    methods: {
        ...mapMutations('users', ['SET_MAIN_USER_INFO']),

    },
    beforeRouteEnter(to, from, next) {
        const info = localStorage.getItem('сс_main_user_info') || sessionStorage.getItem('сс_main_user_info')
        if (info) {
            store.commit('users/SET_MAIN_USER_INFO', getJsonFromString(info))
        }
        next()
    },

}

</script>

<style lang="scss" scoped>
.layout-default {
    display: flex;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;

    &__header {
    }

    &__body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100vh;
        max-height: 100vh;
        overflow: auto;


    }

    &__aside {
        display: flex;
        flex-shrink: 0;
        height: 100vh;
        transition: all ease 0.3s;

        &-box {
            top: 0;
            left: 0;
            display: flex;
            width: inherit;
        }
    }

    &__call-video {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    &__main {
        display: flex;
        flex-grow: 1;
    }

    &--aside-active {
        .layout-default__aside {
            width: 200px;
        }
    }
}
</style>
