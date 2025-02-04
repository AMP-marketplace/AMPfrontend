<template>
  <div class="product_card">
    <div class="row items-center q-my-sm justify-between">
      <div class="row items-center no-wrap">
        <q-badge class="q-mr-sm" color="orange" text-color="black"
          ><i class="ri-check-line text-white"></i
        ></q-badge>
        <span class="cat_text">
          {{ product?.subcategory?.name }}
        </span>
      </div>
      <!-- {{ product?.merchant?.user.email }} -->
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
      <!-- :disable="
          !product.price || isNaN(parseFloat(product.price.minimum_price))
        " -->
      <q-btn
        no-caps
        class="addtocart q-mt-sm"
        no-wrap
        v-if="store.storedetails.slug !== product?.merchant.slug"
        @click="cartStore.addTocart(product)"
        color="green-7"
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
            // id: product?.id,
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
            // id: product?.id,
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
        <!-- <p style="gap: 0.6rem" class="row items-center no-wrap">
          <i class="ri-eye-line text-h6 text-grey-7"></i>
          <span class="text-grey-7">{{ product?.views }} Views </span>
        </p> -->
      </div>

      <p
        v-if="product?.price?.minimum_price"
        class="text-blue-10 q-mt-md text-h6 text-weight-bold"
      >
        {{ getCountryCurrencySymbol(product?.country) }}
        {{
          product?.price?.minimum_price
            ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            .replace(/[^\d.]/g, "")
        }}
        <span v-if="product?.price?.maximum_price !== '1'"> -</span>
        <span v-if="product?.price?.maximum_price !== '1'">
          {{ getCountryCurrencySymbol(product?.country)
          }}{{
            product?.price?.maximum_price
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              .replace(/[^\d.]/g, "")
          }}</span
        >
      </p>
      <p
        style="line-height: 1.1"
        v-if="
          !product?.price?.minimum_price && route.name !== 'account.dashboard'
        "
        class="text-blue-10 text-italic q-mt-md text-h6 text-weight-bold"
      >
        <a target="_blank" :href="`mailto:${product?.merchant?.user?.email}`"
          ><small>Contact seller for price details</small></a
        >
      </p>

      <p
        style="gap: 0.7rem"
        class="view_details row justify-between items-center q-mt-md"
      >
        <router-link
          style="text-decoration: underline"
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
          View Details
        </router-link>

        <q-btn
          push
          color="primary"
          no-caps
          no-wrap
          :disable="
            !product.price || isNaN(parseFloat(product.price.minimum_price))
          "
          size="10px"
          label="View price in your currency"
        >
          <q-popup-proxy>
            <q-card class="q-pa-md">
              <div style="margin-top: 0rem" class="auth">
                <div class="input_wrap">
                  <label for="">See price in your currency</label>
                  <div class="input">
                    <select
                      @change="getTotalInCurrency"
                      v-model="showEquivInCurrency"
                      required
                    >
                      <option disabled value="">Choose</option>
                      <option
                        v-for="currency in currencies"
                        :key="currency.name"
                        :value="currency.code"
                      >
                        {{ currency.name }} {{ currency.flag }}
                      </option>
                    </select>
                  </div>
                </div>
                <p class="text-weight-bold text-body1">
                  Product price:
                  <span
                    v-if="product?.price?.minimum_price"
                    class="text-blue-10 q-mt-md text-body2 text-weight-bold"
                  >
                    {{ getCountryCurrencySymbol(product?.country) }}
                    {{
                      product?.price?.minimum_price
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        .replace(/[^\d.]/g, "")
                    }}
                    <span v-if="product?.price?.maximum_price !== '1'"> -</span>
                    <span v-if="product?.price?.maximum_price !== '1'">
                      {{ getCountryCurrencySymbol(product?.country)
                      }}{{
                        product?.price?.maximum_price
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          .replace(/[^\d.]/g, "")
                      }}</span
                    >
                  </span>
                </p>
                <!-- {{ showEquivInCurrency }} -->
                <p
                  v-if="currencyRatesData.rates && showEquivInCurrency"
                  class="q-mt-xs"
                >
                  {{ showEquivInCurrency }} to Dollar rate at this time is
                  <span class="text-green text-weight-bold">
                    {{ showEquivInCurrency }}
                    {{ currencyRatesData?.rates[showEquivInCurrency] }}
                  </span>
                </p>
                <p
                  v-if="currencyRatesData.rates && showEquivInCurrency"
                  class="q-mt-xs"
                >
                  <!-- {{ parseFloat(product?.price?.minimum_price) }} -->
                  Product price in {{ showEquivInCurrency }} is
                  <strong>
                    {{ showEquivInCurrency }}
                    {{
                      (
                        parseFloat(product?.price?.minimum_price) *
                        currencyRatesData?.rates[showEquivInCurrency]
                      ).toLocaleString()
                    }}</strong
                  >
                </p>
              </div>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { useCartStore } from "src/stores/cart";
import { useRoute } from "vue-router";
import { formatDistanceToNow, parseISO } from "date-fns";
import currencies from "app/currencies";
import countries from "app/countries";
import { Loading, QSpinnerRings } from "quasar";
import axios from "axios";
import { ref } from "vue";
let route = useRoute();
let store = useMyAuthStore();
let cartStore = useCartStore();
let showEquivInCurrency = ref("");
let currencyRatesData = ref({});
let props = defineProps({
  product: Object,
});

const getTotalInCurrency = async () => {
  // console.log("first");
  Loading.show({
    spinner: QSpinnerRings,
    spinnerColor: "yellow",
    spinnerSize: 140,
    message: "Fetching, please wait...",
    messageColor: "white",
  });
  let response = await axios.get(
    "https://openexchangerates.org/api/latest.json?app_id=928ab800ac8d4100ae7d72be1fbf3ca0"
  );
  console.log(response);
  currencyRatesData.value = response.data;
  Loading.hide();
};

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
