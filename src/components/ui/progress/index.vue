<template>
    <div class="ui-progress" :class="{'ui-progress--active': isProgressActive}">
        <div class="ui-progress__box">
            <div ref="progress" class="progress-bar progress-bar-striped" role="progressbar" style="width: 0"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isProgressActive: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            current_progress: 0,
            step: 0.2,
            interval: null
        }
    },
    methods: {
        start(){
            this.reset()
            this.interval = setInterval(() => {
                this.current_progress += this.step;
                this.progress = Math.round(Math.atan(this.current_progress) / (Math.PI / 2) * 100 * 1000) / 1000
                this.$refs.progress.style.width = `${this.progress}%`
                if (this.progress >= 100){
                    clearInterval(this.interval);
                } else if (this.progress >= 70) {
                    this.step = 0.1
                }
            }, 100);
        },
        stop(){
            this.$refs.progress.style.width = `100%`
            clearInterval(this.interval);
        },
        reset() {
            this.$refs.progress.style.width = `0%`
            clearInterval(this.interval);
        }
    },
    mounted() {
        setTimeout(() => {
            this.start()
          }, 300);
    },
    beforeDestroy() {
        this.reset()
    }
}

</script>

<style scoped lang="scss">
.ui-progress {
    //opacity: 0;
    &--active {
        opacity: 1;
    }
}
.progress-bar {
    height: 3px;
    background-color: $color--positive;
}
</style>
