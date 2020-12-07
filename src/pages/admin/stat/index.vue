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
import {mapState, mapActions, mapMutations} from 'vuex'
import SectionDownloadCsv from '@/components/sections/downlaod-csv-form'
export default {
    components: {
        SectionDownloadCsv,
    },
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        ...mapState('csv', ['statuses']),
        ...mapState('users', ['users']),
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
            const arr = [
                {title: 'Все операторы', code: 'all', id: '1'}
            ]
            this.users.forEach(item => {
                arr.push({title: `${item.first_name} ${item.last_name}`, code: item.id, id: item.id})
            })
            return arr
        },
    },
    methods: {
        ...mapActions('csv', ['stDownloadCsw']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        async sendInfo(payload) {
            this.isLoading = true
            try {
                const params = `?from=${payload.from}&to=${payload.to}&status=${payload.status}&user=${payload.user}`
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
                store.dispatch('users/stGetUsers')
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

}
</style>
