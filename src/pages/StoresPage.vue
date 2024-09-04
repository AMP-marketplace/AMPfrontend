v
<template>
  <div class="q-my-xl">
    <div class="container">
      <div class="row items-center search_wrap no-wrap justify-between">
        <h4 class="bigText">Shop/Store</h4>
        <div class="search_input">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search stores"
          />
          <q-btn flat no-caps no-wrap></q-btn>
        </div>
      </div>

      <div>
        <div class="stores_list q-mb-xl">
          <q-item>MedSolutions </q-item>
          <q-item>MedEquipments </q-item>
          <!-- <q-item v-for="(stores, index) in categoryListArr" :key="index"
            >{{ stores.name }}
          </q-item> -->
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
          v-if="!loadingProducts && filteredStores.length !== 0"
          class="stores_wrap"
        >
          <div v-for="store in filteredStores" class="" :key="store.id">
            <StoresComp :storeData="store" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import { computed, onMounted, ref } from "vue";
import StoresComp from "../components/StoresComp.vue";

let loading = ref(false);
let storesArr = ref([]);
let categoryListArr = ref([]);
let searchQuery = ref("");
let loadingProducts = ref(true);

const filteredStores = computed(() => {
  let filtered = [...storesArr.value];

  // Searching
  if (searchQuery.value.trim() !== "") {
    filtered = filtered.filter((store) =>
      store.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

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
  // getCategories();
});
</script>

<style lang="scss" scoped></style>
