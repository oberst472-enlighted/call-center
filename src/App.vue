<template>
    <div id="app">
        <UiAlert/>
        <router-view/>
    </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
    data() {
        return {
            isOnce: false
        }
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
#app {
    min-height: 100vh;
    display: flex;
}
</style>
