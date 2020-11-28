<template>
    <div
        :class="classes"
        class="ui-toggle"
    >
        <button
            class="ui-toggle__item ui-toggle__item-start"
            @click="sendValue(false)">
            Онлайн
        </button>
        <button
            class="ui-toggle__item ui-toggle__item-stop"
            @click="sendValue(true)">
            Перерыв
        </button>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props: {
        defaultValue: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('sessions', ['isSessionBreak']),
        classes() {
            return [
                {'ui-toggle--is-break': this.defaultValue},
            ]
        }
    },
    methods: {
        sendValue(val) {
          this.$emit('click', val)
      }
    },
}
</script>

<style lang="scss" scoped>
.ui-toggle {
    width: 100%;
    position: relative;
    display: flex;
    height: 33px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    //border: 1px solid #3e58fe;

    &:before {
        content: '';
        position: absolute;
        z-index: 1;
        width: 50%;
        height: 100%;
        transition-duration: 0.2s;
        background-color: #3e58fe;
        left: 0;
    }

    &__item {

        position: relative;
        z-index: 2;
        flex-shrink: 0;
        width: 50%;
        font-size: 12px;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        user-select: none;
        border: 0;
        color: #ffffff;

        &-start {
            color: #ffffff;
            border: 1px solid #3e58fe;
            border-right: none;
            border-top-left-radius: 9px;
            border-bottom-left-radius: 9px;
            box-shadow: 0 0;
            pointer-events: none;
        }

        &-stop {
            border: 1px solid #4fd161;
            border-left: none;
            border-top-right-radius: 9px;
            border-bottom-right-radius: 9px;
            color: #4fd161;
            pointer-events: auto;
        }
    }

    &--is-break {
        //&:before {
        //    left: 0;
        //    background-color: #3e58fe;
        //}
        //
        //.ui-toggle__item-start {
        //    color: #ffffff;
        //}
        &:before {
            left: 50%;
            background-color: #4fd161;
        }

        .ui-toggle__item-start {
            color: #3e58fe;
            pointer-events: auto;
        }

        .ui-toggle__item-stop {
            color: #ffffff;
            pointer-events: none;
        }

        //.ui-toggle__item {
        //    color: #ffffff;
        //    //border: 0
        //    border: 1px solid ;
        //}
    }

    &--stop {
        &:before {
            left: 50%;
            background-color: #4fd161;
        }

        .ui-toggle__item-stop {
            color: #ffffff;
        }
    }

}
</style>
