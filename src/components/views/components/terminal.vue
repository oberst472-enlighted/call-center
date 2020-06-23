<template>
  <div class="terminal-wraper">
    <hr>
    <div class="terminal" @click="$router.push(`/call-terminals/${data.id}`)">
      <div
              class="terminal-status"
              :style="!data.online ? 'background-color: #fceff2; color: #f3738c': ''"
      >
        {{ data.online? 'Онлайн': 'Не доступен'}}
      </div>
      <div class="terminal-name">{{data.term.title}}</div>
      <div class="terminal-number">терминал # {{data.term.id}}</div>
      <div class="terminal-text">{{data.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "terminal",
    props: {
      data: Object
    },
    mounted() {
      // console.log(this.data)
    }
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
      flex: 1 1 auto;
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
