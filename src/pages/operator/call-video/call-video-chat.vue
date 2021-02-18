<template>
    <div :class="{'block-chat--success-save-comment': isSuccess}" class="block-chat">
        <div class="block-chat__title">Комментарий оператора</div>

        <label class="block-chat__box">
            <textarea class="block-chat__inp" @input="$emit('input', $event.target.value)"/>
            <span class="block-chat__text">сохранено</span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        isSuccess: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.block-chat {
    &__title {
        margin-bottom: 9px;
        font-size: 11px;
        color: $color--subtitle;
        font-weight: 300;
        opacity: 0.7;
        text-align: center;
        text-transform: uppercase;
    }

    &__box {
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        min-height: 200px;
    }

    &__inp {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        min-height: 200px;
        padding: 13px 13px 30px 13px;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        outline: none;
        resize: none;
        transition-duration: 0.3s;
    }

    &__text {
        position: absolute;
        bottom: 10px;
        left: 10px;
        z-index: 3;
        font-size: 10px;
        color: #c8bfd4;
        font-weight: 500;
        user-select: none;
        transition-duration: 0.3s;
    }

    &--success-save-comment {
        .block-chat__inp {
            border-color: rgba($color--positive, 0.05);
            background-color: rgba($color--positive, 0.05);
        }

        .block-chat__text {
            color: $color--positive !important;
        }
    }
}
</style>
