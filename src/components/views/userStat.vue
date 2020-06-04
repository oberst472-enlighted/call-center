<template>
  <div id="user_stat">
    <div class="col">
      <div class="col-name">ВЗВОНКОВ ВСЕГО</div>
      <div class="col-num">125</div>
      <hr>
      <div class="col-stat">1% от входящих</div>
    </div>
    <div class="col">
      <div class="col-name">ЗВОНКОВ ПРИНЯТО</div>
      <div class="col-num">123</div>
      <hr>
      <div class="col-stat">1% от входящих</div>
    </div>
    <div class="col">
      <div class="col-name">ЗВОНКОВ ОБРАБОТАНО</div>
      <div class="col-num">123</div>
      <hr>
      <div class="col-stat">1% от принятых</div>
    </div>
    <div class="col">
      <div class="col-name">ЗВОНКОВ НЕ ПРИНЯТО</div>
      <div class="col-num">2</div>
      <hr>
      <div class="col-stat">1% от входящих</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userStatictics"
  }
</script>

<style lang='scss'>
#user_stat{
  width: 593px;
  height: 175px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 13px 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .col{
    width: 93px;
    text-align: center;
    color: #786d89;
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
    }
    &-stat{
      padding-top: 3px;
      font-size: 10px;
      font-weight: 500;
    }
  }
}
</style>
