<template>
    <div class="page-home__terminals__box">
        <SectionBox
            class="block-terminal"
            gutters
            scroll
            head
            title="Доступность терминалов"
            subtitle="Доступные вам терминалы"
        >
            <div class="block-terminal__box">
                <BlockShortstoryItem
                    class="block-terminal__item"
                    v-for="item in items"
                    :key="item.id"
                    :info="item"
                    :to="{name: 'detail-terminal_admin', params: {id: item.id}}"
                />
            </div>
        </SectionBox>
    </div>
</template>

<script>
import SectionBox from '@/components/sections/box'
import BlockShortstoryItem from '@/components/blocks/terminal-shortstory-item'

export default {
    components: {
        SectionBox,
        BlockShortstoryItem
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
.block-terminal {
    &__box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
    }
    &__item {
        border-top: 1px solid #efeff4;
    }
}
</style>
