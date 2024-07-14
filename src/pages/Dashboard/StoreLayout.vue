<template>
  <div class="container q-py-sm">
    <div>
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

        <q-separator class="q-mb-xl" />
        <div class="row justify-start">
          <q-btn
            class="expand_cats"
            dense
            round
            unelevated
            color="accent"
            icon="chevron_right"
            @click="drawer = !drawer"
          />
          <!-- <q-btn
            @click="addProductModal = !addProductModal"
            no-wrap
            no-caps
            rounded
            color="primary"
            >Add product</q-btn
          > -->
        </div>
        <div class="grid_">
          <div class="q-mt-lg links_left">
            <!-- <h4 class="bigText q-pa-sm q-mb-md">My Dashbaord</h4> -->
            <q-list>
              <q-item
                :to="{
                  name: 'account.dashboard',
                }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Account Dashboard </q-item-section>
              </q-item>
              <q-item
                :to="{ name: 'payment.escrow' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Account and Payment (Escrow) </q-item-section>
              </q-item>
              <q-item
                :to="{ name: 'customer.orders' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Customer Orders </q-item-section>
              </q-item>
              <!-- <q-item
                :to="{ name: 'history' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> History </q-item-section>
              </q-item> -->
              <q-separator />
              <q-item
                :to="{ name: 'dispatch.riders' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Dispatch Drivers </q-item-section>
              </q-item>
              <q-item
                :to="{ name: 'account.info' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Account Information </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="right">
            <router-view />
            <!-- <img
              style="width: 308.001px; height: 204.304px"
              src="../../assets/box.png"
              alt=""
            />
            <p class="smallText q-my-lg">
              You have no product on your store at this time
            </p>

            <q-btn no-wrap no-caps rounded color="primary">Add product</q-btn> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <FooterCompVue /> -->

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

  <q-drawer
    v-model="drawer"
    @click.capture="drawer = !drawer"
    :width="250"
    :breakpoint="800"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-list>
      <q-item
        :to="{
          name: 'account.dashboard',
        }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Account Dashboard </q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'payment.escrow' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Account and Payment (Escrow) </q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'customer.orders' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Customer Orders </q-item-section>
      </q-item>

      <q-separator />
      <q-item
        :to="{ name: 'dispatch.riders' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Dispatch Drivers </q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'account.info' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Account Information </q-item-section>
      </q-item>
    </q-list>

    <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
  </q-drawer>
</template>

<script setup>
import { Loading, Notify, QSpinnerOval } from "quasar";
import { ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
let store = useMyAuthStore();
let data = ref({
  location: "",
  productImage: null,
  attributes: [],
});
let progress = ref(2);
let coverFile = ref(null);
let profileFile = ref(null);
let productImageFile = ref(null);
let productImagePreview = ref("");
let profileFilePreview = ref("");
let coverFilePreview = ref("");
let addProductModal = ref(false);
let drawer = ref(false);
let showAddProductImage = ref(false);
let storeDetailsLoadBtn = ref(false);
let basicStoreData = ref({});
let addedProductData = ref({});
let productCategoryListArr = ref([]);
let currencyListArr = ref([]);
let prodListArr = ref([]);
let productUnitListArr = ref([]);
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
</script>

<style lang="scss" scoped></style>
