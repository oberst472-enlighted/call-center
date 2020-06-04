<template>
  <div id="OperatorPage">
    <div class="body">
      <div class="body-left">
        <div>
          <div class="header">
            <div class="header-text">Оператор # {{$route.params.id}}</div>
          </div>
          <div class="user">
            <img src="../../assets/images/user2.png" alt="" class="user-avatar">
            <div class="user-box">
              <div class="user-box-status">Онлайн</div>
              <div class="user-box-name">Елена</div>
              <div class="user-box-name">Авантюрова</div>
              <div class="user-box-contacts" style="margin-bottom: 15px">Русский, English</div>
              <div class="user-box-contacts">elena@avanta.ru</div>
              <div class="user-box-contacts">+7 926 123-45-67</div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <div class="button">Изменить</div>
          <div class="button block">Блокировать оператора</div>
        </div>
      </div>
      <div class="body-right">
        <div class="head">
          <div class="head-headers">
            <div class="head-headers-main">История звонков</div>
            <div class="head-headers-secondary">Оператор # {{$route.params.id}}</div>
          </div>
        </div>
        <div class="calls-list">
          <callInHistory />
          <callInHistory />
          <callInHistory />
          <callInHistory />
          <callInHistory />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import callInHistory from "../../components/views/components/callInHistory";
  export default {
    name: "OperatorPage",
    components: {callInHistory}
  }
</script>

<style lang='scss'>
#OperatorPage{
  width: 100%;
  height: 573px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  .header{
    display: flex;
    align-items: center;
    &-icon-wrapper{
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 10px;
      transition: all ease .5s;
      border-radius: 50%;
    }
    &-icon-wrapper:hover{
      background-color: #e8eaf5;
    }
    &-text{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
    }
  }
  .body{
    height: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 19px;
    &-left{
      padding: 21px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-right{
      width: 257px;
      overflow: auto;
      padding: 15px 0;
      padding-left: 27px;
      border-left: 1px solid #efeff4;

      .head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        &-headers{
          &-main{
            color: #685c7b;
            font-size: 17px;
            font-weight: 500;
          }
          &-secondary{
            color: #cfcbd5;
            font-size: 14px;
            font-weight: 400;
          }
        }
      }
      .call_in_history{
        margin-right: 13px;
      }
    }
  }
  .user{
    margin-top: 32px;
    display: flex;
    &-avatar{
      width: 100%;
      height: 100%;
      margin-right: 20px;
    }
    &-box{
      &-status{
        text-align: center;
        color: #4fd161;
        font-size: 10px;
        font-weight: 700;
        width: 100px;
        height: 17px;
        border-radius: 8px;
        background-color: #f2fcf4;
        margin-bottom: 15px;
      }
      &-name{
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
      }
      &-contacts{
        color: #4c3b60;
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
  .btn-group{
    display: flex;
    .button{
      height: 33px;
      border-radius: 8px;
      background-color: #66538a;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 11px;
      transition: all ease .5s;
      cursor: pointer;
    }
    .button:hover{
      transform: scale(1.05);
    }
    .button.block{
      background-color: #f04265;
    }
  }
}
</style>
