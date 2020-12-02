<template>
    <div class="ui-icon">
        <svg viewBox="0 0 14 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <circle id="Oval" cx="2" cy="2" r="2"></circle>
            <circle id="Oval-Copy" cx="7" cy="2" r="2"></circle>
            <circle id="Oval-Copy-2" cx="12" cy="2" r="2"></circle>
        </svg>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.ui-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: currentColor;

    & > * {
        width: 100% !important;
        height: 100% !important;
        fill: currentColor;
    }
}
</style>
