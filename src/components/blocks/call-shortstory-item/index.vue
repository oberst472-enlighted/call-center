<template>
    <article class="block-call-shortstory">
        <span class="block-call-shortstory__date">
            {{ dateCall }}
            <span>{{ startTime }} - {{ endTime }}</span>
        </span>
        <span class="block-call-shortstory__conclusion"><UiBadge>Решено</UiBadge></span>
        <span class="block-call-shortstory__title">
            <span class="block-call-shortstory__title__title">Длинное Название / номер терминала</span>
            <span class="block-call-shortstory__title__title__subtitle">Железнодорожный вокзал с очень длинным названием</span>
        </span>
        <button class="block-call-shortstory__icon"><IconComment/></button>
    </article>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            default: () => {}
        },
    },
    computed: {
        dateCall() {
            return this.info['start_time'].split('T')[0].split('-').reverse().join('.')
        },
        startTime() {
            return this.info['start_time'].split('T')[1].split('.')[0]
        },
        endTime() {
            return this.info['end_time'] ?
                this.info['end_time'].split('T')[1].split('.')[0] :
                '?'
        }
    }
}
</script>

<style scoped lang="scss">
.block-call-shortstory {
    padding: 12px 0;
    display: grid;
    grid-template-columns: auto minmax(60px, 1fr);
    grid-gap: 5px;
    &__date {
        font-size: 11px;
        span {
            font-weight: $font-weight--bold;
        }
    }
    &__conclusion {
        margin-left: auto;
    }
    &__title {
        display: grid;
        grid-gap: 5px;
        &__title {
            font-size: 12px;
            font-weight: $font-weight--bold;
        }
        &__subtitle {
            font-size: 10px;}
    }
    &__icon {
        margin-left: auto;
        background-color: transparent;
        border: 0;
        outline: none;
    }
}
</style>
