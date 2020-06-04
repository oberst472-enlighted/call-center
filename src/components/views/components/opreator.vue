<template>
  <div class="terminal-wraper">
    <hr>
    <div class="operator" @click="$router.push('/operator-page/1')">
      <img src="../../../assets/images/user2.png" alt="" class="operator-img">
      <div class="operator-block">
        <div class="operator-text">оператор # 0011</div>
        <div class="operator-name">Евгений</div>
        <div class="operator-name">Петров</div>
      </div>
      <div class="operator-actions">
        <div class="operator-status">Онлайн</div>
        <img src="../../../assets/icons/ThreeDots.svg" class="operator-openchat" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "operator"
  }
</script>

<style lang='scss'>
  .terminal-wraper{
    padding: 0 10px;
    width: 33%;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #4c3b60;
    font-size: 10px;
    font-weight: 700;
    line-height: 13px;

    .operator{
      margin-top: 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      &-status{
        width: 83px;
        height: 14px;
        border-radius: 7px;
        background-color: #f2fcf4;
        color: #4fd161;
        font-size: 8px;
        text-align: center;
      }

      &-block{
        flex: 1 1 auto;
      }
      &-text{
        font-weight: 400;
      }
      &-name{
        font-weight: 400;
      }
      &-img{
        height: 40px;
        width: 40px;
        margin-right: 17px;
      }
      &-actions{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
</style>
