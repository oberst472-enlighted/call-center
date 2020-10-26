<template>
  <div id="DashBoard">
    <div class="row">
      <div class="col-left">
        <BlockStatusAdminDashboard v-if="isStatusAdminDashboardActive"/>

        <statusOperatorDashboard
            v-else-if="$store.state.userStatus === 'operator'
              && $store.state.userData"
        />

        <div class="row" v-if="$store.state.userStatus === 'admin'">
          <div class="col">
            <BlockGraph/>
          <!--            <graphBox :data="graphData"/>-->
          </div>
          <div class="col" v-if="stat">
            <ratingBox :data="stat.callsHelpfulness"/>
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
import BlockGraph from '@/components/blocks/graph'

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
import store from '@/store'

export default {
  components: {
    BlockStatusAdminDashboard,
    BlockUserSmall,
    BlockGraph,
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
    ...mapState('stat', ['stat']),
    isStatusAdminDashboardActive() {
      return this.$store.state.userStatus === 'admin' && this.stat
    },
    isBlockUserSmallActive() {
      return this.$store.state.userStatus === 'admin'
    }
  },
  // methods: {
  //   // ...mapActions(['fetchCallsOperator'])
  // },
  // async created() {
  //   try {
  //     if ((localStorage.getItem('userType') || sessionStorage.getItem('userType')) === 'operator') {
  //       // this.statisticsOperator = (await apiRequest.get( `/api/me/`)).data.lastSessionStat
  //       // console.hideProto(this.statisticsOperator)
  //       this.fetchCallsOperator()
  //     } else {
  //       let callCenterId = localStorage.getItem('callCenterId') || sessionStorage.getItem('callCenterId')
  //       this.statisticsAdmin = (await apiRequest.get(`/api/callcenters/${callCenterId}/stat/`)).data
  //       this.callsAdmin = (await apiRequest.get(`/api/calls/`)).data
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  //
  // },
  async beforeRouteEnter(to, from, next) {
    //если авторизован оператор
    if(store.getters.getIsRoleOperator) {
      const response = await Promise.all([
        store.dispatch('users/stCallsOperator', store.getters.getUserId),
      ])
      if (response.every(item => item)) {
        next()
      } else {
        next(false)
        //выводим попап с ошибкой
      }
    }
    //если авторизован админ
    else {
      const response = await Promise.all([
        store.dispatch('users/stGetUsers'),
        store.dispatch('stat/stGetStat', store.getters.getCallCenterId),
        store.dispatch('calls/stGetCalls'),
      ])
      if (response.every(item => item)) {
        next()
      } else {
        next(false)
        //выводим попап с ошибкой
      }
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
