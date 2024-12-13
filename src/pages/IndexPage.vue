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
      <q-card>
        <q-video
          style="height: 250px"
          src="https://res.cloudinary.com/dvs0cchst/video/upload/v1725036270/Emmy_slides_1_ekfp6n.mp4"
        />
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
useI18n();
let productStore = useProductStore();
let store = useMyAuthStore();
let watchAStoreModal = ref(false);
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
