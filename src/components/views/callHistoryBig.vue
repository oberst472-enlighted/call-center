<template>
  <div id="call_history">
    <div class="head">
      <div class="head-headers">
        <div class="head-headers-main">История звонков</div>
        <div class="head-headers-secondary">Последние</div>
      </div>
      <img style="cursor: pointer" class="head-dots" src="../../assets/icons/ThreeDots.svg" alt=""/>
    </div>
    <div class="calls-list">
      <callInHistory chatStatus="hide"/>
      <callInHistory chatStatus="hide"/>
      <callInHistory chatStatus="hide"/>
      <callInHistory chatStatus="hide"/>
      <callInHistory chatStatus="hide"/>
      <callInHistory chatStatus="hide"/>
      <callInHistory chatStatus="hide"/>
      <callInHistory chatStatus="hide"/>
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

<style lang='scss'>
  #call_history{
    width: 100%;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 21px;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      &-headers-main{
        color: #685c7b;
        font-size: 17px;
        font-weight: 500;
      }
      &-headers-secondary{
        color: #cfcbd5;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .calls-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .call_in_history{
        padding: 0 10px;
        width: 50%;
        min-height: 90px;
      }
    }

  }
</style>
