<template>
    <article :is="tag" :to="to" class="block-terminal-shortstory" :class="{hide: info.role === 'administrator'}">
        <div class="block-terminal-shortstory__title">
            <div>{{ info.first_name ? info.first_name : 'Имя не задано' }}</div>
            <div>{{ info.last_name ? info.last_name : 'Фамилия не задана' }}</div>
        </div>
        <UiBadge :theme="theme">{{ status }}</UiBadge>
    </article>
</template>

<script>

export default {
    props: {
        info: {
            type: Object,
            default: () => {
            }
        },
        to: {
            type: Object,
            default: null
        },
    },
    computed: {
        tag() {
            return this.to ? 'router-link' : 'button'
        },
        status() {
            return this.info.online ? 'Онлайн' : 'Оффлайн'
        },
        theme() {
            return this.info.online ? 'positive' : 'negative'
        }
    }
}
</script>

<style lang="scss" scoped>
.hide {
    display: none !important;
}
.block-terminal-shortstory {
    padding: 12px 0;
    display: inline-flex;
    text-decoration: none;
    color: $color--primary;
    align-items: flex-start;
    justify-content: space-between;
    &:hover {
        opacity: 0.7;
    }
    &:active {
        opacity: 0.5;
    }
   &__title {
       margin-top: 5px;
       color: #4e545b;
       font-size: 12px;
       line-height: 1.2;
   }
}
</style>
