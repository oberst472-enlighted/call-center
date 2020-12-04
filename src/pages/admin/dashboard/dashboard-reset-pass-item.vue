<template>
    <component :is="tag" :to="to" class="block-reset-pass-item" title="Перейти">
        <span class="block-reset-pass-item__name">{{ info.user.first_name }}</span>
        <span class="block-reset-pass-item__name">{{ info.user.last_name }}</span>
    </component>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            default: null
        },
        to: {
            type: Object,
            default: null
        },
    },
    computed: {
        tag() {
            return this.to ? 'router-link' : 'span'
        },
    }
}
</script>

<style scoped lang="scss">
.block-reset-pass-item {
    background-color: rgba(102, 83, 138, 0.1);
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    transition-duration: 0.3s;
    user-select: none;
    text-decoration: none;
    outline: none;
    &:hover {
        background-color: rgba(102, 83, 138, 0.2);
    }
    &:active {
        opacity: 0.8;
    }
    &__title {
        width: 100px;
    }
    &__name {
        margin-right: 5px;
        font-size: 12px;
        line-height: 1.2;
        color: #4C3B60;
    }
}
</style>
