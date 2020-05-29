<template>
  <div class="call_in_history">
    <hr>
    <div class="call" @click="$router.push('/single-call/1')">
      <div class="call-left">
        <div class="call-left-date">20.05.2020  10:32:12 - 10:33:31</div>
        <div class="call-left-name">Казанский Вокзал</div>
        <div class="call-left-terminal">терминал #3462</div>
        <div class="call-left-text">зал ожидания</div>
      </div>
      <div class="call-right">
        <div class="call-right-status">Решено</div>
        <img src="../../../assets/icons/Write.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "callInHistory"
  }
</script>

<style scoped lang='scss'>
.call_in_history{
  .call{
    cursor: pointer;
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
    color: #4c3b60;
    font-size: 10px;
    font-weight: 700;
    line-height: 13px;
    &-left{
      &-date{
        opacity: 0.7;
        color: #65528b;
        font-size: 11px;
        font-weight: 500;
      }
      &-name{
        color: #4a4355;
        font-size: 12px;
      }
      &-terminal{
        font-size: 12px;

      }
      &-text{
        font-weight: 400;
      }
    }
    &-right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-status{
        text-align: center;
        width: 58px;
        height: 14px;
        border-radius: 7px;
        background-color: #f2fcf4;
        color: #4fd161;
        font-size: 8px;
        font-weight: 700;
      }
    }
  }
}
</style>
