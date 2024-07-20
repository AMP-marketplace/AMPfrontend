<template>
  <div class="product_card">
    <div class="row items-center q-my-sm justify-between">
      <div>
        <q-badge color="orange" text-color="black"
          ><i class="ri-check-line text-white"></i
        ></q-badge>
        {{ product.subcategory.name }}
      </div>
      <div>
        <q-badge rounded color="orange" label="New" class="q-pa-sm" />
      </div>
    </div>

    <div class="main">
      <router-link
        :to="{
          name:
            store.role === 'merchant'
              ? 'product.detail'
              : 'user.product.detail',

          query: {
            name: product.name,
            slug: product.slug,
            id: product.id,
          },
        }"
      >
        <img
          :src="product.media.length ? product.media[0].url : ''"
          :alt="product.name"
        />
      </router-link>
    </div>
    <div style="gap: 0.5rem" class="row justify-end items-center no-wrap">
      <q-btn
        no-caps
        class="addtocart"
        no-wrap
        v-if="store.role !== 'merchant'"
        @click="cartStore.addTocart(product)"
        color="primary"
        >Add to cart <i class="fa-solid q-ml-sm fa-cart-shopping"></i
      ></q-btn>

      <q-btn
        v-if="
          store.storedetails.id === product.merchant.id &&
          route.name === 'account.dashboard'
        "
        :to="{
          name: 'product.detail',
          query: {
            id: product.id,
          },
        }"
        flat
        ><i class="fa-solid fa-pen-to-square"></i
      ></q-btn>
    </div>
    <div class="content q-mt-sm">
      <p class="text-grey-7">{{ product.subcategory.name }}</p>
      <router-link
        :to="{
          name:
            store.role === 'merchant'
              ? 'product.detail'
              : 'user.product.detail',

          query: {
            name: product.name,
            slug: product.slug,
            id: product.id,
          },
        }"
      >
        <h6 class="text-body1 text-weight-bold">{{ product.name }}</h6>
      </router-link>
      <div>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-map-pin-line text-h6 text-grey-7"></i>
          <span class="text-grey-7"> {{ product.merchant.country }} </span>
          <span>{{ getCountryFlag(product.currency) }}</span>
          <!-- <img
            style="width: 30px"
            :src=""
            alt=""
          /> -->
        </p>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-time-line text-h6 text-grey-7"></i>
          <span class="text-grey-7"> 2 weeks ago </span>
        </p>
        <p style="gap: 0.6rem" class="row text-grey-7 items-center no-wrap">
          <i class="ri-arrow-left-up-fill text-h6"></i>
          <span class="text-grey-7"> Sell </span>
        </p>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-eye-line text-h6 text-grey-7"></i>
          <span class="text-grey-7">50 Views </span>
        </p>
      </div>

      <p class="text-blue-10 q-mt-md text-h6 text-weight-bold">
        {{ getCountryCurrencySymbol(product.currency) }}
        {{
          product.price?.minimum_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
        -
        {{ product.price?.maximum_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { useCartStore } from "src/stores/cart";
import { useRoute } from "vue-router";
let route = useRoute();
let store = useMyAuthStore();
let cartStore = useCartStore();
import currencies from "app/currencies";

let props = defineProps({
  product: Object,
});

function getCountryFlag(countryName) {
  const country = currencies.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  return country ? country.flag : "🏳️"; // Return white flag if country not found
}
function getCountryCurrencySymbol(countryName) {
  const country = currencies.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  return country ? country.symbol : ""; // Return white flag if country not found
}
</script>

<style lang="scss" scoped></style>
