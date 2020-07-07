<template>
  <div id="Sidebar" :class="{active : isCollapsed}">
    <div class="buttons_top">
      <div class="sidebarLink" @click="$router.push('dashboard')">
        <img alt="" class="sidebarLink-icon" src="../../assets/icons/Chat.svg">
        <div class="sidebarLink-title">Video-Calls</div>
      </div>
      <sidebarLink src="Dash.png" title="Dashboard" link="dashboard"/>
      <sidebarLink src="Calls.png" title="Звонки" link="call-list"/>
      <sidebarLink src="Terminal.png" title="Терминалы" link="call-terminals"/>
      <sidebarLink v-if="$store.state.userStatus === 'admin'" src="Operator.png" title="Операторы" link="operator-list"/>
      <sidebarLink src="Statistics.png" title="Статистика" link="statistics"/>
    </div>
    <div class="buttons_bottom" @click="isCollapsed = !isCollapsed">
      <img src="../../assets/icons/Settings.png" alt="">
    </div>
  </div>
</template>

<script>
  import sidebarLink from "../UI/sidebarLink";
  export default {
    name: "Sidebar",
    components: {sidebarLink},
    data() {
      return {
        isCollapsed: false,
      }
    }
  }
</script>

<style lang='scss'>
#Sidebar {
  padding: 30px;
  left: 0;
  width: 100px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all ease .5s;
  overflow: hidden;
  .buttons_top{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .buttons_bottom{
    cursor: pointer;
    padding: 10px;
  }
  .buttons_bottom:hover{
    border-radius: 10px;
    background-color: #f1eef5 !important;
  }

}
#Sidebar.active{
  width: 200px;
  padding: 30px 20px;
  .sidebarLink-title {
    display: block;
    width: 100%;
    opacity: 1;
    margin: 5px 12px;

  }
  .buttons_top{
    align-items: flex-start
  }
}
</style>
