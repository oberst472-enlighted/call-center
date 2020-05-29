<template>
  <div id="CallList">
    <div class="row">
      <userStat />
      <callWindow />
    </div>
    <div class="row">
      <callHistoryBig />
    </div>
  </div>
</template>

<script>
  import avaliableTerminals from "../components/views/avaliableTerminals";
  import userStat from "../components/views/userStat";
  import callWindow from "../components/views/callWindow";
  import callHistoryBig from "../components/views/callHistoryBig";
  export default {
    name: "CallList",
    components: { callWindow , userStat, callHistoryBig, avaliableTerminals}
  }
</script>

<style lang='scss'>
#CallList {
  .row{
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
  }
}
</style>
