<template>
    <span class="ui-preloader">
        <span></span>
    </span>
</template>

<script>
</script>

<style scoped lang="scss">
.ui-preloader {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 20px;
    font-size: 20px;
    color: $color--primary;
    span {
        display: inline-block;
        width: 1em;
        height: 1em;
        color: inherit;
        vertical-align: middle;
        pointer-events: none;
        border: 1px solid currentcolor;
        border-radius: 50%;
        animation: 1s loader-04 linear infinite;
        position: relative;
        &:before {
            content: '';
            opacity: 0.7;
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            top: -.2em;
            left: 50%;
            border: .2em solid currentcolor;
            border-radius: 50%;
        }
    }

    @keyframes loader-04 {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
