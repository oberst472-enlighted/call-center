<template>
    <div class="block-reset-pass">
        <SectionBox
            class="block-reset-pass__box"
            gutters
            content
        >
            <template #content>
                <div class="block-reset-pass__title">Запросы на смену пароля</div>
                <span class="block-reset-pass__placeholder">Актуальных запросов нет</span>
            </template>
        </SectionBox>
    </div>
</template>

<script>
import SectionBox from '@/components/sections/box'

export default {
    components: {
        SectionBox,
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
    &__title {
        text-align: left;
        font-size: 17px;
        color: $color--primary;
        font-weight: 500;
    }
    &__placeholder {
        color: #65528b;
        font-size: 12px;
        margin-top: 30px;
    }
}
</style>
