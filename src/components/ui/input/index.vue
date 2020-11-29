<template>
    <div :class="classes" class="ui-input">
        <div class="ui-input__content">
            <label class="ui-input__label">
                <span v-if="this.$slots.default" class="ui-input__text"><slot/></span>
                <transition name="fade">
                    <span
                        v-if="!isValid && val.length"
                        class="ui-input__error">
                        {{ validationText }}
                    </span>
                </transition>

                <transition name="try">
                    <span
                        v-if="isEmpty"
                        class="ui-input__error">
                        Это поле обязательно
                    </span>
                </transition>

                <span
                    :class="{'ui-input__box--error': !isValid && val.length}"
                    class="ui-input__box"
                >
                    <input
                        v-model="val"
                        :class="{'ui-input__inp--error': !isValid && val.length}"
                        :placeholder="placeholder"
                        :type="type"
                        class="ui-input__inp"
                    >
                    <span class="ui-input__img" v-if="icon">
                        <span class="ui-input__icon-box">
                            <component :is="icon" v-if="icon" class="ui-input__icon"/>
                        </span>
                    </span>
                </span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        validationRule: {
            type: String,
            default: ''
        },
        validationText: {
            type: String,
            default: 'Неверный формат!'
        },
        transparent: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number, Object],
            default: ''
        },
        isEmpty: {
            type: Boolean,
            default: false
        }

    },
    data() {
        return {
            val: ''
        }
    },
    computed: {
        isValid() {
            return this.validationRule ? new RegExp(this.validationRule).test(this.val) : true
        },
        classes() {
            return {
                ['ui-input--transparent']: this.transparent,
                ['ui-input--icon']: this.icon,
                ['ui-input--error']: this.isEmpty
            }
        }
    },
    watch: {
        val() {
            this.$emit('input', this.val)
            this.$emit('is-valid', this.isValid)
        },
        value(val) {
            if (val === '') {
                this.val = this.value
            }
        }
    },
    created() {
        if (this.val === null) {
            this.val = ''
        } else {
            this.val = this.value
        }
    }
}
</script>

<style lang="scss" scoped>
.ui-input {
    min-width: 120px;
    font-family: $family--default;

    &__label {
        position: relative;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        width: 100%;
        user-select: none;
    }

    &__text {
        margin-bottom: 4px;
        font-size: 13px;
        line-height: 1;
        color: $color--text;
        user-select: none;
    }

    &__error {
        position: absolute;
        bottom: -26px;
        margin: 4px 0 4px 0;
        font-size: 9px;
        color: #ffffff;
        padding: 3px;
        border-radius: 3px;
        background-color: $color--negative;
        &:before {
            content: '';
            position: absolute;
            left: 10px;
            top: -3px;
            width: 6px;
            height: 6px;
            background-color: $color--negative;
            transform: rotate(-45deg);
            border-top-right-radius: 2px;
        }
    }

    &__box {
        position: relative;
        display: inline-flex;
        width: 100%;
        height: 40px;
        padding: 0;
        color: $color--text;
        border-radius: 8px;
        //box-shadow: 0 0 0 1px #DCDCDC;
        overflow: hidden;
        transition: border-color 0.3s ease;

        &--error {
            border-color: $color--negative;
        }
    }

    &__inp {
        border: 1px solid #DCDCDC;
        width: 100%;
        padding: 0 $gutter / 2;
        font-size: 13px;
        line-height: 1;
        //border: 0;
        border-radius: 8px;
        outline: 0;
        transition-duration: 0.3s;

        &::placeholder {
            font-size: 13px;

        }

        &:focus {
            border-color: $color--primary;
            &::placeholder {
                color: transparent;
            }

            & + .ui-input__img > .ui-input__icon-box {
                transform: scale(1.2);
            }

        }

        &--error {
            border-color: $color--negative
        }
    }

    &__img {
        position: absolute;
        z-index: 2;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        width: 39px;
        height: 38px;
        background-color: #F4F3F7;
        top: 1px;
        left: 1px;
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
    }

    &__icon-box {
        display: inline-flex;
        width: 14px;
        height: 14px;
        color: $color--primary;
        transition-duration: 0.3s;
    }

    &--icon {
        .ui-input__inp {
            padding-left: 55px;
        }
    }

    &--transparent {
        .ui-input__inp {
            background-color: transparent;
        }
    }

    &--error {
        .ui-input__box {
            border-color: $color--negative
        }
        .ui-input__inp {
            border-color: $color--negative;
        }
    }
}
</style>
