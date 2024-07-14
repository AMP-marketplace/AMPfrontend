v
<template>
  <div class="q-mt-xl">
    <div class="container">
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md"></h4>
        <div class="search_input">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search stores"
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
              <h4 class="bigText q-pa-sm q-mb-md">Market Place</h4>
            </div>
            <div class="explore_categories">
              <h6 class="smallText q-mb-md">Category</h6>
              <!-- {{ categoryListArr }} -->
              <div class="q-mt-md" v-if="loading">
                <q-skeleton height="100px" />
              </div>
              <q-list v-else>
                <q-item
                  clickable
                  v-for="(cat, index) in categoryListArr"
                  :key="index"
                >
                  {{ cat.name }}
                </q-item>
              </q-list>
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
              <q-btn-dropdown outline label="Sort by">
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
              </q-btn-dropdown>
            </div>
            <div class="q-pa-md responsive_grid">
              <div v-for="n in 4" :key="n">
                <q-card v-if="loadingProducts" flat style="max-width: 300px">
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
    @click.capture="drawer = !drawer"
    :width="250"
    :breakpoint="800"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <div class="explore_categories">
        <h6 class="text-h5 text-weight-bold q-mb-md">Category</h6>
        <div class="q-mt-md" v-if="loading">
          <q-skeleton height="100px" />
        </div>
        <q-list v-else>
          <q-item
            clickable
            v-for="(cat, index) in categoryListArr"
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
import ProductsComp from "../components/ProductsComp.vue";
import FooterCompVue from "src/components/FooterComp.vue";
let loadingProducts = ref(true);
let loading = ref(true);
let prodListArr = ref([]);
let categoryListArr = ref([]);
const selectedSort = ref("name");
const searchQuery = ref("");
const drawer = ref(false);

const filteredProducts = computed(() => {
  let filtered = [...prodListArr.value];

  // Sorting
  if (selectedSort.value === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort.value === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort.value === "date") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Searching
  if (searchQuery.value.trim() !== "") {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});
const setSortParam = (sortParam) => {
  selectedSort.value = sortParam;
};
const getProducts = async () => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get("product/list");
    console.log(prodList);
    prodListArr.value = prodList.data.data;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};
const getCategories = async () => {
  try {
    loading.value = true;
    let prodCatList = await authAxios.get("product/category/list");
    console.log(prodCatList);
    categoryListArr.value = prodCatList.data.data;
    // console.log(categoryListArr.value);
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getCategories();
  getProducts();
});
</script>

<style lang="scss" scoped></style>
