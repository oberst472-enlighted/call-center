<template>
    <div class="page-reset-password">
        <SectionBox
            class="page-reset-password__box"
            gutters
        >
            <SectionResetPasswordForm/>
        </SectionBox>
    </div>
</template>

<script>
import SectionBox from '@/components/sections/box'
import SectionResetPasswordForm from '@/components/sections/reset-password-form'
export default {
    components: {
        SectionBox,
        SectionResetPasswordForm
    },
    metaInfo() {
        return {
            title: `Восстановление пароля`
        }
    }
}
</script>

<style lang='scss' scoped>
.page-reset-password {
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    &__box {
        max-width: 430px;
        max-height: 340px;
    }

}
</style>
