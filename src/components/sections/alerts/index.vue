<template>
    <div class="ui-message">
        <div class="ui-message__items">
            <transition-group name="list">
                <div
                    class="ui-message__item"
                    :class="`ui-message__item--${item.status}`"
                    v-for="item in alerts"
                    :key="item.id"
                >
                    <img class="ui-message__item-icon"
                         src="./assets/images/success.svg" alt="">
                    {{ item.value }}
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        data() {
            return {
                timeout: ''
            }
        },
        computed: {
            ...mapState('alerts', ['alerts'])
        },
        methods: {
            ...mapMutations('alerts', ['DELETE_ALERT'])
        },
        watch: {
            alerts(val) {
                if (val.length) {
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.DELETE_ALERT()
                    }, 2500)
                } else {
                    clearTimeout(this.timeout)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-message {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 50;
        width: 300px;
        height: 100vh;
        overflow: hidden;
        pointer-events: none;

        &__items {
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            height: 100%;
        }

        &__item {
            box-sizing: border-box;
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            min-height: 50px;
            margin-top: $gutter / 3;
            padding: $gutter / 3;

            font-size: 12px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            text-align: left;

            &--positive {
                background-color: $color--positive;
                color: $color--text-invert
            }

            &--negative {
                background-color: $color--negative;
                color: $color--text-invert
            }
            &-icon {
                width: 20px;
                height: 20px;
                margin-right: 20px;
            }
        }

        .list-enter-active, .list-leave-active {
            transition: all 0.3s ease;
        }

        .list-enter, .list-leave-to {
            opacity: 0;
            transform: translateX(150px);
        }
    }
</style>
