<template>
    <div class="page-detail-info">
        <SectionBox class="page-detail-info__box" content>
            <template #content>
                <div class="page-detail-info__content">
                    <h1 class="page-detail-info__title">Звонок #0201</h1>

                    <div class="page-detail-info__date-box">
                        <span class="page-detail-info__date">10:32:12</span>
                        <span class="page-detail-info__time">10:33:31</span>
                        <span>-</span>
                        <span class="page-detail-info__time">10:33:31</span>
                    </div>

                    <div class="page-detail-info__name-box">
                        <span class="page-detail-info__name-box-text-1">
                            Казанский Вокзал терминал #3462
                        </span>
                        <span class="page-detail-info__name-box-text-2">
                            зал ожидания
                        </span>
                    </div>

                    <div class="page-detail-info__status-box">
                        <UiBadge>Решено</UiBadge>
                    </div>

                    <div class="page-detail-info__comment-box">
                        <span class="page-detail-info__comment-title">Комментарий оператора</span>
                        <span class="page-detail-info__comment-name">
                            оператор # 0012 <br>Елена Авантюрова
                        </span>
                        <p class="page-detail-info__comment-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Accusantium commodi cumque deleniti deserunt
                            dicta doloribus enim eveniet ipsa libero molestias nam
                            obcaecati, quae ratione similique, suscipit totam ut
                            veniam, voluptatum.
                        </p>
                    </div>
                </div>
                <div class="page-detail-info__video">
                    <div class="page-detail-info__video__box">
                        <video class="page-detail-info__video__video" controls preload src="https://vc-dev.enlighted.ru/media/long_kKd3Kh5.webm"></video>
                    </div>
                </div>
            </template>
        </SectionBox>
    </div>
</template>

<script>
import SectionBox from '@/components/sections/box'

export default {
    components: {
        SectionBox
    },
    // async beforeRouteEnter(to, from, next) {
    //     // store.dispatch('toggleLoading')
    //     const response = await Promise.all([
    //         store.dispatch('calls/stGetCallsPerWorkShift'),
    //         // store.dispatch('tasks/stGetTasksTypes'),
    //         // store.dispatch('users/stAllUsers', ['contractor'])
    //     ])
    //     const isSuccess = response.every(item => item)
    //     if (isSuccess) {
    //        next()
    //
    //     } else {
    //         next(false)
    //         // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
    //     }
    //     // store.dispatch('toggleLoading', false)
    // },
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
            background-color: $color--primary;
            overflow: hidden;

            video {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                outline: none;
                object-fit: cover;
            }
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
        color: #65528B;
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
