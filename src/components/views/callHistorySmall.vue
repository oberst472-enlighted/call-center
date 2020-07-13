<template>
  <div id="call_history_small">
    <div class="head">
      <div class="head-headers">
        <div class="head-headers-main">История звонков</div>
        <div class="head-headers-secondary">Последние</div>
      </div>
    </div>
    <div class="calls-list">
      <callInHistory v-for="(item, index) in data" :key="index" :data="item"/>
    </div>
  </div>
</template>

<script>
  import callInHistory from "./components/callInHistory";
  export default {
    name: "callHistory",
    components: {callInHistory},
    props: {
      data: Array
    },
  }
</script>

<style lang='scss'>
  #call_history_small{
    width: 300px;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 17px;
    margin-top: 20px;
    max-height: calc(100vh - 315px);
    overflow: auto;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      &-headers{
        &-main{
          color: #685c7b;
          font-size: 17px;
          font-weight: 500;
        }
        &-secondary{
          color: #cfcbd5;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
    .calls-list{
    }
  }
</style>
