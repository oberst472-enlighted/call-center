<template>
    <span class="ui-stars">
        <IconStar v-for="item in 5" :key="item" class="ui-stars__item"/>
    </span>
</template>

<script>
export default {
    props: {},
    computed: {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.ui-stars {
    display: inline-flex;
    color: #D9D5DE;

    //&:hover {
    //    .ui-stars__item {
    //        color: $color--primary;
    //    }
    //}
    //
    //&__item {
    //    cursor: pointer;
    //    transition-duration: 0.3s;
    //
    //    &:hover {
    //
    //        & ~ * {
    //            color: #D9D5DE !important;
    //        }
    //    }
    //}
}
</style>
