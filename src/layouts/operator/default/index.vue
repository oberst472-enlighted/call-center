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

        <BlockCallSound v-if="isSoundCallActive && !isCallAnswered && isSessionActive && !isSessionBreak"/>
        <!--        <div class="layout-default__call-form-data" v-if="true">-->
        <!--            <SectionCallVideo/>-->
        <!--        </div>-->
    </div>
</template>

<script>
import store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
import BlockCallSound from '@/components/blocks/call-sound'

export default {
    components: {
        BlockCallSound
    },
    data() {
        return {
            recoder: null,
        }
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isSoundCallActive', 'isIncomingCall', 'isCallAnswered', 'isVideoSectionActive', 'callQueue']),
        ...mapState('sessions', ['isSessionActive', 'isSessionBreak']),
    },
    methods: {
        ...mapMutations('webrtc/webrtcCalls', ['TOGGLE_INCOMING_CALL', 'TOGGLE_CALL_SOUND']),

    },

    created() {
        if (this.callQueue.length) {
            this.TOGGLE_INCOMING_CALL()
            this.TOGGLE_CALL_SOUND()
        }
        else {
            this.TOGGLE_INCOMING_CALL(false)
            this.TOGGLE_CALL_SOUND(false)
        }
    },
    async beforeRouteEnter(to, from, next) {
        // store.dispatch('toggleLoading')
        await Promise.all([
            store.dispatch('sessions/stGetCurrentSessionInfo'),
        ])
        next()
        // const isSuccess = response.every(item => item)
        // if (isSuccess) {
        //    next()
        // } else {
        //     next(false)
        //     // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
        // }
        // store.dispatch('toggleLoading', false)
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
