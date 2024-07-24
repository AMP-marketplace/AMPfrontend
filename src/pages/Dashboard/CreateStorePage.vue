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

          <div class="input_wrap">
            <label for=""> Country <span>*</span></label>
            <div class="input">
              <select v-model="basicStoreData.country">
                <option
                  v-for="(country, index) in countries"
                  :key="index"
                  :value="country.name"
                >
                  {{ country.name }} {{ country.flag }}
                </option>
              </select>
            </div>
          </div>
          <!-- <div class="input_wrap q-sel">
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
          </div> -->
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
              ? store.storedetails.banner.url
              : coverFilePreview
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

        <div class="q-my-lg">
          <div style="gap: 2rem" class="row items-center no-wrap">
            <!-- {{ profileFilePreview }} -->
            <!-- {{ store.storedetails.logo }} -->
            <div
              :style="`background: url(${
                store.storedetails.logo
                  ? store.storedetails.logo.url
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
              <h4 class="bigText">{{ store.storedetails.business_name }}</h4>

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

        <div v-if="!prodListArr.length" class="row q-pb-xl justify-center">
          <div class="column items-center justify-center">
            <img
              style="width: 208.001px; height: 204.304px; object-fit: contain"
              src="/images/box.png"
              alt=""
            />
            <p class="smallText text-center q-my-lg">
              You have no product on your store at this time, <br />
              upload a logo and banner image and then a product.
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
          class="input justify-between column items-center no-wrap"
        >
          <div class="smallText text-weight-bold">
            Note that this will be your main/display product image
          </div>
          <q-file
            @update:model-value="setProductImage"
            accept=".png,.jpeg,.svg,.jpg"
            class="column profile_field justify-center items-center"
            v-model="productImageFile"
            max-file-size="512000"
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
            <div class="input editor">
              <q-editor v-model="data.description" min-height="5rem" />
            </div>
          </div>
          <div class="auth_grid">
            <div class="input_wrap">
              <label for="">Price <span>*</span></label>
              <div class="input">
                <select @change="togglePriceType" v-model="typeOfPrice">
                  <option value="fixed">Fixed</option>
                  <option value="negotiable">Negotiable</option>
                  <option value="range">Range</option>
                </select>
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Condition <span>*</span></label>
              <div class="input">
                <select v-model="data.condition">
                  <option value="new">New</option>
                  <option value="refurbished">Refurbished</option>
                  <!-- <option value="range">Range</option> -->
                </select>
              </div>
            </div>
          </div>
          <div v-if="typeOfPrice === 'range'" class="auth_grid">
            <div class="input_wrap">
              <label for="">Minimun Price <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.minimum_price"
                  placeholder="N0.00"
                  required
                  type="text"
                />
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Maximum price<span>*</span></label>
              <div class="input">
                <input
                  v-model="data.maximum_price"
                  placeholder="10"
                  required
                  type="text"
                />
              </div>
            </div>
          </div>
          <div v-if="typeOfPrice === 'fixed'" class="input_wrap">
            <label for="">Product Price <span>*</span></label>
            <div class="input">
              <input
                v-model="data.minimum_price"
                placeholder="N0.00"
                required
                type="text"
              />
            </div>
          </div>
          <div v-if="typeOfPrice === 'negotiable'" class="input_wrap">
            <label for="">Product Price <span>*</span></label>
            <div class="input">
              <input
                v-model="data.minimum_price"
                placeholder="N0.00"
                required
                type="text"
              />
            </div>
          </div>
          <!-- <div class="input_wrap">
            <label for="">Quantity in stock<span>*</span></label>
            <div class="input">
              <input
                v-model="data.quantity"
                placeholder="10"
                required
                type="text"
              />
            </div>
          </div> -->
          <div class="input_wrap">
            <label for="">Minimum Product Sale<span>*</span></label>
            <div class="input">
              <input
                v-model="data.minimum_order"
                placeholder="3"
                required
                type="text"
              />
            </div>
          </div>
          <!-- {{ productCategoryListArr }} -->
          <div class="input_wrap">
            <label for="">Product Category<span>*</span></label>
            <div class="input">
              <select
                @change="getSubcategories"
                required
                v-model="selectedCategories"
              >
                <option disabled value="">Choose</option>
                <option
                  v-for="productCategory in productCategoryListArr"
                  :key="productCategory.slug"
                  :value="productCategory.slug"
                >
                  {{ productCategory.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="input_wrap">
            <label for="">Product Sub Category<span>*</span></label>
            <div class="input">
              <select
                required
                :disabled="!productSubCategoryListArr.length"
                v-model="data.subcategory_id"
              >
                <option disabled value="">Choose</option>
                <option
                  v-for="productSubCategory in productSubCategoryListArr"
                  :key="productSubCategory.slug"
                  :value="productSubCategory.id"
                >
                  {{ productSubCategory.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- <div class="input_wrap">
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
          </div> -->
          <div class="auth_grid">
            <div class="input_wrap">
              <label for="">Country<span>*</span></label>
              <div class="input">
                <select v-model="data.country" required>
                  <option disabled value="">Choose</option>
                  <option
                    v-for="country in countries"
                    :key="country.name"
                    :value="country.name"
                  >
                    {{ country.name }} {{ country.flag }}
                  </option>
                </select>
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Currency<span>*</span></label>
              <div class="input">
                <select v-model="data.currency" required>
                  <option disabled value="">Choose</option>
                  <option value="USD">USD($) - 🇺🇸</option>
                </select>
                <!-- <select v-model="data.currency" required>
                  <option disabled value="">Choose</option>
                  <option
                    v-for="currency in currencies"
                    :key="currency.code"
                    :value="currency.code"
                  >
                    {{ currency.name }} {{ currency.flag }}
                  </option>
                </select> -->
              </div>
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
import currencies from "../../../currencies";
// import countries from "../../../countries";
let store = useMyAuthStore();
let router = useRouter();
let route = useRoute();
let data = ref({
  description: "",
  minimum_price: "",
  maximum_price: "",
  // attributes: [],
});

let basicStoreData = ref({});
let addedProductData = ref({});
let productCategoryListArr = ref([]);
let productSubCategoryListArr = ref([]);
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
let selectedCategories = ref("");
let typeOfPrice = ref("fixed");
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
      `merchant/${store.storedetails.slug}/update-media`,
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
  const formData = new FormData();
  formData.append("media[]", productImageFile.value);
  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading image...",
  });
  authAxios
    .post(
      `merchant/${store.storedetails.slug}/${addedProductData.value.slug}/upload/media`,
      formData,
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
// const togglePriceType = () => {

// }
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
      `merchant/${store.storedetails.slug}/update-media`,
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
      store.createStoreStep = 2;
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
    message: `Your upload size should be less than 500kb `,
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

  authAxios
    .post("merchant/onboard", {
      ...basicStoreData.value,
      // country: basicStoreData.value.country.name,
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
    is_negotiable: typeOfPrice.value === "negotiable" ? 1 : 0,
    maximum_price: data.value.maximum_price ? data.value.maximum_price : "1",
  };
  Loading.show();
  authAxios
    .post(`merchant/${store.storedetails.slug}/product/create`, {
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
      data.value = {};
      addedProductData.value = response.data.data;
      showAddProductImage.value = true;
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();

      errors.value = response.data.errors;
      Notify.create({
        message: response.data.message
          ? response.data.message
          : Object.values(response.data.errors) + ",",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const getProducts = async () => {
  try {
    Loading.show();
    let prodList = await authAxios.get(
      `merchant/${store.storedetails.slug}/products`
    );
    console.log(prodList);
    // prodListArr.value = prodList.data.data;

    Loading.hide();
  } catch (error) {
    console.error(error);
  }
};

const getSubcategories = async () => {
  Loading.show({
    spinner: QSpinnerOval,
    message: "Loading subcategories...",
  });
  let subCatList = await authAxios.get(
    `data?fetch=subcategories&category=${selectedCategories.value}`
  );
  console.log(subCatList);
  productSubCategoryListArr.value = subCatList.data.data;
  Loading.hide();
};
onMounted(async () => {
  try {
    if (route.query.create === "new") {
      progress.value = 1;
    } else {
      progress.value = 2;
    }
    // let countriesResp = await authAxios.get("country/supported-countries");

    let prodCatList = await authAxios.get("data?fetch=categories");
    // console.log(prodCatList);
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

    productCategoryListArr.value = prodCatList.data.data;
    // getProducts();
    // productUnitListArr.value = prodUnitList.data.data;
    // currencyListArr.value = currList.data.data;
    // prodListArr.value = prodList.data.data.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
