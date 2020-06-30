<template>
  <div id="app" @click="$store.commit('popup/cleanPopup')">
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
    isActiveWorkShift() {
      return this.$store.state.isActiveWorkShift
    }
  },
  mounted() {
    // console.dir(localStorage.key)
    // console.dir(sessionStorage.key)
    // console.log(document.cookie)

    if (sessionStorage.getItem('isUserLoggedIn')) {
      this.$store.commit('setUserStatus', sessionStorage.getItem('userType'))
      this.$store.commit('setTime', +localStorage.getItem('totalTime'))
      this.$store.commit('toggleWorkingStatus', localStorage.getItem('workStatus'))
      this.$store.commit('setWorkShiftStatus', JSON.parse(localStorage.getItem('isActiveWorkShift')))
    } else if (localStorage.getItem('isUserLoggedIn')){
      this.$store.commit('setUserStatus', localStorage.getItem('userType'))
      this.$store.commit('setTime', +localStorage.getItem('totalTime'))
      this.$store.commit('toggleWorkingStatus', localStorage.getItem('workStatus'))
      this.$store.commit('setWorkShiftStatus', JSON.parse(localStorage.getItem('isActiveWorkShift')))

    }
  },
  watch: {
    isActiveWorkShift(val){
      if (val) {
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
