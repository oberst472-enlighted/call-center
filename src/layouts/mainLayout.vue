<template>
  <div id="mainLayout">
    <Sidebar />
    <div class="wrapper-scroll">
      <div class="wrapper">
        <Header />
        <router-view />
      </div>
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

<style lang='scss'>
#mainLayout{
  min-height: 100vh;
  display: flex;
  .wrapper-scroll{
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-bottom: 30px;
  }

  .wrapper{
    width: 916px;
    margin: 0 auto;
  }
}
</style>
