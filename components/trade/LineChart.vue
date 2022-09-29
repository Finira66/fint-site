<template>
  <apexchart
      :options="chartOptions"
      :series="series"
      ref="realtimeChart"
      height="260px"
  ></apexchart>
</template>

<script setup>
// defineProps
import {defineProps, ref, onMounted, watch, onUpdated} from 'vue';
import _ from "lodash";

const props = defineProps({
  items: {
    type: Object,
    default: () => {
    }
  },
  reset: {
    type: Boolean,
    default: false
  }
});


let realtimeChart = ref(null);

let lastDate = 0;
let data = [];

function getDayWiseTimeSeries(baseval, count, yrange) {
  let i = 0;
  while (i < count) {
    let x = baseval;
    let y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    data.push({
      x,
      y
    });
    lastDate = baseval;
    baseval += 86400000;
    i++;
  }
}

getDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 10, {
  min: 10,
  max: 90
});

function getNewSeries(baseval, yrange) {
  let newDate = baseval + 86400000;
  lastDate = newDate;
  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  });
}

function resetData() {
  data = data.slice(data.length - 10, data.length);
}

const chartOptions = {
  chart: {
    type: "area",
    animations: {
      enabled: false,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 110
      },
      dynamicAnimation: {
        speed: 300
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "straight",
    width: 2
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    size: 0,
    strokeWidth: 1,
    strokeColors: '#fff',
    strokeOpacity: 0.4,
    hover: {
      size: undefined,
      sizeOffset: 2
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 80, 100]
    }
  },
  xaxis: {
    labels: {
      show: false
    },
    type: "datetime",
    range: 777600000,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      show: false
    },
    // max: 100
  },
  tooltip: {
    enabled: false,
    theme: 'dark'
  }
};
const series = [
  {
    name: 'Course (USD)',
    data: data.slice()
  },
];

let intervalTimer = null;

function intervals() {
  intervalTimer = setInterval(function () {
    getNewSeries(lastDate, {
      min: 10,
      max: 90
    });

    realtimeChart.value.updateSeries([
      {
        data: data
      }
    ]);
  }, 2000);

  // every 60 seconds, we reset the data
  window.setInterval(function () {
    resetData();
    realtimeChart.value.updateSeries(
        [
          {
            data
          }
        ],
        false,
        true
    );
  }, 60000);
}

onUpdated(() => {

  if (props.reset === true) {
    realtimeChart.value.updateOptions({
      markers: {
        size: 0,
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        range: 777600000
      },
    }, false, true)
    realtimeChart.value.updateSeries([{data}], false, true);
    intervals();

    /*let i = 0;
    let interval = setInterval(() => {
      let item = newValue.points[i];

      console.log(item, 'ITEM')

      data.push({
        x: lastDate,
        y: item.close
      })
      lastDate += 86400000;
      i++;
      if (i === newValue.points.length) clearInterval(interval);

      realtimeChart.value.updateSeries([{data}], false, true);
    }, 1150)*/
  }
})

onMounted(() => {
  watch(() => _.cloneDeep(props.items.points), (newValue, oldValue) => {

    clearInterval(intervalTimer);

    realtimeChart.value.updateOptions({
      markers: {
        size: 3,
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        range: 518400000
      },
    }, false, true)

    const data = []
    let lastDate = new Date("11 Feb 2017 GMT").getTime();

    realtimeChart.value.updateSeries([{data}], false, true);

    /*newValue.forEach(item => {
      data.push({
        x: lastDate,
        y: item.close
      })
      lastDate += 86400000;
    })

    realtimeChart.value.updateSeries([{data}], false, true);*/

    let i = 0;
    let interval = setInterval(() => {
      let item = newValue[i];

      data.push({
        x: lastDate,
        y: item.close
      })
      lastDate += 86400000;
      i++;
      if (i === newValue.length) clearInterval(interval);

      realtimeChart.value.updateSeries([{data}], false, true);
    }, 1150)
  })

  intervals();
})

</script>

<style scoped>
  .vue-apexcharts {
    transform: translateY(-15px);
  }
</style>
