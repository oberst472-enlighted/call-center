<template>
    <section class="page-stat">
        <SectionDownloadCsv
            :statuses="modifiedStatuses"
            :operators="modifiedOperators"
            :loading="isLoading"
            @submit="sendInfo"
        />
    </section>
</template>

<script>
import store from '@/store'
import SectionDownloadCsv from '@/components/sections/downlaod-csv-form'
import {mapState, mapActions} from 'vuex'
export default {
    components: {
        SectionDownloadCsv
    },
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        ...mapState('users', ['mainUserInfo']),
        ...mapState('csv', ['statuses']),
        modifiedStatuses() {
            const arr = [
                {title: 'Все статусы', code: 'all', id: '1'}
            ]
            for (let value in this.statuses) {
                arr.push({title: this.statuses[value], code: value, id: value})
            }
            return arr
        },
        modifiedOperators() {
            return [
                {title: 'Принято', code: '1', id: 'all'},
                {title: 'Не принято', code: '2', id: 'all'},
                {title: 'Закрыто', code: '3', id: 'all'},
            ]
            // const stats = [...this.statuses]
            // stats.unshift({title: 'Все статусы', code: '', id: 'all'})
            // return stats
        },
    },
    methods: {
        ...mapActions('csv', ['stDownloadCsw']),
        async sendInfo(payload) {
            this.isLoading = true

            const params = `?from=${payload.from}&to=${payload.to}&status=${payload.status}&user=${this.mainUserInfo.id}`
            const res = await this.stDownloadCsw(params)
            if (res) {
                this.isLoading = false
            }
            window.open(res.data.file)
        }
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')
        try {
            const response = await Promise.all([
                store.dispatch('csv/stGetAllStatuses'),
            ])
            const isSuccess = response.every(item => item)
            next(isSuccess)
        } catch (e) {
            console.log(e)
        } finally {
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        }
    },
}
</script>

<style scoped lang="scss">
.page-stat {
    padding-bottom: 30px;
    width: 100%;
    display: flex;
    align-items: flex-start;

}
</style>
