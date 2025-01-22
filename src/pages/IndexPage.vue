<template>
  <q-page class="">
    <section>
      <div class="hero">
        <div class="container">
          <p class="text text-white">
            <q-badge color="white" rounded class="q-mr-sm" />Where Convenience
            Meets Efficiency
          </p>
          <h1 class="text-h3">
            #1 Marketplace to Buy & Sell Medical Equipment in Africa
          </h1>

          <div class="q-mt-lg">
            <div class="input_wrap">
              <div class="input">
                <input
                  type="text"
                  v-model="searchTerm"
                  placeholder="Eg: defibrillators, apnea monitors, etc"
                />
                <q-btn
                  :to="{
                    name: 'explore',
                    query: {
                      search: searchTerm,
                    },
                  }"
                  color="secondary"
                  rounded
                  no-caps
                  no-wrap
                >
                  Search >>
                </q-btn>
              </div>
            </div>

            <div
              style="gap: 1rem"
              class="q-mt-lg hero_btns row nav_wrap items-center no-wrap"
            >
              <small class="text-white">Trending:</small>
              <q-btn :to="{ name: 'explore' }" color="white" outline rounded>
                All
              </q-btn>
              <q-skeleton
                v-if="productStore.loadingProducts"
                height="30px"
                width="100px"
                square
              />
              <q-btn
                v-else
                v-for="prod in productStore.products.slice(0, 4)"
                :key="prod.id"
                color="white"
                outline
                class="btnsx"
                rounded
                :to="{
                  name: 'user.product.detail',

                  query: {
                    name: prod?.name,
                    slug: prod?.slug,
                    id: prod?.id,
                  },
                }"
              >
                {{ prod.name }}
              </q-btn>
              <!-- <q-btn color="white" outline rounded> Dental </q-btn>
              <q-btn color="white" outline rounded> Hermodialysis </q-btn>
              <q-btn color="white" outline rounded> Laboratory </q-btn> -->
            </div>

            <div class="row justify-end q-mt-xl">
              <q-btn
                @click="watchAStoreModal = !watchAStoreModal"
                color="white"
                outline
                rounded
                class="q-py-sm q-px-xl"
              >
                Watch a story
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="scroll"></div>
    <section class="new_products section">
      <div class="container">
        <div class="row items-center justify-between">
          <h4 class="text-h6 text-weight-bold">New Products</h4>
          <div>
            <router-link class="text_underline" :to="{ name: 'explore' }"
              >See All New Products</router-link
            >
          </div>
        </div>
        <div
          v-if="productStore.loadingProducts"
          class="responsive_grid q-mt-md"
        >
          <div v-for="n in 3" :key="n">
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

        <div class="responsive_grid q-mt-md">
          <ProductCompVue
            :product="product"
            v-for="(product, index) in productStore.products"
            :key="index"
          />
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
          <q-spinner-hourglass v-if="showSpinner" color="primary" size="4em" />
        </div>
        <div
          v-if="productStore.noMoreData"
          class="no-more-data text-weight-bold row q-mt-lg justify-center"
        >
          No more products to load.
        </div>

        <!-- <q-infinite-scroll @load="loadMoreProducts" :offset="600">
          <div class="responsive_grid q-mt-md">
            <ProductCompVue
              :product="product"
              v-for="(product, index) in productStore.products"
              :key="index"
            />
          </div>
          <div
            v-if="productStore.noMoreData"
            class="no-more-data text-weight-bold row q-mt-lg justify-center"
          >
            No more products to load.
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll> -->
        <!-- <q-infinite-scroll
          :handler="loadMoreProducts"
          :offset="100"
          :disable="productStore.noMoreData || productStore.loadingProducts"
        >
          <div v-if="productStore.loadingProducts" class="row justify-center">
            <q-spinner size="20px" color="primary" />
          </div>
          <div v-else-if="productStore.noMoreData" class="no-more-data">
            No more products to load.
          </div>
        </q-infinite-scroll> -->
      </div>
    </section>

    <SponsorsCompVue />
    <FooterCompVue />

    <q-dialog v-model="watchAStoreModal">
      <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/F5ybNKruzts?si=jyk-09p9k8WrbGf_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
      <q-card>
        <q-carousel animated v-model="videoSlide" infinite>
          <q-carousel-slide :name="1">
            <q-video
              class="absolute-full"
              src="https://www.youtube.com/embed/F5ybNKruzts?si=jyk-09p9k8WrbGf_"
            />
          </q-carousel-slide>

          <q-carousel-slide :name="2">
            <q-video
              class="absolute-full"
              src="https://res.cloudinary.com/dvs0cchst/video/upload/v1725036270/Emmy_slides_1_ekfp6n.mp4"
            />
          </q-carousel-slide>
        </q-carousel>
        <div class="row q-mt-lg justify-center">
          <q-btn-toggle
            glossy
            v-model="videoSlide"
            :options="[
              { label: 'Know more', value: 1 },
              { label: 'Explore new features', value: 2 },
            ]"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { useProductStore } from "src/stores/productStore";
import FooterCompVue from "src/components/FooterComp.vue";
import SponsorsCompVue from "src/components/SponsorsComp.vue";
import ProductCompVue from "src/components/ProductComp.vue";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMyAuthStore } from "src/stores/auth";
import { Loading, QSpinnerRings } from "quasar";
import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Africa Medical Marketplace",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Home`,

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
useI18n();

let productStore = useProductStore();
let store = useMyAuthStore();
let watchAStoreModal = ref(false);
let videoSlide = ref(1);
const productsArr = ref([]);
const searchTerm = ref("");
let disableInfiniteScroll = ref(false);
let showSpinner = ref(false);

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

const getProducts = () => {
  authAxios
    .get("products/index/all")
    .then((response) => {
      console.log(response);
      productsArr.value = response.data.data.products;
      loadingProducts.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loadingProducts.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
onMounted(() => {
  // getProducts();
  productStore.fetchProducts(undefined, true);
});
</script>

<style scoped>
/* Add styles for your loading spinner, product grid, and cards */
.loading-spinner {
  text-align: center;
  padding: 20px;
}

.no-products {
  text-align: center;
  color: #666;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
</style>
