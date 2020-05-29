<template>
  <div id="call_history">
    <div class="head">
      <div class="head-headers">
        <div class="head-headers-main">История звонков</div>
        <div class="head-headers-secondary">Последние</div>
      </div>
      <img class="head-dots" src="../../assets/icons/ThreeDots.svg" alt=""/>
    </div>
    <div class="calls-list">
      <callInHistory />
      <callInHistory />
      <callInHistory />
      <callInHistory />
      <callInHistory />
    </div>
  </div>
</template>

<script>
  import callInHistory from "./components/callInHistory";
  export default {
    name: "callHistory",
    components: {callInHistory}
  }
</script>

<style scoped lang='scss'>
  #call_history{
    width: 281px;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 21px;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .calls-list{
    }
  }
</style>
