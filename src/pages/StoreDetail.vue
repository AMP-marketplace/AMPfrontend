<template>
  <div class="container q-pb-xl">
    <q-skeleton v-if="loadingProducts" height="150px" />
    <div v-else class="q-mt-lg create_store_2">
      <div>
        <div class="hero">
          <img :src="storeDetails.banner" alt="" />
        </div>
        <div style="gap: 2rem" class="row items-center no-wrap justify-between">
          <div style="gap: 2rem" class="row items-center no-wrap">
            <div>
              <img
                style="
                  width: 200px;
                  height: 200px;
                  object-fit: cover;
                  border-radius: 10px;
                "
                :src="
                  storeDetails.logo
                    ? storeDetails.logo
                    : '/images/mastercard.svg'
                "
                alt=""
              />
            </div>
            <div class="right">
              <h4 class="bigText">{{ storeDetails.name }}</h4>

              <p class="smallText q-my-sm">
                {{ storeDetails.description }}
              </p>

              <small class="text-primary"
                ><i class="fa-solid fa-location-dot"></i>
                {{ storeDetails.address }}</small
              >
            </div>
          </div>
          <div class="search_input">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products"
            />
            <q-btn flat class="bg-primary text-white" rounded no-caps no-wrap
              ><i class="fa-solid fa-search"></i
            ></q-btn>
          </div>
        </div>
        <div class="stores_list q-mb-xl">
          <q-item v-for="(cat, index) in productCategoryListArr" :key="index"
            >{{ cat.name }}
          </q-item>
        </div>
      </div>
    </div>
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
      v-if="!loadingProducts && filteredProducts.length !== 0"
      class="responsive_grid"
    >
      <div v-for="product in filteredProducts" :key="product.id">
        <ProductsComp :product="product" />
      </div>
    </div>
    <div
      v-if="!loadingProducts && filteredProducts.length === 0"
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
  <FooterCompVue />
</template>

<script setup>
import { Loading, Notify, QSpinnerOval } from "quasar";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import { computed, onMounted, ref } from "vue";
import ProductsComp from "src/components/ProductsComp.vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute, useRouter } from "vue-router";
let router = useRouter();
let route = useRoute();
let store = useMyAuthStore();

let searchQuery = ref("");
let coverFile = ref(null);
let loadingProducts = ref(true);
let addProductModal = ref(false);
let productCategoryListArr = ref([]);
let prodListArr = ref([]);
let storeDetails = ref({});

const filteredProducts = computed(() => {
  let filtered = [...prodListArr.value];

  if (searchQuery.value.trim() !== "") {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const getProducts = async () => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get("product/list");
    console.log(prodList);
    prodListArr.value = prodList.data.data.filter(
      (product) => product.store.id === storeDetails.value.id
    );
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};
onMounted(async () => {
  try {
    let storeDataResp = await authAxios.get(`store/show/${route.query.id}`);
    let prodCatList = await authAxios.get("product/category/list");
    console.log(storeDataResp);
    storeDetails.value = storeDataResp.data.data;
    productCategoryListArr.value = prodCatList.data.data;
    getProducts();
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.responsive_grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.search_input {
  padding: 0.5rem 1rem;
  max-width: 400px;
}
</style>
