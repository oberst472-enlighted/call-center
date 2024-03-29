<template>
    <div class="page-detail-info">
        <SectionBox class="page-detail-info__box" content>
            <template #content>
                <div class="page-detail-info__content">
                    <h1 class="page-detail-info__title">Звонок {{ title }}</h1>

                    <div class="page-detail-info__date-box">
                        <span class="page-detail-info__date">{{ date }}</span>
                        <span class="page-detail-info__time">{{ startTime }}</span>
                        <span>-</span>
                        <span class="page-detail-info__time">{{ stopTime }}</span>
                    </div>

                    <div class="page-detail-info__name-box">
                        <span class="page-detail-info__name-box-text-1">
                            {{ deviceLocation }}
                        </span>
                        <span class="page-detail-info__name-box-text-2">
                            {{ deviceName }}
                        </span>
                    </div>

                    <div class="page-detail-info__status-box">
                        <UiBadge>Решено</UiBadge>
                    </div>

                    <div class="page-detail-info__comment-box" v-if="comment">
                        <span class="page-detail-info__comment-title">Комментарий оператора</span>
                        <span class="page-detail-info__comment-name">
                            оператор # 0012 <br>Елена Авантюрова
                        </span>
                        <p class="page-detail-info__comment-text">
                            {{ comment }}
                        </p>
                    </div>
                </div>
                <div class="page-detail-info__video">
                    <div class="page-detail-info__video__box video-radius-fix">
                        <video v-if="video" class="page-detail-info__video__video" controls preload :src="video"></video>
                        <div class="page-detail-info__video__text" v-else>Видео <br>отсутствует</div>
                    </div>
                </div>
            </template>
        </SectionBox>
    </div>
</template>

<script>
import store from '@/store'
import SectionBox from '@/components/sections/box'
import {mapState} from 'vuex'
import {convertSecondsToDate, convertSecondsToTime} from '@/utils/convertDateTime'
export default {
    components: {
        SectionBox
    },
    computed: {
        ...mapState('calls', ['detailInfo']),
        title() {
            return this.detailInfo.id
        },
        deviceName() {
            return this.detailInfo?.device_title || 'Неизвестный терминал'
        },
        deviceLocation() {
            return this.detailInfo?.railway_station || 'Неизвестное расположение'
        },
        date() {
            return convertSecondsToDate(this.detailInfo.create_time)
        },
        startTime() {
            return convertSecondsToTime(this.detailInfo.start_time)
        },
        stopTime() {
            return convertSecondsToTime(this.detailInfo.stop_time)
        },
        comment() {
            return this.detailInfo.comment
        },
        video() {
            return this.detailInfo.video_file
        },
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        const id = to.params.id ? to.params.id : from.params.id
        const response = await Promise.all([
            store.dispatch('calls/stGetDetailCallInfo', id),
        ])

        const isSuccess = response.every(item => item)
        if (isSuccess) {
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
            next()
        } else {
            next(false)
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
            store.commit('alerts/ADD_ALERT', ['negative'])
        }
    },
}
</script>

<style lang="scss" scoped>
.page-detail-info {
    width: 100%;
    padding-bottom: 30px;

    &__box {
        display: grid;
        grid-template-columns: 1fr 400px;
        grid-gap: 40px;
        padding: 30px;
    }

    &__content {
    }

    &__video {
        &__box {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56%;
            border-radius: 9px;
            background-color: #000000;
            overflow: hidden;

            video {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                outline: none;
                object-fit: contain;
            }

        }
        &__text {
            font-size: 14px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-transform: uppercase;
            text-align: center;
        }
    }

    &__title {
        margin-top: 0;
        font-size: 17px;
        font-weight: 400;
    }

    &__date-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        font-size: 14px;
        color: #06579a;
    }

    &__date {
        width: 100%;
    }

    &__name-box {
        &-text-1 {
            display: block;
            margin-top: 15px;
            font-size: 17px;
            font-weight: 700;
        }

        &-text-2 {
            display: block;
            font-size: 15px;
        }
    }

    &__status-box {
        margin-top: 20px;
    }

    &__comment-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 30px;
    }

    &__comment-title {
        font-size: 11px;
        color: #685C7B;
        font-weight: 300;
        text-transform: uppercase;
    }

    &__comment-name {
        max-width: 200px;
        font-size: 12px;
        font-weight: 700;
        text-align: right;
    }

    &__comment-text {
        margin-top: 15px;
        padding: 20px;
        font-size: 12px;
        line-height: 1.2;
        border-radius: 8px;
        background-color: #F1EEF5;
        overflow: hidden;
    }
}
</style>
