<template>
    <div
        :class="classes"
        class="ui-toggle"
    >
        <button
            class="ui-toggle__item ui-toggle__item-start"
            @click="isStarted = true">
            Онлайн
        </button>
        <button
            class="ui-toggle__item ui-toggle__item-stop"
            @click="isStarted = false">
            Перерыв
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isStarted: true
        }
    },
    computed: {
        classes() {
            return [
                {'ui-toggle--start': this.isStarted},
                {'ui-toggle--stop': !this.isStarted},
            ]
        }
    },
    watch: {
        isStarted(val) {
            this.$emit('click', val)
        }
    }
}
</script>

<style lang="scss" scoped>
.ui-toggle {
    position: relative;
    display: flex;
    height: 33px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        z-index: 1;
        width: 50%;
        height: 100%;
        transition-duration: 0.2s;
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

        &-start {
            color: #3e58fe;
            border: 1px solid #3e58fe;
            border-right: none;
            border-top-left-radius: 9px;
            border-bottom-left-radius: 9px;
            box-shadow: 0 0;

        }

        &-stop {
            color: #4fd161;
            border: 1px solid #4fd161;
            border-left: none;
            border-top-right-radius: 9px;
            border-bottom-right-radius: 9px;
        }
    }

    &--start {
        &:before {
            left: 0;
            background-color: #3e58fe;
        }

        .ui-toggle__item-start {
            color: #ffffff;
        }
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
