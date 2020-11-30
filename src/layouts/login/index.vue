<template>
    <div class="layout-login">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions('webrtc/webrtcSockets', ['stSocketDisconnect']),
        ...mapActions('webrtc/webrtcPeerConnection', ['stClosePeerConnection', 'getMedia'])
    },
    created() {
        // this.stClosePeerConnection()
        // this.stSocketDisconnect()
        // this.getMedia()
    }
}
</script>

<style scoped lang="scss">
.layout-login {
    width: 100%;
    display: flex;
}
</style>
