<template>
  <Line
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
      :plugins="plugins"
  />
</template>

<script>
import {computed} from "vue";
import {Line} from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler
} from 'chart.js'
import dataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler,
    dataLabels
)

export default {
  components: {
    Line
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    labelsVisible: {
      type: Boolean
    }
  },
  setup(props) {
    const chartId = 'line-chart'
    const datasetIdKey = 'label'
    const width = 428
    const height = 238
    const cssClasses = ''
    const styles = {}


    const plugins = [
      dataLabels,
    ]

    const chartData = computed(() => {
      return {
        labels: props.items.map(item => item.close),
        datasets: [
          {
            label: 'Course (USD)',
            data: props.items.map(item => item.close),
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 210);

              gradient.addColorStop(0, "#3571d8");
              gradient.addColorStop(1, "#243e6a");

              return gradient;
            },
            pointBackgroundColor: function (context) {
              if (context.dataIndex === 0) {
                return "#3ad2a0"
              } else if (context.dataIndex === context.dataset.data.length - 1) {
                return "#f88"
              } else {
                return '#3d81f5'
              }
            },
            fill: true,
            borderColor: '#243e6a',
            tension: 0.3,
            borderWidth: 0,
            pointRadius: 3,
            pointHoverRadius: 5,
            pointBorderWidth: 1,
            pointHoverBorderWidth: 1,
            datalabels: {
              labels: {
                label: {
                  display: (context) => {
                    if (props.labelsVisible) {
                      return context.dataIndex === 0 || context.dataIndex === context.dataset.data.length - 1
                    } else {
                      return false
                    }
                  },
                  formatter: (value, context) => `${context.dataIndex === 0 ? `BUY ${value}` : `SELL ${value}`}`,
                  backgroundColor: (context) => `${context.dataIndex === 0 ? '#3ad2a0' : '#f88'}`,
                  borderRadius: 4,
                  color: "#222",
                  padding: {
                    top: 5,
                    bottom: 4,
                    left: 9,
                    right: 9
                  },
                  font: {weight: "normal", size: "14px"},
                  textAlign: 'center',
                  align: (context) => `${context.dataIndex === 0 ? '-50' : '130'}`,
                  offset: 10,
                }
              }
            }
          }
        ]
      }
    })


    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        chartArea: {
          backgroundColor: 'rgba(251, 85, 85, 0.4)'
        },
        scales: {
          y: {
            display: false
          },
          x: {
            display: false
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 30,
            bottom: 30
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })

    return {
      chartOptions,
      chartData,
      chartId,
      datasetIdKey,
      width,
      height,
      cssClasses,
      styles,
      plugins
    }
  }
}
</script>
