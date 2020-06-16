<template>
  <div id="app" @click="$store.commit('cleanPopup')">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import emptyLayout from "./layouts/emptyLayout";
import mainLayout from "./layouts/mainLayout";
import callLayout from "./layouts/callLayout";
export default {
  name: "App",

  data(){
    return {
      interval: null
    }
  },
  components: {
    emptyLayout,
    mainLayout,
    callLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
    workStatus() {
      return this.$store.state.workStatus
    }
  },
  mounted() {
    // console.dir(localStorage.key)
    // console.dir(sessionStorage.key)
    // console.log(document.cookie)

    if (sessionStorage.getItem('isUserLoggedIn')) {
      this.$store.commit('setUserStatus', sessionStorage.getItem('userType'))
      this.$store.commit('setTime', +localStorage.getItem('totalTime'))
      this.$store.commit('setWorkShiftStatus', JSON.parse(localStorage.getItem('isActiveWorkShift')))
      console.log(this.$store.state.workStatus)
      localStorage.getItem('workStatus')
      this.$store.commit('toggleWorkingStatus', localStorage.getItem('workStatus'))

      console.log(this.$store.state.workStatus)

    } else if (localStorage.getItem('isUserLoggedIn')){
      this.$store.commit('setUserStatus', localStorage.getItem('userType'))
      this.$store.commit('setTime', +localStorage.getItem('totalTime'))
      this.$store.commit('setWorkShiftStatus', JSON.parse(localStorage.getItem('isActiveWorkShift')))
      console.log(this.$store.state.workStatus)
      this.$store.commit('toggleWorkingStatus', localStorage.getItem('workStatus'))

      this.$store.commit('toggleWorkingStatus', localStorage.getItem('workStatus'))
      console.log(this.$store.state.workStatus)
    }
  },
  watch: {
    workStatus(val){
      if (val === 'online') {
        this.interval = setInterval(() => {
          this.$store.commit('incrementTime')
        }, 1000)
      } else {
        clearInterval(this.interval)
      }
    }
  }
};
</script>
<style lang="scss">
@import "~normalize.css";
@import "assets/global";
#app {
  min-height: 100vh;
}
</style>
