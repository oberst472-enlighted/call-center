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
  created() {
    // console.dir(localStorage.key)
    // console.dir(sessionStorage.key)
    // console.log(document.cookie)
    if (sessionStorage.getItem('isUserLoggedIn')) {
      console.log('isUserLoggedIn session')
      sessionStorage.getItem('isUserLoggedIn')
      let userType = sessionStorage.getItem('userType')
      this.$store.commit('logIn', userType)


    } else if (localStorage.getItem('isUserLoggedIn')){
      console.log('isUserLoggedIn local')
      localStorage.getItem('isUserLoggedIn')
      let userType = localStorage.getItem('userType')
      this.$store.commit('logIn', userType)
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
