<template>
    <div :class="{'section-aside--active' : isAsideActive}" class="section-aside">
        <div class="section-aside__top">
            <div
                class="section-aside__logo-box"
                @click="$router.push({name: 'home-operator'})"
            >
                <LocalAsideLogo/>
            </div>

            <LocalAsideLinkItem
                v-for="(item, index) in links"
                :key="index"
                :icon="item.icon"
                :title="item.title"
                :href="item.href"
            />
        </div>

        <button
            class="section-aside__toggle-state-btn"
            @click="TOGGLE_ASIDE_ACTIVE(!isAsideActive)"
            :title="isAsideActive ? 'Свернуть' : 'Развернуть'"
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
import {mapMutations, mapState, mapGetters} from 'vuex'

export default {
    components: {
        LocalAsideLinkItem,
        LocalAsideLogo,
    },
    data() {
        return {
            isCollapsed: false,
        }
    },
    computed: {
        ...mapGetters('middleware', ['isAdmin', 'isAuth']),
        ...mapState(['isAsideActive']),
        links() {
            return this.isAdmin ? linksAdmin : linksOperator
        }
    },
    methods: {
        ...mapMutations(['TOGGLE_ASIDE_ACTIVE'])
    }
}
</script>

<style lang='scss'>
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
    }

    &__toggle-state-btn {
        width: 36px;
        padding: 10px;
        cursor: pointer;
        border: 0;
        outline: 0;
        color: $color--primary;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        background-color: transparent;
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
