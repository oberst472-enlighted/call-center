<template>
    <div :class="classes" class="ui-select">
        <span
            v-if="this.$slots.default"
            class="ui-select__label"
        >
            <slot/>
        </span>
        <div class="ui-select__content" @click="toggle">
            <span :class="{'ui-select--error': isEmpty}" class="ui-select__value">
                <span class="ui-select__text">{{ value }}</span>
                <img
                    :class="{'ui-select__icon--active': isActive}"
                    alt="Arrow"
                    class="ui-select__icon"
                    src="./assets/images/arr.svg"
                >
            </span>

            <transition name="translate">
                <div v-if="isActive" class="ui-select__items">
                    <div class="ui-select__items-box">
                        <span
                            v-for="(item, index) in items"
                            :key="index"
                            class="ui-select__item"
                            @click="send(item)"
                        >
                            {{ item.title }}
                        </span>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <span
                v-if="isEmpty"
                class="ui-select__error">
                {{ emptyText }}
            </span>
        </transition>
    </div>
</template>

<script>

export default {
    components: {},
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        shadow: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        fill: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: () => []
        },
        defaultValue: {
            type: String,
            default: 'all'
        },
        defaultValueSearch: {
            type: String,
            default: 'id'
        },
        newPlace: {
            type: String,
            default: ''
        },
        isEmpty: {
            type: Boolean,
            default: false
        },
        emptyText: {
            type: String,
            default: 'Это поле обязательно'
        }
    },
    data() {
        return {
            isActive: false,
            value: this.placeholder
        }
    },
    computed: {
        classes() {
            return {
                'ui-select--shadow': this.shadow,
                'ui-select--small': this.small,
                'ui-select--active': this.isActive,
                'ui-select--fill': this.fill
            }
        }
    },
    methods: {
        toggle() {
            this.isActive ? this.hide() : this.show()
        },
        show() {
            this.isActive = true
            setTimeout(() => {
                document.addEventListener('click', this.hide, {once: true})
            }, 0)
        },
        hide() {
            this.isActive = false
            document.removeEventListener('click', this.hide)
        },
        send(val) {
            this.value = val.title
            this.$emit('input', val)
        }
    },
    mounted() {
        const val = this.items.find(item => item[this.defaultValueSearch] === this.defaultValue)
        this.value = val ? val.title : this.items[0].title
        this.send(val ? val : this.items[0])
    }
}
</script>

<style lang="scss" scoped>
.ui-select {
    width: 100%;

    &__label {
        font-size: 13px;
        display: block;
        margin-bottom: 4px;
        line-height: 18px;
        color: $color--text;
    }

    &__error {
        position: absolute;
        bottom: -20px;
        z-index: -1;
        margin: 4px 0 4px 0;
        font-size: 11px;
        color: $color--negative;
    }

    &--error {
        border-color: $color--negative !important;
    }

    &__content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 13px;
    }

    &__value {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 4px 12px;
        border: 1px solid #DCDCDC;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;
        transition-duration: 0.3s;
    }

    &__items {
        position: absolute;
        top: calc(100% + 10px);
        display: flex;
        width: 100%;
        height: auto;
        max-height: 200px;
        background-color: #fff;
        overflow: hidden;
    }

    &__items-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-height: 100%;
        overflow: auto;
    }

    &__item {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        height: 44px;
        padding: 0 12px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #F8F9FA;
        }

        &:active {
            opacity: 0.8;
        }
    }

    &__text {
        width: 100%;
    }

    &__icon {
        width: 18px;
        height: 18px;
        margin-top: -1px;
        margin-left: 20px;
        user-select: none;
        transition-duration: 0.3s;
        pointer-events: none;

        &--active {
            transform: scale(-1)
        }
    }

    .translate-enter-active, .translate-leave-active {
        transition-duration: 0.3s;
        transform: translateY(0);
    }

    .translate-enter, .translate-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    &--shadow {
        .ui-select__items {
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 0 8px rgba(120, 131, 132, 0.22);
        }
    }

    &--small {
        .ui-select__value {
            height: 27px;
        }
    }

    &--active {
        .ui-select__value {
            border-color: $color--primary
        }
    }

    &--fill {
        .ui-select__value {
            background-color: #fff;
        }
    }
}
</style>
