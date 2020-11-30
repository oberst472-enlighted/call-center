<template>
    <div
        class="time"
    >
        <!--        {{ formatTime }}-->
        00:00:00
    </div>
</template>

<script>
export default {
    computed: {
        formatTime() {
            let pad = function(num, size) {
                return ('000' + num).slice(size * -1)
            }
            let time = parseFloat(this.$store.state.totalTime).toFixed(3)
            let hours = Math.floor(time / 60 / 60)
            let minutes = Math.floor(time / 60) % 60
            let seconds = Math.floor(time - minutes * 60)
            return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
        },
    }
}
</script>

<style scoped lang="scss">
.time {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    font-size: 20px;
    color: #4c3b60;
    font-weight: 400;
    text-align: center;
}
</style>
