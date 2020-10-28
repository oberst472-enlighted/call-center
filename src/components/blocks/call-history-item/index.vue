<template>
    <div class="call_in_history">
        <hr>
        <div class="call" @click="$router.push(`/call-list/${data.id}`)">
            <div class="call-left">
                <div class="call-left-date">{{dateCall}}  <span>{{startTime}} - {{data.endTime ? endTime : ''}}</span></div>
                <div class="call-left-name" v-if="data.device">{{data.device.term.title}}</div>
                <!--        <div class="call-left-terminal" v-if="data.device">терминал #{{data.device.term.id}}</div>-->
                <div class="call-left-text" v-if="data.device">{{data.device.title}}</div>
            </div>
            <div class="call-right">
                <div class="call-right-status" v-if="data.status === 'SUCCESS'">Решено</div>
                <div class="call-right-status" v-else-if="data.status === 'NO_ANSWER'" style="background-color: rgb(252, 239, 242); color: rgb(243, 115, 140);">Не принят</div>
                <div class="call-right-status" v-else-if="data.status === 'FAIL'" style="background-color: rgb(252, 239, 242); color: rgb(243, 115, 140);">Не решено</div>
                <img v-if="chatStatus === 'show'" src="@/assets/icons/Write.svg" alt="">
            </div>
        </div>
        <div
            class="operator"
            v-if="!userIsOperator && this.$route.name !== 'operator-page'"
        >
            <img
                :src="data.operator.photo ? `https://calls-dev.enlighted.ru${data.operator.photo}` : require('@/assets/images/user2.png')"
                alt=""
                class="operator-img"
            >
            <div class="operator-block">
                <div class="operator-text">{{data.operator.firstName}} {{data.operator.lastName}}</div>
                <div class="operator-text">оператор # {{data.operator.number}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        chatStatus: {
            type: String,
            default: 'show'
        },
        data: Object
    },
    computed: {
        userIsOperator() {
            return localStorage.getItem('userType') && localStorage.getItem('userType') === 'operator'
        },
        dateCall() {
            return this.data.startTime.split('T')[0].split('-').reverse().join('.')
        },
        startTime() {
            return this.data.startTime.split('T')[1].split('.')[0]
        },
        endTime() {
            return this.data.endTime.split('T')[1].split('.')[0]
        }
    }
}
</script>

<style lang='scss'>
.call_in_history{
    .call{
        cursor: pointer;
        margin: 12px 0;
        display: flex;
        justify-content: space-between;
        color: #4c3b60;
        font-size: 10px;
        font-weight: 700;
        line-height: 13px;
        &-left{
            &-date{
                opacity: 0.7;
                color: #65528b;
                font-size: 11px;
                font-weight: 500;
                margin-bottom: 5px;
                span{
                    font-weight: 500;
                    font-size: 11px;
                }
            }
            &-name{
                color: #4a4355;
                font-size: 12px;
                font-weight: 400;
            }
            &-terminal{
                font-size: 12px;
                font-weight: 400;

            }
            &-text{
                font-weight: 400;
            }
        }
        &-right{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            &-status{
                text-align: center;
                height: 14px;
                border-radius: 7px;
                background-color: #f2fcf4;
                color: #4fd161;
                font-size: 8px;
                font-weight: 700;
                width: 70px;
            }
        }
    }
    .operator{
        margin-top: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        &-status{
            width: 83px;
            height: 14px;
            border-radius: 7px;
            background-color: #f2fcf4;
            color: #4fd161;
            font-size: 8px;
            text-align: center;
        }
        &-text{
            color: #685c7b;
            font-size: 10px;
            font-weight: 400;
            line-height: 12px;
        }
        &-img{
            border-radius: 50%;
            height: 40px;
            width: 40px;
            margin-right: 14px;
        }
    }

}
</style>
