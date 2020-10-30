<template>
    <div class="ui-message">
        <div class="ui-message__items">
            <transition-group name="list">
                <div
                    v-for="item in alerts"
                    :key="item.id"
                    :class="`ui-message__item--${item.status}`"
                    class="ui-message__item"
                >
                    <img v-if="item.status === 'positive'" alt="positive-icon" class="ui-message__item-icon" src="./assets/images/positive.svg">
                    <img v-else alt="negative-icon" class="ui-message__item-icon" src="./assets/images/negative.svg">

                    <p class="ui-message__item-text">{{ item.value }}</p>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    data() {
        return {
            timeout: ''
        }
    },
    computed: {
        ...mapState('alerts', ['alerts'])
    },
    methods: {
        ...mapActions('alerts', ['deleteAlert'])
    },
    watch: {
        alerts(val) {
            if (val.length) {
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.deleteAlert()
                }, 2500)
            } else {
                clearTimeout(this.timeout)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.ui-message {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 50;
    width: 300px;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;

    &__items {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        height: 100%;
    }

    &__item {
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 50px;
        margin-top: $gutter / 3;
        padding: $gutter / 3;

        font-size: 12px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        text-align: center;

        &-icon {
            width: 30px;
            height: 30px;
        }

        &-text {
            padding-left: 15px;
            text-align: left;
        }

        &--positive {
            color: $color--text-invert;
            background-color: $color--positive;
        }

        &--negative {
            color: $color--text-invert;
            background-color: $color--negative;
        }
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s ease;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(150px);
    }
}
</style>
