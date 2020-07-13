<template>
  <div id="call_history">
    <div class="head">
      <div class="head-headers">
        <div class="head-headers-main">История звонков</div>
        <div class="head-headers-secondary">Последние</div>
      </div>
    </div>
    <div class="calls-list">
      <callInHistory
              chatStatus="hide"
              v-for="(item, index) in calls"
              :key="index"
              :data="item"
      />
    </div>
  </div>
</template>

<script>
  import callInHistory from "./components/callInHistory";
  import apiRequest from "../../utils/apiRequest";
  export default {
    name: "callHistory",
    components: {callInHistory},
    data() {
      return {
        calls: null
      }
    },
    async created() {
      try {
        if ((localStorage.getItem('userType') || sessionStorage.getItem('userType')) === 'operator') {
          let userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
          this.calls = (await apiRequest.get(`/api/users/${userId}/calls/`)).data
        } else {
          this.calls = (await apiRequest.get( `/api/calls/`)).data
        }
      } catch (e) {
      }
    }
  }
</script>

<style lang='scss'>
  #call_history{
    width: 100%;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 21px;
    max-height: calc(100vh - 315px);
    overflow: auto;
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
