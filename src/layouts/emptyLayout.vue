<template>
  <div id="emptyLayout">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "emptyLayout"
  }
</script>

<style lang='scss'>
#emptyLayout {
  height: 100vh;
  background-image: linear-gradient(180deg, #fafafc 0%, #e5e7f4 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
