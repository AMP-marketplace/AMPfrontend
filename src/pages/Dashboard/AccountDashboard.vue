<template>
  <div class="container q-pb-xl">
    <div style="gap: 1rem" class="row no-wrap justify-end">
      <div class="">
        <q-btn
          :color="!store.storedetails.published ? 'red-7' : 'green-7'"
          class="q-px-md"
          no-caps
          :disable="prodListArr.length < 1"
          :loading="puborUnpubLoadBtn"
          @click="publishOrUnpublishStore"
          no-wrap
          v-if="store.storedetails.name"
        >
          {{
            store.storedetails.published === false
              ? "Publish store"
              : "Unublish store"
          }}
        </q-btn>
      </div>
      <q-btn
        @click="addProductModal = !addProductModal"
        no-wrap
        no-caps
        v-if="
          prodListArr.length &&
          store.storedetails.banner &&
          store.storedetails.logo
        "
        color="primary"
        >Add product</q-btn
      >
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
      v-if="!loadingProducts && prodListArr.length === 0"
      class="row justify-center"
    >
      <div class="column items-center justify-center">
        <img
          style="width: 308.001px; height: 204.304px"
          src="../../assets/box.png"
          alt=""
        />
        <p class="smallText q-my-lg">
          You have no product on your store at this time
        </p>

        <q-btn
          @click="addProductModal = !addProductModal"
          no-wrap
          :disable="!store.storedetails.banner && !store.storedetails.logo"
          no-caps
          rounded
          color="primary"
          >Add product</q-btn
        >
      </div>
    </div>

    <div
      v-if="!loadingProducts && prodListArr.length !== 0"
      class="responsive_grid q-mt-lg"
    >
      <div v-for="product in prodListArr" :key="product.id">
        <ProductsComp @editProduct="editProductModal" :product="product" />
      </div>
    </div>
  </div>

  <q-dialog v-model="addProductModal">
    <q-card>
      <div class="top_modal row items-center justify-between">
        <h4 class="text1">
          {{ editState ? "Edit product" : "Upload product" }}
        </h4>

        <q-btn @click="cancelAddproductodal" flat rounded>
          <img src="../../assets/circle.svg" alt="" />
        </q-btn>
      </div>

      <q-separator class="q-mt-lg" />
      <div class="auth">
        <div
          v-if="showAddProductImage"
          style="gap: 1rem"
          class="input justify-between row items-center no-wrap"
        >
          <!-- {{ addedProductData }} -->
          <q-file
            @update:model-value="setProductImage"
            accept=".png,.jpeg,.svg,.jpg"
            class="column profile_field justify-center items-center"
            v-model="productImageFile"
            max-file-size="2097152"
            @rejected="onRejected"
          >
            <div class="img q-mb-sm">
              <img src="../../assets/upload.svg" alt="" />
            </div>
            <div class="smallText">Upload product image</div>
          </q-file>
        </div>
        <form v-else @submit.prevent="addProductFCN">
          <div class="input_wrap">
            <label for="">Product Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.name"
                placeholder="Enter product name"
                required
                type="text"
              />
            </div>
          </div>
          <div class="input_wrap">
            <label for="">Description <span>*</span></label>
            <div class="input">
              <textarea
                placeholder="product description"
                v-model="data.description"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <div class="auth_grid">
            <div class="input_wrap">
              <label for="">Product Price <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.price"
                  placeholder="N0.00"
                  required
                  type="text"
                />
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Quantity in stock<span>*</span></label>
              <div class="input">
                <input
                  v-model="data.quantity"
                  placeholder="10"
                  required
                  type="text"
                />
              </div>
            </div>
          </div>
          <!-- {{ productCategoryListArr }} -->
          <div class="input_wrap">
            <label for="">Product Category<span>*</span></label>
            <div class="input">
              <select required v-model="data.product_category_id">
                <option disabled value="">Choose</option>
                <option
                  v-for="productCategory in productCategoryListArr"
                  :key="productCategory.id"
                  :value="productCategory.id"
                >
                  {{ productCategory.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="input_wrap">
            <label for="">Product Unit<span>*</span></label>
            <div class="input">
              <select required v-model="data.product_unit_id">
                <option disabled value="">Choose</option>
                <option
                  v-for="productUnit in productUnitListArr"
                  :key="productUnit.id"
                  :value="productUnit.id"
                >
                  {{ productUnit.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="input_wrap">
            <label for="">Currency<span>*</span></label>
            <div class="input">
              <select required v-model="data.currency_id">
                <option disabled value="">Choose</option>
                <option
                  v-for="currency in currencyListArr"
                  :key="currency.id"
                  :value="currency.id"
                >
                  {{ currency.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- <q-btn @click="addAttribute" flat no-caps no-wrap color="primary">
            + Add attributes
          </q-btn>
          <div v-for="(attribute, counter) in data.attributes" :key="counter">
            <div class="input_wrap">
              <div
                style="gap: 1rem"
                class="row items-center justify-between no-wrap"
              >
                <label for=""
                  >Attribute Name({{ counter + 1 }})<span>*</span></label
                >
                <q-btn
                  color="red-7"
                  size="10px"
                  rounded
                  @click="removeAttribute(counter)"
                >
                  <i class="fa-solid fa-xmark"></i>
                </q-btn>
              </div>
              <div class="input">
                <input
                  v-model="attribute.name"
                  placeholder="name"
                  required
                  type="text"
                />
              </div>
            </div>
            <div class="input_wrap">
              <label for=""
                >Attribute Value({{ counter + 1 }})<span>*</span></label
              >
              <div class="input">
                <input
                  v-model="attribute.value"
                  placeholder="value"
                  required
                  type="text"
                />
              </div>
            </div>
          </div> -->

          <div class="row justify-end q-mt-lg">
            <q-btn
              color="primary"
              class="q-px-xl q-py-sm"
              rounded
              no-wrap
              no-caps
              type="submit"
            >
              {{ editState ? "Edit product" : "Upload Product" }}
            </q-btn>
          </div>
        </form>
      </div>
    </q-card>
  </q-dialog>
  <!-- <FooterCompVue /> -->
</template>

<script setup>
import { Loading, Notify, QSpinnerOval } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";
import FooterCompVue from "src/components/FooterComp.vue";
import ProductsComp from "src/components/ProductsComp.vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute, useRouter } from "vue-router";
let router = useRouter();
let route = useRoute();
let store = useMyAuthStore();
let data = ref({
  product_category_id: "",
  product_unit_id: "",
  currency_id: "",
  // attributes: [],
});
let progress = ref(1);
let coverFile = ref(null);
let loadingProducts = ref(true);
let puborUnpubLoadBtn = ref(false);
let profileFile = ref(null);
let productImagePreview = ref("");
let profileFilePreview = ref("");
let coverFilePreview = ref("");
let showAddProductImage = ref(false);
let storeDetailsLoadBtn = ref(false);
let addProductModal = ref(false);
let editState = ref(false);
let productImageFile = ref(null);
let basicStoreData = ref({});
let addedProductData = ref({});
let productCategoryListArr = ref([]);
let currencyListArr = ref([]);
let prodListArr = ref([]);
let productUnitListArr = ref([]);
const filterFn = (val, update, abort) => {
  if (val === "") {
    update(() => {
      countriesArr.value = countriesBaseArr;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    // console.log(val);
    countriesArr.value = countriesBaseArr.filter(
      (v) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
};
const publishOrUnpublishStore = () => {
  puborUnpubLoadBtn.value = true;
  if (!store.storedetails.published) {
    console.log("pub");
    authAxios
      .post(`merchant/store/${store.storedetails.id}/publish`, {
        published: 1,
      })
      .then((response) => {
        console.log(response);
        puborUnpubLoadBtn.value = false;
        Notify.create({
          message:
            response.data.message +
            ". You have successfully published your store.",
          color: "green",
          position: "top",
        });

        store.storedetails = response.data.data;
      })
      .catch(({ response }) => {
        // console.log(response);
        puborUnpubLoadBtn.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  } else {
    console.log("unoub");
    authAxios
      .post(`merchant/store/${store.storedetails.id}/publish`, {
        published: 0,
      })
      .then((response) => {
        console.log(response);
        puborUnpubLoadBtn.value = false;
        Notify.create({
          message:
            response.data.message +
            ". You have successfully unpublished your store.",
          color: "green",
          position: "top",
        });

        store.storedetails = response.data.data;
      })
      .catch(({ response }) => {
        // console.log(response);
        puborUnpubLoadBtn.value = false;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
};
const cancelAddproductodal = () => {
  showAddProductImage.value = false;
  editState.value = false;
  addProductModal.value = false;
};
const setCoverFile = (props) => {
  coverFile.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    coverFilePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading banner image...",
  });
  authAxios
    .post(
      `merchant/store/${store.storedetails.id}/upload-banner`,
      {
        banner: coverFile.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);
      storeDetailsLoadBtn.value = false;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });

      store.storedetails = response.data.data;
      coverFile.value = null;
      Loading.hide();
    })
    .catch(({ response }) => {
      // console.log(response);
      storeDetailsLoadBtn.value = false;
      Loading.hide();
      errors.value = response.data.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const setProductImage = (props) => {
  productImageFile.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    productImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading product image...",
  });
  if (editState.value) {
    authAxios
      .post(
        `merchant/product/${addedProductData.value.images[0].id}/change-image`,
        {
          image: productImageFile.value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);

        Notify.create({
          message: response.data.message + ", product successfully updated.",
          color: "green",
          position: "top",
        });
        Loading.hide();
        addProductModal.value = false;
        getProducts();
      })
      .catch(({ response }) => {
        // console.log(response);
        storeDetailsLoadBtn.value = false;
        Loading.hide();
        errors.value = response.data.data.errors;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
        editState.value = false;
        addProductModal.value = false;
      });
  } else {
    authAxios
      .post(
        `merchant/product/${addedProductData.value.id}/upload-image`,
        {
          image: productImageFile.value,
          role: "main",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);

        Notify.create({
          message: response.data.message + ", product successfully added.",
          color: "green",
          position: "top",
        });
        Loading.hide();
        addProductModal.value = false;
        getProducts();
      })
      .catch(({ response }) => {
        // console.log(response);
        storeDetailsLoadBtn.value = false;
        Loading.hide();
        errors.value = response.data.data.errors;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
};
const setProfileFile = (props) => {
  profileFile.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    profileFilePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading Logo...",
  });
  authAxios
    .post(
      `merchant/store/${store.storedetails.id}/upload-logo`,
      {
        logo: profileFile.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);
      storeDetailsLoadBtn.value = false;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });

      store.storedetails = response.data.data;
      progress.value = 2;
      profileFile.value = null;
      Loading.hide();
    })
    .catch(({ response }) => {
      // console.log(response);
      storeDetailsLoadBtn.value = false;
      Loading.hide();
      errors.value = response.data.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const onRejected = () => {
  Notify.create({
    type: "negative",
    position: "top",
    message: `Your upload size should be less than 2mb `,
  });
};
const addAttribute = () => {
  data.value.attributes.push({
    name: "",
    value: "",
  });
};
const editProductModal = (product) => {
  // console.log(product);
  editState.value = true;
  data.value = {
    ...product,
  };
  addProductModal.value = !addProductModal.value;
};
const removeAttribute = (counter) => {
  data.value.attributes.splice(counter, 1);
};

const addProductFCN = () => {
  let dataToSend = {
    ...data.value,
    store_id: store.storedetails.id,
  };
  Loading.show();
  if (editState.value) {
    authAxios
      .post(`merchant/product/${data.value.id}/update`, {
        ...dataToSend,
      })
      .then((response) => {
        console.log(response);
        Loading.hide();
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        addedProductData.value = response.data.data;
        showAddProductImage.value = true;
        getProducts();
      })
      .catch(({ response }) => {
        // console.log(response);
        Loading.hide();

        errors.value = response.data.data.errors;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  } else {
    authAxios
      .post("merchant/product/add", {
        ...dataToSend,
      })
      .then((response) => {
        console.log(response);
        Loading.hide();
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        addedProductData.value = response.data.data;
        showAddProductImage.value = true;
        getProducts();
      })
      .catch(({ response }) => {
        // console.log(response);
        Loading.hide();

        errors.value = response.data.data.errors;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
};

const getProducts = async () => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get("merchant/product/list");
    prodListArr.value = prodList.data.data.data;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};
onMounted(async () => {
  try {
    let prodCatList = await authAxios.get("product/category/list");
    let prodUnitList = await authAxios.get("product/unit/list");
    let currList = await authAxios.get("currency/list");
    let prodList = await authAxios.get("merchant/product/list");
    // let citiesResp = await authAxios.get("city/list");
    console.log(prodList);

    productCategoryListArr.value = prodCatList.data.data;
    productUnitListArr.value = prodUnitList.data.data;
    currencyListArr.value = currList.data.data;
    prodListArr.value = prodList.data.data.data;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
