<template>
  <div class="operator-wraper">
    <hr>
    <div class="operator" @click="$router.push(`/operator-list/${data._id}`)">
      <img
              :src="data.photo ? `https://calls-dev.enlighted.ru${data.photo}` : require('../../../assets/images/user2.png')"
              alt=""
              class="operator-img"
      >
      <div class="operator-block">
        <div class="operator-text">оператор # {{data.number}}</div>
        <div class="operator-name">{{data.firstName}}</div>
        <div class="operator-name">{{data.lastName}}</div>
      </div>
      <div class="operator-actions">
        <div class="operator-status" :style="statusStyle">{{statusText}}</div>
        <img src="../../../assets/icons/ThreeDots.svg" class="operator-openchat" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "operator",
    props: {
      data: Object,
    },
    computed: {
      statusText() {
        if (this.data.status === 'OFFLINE') {
          return 'Не онлайн'
        } else if (this.data.status === 'BREAK') {
          return 'Перерыв'
        } else if (this.data.status === 'IN_CALL') {
          return 'Занят'
        } else {
          return 'Свободен'
        }
      },
      statusStyle() {
        if (this.data.status === 'OFFLINE') {
          return 'background-color: #fceff2; color: #f04265;'
        } else if (this.data.status === 'BREAK') {
          return 'background-color: #f2f9fc; color: #3e58ff;'
        } else if (this.data.status === 'IN_CALL') {
          return 'background-color: #f7f1ff; color: #65528b;'
        } else {
          return ''
        }
      },
    },
    created() {
      console.log(this.data)
    }
  }
</script>

<style lang='scss'>
  .operator-wraper{

    padding: 0 10px;
    width: 33%;
    height: 86px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #4c3b60;
    font-size: 10px;
    font-weight: 700;
    line-height: 13px;

    .operator{
      margin-top: 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      &-status{
        width: 83px;
        height: 14px;
        border-radius: 7px;
        background-color: #f2fcf4;
        color: #4fd161;
        font-size: 8px;
        text-align: center;
      }

      &-block{
        flex: 1 1 auto;
      }
      &-text{
        font-weight: 400;
      }
      &-name{
        font-weight: 400;
      }
      &-img{
        border-radius: 50%;
        height: 40px;
        width: 40px;
        margin-right: 17px;
      }
      &-actions{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
</style>
