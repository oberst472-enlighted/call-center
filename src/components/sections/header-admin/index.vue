<template>
    <div class="section-header">
        <!--        <div class="section-header__back-box" :class="{'section-header__back-box&#45;&#45;active': this.$route.name !== 'home-operator'}">-->
        <!--            <UiBack/>-->
        <!--        </div>-->
        <transition name="fade">
            <UiBtn v-if="$route.name !== 'create-operator_admin' " :to="{name: 'create-operator_admin'}">Добавить сотрудника</UiBtn>
        </transition>


        <div class="section-header__user-box">
            <BlockUserShortstory/>
        </div>
    </div>
</template>

<script>
import LocalHeaderBack from './header-operator-back'
import BlockUserShortstory from '@/components/blocks/user-shortstory'
import {mapState, mapMutations, mapActions} from 'vuex'
import {customLog} from '@/utils/console-group'
import store from '@/store'

export default {
    components: {
        LocalHeaderBack,
        BlockUserShortstory
    },
    data() {
        return {
            isActive: false,
            isPauseLoading: false,
        }
    },
    computed: {
    },
    methods: {
    },
    created() {
    }
}
</script>

<style lang='scss' scoped>

.section-header {
    display: flex;
    width: 100%;
    min-height: 84px;
    align-items: center;
    padding: 15px 0;
    &__options {
        display: flex;
        align-items: center;
        transition-duration: 0.3s;
    }
    &__start-btn-box {
        transition-duration: 0.3s;
    }
    &__toggle-box {
        max-width: 200px;
        width: 100%;
        margin-right: 18px;
        flex-shrink: 0;
        &--disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    }
    &__timer-box {
        margin-right: 18px;
        flex-shrink: 0;
        font-size: 14px !important;
        font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
        /deep/ .ui-stopwatch__number {
            width: 12px !important;
            color: $color--primary
        }
        /deep/ .ui-stopwatch__dot {
            width: auto !important;
            display: inline-flex;
            justify-content: center;
            color: $color--primary
        }
    }
    &__btn-box {
        //min-width: 150px;
    }
    &__user-box {
        margin-left: auto;
        flex-shrink: 0;
    }
    &__back-box {
        width: 50px;
        overflow: hidden;
        transition-duration: 0.3s;
        &--active {
            opacity: 0;
            & + .section-header__options {
                transform: translateX(-50px);
            }
            & + .section-header__start-btn-box {
                transform: translateX(-50px);
            }
        }
    }

}
</style>
