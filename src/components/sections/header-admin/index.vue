<template>
    <div class="section-header">
        <div :class="{'section-header__back-box--active': !isBackBtnActive}" class="section-header__back-box">
            <UiBack @click="$router.go(-1)"/>
        </div>
        <UiBtn
            v-if="$route.name !== 'create-operator_admin'"
            :to="{name: 'create-operator_admin'}"
            class="section-header__add-user-btn"
        >
            Добавить сотрудника
        </UiBtn>


        <div class="section-header__user-box">
            <BlockUserShortstory/>
        </div>
    </div>
</template>

<script>
import BlockUserShortstory from '@/components/blocks/user-shortstory'
import {mapState} from 'vuex'

export default {
    components: {
        BlockUserShortstory
    },
    data() {
        return {
            isActive: false,
            isPauseLoading: false,
        }
    },
    computed: {
        ...mapState(['isBackBtnActive'])
    },
    methods: {},
    created() {
    }
}
</script>

<style lang='scss' scoped>

.section-header {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 84px;
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
        flex-shrink: 0;
        width: 100%;
        max-width: 200px;
        margin-right: 18px;

        &--disabled {
            opacity: 0.6;
            pointer-events: none;
        }
    }


    &__btn-box {
        //min-width: 150px;
    }
    &__add-user-btn {
        transition-duration: 0.3s;
    }

    &__user-box {
        flex-shrink: 0;
        margin-left: auto;
    }

    &__back-box {
        width: 50px;
        overflow: hidden;
        transition-duration: 0.3s;

        &--active {
            opacity: 0;

            & + .section-header__add-user-btn {
                transform: translateX(-50px);
            }

        }
    }

}
</style>
