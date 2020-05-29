<template>
  <div id="SingleTerminal">
    <div class="header">
      <forward />
      <div class="header-text">Терминал #{{$route.params.id}}</div>
    </div>
    <div class="body">
      <div class="body-left">
        <div class="body-left-name">Казанский Вокзал</div>
        <div class="body-left-terminal">терминал #3462</div>
        <div class="body-left-text">зал ожидания</div>
        <div class="body-left-status">Онлайн</div>
      </div>
      <div class="body-right">
        <img src="../assets/images/terminal1.png" alt="">
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
#SingleTerminal{
  width: 100%;
  height: 429px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 21px;
  .header{
    display: flex;
    align-items: center;
    &-text{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
    }
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
}
</style>
