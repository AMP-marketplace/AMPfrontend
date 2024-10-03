<template>
  <div class="container q-py-sm">
    <div class="row items-center no-wrap justify-between">
      <div class="q-py-sm">
        <h4 class="bigText">Product Detail</h4>
        <!-- <p class="smallText">
          Kindly provide all informations below for us to help you create your
          unique store
        </p> -->
      </div>
      <div style="gap: 0.5rem" class="row items-center no-wrap">
        <q-btn
          no-caps
          no-wrap
          class="bg-blue-7 text-white"
          :to="{ name: 'account.dashboard' }"
        >
          <i class="ri-arrow-left-line q-mr-sm"></i> Go back
        </q-btn>
        <q-btn
          :color="data.is_published === false ? 'red-7' : 'green-7'"
          class="q-px-md"
          no-caps
          :loading="puborUnpubLoadBtn"
          @click="publishorUnpublishProduct"
          no-wrap
        >
          {{
            data.is_published === false
              ? "Publish product"
              : "Unpublish product"
          }}
        </q-btn>
      </div>
    </div>

    <q-separator class="q-my-sm" />

    <div class="auth">
      <div class="create_store_2">
        <div>
          <q-carousel
            :autoplay="true"
            swipeable
            animated
            v-model="slide"
            thumbnails
            infinite
          >
            <q-carousel-slide
              style="background-size: contain; background-repeat: no-repeat"
              :name="index + 1"
              v-for="(images, index) in data.media"
              :key="index"
              :img-src="images.url"
            />
          </q-carousel>
        </div>
      </div>
      <div class="row justify-end q-mt-lg q-mb-xl">
        <q-btn
          color="red-7"
          class="q-md-xl q-mr-sm q-py-xs"
          rounded
          no-wrap
          @click="deletProduct"
          no-caps
        >
          DELETE PRODUCT
        </q-btn>
        <q-btn
          color="red-7"
          class="q-md-xl q-mr-sm q-py-xs"
          rounded
          no-wrap
          @click="actionsModal = !actionsModal"
          no-caps
          type="submit"
        >
          Actions
        </q-btn>
        <q-btn
          color="primary"
          class="q-md-xl q-py-xs"
          rounded
          no-wrap
          @click="AddProductImageModal = !AddProductImageModal"
          no-caps
          type="submit"
        >
          {{
            data?.media?.length ? "Add another product image" : "Upload image"
          }}
        </q-btn>
      </div>
      <form @submit.prevent="updateProductFunction">
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
            <q-editor
              placeholder="Do your best to include all the necessary descriptions for this product including key attributes, lead times ie the amount of time from order placement until dispatch etc"
              v-model="data.description"
              min-height="5rem"
            />
          </div>
        </div>
        <div class="input_wrap">
          <label for="">Price <span>*</span></label>
          <div class="input">
            <select v-model="typeOfPrice">
              <option value="fixed">Fixed</option>
              <option value="negotiable">Negotiable</option>
              <!-- <option value="range">Range</option> -->
            </select>
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
              type="text"
            />
          </div>
        </div>
        <!-- <div class="input_wrap">
          <label for="">Quantity in stock<span>*</span></label>
          <div class="input">
            <input placeholder="10" required type="text" />
          </div>
        </div> -->
        <!-- {{ productCategoryListArr }} -->
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

        <div class="input_wrap">
          <label for="">Currency<span>*</span></label>
          <div class="input">
            <select v-model="data.currency" required>
              <option disabled value="">Choose</option>
              <option value="USD">USD($) - 🇺🇸</option>
            </select>
          </div>
        </div>
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
            <label for="">Condition <span>*</span></label>
            <div class="input">
              <select v-model="data.condition">
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
                <option value="pre-owned">Pre owned</option>
                <option value="open box">Open Box</option>
                <option value="lease_to_own">Lease to Own</option>
                <!-- <option value="range">Range</option> -->
              </select>
            </div>
          </div>
        </div>
        <div class="row justify-end q-mt-lg">
          <q-btn
            color="primary"
            class="q-px-xl q-py-sm"
            rounded
            no-wrap
            no-caps
            type="submit"
          >
            Edit Product
          </q-btn>
        </div>
      </form>
    </div>
  </div>

  <q-dialog v-model="AddProductImageModal">
    <q-card>
      <div>
        <h6 class="text-h6 text-center">Do you want to add another image?</h6>
        <!-- <h6 class="text-h6 text-center">
          Do you want to change the main image or upload another image?
        </h6> -->
        <!-- <div class="q-mt-sm">
          <q-select v-model="imageRole" :options="options" label="Select" />
        </div> -->
      </div>
      <!-- max-file-size="512000"
        @rejected="onRejected" -->
      <q-file
        @update:model-value="setProductImage"
        accept=".png,.jpeg,.jpg,.webp"
        class="column profile_field justify-center items-center"
        v-model="AnotherproductImageFile"
      >
        <div class="img q-mb-sm">
          <img src="../../assets/upload.svg" alt="" />
        </div>
        <div class="smallText">Upload another product image</div>
      </q-file>
      <!-- <q-file
        v-if="imageRole"
        @update:model-value="setProductImage"
        accept=".png,.jpeg,.svg,.jpg"
        class="column profile_field justify-center items-center"
        v-model="AnotherproductImageFile"
        max-file-size="2097152"
        @rejected="onRejected"
      >
        <div class="img q-mb-sm">
          <img src="../../assets/upload.svg" alt="" />
        </div>
        <div class="smallText">Upload another product image</div>
      </q-file> -->
    </q-card>
  </q-dialog>
  <!-- max-file-size="512000"
        @rejected="onRejected" -->
  <q-dialog v-model="editImageModal">
    <q-card>
      <q-file
        @update:model-value="editProductImage"
        accept=".png,.jpeg,.jpg"
        class="column profile_field justify-center items-center"
        v-model="editproductImageFile"
      >
        <div class="img q-mb-sm">
          <img src="../../assets/upload.svg" alt="" />
        </div>
        <div class="smallText">Select another product image</div>
      </q-file>
    </q-card>
  </q-dialog>
  <q-dialog v-model="actionsModal">
    <q-card>
      <q-list
        v-if="data?.media?.length"
        bordered
        separator
        padding
        class="rounded-borders"
      >
        <q-item-label header>Images</q-item-label>

        <q-item
          v-for="(images, index) in data?.media"
          :key="index"
          clickable
          v-ripple
        >
          <q-item-section avatar top>
            <q-avatar>
              <img :src="images.url" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Image {{ index + 1 }}</q-item-label>
            <q-item-label caption>{{ images.size }}</q-item-label>
            <!-- <q-item-label caption>{{
              new Date(images.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}</q-item-label> -->
          </q-item-section>

          <q-item-section side>
            <div style="gap: 1rem" class="row items-center no-wrap">
              <!-- <q-btn @click="editImageProps(images)" color="green-7"
                ><i class="fa-solid fa-pen-to-square"></i
              ></q-btn> -->
              <q-btn @click="deleteImageProps(images)" color="red-7"
                ><i class="fa-solid fa-trash"></i
              ></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else>
        <p>You have not uploaded any images</p>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Dialog, Loading, Notify, QSpinnerOval } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import ProductsComp from "src/components/ProductsComp.vue";
let store = useMyAuthStore();
import { useRoute, useRouter } from "vue-router";
import currencies from "app/currencies";
import countries from "app/countries";
let router = useRouter();
let route = useRoute();
let data = ref({
  description: "",
  minimum_price: "",
  maximum_price: "",
});

let options = ["Main"];
// let options = ["Main", "Another Image"];

let imageRole = ref(null);
let basicStoreData = ref({});
let addedProductData = ref({});
let productCategoryListArr = ref([]);
let currencyListArr = ref([]);
let slide = ref(1);
let prodListArr = ref([]);
let productUnitListArr = ref([]);
let progress = ref(1);
let showAddProductImage = ref(false);
let AddProductImageModal = ref(false);
let coverFile = ref(null);
let productImageFile = ref(null);
let editproductImageFile = ref(null);
let AnotherproductImageFile = ref(null);
let editImageModal = ref(false);
let profileFile = ref(null);
let productImagePreview = ref("");
let profileImagePreview = ref("");
let coverFilePreview = ref("");
let addProductModal = ref(false);
let typeOfPrice = ref("fixed");
let selectedCategories = ref("");
let storeDetailsLoadBtn = ref(false);
let actionsModal = ref(false);
let productSubCategoryListArr = ref([]);
let puborUnpubLoadBtn = ref(false);
let loading = ref(false);
let errors = ref({});
let editImageData = ref({});
let countriesArr = ref([]);
let countriesBaseArr = [];

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

const setProductImage = (props) => {
  AnotherproductImageFile.value = props;

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading product image...",
  });
  const formData = new FormData();
  formData.append("media[]", AnotherproductImageFile.value);
  authAxios
    .post(
      `merchant/${store.storedetails.slug}/${data.value.slug}/upload/media`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);
      data.value = {
        ...response.data.data,
        subcategory_id: response.data.data.subcategory.id,
        maximum_price: response.data.data.price.maximum_price,
        minimum_price: response.data.data.price.minimum_price,
      };
      // getProducts();
      Notify.create({
        message: response.data.message + ", product successfully added.",
        color: "green",
        position: "top",
      });
      Loading.hide();
      AnotherproductImageFile.value = null;
      AddProductImageModal.value = false;
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
const editProductImage = (props) => {
  editproductImageFile.value = props;

  Loading.show({
    spinner: QSpinnerOval,
    message: "Editing product image...",
  });

  authAxios
    .post(
      `merchant/product/${editImageData.value.id}/change-image`,
      {
        image: editproductImageFile.value,
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

      getProducts();
      actionsModal.value = false;
      editImageModal.value = false;
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

const editImageProps = (imageData) => {
  editImageData.value = imageData;
  editImageModal.value = true;
};
const deleteImageProps = (imageData) => {
  Dialog.create({
    title: "Confirm",
    message: "Would you like to delete this image?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerOval,
        message: "Deleting...",
      });
      authAxios
        .post(
          `merchant/${store.storedetails.slug}/${data.value.slug}/remove/media?key=${imageData.key}`
        )
        .then((response) => {
          console.log(response);
          data.value = {
            ...response.data.data,
            subcategory_id: response.data.data.subcategory.id,
            maximum_price: response.data.data.price.maximum_price,
            minimum_price: response.data.data.price.minimum_price,
          };
          Notify.create({
            message:
              response.data.message ||
              "You have successfully deleted this image.",
            color: "green",
            position: "top",
          });
          // getProducts();
          actionsModal.value = false;
          Loading.hide();
        })
        .catch(({ response }) => {
          // console.log(response);
          Loading.hide();
          Notify.create({
            message: response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    })

    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
const deletProduct = () => {
  Dialog.create({
    title: "Confirm",
    message:
      "Would you like to delete this product? This is remove this product from the database totally",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerOval,
        message: "Deleting...",
      });
      authAxios
        .delete(`merchant/${store.storedetails.slug}/${data.value.slug}/delete`)
        .then((response) => {
          console.log(response);
          Loading.hide();
          Notify.create({
            message:
              response.data.message ||
              "You have successfully deleted this product.",
            color: "green",
            position: "top",
          });
          router.replace({
            name: "account.dashboard",
          });
        })
        .catch(({ response }) => {
          // console.log(response);
          Loading.hide();
          Notify.create({
            message: response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    })

    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const onRejected = () => {
  Notify.create({
    type: "negative",
    position: "top",
    message: `Your upload size should be less than 500kb `,
  });
};

const publishorUnpublishProduct = () => {
  puborUnpubLoadBtn.value = true;
  if (!data.value.is_published) {
    authAxios
      .post(`merchant/${store.storedetails.slug}/${data.value.slug}/publish`)
      .then((response) => {
        console.log(response);
        puborUnpubLoadBtn.value = false;
        Notify.create({
          message:
            response.data.message +
            ". You have successfully published your product.",
          color: "green",
          position: "top",
        });

        getProducts();
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
      .post(`merchant/${store.storedetails.slug}/${data.value.slug}/publish`)
      .then((response) => {
        console.log(response);
        puborUnpubLoadBtn.value = false;
        Notify.create({
          message:
            response.data.message +
            ". You have successfully unpublished your product.",
          color: "green",
          position: "top",
        });

        getProducts();
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
const updateProductFunction = () => {
  let dataToSend = {
    name: data.value.name,
    currency: data.value.currency,
    minimum_price: data.value.minimum_price,
    maximum_price: data.value.maximum_price ? data.value.maximum_price : "",
    description: data.value.description,
    country: data.value.country,
    condition: data.value.condition,
    subcategory_id: data.value.subcategory_id,
    minimum_order: data.value.minimum_order,
    // ...data.value,
  };
  Loading.show();
  authAxios
    .post(`merchant/${store.storedetails.slug}/${data.value.slug}/edit`, {
      ...dataToSend,
    })
    .then((response) => {
      console.log(response);
      data.value = {
        ...response.data.data,
        subcategory_id: response.data.data.subcategory.id,
        maximum_price: response.data.data.price.maximum_price,
        minimum_price: response.data.data.price.minimum_price,
      };
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
    let getProdDetail = await authAxios.get(`${route.query.slug}/show`);
    console.log(getProdDetail);
    data.value = {
      ...getProdDetail.data.data,
      subcategory_id: getProdDetail.data.data.subcategory.id,
      maximum_price: getProdDetail.data.data.price.maximum_price,
      minimum_price: getProdDetail.data.data.price.minimum_price,
    };
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
    // console.log(route.query.id);
    Loading.show();
    let getProdDetail = await authAxios.get(`${route.query.slug}/show`);
    let prodCatList = await authAxios.get("data?fetch=categories");
    console.log(getProdDetail);
    console.log(prodCatList);
    productCategoryListArr.value = prodCatList.data.data;

    if (getProdDetail.data.data.price.maximum_price > 1) {
      typeOfPrice.value = "range";
    } else {
      typeOfPrice.value = "fixed";
    }

    let mainCatSlug = prodCatList.data.data.find(
      (cat) =>
        cat.id === parseInt(getProdDetail.data.data.subcategory.category_id)
    );
    selectedCategories.value = mainCatSlug.slug;
    getSubcategories();
    data.value = {
      ...getProdDetail.data.data,
      subcategory_id: getProdDetail.data.data.subcategory.id,
      maximum_price: getProdDetail.data.data.price.maximum_price,
      minimum_price: getProdDetail.data.data.price.minimum_price,
    };
    Loading.hide();
  } catch (error) {
    console.error(error);
    Loading.hide();
  }
});
</script>

<style lang="scss" scoped></style>
