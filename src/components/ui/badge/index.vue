<template>
    <span class="ui-badge">
        <slot/>
    </span>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.ui-badge {
    text-align: center;
    height: 14px;
    border-radius: 7px;
    background-color: #f2fcf4;
    color: #4fd161;
    font-size: 8px;
    font-weight: 700;
    width: 70px;
    padding: 2px 5px;
}
</style>
