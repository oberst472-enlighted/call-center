<template>
    <div class="header-icon-wrapper" @click="$router.back()">
        <img alt="" class="header-icon" src="@/assets/icons/Forward.png">
    </div>
</template>

<script>
export default {
    name: 'forward'
}
</script>

<style lang='scss'>
.header-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    transition: all ease .5s;
}

.header-icon-wrapper:hover {
    background-color: #e8eaf5;
}
</style>
