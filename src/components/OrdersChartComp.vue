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
      data: ["Orders"],
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
        name: "Orders",
        type: "bar",
        data: [120, 200, 150, 80, 70, 110, 130, 150, 200, 220, 250, 300],
        itemStyle: { color: "#FF7043" },
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
