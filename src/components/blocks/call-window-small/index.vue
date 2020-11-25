<template>
    <div class="block-call-window-small">
        <div v-if="isIncomingCall || isDisablePassiveBox" class="active-call block-call-window-small__active">
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

            <span class="block-call-window-small__btn-box" v-if="!isDisableBtnsBox">
                <LocalCallWindowSmallBtn @click="$emit('click')"/>
            </span>

            <span
                class="block-call-window-small__options-box"
                v-if="isBlockOptionsActive"
            >
                <transition name="fade" mode="out-in">
                    <LocalCallWindowOptions
                        v-if="!isBlockOptionsDisable"
                        @stop-call="$emit('stop-call')"
                        @toggle-micro="$emit('toggle-micro', $event)"
                        @toggle-camera="$emit('toggle-camera', $event)"
                        key="options"
                    />

                    <LocalCallWindowEnd v-else key="end"/>
                </transition>
            </span>
        </div>

        <div v-else class="empty-call block-call-window-small__passive">
            Ожидание <br> звонка
        </div>
    </div>
</template>

<script>
import LocalCallWindowSmallBtn from './call-window-small-btn'
import LocalCallWindowOptions from './call-window-small-options'
import LocalCallWindowEnd from './call-window-end'

export default {
    components: {
        LocalCallWindowSmallBtn,
        LocalCallWindowOptions,
        LocalCallWindowEnd
    },
    props: {
        isBlockOptionsActive: {
            type: Boolean,
            default: false
        },
        isBlockOptionsDisable: {
            type: Boolean,
            default: false
        },
        isDisablePassiveBox: {
            type: Boolean,
            default: false
        },
        isDisableBtnsBox: {
            type: Boolean,
            default: false
        },
        isIncomingCall: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang='scss'>
.block-call-window-small {
    display: flex;
    width: 100%;
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

    &__desc {
        margin-bottom: 15px;
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
    &__options-box {
        margin-top: auto;
        transition-duration: 0.3s;
        &--disable {
            pointer-events: none;
            opacity: 0.3;
        }
    }
}
</style>
