<template>
    <SectionBox
        class="block-terminal"
        gutters
        scroll
        head
        :title="title"
        :subtitle="subtitle"
        @download-next-page="$emit('download-next-page')"
        :items-length="info.length"
        :is-not-pagination="isNotPagination"
    >
        <div class="block-terminal__box">
            <BlockShortstoryItem
                class="block-terminal__item"
                v-for="item in info"
                :key="item.id"
                :info="item"
                :to="{name: 'terminal-fullstory', params: {id: item.id}}"
            />
        </div>
    </SectionBox>
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
        title: {
            type: String,
            default: 'Доступность терминалов',
        },
        subtitle: {
            type: String,
            default: 'Доступные вам терминалы',
        },
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
.block-terminal {
    &__box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
    }
    &__item {
        border-top: 1px solid #efeff4;
    }
}
</style>
