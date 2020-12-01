<template>
    <div id="app" class="app">
        <SectionMainLoading class="app-loading" v-if="isProgressActive"/>


        <SectionsAlerts/>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import SectionsAlerts from '@/components/sections/alerts'
import SectionMainLoading from '@/components/sections/main-loading'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    components: {
        SectionsAlerts,
        SectionMainLoading
    },
    data() {
        return {
            isOnce: false
        }
    },
    computed: {
        ...mapState('alerts', ['alerts']),
        ...mapState(['isProgressActive']),
        ...mapGetters('middleware', ['isAdmin'])
    },
    methods: {
        ...mapActions('webrtc/webrtcPeerConnection', ['getMedia']),
        ...mapActions('webrtc/webrtcSockets', ['stSocketConnect']),
    },
    created() {
        if (!this.isOnce && !this.isAdmin) {
            this.isOnce = true
            this.getMedia()
            this.stSocketConnect()
        }
    }
}
</script>
<style lang="scss">
#app {
    min-height: 100vh;
    display: flex;
}
.app {
    &-loading {
        z-index: 100;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
    }
}
</style>
