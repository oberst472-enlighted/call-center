<template>
    <router-link :to="{name: href}" class="section-aside__link">
        <div class="section-aside__link-icon-box">
            <component :is="icon"/>
        </div>
        <span class="section-aside__link-text">
            {{ title }}
        </span>
    </router-link>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="scss">
.section-aside__link {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    transition: all ease 1s;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    height: 36px;
    border-radius: 50%;
    transition-duration: 0.3s;
    transition-delay: 0.3s;
    transition-property: border-radius, background-color;
    &:hover {
        background-color: rgba($color--primary, 0.1);
    }
    &:active {
        opacity: 0.7;
    }
    &-icon-box {
        flex-shrink: 0;
        color: $color--primary;
        width: 20px;
        height: 20px;
        min-width: 20px;
        min-height: 20px;
        margin-left: 8px;
        margin-right: 8px;
    }
    &-text {
        opacity: 0;
        font-size: 15px;
        line-height: 1;
        transition-duration: 0.3s;
        overflow: hidden;
        color: #65528b;
        font-weight: 500;
    }
    &--active {
        background-color: rgba($color--primary, 0.1);
        pointer-events: none;
    }
}
</style>
