<template>
    <div class="section-box">
        <slot/>
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.section-box {
    background-color: #fff;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    padding: 30px;
    box-sizing: border-box;
}
</style>
