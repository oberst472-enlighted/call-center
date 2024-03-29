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
                    <router-view/>
                </div>
            </section>
        </main>

        <BlockCallSound v-if="isSoundCallActive && !isCallAnswered && isSessionActive && !isSessionBreak"/>
    </div>
</template>

<script>
import store from '@/store'
import {mapState, mapMutations, mapActions} from 'vuex'
import BlockCallSound from '@/components/blocks/call-sound'
import {getJsonFromString} from '@/utils/json'

export default {
    components: {
        BlockCallSound
    },
    data() {
        return {
            interval: null,
        }
    },
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isSoundCallActive', 'isIncomingCall', 'isCallAnswered', 'isVideoSectionActive', 'callQueue']),
        ...mapState('webrtc/webrtcSockets', ['heartbeat']),
        ...mapState('sessions', ['isSessionActive', 'isSessionBreak']),
    },
    methods: {
        ...mapMutations('webrtc/webrtcCalls', ['TOGGLE_INCOMING_CALL', 'TOGGLE_CALL_SOUND']),
        ...mapActions('webrtc/webrtcSockets', ['stStartHeartbeat']),
        ...mapActions('devices', ['stGetDevices']),
        _heartbeat() {
            const statusObj = this.heartbeat.statuses
            let result = ''

            if (this.isSessionActive && this.isSessionBreak) {
                result = statusObj.operatorBreak
                this.stStartHeartbeat(statusObj.operatorBreak)
            }
            else {
                this.isSessionActive ?
                    result = statusObj.operatorOnline :
                    result = statusObj.operatorUnavailable
            }
            this.stStartHeartbeat(result)
        },
        async getAdminStat() {
            await this.stGetDevices()
            // await this.stGetAdminStat()
            // await this.stGetUsers()
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.getAdminStat()
        }, 10000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
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

        this._heartbeat()
    },
    async beforeRouteEnter(to, from, next) {
        const info = localStorage.getItem('сс_main_user_info') || sessionStorage.getItem('сс_main_user_info')
        if (info) {
            store.commit('users/SET_MAIN_USER_INFO', getJsonFromString(info))
        }

        const webrtcConnectionOnce = store.state.webrtc.webrtcPeerConnection.isNavigatorOnceConnection
        const socketConnectionOnce = store.state.webrtc.webrtcSockets.isSocketOnceConnection

        if (!webrtcConnectionOnce && !socketConnectionOnce) {
            store.dispatch('webrtc/webrtcPeerConnection/getMedia', 'getMedia')
            store.dispatch('webrtc/webrtcSockets/stSocketConnect', 'stSocketConnect')

            store.commit('webrtc/webrtcPeerConnection/SET_IS_NAVIGATOR_ONCE_CONNECTION')
            store.commit('webrtc/webrtcSockets/SET_IS_SOCKET_ONCE_CONNECTION')
        }

        await Promise.all([
            store.dispatch('sessions/stGetCurrentSessionInfo'),
            store.dispatch('stat/stGetStatForTheSession'),
            // store.dispatch('stat/stGetAdminStat'),
        ])
        store.commit('TOGGLE_PROGRESS_LOGIN_ACTIVE', false)
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
