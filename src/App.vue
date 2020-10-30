<template>
    <div id="app">
        <SectionBg v-if="isBgActive"/>

        <UiAlert/>

        <router-view/>
    </div>
</template>

<script>
import SectionBg from '@/components/sections/bg'
import emptyLayout from './layouts/emptyLayout'
import mainLayout from '@/layouts/admin/main/'
import callLayout from './layouts/callLayout'
import testCallLayout from './layouts/testCallLayout'
import {mapState} from 'vuex'

export default {
    name: 'App',

    data() {
        return {
            interval: null
        }
    },
    components: {
        SectionBg,
        emptyLayout,
        mainLayout,
        callLayout,
        testCallLayout
    },
    computed: {
        ...mapState(['isBgActive']),
        layout() {
            return this.$route.meta.layout
        },
        isActiveWorkShift() {
            return this.$store.state.isActiveWorkShift
        }
    },
    async mounted() {


        if (sessionStorage.getItem('isUserLoggedIn')) {
            this.$store.commit('setUserStatus', sessionStorage.getItem('userType'))
            this.$store.commit('setTime', +localStorage.getItem('totalTime'))
            this.$store.commit('toggleWorkingStatus', localStorage.getItem('workStatus'))
            this.$store.commit('setWorkShiftStatus', JSON.parse(localStorage.getItem('isActiveWorkShift')))
        } else if (localStorage.getItem('isUserLoggedIn')) {
            this.$store.commit('setUserStatus', localStorage.getItem('userType'))
            this.$store.commit('setTime', +localStorage.getItem('totalTime'))
            this.$store.commit('toggleWorkingStatus', localStorage.getItem('workStatus'))
            this.$store.commit('setWorkShiftStatus', JSON.parse(localStorage.getItem('isActiveWorkShift')))

        }
    },
    watch: {
        isActiveWorkShift(val) {
            if (val) {
                this.interval = setInterval(async () => {
                    this.$store.commit('incrementTime')
                }, 1000)
            } else {
                clearInterval(this.interval)
            }
        }
    }
}
</script>
<style lang="scss">

</style>
