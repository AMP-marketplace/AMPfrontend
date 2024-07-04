<template>
  <div class="product_card">
    <div class="row items-center q-my-sm justify-between">
      <div>
        <q-badge color="orange" text-color="black"
          ><i class="ri-check-line text-white"></i
        ></q-badge>
        {{ product.category }}
      </div>
      <div>
        <q-badge rounded color="orange" label="New" class="q-pa-sm" />
      </div>
    </div>

    <div class="main">
      <img :src="product.img" :alt="product.name" />
    </div>

    <div class="content q-mt-sm">
      <p class="text-grey-7">{{ product.category }}</p>
      <h6 class="text-body1 text-weight-bold">{{ product.name }}</h6>
      <div>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-map-pin-line text-h6 text-grey-7"></i>
          <span class="text-grey-7"> {{ product.location }} </span>
          <img style="width: 30px" :src="product.flag" alt="" />
        </p>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-time-line text-h6 text-grey-7"></i>
          <span class="text-grey-7"> {{ product.posted }} </span>
        </p>
        <p style="gap: 0.6rem" class="row text-grey-7 items-center no-wrap">
          <i class="ri-arrow-left-up-fill text-h6"></i>
          <span class="text-grey-7"> Sell </span>
        </p>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-eye-line text-h6 text-grey-7"></i>
          <span class="text-grey-7">{{ product.views }} Views </span>
        </p>
      </div>

      <p class="text-blue-10 q-mt-md text-h6 text-weight-bold">
        ${{ product.amount }}
      </p>
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  product: Object,
});
</script>

<style lang="scss" scoped></style>
