<template>
  <div class="container q-py-sm">
    <div class="row items-center no-wrap justify-between">
      <div>
        <h4 class="bigText">Create Store</h4>
        <p class="smallText">
          Kindly provide all informations below for us to help you create your
          unique store
        </p>
      </div>
      <div class="">
        <!-- <q-btn
          color="primary"
          class="q-px-md"
          no-caps
          :loading="puborUnpubLoadBtn"
          @click="publishOrUnpublishStore"
          no-wrap
          v-if="store.storedetails.name"
        >
          {{ store.storedetails.published === false ? "Publish" : "Unublish" }}
        </q-btn> -->
      </div>
    </div>

    <q-separator style="margin-bottom: 0rem" class="q-my-sm" />

    <div v-if="progress === 1" class="small_container left">
      <form @submit.prevent="createStore">
        <div style="margin-top: 0rem" class="auth">
          <div class="input_wrap">
            <label for="">Store Name <span>*</span></label>
            <div class="input">
              <input
                v-model="basicStoreData.business_name"
                placeholder="Enter store name"
                required
                name="storeName"
                type="text"
              />
            </div>
            <small
              v-if="errors.business_name"
              class="text-weight-bold text-red"
            >
              {{ errors.business_name[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">Description <span>*</span></label>
            <div class="input">
              <textarea
                placeholder="brief about your store"
                v-model="basicStoreData.description"
                name="description"
                id=""
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <small v-if="errors.description" class="text-weight-bold text-red">
              {{ errors.description[0] }}
            </small>
          </div>
          <!-- <div class="input_wrap">
            <label for="">Country<span>*</span></label>
            <div class="input">
              <select v-model="data.country_id" >
                <option disabled value="">Country</option>
              </select>
            </div>
          </div> -->

          <!-- {{ data }} -->

          <div class="input_wrap q-sel">
            <label for=""> Country <span>*</span></label>
            <div class="input">
              <q-select
                v-model="basicStoreData.country"
                use-input
                @filter="filterFn"
                behavior="dialog"
                :options="countriesArr"
                class="multi_select"
                label="Select from the list of countiries"
                style="width: 100%"
                ><template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template></q-select
              >
            </div>
            <small v-if="errors.country_id" class="text-weight-bold text-red">
              {{ errors.country_id[0] }}
            </small>
          </div>
          <!-- <div class="input_wrap">
            <label for="">City<span>*</span></label>
            <div class="input">
              <select v-model="data.city_id" >
                <option disabled value="">City</option>
              </select>
            </div>
          </div> -->
          <!-- <div v-if="basicStoreData.country_id.states" class="input_wrap">
            {{ countriesArr }}
            <label for="">State<span>*</span></label>
            <div class="input">
              <select required v-model="data.state_id" >
                <option disabled value="">State</option>
                <option
                  v-for="(state, index) in basicStoreData.country_id.states"
                  :key="index"
                  value=""
                >
                  {{ state.name }}
                </option>
              </select>
            </div>
          </div> -->

          <div class="input_wrap">
            <label for="">Address<span>*</span></label>
            <div class="input">
              <input
                v-model="basicStoreData.address"
                required
                name="address"
                placeholder="Enter address"
                type="text"
              />
            </div>

            <small v-if="errors.address" class="text-weight-bold text-red">
              {{ errors.address[0] }}
            </small>
          </div>

          <div class="row justify-start q-mt-lg">
            <q-btn
              color="primary"
              class="q-px-xl"
              rounded
              no-wrap
              :loading="storeDetailsLoadBtn"
              no-caps
              type="submit"
            >
              Next
            </q-btn>
          </div>
        </div>
      </form>
    </div>

    <div v-if="progress === 2">
      <div class="create_store_2">
        <div
          :style="`background: url(${
            store.storedetails.banner
              ? store.storedetails.banner
              : profileFilePreview
          }), #4f4f4f; background-repeat: no-repeat; background-size:cover`"
          class="hero"
        >
          <q-file
            @update:model-value="setCoverFile"
            accept=".jpg,.png,.svg,.jpeg"
            :label="
              store.storedetails.banner
                ? 'Change Banner Image'
                : 'Upload Banner Image'
            "
            outlined
            class="orderpage text-white"
            style="max-width: 300px; margin: 0 auto"
            v-model="coverFile"
          />

          <!-- <q-btn no-wrap no-caps flat> Upload Image </q-btn> -->
        </div>

        <div class="q-mt-lg">
          <div style="gap: 2rem" class="row items-center no-wrap">
            <!-- {{ profileFilePreview }} -->
            <!-- {{ store.storedetails.logo }} -->
            <div
              :style="`background: url(${
                store.storedetails.logo
                  ? store.storedetails.logo
                  : profileFilePreview
              }), #4f4f4f; background-repeat: no-repeat; background-size:cover`"
              class="left"
            >
              <!-- <img
                :src="
                  profileFilePreview
                    ? profileFilePreview
                    : '../../assets/frame.png'
                "
                alt=""
              /> -->
              <q-file
                @update:model-value="setProfileFile"
                accept=".jpg,.png,.svg,.jpeg"
                :label="
                  store.storedetails.logo
                    ? 'Change Logo Image'
                    : 'Upload Logo Image'
                "
                outlined
                class="orderpage text-white"
                style="max-width: 300px; margin: 0 auto"
                v-model="profileFile"
              />
              <!-- <q-btn no-caps no-wrap> Upload Image </q-btn> -->
            </div>
            <div class="right">
              <h4 class="bigText">{{ store.storedetails.name }}</h4>

              <p class="smallText q-my-sm">
                {{ store.storedetails.description }}
              </p>

              <small class="text-primary"
                ><i class="fa-solid fa-location-dot"></i>
                {{ store.storedetails.address }}</small
              >
            </div>
          </div>
        </div>

        <q-separator class="q-my-xl" />

        <div v-if="!prodListArr.length" class="row justify-center">
          <div class="column items-center justify-center">
            <img
              style="width: 308.001px; height: 204.304px"
              src="../../assets/box.png"
              alt=""
            />
            <p class="smallText q-my-lg">
              You have no product on your store at this time, upload a logo and
              banner image and then a product.
            </p>

            <q-btn
              @click="addProductModal = !addProductModal"
              no-wrap
              no-caps
              rounded
              color="primary"
              >Add product</q-btn
            >
          </div>
        </div>

        <div v-else class="responsive_grid">
          <div v-for="product in prodListArr" :key="product.id">
            <ProductsComp :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="addProductModal">
    <q-card>
      <div class="top_modal row items-center justify-between">
        <h4 class="text1">Upload product</h4>

        <q-btn @click="addProductModal = false" flat rounded>
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
          <div class="smallText text-weight-bold">
            Note that this will be your main/display product image
          </div>
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
              Upload Product
            </q-btn>
          </div>
        </form>
      </div>
    </q-card>
  </q-dialog>
  <FooterCompVue />
</template>

<script setup>
import { Loading, Notify, QSpinnerOval } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import ProductsComp from "src/components/ProductsComp.vue";
import { useRoute, useRouter } from "vue-router";
import countries from "../../../countries";
import FooterCompVue from "src/components/FooterComp.vue";

let store = useMyAuthStore();
let router = useRouter();
let route = useRoute();
let data = ref({
  product_category_id: "",
  product_unit_id: "",
  currency_id: "",
  // attributes: [],
});
let basicStoreData = ref({});
let addedProductData = ref({});
let productCategoryListArr = ref([]);
let currencyListArr = ref([]);
let prodListArr = ref([]);
let productUnitListArr = ref([]);
let progress = ref(1);
let showAddProductImage = ref(false);
let coverFile = ref(null);
let productImageFile = ref(null);
let profileFile = ref(null);
let productImagePreview = ref("");
let profileFilePreview = ref("");
let coverFilePreview = ref("");
let addProductModal = ref(false);
let storeDetailsLoadBtn = ref(false);
let puborUnpubLoadBtn = ref(false);
let loading = ref(false);
let errors = ref({});
let countriesArr = ref([]);
let countriesBaseArr = [];

const filterFn = (val, update, abort) => {
  if (val === "") {
    update(() => {
      countriesArr.value = countries;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    // console.log(val);
    countriesArr.value = countries.filter(
      (v) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
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
      `vendor/istores-ng/update-media`,
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
      // store.userstores.push(response.data.data);
      store.userstores = store.userstores.map((store) =>
        store.id === response.data.data.id
          ? { ...store, ...response.data.data }
          : store
      );
      progress.value = 2;
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
    message: "Uploading Logo...",
  });
  authAxios
    .post(
      `vendor/product/${addedProductData.value.slug}/upload/media`,
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
      router.replace({
        name: "account.dashboard",
      });
      // getProducts();
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
      `vendor/istores-ng/update-media`,
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
      store.userstores = store.userstores.map((store) =>
        store.id === response.data.data.id
          ? { ...store, ...response.data.data }
          : store
      );
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
const removeAttribute = (counter) => {
  data.value.attributes.splice(counter, 1);
};

const createStore = () => {
  storeDetailsLoadBtn.value = true;
  // const formData = new FormData();
  // for (var key in data.value) {
  //   formData.append(key, JSON.stringify(data.value[key]));
  // }
  authAxios
    .post("vendor/onboard", {
      ...basicStoreData.value,
      country: basicStoreData.value.country.name,
    })
    .then((response) => {
      console.log(response);
      storeDetailsLoadBtn.value = false;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });

      store.storedetails = response.data.data;
      store.userstores.push(response.data.data);

      progress.value = 2;
    })
    .catch(({ response }) => {
      // console.log(response);
      storeDetailsLoadBtn.value = false;
      errors.value = response.data.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const publishOrUnpublishStore = () => {
  puborUnpubLoadBtn.value = true;
  if (!store.storedetails.published) {
    authAxios
      .post(`merchant/store/${store.storedetails.id}/publish`, {
        publish: 1,
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
    authAxios
      .post(`merchant/store/${store.storedetails.id}/publish`, {
        publish: 0,
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
const addProductFCN = () => {
  let dataToSend = {
    ...data.value,
    // currency_id: 1,
    store_id: store.storedetails.id,
  };
  Loading.show();
  authAxios
    .post("vendor/product/upload", {
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
};
const getProducts = async () => {
  try {
    Loading.show();
    let prodList = await authAxios.get("merchant/product/list");
    prodListArr.value = prodList.data.data.data;

    Loading.hide();
  } catch (error) {
    console.error(error);
  }
};
onMounted(async () => {
  try {
    if (route.query.create === "new" && !store.storedetails.name) {
      progress.value = 1;
      // console.log("here");
    } else {
      progress.value = 2;
      // console.log("there");
    }
    // let countriesResp = await authAxios.get("country/supported-countries");
    let prodCatList = await authAxios.get(
      "data?fetch=subcategories&category=medsolutions"
    );
    // let prodUnitList = await authAxios.get("product/unit/list");
    // let currList = await authAxios.get("currency/list");
    // let prodList = await authAxios.get("merchant/product/list");
    // let citiesResp = await authAxios.get("city/list");
    // console.log(prodList);
    // countries = countries
    //   .sort((a, b) => a.name.localeCompare(b.name))
    //   .map((country) => ({
    //     ...country,
    //     label: country.name,
    //     value: country.id,
    //   }));

    productCategoryListArr.value = prodCatList.data;
    // productUnitListArr.value = prodUnitList.data.data;
    // currencyListArr.value = currList.data.data;
    // prodListArr.value = prodList.data.data.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
