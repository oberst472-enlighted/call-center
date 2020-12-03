<template>
    <div class="error">
        <h1>404</h1>
        <router-link :to="{name: isAdmin ? 'home_admin' : 'home_operator'}">На главную</router-link>
    </div>
</template>

<script>
import {isRoleAdmin, isUserAuth} from '@/utils/middleware'

export default {
    data() {
        return {
            isAdmin: false,
            isAuth: false
        }
    },
    computed: {
    },
    mounted() {
        if (!isUserAuth()) {
            this.$router.push({name: 'login'})
        }
        this.isAdmin = isRoleAdmin()
        this.isAuth = isUserAuth()
    }
}
</script>

<style scoped lang="scss">
.error {
    width: 100vw;
    height: 100vh;
    display: flex;
    color: $color--primary;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    a {
        text-decoration: none;
        color: $color--primary;
        border: 1px solid $color--primary;
        padding: 5px;
        border-radius: 3px;
        &:hover {
            opacity: 0.6;
        }
    }
}
</style>
