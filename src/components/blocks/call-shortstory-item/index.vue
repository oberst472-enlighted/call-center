<template>
    <component :is="tag" :to="to" class="block-call-shortstory">
        <span class="block-call-shortstory__date">
            {{ dateCall }}
            <span>{{ startTime }} - {{ stopTime }}</span>
        </span>
        <span class="block-call-shortstory__conclusion"><UiBadge>Решено</UiBadge></span>
        <span class="block-call-shortstory__title">
            <span class="block-call-shortstory__title__title">Терминал N-13</span>
            <span class="block-call-shortstory__title__title__subtitle">Балтийский вокзал</span>
        </span>
        <button class="block-call-shortstory__icon">
            <IconComment/>
        </button>
    </component>
</template>

<script>
import {convertSecondsToDate, convertSecondsToTime} from '@/utils/convertDateTime'

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
        dateCall() {
            return this.info['start_time'] ? convertSecondsToDate(this.info['start_time']) : '???'
        },
        startTime() {
            return this.info['start_time'] ? convertSecondsToTime(this.info['start_time']) : '???'
        },
        stopTime() {
            return this.info['stop_time'] ? convertSecondsToTime(this.info['stop_time']) : '???'
        }
    }
}
</script>

<style lang="scss" scoped>
.block-call-shortstory {
    display: grid;
    grid-template-columns: auto minmax(60px, 1fr);
    grid-gap: 5px;
    padding: 12px 0;
    text-decoration: none;
    color: $color--primary;
    transition-duration: 0.3s;
    &:hover {
        opacity: 0.7;
    }
    &:active {
        opacity: 0.5;
    }

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
        text-align: left;

        &__title {
            font-size: 12px;
            font-weight: $font-weight--bold;
        }

        &__subtitle {
            font-size: 10px;
        }
    }

    &__icon {
        margin-left: auto;
        border: 0;
        outline: none;
        background-color: transparent;
    }
}
</style>
