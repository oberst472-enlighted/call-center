<template>
    <div class="ui-checkbox" :class="classes">
        <span class="ui-checkbox__title"><slot/></span>
        <div class="ui-checkbox__content">
            <div class="ui-checkbox__item" v-for="item in values" :key="item.id">
                <input
                    class="ui-checkbox__input"
                    type="checkbox"
                    :id="item.id"
                    :value="item.id"
                    :checked="item.checked"
                    v-model="models"
                >
                <label class="ui-checkbox__label" :for="item.id">
                    <span class="ui-checkbox__label-text">
                        {{ item.title }}
                    </span>
                    <span class="ui-checkbox__label-decor"></span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        model: {
            event: 'change',
            prop: 'checked'
        },
        props: {
            values: {
                type: Array,
                default: () => []
            },
            inputId: {
                type: String,
                default: 'check'
            },
            textPosition: {
                type: String,
                default: 'right'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                models: []
            }
        },
        computed: {
            classes() {
                return {
                    [`ui-checkbox--text-position-${this.textPosition}`]: true,
                    [`ui-checkbox--disabled`]: this.disabled
                }
            }
        },
        watch: {
            models(val) {
                this.$emit('change', val)
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-checkbox {
        font-family: $family--default;
        transition-duration: 0.3s;
        &:hover {
            .ui-checkbox__label-text {
                color: $color--primary
            }
        }
        &__title {
            font-weight: 500;
            margin-bottom: 20px;
            display: block;
            font-size: 13px;
            line-height: 1;
            color: #000000;
            user-select: none;
        }
        &__content {
            display: inline-flex;
            align-items: flex-end;
        }
        &__item {
            margin-right: 20px;
        }

        &__label {
            cursor: pointer;
            user-select: none;
            display: inline-flex;
            align-items: flex-end;
            &-text {
                margin: 0 4px;
                font-size: 12px;
                transition-duration: 0.3s;
            }

            &-decor {
                width: 18px;
                height: 18px;
                background-color: #f4f3f7;
                display: inline-flex;
                transition-duration: 0.3s;
                position: relative;
                overflow: hidden;
                justify-content: center;
                align-items: center;
                &:before {
                    content: '';
                    left: 0;
                    top: 0;
                    width: 12px;
                    height:12px;
                    background-color: $color--primary;
                    transform: scale(0);
                    opacity: 0;
                    transition-duration: 0.3s;
                }
            }
        }

        &__input {
            display: none;

            &:checked {
                & + .ui-checkbox__label {
                    .ui-checkbox__label-text {
                        color: $color--primary;
                    }

                    .ui-checkbox__label-decor {
                        border-color: $color--primary;;
                       &:before {
                           transform: scale(1);
                           opacity: 1;
                       }

                    }

                }
            }
        }
        &--text-position {
            &-left {
                .ui-checkbox__label {
                    flex-direction: row;
                }
            }
            &-right {
                .ui-checkbox__label {
                    flex-direction: row-reverse;
                }
            }
        }
        &--disabled {
            opacity: 0.3;
            pointer-events: none;
        }
    }
</style>
