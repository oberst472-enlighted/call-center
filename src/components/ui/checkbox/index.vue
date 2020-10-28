<template>
    <div class="ui-checkbox" :class="classes">
        <div class="ui-checkbox__content">
            <input
                class="ui-checkbox__input"
                type="checkbox"
                :id="inputId"
                :checked="checked"
                @change="$emit('change', $event.target.checked)"
            >
            <label class="ui-checkbox__label" :for="inputId">
                <span class="ui-checkbox__label-text">
                    <slot/>
                </span>
                <span class="ui-checkbox__label-decor"></span>
            </label>
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
            checked: {
                type: Boolean,
                default: false
            },
            inputId: {
                type: String,
                default: 'check'
            },
            textPosition: {
                type: String,
                default: 'right'
            }
        },
        data() {
            return {
            }
        },
        computed: {
            classes() {
                return {
                    [`ui-checkbox--text-position-${this.textPosition}`]: true
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-checkbox {
        font-family: $family--default;
        &:hover {
            .ui-checkbox__label-text {
                color: $color--positive
            }
        }
        &__content {
            display: inline-flex;
            align-items: flex-end;
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
                border-radius: 50%;
                display: inline-flex;
                transition-duration: 0.3s;
                position: relative;
                overflow: hidden;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: $color--positive;
                    transform: scale(0);
                    opacity: 0;
                    transition-duration: 0.3s;
                    border-radius: 50%;
                }
            }
        }

        &__input {
            display: none;

            &:checked {
                & + .ui-checkbox__label {
                    .ui-checkbox__label-text {
                        color: $color--positive;
                    }

                    .ui-checkbox__label-decor {
                        border-color: $color--positive;
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
    }
</style>
