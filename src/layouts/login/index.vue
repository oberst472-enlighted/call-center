<template>
    <div class="layout-login">
        <!--        <LocalBlockAnimate class="layout-login__animate"/>-->
        <img class="layout-login__logo" src="/assets/images/logo.png" alt="">
        <transition name="fadereset" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
// import LocalBlockAnimate from './login-animate'
export default {
    components: {
        // LocalBlockAnimate
    },
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
    background-color: #e3e3e3;
    width: 100%;
    display: flex;
    //background-image: url("/assets/images/map.webp");
    background-size: cover;
    background-repeat: no-repeat;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__animate {
        //z-index: 0;
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0.1;
    }
    &__logo {
        max-width: 300px;
        margin-bottom: 30px;
    }
}
</style>
