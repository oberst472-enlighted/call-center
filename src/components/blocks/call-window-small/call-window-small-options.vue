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
            class="block-call-window-small__options-btn block-call-window-small__options--sound"
            :title="isMicroDisable ? 'Включить' : 'Отключить'"
            :class="{'block-call-window-small__options--sound-disable': isMicroDisable}"
            @click="toggleMicro"
        >
            Включить / отключить микрофон
        </button>
        <button
            class="block-call-window-small__options-btn block-call-window-small__options--video"
            :title="isCameraDisable ? 'Включить' : 'Отключить'"
            :class="{'block-call-window-small__options--video-disable': isCameraDisable}"
            @click="toggleCamera"
        >
            Включить / отключить видео
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
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;

    &-btn {
        width: 52px;
        height: 52px;
        font-size: 0;
        position: relative;
        z-index: 3;
        display: block;
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
            transform: scale(0.95);
        }

        &:active {
            background-color: darken(#ffffff, 5%);
        }

    }
    &--stop {
        background-color: $color--negative;
        background-image: url('/assets/images/handset-2.svg');
        &:active {
            background-color: darken($color--negative, 20%);
        }
    }
    &--sound {
        background-image: url('/assets/images/microphone.svg');
        background-size: 25px;
        &-disable {
            background-image: url('/assets/images/microphone-disable.svg');
        }
    }
    &--video {
        background-image: url('/assets/images/camera.svg');
        background-position: 15px center;
        &-disable {
            background-image: url('/assets/images/camera-disable.svg');
        }
    }

}


</style>
