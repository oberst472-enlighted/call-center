<template>
    <div class="block-call-window-small">
        <div v-if="isIncomingCall" class="active-call block-call-window-small__active">
            <span class="block-call-window-small__item block-call-window-small__text">
                Новый звонок <span>russ</span>
            </span>

            <span class="block-call-window-small__item block-call-window-small__name">
                Иван Иванович Николаев
            </span>

            <span class="block-call-window-small__item block-call-window-small__terminal">
                терминал # <span>1288</span>
            </span>

            <span class="block-call-window-small__item block-call-window-small__desc">
                Короткое описание
            </span>

            <span class="block-call-window-small__btn-box">
                <LocalCallWindowSmallBtn @click="$emit('click')"/>
            </span>
        </div>

        <div v-else class="empty-call block-call-window-small__passive">
            Ожидание <br> звонка
        </div>
    </div>
</template>

<script>
import LocalCallWindowSmallBtn from './call-window-small-btn'

export default {
    components: {
        LocalCallWindowSmallBtn
    },
    props: {
        isIncomingCall: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang='scss'>
.block-call-window-small {
    display: flex;
    height: 100%;
    color: #ffffff;
    background-color: #4c3b60;

    &__passive {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 15px;
        font-size: 14px;
        line-height: 1.2;
        user-select: none;
        text-align: center;
        text-transform: uppercase;
    }

    &__active {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        padding: 15px;
    }

    &__item {
        font-weight: 300;
    }

    &__text {
        font-weight: 300;
        opacity: 0.7;
        text-transform: uppercase;

        span {
            font-weight: 300;
        }
    }

    &__name {
        margin-top: 10px;
        font-weight: 700;
    }

    &__terminal {
        margin-top: 2px;
        line-height: 15px;
    }

    &__btn-box {
        width: 52px;
        height: 52px;
        margin-top: 24px;
        border-radius: 50%;
    }
}
</style>
