<template>
    <div>user</div>
    <!--    <div>-->
    <!--        <div-->
    <!--            v-if="false"-->
    <!--            class="user"-->
    <!--        >-->
    <!--            <div class="user-info">-->
    <!--                <div class="user-name">{{ userData.user.firstName }} {{ userData.user.lastName }}</div>-->
    <!--                <div v-if="$store.state.userStatus === 'admin'" class="user-operator">администратор</div>-->
    <!--                <div v-else class="user-operator">оператор # <span>{{ userData.user.number }}</span></div>-->
    <!--            </div>-->
    <!--            <div class="user-avatar">-->
    <!--                <img-->
    <!--                    :src="userData.photo ? `https://calls-dev.enlighted.ru${userData.photo}` : require('@/assets/icons/User.svg')"-->
    <!--                    alt=""-->
    <!--                >-->
    <!--            </div>-->
    <!--        </div>-->

    <!--        <div-->
    <!--            :class="{active : $store.state.popup.popupActive === `user`}"-->
    <!--            class="popup"-->
    <!--        >-->
    <!--            <div class="popup-item" @click="logOut">Выйти</div>-->
    <!--            <template v-if="true">-->
    <!--                <div v-if="userData.user.userType === 'OPERATOR'" class="popup-item" @click="onEditProfileClick">-->
    <!--                    Редактировать-->
    <!--                </div>-->
    <!--            </template>-->
    <!--        </div>-->
    <!--    </div>-->
<!--    <div>lol</div>-->
</template>

<script>
export default {}
</script>

<style scoped lang="scss">

</style>
