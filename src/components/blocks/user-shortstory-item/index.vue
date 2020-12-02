<template>
    <article :is="tag" :class="{hide: info.role === 'administrator'}" :to="to" class="block-terminal-shortstory">
        <div class="block-terminal-shortstory__info">
            <div class="block-terminal-shortstory__id">Оператор #{{ info.id }}</div>
            <div class="block-terminal-shortstory__title">
                <div>{{ info.first_name ? info.first_name : 'Имя не задано' }}</div>
                <div>{{ info.last_name ? info.last_name : 'Фамилия не задана' }}</div>
            </div>
        </div>

        <div class="block-terminal-shortstory__icons">
            <UiBadge :theme="theme" class="block-terminal-shortstory__status">{{ status }}</UiBadge>
            <IconDots class="block-terminal-shortstory__icon"/>
        </div>
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
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 12px 0;
    color: $color--primary;
    text-decoration: none;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.5;
    }

    &__info {
        flex-shrink: 0;
    }

    &__icons {
        display: inline-flex;
        flex-direction: column;
        flex-shrink: 0;
        color: #f4f3f7;
    }

    &__status {
        flex-shrink: 0;
    }

    &__icon {
        display: inline-flex;
        width: 20px !important;
        height: 5px;
        margin-left: auto;
    }

    &__id {
    }

    &__title {
        width: 100%;
        margin-top: 5px;
        font-size: 12px;
        line-height: 1.2;
        color: #4C3B60;
        font-weight: 500;
    }
}
</style>
