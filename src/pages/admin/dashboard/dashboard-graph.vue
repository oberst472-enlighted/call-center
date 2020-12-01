<template>
    <div class="block-graph">
        <SectionBox
            class="block-graph__box"
            gutters
            content
        >
            <template #content>
                <span>График</span>
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
.block-graph {
    width: 100%;
    &__box {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
