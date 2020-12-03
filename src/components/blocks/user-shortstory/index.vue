<template>
    <div class="user-shortstory">
        <div class="user-shortstory__content" tabindex="-1">
            <div class="user-shortstory__info">
                <span class="user-shortstory__first-name">{{ mainUserInfo.first_name }}</span>
                <span class="user-shortstory__last-name">{{ mainUserInfo.last_name }}</span>
                <div class="user-shortstory__role">{{ mainUserInfo.role === 'administrator' ? 'администратор' : 'оператор' }}</div>
            </div>

            <div class="user-shortstory__img">
                <img src="/assets/images/user-placeholder.svg" alt="">
            </div>
        </div>
        <div class="user-shortstory__options" tabindex="-1" v-if="isAdmin">
            <div class="user-shortstory__options-box">
                <router-link :to="{name: 'edit-info-admin'}" class="user-shortstory__options-item">Редактировать</router-link>
                <span @click="$router.push({name: 'logout'})" class="user-shortstory__options-item">Выйти</span>
            </div>
        </div>

        <div class="user-shortstory__options" tabindex="-1" v-else>
            <div class="user-shortstory__options-box">
                <router-link :to="{name: 'operator-profile'}" class="user-shortstory__options-item">Редактировать</router-link>
                <span @click="$router.push({name: 'logout'})" class="user-shortstory__options-item">Выйти</span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {isRoleAdmin} from '@/utils/middleware'

export default {
    data() {
        return {
            isAdmin: false
        }
    },
    computed: {
        ...mapState('users', ['mainUserInfo']),
    },
    mounted() {
        this.isAdmin = isRoleAdmin()
    }
}
</script>

<style scoped lang="scss">
.user-shortstory {
    position: relative;
    &__content {
        display: flex;
        align-items: center;
        cursor: pointer;
        outline: none;
        transition-duration: 0.3s;
        &:focus {
            opacity: 0.8;
            & + .user-shortstory__options {
                height: 66px;
            }
        }
    }
    &__options {
        background-color: #fff;
        border-radius: 8px;
        width: 120px;
        position: absolute;
        z-index: 3;
        box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
        right: 0;
        height: 0;
        overflow: hidden;
        transition-duration: 0.3s;
        top: calc(100% + 10px);
        outline: none;
        &:focus {
            height: 66px;
        }
        &__box {
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 8px rgba(120,131,132,.12);
        }
        &-item {
            width: 100%;
            height: 33px;
            color: #4c3b60;
            font-size: 12px;
            font-weight: 400;
            line-height: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition-duration: 0.3s;
            text-decoration: none;
            &:hover {
                background-color: #f4f3f7;
            }
        }
    }
    &__info {
        margin-right: 10px;
    }
    &__first-name {
        margin-right: 5px;
        font-weight: 700;
    }
    &__last-name {
        font-weight: 700;
    }
    &__img {
        user-select: none;
    }
}
</style>
