<template>
  <div id="app">
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
  computed: {
    layout() {
      return this.$route.meta.layout;
    },
    workStatus() {
      return this.$store.state.workStatus
    }
  },
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
