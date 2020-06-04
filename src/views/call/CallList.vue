<template>
  <div id="CallList">
<!--    <div class="row">-->
<!--      <userStat />-->
<!--      <callWindow />-->
<!--    </div>-->
<!--    <div class="row">-->
<!--    </div>-->
    <div class="head">
      <div class="head-left">
        <div class="header">История звонков</div>
        <div class="sub_header">Последние</div>
      </div>
      <div class="head-right">
        <div class="btn-group">
          <div
                  class="button"
                  :class="{active : activeMod==='table'}"
                  @click="toggleMode('table')"
          >
            Таблица
          </div>
          <div
                  class="button"
                  :class="{active : activeMod==='list'}"
                  @click="toggleMode('list')"
          >
            Список
          </div>
        </div>

        <img
                style="cursor: pointer"
                src="../../assets/icons/Serach.png" alt="" class="head-right-img">
      </div>
    </div>
    <div id="call_history-list" v-if="activeMod === 'list'">
      <div class="calls-list">
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
        <callInHistory chatStatus="hide" />
      </div>
    </div>
    <div id="call_history-table" v-else>
      <table width="100%">
        <tr>
          <th height="55px">Номер</th>
          <th height="55px">Вокзал</th>
          <th height="55px">Терминал</th>
          <th height="55px">Дата и время</th>
          <th height="55px">Язык</th>
          <th height="55px">Статус</th>
          <th height="55px">Оператор</th>
          <th height="55px">Запись</th>
        </tr>
        <callInTable />
        <callInTable />
        <callInTable />
        <callInTable />
        <callInTable />
        <callInTable />
        <callInTable />
        <callInTable />
        <callInTable />
      </table>
    </div>
  </div>
</template>

<script>

  import callInTable from "../../components/views/components/callInTable";
  import callInHistory from "../../components/views/components/callInHistory";
  export default {
    name: "CallList",
    components: { callInHistory, callInTable },
    data() {
      return {
        activeMod: 'table'
      }
    },
    methods: {
      toggleMode(type) {
        if (type === this.activeMod) return
        if (this.activeMod === 'list') {
          this.activeMod = 'table'
        } else {
          this.activeMod = 'list'
        }
      }
    }
  }
</script>

<style lang='scss'>
#CallList {
  width: 100%;
  min-height: 366px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 17px 25px;
  /*.row{*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  padding-bottom: 30px;*/
  /*}*/
  .head{
    display: flex;
    justify-content: space-between;
    &-right{
      width: 200px;
      display: flex;
      justify-content: space-between;
      &-img{
        height: 30px;
      }
      /*&-btn{*/
      /*  color: #65528b;*/
      /*  font-size: 12px;*/
      /*  font-weight: 400;*/
      /*  padding: 0 10px;*/
      /*  display: flex;*/
      /*  justify-content: center;*/
      /*  align-items: center;*/
      /*  height: 27px;*/
      /*  border-radius: 8px;*/
      /*  transition: all ease 0.5s;*/
      /*  cursor: pointer;*/
      /*}*/
      /*&-btn.active{*/
      /*  background-color: #f4f3f7;*/
      /*}*/
      .btn-group {
        display: flex;
        align-items: center;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 11px;
        .button {
          height: 33px;
          color: #949eb9;
          font-size: 14px;
          font-weight: 400;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all ease .5s;
          cursor: pointer;
        }

        .button:hover {
          transform: scale(1.05);
        }

        .button.active {
          background-color: #f8f8fa;
        }
      }

    }
    .header{
      color: #151567;
      font-size: 17px;
      font-weight: 500;
    }
    .sub_header{
      color: #aeadca;
      font-size: 14px;
      font-weight: 400;
    }
  }
  #call_history-list{
    margin-top: 15px;
    .calls-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      .call_in_history{
        padding: 0 10px;
        width: 33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #4c3b60;
        font-size: 10px;
        font-weight: 700;
        line-height: 13px
      }
    }
  }
  #call_history-table{
    margin-top: 15px;
    table{
      display: table;
      height: 100%;
    }
    tr{
      height: 55px;
      text-align: left;
    }
    th, td {
      border-top: 1px solid #e7e9f5;
      padding: 0 2px;
      text-align: left;
    }
    th:nth-child(5), td:nth-child(5),
    th:nth-child(6), td:nth-child(6){
      text-align: center;
    }
    th:last-child{
      text-align: center;
    }
    .table_1, .table_4 {
      color: #968aa4;
      font-size: 13px;
      font-weight: 500;
    }
    .table_2, .table_3, .table_7{
      color: #4c3b60;
      font-size: 13px;
      font-weight: 500;
    }
    .table_5{
      color: #4c3b60;
      font-size: 13px;
      font-weight: 500;
    }
    .table_6{
      color: #4fd161;
      font-size: 12px;
      font-weight: 700;
      height: 20px;
      border-radius: 10px;
      background-color: #f2fcf4;
      display: flex;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      justify-content: center;
    }
    .table_8 img{
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
