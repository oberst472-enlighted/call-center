<template>
    <div>
        exit
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions('webrtc/webrtcSockets', ['stSocketDisconnect']),
        ...mapActions('webrtc/webrtcPeerConnection', ['stDisconnectWebrtc'])
    },
    // created() {
    //     if (localStorage.getItem('userData')) {
    //         this.stSocketDisconnect()
    //         this.stDisconnectWebrtc()
    //     }
    //     else {
    //         this.stSocketDisconnect()
    //         this.stDisconnectWebrtc()
    //         sessionStorage.removeItem('сс_main_user_info')
    //         sessionStorage.removeItem('token')
    //     }
    //     this.$router.push({name: 'login'})
    // }
}
</script>

<style lang="scss" scoped>

</style>
