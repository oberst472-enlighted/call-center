<template>
    <div class="block-info">
        <h3 class="block-info__title">Продолжительность звонка</h3>

        <div v-if="false" class="block-info__stopwatch">
            <UiStopWatch/>
        </div>

        <div v-else class="block-info__time-box">
            <div class="block-info__date">21.11.2020</div>
            <div class="block-info__time">
                10:32:12 - 10:33:31
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.block-info {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

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
        font-size: 13px;
    }

    &__time {
        font-size: 18px;
    }
}
</style>
