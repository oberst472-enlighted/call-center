<template>
    <div id="app" class="app">
        <!--        <transition name="fadelol">-->
        <!--            <UiProgress class="app-progress" v-if="isProgressActive"/>-->
        <!--        </transition>-->


        <SectionsAlerts/>

        <router-view/>
    </div>
</template>

<script>
import SectionsAlerts from '@/components/sections/alerts'
import {mapState, mapActions} from 'vuex'

export default {
    components: {
        SectionsAlerts
    },
    data() {
        return {
            isOnce: false
        }
    },
    computed: {
        ...mapState('alerts', ['alerts']),
        ...mapState(['isProgressActive'])
    },
    methods: {
        ...mapActions('webrtc/webrtcPeerConnection', ['getMedia']),
        ...mapActions('webrtc/webrtcSockets', ['stSocketConnect']),
    },
    created() {
        if (!this.isOnce) {
            this.isOnce = true
            this.getMedia()
            this.stSocketConnect()
        }
    }
}
</script>
<style lang="scss">
.fadelol-enter-active, .fadelol-leave-active {
    transition: opacity 0.3s;
}
.fadelol-enter, .fadelol-leave-to {
    opacity: 0;
}
#app {
    min-height: 100vh;
    display: flex;
}
.app {
    &-progress {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
    }
}
</style>
