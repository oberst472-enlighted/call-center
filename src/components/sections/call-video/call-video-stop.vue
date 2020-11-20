<template>
    <div class="block-stop">
        <div class="block-stop__text">
            <span>Звонок завершен</span>
            <span>{{ role }}</span>
        </div>
        <div class="block-stop__btn">
            Продолжить работу
        </div>
        <div class="block-stop__time">
            <UiStopWatch/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('socket', ['whoStoppedTheCall']),
        role() {
            return this.whoStoppedTheCall === 'user' ? 'Оператором' : ' Клиентом'
        }
    }
}
</script>

<style lang="scss" scoped>
.block-stop {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &__text {
        text-transform: uppercase;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        text-align: center;
        color: #ffffff;
    }
    &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 290px;
        height: 67px;
        margin-top: 45px;
        margin-bottom: 35px;
        font-size: 14px;
        line-height: 15px;
        color: #ffffff;
        font-weight: 700;
        border-radius: 34px;
        background-color: #f04265;
        cursor: pointer;
    }
    &__time {
        color: #ffffff;
    }
}
.section-call-video__stop {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-status {
        font-size: 18px;
        color: #ffffff;
        font-weight: 400;
    }

    &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 290px;
        height: 67px;
        margin-top: 45px;
        margin-bottom: 35px;
        font-size: 14px;
        line-height: 15px;
        color: #ffffff;
        font-weight: 700;
        border-radius: 34px;
        background-color: #f04265;
        cursor: pointer;
    }

    &-time {
        font-size: 20px;
        color: #ffffff;
        font-weight: 300;
    }
}
</style>
