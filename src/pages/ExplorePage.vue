v
<template>
  <div class="q-mt-xl">
    <div class="container">
      <p id="scroll" class="q-my-sm text-center">
        <strong> Dear exteemed customers note:</strong> Prices are in USD, but
        you can view the equivalent in your local currency. Also
        <strong>NOTE:</strong> that on checkout you will be able to view total
        in your local currency and process payments in either NGN or USD.
      </p>
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md"></h4>
        <div class="search_input">
          <input
            v-model="filters.searchTerm"
            type="text"
            @input="applyFilters"
            placeholder="Search products"
          />
          <q-btn flat class="bg-primary text-white" rounded no-caps no-wrap
            ><i class="fa-solid fa-search"></i
          ></q-btn>
        </div>
      </div>

      <div class="q-mt-lg">
        <div class="explore_wrapper">
          <div class="left">
            <div class="row items-center no-wrap">
              <h4 class="bigText q-pa-sm q-mb-md">MarketPlace</h4>
            </div>

            <div class="explore_categories">
              <div>
                <div class="row items-center q-mt-md justify-between">
                  <h6 class="text-h5">Filters</h6>
                  <q-btn
                    color="white"
                    text-color="black"
                    @click="clearAllFilters"
                    no-wrap
                    no-caps
                    >Clear filter</q-btn
                  >
                </div>

                <!-- Filters -->
                <div class="input_wrap">
                  <div class="input">
                    <select v-model="filters.country" @change="applyFilters">
                      <option value="">All Countries</option>
                      <option
                        v-for="(country, index) in countries"
                        :key="index"
                        :value="country.name"
                      >
                        {{ country.flag }} {{ country.name }}
                      </option>
                      <!-- Add more countries -->
                    </select>
                  </div>
                </div>

                <!-- Price Filter -->
                <div class="input_wrap">
                  <label for="min-price">Min Price:</label>
                  <div class="input">
                    <input
                      type="text"
                      v-model="minPrice"
                      @input="applyFilter('minPrice', minPrice)"
                      placeholder="Enter minimum price"
                    />
                  </div>
                </div>
                <div class="input_wrap">
                  <label for="max-price">Max Price:</label>
                  <div class="input">
                    <input
                      type="text"
                      v-model="maxPrice"
                      @input="applyFilter('maxPrice', maxPrice)"
                      placeholder="Enter maximum price"
                    />
                  </div>
                </div>
                <!-- Date Range Filter -->
                <div class="input_wrap">
                  <label for="date-sort">Sort by Date:</label>
                  <div class="input">
                    <select v-model="dateSortOrder" @change="applyDateSort">
                      <option value="newest">Newest to Oldest</option>
                      <option value="oldest">Oldest to Newest</option>
                    </select>
                  </div>
                </div>

                <div class="input_wrap">
                  <!-- Sort Options -->
                  <label>Other options</label>
                  <div class="input">
                    <select v-model="sortOption" @change="applySorting">
                      <option value="relevance">Relevance</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </div>
                </div>
              </div>
              <h6 class="text-h5 q-mb-md">Category</h6>
              <div>
                <p class="text-weight-bold">MedEquipments</p>
                <div class="q-mt-md" v-if="loading">
                  <q-skeleton height="100px" />
                </div>
                <q-list v-else>
                  <q-item
                    clickable
                    v-for="(cat, index) in medSolutionscategoryListArr"
                    :key="index"
                  >
                    {{ cat.name }}
                  </q-item>
                </q-list>
              </div>
              <div class="q-mt-md">
                <p class="text-weight-bold">MedComponents</p>
                <div class="q-mt-md" v-if="loading">
                  <q-skeleton height="100px" />
                </div>
                <q-list v-else>
                  <q-item
                    clickable
                    v-for="(cat, index) in medEquipcategoryListArr"
                    :key="index"
                  >
                    {{ cat.name }}
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
          <div class="q-pb-lg">
            <div style="gap: 1rem" class="row items-center no-wrap">
              <q-btn
                class="expand_cats"
                dense
                round
                unelevated
                color="accent"
                icon="chevron_right"
                @click="drawer = !drawer"
              />
              <!-- <q-btn-dropdown outline label="Sort by">
                <q-list>
                  <q-item
                    :class="
                      selectedSort === 'name' ? 'bg-primary text-white' : ''
                    "
                    clickable
                    v-close-popup
                    @click="setSortParam('name')"
                  >
                    <q-item-section>
                      <q-item-label>Name</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    :class="
                      selectedSort === 'price' ? 'bg-primary text-white' : ''
                    "
                    clickable
                    v-close-popup
                    @click="setSortParam('price')"
                  >
                    <q-item-section>
                      <q-item-label>Price</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    :class="
                      selectedSort === 'date' ? 'bg-primary text-white' : ''
                    "
                    clickable
                    v-close-popup
                    @click="setSortParam('date')"
                  >
                    <q-item-section>
                      <q-item-label>Date</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown> -->
            </div>
            <div
              v-if="productStore.loadingProducts"
              class="q-pa-md responsive_grid"
            >
              <div v-for="n in 4" :key="n">
                <q-card
                  v-if="productStore.loadingProducts"
                  flat
                  style="max-width: 300px"
                >
                  <q-skeleton height="150px" square />

                  <q-card-section>
                    <q-skeleton type="text" class="text-subtitle1" />
                    <q-skeleton
                      type="text"
                      width="50%"
                      class="text-subtitle1"
                    />
                    <q-skeleton type="text" class="text-caption" />
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div
              v-if="
                !productStore.loadingProducts && sortedProducts.length !== 0
              "
              class="responsive_grid q-mt-lg"
            >
              <div v-for="(product, index) in sortedProducts" :key="index">
                <ProductComp :product="product" />
              </div>
            </div>

            <div class="row justify-center q-mt-xl q-pa-md">
              <q-pagination
                v-if="totalItems > rowsPerPage"
                :model-value="currentPage"
                :max="lastPage"
                :rows-per-page="rowsPerPage"
                boundary-numbers
                @update:model-value="handlePageChange"
              />

              <!-- <q-spinner-rings v-if="showSpinner" color="primary" size="2em" /> -->
              <q-spinner-hourglass
                v-if="showSpinner"
                color="primary"
                size="4em"
              />
            </div>
            <div
              v-if="
                !productStore.loadingProducts && sortedProducts.length === 0
              "
              class="column items-center text-center justify-center"
            >
              <img
                style="width: 308.001px; height: 204.304px"
                src="../assets/box.png"
                alt=""
              />
              <p class="smallText q-my-lg">No products</p>
            </div>
          </div>
          <!-- <div class="stores_wrap">
            <div v-for="n in 10" class="" :key="n">
              <ProductsComp />
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
  <q-drawer
    v-model="drawer"
    :width="250"
    :breakpoint="800"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <div class="explore_categories">
        <div>
          <div class="row q-mt-md items-center justify-between">
            <h6 class="text-h5">Filters</h6>
            <q-btn
              color="white"
              text-color="black"
              @click="clearAllFilters"
              no-wrap
              no-caps
              >Clear filter</q-btn
            >
          </div>
          <!-- Filters -->
          <div class="input_wrap">
            <div class="input">
              <select v-model="filters.country" @change="applyFilters">
                <option value="">All Countries</option>
                <option
                  v-for="(country, index) in countries"
                  :key="index"
                  :value="country.name"
                >
                  {{ country.flag }} {{ country.name }}
                </option>
                <!-- Add more countries -->
              </select>
            </div>
          </div>

          <!-- Price Filter -->
          <div class="input_wrap">
            <label for="min-price">Min Price:</label>
            <div class="input">
              <input
                type="text"
                v-model="minPrice"
                @input="applyFilter('minPrice', minPrice)"
                placeholder="Enter minimum price"
              />
            </div>
          </div>
          <div class="input_wrap">
            <label for="max-price">Max Price:</label>
            <div class="input">
              <input
                type="text"
                v-model="maxPrice"
                @input="applyFilter('maxPrice', maxPrice)"
                placeholder="Enter maximum price"
              />
            </div>
          </div>
          <!-- Date Range Filter -->
          <div class="input_wrap">
            <label for="date-sort">Sort by Date:</label>
            <div class="input">
              <select v-model="dateSortOrder" @change="applyDateSort">
                <option value="newest">Newest to Oldest</option>
                <option value="oldest">Oldest to Newest</option>
              </select>
            </div>
          </div>

          <div class="input_wrap">
            <!-- Sort Options -->
            <label>Other options</label>
            <div class="input">
              <select v-model="sortOption" @change="applySorting">
                <!-- <option value="relevance">Relevance</option> -->
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
        <h6 class="text-h5 text-weight-bold q-mb-md">Category</h6>
        <p class="text-weight-bold">MedEquipments</p>
        <div class="q-mt-md" v-if="loading">
          <q-skeleton height="100px" />
        </div>
        <q-list v-else>
          <q-item
            clickable
            v-for="(cat, index) in medSolutionscategoryListArr"
            :key="index"
          >
            {{ cat.name }}
          </q-item>
        </q-list>
        <p class="text-weight-bold">MedComponents</p>
        <div class="q-mt-md" v-if="loading">
          <q-skeleton height="100px" />
        </div>
        <q-list v-else>
          <q-item
            clickable
            v-for="(cat, index) in medEquipcategoryListArr"
            :key="index"
          >
            {{ cat.name }}
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>

    <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
  </q-drawer>
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { computed, onMounted, ref } from "vue";

import ProductComp from "../components/ProductComp.vue";
import FooterCompVue from "src/components/FooterComp.vue";

import { useProductStore } from "src/stores/productStore";
import countries from "app/countries";
import { useRoute } from "vue-router";
import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Africa Medical Marketplace",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Explore Products`,

  // meta tags
  meta: {
    description: {
      name: "description",
      content:
        "At Africa Medical Marketplace, we are dedicated to facilitating access to quality and affordable healthcare solutions across Africa’s diverse communities. Our platform serves as a bridge, connecting global manufacturers, distributors, and suppliers with healthcare professionals and institutions across all 54 countries of Africa. We are committed to democratizing healthcare access, ensuring that even those at the grassroots level can access essential medical supplies and services. Through our user-friendly platform and dedication to social responsibility, we strive to make a positive impact on healthcare delivery and improve the lives of individuals across the continent",
    },
    keywords: {
      name: "keywords",
      content:
        "Africa Medical Marketplace, Medical Equipments, X-ray Machine, Africa products",
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Africa Medical Marketplace`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};

useMeta(metaData);
let route = useRoute();
let productStore = useProductStore();
// let loadingProducts = ref(true);
let loading = ref(true);
let prodListArr = ref([]);
let medSolutionscategoryListArr = ref([]);
let medEquipcategoryListArr = ref([]);
const selectedSort = ref("name");
const searchQuery = ref("");
const drawer = ref(false);
let showSpinner = ref(false);
const getProducts = async () => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get("products/index/all");
    console.log(prodList);
    prodListArr.value = prodList.data.data.products;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};
const getCategories = async () => {
  try {
    loading.value = true;
    let medsolutionsCatList = await authAxios.get(
      "data?fetch=subcategories&category=medequipments"
    );
    let medComponentsCatList = await authAxios.get(
      "data?fetch=subcategories&category=medcomponents"
    );

    medSolutionscategoryListArr.value = medsolutionsCatList.data.data;
    medEquipcategoryListArr.value = medComponentsCatList.data.data;
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

const selectedCurrency = computed(() => productStore.selectedCurrency);
const filters = computed(() => productStore.filters);
// const sortOption = computed(() => productStore.sortOption);
const sortedProducts = computed(() => productStore.sortedProducts);

const changeCurrency = (event) => {
  productStore.setCurrency(event.target.value);
};
// Bind filters and sorted products from the store
const minPrice = ref("");
const maxPrice = ref("");
const dateSortOrder = ref(productStore.filters.dateSortOrder);
const sortOption = ref(productStore.sortOption);

// Function to apply filters
const applyFilter = (filterType, value) => {
  productStore.setFilter(filterType, value);
};

// Function to apply date sorting
const applyDateSort = () => {
  productStore.setFilter("dateSortOrder", dateSortOrder.value);
};

const applyFilters = () => {
  productStore.setFilter("country", filters.value.country);
  productStore.setFilter("category", filters.value.category);
  productStore.setFilter("priceRange", filters.value.priceRange);
  productStore.setFilter("searchTerm", filters.value.searchTerm);
  productStore.setFilter("dateRange", filters.value.dateRange);
  productStore.setFilter("nameFilter", filters.value.nameFilter);
};

const applySorting = () => {
  productStore.setSortOption(sortOption.value);
};

const convertedPrice = (price) => {
  return (price * productStore.exchangeRates[selectedCurrency.value]).toFixed(
    2
  );
};
const clearAllFilters = () => {
  productStore.clearFilters();
};

// Reactive state from the store
const products = computed(() => productStore.products);
const loadingProducts = computed(() => productStore.loadingProducts);
const totalItems = computed(() => productStore.totalItems);
const rowsPerPage = computed(() => productStore.rowsPerPage);
const currentPage = computed(() => productStore.currentPage);
const lastPage = computed(() => productStore.lastPage);

// Paginated products
const paginatedProducts = computed(() => products.value);

// Handle page change
const handlePageChange = async (page) => {
  console.log(page);
  if (page !== currentPage.value) {
    const url = `products/index/all?products=${page}`;
    // const url = `products/index/all?perPage=${rowsPerPage.value}&page=${page}`;
    showSpinner.value = true;
    await productStore.fetchProducts(url, true); // Reset products on page change
    // Loading.hide();
    showSpinner.value = false;
    document.getElementById("scroll").scrollIntoView({ behavior: "smooth" });
  }
};
onMounted(() => {
  getCategories();
  productStore.products = [];
  productStore.loadingProducts = true;
  // productStore.fetchProducts();
  productStore.fetchProducts(undefined, true);
  // if (productStore.products.length) {
  //   return;
  // } else {
  //   productStore.fetchProducts();
  // }

  if (route.query.search) {
    filters.value.searchTerm = route.query.search;
  }
});
</script>

<style lang="scss" scoped></style>
