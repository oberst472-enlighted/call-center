<template>
    <section class="page-profile">
        <SectionBox :is-not-pagination="true" content>
            <template #content>
                <div class="page-profile__content">
                    <div class="page-profile__info">
                        <div class="page-profile__title">Оператор #{{ userInfo.id }}</div>
                        <div class="page-profile__img">
                            <img src="/assets/images/user-placeholder.svg" alt="">
                        </div>
                        <div class="page-profile__cont">
                            <UiBadge theme="positive" class="page-profile__status">Свободен</UiBadge>
                            <div class="page-profile__name">{{ userInfo.first_name }}</div>
                            <div class="page-profile__lastname">{{ userInfo.last_name }}</div>
                            <div class="page-profile__text page-profile__lang">Русский</div>
                            <div class="page-profile__text">{{ userInfo.email }}</div>
                            <div class="page-profile__text">{{ userInfo.phone }}</div>
                        </div>
                    </div>
                    <div class="page-profile__btns">
                        <UiBtn :to="{name: 'edit-info-operator_admin', params: {id: userInfo.id}}" class="page-profile__btn" theme="primary">Изменить</UiBtn>
                        <UiBtn class="page-profile__btn" theme="negative" @click="blockUser" :loading="isLoading">Блокировать оператора</UiBtn>
                    </div>
                    <div class="page-profile__calls">
                        <SectionBox
                            scroll
                            head
                            gutters
                            title="История звонков"
                            :subtitle="title"
                            :is-not-pagination="true"
                        >
                            <BlockCallShortstoryItem
                                class="page-home__calls-history__item"
                                v-for="item in allCallsUserById"
                                :key="item.id"
                                :info="item"
                                no-operator-info
                                :to="{name: 'detail-call_admin', params: {id: item.id}}"
                            />
                        </SectionBox>
                    </div>
                </div>
            </template>
        </SectionBox>
    </section>
</template>

<script>
import store from '@/store'
import {mapState, mapActions, mapMutations} from 'vuex'
import SectionBox from '@/components/sections/box'
import BlockCallShortstoryItem from '@/components/blocks/call-shortstory-item'
// import BlockFile from '@/components/blocks/file'

export default {
    components: {
        SectionBox,
        BlockCallShortstoryItem
        // BlockFile
    },
    data() {
        return {
            isLoading: false,
            isSuccess: false

        }
    },
    computed: {
        ...mapState('users', ['userInfo']),
        ...mapState('calls', ['allCallsUserById']),
        title() {
            return `Оператор #${this.userInfo.id}`
        }
    },
    methods: {
        ...mapMutations('alerts', ['ADD_ALERT']),
        ...mapActions('users', ['stBlockUser']),
        async blockUser() {
            this.isLoading = true
            try {
                const isSuccess = await this.stBlockUser(this.$route.params.id)
                if (isSuccess) {
                    this.ADD_ALERT(['positive', 'Оператор заблокирован'])
                    this.$router.push({name: 'users_admin'})
                }
                else {
                    this.ADD_ALERT(['negative', 'Оператор не заблокирован. Перезагрузите страницу и попробуйте повторить операцию'])
                }
            } catch (e) {
                console.log(e)
                this.ADD_ALERT(['negative', 'Оператор не заблокирован. Перезагрузите страницу и попробуйте повторить операцию'])
            } finally {
                this.isLoading = false
            }
        }
    },
    async beforeRouteEnter(to, from, next) {
        store.commit('TOGGLE_PROGRESS_ACTIVE')

        const id = to.params.id ? to.params.id : from.params.id
        const response = await Promise.all([
            store.dispatch('users/stGetUserById', id),
            store.dispatch('calls/stGetAllCallsByUserId', id),
        ])
        const isSuccess = response.every(item => item)
        if (isSuccess) {
            next()
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
        } else {
            next(false)
            store.commit('TOGGLE_PROGRESS_ACTIVE', false)
            store.commit('alerts/ADD_ALERT', ['negative'])
            // store.dispatch('messages/message', ['negative', 'Некоторые данные необходимые для отображения страницы не были получены. Перезагрузите страницу и попробуйте еще раз'])
        }
        // store.dispatch('toggleLoading', false)
    },
    created() {

    },

}
</script>

<style lang="scss" scoped>
.page-profile {
    display: flex;
    width: 100%;
    padding-bottom: 30px;
    height: calc(100vh - 84px);

    &__content {
        display: grid;
        grid-template-columns: 1fr 260px;
        grid-gap: 20px;
        width: 100%;
        //padding: 30px;
        height: 100%;
        grid-auto-rows: minmax(60px, auto);
        grid-template-areas:
        'info calls'
        'btns calls'
    }
    &__info {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        padding-left: 30px;
        padding-top: 30px;
    }
    &__title {
        color: #685c7b;
        font-size: 17px;
        font-weight: 500;
        display: flex;
        width: 100%;
        margin-bottom: 30px;
    }
    &__status {
        display: block;
        margin-bottom: 20px;
        width: 100%;
    }
    &__img {
        width: 110px;
        height: 110px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 10px;
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    &__cont {}
    &__name {
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
    }
    &__lastname {
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
    }
    &__lang {
        margin-bottom: 20px;
    }
    &__text {
        color: #4c3b60;
        font-size: 15px;
        font-weight: 400;
    }
    &__btns{
        margin-top: auto;
        grid-area: btns;
        padding-left: 30px;
        padding-bottom: 30px;
    }
    &__btn {
        margin-right: 20px;
    }
    &__calls {
        grid-area: calls;
        border-left: 1px solid #efeff4;
        .section-box {
            box-shadow: none;
        }
        /deep/ .page-home__calls-history__item {
            border-top: 1px solid #efeff4;
        }
    }
}
</style>
