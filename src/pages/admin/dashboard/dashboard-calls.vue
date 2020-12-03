<template>
    <SectionBox
        gutters
        scroll
        head
        title="История звонков"
        subtitle="Последние"
        not-content-text="Нет звонков"
        :is-not-content="!items.length"
        :is-not-pagination="true"
        class="page-home__call-history-box"
    >
        <div class="page-home__call-history-cont">
            <BlockCallShortstoryItem
                class="page-home__calls-history__item"
                v-for="item in items"
                :key="item.id"
                :info="item"
                :to="{name: 'detail-call_admin', params: {id: item.id}}"
                no-icon-message
            />
        </div>
    </SectionBox>
</template>

<script>
import SectionBox from '@/components/sections/box'
import BlockCallShortstoryItem from '@/components/blocks/call-shortstory-item/index'
export default {
    components: {
        SectionBox,
        BlockCallShortstoryItem
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
.page-home__call-history-box {
    /deep/ .page-home__calls-history__item {
        border-top: 1px solid #efeff4;

    }
    .page-home__call-history-cont {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
    }
}
</style>
