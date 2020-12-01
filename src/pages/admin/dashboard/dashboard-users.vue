<template>
    <SectionBox
        gutters
        scroll
        head
        title="Сотрудники"
        :is-not-pagination="true"
    >
        <template #head-btn>
            <UiBtn :to="{name: 'add-new-operator'}">Добавить</UiBtn>
        </template>

        <BlockUserShortstoryItem
            class="page-home__users__item"
            v-for="item in items"
            :key="item.id"
            :info="item"
            :to="{name: 'user-fullstory-admin', params: {id: item.id}}"
        />
    </SectionBox>
</template>

<script>
import SectionBox from '@/components/sections/box'
import BlockUserShortstoryItem from '@/components/blocks/user-shortstory-item/index'
export default {
    components: {
        SectionBox,
        BlockUserShortstoryItem,
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

</style>
