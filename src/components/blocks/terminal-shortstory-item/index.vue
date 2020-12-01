<template>
    <article :is="tag" :to="to" class="block-terminal-shortstory">
        <UiBadge :theme="theme">{{ status }}</UiBadge>
        <span class="block-terminal-shortstory__title">
            {{ title }}
        </span>
        <span class="block-terminal-shortstory__railway-station">
            {{ railWayStation }}
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
        },
        title() {
            return this.info.title ? this.info.title : 'Название терминала не задано'
        },
        railWayStation() {
            return this.info.railway_station ? this.info.railway_station : 'Местоположение не указано'
        }
    }
}
</script>

<style lang="scss" scoped>
.block-terminal-shortstory {
    padding: 12px 0;
    display: inline-flex;
    text-decoration: none;
    color: $color--primary;
    flex-direction: column;
    align-items: flex-start;
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
       font-weight: 500;
       margin-bottom: 5px;
   }
}
</style>
