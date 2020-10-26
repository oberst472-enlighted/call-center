<template>
  <div id="DashBoard">
    <div class="row">
      <div class="col-left">
        <BlockStatusAdminDashboard
            v-if="isStatusAdminDashboardActive"
            :data="statisticsAdmin"
        />

        <statusOperatorDashboard
            v-else-if="$store.state.userStatus === 'operator'
              && $store.state.userData"
        />

        <div class="row" v-if="$store.state.userStatus === 'admin'">
          <div class="col">
            <graphBox :data="graphData"/>
          </div>
          <div class="col" v-if="statisticsAdmin">
            <ratingBox :data="statisticsAdmin.callsHelpfulness"/>
          </div>
        </div>

        <div class="row">
          <avaliableTerminals/>
        </div>

        <div class="row" v-if="$store.state.userStatus === 'admin'">
          <callHistoryBig/>
        </div>

      </div>
      <div class="col-right">
        <!--        <languagesBox v-if="$store.state.userStatus === 'admin'" />-->
        <callWindow
            v-if="$store.state.userStatus === 'operator'"
            :answer="answer"
        />

        <BlockUserSmall v-if="isBlockUserSmallActive"/>

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
import BlockStatusAdminDashboard from '@/components/blocks/status-admin-dashboard'
import BlockUserSmall from '@/components/blocks/user-small'

import statusOperatorDashboard from '../components/views/statusOperatorDashboard'
import callHistorySmall from '../components/views/callHistorySmall'
import callWindow from '../components/layout/callWindow'
import avaliableTerminals from '../components/views/avaliableTerminals'
import graphBox from '../components/views/graphBox'
// import languagesBox from "../components/views/languagesBox";
import ratingBox from '../components/views/ratingBox'
import callHistoryBig from '../components/views/callHistoryBig'
import apiRequest from '../utils/apiRequest'
import restoreQue from '../components/views/restoreQue'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    BlockStatusAdminDashboard,
    BlockUserSmall,
    statusOperatorDashboard,
    graphBox,
    // languagesBox,
    ratingBox,
    avaliableTerminals,
    callHistoryBig,
    callWindow,
    callHistorySmall,
    restoreQue
  },
  props: {
    answer: Function,
  },
  metaInfo() {
    return {
      title: `Dashboard - Колл-центр ${localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')}`
    }
  },
  data() {
    return {
      statisticsAdmin: null,
      statisticsOperator: null,
      graphData: [],
      callsAdmin: null,
    }
  },
  computed: {
    ...mapState(['callsOperator']),
    isStatusAdminDashboardActive() {
      return this.$store.state.userStatus === 'admin' && this.statisticsAdmin
    },
    isBlockUserSmallActive() {
      return this.$store.state.userStatus === 'admin'
    }
  },
  methods: {
    ...mapActions(['fetchCallsOperator'])
  },
  async created() {
    try {
      if ((localStorage.getItem('userType') || sessionStorage.getItem('userType')) === 'operator') {
        // this.statisticsOperator = (await apiRequest.get( `/api/me/`)).data.lastSessionStat
        // console.hideProto(this.statisticsOperator)
        this.fetchCallsOperator()
      } else {
        let callCenterId = localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')
        this.statisticsAdmin = (await apiRequest.get(`/api/callcenters/${callCenterId}/stat/`)).data
        let times = ['8', '10', '12', '14', '16', '18', '20']
        times.forEach((time) => {
          this.graphData.push(this.statisticsAdmin.callsSuccessRate[time] * 100)
        })
        this.callsAdmin = (await apiRequest.get(`/api/calls/`)).data
      }
    } catch (e) {
      console.log(e)
    }

  }
}
</script>

<style lang='scss'>
#DashBoard {
  .row {
    display: flex;
    padding-top: 20px;

    .col-left {
      width: 68%;
      margin-right: 20px;
    }

    .col-right {
      width: 300px;
    }

    .col {
      width: 50%;

      &:first-child {
        margin-right: 10px;
      }

      &:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
