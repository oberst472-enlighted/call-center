<template>
    <button
        class="ui-back"
        title="Назад"
        @click="$emit('click')"
        :class="{'ui-back--circle': circle}"
    >
    </button>
</template>

<script>
    export default {
        props: {
            circle: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-back {
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 0;
        transition-duration: 0.3s;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: transparent;
        justify-content: center;
        color: #AEADCA;
        outline: none;
        padding: 0;
        background-image: url('/assets/images/arrow.svg');
        background-repeat: no-repeat;
        background-position: 55% center;
        background-size: 8px;
        transform: scale(-1);

        &:hover {
            background-color: #e8eaf5;
            .ui-back__icon {
            }
        }
        &:active {
            opacity: 0.8;
        }


        &__icon {
            transition-duration: 0.3s;
        }

        &--circle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: #FFFFFF;
            box-shadow: 0 2px 3px rgba(18, 20, 71, 0.15);
            justify-content: center;
        }
    }
</style>
