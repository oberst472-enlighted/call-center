<template>
  <div class="header-icon-wrapper" @click="$router.back()">
    <img src="../../assets/icons/Forward.png" alt="" class="header-icon">
  </div>
</template>

<script>
  export default {
    name: "forward"
  }
</script>

<style lang='scss'>
  .header-icon-wrapper{
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    transition: all ease .5s;
    border-radius: 50%;
  }
  .header-icon-wrapper:hover{
    background-color: #e8eaf5;
  }
</style>
