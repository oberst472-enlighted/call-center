<template>
    <div class="page-detail-info">
        <SectionBox class="page-detail-info__box" content>
            <template #content>
                <div class="page-detail-info__content">
                    <h1 class="page-detail-info__title">Терминал #{{ title }}</h1>
                    <div class="page-detail-info__name-box">
                        <span class="page-detail-info__name-box-text-1">
                            {{ deviceName }}
                        </span>
                        <span class="page-detail-info__name-box-text-2">
                            {{ deviceLocation }}
                        </span>
                    </div>

                    <div class="page-detail-info__status-box">
                        <UiBadge :theme="detailTerminalInfo.online ? 'positive' : 'negative'">
                            {{ detailTerminalInfo.online ? 'Онлайн' : 'Оффлайн' }}
                        </UiBadge>
                    </div>
                </div>
            </template>
        </SectionBox>
    </div>
</template>

<script>
import store from '@/store'
import SectionBox from '@/components/sections/box'
import {mapMutations, mapState} from 'vuex'
export default {
    metaInfo() {
        return {
            title: `Информация о терминале`
        }
    },
    components: {
        SectionBox
    },
    computed: {
        ...mapState('devices', ['detailTerminalInfo']),
        title() {
            return this.detailTerminalInfo.id
        },
        deviceName() {
            return this.detailTerminalInfo?.title || 'Неизвестный терминал'
        },
        deviceLocation() {
            return this.detailTerminalInfo?.railway_station || 'Неизвестное расположение'
        },
    },
    methods: {
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapMutations(['TOGGLE_PROGRESS_ACTIVE']),
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE', true)
        const response = await Promise.all([
            store.dispatch('devices/stGetDetailTerminalInfoById', to.params.id),
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
           next()

        } else {
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
            this.ADD_ALERT(['negative'])
            next(false)
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


    &__title {
        margin-top: 0;
        font-size: 17px;
        font-weight: 400;
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


}
</style>
