<template>
    <div :class="{'section-aside--active' : isAsideActive}" class="section-aside">
        <div class="section-aside__top">
            <div
                :class="{'section-aside__logo-box--disabled': $route.name === 'home_operator' || $route.name === 'home_admin'}"
                class="section-aside__logo-box"
                @click="goToHomePage"
            >
                <LocalAsideLogo/>
            </div>

            <LocalAsideLinkItem
                v-for="(item, index) in links"
                :key="index"
                :href="item.href"
                :icon="item.icon"
                :title="item.title"
            />
        </div>

        <button
            :title="isAsideActive ? 'Свернуть' : 'Развернуть'"
            class="section-aside__toggle-state-btn"
            @click="TOGGLE_ASIDE_ACTIVE(!isAsideActive)"
        >
            <span class="section-aside__toggle-state-icon-box">
                <IconSettings/>
            </span>
        </button>
    </div>
</template>

<script>
import linksOperator from './assets/links-operator'
import linksAdmin from './assets/links-admin'
import LocalAsideLogo from './aside-logo'
import LocalAsideLinkItem from './aside-link-item'
import {mapMutations, mapState} from 'vuex'
import {isRoleAdmin} from '@/utils/middleware'

export default {
    components: {
        LocalAsideLinkItem,
        LocalAsideLogo,
    },
    data() {
        return {
            isCollapsed: false,
            isAdmin: false,
        }
    },
    computed: {
        ...mapState(['isAsideActive']),
        links() {
            return this.isAdmin ? linksAdmin : linksOperator
        },
    },
    methods: {
        ...mapMutations(['TOGGLE_ASIDE_ACTIVE']),
        goToHomePage() {
            this.isAdmin ? this.$router.push({name: 'home_admin'}) : this.$router.push({name: 'home_operator'})
        }
    },
    mounted() {
        this.isAdmin = isRoleAdmin()
    }
}
</script>

<style lang='scss'>
.router-link-active {
    background-color: rgba($color--primary, 0.1);
    pointer-events: none;
}

.section-aside {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100px;
    padding: 30px 32px;
    background-color: #ffffff;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    overflow: hidden;
    transition: all ease 0.3s;

    &__top {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }

    &__logo-box {
        width: 100%;
        max-width: 100%;
        margin-bottom: $gutter + 10px;
        cursor: pointer;

        &--disabled {
            cursor: auto;
            pointer-events: none;
        }
    }

    &__toggle-state-btn {
        width: 36px;
        margin-right: auto;
        margin-left: auto;
        padding: 10px;
        color: $color--primary;
        border: 0;
        border-radius: 50%;
        outline: 0;
        background-color: transparent;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: rgba($color--primary, 0.1);
        }

        &:active {
            opacity: 0.7;
        }
    }

    &--active {
        width: 200px;

        /deep/ .section-aside__link {
            border-radius: 10px;
            transition-delay: 0s;

            &-text {
                opacity: 1;
            }

        }

        /deep/ .section-aside__logo-icon {
            left: 0;
        }

        /deep/ .section-aside__logo-text {
            opacity: 1;
        }

    }
}
</style>
