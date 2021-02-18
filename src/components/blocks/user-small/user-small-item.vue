<template>
  <div class="userInHistory">
    <hr>
    <div class="call" @click="$router.push(`/operator-list/${info._id}`)">
      <div class="call-left">
        <div class="call-left-date">оператор # {{ info.number }}</div>
        <div class="call-left-name">{{ info.firstName }}</div>
        <div class="call-left-name">{{ info.lastName }}</div>
      </div>
      <div class="call-right">
        <div class="call-right-status" :style="statusStyle">{{ statusText }}</div>
        <img src="@/assets/icons/ThreeDots.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  info() {
    return {}
  },
  components: {},
  props: {
    info: {
      type: Object,
      default: () => {
      }
    },
  },
  computed: {
    statusText() {
      const text = this.info.status.toLowerCase()
      switch (text) {
        case 'offline':
          return 'Не онлайн'
        case 'break':
          return 'Перерыв'
        case 'in_call':
          return 'Занят'
        default:
          return 'Свободен'
      }
    },
    statusStyle() {
      const text = this.info.status.toLowerCase()
      switch (text) {
        case 'offline':
          return 'background-color: #fceff2; color: #f04265;'
        case 'break':
          return 'background-color: #f2f9fc; color: #3e58ff;'
        case 'in_call':
          return 'background-color: #f7f1ff; color: #06579a;'
        default:
          return ''
      }
    },
  },
}
</script>

<style lang='scss'>
.userInHistory {
  .call {
    cursor: pointer;
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
    color: #4c3b60;
    font-size: 10px;
    font-weight: 700;
    line-height: 13px;

    &-left {
      &-date {
        opacity: 0.7;
        color: $color--primary;
        font-size: 11px;
        font-weight: 500;
      }

      &-name {
        color: #4a4355;
        font-size: 12px;
        font-weight: 400;
      }

      &-terminal {
        font-size: 12px;

      }

      &-text {
        font-weight: 400;
      }
    }

    &-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-status {
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
