<template>
    <SectionBox
        class="block-stat"
        gutters
        is-not-pagination
    >
        <div class="block-stat__box">
            <LocalStatItem
                class="block-stat__item"
                :class="`block-stat__item-${index}`"
                v-for="(item, name, index) in info"
                :key="index"
                :info="item"
            />
        </div>
    </SectionBox>
</template>

<script>
import SectionBox from '@/components/sections/box'
import LocalStatItem from './stat-item'
export default {
    components: {
        SectionBox,
        LocalStatItem
    },
    props: {
        info: {
            type: Object,
            default: () => {}
        },
        isNotPagination: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style scoped lang="scss">
.block-stat {
    display: flex;
    &__box {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: column;
        grid-gap: 50px;
    }
    &__item {
        &-0 {
            /deep/ .block-stat-item__count {
                border-color: $color--primary
            }
        }
        &-1 {
            /deep/ .block-stat-item__count {
                border-color: $color--positive
            }
        }
        &-2 {
            /deep/ .block-stat-item__count {
                border-color: $color--negative
            }
        }
    }
}
</style>
