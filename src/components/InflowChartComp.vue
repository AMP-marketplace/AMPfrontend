<template>
  <div ref="chart" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

let props = defineProps({
  chartdata: Object,
});

const chart = ref(null);
let myChart;

onMounted(() => {
  myChart = echarts.init(chart.value);

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Sales Earnings", "Other Inflows"],
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Sales Earnings",
        type: "line",
        data: [
          1000, 2000, 1500, 3000, 2000, 2500, 4000, 3000, 4500, 5000, 6000,
          7000,
        ],
        itemStyle: { color: "#42A5F5" },
        lineStyle: { color: "#42A5F5" },
      },
      {
        name: "Other Inflows",
        type: "line",
        data: [
          500, 1000, 750, 1500, 1000, 1250, 2000, 1500, 2250, 2500, 3000, 3500,
        ],
        itemStyle: { color: "#66BB6A" },
        lineStyle: { color: "#66BB6A" },
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", myChart.resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", myChart.resize);
  myChart.dispose();
});
</script>
