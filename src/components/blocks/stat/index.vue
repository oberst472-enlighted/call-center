<template>
    <SectionBox
        class="block-stat"
        gutters
        is-not-pagination
    >
        <transition name="fade" mode="out-in">
            <div class="block-stat__box" v-if="info" key="cont">
                <LocalStatItem
                    class="block-stat__item"
                    :class="`block-stat__item-${index}`"
                    v-for="(item, name, index) in modifiedInfo"
                    :key="index"
                    :info="item"
                />
            </div>
            <div v-else class="block-stat__placeholder" key="place">Нет открытой смены <br> статистика не доступна</div>
        </transition>
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
            default: null
        },
        isNotPagination: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        modifiedInfo() {
            const newObj = {...this.info}
            delete newObj.success
            return newObj
        }
    }
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
    &__placeholder {
        font-size: 14px;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 100%;
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

.admin-stat {
    .block-stat {
        display: flex;
        &__box {
            grid-gap: 0 10px;
        }
        &__item {
            /deep/ .block-stat-item__title {
                width: 80%;
                font-size: 10px;
            }
            /deep/ .block-stat-item__count {
                font-size: 15px;
            }
        }
    }

}
</style>
