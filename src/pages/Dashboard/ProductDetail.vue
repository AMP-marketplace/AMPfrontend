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
      <div class="">
        <q-btn
          :color="data.published === false ? 'red-7' : 'green-7'"
          class="q-px-md"
          no-caps
          :loading="puborUnpubLoadBtn"
          @click="publishorUnpublishProduct"
          no-wrap
        >
          {{
            data.published === false ? "Publish product" : "Unublish product"
          }}
        </q-btn>
      </div>
    </div>

    <q-separator class="q-my-sm" />

    <div class="auth">
      <!-- <div
        style="gap: 1rem"
        class="input justify-between row items-center no-wrap"
      >
        <q-file
          @update:model-value="changeProductImage"
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
      </div> -->

      <div class="create_store_2">
        <!-- <div
          :style="`background: url(${
            data?.images ? data?.images[0]?.url : productImagePreview
          }), #4f4f4f; background-repeat: no-repeat; background-size:cover`"
          class="hero"
        >
          <q-file
            @update:model-value="changeProductImage"
            accept=".jpg,.png,.svg,.jpeg"
            :label="'Change Main Product Image'"
            outlined
            class="orderpage text-white"
            style="max-width: 300px; margin: 0 auto"
            v-model="productImageFile"
          />
        </div> -->
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
              v-for="(images, index) in data.images"
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
          Add another product image
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
        <h6 class="text-h6 text-center">Do you want to another image?</h6>
        <!-- <h6 class="text-h6 text-center">
          Do you want to change the main image or upload another image?
        </h6> -->
        <div class="q-mt-sm">
          <!-- {{ imageRole }} -->
          <q-select v-model="imageRole" :options="options" label="Select" />
        </div>
      </div>
      <q-file
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
      </q-file>
    </q-card>
  </q-dialog>
  <q-dialog v-model="editImageModal">
    <q-card>
      <q-file
        @update:model-value="editProductImage"
        accept=".png,.jpeg,.svg,.jpg"
        class="column profile_field justify-center items-center"
        v-model="editproductImageFile"
        max-file-size="2097152"
        @rejected="onRejected"
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
      <q-list bordered separator padding class="rounded-borders">
        <q-item-label header>Images</q-item-label>

        <q-item
          v-for="(images, index) in data.images"
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
            <q-item-label caption>{{
              new Date(images.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div style="gap: 1rem" class="row items-center no-wrap">
              <q-btn @click="editImageProps(images)" color="green-7"
                ><i class="fa-solid fa-pen-to-square"></i
              ></q-btn>
              <q-btn @click="deleteImageProps(images)" color="red-7"
                ><i class="fa-solid fa-trash"></i
              ></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
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
let router = useRouter();
let route = useRoute();
let data = ref({
  product_category_id: "",
  product_unit_id: "",
  currency_id: "",
  // attributes: [],
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
let storeDetailsLoadBtn = ref(false);
let actionsModal = ref(false);
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
  // var reader = new FileReader();
  // reader.onload = (e) => {
  //   productImagePreview.value = e.target.result;
  // };
  // reader.readAsDataURL(props);
  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading product image...",
  });

  authAxios
    .post(
      `merchant/product/${route.query.id}/upload-image`,
      {
        image: AnotherproductImageFile.value,
        role: imageRole.value === "Main" ? "main" : "",
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
      AddProductImageModal.value = false;
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
        .post(`merchant/product/${imageData.id}/delete-image`)
        .then((response) => {
          console.log(response);
          Notify.create({
            message:
              response.data.message ||
              "You have successfully deleted this image.",
            color: "green",
            position: "top",
          });
          getProducts();
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
const changeProductImage = (props) => {
  console.log(props);
  productImageFile.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    productImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);

  Loading.show({
    spinner: QSpinnerOval,
    message: "Updating product image...",
  });
  let urlToSend = data.value.images.length
    ? `merchant/product/${data.value.images[0].id}/change-image`
    : `merchant/product/${data.value.id}/upload-image`;
  authAxios
    .post(
      urlToSend,
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
        message:
          response.data.message + ", product image successfully updated.",
        color: "green",
        position: "top",
      });
      Loading.hide();
      productImageFile.value = null;
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

const publishorUnpublishProduct = () => {
  puborUnpubLoadBtn.value = true;
  if (!data.value.published) {
    authAxios
      .post(`merchant/product/${data.value.id}/publish`, {
        published: 1,
      })
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
      .post(`merchant/product/${data.value.id}/publish`, {
        published: 0,
      })
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
    ...data.value,
    store_id: store.storedetails.id,
  };
  Loading.show();
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
    let prodList = await authAxios.get("merchant/product/list");
    data.value = prodList.data.data.data.filter(
      (product) => product.id === parseInt(route.query.id)
    )[0];
    Loading.hide();
  } catch (error) {
    console.error(error);
  }
};
onMounted(async () => {
  try {
    // console.log(route.query.id);
    Loading.show();
    let getProdDetail = await authAxios.get(`product/show/${route.query.id}`);
    let prodCatList = await authAxios.get("product/category/list");
    let prodUnitList = await authAxios.get("product/unit/list");
    let currList = await authAxios.get("currency/list");
    console.log(getProdDetail);

    productCategoryListArr.value = prodCatList.data.data;
    productUnitListArr.value = prodUnitList.data.data;
    currencyListArr.value = currList.data.data;
    // prodListArr.value = prodList.data.data.data;
    getProducts();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
