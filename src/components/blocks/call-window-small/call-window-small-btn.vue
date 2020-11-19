<template>
    <div class="block-call-window-small__btn">
        <button class="block-call-window-small__btn-btn" title="Ответить на звонок" @click="$emit('click')"></button>
    </div>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
    },
}
</script>

<style lang="scss" scoped>
.block-call-window-small__btn {
    position: relative;
    width: 100%;
    height: 100%;

    &-btn {
        position: relative;
        z-index: 3;
        display: block;
        width: inherit;
        height: inherit;
        border: 0;
        border-radius: 50%;
        outline: none;
        background-color: #fff;
        background-image: url('/assets/images/handset.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;
        cursor: pointer;
        transition-duration: 0.3s;
        transition-property: transform;

        &:hover {
            transform: scale(0.9);
        }

        &:active {
            background-color: darken(#ffffff, 20%);
        }
    }

    &:before,
    &:after {
        content: "";
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -10px;
        z-index: 2;
        opacity: 0;
        border-radius: 50%;
        background-color: #ffffff;
        animation: animate 1.5s linear infinite;
    }

    &:before {
        animation-delay: .75s;
    }
}

@keyframes animate {
    0% {
        opacity: 0.5;
    }
    100% {
        transform: scale(3);
        opacity: 0;
    }
}

</style>
