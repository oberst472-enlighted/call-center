<template>
    <div class="section-bg">
        <LocalBgLogo class="section-bg__logo"/>
    </div>
</template>

<script>
import LocalBgLogo from './bg-logo'
export default {
    components: {
        LocalBgLogo
    }
}
</script>

<style scoped lang="scss">
.section-bg {
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    background-image: linear-gradient(180deg, rgba(#fafafc, 0.6) 0%, rgba(#e5e7f4, 0.6) 100%);
    &__logo {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        display: flex;
    }
}
</style>
