<template>
    <div class="block-graph">
        <SectionBox
            class="block-graph__box"
            content
            gutters
        >
            <template #content>
                <div class="block-graph__subbox">
                    <div class="block-graph__title">Успешность звонков</div>
                    <div class="block-graph__chart">
                        <canvas id="canvas" ref="canvas" class="block-graph__canvas"></canvas>
                    </div>
                    <ul data-results-chart-legends></ul>
                </div>
            </template>
        </SectionBox>
    </div>
</template>

<script>
import SectionBox from '@/components/sections/box'
// import {Line} from 'vue-chartjs'
import Chart from 'chart.js'

export default {
    components: {
        SectionBox,
    },
    // extends: Line,
    props: {
        items: {
            type: Object,
            default: null
        },
    },
    methods: {},
    mounted() {
        const data = {
            labels: [
                '00:00',
                '02:00',
                '04:00',
                '06:00',
                '08:00',
                '10:00',
                '12:00',
                '14:00',
                '16:00',
                '18:00',
                '20:00',
                '22:00',
            ],
            datasets: [
                {
                    label: 'Успешно дозвонились   ',
                    data: [
                        12, 19, 3, 5, 2, 3, 20, 40, 12, 12, 12, 6
                    ],
                    borderColor: '#4fd161',
                    fill: false, //фон под линией
                    borderWidth: 1,
                    pointBorderWidth: 2, //размер круглых дотов
                    pointBackgroundColor: '#4fd161', //размер круглых дотов
                },
                {
                    label: 'Не дозвонились',
                    data: [
                        11, 2, 34, 5, 2, 3, 12, 3, 8, 12, 5, 4
                    ],
                    backgroundColor: [],
                    borderColor: '#f04265',
                    fill: false, //фон под линией
                    borderWidth: 1,
                    pointBorderWidth: 2, //размер круглых дотов
                    pointBackgroundColor: '#f04265', //размер круглых дотов
                }
            ]
        }
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                },
            },
            scales: {
                xAxes: [{
                    ticks: {
                        padding: 5,
                    },
                    gridLines: {
                        display: false //горизонтальные линии сетки
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        padding: 10
                    },
                    gridLines: {
                        display: false //вертикальные линии сетки
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: '#66538a',
                    boxWidth: 20,
                    margin: 30,
                },
                position: 'top',
                align: 'start',
                padding: 30,
            },
        }
        const ctx = document.getElementById('canvas').getContext('2d')
        const chart = new Chart(ctx, {
            type: 'line',
            data,
            options,
            plugins: [{
                beforeInit: function(chart) {
                    chart.legend.afterFit = function() {
                        this.height = this.height + 15;
                    };
                }
            }]
        })

    }
}
</script>

<style lang="scss" scoped>
.block-graph {
    width: 100%;

    &__box {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__title {
        margin-bottom: 15px;
        font-size: 17px;
        color: $color--primary;
        font-weight: 500;
        user-select: none;
        text-align: left;
    }

    &__canvas {
        width: 100% !important;
        height: 200px !important;
    }
}
</style>
