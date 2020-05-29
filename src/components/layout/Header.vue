<template>
  <div id="Header">
    <div class="nav">
      <div class="nav-left">
        <div class="btn-toggler">
          <button
                  class="btn-toggler-btn nav-btn"
                  :class="{active : workStatus==='online'}"
                  @click="toggleMode('online')">
            Онлайн
          </button>
          <button
                  class="btn-toggler-btn nav-btn"
                  :class="{active : workStatus==='break'}"
                  @click="toggleMode('break')">
            Перерыв
          </button>
        </div>
        <div class="time">{{formatTime}}</div>
        <button class="close-session nav-btn">Завершить смену</button>
      </div>
      <div class="nav-right">
        <div class="user">
          <div class="user-info">
            <div class="user-name">Елена Авантюрова</div>
            <div class="user-operator">оператор #<span>23423</span></div>
          </div>
          <div class="user-avatar">
            <img src="../../assets/icons/User.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        activeMod: 'online'
      }
    },
    computed: {
      formatTime() {
        let pad = function(num, size) { return ('000' + num).slice(size * -1); }
        let time = parseFloat(this.$store.state.totalTime).toFixed(3)
        let hours = Math.floor(time / 60 / 60)
        let minutes = Math.floor(time / 60) % 60
        let seconds = Math.floor(time - minutes * 60)
        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
      },
      workStatus() {
        return this.$store.state.workStatus
      }

    },
    mounted() {
      setInterval(() => {
        this.timeNow = new Date()
      }, 1000)
    },
    methods: {
      toggleMode(type) {
        this.$store.commit('toggleWorkingStatus', type)
      }
    }
  }
</script>

<style scoped lang='scss'>
#Header{
  min-height: 83px;
  width: 100%;
  padding: 25px 0;
  .nav{
    margin-left: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-btn{
      height: 33px;
      border-radius: 8px;
      border: none;
      padding: 0 15px;
      outline: none;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      background-color: inherit;
    }
    &-left{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .user{
    display: flex;
    &-info{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-evenly;
    }
    &-name{
      line-height: 12px;
      font-weight: 700;
    }
    &-operator{
      line-height: 12px;
      font-weight: 400;
    }
    &-avatar{
      margin-left: 5px;
    }
  }
  .btn-toggler{
    &-btn:first-child{
      border: 1px solid #3e58fe;
      border-radius: 8px 0 0 8px;
      color: #3e58fe;
      border-right: none;

    }
    &-btn:first-child.active{
      border: none;
      background-color: #3e58fe;
      color: #ffffff;
    }
    &-btn:last-child{
      border: 1px solid #4fd161;
      border-radius: 0 8px 8px 0;
      color: #4fd161;
      border-left: none;

    }
    &-btn:last-child.active{
      border: none;
      background-color: #4fd161;
      color: #22252a;
    }
  }
  .time{
    width: 115px;
    margin: 0 18px;
    text-align: center;
    color: #4c3b60;
    font-size: 20px;
    font-weight: 400;
  }
  .close-session{
    background-color: #f04265;
  }
}
</style>
