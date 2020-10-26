<template>
  <div id="graphBox">
    <div class="box-header">Успешность <br> звонков</div>
    <div class="box-body">
      <div class="labels">
        <div class="label">
          <div class="label-row green"/>
          Дозвонились
        </div>
        <!--        <div class="label">-->
        <!--          <div class="label-row red"/>-->
        <!--          Не дозвонились-->
        <!--        </div>-->
      </div>
      <canvas ref="myChart" class="chartjs-render-monitor" style="display: block; width: 100%; height: 90px"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';
import {mapState} from 'vuex'
export default {
  name: "graphBox",
  data() {
    return {
      graphData: []
    }
  },
  components: {},
  props: {
    data: Array
  },
  computed: {
    ...mapState('stat', ['stat'])
  },
  mounted() {
    let ctx = this.$refs.myChart.getContext('2d')
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.tooltips.enabled = true;
    Chart.defaults.scale.gridLines.display = false;

    let myChart = new Chart(ctx, {
      type: 'line',
      fill: false,
      data: {
        labels:
            [ '8.00', '10.00', '12.00', '14.00', '16.00', '18.00', '20.00'],
        color: ['green'],
        datasets: [
          {
            lineTension: 0,
            pointRadius: 0,
            data: this.data,
            borderColor: ['#4fd161'],
            backgroundColor: ['#faf9f9']
          },
          // {
          //   lineTension: 0,
          //   pointRadius: 0,
          //   fill: false,
          //   data: [ 60, 30, 60, 60, 30, 60, 50, 50, 60 ],
          //   borderColor: ['#f04265'],
          //   backgroundColor: ['#f04265']
          //
          // }
        ],
        options: {
          bezierCurve: false,
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }],
            yAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }]
          }
        }
      },
    });

  },
  created() {
    const times = ['8', '10', '12', '14', '16', '18', '20']
    times.forEach((time) => {
      this.graphData.push(this.stat.callsSuccessRate[time] * 100)
    })
  }
}
</script>

<style lang='scss'>
#graphBox {
  width: 100%;
  height: 244px;
  box-shadow: 0 0 8px rgba(120, 131, 132, 0.12);
  border-radius: 8px;
  background-color: #ffffff;
  padding: 20px 10px;
  .box-header{
    padding-left: 13px;
    color: #685c7b;
    font-size: 17px;
    font-weight: 500;
  }
  .box-body{
    margin-top: 25px;
    height: calc(100% - 55px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .labels{
      margin-left: 20px;
      .label{
        display: flex;
        align-items: center;
        color: #786d89;
        font-size: 10px;
        font-weight: 500;
        .label-row{
          width: 13px;
          height: 3px;
          margin-right: 6px;
        }
        .label-row.green{
          background-color: #4fd161;
        }
        .label-row.red{
          background-color: #f04265;
        }
      }
      .label:first-child{
        margin-bottom: 8px;
      }
    }
  }
}
</style>
