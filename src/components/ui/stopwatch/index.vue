<template>
    <div class="ui-stopwatch">
        <span class="ui-stopwatch__count">
            <span class="ui-stopwatch__number">{{ time[0] }}</span>
            <span class="ui-stopwatch__number">{{ time[1] }}</span>

            <span class="ui-stopwatch__dot">{{ time[2] }}</span>

            <span class="ui-stopwatch__number">{{ time[3] }}</span>
            <span class="ui-stopwatch__number">{{ time[4] }}</span>

            <span class="ui-stopwatch__dot">{{ time[5] }}</span>

            <span class="ui-stopwatch__number">{{ time[6] }}</span>
            <span class="ui-stopwatch__number">{{ time[7] }}</span>
        </span>
    </div>
</template>

<script>
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
            default: ''
        }
    },
    data() {
        return {
            time: '00:00:00',
            timeBegan: null,
            timeStopped: null,
            stoppedDuration: 0,
            started: null,
            running: false
        }
    },
    methods: {
        start() {
            if (this.running) return

            if (this.timeBegan === null) {
                this.reset()
                this.timeBegan = new Date()
            }

            if (this.timeStopped !== null) {
                this.stoppedDuration += (new Date() - this.timeStopped)
            }

            this.started = setInterval(this.clockRunning, 1000)
            this.running = true
        },

        stop() {
            this.running = false
            this.timeStopped = new Date()
            clearInterval(this.started)
        },

        reset() {
            this.running = false
            clearInterval(this.started)
            this.stoppedDuration = 0
            this.timeBegan = null
            this.timeStopped = null
            this.time = '00:00:00'
        },

        clockRunning() {
            console.log(77)
            const currentTime = this.defaultValue
            const timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
            const hour = timeElapsed.getUTCHours()
            const min = timeElapsed.getUTCMinutes()
            const sec = timeElapsed.getUTCSeconds()

            this.time =
                this.zeroPrefix(hour, 2) + ':' +
                this.zeroPrefix(min, 2) + ':' +
                this.zeroPrefix(sec, 2)
        },

        zeroPrefix(num, digit) {
            let zero = ''
            for (let i = 0; i < digit; i++) {
                zero += '0'
            }
            return (zero + num).slice(-digit)
        }
    },
    watch: {
        startWatch: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.start()
                }
            }
        },
        stopWatch: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.stop()
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
        // console.log(this.defaultValue)
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
