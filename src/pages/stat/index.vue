<template>
    <section class="page-stat">
        <SectionDownloadCsv
            :loading="isLoading"
            :statuses="modifiedStatuses"
            :operators="modifiedOperators"
            @submit="sendInfo"
        />
    </section>
</template>

<script>
import store from '@/store'
import {mapActions, mapMutations, mapState} from 'vuex'
import SectionDownloadCsv from '@/components/sections/downlaod-csv-form'
import {isRoleAdmin, isRoleOperator} from '@/utils/middleware'

export default {
    metaInfo() {
        return {
            title: `Статистика`
        }
    },
    components: {
        SectionDownloadCsv
    },
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        ...mapState('csv', ['statuses']),
        ...mapState('users', ['mainUserInfo', 'users']),
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
        isAdmin() {
            return isRoleAdmin()
        },
        isOperator() {
            return isRoleOperator()
        }
    },
    methods: {
        ...mapActions('csv', ['stDownloadCsw']),
        ...mapMutations('alerts', ['ADD_ALERT']),
        async sendInfo(payload) {
            this.isLoading = true
            let params = () => {
                if (this.isOperator) { return `?from=${payload.from}&to=${payload.to}&status=${payload.status}&user=${this.mainUserInfo.id}` }
                if (this.isAdmin) { return `?from=${payload.from}&to=${payload.to}&status=${payload.status}&user=${payload.user}` }
            }
            try {
                const res = await this.stDownloadCsw(params())
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
            if (isRoleOperator) {
                const response = await Promise.all([
                    store.dispatch('csv/stGetAllStatuses'),
                ])
                const isSuccess = response.every(item => item)
                next(isSuccess)
            }
            if (isRoleAdmin) {
                const response = await Promise.all([
                    store.dispatch('csv/stGetAllStatuses'),
                    store.dispatch('users/stGetUsers')
                ])
                const isSuccess = response.every(item => item)
                next(isSuccess)
            }
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
