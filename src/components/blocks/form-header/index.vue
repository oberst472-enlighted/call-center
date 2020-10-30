<template>
    <div class="block-form-header">
        <img alt="logo" class="block-form-header__logo" src="@/assets/icons/Chat.svg">
        <div class="block-form-header__text">
            <span class="block-form-header__top">{{ title }}</span>
            <span class="block-form-header__bottom">{{ subtitle }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.block-form-header {
    display: flex;
    user-select: none;

    &__logo {
        width: 62px;
        margin-right: 20px;
    }

    &__text {
        display: flex;
        flex-direction: column;
    }

    &__top {
        font-size: 17px;
        color: #362b4f;
        font-weight: 400;
    }

    &__bottom {
        font-size: 15px;
        color: #cfcbd5;
        font-weight: 400;
    }
}
</style>
