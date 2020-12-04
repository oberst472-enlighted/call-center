<template>
    <div class="block-stop">
        <div class="block-stop__progress" v-if="Number(progressDownloadVideo)">
            <p class="block-stop__progress-title">Идет сохранение видео! <br> Не перезагружайте страницу!</p>
            <span class="block-stop__progress-count">{{ progressDownloadVideo }} %</span>
        </div>

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
import {mapState, mapMutations} from 'vuex'
import {convertSecondsToHMS} from '@/utils/convertDateTime'

export default {
    computed: {
        ...mapState('webrtc/webrtcCalls', ['whoStoppedTheCall', 'allCallTime', 'progressDownloadVideo']),
        role() {
            return this.whoStoppedTheCall === 'user' ? 'Оператором' : ' Клиентом'
        },
        time() {
            return convertSecondsToHMS(Math.round(this.allCallTime / 1000))
        }
    },
    methods: {
        ...mapMutations('webrtc/webrtcCalls', ['SET_IS_PROGRESS_DOWNLOAD_VIDEO'])
    },
    watch: {
        progressDownloadVideo: {
            immediate: true,
            handler(val) {
                if (Number(val === 100)) {
                    this.SET_IS_PROGRESS_DOWNLOAD_VIDEO(0)
                }
            }
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
    &__progress {
        position: absolute;
        top: 0;
        left: calc(50%);
        transform: translateX(-50%);
        background-color: rgba(#fff, 0.1);
        padding: 30px;
        color: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        text-transform: lowercase;
        text-align: center;
        &-title {
            font-size: 20px;
            color: rgba(#fff, 0.7)
        }
        &-count {
            font-size: 30px;
            margin-top: 15px;
            display: block;
            color: $color--positive
        }
    }

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
