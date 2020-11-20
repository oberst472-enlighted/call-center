<template>
    <div class="ui-stopwatch">00:12:34</div>
</template>

<script>
export default {
    computed: {
        formatTime() {
            let pad = function (num, size) {
                return ('000' + num).slice(size * -1)
            }
            let time = parseFloat(this.getCallTime).toFixed(3)
            let hours = Math.floor(time / 60 / 60)
            let minutes = Math.floor(time / 60) % 60
            let seconds = Math.floor(time - minutes * 60)
            return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
        },
    }
}
</script>

<style lang="scss" scoped>
.ui-stopwatch {
    font-size: 20px;
    color: currentColor;
}
</style>
