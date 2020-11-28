<template>
    <div class="block-stop">
        <div class="block-stop__text">
            <span>Звонок завершен</span>
            <span>{{ role }}</span>
        </div>
        <div class="block-stop__btn" @click="$emit('click')">
            Продолжить работу
        </div>
        <div class="block-stop__time">
            {{ time }}
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {convertSecondsToHMS} from '@/utils/convertDateTime'

export default {
    computed: {
        ...mapState('webrtc/webrtcCalls', ['whoStoppedTheCall', 'allCallTime']),
        role() {
            return this.whoStoppedTheCall === 'user' ? 'Оператором' : ' Клиентом'
        },
        time() {
            return convertSecondsToHMS(Math.round(this.allCallTime / 1000))
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
        display: flex;
        flex-direction: column;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        text-transform: uppercase;
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
        background-color: $color--negative;
        cursor: pointer;
        user-select: none;
        transition-duration: 0.3s;
        transition-property: transform;

        &:hover {
            transform: scale(0.95);
        }

        &:active {
            background-color: darken($color--negative, 10%);
        }
    }

    &__time {
        font-size: 20px;
        line-height: 1;
        color: #ffffff;
        font-weight: $font-weight--light;
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
