<template>
    <div class="ui-icon">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
            <path d="M298.667,160V85.333c0-11.733-9.6-21.333-21.333-21.333h-256C9.6,64,0,73.6,0,85.333v213.333C0,310.4,9.6,320,21.333,320
			h256c11.733,0,21.333-9.6,21.333-21.333V224L384,309.333V74.667L298.667,160z"/>
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
