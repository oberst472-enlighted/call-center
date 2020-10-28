<template>
    <div id="statusOperatorDashboard" v-if="statistic">
        <div class="row">
            <div class="col">
                <div class="col-name">звонков <br> всего</div>
                <div class="col-num">{{ statistic.total }}</div>

                <hr style="background-color: #65528b">

                <div class="col-stat">за смену</div>
            </div>
            <div class="col">
                <div class="col-name">звонков <br> принято</div>
                <div class="col-num">{{ statistic.received }}</div>

                <hr style="background-color: #4fd161">

                <div class="col-stat">{{ (statistic.received / statistic.total * 100).toFixed(2) || 0 }}% от входящих</div>
            </div>
            <div class="col">
                <div class="col-name">звонков <br> обработано</div>
                <div class="col-num">{{ statistic.success }}</div>

                <hr style="background-color: #65528b">

                <div class="col-stat">{{ (statistic.success / statistic.total * 100).toFixed(2) || 0 }}% от принятых</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    computed: {
        statistic() {
            return this.$store.state.userData.lastSessionStat
        }
    }
}
</script>

<style lang='scss'>
#statusOperatorDashboard{
    width: 593px;
    height: 175px;
    box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 17px;
    .user_stat_header{
        width: 100%;
        text-align: center;
        color: #685c7b;
        font-size: 17px;
        font-weight: 700;
        margin-bottom: 30px;
    }
    .row{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .col{
        width: 19%!important;
        text-align: center;
        color: #786d89;
        margin: 0 5px;
        &-name{
            font-size: 10px;
            font-weight: 500;
            text-transform: uppercase;
            padding-bottom: 6px;
        }
        &-num{
            color: #65528b;
            font-size: 25px;
            font-weight: 500;
            padding-bottom: 3px;
            letter-spacing: 0;
            word-spacing: 0;
            span{
                font-size: 10px;
                font-weight: 500;
                letter-spacing: 0;
                word-spacing: 0;
            }
        }
        &-stat{
            padding-top: 3px;
            font-size: 10px;
            font-weight: 500;
        }
    }
}
</style>
