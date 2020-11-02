<template>
    <div class="section-aside__logo">
        <div class="section-aside__logo-box"></div>
        <img alt="" class="section-aside__logo-icon" src="@/assets/images/logo.svg">
        <span class="section-aside__logo-text">Video-Calls</span>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.section-aside__logo {
    display: flex;
    align-items: center;
    width: 100%;

    &-icon {
        position: relative;
        left: -10px;
        transition-duration: 0.3s;
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
