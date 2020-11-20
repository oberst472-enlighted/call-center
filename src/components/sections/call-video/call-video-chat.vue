<template>
    <div class="block-chat">
        <div class="block-chat__title">Комментарий оператора</div>
        <label class="block-chat__box">
            <textarea class="block-chat__inp"/>
            <span class="block-chat__text">сохранено</span>
        </label>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.block-chat {
    &__title {
        margin-bottom: 9px;
        font-size: 11px;
        color: #685c7b;
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
        min-height: 296px;
    }

    &__inp {
        width: 100%;
        height: 100%;
        min-height: 296px;
        padding: 13px 13px 30px 13px;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        outline: none;
        resize: none;
        position: relative;
        z-index: 2;
    }

    &__text {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 10px;
        color: #c8bfd4;
        font-weight: 500;
        z-index: 3;
        user-select: none;
    }
}
</style>
