<template>
  <div id="ratingBox">
    <div class="box-header">Оценка качества обслуживания</div>
    <div class="box-body">
      <div class="box-body-mark">{{mark.toFixed(1)}}</div>
      <div class="box-body-stars">
        <img v-for="i in markFixed" src="../../assets/icons/starBlue.png" :key='i' alt="">
        <img v-for="i in (5 - markFixed)" src="../../assets/icons/starGrey.png" :key='`i + 55`' alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ratingBox",
    data() {
      return {
        mark: 3.49
      }
    },
    computed: {
      markFixed(){
        return Math.round(this.mark)
      }
    },
    components: {},
    props: {}
  }
</script>

<style lang='scss'>
  #ratingBox {
    width: 100%;
    height: 244px;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    padding: 20px 23px;
    .box-header{
      color: #685c7b;
      font-size: 17px;
      font-weight: 500;
    }
    .box-body{
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-mark{
        color: #65528b;
        font-size: 49px;
        font-weight: 500;
        margin-bottom: 22px;
      }
      &-stars{
        margin-bottom: 10px;

      }
    }
  }
</style>
