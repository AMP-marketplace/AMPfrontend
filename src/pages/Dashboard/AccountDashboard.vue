<template>
  <div class="container q-pb-xl">
    <div style="gap: 1rem" class="row no-wrap justify-end">
      <div class="">
        <q-btn
          :color="!store.storedetails.is_published ? 'red-7' : 'green-7'"
          class="q-px-md"
          no-caps
          :disable="prodListArr.length < 1"
          :loading="puborUnpubLoadBtn"
          @click="publishOrUnpublishStore"
          no-wrap
          v-if="store.storedetails.business_name"
        >
          {{
            store.storedetails.is_published === false
              ? "Publish store"
              : "Unpublish store"
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
          style="width: 208.001px; height: 204.304px; object-fit: contain"
          src="/images/box.png"
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
        <ProductComp @editProduct="editProductModal" :product="product" />
      </div>
    </div>
  </div>

  <q-dialog v-model="addProductModal">
    <q-card>
      <div class="top_modal row items-center justify-between">
        <h4 class="text1">
          {{ editState ? "Edit product" : "Upload product" }}
        </h4>

        <q-btn @click="addProductModal = !addProductModal" flat rounded>
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
          <!-- {{ addedProductData }} -->
          <!-- max-file-size="512000"
            @rejected="onRejected" -->
          <q-file
            @update:model-value="setProductImage"
            accept=".png,.jpeg,.jpg"
            class="column profile_field justify-center items-center"
            v-model="productImageFile"
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

              <!-- <textarea
                placeholder="product description"
                v-model="data.description"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea> -->
            </div>
          </div>
          <div class="auth_grid">
            <div class="input_wrap">
              <label for="">Price <span>*</span></label>
              <div class="input">
                <select @change="togglePriceType" v-model="typeOfPrice">
                  <option value="fixed">Fixed</option>
                  <option value="negotiable">Negotiable</option>
                  <!-- <option value="range">Range</option> -->
                </select>
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Condition <span>*</span></label>
              <div class="input">
                <select v-model="data.condition">
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                  <option value="pre-owned">Pre owned</option>
                  <option value="open_box">Open Box</option>
                  <option value="lease_to_own">Lease to Own</option>
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
                  type="text"
                  required
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
            <label for="">Product Price($) <span>*</span></label>
            <div class="input">
              <input
                v-model="data.minimum_price"
                placeholder="N0.00"
                type="text"
              />
            </div>
            <div class="row q-mt-sm items-center justify-between">
              <small class="text-grey-9"
                >Note: Leave the price field empty if the buyer needs to cntact
                you for details</small
              >

              <q-btn
                push
                color="primary"
                no-caps
                no-wrap
                :disable="!data.minimum_price"
                size="10px"
                label="View price in your currency"
              >
                <q-popup-proxy>
                  <q-card class="q-pa-md">
                    <div style="margin-top: 0rem" class="auth">
                      <div class="input_wrap">
                        <label for="">See price in your currency</label>
                        <div class="input">
                          <select
                            @change="getTotalInCurrency"
                            v-model="showEquivInCurrency"
                            required
                          >
                            <option disabled value="">Choose</option>
                            <option
                              v-for="currency in currencies"
                              :key="currency.name"
                              :value="currency.code"
                            >
                              {{ currency.name }} {{ currency.flag }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <p class="text-weight-bold text-body1">
                        Product price:
                        <span
                          v-if="data?.minimum_price"
                          class="text-blue-10 q-mt-md text-body2 text-weight-bold"
                        >
                          $
                          {{
                            data?.minimum_price?.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          }}
                        </span>
                      </p>
                      <!-- {{ showEquivInCurrency }} -->
                      <p
                        v-if="currencyRatesData.rates && showEquivInCurrency"
                        class="q-mt-xs"
                      >
                        {{ showEquivInCurrency }} to Dollar rate at this time is
                        <span class="text-green text-weight-bold">
                          {{ showEquivInCurrency }}
                          {{ currencyRatesData?.rates[showEquivInCurrency] }}
                        </span>
                      </p>
                      <p
                        v-if="currencyRatesData.rates && showEquivInCurrency"
                        class="q-mt-xs"
                      >
                        <!-- {{ parseFloat(product?.price?.minimum_price) }} -->
                        Product price in {{ showEquivInCurrency }} is
                        <strong>
                          {{ showEquivInCurrency }}
                          {{
                            (
                              parseFloat(data?.minimum_price) *
                              currencyRatesData?.rates[showEquivInCurrency]
                            ).toLocaleString()
                          }}</strong
                        >
                      </p>
                    </div>
                  </q-card>
                </q-popup-proxy>
              </q-btn>
            </div>
          </div>
          <div v-if="typeOfPrice === 'negotiable'" class="input_wrap">
            <label for="">Product Price <span>*</span></label>
            <div class="input">
              <input
                v-model="data.minimum_price"
                placeholder="N0.00"
                type="text"
              />
            </div>

            <div class="row q-mt-sm items-center justify-between">
              <small class="text-grey-9"
                >Note: Leave the price field empty if the buyer needs to cntact
                you for details</small
              >

              <q-btn
                push
                color="primary"
                no-caps
                no-wrap
                :disable="!data.minimum_price"
                size="10px"
                label="View price in your currency"
              >
                <q-popup-proxy>
                  <q-card class="q-pa-md">
                    <div style="margin-top: 0rem" class="auth">
                      <div class="input_wrap">
                        <label for="">See price in your currency</label>
                        <div class="input">
                          <select
                            @change="getTotalInCurrency"
                            v-model="showEquivInCurrency"
                            required
                          >
                            <option disabled value="">Choose</option>
                            <option
                              v-for="currency in currencies"
                              :key="currency.name"
                              :value="currency.code"
                            >
                              {{ currency.name }} {{ currency.flag }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <p class="text-weight-bold text-body1">
                        Product price:
                        <span
                          v-if="data?.minimum_price"
                          class="text-blue-10 q-mt-md text-body2 text-weight-bold"
                        >
                          $
                          {{
                            data?.minimum_price?.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          }}
                        </span>
                      </p>
                      <!-- {{ showEquivInCurrency }} -->
                      <p
                        v-if="currencyRatesData.rates && showEquivInCurrency"
                        class="q-mt-xs"
                      >
                        {{ showEquivInCurrency }} to Dollar rate at this time is
                        <span class="text-green text-weight-bold">
                          {{ showEquivInCurrency }}
                          {{ currencyRatesData?.rates[showEquivInCurrency] }}
                        </span>
                      </p>
                      <p
                        v-if="currencyRatesData.rates && showEquivInCurrency"
                        class="q-mt-xs"
                      >
                        <!-- {{ parseFloat(product?.price?.minimum_price) }} -->
                        Product price in {{ showEquivInCurrency }} is
                        <strong>
                          {{ showEquivInCurrency }}
                          {{
                            (
                              parseFloat(data?.minimum_price) *
                              currencyRatesData?.rates[showEquivInCurrency]
                            ).toLocaleString()
                          }}</strong
                        >
                      </p>
                    </div>
                  </q-card>
                </q-popup-proxy>
              </q-btn>
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
                type="number"
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
  <!-- <FooterCompVue /> -->
</template>

<script setup>
import { Loading, Notify, QSpinnerOval, QSpinnerRings } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import ProductComp from "src/components/ProductComp.vue";
import { useRoute, useRouter } from "vue-router";
import countries from "../../../countries";
import FooterCompVue from "src/components/FooterComp.vue";
import currencies from "../../../currencies";
import axios from "axios";
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
let editProductModal = ref(false);
let coverFile = ref(null);
let productImageFile = ref(null);
let profileFile = ref(null);
let productImagePreview = ref("");
let cancelAddproductodal = ref("");
let profileFilePreview = ref("");
let selectedCategories = ref("");
let typeOfPrice = ref("fixed");
let coverFilePreview = ref("");
let addProductModal = ref(false);
let editState = ref(false);
let storeDetailsLoadBtn = ref(false);
let loadingProducts = ref(true);
let puborUnpubLoadBtn = ref(false);
let loading = ref(false);
let errors = ref({});
let currencyRatesData = ref({});
let showEquivInCurrency = ref("");
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
const getTotalInCurrency = async () => {
  // console.log("first");
  Loading.show({
    spinner: QSpinnerRings,
    spinnerColor: "yellow",
    spinnerSize: 140,
    message: "Fetching, please wait...",
    messageColor: "white",
  });
  let response = await axios.get(
    "https://openexchangerates.org/api/latest.json?app_id=928ab800ac8d4100ae7d72be1fbf3ca0"
  );
  console.log(response);
  currencyRatesData.value = response.data;
  Loading.hide();
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
      `merchant/${store.storedetails.slug}/media/update`,
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
      showAddProductImage.value = false;
      productImageFile.value = null;
      // router.replace({
      //   name: "account.dashboard",
      // });
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
      `merchant/${store.storedetails.slug}/media/update`,
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

const createStore = () => {
  storeDetailsLoadBtn.value = true;

  authAxios
    .post("merchant/onboard", {
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
  if (store.userdetails.banner === null) {
    Notify.create({
      message: "Please upload a banner image",
      color: "red",
      position: "top",
    });
  } else if (store.userdetails.logo === null) {
    Notify.create({
      message: "Please upload a logo image",
      color: "red",
      position: "top",
    });
  } else {
    if (!store.storedetails.is_published) {
      authAxios
        .post(`merchant/${store.storedetails.slug}/publish`, {
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
        .post(`merchant/${store.storedetails.slug}/publish`, {
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
  }
};
const addProductFCN = () => {
  let dataToSend = {
    ...data.value,
    is_negotiable: typeOfPrice.value === "negotiable" ? 1 : 0,
    maximum_price: data.value.maximum_price ? data.value.maximum_price : "1",
    minimum_price: data.value.minimum_price
      ? data.value.minimum_price + data.value.minimum_price
      : data.value.minimum_price + data.value.minimum_price,
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
    // Loading.show();
    loadingProducts.value = true;
    let prodList = await authAxios.get(`${store.storedetails.slug}/products`);
    console.log(prodList);
    loadingProducts.value = false;
    prodListArr.value = prodList.data.data.products;

    // Loading.hide();
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
    let prodCatList = await authAxios.get("data?fetch=categories");
    productCategoryListArr.value = prodCatList.data.data;
    getProducts();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
