<template>
  <div id="call_window" @click="callIsActive = !callIsActive">
    <div class="empty-call" v-if="callIsActive">ОЖИДАНИЕ ЗВОНКА</div>
    <div class="active-call" v-else>
      <div class="active-call-new">НОВЫЙ ЗВОНОК <span>РУССКИЙ</span></div>
      <div class="active-call-name">Казанский Вокзал</div>
      <div class="active-call-terminal">терминал #3462</div>
      <div class="active-call-text">зал ожидания</div>
      <div class="active-call-button">
        <div class="circle-first"></div>
        <div class="circle-second"></div>
        <img class="circle-third" src="../../assets/icons/call.svg" alt="" @click.stop="$router.push('/call-page')"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "callWindow",
    data(){
      return {
        callIsActive: false
      }
    }
  }
</script>

<style lang='scss'>
#call_window{
  width: 100%;
  height: 175px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #4c3b60;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px 0;
  overflow: hidden;
  .empty-call{
    text-align: center;
    width: 100px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    line-height: 15px;
  }
  .active-call{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    &-new{
      height: 13px;
      opacity: 0.7;
      color: #ffffff;
      font-weight: 300;
      margin-bottom: 8px;
      span{
        color: #ffffff;
        font-weight: 500;
      }
    }
    &-name{
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      line-height: 15px;
    }
    &-terminal{
      color: #ffffff;
      font-size: 14px;
      line-height: 15px;
    }
    &-text{
      color: #ffffff;
      font-size: 14px;
      line-height: 13px;

    }
    &-button{
      position: absolute;
      bottom: 18px;
      transform: translate(-50%, -50%);
      .circle-third{
        position: absolute;
        border-radius: 50%;
        right: -26px;
        top: -26px;
        width: 52px;
        height: 52px;
        background-color: #ffffff;
        z-index: 99;
      }
    }
    &-button:before,
    &-button:after {
      content: " ";
      display: block;
      position: absolute;
      border: 1px solid #ffffff;
      left: -20px;
      right: -20px;
      top: -20px;
      bottom: -20px;
      border-radius: 50%;
      animation: animate 1.5s linear infinite;
    }
    &-button:before{
      animation-delay: .75s;
    }
  }
}
</style>
