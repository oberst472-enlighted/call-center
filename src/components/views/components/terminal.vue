<template>
  <div class="terminal-wraper">
    <hr>
    <div class="terminal" @click="$router.push('/single-terminal/1')">
      <div class="terminal-status">Онлайн</div>
      <div class="terminal-name">Горький</div>
      <div class="terminal-number">терминал #3612</div>
      <div class="terminal-text">кассы</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "terminal"
  }
</script>

<style lang='scss'>
  .terminal-wraper{
    padding: 0 10px;
    width: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #4c3b60;
    font-size: 10px;
    font-weight: 700;
    line-height: 13px;

    .terminal{
      cursor: pointer;
      margin: 12px 0;
      &-status{
        width: 83px;
        height: 14px;
        border-radius: 7px;
        background-color: #f2fcf4;
        color: #4fd161;
        font-size: 8px;
        text-align: center;
      }
      &-name{
        font-weight: 400;
      }
      &-number{
        height: 13px;
        font-weight: 400;
      }
      &-text{
        font-weight: 400;
      }
    }
  }
</style>
