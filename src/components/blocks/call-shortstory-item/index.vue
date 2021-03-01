<template>
    <component :is="tag" :to="to" class="block-call-shortstory" :class="{'block-call-shortstory--no-icon-message': noIconMessage}">
        <span class="block-call-shortstory__date">
            <span :class="{negative: statusTheme === 'negative'}">{{ dateCall ? dateCall : 'Дата звонка не известна' }}</span>
            <span :class="{negative: statusTheme === 'negative'}" v-if="startTime && stopTime">{{ startTime }} - {{ stopTime }}</span>
        </span>

        <span class="block-call-shortstory__conclusion">
            <UiBadge :theme="statusTheme" class="block-call-shortstory__status">{{ status }}</UiBadge>
        </span>

        <span class="block-call-shortstory__title">
            <span class="block-call-shortstory__title__title">{{ deviceName }}</span>
            <span class="block-call-shortstory__title__title__subtitle">{{ deviceLocation }}</span>
        </span>

        <button class="block-call-shortstory__icon">
            <IconComment/>
        </button>

        <div class="block-call-shortstory__operator-info" v-if="!noOperatorInfo">
            <div class="block-call-shortstory__operator-img">
                <img alt="Avatar" src="/assets/images/user-placeholder.svg">
            </div>

            <div class="block-call-shortstory__operator-name">
                <span class="block-call-shortstory__operator-name-name">Велизарий</span>
                <span class="block-call-shortstory__operator-name-last-name">Коул</span>
                <span class="block-call-shortstory__operator-id">оператор #332211</span>
            </div>
        </div>
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
        noIconMessage: {
            type: Boolean,
            default: false
        },
        noOperatorInfo: {
            type: Boolean,
            default: false
        },

    },
    computed: {
        tag() {
            return this.to ? 'router-link' : 'button'
        },
        dateCall() {
            return this.info['start_time'] ? convertSecondsToDate(this.info['start_time']) : ''
        },
        startTime() {
            return this.info['start_time'] ? convertSecondsToTime(this.info['start_time']) : ''
        },
        stopTime() {
            return this.info['stop_time'] ? convertSecondsToTime(this.info['stop_time']) : ''
        },
        status() {
            switch (this.info.status) {
                case 'success':
                    return 'Решен'
                case 'no_answer':
                    return 'Пропущен'
                default:
                    return 'Неизвестно'
            }
        },
        deviceName() {
            return this.info?.device_title || 'Неизвестный терминал'
        },
        deviceLocation() {
            return this.info?.railway_station || 'Неизвестное расположение'
        },
        // eslint-disable-next-line vue/return-in-computed-property
        statusTheme() {
            switch (this.info.status) {
                case 'success':
                    return 'positive'
                case 'no_answer':
                    return 'negative'
                default:
                    return 'success'
            }
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
    color: $color--primary;
    transition-duration: 0.3s;
    text-decoration: none;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.5;
    }

    &__date {
        font-size: 11px;

        span {
            margin-right: 3px;
            font-weight: $font-weight--medium;
        }
    }

    &__conclusion {
        flex-shrink: 0;
        margin-left: auto;
    }

    &__status {
        display: block;
    }

    &__title {
        display: grid;
        grid-gap: 5px;
        color: $color--text;
        text-align: left;

        &__title {
            font-size: 12px;
            font-weight: $font-weight--medium;
        }

        &__subtitle {
            font-size: 10px;
        }
    }

    &__icon {
        margin-top: 5px;
        margin-left: auto;
        border: 0;
        outline: none;
        background-color: transparent;
    }

    &__operator-info {
        display: flex;
        align-items: center;
        margin-top: 15px;
    }

    &__operator-img {
        margin-right: 10px;
        display: inline-flex;
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__operator-name {
        flex-shrink: 0;
    }

    &__operator-name-name {
        font-weight: 500;
        font-size: 10px;
        margin-right: 5px;
    }

    &__operator-name-last-name {
        font-weight: 500;
        font-size: 10px;
    }

    &__operator-id {
        margin-top: 5px;
        display: block;
        font-size: 10px;
    }
    &--no-icon-message {
        .block-call-shortstory__icon {
            opacity: 0;
            pointer-events: none;
        }
    }
}
</style>
