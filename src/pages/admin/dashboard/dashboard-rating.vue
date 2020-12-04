<template>
    <div class="page-home__rating-box">
        <SectionBox
            class="page-home__rating-cont"
            gutters
            content
        >
            <template #content>
                <div class="page-home__rating-title">Оценка качества обслуживания</div>
                <span class="page-home__rating-count">4.2</span>
                <UiStars class="page-home__rating-star"/>
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
.page-home__rating {
    &-cont {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    &-title {
        user-select: none;
        text-align: left;
        font-size: 17px;
        color: $color--primary;
        font-weight: 500;
    }
    &-count {
        color: #65528b;
        font-size: 49px;
        margin-bottom: 22px;
    }
    &-star {
        /deep/ .ui-icon:not(:last-of-type) {
            color: $color--primary
        }
    }
}
</style>
