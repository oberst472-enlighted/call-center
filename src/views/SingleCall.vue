<template>
  <div id="SingleCall">
    <div class="header">
      <forward />
      <div class="header-text">Звонок #{{$route.params.id}}</div>
    </div>
    <div class="body">
      <div class="body-left">
        <div class="time">
          <div class="time-date">20.05.2020 МСК </div>
          <div class="time-call_time">10:32:12 - 10:33:31</div>
        </div>
        <div class="body-left-name">Казанский Вокзал</div>
        <div class="body-left-terminal">терминал #3462</div>
        <div class="body-left-text">зал ожидания</div>
        <div class="body-left-status">Онлайн</div>
        <div class="comment">
          <div class="comment-head">
            <div class="comment-head-text">КОММЕНТАРИЙ ОПЕРАТОРА</div>
            <div class="comment-head-owner">
              <div>оператор # 0012</div>
              <div>Елена Авантюрова</div>
            </div>
          </div>
          <div class="comment-body">
            <p>Пассажиру нужна медицинская помощь, вызвала бригаду на вокзал</p>
            <p>Бригада приехала</p>
          </div>
        </div>
      </div>
      <div class="body-right">
        <img src="../assets/images/call1.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import forward from "../components/UI/forward";
  export default {
    name: "SingleTerminal",
    components: { forward }
  }
</script>

<style scoped lang='scss'>
#SingleCall{
  width: 100%;
  height: 429px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 21px;
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
  .time{
    margin-bottom: 18px;
    opacity: 0.7;
    color: #65528b;
    font-size: 14px;
    font-weight: 500;
  }
  .body{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    line-height: 19px;

    &-left{
      color: #4c3b60;
      font-size: 15px;
      font-weight: 700;
      line-height: 19px;
      padding-right: 19px;
      &-text{
        font-weight: 400;
      }
      &-status{
        margin-top: 10px;
        text-align: center;
        width: 100px;
        height: 17px;
        border-radius: 8px;
        background-color: #f2fcf4;
        color: #4fd161;
        font-size: 10px;
        font-weight: 700;
      }
    }
    &-right{
      padding-left: 19px;
    }
  }
  .comment{
    .comment-head{
      margin-top: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-text{
        opacity: 0.7;
        color: #685c7b;
        font-size: 11px;
        font-weight: 300;
      }
      &-owner{
        color: #4c3b60;
        font-size: 12px;
        font-weight: 700;
      }
    }
    &-body{
      margin-top: 15px;
      padding: 16px;
      border-radius: 8px;
      background-color: #f3f1f6;
      p{
        opacity: 1;
        color: #4c3b60;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
