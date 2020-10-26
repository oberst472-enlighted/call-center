<template>
  <div class="status-dashboard__item" :class="classes">
    <div class="status-dashboard__item-name" v-html="title"></div>
    <div class="status-dashboard__item-box">
      <div class="status-dashboard__item-count">{{ count }}</div>
      <span class="status-dashboard__item-min" v-if="timeTextActive">мин</span>
    </div>
    <div class="status-dashboard__item-signature">{{ signature }}</div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: ''
    },
    signature: {
      type: String,
      default: ''
    },
    count: {
      type: [Number, String],
      default: ''
    },
    timeTextActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        `status-dashboard__item--${this.color}`
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.status-dashboard__item {
  &-box {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border-bottom: 2px solid blue;
    padding-bottom: 3px;
  }

  &-name {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    padding-bottom: 6px;
  }

  &-count {
    font-size: 25px;
    font-weight: 500;
    letter-spacing: 0;
    word-spacing: 0;
    line-height: 1;
    padding-bottom: 0;
  }

  &-min {
    padding-bottom: 1px;
  }

  &__signature {
    padding-top: 3px;
    font-size: 10px;
    font-weight: 500;
  }

  &--primary {
    .status-dashboard__item-box {
      border-bottom-color: $color--primary;
    }
  }

  &--positive {
    .status-dashboard__item-box {
      border-bottom-color: $color--positive;
    }
  }

  &--negative {
    .status-dashboard__item-box {
      border-bottom-color: $color--negative;
    }
  }
}
</style>
