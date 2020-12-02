<template>
    <div class="ui-stopwatch">
        <span class="ui-stopwatch__count">
            {{ time }}
        </span>
    </div>
</template>

<script>
import {convertSecondsToHMS} from '@/utils/convertDateTime'
export default {
    props: {
        startWatch: {
            type: Boolean,
            default: false
        },
        stopWatch: {
            type: Boolean,
            default: false
        },
        resetWatch: {
            type: Boolean,
            default: false
        },
        defaultValue: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            time: '00:00:00',
            saveTime: '00:00:00',
            interval: null,
        }
    },
    methods: {
        start() {
            if (this.running) return

            this.interval = setInterval(() => {
                if (this.defaultValue) {
                    const ms = Date.now() - Number(this.defaultValue) * 1000
                    const sec = Math.floor(ms / 1000)
                    const val = convertSecondsToHMS(sec)
                    this.time = val
                }
                else {
                    const ms = Date.now() - this.saveTime
                    const sec = Math.floor(ms / 1000)
                    const val = convertSecondsToHMS(sec)
                    this.time = val
                }
              }, 1000);
        },
    },
    watch: {
        startWatch: {
            immediate: true,
            handler(val) {
                if (val) {
                    // this.start()
                }
            }
        },
        resetWatch(val) {
            if (val) {
                this.reset()
            }
        },
        time(val) {
            this.$emit('get-time', val)
        }
    },
    mounted() {
        if (this.defaultValue) {
            const ms = Date.now() - Number(this.defaultValue) * 1000
            const sec = Math.floor(ms / 1000)
            const val = convertSecondsToHMS(sec)
            this.time = val
        }
        this.saveTime = Date.now()
        this.start()
    },
    beforeDestroy() {
        clearInterval(this.interval)
    }
}
</script>

<style lang="scss" scoped>
.ui-stopwatch {
    font-size: 20px;
    color: currentColor;

    &__count {
        display: inline-flex;
        color: #4e545b;
    }

    &__dot {
        width: 4px;
    }

    &__number {
        width: 14px;
    }
}
</style>
