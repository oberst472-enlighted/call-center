<template>
    <div :class="classes" class="section-box">
        <div class="section-box__content" :class="`section-box__content-${id}`">
            <div v-if="head" class="section-box__head">
                <span v-if="title" class="section-box__title">{{ title }}</span>
                <span v-if="subtitle" class="section-box__subtitle">{{ subtitle }}</span>
            </div>

            <div class="section-box__body">
                <slot/>
            </div>

            <UiBtn
                class="section-items__btn"
                v-if="false"
                @click="downloadNextPage"
                :loading="isLoading"
            >
                Загрузить еще
            </UiBtn>

            <UiPreloader
                class="section-box__preloader"
                v-show="!isNotPagination && itemsLength > 11"
                :class="`section-box-${id}`"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
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
        this.id = `ref-${(~~(Math.random()*1e8)).toString(16)}`;
    },
    mounted() {
        const scrollEl = document.querySelector(`.section-box__content-${this.id}`)
        const el = document.querySelector(`.section-box-${this.id}`)
        scrollEl.addEventListener('scroll', () => {
            this.visible(el);
        });

        this.visible(el);
    }
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
        top: 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-height: 65px;
        padding: 15px;
        background-color: #ffffff;
    }

    &__title {
        font-size: 17px;
        color: #685c7b;
        font-weight: 500;
    }

    &__subtitle {
        font-size: 14px;
        font-weight: 400;
    }

    &__body {
        //height: 100%;
        flex-grow: 1;
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    &__content {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    &__preloader {
        margin: 0 auto;
        bottom: 15px;
    }

    &--gutters {
        .section-box__body {
            padding: $gutter / 2;
        }
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
</style>
