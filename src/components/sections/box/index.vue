<template>
    <div :class="classes" class="section-box">
        <div class="section-box__content">
            <div v-if="head" class="section-box__head">
                <span v-if="title" class="section-box__title">{{ title }}</span>
                <span v-if="subtitle" class="section-box__subtitle">{{ subtitle }}</span>
            </div>
            <div class="section-box__body">
                <slot/>
            </div>
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
