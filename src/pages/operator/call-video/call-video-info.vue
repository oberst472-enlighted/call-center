<template>
    <div class="block-info">
        <h3 class="block-info__title">Продолжительность звонка</h3>

        <div class="block-info__time-box">
            <!--            <transition mode="out-in" name="fade">-->
            <div
                v-if="isCallAnswered && !isCallOver"
                key="time"
                class="block-info__stopwatch">
                <UiStopWatch
                    :start-watch="isCallAnswered"
                    :stop-watch="isCallOver"
                />
            </div>

            <div v-else
                 key="date"
                 class="block-info__date"
            >
                <span class="block-info__date-date">{{ dateToday }}</span>
                <span class="block-info__date-time">{{ startTime }}</span>
                <span class="block-info__date-sep">-</span>
                <span class="block-info__date-time">{{ stopTime }}</span>
            </div>
            <!--            </transition>-->
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {convertSecondsToTime} from '@/utils/convertDateTime'

export default {
    computed: {
        ...mapState('webrtc/webrtcCalls', ['isCallAnswered', 'isCallOver', 'startCallTime', 'stopCallTime']),
        dateToday() {
            return new Date().toLocaleDateString('ru-RU')
        },
        startTime() {
            return convertSecondsToTime(this.startCallTime, 'ms')
        },
        stopTime() {
            return convertSecondsToTime(this.stopCallTime, 'ms')
        }
    }
}
</script>

<style lang="scss" scoped>
.block-info {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    &__title {
        font-size: 11px;
        font-weight: $font-weight--light;
        text-transform: uppercase;
    }

    &__stopwatch {
        margin-top: 10px;
    }

    &__time-box {
        padding-top: 10px;
        text-align: center;
    }

    &__date {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 13px;

        &-sep {
            display: inline-flex;
            align-items: center;
            padding: 0 2px;
            font-size: 18px;
            line-height: 1;
        }

        &-date {
            width: 100%;
            font-size: 13px;
            line-height: 1;
        }

        &-time {
            margin-top: 2px;
            font-size: 18px;
            color: #4C3B60;
        }
    }

    &__tstopwatch {
        font-size: 18px;
    }
}
</style>
