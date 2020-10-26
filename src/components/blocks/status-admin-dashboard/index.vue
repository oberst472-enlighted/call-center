<template>
  <div id="status_dashboard">
    <div class="user_stat_header">
      Оперативное состояние колл-центра
    </div>
    <div class="row">
      <div class="col">
        <div class="col-name">операторов на <br> линии</div>
        <div class="col-num">{{data.operatorsOnline}}</div>

        <hr style="background-color: #65528b">

        <div class="col-stat">всего онлайн</div>
      </div>
      <div class="col">
        <div class="col-name">активных <br> звонков</div>
        <div class="col-num">{{data.callsInProgress}}</div>

        <hr style="background-color: #4fd161">

        <div class="col-stat">на лини</div>
      </div>
      <div class="col">
        <div class="col-name">ОЧЕРЕДЬ <br> ЗВОНКОВ</div>
        <div class="col-num">{{data.callsWaiting}}</div>

        <hr style="background-color: #65528b">

        <div class="col-stat">подпись</div>
      </div>
      <div class="col">
        <div class="col-name">среднее время <br> звонк</div>
        <div class="col-num" style="font-size: 20px">
          {{Math.floor(data.callsAverageTime / 60)}}
          <span style="font-size: 12px">мин</span>
          {{data.callsAverageTime % 60}}
          <span style="font-size: 13px">сек</span>
        </div>

        <hr style="background-color: #f04265">

        <div class="col-stat">подпись</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "statusDashboard",
  props: ['data']
}
</script>

<style lang='scss'>
#status_dashboard{
  width: 605px;
  height: 175px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 17px 35px;
  .user_stat_header{
    width: 100%;
    text-align: center;
    color: #685c7b;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  .row{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .col{
    width: 21% !important;
    text-align: center;
    color: #786d89;
    margin: 0 5px;
    &-name{
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      padding-bottom: 6px;
    }
    &-num{
      color: #65528b;
      font-size: 25px;
      font-weight: 500;
      padding-bottom: 3px;
      letter-spacing: 0;
      word-spacing: 0;
      span{
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0;
        word-spacing: 0;
      }
    }
    &-stat{
      padding-top: 3px;
      font-size: 10px;
      font-weight: 500;
    }
  }
}
</style>
