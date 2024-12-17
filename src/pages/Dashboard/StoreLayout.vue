<template>
  <div class="container q-py-sm">
    <div>
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
        <p class="q-mt-md text-weight-bold">
          Note: For best result use a banner image with dimensions 1000 * 500px
          and logo image with dimensions 200 by 200px
        </p>
        <div class="q-mt-lg">
          <div style="gap: 2rem" class="row items-center no-wrap">
            <!-- {{ profileFilePreview }} -->
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
              <div v-if="store.storedetails.subscription !== null">
                <q-badge class="text-body2" color="green-7">
                  Your are now the subscribed to the
                  {{ store.storedetails?.subscription?.name }} plan
                </q-badge>
              </div>

              <small class="text-primary"
                ><i class="fa-solid fa-location-dot"></i>
                {{ store.storedetails.address }}</small
              >
              <div
                style="gap: 1rem"
                class="row q-mt-sm items-center justify-start no-wrap"
              >
                <q-btn
                  @click="toggleEditStoreData"
                  no-caps
                  no-wrap
                  color="primary"
                >
                  <i class="fa-solid q-mr-sm fa-pen-to-square"></i> Edit Details
                </q-btn>
                <q-btn
                  :to="{ name: 'forgot.password' }"
                  no-caps
                  no-wrap
                  color="primary"
                >
                  <i class="fa-solid q-mr-sm fa-lock"></i> Reset password
                </q-btn>
              </div>
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
        <div
          v-if="store.storedetails.subscription === null"
          class="q-pa-md q-gutter-sm"
        >
          <q-banner inline-actions rounded class="bg-black text-white">
            You currently are not on any subscription subscribe to get more
            benefits like a verified badge etc...

            <template v-slot:action>
              <q-btn
                flat
                :to="{ name: 'plans.page' }"
                class="bg-white"
                no-caps
                no-wrap
                text-color="black"
                label="Select plan"
              />
              <!-- <q-btn flat label="Dismiss" /> -->
            </template>
          </q-banner>
        </div>
        <div
          v-if="store.userdetails.email_verified_at === null"
          class="q-pa-md q-gutter-sm"
        >
          <q-banner inline-actions rounded class="bg-red-2 text-black">
            You have not verified your email yet...

            <template v-slot:action>
              <q-btn
                flat
                :to="{ name: 'verify.email' }"
                class="bg-white"
                no-caps
                no-wrap
                text-color="black"
                label="Verify email"
              />
              <!-- <q-btn flat label="Dismiss" /> -->
            </template>
          </q-banner>
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
                <q-item-section>Payments </q-item-section>
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
              <!-- <q-item
                :to="{ name: 'dispatch.riders' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Dispatch Drivers </q-item-section>
              </q-item> -->
              <q-item
                :to="{ name: 'account.info' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Bank Account Information </q-item-section>
              </q-item>
              <q-item
                :to="{ name: 'merchant.messages' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Messages </q-item-section>
              </q-item>
              <q-item
                :to="{ name: 'merchant.analytics' }"
                class="navLinks"
                clickable
                v-ripple
              >
                <q-item-section> Analytics </q-item-section>
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

  <q-dialog v-model="editStoreDetailsModal">
    <q-card>
      <div class="top_modal row items-center justify-between">
        <h4 class="text1">Edit Store Details</h4>

        <q-btn @click="editStoreDetailsModal = false" flat rounded>
          <img src="../../assets/circle.svg" alt="" />
        </q-btn>
      </div>

      <q-separator class="q-mt-lg" />
      <div class="auth">
        <form @submit.prevent="editStore">
          <div class="input_wrap">
            <label for="">Store Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.business_name"
                placeholder="Enter store name"
                required
                type="text"
              />
            </div>
          </div>
          <div class="input_wrap">
            <label for="">Description <span>*</span></label>
            <div class="input">
              <textarea
                placeholder="store description"
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
              <label for="">Address <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.address"
                  placeholder=""
                  required
                  type="text"
                />
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
              Save changes
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
      <!-- <q-item
        :to="{ name: 'payment.escrow' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Account and Payment (Escrow) </q-item-section>
      </q-item> -->
      <q-item
        :to="{ name: 'customer.orders' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Customer Orders </q-item-section>
      </q-item>

      <!-- <q-separator />
      <q-item
        :to="{ name: 'dispatch.riders' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Dispatch Drivers </q-item-section>
      </q-item> -->
      <q-item
        :to="{ name: 'account.info' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Bank Account Information </q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'merchant.messages' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Messages </q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'merchant.analytics' }"
        class="navLinks"
        clickable
        v-ripple
      >
        <q-item-section> Analytics </q-item-section>
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
import { Loading, Notify, QSpinnerOval, QSpinnerRings } from "quasar";
import { ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { authAxios } from "src/boot/axios";

import FooterCompVue from "src/components/FooterComp.vue";
import countries from "../../../countries";
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
let editStoreDetailsModal = ref(false);
let basicStoreData = ref({});
let errors = ref({});
let addedProductData = ref({});
let productCategoryListArr = ref([]);
let currencyListArr = ref([]);
let prodListArr = ref([]);
let productUnitListArr = ref([]);

const toggleEditStoreData = () => {
  data.value = {
    business_name: store.storedetails.business_name,
    description: store.storedetails.description,
    address: store.storedetails.address,
    country: store.storedetails.country,
  };

  editStoreDetailsModal.value = !editStoreDetailsModal.value;
};

const editStore = () => {
  Loading.show({
    spinner: QSpinnerOval,
    message: "Editing store data...",
  });
  authAxios
    .patch(`merchant/${store.storedetails.slug}/update`, {
      ...data.value,
    })
    .then((response) => {
      console.log(response);
      store.storedetails = response.data.data;
      Notify.create({
        message: response.data.message
          ? response.data.message
          : "Store data successfully edited",
        color: "green",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
      editStoreDetailsModal.value = false;
      Loading.hide();
    })
    .catch(({ response }) => {
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
  const files = Array.isArray(props) ? props : [props]; // Handle single or multiple files
  const formData = new FormData();
  productImageFile.value = files; // Store the selected files
  productImagePreview.value = []; // Initialize previews array

  files.forEach((file) => {
    formData.append("media[]", file);
    // formData.append("role[]", "main"); // Add role for each file if needed

    // Generate preview for each file
    const reader = new FileReader();
    reader.onload = (e) => {
      productImagePreview.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading product image(s)...",
  });

  authAxios
    .post(
      `merchant/${store.storedetails.slug}/${addedProductData.value.slug}/media/upload`,
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
        message:
          response.data.message + ", product image(s) successfully added.",
        color: "green",
        position: "top",
      });

      Loading.hide();
      addProductModal.value = false;
      productImageFile.value = null; // Reset file selection
      productImagePreview.value = []; // Clear previews
      getProducts(); // Fetch updated product list
    })
    .catch(({ response }) => {
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
