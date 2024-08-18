<template>
  <div>
    <div class="grid">
      <div class="">
        <InflowChart :chartdata="inflowData" />
      </div>
      <div class="">
        <OrdersChart :chartdata="ordersData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import InflowChart from "src/components/InflowChartComp.vue";
import OrdersChart from "src/components/OrdersChartComp.vue";
const inflowData = {}; // Pass your actual inflow data here
const ordersData = {}; // Pass your actual orders data here
</script>

<style lang="scss" scoped></style>
