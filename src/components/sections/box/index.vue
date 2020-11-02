<template>
    <div class="section-box" :class="classes">
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
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
                    'section-box--scroll': this.scroll
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.section-box {
    background-color: #fff;
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    box-sizing: border-box;
    &--gutters {
        padding: $gutter / 2;
    }
    &--scroll {
        overflow: auto;
    }
}
</style>
