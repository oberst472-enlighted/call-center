<template>
    <article class="block-terminal-shortstory">
        <UiBadge :theme="theme">{{ status }}</UiBadge>
        <span class="block-terminal-shortstory__title">
            {{ info.title }}
        </span>
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
    },
    computed: {
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
.block-terminal-shortstory {
    padding: 12px 0;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
   &__title {
       margin-top: 5px;
       color: #4e545b;
       font-size: 12px;
       line-height: 1.2;
   }
}
</style>
