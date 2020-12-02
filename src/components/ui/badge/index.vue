<template>
    <span class="ui-badge" :class="classes">
        <slot/>
    </span>
</template>

<script>
export default {
    props: {
        theme: {
            type: String,
            default: 'positive'
        },
    },
    computed: {
        classes() {
            return {
                [`ui-badge-theme--${this.theme}`]: true
            }
        },
    }
}
</script>

<style scoped lang="scss">
.ui-badge {
    text-align: center;
    height: 14px;
    border-radius: 7px;
    font-size: 8px;
    font-weight: 700;
    min-width: 70px;
    padding: 2px 5px;
    &-theme {
        &--positive {
            background-color: #f2fcf4;
            color: #4fd161;
        }
        &--negative {
            background-color: rgb(252, 239, 242);
            color: rgb(243, 115, 140);
        }
    }
}
</style>
