<template>
    <div>
        exit
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters('middleware', ['isAdmin', 'isOperator', 'isAuth', 'isRememberMe'])
    },
    methods: {
        ...mapActions('webrtc/webrtcSockets', ['stSocketDisconnect']),
        ...mapActions('webrtc/webrtcPeerConnection', ['stDisconnectWebrtc'])
    },
    created() {
        if (!this.isAuth) {
            this.$router.push({name: 'login'})
            return
        }
        if (this.isAdmin) {
            const storage = this.isRememberMe ? localStorage : sessionStorage
            storage.removeItem('token')
            storage.removeItem('сс_main_user_info')
            localStorage.removeItem('cc_user_data')
            this.$router.push({name: 'login', params: {noRemember: true}})
        }
        if (this.isOperator) {
            const storage = this.isRememberMe ? localStorage : sessionStorage
            storage.removeItem('token')
            storage.removeItem('сс_main_user_info')
            localStorage.removeItem('cc_user_data')
            this.$router.push({name: 'login', params: {noRemember: true}})
            this.stSocketDisconnect()
            this.stDisconnectWebrtc()
        }

        this.$router.push({name: 'login'})
    }
}
</script>

<style lang="scss" scoped>

</style>
