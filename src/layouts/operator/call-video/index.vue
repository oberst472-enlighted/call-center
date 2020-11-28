<template>
    <div class="layout-call-video">
        <main class="layout-call-video__body">
            <router-view/>
        </main>
    </div>
</template>

<script>

export default {
}

</script>

<style lang="scss" scoped>
.layout-call-video {
    display: flex;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;

    &__body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100vh;
        max-height: 100vh;
        overflow: auto;
    }
}
</style>
