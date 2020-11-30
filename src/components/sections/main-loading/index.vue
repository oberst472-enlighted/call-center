<template>
    <transition name="fadeLoading">
        <div class="ui-loading">
            <div class="lds-ripple"><div></div><div></div></div>
        </div>
    </transition>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-ripple div {
    position: absolute;
    border: 2px solid $color--primary;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
}
@keyframes lds-ripple {
    0% {
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        width: 72px;
        height: 72px;
        opacity: 0;
    }
}

    .ui-loading {
        background-color: rgba(#fafafc, 0.3);
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }
    .fadeLoading-enter-active, .fadeLoading-leave-active {
        transition: opacity 0s;
    }

    .fadeLoading-enter, .fadeLoading-leave-to {
        opacity: 0;
        transition: opacity 0.3s;
    }
</style>
