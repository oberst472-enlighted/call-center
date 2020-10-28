<template>
    <component
        :is="tag"
        :class="{'ui-link--decoration': decoration}"
        :href="href"
        :target="href ? '_blank' : '_self'"
        :to="to"
        class="ui-link"
        @click="clicked"
    >
        <slot/>
    </component>
</template>

<script>
export default {
    props: {
        decoration: {
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
        }
    },
    computed: {
        tag() {
            if (this.href) {
                return 'a'
            } else if (this.to) {
                return 'router-link'
            } else {
                return 'span'
            }
        }
    },
    methods: {
        clicked() {
            if (this.tag !== 'a' || this.tag !== 'router-link') {
                this.$emit('click')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.ui-link {
    font-size: 13px;
    color: $color--primary;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    transition: color 0.3s ease;
    text-decoration: none;

    &:hover {
        color: $color--positive
    }

    &:active {
        opacity: 0.8;
    }

    &--decoration {
        text-decoration: underline;
    }
}
</style>
