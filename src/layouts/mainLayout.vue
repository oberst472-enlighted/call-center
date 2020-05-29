<template>
  <div id="mainLayout">
    <Sidebar />
    <div class="wrapper">
      <Header />
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from "../components/layout/Sidebar";
  import Header from "../components/layout/Header";
  export default {
    name: "mainLayout",
    components: { Sidebar, Header }
  }
</script>

<style scoped lang='scss'>
#mainLayout{
  .wrapper{
    width: 916px;
    margin: 0 auto;
  }
}
</style>
