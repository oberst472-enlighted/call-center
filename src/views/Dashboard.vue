<template>
  <div id="DashBoard">
    <div class="row">
      <div class="col-left">
        <statusAdminDashboard v-if="$store.state.userStatus === 'admin'  && statisticsAdmin" :data="statisticsAdmin"/>
        <statusOperatorDashboard v-else-if="$store.state.userStatus === 'operator'  && $store.state.userData" />
        <div class="row" v-if="$store.state.userStatus === 'admin'">
          <div class="col">
            <graphBox :data="graphData" />
          </div>
          <div class="col" v-if="statisticsAdmin">
            <ratingBox :data="statisticsAdmin.callsHelpfulness"/>
          </div>
        </div>
        <div class="row">
          <avaliableTerminals />
        </div>
        <div class="row" v-if="$store.state.userStatus === 'admin'">
          <callHistoryBig />
        </div>
      </div>
      <div class="col-right">
<!--        <languagesBox v-if="$store.state.userStatus === 'admin'" />-->
        <callWindow
                v-if="$store.state.userStatus === 'operator'"
                :answer="answer"
        />
        <usersSmall v-if="$store.state.userStatus === 'admin'"/>
        <callHistorySmall
                v-else-if="$store.state.userStatus === 'operator' && callsOperator"
                :data="callsOperator"
        />
        <restoreQue v-if="$store.state.userStatus === 'admin'"/>

      </div>
    </div>
  </div>
</template>

<script>
  import statusOperatorDashboard from "../components/views/statusOperatorDashboard";
  import callHistorySmall from "../components/views/callHistorySmall";
  import callWindow from "../components/layout/callWindow";
  import avaliableTerminals from "../components/views/avaliableTerminals";
  import statusAdminDashboard from "../components/views/statusAdminDashboard";
  import graphBox from "../components/views/graphBox";
  // import languagesBox from "../components/views/languagesBox";
  import ratingBox from "../components/views/ratingBox";
  import callHistoryBig from "../components/views/callHistoryBig";
  import usersSmall from "../components/views/usersSmall";
  import apiRequest from "../utils/apiRequest";
  import restoreQue from "../components/views/restoreQue";
  export default {
    name: "Home",
    components: {
      statusAdminDashboard,
      statusOperatorDashboard,
      graphBox,
      // languagesBox,
      ratingBox,
      avaliableTerminals,
      callHistoryBig,
      usersSmall,
      callWindow,
      callHistorySmall,
      restoreQue
    },
    props: {
      answer: Function,
    },
    metaInfo() {
      return {
        title: ((localStorage.getItem('userType') || sessionStorage.getItem('userType')) === 'operator') ?
            `Dashboard - Колл-центр ${localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')}` :
            'Dashboard - Aдмин панель'
      }
    },
    data(){
      return {
        statisticsAdmin: null,
        statisticsOperator: null,
        graphData: [],
        callsOperator: null,
        callsAdmin: null,
      }
    },
    async created() {
      try {
        if ((localStorage.getItem('userType') || sessionStorage.getItem('userType')) === 'operator') {
          // this.statisticsOperator = (await apiRequest.get( `/api/me/`)).data.lastSessionStat
          // console.hideProto(this.statisticsOperator)
          let userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
          this.callsOperator = (await apiRequest.get( `/api/users/${userId}/calls/`)).data
        } else {
          this.statisticsAdmin = (await apiRequest.get( `/api/callcenters/1111/stat/`)).data
          let times = ['8', '10', '12', '14', '16', '18', '20']
          times.forEach((time) => {
            this.graphData.push(this.statisticsAdmin.callsSuccessRate[time] * 100)
          })
          this.callsAdmin = (await apiRequest.get( `/api/calls/`)).data
        }
      } catch (e) {
        console.log(e)
      }

    }
  }
</script>

<style lang='scss'>
  #DashBoard{
    .row{
      display: flex;
      padding-top: 20px;
      .col-left{
        width: 68%;
        margin-right: 20px;
      }
      .col-right{
        width: 300px;
      }
      .col{
        width: 50%;
        &:first-child{
          margin-right: 10px;
        }
        &:last-child{
          margin-left: 10px;
        }
      }
    }
  }
</style>
