<template>
    <SectionBox
        class="block-calls"
        gutters
        scroll
        head
        title="История звонков"
        subtitle="Последние"
        @download-next-page="$emit('download-next-page')"
        :items-length="info.length"
        :is-not-pagination="isNotPagination"
    >
        <div class="block-calls__box">
            <BlockShortstoryItem
                class="block-calls__item"
                v-for="item in info"
                :key="item.id"
                :info="item"
                :to="{name: 'detail-call_operator', params: {id: item.id}}"
            />
        </div>
    </SectionBox>
</template>

<script>
import SectionBox from '@/components/sections/box'
import BlockShortstoryItem from '@/components/blocks/call-shortstory-item'
export default {
    components: {
        SectionBox,
        BlockShortstoryItem
    },
    props: {
        info: {
            type: Array,
            default: () => []
        },
        isNotPagination: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style scoped lang="scss">
.block-calls {
    &__box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
    }
    &__item {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        border-top: 1px solid #efeff4;
    }
    /deep/ .block-call-shortstory__icon {
        display: none;
    }
}
</style>
