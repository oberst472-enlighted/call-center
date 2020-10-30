<template>
    <div :class="{'section-aside--active' : isAsideActive}" class="section-aside">
        <div class="section-aside__top">
            <div class="section-aside__logo-box" @click="$router.push('dashboard')">
                <LocalAsideLogo/>
            </div>
            <LocalAsideLinkItem
                v-for="(item, index) in linksOperator"
                :key="index"
                :icon="item.icon"
                :title="item.title"
            />


            <!--            <sidebarLink src="Dash.png" title="Dashboard" link="dashboard"/>-->
            <!--            <sidebarLink src="Calls.png" title="Звонки" link="call-list"/>-->
            <!--            <sidebarLink src="Terminal.png" title="Терминалы" link="call-terminals"/>-->
            <!--            <sidebarLink v-if="$store.state.userStatus === 'admin'" src="Operator.png" title="Операторы" link="operator-list"/>-->
            <!--            <sidebarLink src="Statistics.png" title="Статистика" link="statistics"/>-->
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
import LocalAsideLogo from './aside-logo'
import LocalAsideLinkItem from './aside-link-item'
import {mapMutations, mapState} from 'vuex'

export default {
    components: {
        LocalAsideLinkItem,
        LocalAsideLogo,
    },
    data() {
        return {
            isCollapsed: false,
            linksOperator: [
                {
                    title: 'Главная',
                    icon: 'IconHome',
                    href: 'home'
                },
                {
                    title: 'Звонки',
                    icon: 'IconCall',
                    href: 'home'
                },
                {
                    title: 'Терминалы',
                    icon: 'IconTerminals',
                    href: 'home'
                },
                {
                    title: 'Операторы',
                    icon: 'IconUsers',
                    href: 'home'
                },
                {
                    title: 'Статистика',
                    icon: 'IconStat',
                    href: 'home'
                }
            ]
        }
    },
    computed: {
        ...mapState(['isAsideActive'])
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
                //transition-property: opacity;
                //transition-delay: 0.3s;
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

//#Sidebar {
//  padding: 30px;
//  left: 0;
//  width: 100px;
//  height: 100vh;
//  background-color: #ffffff;
//  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
//  display: flex;
//  flex-direction: column;
//  justify-content: space-between;
//  align-items: center;
//  transition: all ease .5s;
//  overflow: hidden;
//  .buttons_top{
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//    justify-content: center;
//  }
//  .buttons_bottom{
//      cursor: pointer;
//      padding: 10px;
//  }
//  .buttons_bottom:hover{
//    border-radius: 10px;
//    background-color: #f1eef5 !important;
//  }
//
//}
//#Sidebar.active{
//  width: 200px;
//  padding: 30px 20px;
//  .sidebarLink-title {
//    display: block;
//    width: 100%;
//    opacity: 1;
//    margin: 5px 12px;
//
//  }
//  .buttons_top{
//    align-items: flex-start
//  }
//}
</style>
