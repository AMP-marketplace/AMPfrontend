<template>
  <div class="product_card">
    <div class="row items-center q-my-sm justify-between">
      <div>
        <q-badge class="q-mr-sm" color="orange" text-color="black"
          ><i class="ri-check-line text-white"></i
        ></q-badge>
        <span class="cat_text">
          {{ product?.subcategory?.name }}
        </span>
      </div>
      <div>
        <q-badge
          rounded
          v-if="product?.condition === 'new'"
          :label="product?.condition"
          class="q-pa-sm new"
        />
        <q-badge
          v-if="product?.condition === 'refurbished'"
          rounded
          :label="product?.condition"
          class="q-pa-sm refurbished"
        />
        <q-badge
          v-if="product?.condition === 'open_box'"
          rounded
          :label="product?.condition"
          class="q-pa-sm open_box"
        />
        <q-badge
          v-if="product?.condition === 'used'"
          rounded
          :label="product?.condition"
          class="q-pa-sm used"
        />
        <q-badge
          v-if="product?.condition === 'damaged'"
          rounded
          :label="product?.condition"
          class="q-pa-sm damaged"
        />
        <q-badge
          v-if="product?.condition === 'pre_owned'"
          rounded
          :label="product?.condition"
          class="q-pa-sm open_box"
        />
      </div>
    </div>

    <div class="main">
      <router-link
        :to="{
          name:
            store.role === 'merchant' && route.name === 'account.dashboard'
              ? 'product.detail'
              : 'user.product.detail',

          query: {
            name: product?.name,
            slug: product?.slug,
            id: product?.id,
          },
        }"
      >
        <img
          :src="product?.media?.length ? product?.media[0]?.url : ''"
          :alt="product?.name"
        />
      </router-link>
    </div>
    <div style="gap: 0.5rem" class="row justify-end items-center no-wrap">
      <q-btn
        no-caps
        class="addtocart q-mt-sm"
        no-wrap
        v-if="store.role !== 'merchant'"
        @click="cartStore.addTocart(product)"
        color="primary"
        >Add to cart <i class="fa-solid q-ml-sm fa-cart-shopping"></i
      ></q-btn>

      <q-btn
        v-if="
          store.storedetails.id === product?.merchant?.id &&
          route.name === 'account.dashboard'
        "
        :to="{
          name: 'product.detail',
          query: {
            id: product?.id,
            slug: product?.slug,
          },
        }"
        flat
        ><i class="fa-solid fa-pen-to-square"></i
      ></q-btn>
    </div>
    <div class="content q-mt-sm">
      <p class="text-grey-7">{{ product?.subcategory?.name }}</p>
      <router-link
        :to="{
          name:
            store.role === 'merchant' && route.name === 'account.dashboard'
              ? 'product.detail'
              : 'user.product.detail',

          query: {
            name: product?.name,
            slug: product?.slug,
            id: product?.id,
          },
        }"
      >
        <h6 class="text-body1 text-weight-bold">{{ product.name }}</h6>
      </router-link>
      <div>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-map-pin-line text-h6 text-grey-7"></i>
          <span class="text-grey-7"> {{ product?.country }} </span>
          <span>{{ getCountryFlag(product?.country) }}</span>
          <!-- <img
            style="width: 30px"
            :src=""
            alt=""
          /> -->
        </p>
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-time-line text-h6 text-grey-7"></i>
          <span class="text-grey-7">
            {{ product?.created_at ? formatDate() : "" }}
          </span>
        </p>
        <p
          v-if="product?.is_negotiable"
          style="gap: 0.6rem"
          class="row items-center no-wrap"
        >
          <i class="ri-shake-hands-line text-h6 text-grey-7"></i>
          <span class="text-grey-7"> Negotiable: YES </span>
        </p>
        <!-- <p style="gap: 0.6rem" class="row text-grey-7 items-center no-wrap">
          <i class="ri-arrow-left-up-fill text-h6"></i>
          <span class="text-grey-7"> Sell </span>
        </p> -->
        <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-eye-line text-h6 text-grey-7"></i>
          <span class="text-grey-7">{{ product?.views }} Views </span>
        </p>
      </div>

      <p class="text-blue-10 q-mt-md text-h6 text-weight-bold">
        {{ getCountryCurrencySymbol(product?.country) }}
        {{
          product?.price?.minimum_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
        <span v-if="product?.price?.maximum_price !== '1'"> -</span>
        <span v-if="product?.price?.maximum_price !== '1'">
          {{ getCountryCurrencySymbol(product?.country)
          }}{{
            product?.price?.maximum_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { useCartStore } from "src/stores/cart";
import { useRoute } from "vue-router";
import { formatDistanceToNow, parseISO } from "date-fns";
let route = useRoute();
let store = useMyAuthStore();
let cartStore = useCartStore();
import currencies from "app/currencies";
import countries from "app/countries";

let props = defineProps({
  product: Object,
});

function formatDate() {
  const date = parseISO(props.product?.created_at);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return formattedDate;
}
function getCountryFlag(countryName) {
  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName?.toLowerCase()
  );
  return country ? country.flag : "🏳️"; // Return white flag if country not found
}
function getCountryCurrencySymbol(countryName) {
  const country = currencies.find(
    (c) => c.code.toLowerCase() === props?.product?.currency?.toLowerCase()
  );
  return country ? country.symbol : ""; // Return white flag if country not found
}
</script>

<style lang="scss" scoped></style>
