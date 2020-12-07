<template>
    <section class="page-stat">
        <SectionDownloadCsv
            :loading="isLoading"
            :statuses="modifiedStatuses"
            @submit="sendInfo"
        />
    </section>
</template>

<script>
import store from '@/store'
import SectionDownloadCsv from '@/components/sections/downlaod-csv-form'
import {mapActions, mapMutations, mapState} from 'vuex'

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
    },
    methods: {
        ...mapActions('csv', ['stDownloadCsw']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        async sendInfo(payload) {
            this.isLoading = true
            try {
                const params = `?from=${payload.from}&to=${payload.to}&status=${payload.status}&user=${this.mainUserInfo.id}`
                const res = await this.stDownloadCsw(params)
                res ? window.open(res.data.file) : this.ADD_ALERT(['negative'])
            } catch (e) {
                console.error(e)
                this.ADD_ALERT(['negative'])
            } finally {
                this.isLoading = false
            }
        },
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

<style lang="scss" scoped>
.page-stat {
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding-bottom: 30px;

}
</style>
