<template>
  <div id="DashBoard">
    <div class="row">
      <div class="col-left">
        <statusAdminDashboard v-if="$store.state.userStatus === 'admin'  && statistics" :data="statistics"/>
        <statusOperatorDashboard v-else-if="$store.state.userStatus === 'operator'"/>
        <div class="row" v-if="$store.state.userStatus === 'admin'">
          <div class="col">
            <graphBox :data="graphData" />
          </div>
          <div class="col" v-if="statistics">
            <ratingBox :data="statistics.callsHelpfulness"/>
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
        <languagesBox v-if="$store.state.userStatus === 'admin'" />
        <callWindow
                v-else-if="$store.state.userStatus === 'operator'"
                :answer="answer"
        />
        <usersSmall v-if="$store.state.userStatus === 'admin'"/>
        <callHistorySmall v-else-if="$store.state.userStatus === 'operator'" />
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
  import languagesBox from "../components/views/languagesBox";
  import ratingBox from "../components/views/ratingBox";
  import callHistoryBig from "../components/views/callHistoryBig";
  import usersSmall from "../components/views/usersSmall";
  import apiRequest from "../utils/apiRequest";
  export default {
    name: "Home",
    components: {
      statusAdminDashboard,
      statusOperatorDashboard,
      graphBox,
      languagesBox,
      ratingBox,
      avaliableTerminals,
      callHistoryBig,
      usersSmall,
      callWindow,
      callHistorySmall
    },
    props: {
      answer: Function,
    },
    data(){
      return {
        statistics: null,
        graphData: []
      }
    },
    async created() {
      try {
        this.statistics = (await apiRequest.get( `/api/callcenters/1111/stat/`)).data
        // console.log(this.statistics)
        let times = ['8', '10', '12', '14', '16', '18', '20']
        times.forEach((time) => {
          this.graphData.push(this.statistics.callsSuccessRate[time] * 100)
        })

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
