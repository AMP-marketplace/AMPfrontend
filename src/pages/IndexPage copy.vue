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
        <q-infinite-scroll @load="loadMoreProducts" :offset="calculatedOffset">
          <div class="responsive_grid q-mt-md">
            <ProductCompVue
              :product="product"
              v-for="(product, index) in productStore.products"
              :key="index"
            />
          </div>
          <div
            v-if="productStore.noMoreData"
            class="no-more-data row q-mt-lg justify-center"
          >
            No more products to load.
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
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

    <section class="sponsors">
      <div class="container">
        <div>
          <h4 class="text-h5 text-center text-weight-bold">
            OUR PROUD SPONSORS
          </h4>
        </div>
        <div class="responsive_grid q-mt-lg sponsors">
          <div>
            <img
              style="max-width: 300px; width: 300px"
              src="/images/sponsor.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              style="max-width: 300px; width: 300px"
              src="/images/sponsor1.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              style="max-width: 300px; width: 300px"
              src="/images/sponsor2.jpg"
              alt=""
            />
          </div>
          <div>
            <img src="/images/mtn.png" alt="" />
          </div>
          <div>
            <img src="/images/fate.png" alt="" />
          </div>
          <div>
            <img src="/images/flourish.png" alt="" />
          </div>
          <!-- <div>
            <img src="/images/ahk.png" alt="" />
          </div> -->
          <div>
            <img src="/images/ihk.png" alt="" />
          </div>
          <div>
            <img src="/images/vertebra.png" alt="" />
          </div>
          <div>
            <img src="/images/rocat.svg" alt="" />
          </div>
          <div>
            <img src="/images/msi.svg" alt="" />
          </div>
          <div>
            <img src="/images/razer.svg" alt="" />
          </div>
          <div>
            <img src="/images/therma.svg" alt="" />
          </div>
          <div>
            <img src="/images/adata.svg" alt="" />
          </div>
          <div>
            <img src="/images/hp.svg" alt="" />
          </div>
          <div>
            <img src="/images/giga.svg" alt="" />
          </div>
        </div>
      </div>
    </section>

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
import ProductCompVue from "src/components/ProductComp.vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMyAuthStore } from "src/stores/auth";
useI18n();
let productStore = useProductStore();
let store = useMyAuthStore();
let loadingProducts = ref(true);
let watchAStoreModal = ref(false);
const productsArr = ref([]);
const searchTerm = ref("");
let disableInfiniteScroll = ref(false);

const calculatedOffset = window.innerHeight * 1;
const loadMoreProducts = (index, done) => {
  console.log("trying to load more");
  console.log(productStore.nextPageUrl);
  if (productStore.nextPageUrl) {
    productStore.fetchProducts(productStore.nextPageUrl);
  }

  // Call done when loading is complete
  done();
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
  productStore.fetchProducts();
});
</script>
