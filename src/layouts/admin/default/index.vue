<template>
    <div class="layout-default">
        <aside class="layout-default__aside">
            <div class="layout-default__aside-box">
                <router-view name="aside"/>
            </div>
        </aside>

        <main class="layout-default__body">
            <header class="layout-default__header">
                <div class="wrapper">
                    <router-view name="header"/>
                </div>
            </header>

            <section class="layout-default__main">
                <div class="wrapper">
                    <router-view/>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.layout-default {
    display: flex;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;

    &__header {
    }

    &__body {
        flex-grow: 1;
        height: 100vh;
        max-height: 100vh;
        overflow: auto;
        display: flex;
        flex-direction: column;


    }

    &__aside {
        display: flex;
        flex-shrink: 0;
        height: 100vh;
        transition: all ease 0.3s;

        &-box {
            top: 0;
            left: 0;
            display: flex;
            width: inherit;
        }


    }

    &__main {
        flex-grow: 1;
        display: flex;
    }

    &--aside-active {
        .layout-default__aside {
            width: 200px;
        }
    }
}
</style>
