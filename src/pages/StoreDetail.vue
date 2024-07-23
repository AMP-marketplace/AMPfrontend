<template>
  <div class="container q-pb-xl">
    <q-skeleton v-if="loadingProducts" height="150px" />
    <div v-else class="q-mt-lg create_store_2">
      <div>
        <div class="hero">
          <img :src="storeDetails.banner.url" alt="" />
        </div>
        <div style="gap: 2rem" class="row items-center no-wrap justify-between">
          <div style="gap: 2rem" class="row q-mt-sm items-center no-wrap">
            <div>
              <img
                style="
                  width: 200px;
                  min-width: 200px;
                  height: 200px;
                  object-fit: cover;
                  border-radius: 10px;
                "
                :src="
                  storeDetails.logo
                    ? storeDetails.logo.url
                    : '/images/mastercard.svg'
                "
                alt=""
              />
            </div>
            <div class="right">
              <h4 class="bigText">{{ storeDetails.business_name }}</h4>

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
          <q-item>Med Solutions </q-item>
          <q-item>Med Equipments </q-item>
          <!-- <q-item v-for="(cat, index) in productCategoryListArr" :key="index"
            >{{ cat.name }}
          </q-item> -->
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
        <ProductComp :product="product" />
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

    <q-toolbar id="reviews" class="text-black q-mt-xl">
      <q-toolbar-title>Reviews</q-toolbar-title>
      <q-btn
        class="bg-green-7 text-white"
        no-wrap
        no-caps
        @click="rateModal = !rateModal"
      >
        Add Ratings
      </q-btn>
    </q-toolbar>
    <q-list
      v-if="storeDetails?.reviews?.length"
      class="q-mb-lg"
      separator
      bordered
    >
      <q-item
        v-for="(review, index) in storeDetails?.reviews"
        :key="index"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <img :src="review.media[0].url" alt="" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ review.remark }}</q-item-label>
          <q-item-label caption lines="1"
            >{{ review.author.name }} - {{ review.author.email }}</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-btn v-if="review.is_author" @click="deleteReview(review)">
            Delete
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <div style="margin: 0rem" class="auth">
      <div class="row justify-start q-mb-md">
        <q-rating
          v-model="storeDetails.rating"
          size="2em"
          color="green-7"
          disable
          icon="star_border"
          icon-selected="star"
        />
      </div>
      <div class="text-left q-mb-sm">
        <div class="text-body1">Please kindly leave a review</div>
      </div>

      <form @submit.prevent="uploadReview">
        <div class="input_wrap">
          <div class="input">
            <textarea
              placeholder="Leave a comment"
              v-model="data.remark"
              required
              cols="20"
              rows="5"
            ></textarea>
          </div>

          <div>
            <q-file v-model="data.media" label="Upload review file" />
          </div>
        </div>
        <q-btn
          class="apply bg-primary q-px-xl q-mt-md"
          no-caps
          :loading="loadingReview"
          flat
          type="submit"
          rounded
          text-color="white"
        >
          Submit
        </q-btn>
      </form>
    </div>
  </div>
  <FooterCompVue />

  <q-dialog class="dialog" v-model="rateModal">
    <div class="auth">
      <q-card class="rate">
        <div class="text-center q-mb-sm">
          <div class="bigMediumText">Rate store</div>
        </div>

        <div class="auth">
          <div class="row justify-center">
            <q-rating
              v-model="ratingModel"
              size="2em"
              color="info"
              icon="star_border"
              icon-selected="star"
            />
          </div>
        </div>

        <div class="total no-wrap row justify-center q-mt-md items-center">
          <q-btn
            class="apply bg-primary q-px-xl q-mt-md"
            no-caps
            flat
            @click="rateStore"
            rounded
            :loading="loadingRating"
            text-color="white"
          >
            Submit
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { Loading, Notify, QSpinnerOval } from "quasar";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import { computed, onMounted, ref } from "vue";
import ProductComp from "src/components/ProductComp.vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute, useRouter } from "vue-router";
let router = useRouter();
let route = useRoute();
let store = useMyAuthStore();

let searchQuery = ref("");
let coverFile = ref(null);
let loadingProducts = ref(true);
let addProductModal = ref(false);
let loadingRating = ref(false);
let rateModal = ref(false);
let loading = ref(false);
let ratingModel = ref(0);
let loadingReview = ref(false);
let productCategoryListArr = ref([]);
let prodListArr = ref([]);
let storeDetails = ref({ rating: 0 });
let data = ref({ media: null });

const filteredProducts = computed(() => {
  let filtered = [...prodListArr.value];

  if (searchQuery.value.trim() !== "") {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});
const deleteReview = (review) => {
  Dialog.create({
    title: "Note",
    message: `Are you sure you want to delete this review?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerOval,
        message: "Deleting review...",
      });
      authAxios
        .delete(`review/delete/`)
        .then(({ data }) => {
          Loading.hide();
          console.log(data);
          getProductDetail();
        })
        .catch(({ response }) => {
          Loading.hide();
          loading.value = false;
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const uploadReview = () => {
  if (!data.value.media) {
    Notify.create({
      message: "Please upload a review file",
      position: "top",
      color: "red",
    });
  } else {
    const formData = new FormData();
    formData.append("remark", data.value.remark);
    formData.append("media[]", data.value.media);
    loadingReview.value = true;
    authAxios
      .post(`merchant/${route.query.slug}/review/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Notify.create({
          message: "Review successfully added",
          position: "top",
          color: "green",
        });
        data.value = { media: null };
        getStore();
        loadingReview.value = false;
      })
      .catch(({ response }) => {
        loadingReview.value = false;
        Notify.create({
          message: "An error occurred",
          position: "top",
          color: "red",
        });
      });
  }
};
const getProducts = async () => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get(`${route.query.slug}/products`);
    console.log(prodList);
    // prodListArr.value = prodList.data.data.filter(
    //   (product) => product.store.id === storeDetails.value.id
    // );
    prodListArr.value = prodList.data.data;
    loadingProducts.value = false;
  } catch (error) {
    loadingProducts.value = false;
    console.error(error);
  }
};
const getStore = async () => {
  try {
    let storeDataResp = await authAxios.get(`merchant/${route.query.slug}`);
    console.log(storeDataResp);
    storeDetails.value = storeDataResp.data.data;
  } catch (error) {}
};
const rateStore = () => {
  loadingRating.value = true;
  authAxios
    .post(`merchant/${route.query.slug}/rating/create`, {
      value: ratingModel.value,
    })
    .then(({ data }) => {
      console.log(data);
      Notify.create({
        message: "Ratings successfully added",
        position: "top",
        color: "green",
      });
      getStore();
      loadingRating.value = false;
      rateModal.value = false;
      document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
    })
    .catch(({ response }) => {
      loadingRating.value = false;
      Notify.create({
        message: "An error occurred",
        position: "top",
        color: "red",
      });
    });
};
onMounted(async () => {
  try {
    let storeDataResp = await authAxios.get(`merchant/${route.query.slug}`);
    // let prodCatList = await authAxios.get("product/category/list");
    console.log(storeDataResp);
    storeDetails.value = storeDataResp.data.data;
    // productCategoryListArr.value = prodCatList.data.data;
    getProducts();
  } catch (error) {
    loadingProducts.value = false;
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
