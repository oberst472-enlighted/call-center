<template>
  <div id="Sidebar">
    <div class="buttons_top">
      <img src="../../assets/icons/Chat.svg" alt="" class="icon" @click="$router.push({name: 'call-list'})">
      <img src="../../assets/icons/Home.svg" alt="" class="icon" @click="$router.push({name: 'call-terminals'})">
      <img src="../../assets/icons/Time.svg" alt="" class="icon" @click="$router.push('/login')">
    </div>
    <div class="buttons_bottom">
      <img src="../../assets/icons/Settings.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style lang='scss'>
#Sidebar {
  padding: 30px 0;
  position: fixed;
  left: 0;
  width: 100px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .buttons_top{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buttons_bottom{
  }
  .icon{
    margin-bottom: 40px;
  }
}
</style>
