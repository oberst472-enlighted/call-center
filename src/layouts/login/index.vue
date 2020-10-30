<template>
    <div class="layout-login">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.layout-login {
    width: 100%;
    display: flex;
}
</style>
