<template>
    <div class="layout-login">
        <transition name="fadereset" mode="out-in">
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
.fadereset-enter-active, .fadereset-leave-active {
    transition: opacity 0.1s;
}
.fadereset-enter, .fadereset-leave-to {
    opacity: 0;
}
.layout-login {
    width: 100%;
    display: flex;
    background-image: url("/assets/images/map.webp");
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
