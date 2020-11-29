<template>
    <article class="block-stat-item">
        <span class="block-stat-item__title">{{ info.top_heading }}</span>
        <span class="block-stat-item__count">{{ info.value }}</span>
        <span class="block-stat-item__text">{{ info.bottom_heading }}</span>
    </article>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            default: () => {}
        },
    },
}
</script>

<style scoped lang="scss">
.block-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    &__title {
        width: 80px;
        text-align: center;
        font-size: 10px;
      line-height: 1.2;
        text-transform: uppercase;
    }
    &__count {
        width: 100%;
        margin-top: 10px;
        font-size: 18px;
        line-height: 1;
        color: #65528B;
        font-weight: 500;
        margin-bottom: 3px;
        border-bottom: 1px solid green;
        padding-bottom: 5px;
    }
    &__text {
        font-size: 10px;
        margin-top: 5px;
        line-height: 1.2;
    }
}
</style>
