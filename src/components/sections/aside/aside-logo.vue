<template>
    <div class="section-aside__logo">
        <div class="section-aside__logo-box"></div>
        <img alt="" class="section-aside__logo-icon" src="/assets/images/logo-2.png">
        <span class="section-aside__logo-text">Video-Calls</span>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.section-aside__logo {
    user-select: none;
    display: flex;
    align-items: center;
    width: 100%;

    &-icon {
        position: relative;
        left: -8px;
        transition-duration: 0.3s;
        max-width: 50px;
    }

    &-text {
        margin-left: 15px;
        font-size: 15px;
        color: $color--primary;
        font-weight: 700;
        opacity: 0;
        transition-duration: 0.3s;
        white-space: nowrap;

    }
}

</style>
