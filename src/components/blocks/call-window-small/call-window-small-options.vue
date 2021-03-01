<template>
    <div class="block-call-window-small__options">
        <button
            class="block-call-window-small__options-btn block-call-window-small__options--stop"
            title="Завершить звонок"
            @click="$emit('stop-call')"
        >
            Завершить звонок
        </button>

        <button
            :class="{'block-call-window-small__options--sound-disable': isMicroDisable}"
            :title="isMicroDisable ? 'Включить' : 'Отключить'"
            class="block-call-window-small__options-btn block-call-window-small__options--sound"
            @click="toggleMicro"
        >
            Включить / отключить микрофон
            <IconMicroOn class="block-call-window-small__options-btn-icon"/>
        </button>

        <button
            :class="{'block-call-window-small__options--video-disable': isCameraDisable}"
            :title="isCameraDisable ? 'Включить' : 'Отключить'"
            class="block-call-window-small__options-btn block-call-window-small__options--video"
            @click="toggleCamera"
        >
            Включить / отключить видео
            <IconCameraOn class="block-call-window-small__options-btn-icon"/>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMicroDisable: false,
            isCameraDisable: false
        }
    },
    methods: {
        toggleMicro() {
            this.isMicroDisable = !this.isMicroDisable
            this.$emit('toggle-micro', !this.isMicroDisable)
        },
        toggleCamera() {
            this.isCameraDisable = !this.isCameraDisable
            this.$emit('toggle-camera', !this.isCameraDisable)
        }
    }
}
</script>

<style lang="scss" scoped>
.block-call-window-small__options {
    position: relative;
    display: grid;
    grid-gap: 20px;
    width: 100%;
    height: 100%;
    grid-auto-flow: column;

    &-btn {
        position: relative;
        z-index: 3;
        width: 52px;
        height: 52px;
        font-size: 0;
        border: 0;
        border-radius: 50%;
        outline: none;
        background-color: #fff;
        cursor: pointer;
        transition-duration: 0.3s;
        transition-property: transform;

        &:before {
            content: '';
            position: absolute;
            top: 76%;
            left: 50%;
            width: 34px;
            height: 2px;
            opacity: 0;
            border-top: 2px solid white;
            background-color: $color--primary;
            transition-duration: 0.3s;
            transform: rotate(46deg) translate(-71%);
            transform-origin: center;
        }

        &:hover {
            transform: scale(0.95);
        }

        &:active {
            background-color: darken(#fff, 10%);
        }

        &-icon {
            width: 30px !important;
            height: 30px !important;
            color: lighten(#4c3b60, 20%) !important;
        }

    }

    &--stop {
        background-color: $color--negative;
        background-image: url('/assets/images/handset-2.svg');
        background-repeat: no-repeat;
        background-position: center;

        &:active {
            background-color: darken($color--negative, 10%);
        }
    }

    &--sound {
        background-size: 25px;

        &-disable {
            &:before {
                opacity: 1;
            }
        }
    }

    &--video {
        background-position: 15px center;

        &-disable {
            &:before {
                opacity: 1;
            }
        }

        .block-call-window-small__options-btn-icon {
            width: 26px !important;
            height: 26px !important;
            margin-left: 2px;
        }
    }

}


</style>
