<template>
    <div :class="classes" class="section-box">
        <div v-if="!content" :class="`section-box__content-${id}`" class="section-box__content">
            <div v-if="head" class="section-box__head">
                <div class="section-box__head-text">
                    <span v-if="title" class="section-box__title">{{ title }}</span>
                    <span v-if="subtitle" class="section-box__subtitle">{{ subtitle }}</span>
                </div>
                <div class="section-box__head-btn">
                    <slot name="head-btn"/>
                </div>
            </div>

            <div class="section-box__body">
                <slot/>
                <div v-if="isNotContent" class="section-box__not-content-text">{{ notContentText }}</div>
            </div>

            <UiBtn
                v-if="false"
                :loading="isLoading"
                class="section-items__btn"
                @click="downloadNextPage"
            >
                Загрузить еще
            </UiBtn>

            <UiPreloader
                v-show="!isNotPagination && itemsLength > 35"
                :class="`section-box-${id}`"
                class="section-box__preloader"
            />
        </div>
        <template v-else>
            <slot name="content"/>
            <div v-if="isNotContent" class="section-box__not-content-text">{{ notContentText }}</div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        isNotContent: {
            type: Boolean,
            default: false
        },
        notContentText: {
            type: String,
            default: ''
        },
        content: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        },
        head: {
            type: Boolean,
            default: false
        },
        gutters: {
            type: Boolean,
            default: false
        },
        scroll: {
            type: Boolean,
            default: false
        },
        isNotPagination: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        itemsLength: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            id: '',
            isOnce: false,
        }
    },
    computed: {
        classes() {
            return [
                {
                    'section-box--gutters': this.gutters,
                    'section-box--content-gutters': this.gutters && this.content,
                    'section-box--scroll': this.scroll,
                    'section-box--head': this.head
                }
            ]
        }
    },
    methods: {
        downloadNextPage() {
            if (!this.isNotPagination) {
                this.$emit('download-next-page')
                this.isOnce = true
            }
        },
        visible(target) {
            const targetPosition = {
                    top: window.pageYOffset + target.getBoundingClientRect().top,
                    bottom: window.pageYOffset + target.getBoundingClientRect().bottom
                },
                windowPosition = {
                    top: window.pageYOffset,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                }

            if (targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom) {
                if (!this.isOnce) {
                    this.downloadNextPage()
                    this.isOnce = true
                }
            } else {
                if (this.isOnce) {
                    this.isOnce = false
                }
            }
        }
    },
    created() {
        // eslint-disable-next-line no-bitwise
        this.id = `ref-${(~~(Math.random() * 1e8)).toString(16)}`
    },

}
</script>

<style lang="scss" scoped>
.section-box {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    overflow: hidden;

    &__head {
        position: sticky;
        z-index: 2;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 65px;
        padding: 15px;
        background-color: #ffffff;

        &-text {
            display: flex;
            flex-direction: column;
        }

        &-btn {
            margin-left: 20px;

            /deep/ .ui-btn__item {
                color: $color--primary;
                background-color: #f4f3f7 !important;

                &:hover {
                    color: white !important;
                    background-color: darken(#f4f3f7, 20%) !important;
                }

                &:active {
                    opacity: 0.7;
                }
            }
        }
    }

    &__title {
        font-size: 17px;
        color: $color--subtitle;
        font-weight: 500;
    }

    &__subtitle {
        font-size: 14px;
        font-weight: 400;
    }

    &__body {
        //height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
    }

    &__content {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
    }

    &__preloader {
        bottom: 15px;
        margin: 0 auto;
    }

    &--gutters {
        .section-box__body {
            padding: $gutter / 2;
        }

    }

    &--content-gutters {
        padding: $gutter / 2;
    }

    &--scroll {
        .section-box__content {
            overflow: auto;
        }
    }

    &--head {
        .section-box__body {
            padding-top: 0;
        }
    }
}

.section-box__not-content-text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 12px;
    color: $color--primary;
    font-weight: 500;
    transform: translate(-50%, -50%);

}
</style>
