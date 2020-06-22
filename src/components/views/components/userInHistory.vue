<template>
  <div class="userInHistory">
    <hr>
    <div class="call" @click="$router.push(`/operator-list/${data._id}`)">
      <div class="call-left">
        <div class="call-left-date">оператор # {{data.number}}</div>
        <div class="call-left-name">{{data.firstName}}</div>
        <div class="call-left-name">{{data.lastName}}</div>
      </div>
      <div class="call-right">
        <div class="call-right-status">Свободен</div>
        <img src="../../../assets/icons/ThreeDots.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userInHistory",
    data() {
      return {}
    },
    components: {},
    props: {
      data: Object,
    }
  }
</script>

<style lang='scss'>
  .userInHistory{
    .call{
      cursor: pointer;
      margin: 12px 0;
      display: flex;
      justify-content: space-between;
      color: #4c3b60;
      font-size: 10px;
      font-weight: 700;
      line-height: 13px;
      &-left{
        &-date{
          opacity: 0.7;
          color: #65528b;
          font-size: 11px;
          font-weight: 500;
        }
        &-name{
          color: #4a4355;
          font-size: 12px;
          font-weight: 400;
        }
        &-terminal{
          font-size: 12px;

        }
        &-text{
          font-weight: 400;
        }
      }
      &-right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &-status{
          text-align: center;
          width: 58px;
          height: 14px;
          border-radius: 7px;
          background-color: #f2fcf4;
          color: #4fd161;
          font-size: 8px;
          font-weight: 700;
        }
      }
    }
  }
</style>
