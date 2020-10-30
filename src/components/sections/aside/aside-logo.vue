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

<style scoped lang="scss">
.section-aside__logo {
    width: 100%;
    display: flex;
    align-items: center;
    &-icon {
        position: relative;
        left: -10px;
        transition-duration: 0.3s;
        //width: 36px;
        //transform: scale(1.4);
    }
    &-text {
        opacity: 0;
        margin-left: 15px;
        font-weight: 700;
        font-size: 15px;
        color: $color--primary;
       white-space: nowrap;
        transition-duration: 0.3s;

    }
}

</style>
