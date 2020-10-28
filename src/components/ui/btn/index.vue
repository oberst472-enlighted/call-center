<!--suppress SassScssResolvedByNameOnly -->
<template>
    <div :class="btnClasses" class="ui-btn">
        <component
            :class="btnItemClasses"
            :style="btnStyles"
            :href="href"
            :is="tag"
            :target="href ? '_blank' : ''"
            :to="to"
            @click="click"
            class="ui-btn__item"
        >
            <span class="ui-btn__item-loading" v-if="loading"><span></span></span>
            <span class="ui-btn__item-value">
                <component class="ui-btn__item-icon" v-if="icon" :is="icon"/>
                <slot/>
            </span>
        </component>
        <transition name="fade">
            <span class="ui-btn__confirm" v-if="confirm && isConfirmActive">
                <span class="ui-btn__confirm-text">{{ confirm }}</span>
                <span @click="confirmYes" class="ui-btn__confirm-btn">Да</span>
                <span @click="confirmNo" class="ui-btn__confirm-btn">Нет</span>
            </span>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            theme: {
                type: String,
                default: 'primary'
            },
            size: {
                type: String,
                default: 'medium'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            href: {
                type: String,
                default: ''
            },
            to: {
                type: Object,
                default: null
            },
            confirm: {
                type: String,
                default: ''
            },
            confirmPosition: {
                type: String,
                default: 'bottom'
            },
            icon: {
                type: String,
                default: ''
            },
            border: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object,
                default: () => null
            }
        },
        data() {
            return {
                isConfirmActive: false
            }
        },
        computed: {
            btnItemClasses() {
                return {
                    'ui-btn__item--disabled': this.disabled,
                    'ui-btn__item--loading': this.loading,
                    [`ui-btn__item--theme-${this.theme}`]: true,
                    [`ui-btn__item--border`]: this.border,
                    [`ui-btn--styles`]: this.styles
                }
            },
            btnClasses() {
                return {
                    'ui-btn--confirm-active': this.isConfirmActive,
                    [`ui-btn--confirm-position-${this.confirmPosition}`]: true,
                    [`ui-btn--size-${this.size}`]: true
                }
            },
            btnStyles() {
                if (this.styles) {
                    return [
                        {'background-color': this.styles.btn_bg_color},
                        {color: this.styles.btn_text_color}
                    ]
                }
                else {
                    return ''
                }
            },
            tag() {
                if (this.href) {
                    return 'a'
                } else if (this.to) {
                    return 'router-link'
                } else {
                    return 'button'
                }
            }
        },
        methods: {
            click() {
                !this.confirm ? this.$emit('click') : this.isConfirmActive = true
            },
            confirmYes() {
                this.$emit('click')
                this.isConfirmActive = false
            },
            confirmNo() {
                this.isConfirmActive = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-btn {
        font-family: $family--default;
        position: relative;
        z-index: 2;
        display: inline-flex;

        &__item {
            position: relative;
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            font-size: 12px;
            line-height: 1;
            border: 0;
            border-radius: 8px;
            outline: none;
            cursor: pointer;
            user-select: none;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            text-decoration: none;
            -webkit-tap-highlight-color: transparent;

            &-value {
                letter-spacing: 0.03em;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: $font-weight--medium;
            }
            &-icon {
                margin-right: 10px;
                width: 18px;
                height: 18px;
            }

            &--theme {
                &-primary {
                    color: #ffffff;
                    background-color: $color--primary;

                    &:hover {
                        background-color: darken($color--primary, 15%);
                    }
                    &:active {
                        transition-duration: 0s;
                        background-color: lighten($color--primary, 20%);
                    }
                    &.ui-btn__item--border {
                        background-color: transparent;
                        box-shadow: 0 0 0 1px $color--primary inset;
                        color: $color--primary;
                        &:hover {
                            box-shadow: 0 0 0 1px rgba(118, 91, 234, 0.4) inset;
                        }
                        &:active {
                            transition-duration: 0s;
                            color: $color--text-invert;
                            background-color: #6147D8;
                            box-shadow: 0 0 0 1px #6147D8;
                        }

                    }
                }

                &-positive {
                    color: #ffffff;
                    background-color: $color--positive;

                    &:hover {
                        background-color: #69C6B3;
                    }
                    &:active {
                        transition-duration: 0s;
                        background-color: #55B2A1;
                    }
                }

                &-negative {
                    color: #ffffff;
                    background-color: $color--negative;

                    &:hover {
                        background-color: #F48094;
                    }
                    &:active {
                        transition-duration: 0s;
                        background-color: #DF6C82;
                    }
                }

                &-accent {
                    color: #ffffff;
                    background-color: $color--positive;

                    &:hover {
                        background-color: #BF65A8;
                    }
                    &:active {
                        transition-duration: 0s;
                        background-color: #AB5096;
                    }
                }
            }

            &--disabled {
                background-color: #F4F4F4;
                color: #8E959C;
                pointer-events: none;
            }

            &--loading {
                /*opacity: 0.7;*/
                pointer-events: none;

                .ui-btn__item-value {
                    opacity: 0;
                }
            }

            &__value {
                pointer-events: none;
            }

            &-loading {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                span {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid transparent;
                    border-top-color: currentColor;
                    border-bottom-color: currentColor;
                    border-radius: 50%;
                    animation: spin 1.5s linear infinite;
                    pointer-events: none;

                    &:before {
                        width: 2px;
                        height: 2px;
                        border-color: #ffffff;
                        content: '';
                        display: block;
                        border-radius: 50%;
                        animation: pulse 1s alternate ease-in-out infinite;
                    }
                }
            }

        }
        &--styles {
            transition-duration: 0.3s;
            &:hover {
                opacity: 0.8 !important;
            }
            &:active {
                opacity: 0.6 !important;
            }
        }

        &__confirm {
            position: absolute;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;
            min-width: 150px;
            padding: $gutter / 2;
            font-size: 14px;
            color: $color--text-invert;
            border-radius: 5px;
            background-color: lighten($color--primary, 10%);


            &-text {
                width: 100%;
                margin-bottom: 10px;
                text-align: center;
                font-size: 12px;
            }

            &-btn {
                box-sizing: border-box;
                width: 45%;
                padding: 5px;
                border-radius: 5px;
                background-color: $color--primary;
                cursor: pointer;
                user-select: none;
                transition: background-color 0.3s ease;
                text-align: center;
                font-size: 12px;

                &:hover {
                    background-color: darken($color--primary, 15%);
                }

                &:active {
                    opacity: 0.6;
                }
            }

            &:before {
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: lighten($color--primary, 10%);
            }
        }

        &--size {
            &-large {
                width: 100%;
                min-width: 100px;
                height: 33px;
                font-size: 14px;

                .ui-btn__item {
                    padding: 0;
                }

                .ui-btn__item-loading {
                    width: 20px;
                    height: 20px;
                    border-width: 3px;

                    &:before {
                        width: 4px;
                        height: 4px;
                        border: 3px solid currentColor;
                    }
                }
            }

            &-medium {
                width: auto;
                min-width: 75px;
                min-height: 33px;

                .ui-btn__item {
                    padding: 5px 12px;
                }

                .ui-btn__item-loading {
                    span {
                        width: 20px;
                        height: 20px;
                        border-width: 1px;

                        &:before {
                            width: 4px;
                            height: 4px;
                            border: 1px solid currentColor;
                        }
                    }
                }
            }

            &-small {
                min-width: 60px;
                min-height: 33px;
                font-size: 10px;

                .ui-btn__item {
                    padding: 5px $gutter / 3;
                }

                .ui-btn__item-loading {
                    width: 12px;
                    height: 12px;
                    border-width: 2px;

                    &:before {
                        width: 2px;
                        height: 2px;
                        border: 2px solid currentColor;
                    }
                }
            }
            &-mini {
                min-width: 60px;
                min-height: 25px;
                font-size: 12px;

                .ui-btn__item {
                    padding: 5px $gutter / 3;
                }
                .ui-btn__item-value {
                    font-size: 12px;
                }

                .ui-btn__item-loading {
                    width: 12px;
                    height: 12px;
                    border-width: 2px;

                    &:before {
                        width: 2px;
                        height: 2px;
                        border: 2px solid currentColor;
                    }
                }
            }

            &-mini {
            }
        }

        &--confirm {
            &-active {
                z-index: 3;
            }

            &-position-left {
                .ui-btn__confirm {
                    top: 50%;
                    right: calc(100% + 10px);
                    transform: translateY(-50%);

                    &:before {
                        top: 50%;
                        right: -5px;
                        transform: translateY(-50%) rotate(45deg);
                    }
                }
            }

            &-position-right {
                .ui-btn__confirm {
                    top: 50%;
                    left: calc(100% + 10px);
                    transform: translateY(-50%);

                    &:before {
                        top: 50%;
                        left: -5px;
                        transform: translateY(-50%) rotate(45deg);
                    }
                }
            }

            &-position-top {
                .ui-btn__confirm {
                    bottom: calc(100% + 10px);
                    left: 50%;
                    transform: translateX(-50%);

                    &:before {
                        bottom: -5px;
                        left: 50%;
                        transform: translateX(-50%) rotate(45deg);
                    }
                }
            }

            &-position-bottom {
                .ui-btn__confirm {
                    top: calc(100% + 10px);
                    left: 50%;
                    transform: translateX(-50%);

                    &:before {
                        top: -5px;
                        left: 50%;
                        transform: translateX(-50%) rotate(45deg);
                    }
                }
            }
        }
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes pulse {
        from {
            transform: scale(0.5);
        }
        to {
            transform: scale(1);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
