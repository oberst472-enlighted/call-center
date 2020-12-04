<template>
    <div class="block-reset-pass">
        <SectionBox
            class="block-reset-pass__box"
            gutters
            scroll
            head
            title="Запросы на смену пароля"


        >
            <div class="block-reset-pass__subbox">
                <LocalDashBoardRestPassItem
                    class="block-reset-pass__item"
                    v-for="item in items"
                    :key="item.id"
                    :info="item"
                    :to="{name: 'reset-password_admin', params: {info: item, id: item.id}}"
                />
                <span class="block-reset-pass__placeholder" v-if="!items.length">Актуальных запросов нет</span>
            </div>
        </SectionBox>
    </div>
</template>

<script>
import SectionBox from '@/components/sections/box'
import LocalDashBoardRestPassItem from './dashboard-reset-pass-item'

export default {
    components: {
        SectionBox,
        LocalDashBoardRestPassItem
    },
    props: {
        items: {
            type: Array,
            default: () => []
        },
    },
}
</script>

<style scoped lang="scss">
.block-reset-pass {
    height: 100%;
    &__box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    &__subbox {
        width: 100%;
    }
    &__title {
        text-align: left;
        font-size: 17px;
        color: $color--primary;
        font-weight: 500;
        margin-bottom: 20px;
    }
    &__item {
        &+& {
            margin-top: 10px;
        }
    }
    &__placeholder {
        color: #65528b;
        font-size: 12px;
        margin-top: 30px;
        text-align: center;
        width: 100%;
        display: block;
    }
}
</style>
