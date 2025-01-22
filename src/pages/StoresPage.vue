<template>
  <div class="q-my-xl">
    <div class="container">
      <div class="row items-center search_wrap no-wrap justify-between">
        <h4 class="bigText">Shop/Store</h4>
        <div class="search_input">
          <input v-model="searchTerm" type="text" placeholder="Search stores" />
          <q-btn flat no-caps no-wrap></q-btn>
        </div>
      </div>

      <div class="explore_wrapper q-mt-xl">
        <div class="left">
          <div class="explore_categories">
            <div>
              <div
                style="gap: 1rem"
                class="row no-wrap items-center q-mt-md justify-between"
              >
                <h6 class="text-h5">Filters</h6>
                <q-btn
                  color="white"
                  text-color="black"
                  @click="clearFilters"
                  no-wrap
                  no-caps
                  >Clear filter</q-btn
                >
              </div>

              <!-- Filters -->
              <div class="input_wrap">
                <div class="input">
                  <select v-model="selectedCountry">
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

              <!-- <div class="input_wrap">
                <label for="date-sort">Sort by Date:</label>
                <div class="input">
                  <select @change="setSortByDate" v-model="sortOrder">
                    <option value="">All</option>
                    <option value="newest">Newest to Oldest</option>
                    <option value="oldest">Oldest to Newest</option>
                  </select>
                </div>
              </div> -->
              <div class="input_wrap">
                <label for="date-sort">Verified Stores:</label>
                <div class="input">
                  <select v-model="verifiedStoresSort">
                    <option value="">All</option>
                    <option value="verified">Verified</option>
                    <option value="not_verified">Not Verified</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div v-if="loadingProducts" class="q-pa-md responsive_grid">
            <div v-for="n in 4" :key="n">
              <q-card flat style="max-width: 300px">
                <q-skeleton height="150px" square />

                <q-card-section>
                  <q-skeleton type="text" class="text-subtitle1" />
                  <q-skeleton type="text" width="50%" class="text-subtitle1" />
                  <q-skeleton type="text" class="text-caption" />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div
            v-if="!loadingProducts && paginatedStores.length !== 0"
            class="stores_wrap"
          >
            <div v-for="store in paginatedStores" class="" :key="store.id">
              <StoresComp :storeData="store" />
            </div>
          </div>

          <div
            v-if="!loadingProducts && paginatedStores.length === 0"
            class="column items-center text-center justify-center"
          >
            <img
              style="width: 308.001px; height: 204.304px"
              src="../assets/box.png"
              alt=""
            />
            <p class="smallText q-my-lg">No stores</p>
          </div>

          <!-- Pagination Controls -->
          <div class="row justify-center q-mt-sm q-pa-md">
            <q-pagination
              v-model="currentPage"
              :max="totalPages"
              boundary-numbers
              class="q-mt-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import countries from "app/countries";
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import { computed, onMounted, ref } from "vue";
import StoresComp from "../components/StoresComp.vue";
import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Africa Medical Marketplace",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Explore Stores`,

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
let loading = ref(false);
let storesArr = ref([]);
let categoryListArr = ref([]);
let searchQuery = ref("");
let loadingProducts = ref(true);

// Filters and Sort Options
const searchTerm = ref("");
const selectedCountry = ref("");
const sortOrder = ref("newest");
const verifiedStoresSort = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Computed property to get the total number of pages
const totalPages = computed(() => {
  return Math.ceil(sortedAndFilteredStores.value.length / itemsPerPage.value);
});

// Computed property to get the stores for the current page
const paginatedStores = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return sortedAndFilteredStores.value.slice(startIndex, endIndex);
});

// Computed property to filter and sort the stores
const sortedAndFilteredStores = computed(() => {
  let filtered = [...storesArr.value];

  // Filter by search term
  if (searchTerm.value) {
    filtered = filtered.filter((store) =>
      store.business_name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  // Filter by country
  if (selectedCountry.value) {
    filtered = filtered.filter(
      (store) => store.country === selectedCountry.value
    );
  }
  if (verifiedStoresSort.value === "verified") {
    filtered = filtered.filter((store) => store.subscription !== null);
  } else if (verifiedStoresSort.value === "not_verified") {
    filtered = filtered.filter((store) => store.subscription === null);
  } else {
    return filtered;
  }

  // Sort by date
  console.log(sortOrder.value);
  if (sortOrder.value) {
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      if (sortOrder.value === "newest") {
        return dateB - dateA; // Newest to oldest
      } else if (sortOrder.value === "oldest") {
        return dateA - dateB; // Oldest to newest
      }
      return 0; // Default case
    });
  }

  return filtered;
});

// const setSortByDate = () =>{
//   sortOrder
// }

// Method to clear all filters
function clearFilters() {
  searchTerm.value = "";
  selectedCountry.value = "";
  sortOrder.value = "newest";
}

const getCategories = async () => {
  try {
    loading.value = true;
    let prodCatList = await authAxios.get("product/category/list");
    categoryListArr.value = prodCatList.data.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
};

const getStores = () => {
  authAxios
    .get("merchant/index/all")
    .then((response) => {
      console.log(response);
      loading.value = false;
      storesArr.value = response.data.data;
      loadingProducts.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

onMounted(() => {
  getStores();
});
</script>

<style lang="scss" scoped></style>
