<template>
  <div id="status_dashboard">
    <div class="user_stat_header">
      Оперативное состояние колл-центра
    </div>
    <div class="row">
      <div class="col">
        <LocalStatusAdminDashboardItem
            :count="stat.operatorsOnline"
            title="операторов на <br> линии"
            signature="всего онлайн"
        />
      </div>

      <div class="col">
        <LocalStatusAdminDashboardItem
            color="positive"
            :count="stat.callsInProgress"
            title="активных <br> звонков"
            signature="на линии"
        />
      </div>

      <div class="col">
        <LocalStatusAdminDashboardItem
            :count="stat.callsWaiting"
            title="очередь <br> звонков"
            signature="рыба текст"
        />
      </div>

      <div class="col">
        <LocalStatusAdminDashboardItem
            color="negative"
            :count="Math.floor(stat.callsAverageTime / 60)"
            title="среднее время <br> звонка"
            time-text-active

            signature="рыба текст"
        />
      </div>

    </div>
  </div>
</template>

<script>
import LocalStatusAdminDashboardItem from './status-admin-dashboard-item'
import {mapState} from 'vuex'

export default {
  components: {
    LocalStatusAdminDashboardItem
  },
  computed: {
    ...mapState('stat', ['stat'])
  }
}
</script>

<style lang='scss'>
#status_dashboard {
  width: 605px;
  height: 175px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 17px 35px;

  .user_stat_header {
    width: 100%;
    text-align: center;
    color: $color--primary;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .col {
    width: 21% !important;
    text-align: center;
    margin: 0 5px;
  }
}
</style>
