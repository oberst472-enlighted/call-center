<template>
    <div class="page-login">
        <SectionBox
            class="page-login__box"
            gutters
        >
            <SectionLoginForm/>
        </SectionBox>
    </div>
</template>

<script>
import SectionBox from '@/components/sections/box'
import SectionLoginForm from '@/components/sections/login-form'
export default {
    components: {
        SectionBox,
        SectionLoginForm
    },
    metaInfo() {
        return {
            title: `Вход в систему`
        }
    }
}
</script>

<style lang='scss' scoped>
.page-login {
    position: relative;
    z-index: 2;
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    &__box {
        max-width: 430px;
        max-height: 410px;
    }

}
</style>
