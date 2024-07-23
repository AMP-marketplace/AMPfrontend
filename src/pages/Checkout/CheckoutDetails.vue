v
<template>
  <div class="q-my-xl">
    <div class="container">
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md">Checkout</h4>
        <div class=""></div>
      </div>

      <h6>Shipping Address</h6>

      <!-- {{ route.name }} -->
      <div v-if="!authStore.token">
        <q-separator class="q-my-sm" />
        <p class="text-h6">
          Do you already have an account?
          <router-link
            :to="{
              name: 'customer.login',
              query: {
                redirect: route.name,
              },
            }"
          >
            Login
          </router-link>
        </p>
      </div>
      <div v-else>
        <q-separator class="q-my-sm" />
        <p>Fill out your delivery details to checkout</p>
      </div>
      <div class="cart">
        <div class="">
          <div class="small_container left">
            <div style="margin-top: 0" class="auth">
              <form @submit.prevent="handleCheckout">
                <div v-if="!authStore.token" class="input_wrap">
                  <label for="">Email Address <span>*</span></label>
                  <div class="input">
                    <input v-model="data.email" required type="email" />
                  </div>
                  <small v-if="errors.email" class="text-red text-weight-bold">
                    {{ errors.email[0] }}
                  </small>
                </div>
                <!-- <p class="text-primary q-my-md smallerText">
                  You can create an account after checkout.
                </p> -->
                <q-separator />

                <div v-if="!authStore.token" class="input_wrap">
                  <label for="">First Name <span>*</span></label>
                  <div class="input">
                    <input v-model="data.firstname" required type="text" />
                  </div>

                  <small
                    v-if="errors.firstname"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.firstname[0] }}
                  </small>
                </div>
                <div v-if="!authStore.token" class="input_wrap">
                  <label for="">Last Name <span>*</span></label>
                  <div class="input">
                    <input v-model="data.lastname" required type="text" />
                  </div>
                  <small
                    v-if="errors.lastname"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.lastname[0] }}
                  </small>
                </div>
                <div v-if="!authStore.token" class="phone">
                  <label for="">Phone Number<span>*</span></label>
                  <div class="phone_wrap">
                    <div class="country_select">
                      <div class="input_wrap">
                        <div class="input">
                          <select v-model="country_code">
                            <option
                              v-for="(country, index) in countries"
                              :key="index"
                              :value="country.phoneCode"
                            >
                              {{ country.phoneCode }} {{ country.flag }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="input">
                        <input
                          v-model="data.phone"
                          placeholder="Enter phone number"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <small v-if="errors.phone" class="text-red text-weight-bold">
                    {{ errors.phone[0] }}
                  </small>
                </div>
                <div v-if="!authStore.token" class="password">
                  <div class="input_wrap">
                    <label for=""> Password<span>*</span></label>
                    <div class="input row justify-between no-wrap">
                      <input
                        v-model="data.password"
                        required
                        :type="!viewConfirmPassword ? 'password' : 'text'"
                      />
                      <q-btn
                        @click="viewConfirmPassword = !viewConfirmPassword"
                        flat
                        icon="visibility"
                      >
                      </q-btn>
                    </div>
                    <small
                      v-if="errors.confirm_password"
                      class="text-red text-weight-bold"
                    >
                      {{ errors.confirm_password[0] }}
                    </small>
                    <small
                      v-if="errors.confirm_password"
                      class="text-red text-weight-bold"
                    >
                      {{ errors.confirm_password[0] }}
                    </small>
                  </div>
                </div>
                <div class="input_wrap">
                  <label for="">Street Address <span>*</span></label>
                  <div class="input">
                    <textarea
                      v-model="data.street_address"
                      required
                      cols="30"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <div class="input_wrap">
                  <label for="">City <span>*</span></label>
                  <div class="input">
                    <input v-model="data.city" required type="text" />
                  </div>
                </div>
                <!-- <div class="input_wrap">
                <label for="">State/Province<span>*</span></label>
                <div class="input">
                  <select v-model="data.state" >
                    <option disabled value="">
                      Please, select a region, state or province
                    </option>
                  </select>
                </div>
              </div> -->

                <div class="input_wrap">
                  <label for="">Zip/Postal Code <span>*</span></label>
                  <div class="input">
                    <input v-model="data.zip_code" required type="number" />
                  </div>
                </div>

                <!-- <div class="input_wrap">
                <label for="">Country<span>*</span></label>
                <div class="input">
                  <select v-model="data.state" >
                    <option disabled value="">United States</option>
                  </select>
                </div>
              </div> -->
                <div class="input_wrap q-sel">
                  <label for=""> Country <span>*</span></label>
                  <div class="input">
                    <q-select
                      v-model="data.country_id"
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
                  <small
                    v-if="errors.country_id"
                    class="text-weight-bold text-red"
                  >
                    {{ errors.country_id[0] }}
                  </small>
                </div>

                <q-separator class="q-mt-lg" />
                <div class="row justify-start q-mt-lg">
                  <q-btn
                    color="primary"
                    class="q-px-xl"
                    rounded
                    no-wrap
                    :loading="loadBtn"
                    no-caps
                    type="submit"
                  >
                    Next
                  </q-btn>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="checkout_details">
          <h4 class="bigMediumText">Order Summary</h4>
          <q-separator class="q-mt-md" />
          <p class="smallerText q-mb-md text-primary">
            {{ cartStore.cart.length }} Items in Cart
          </p>
          <div class="q-my-lg">
            <div
              v-for="(item, index) in cartStore.cart"
              :key="index"
              style="gap: 0.5rem"
              class="row no-wrap q-my-md items-center"
            >
              <img
                style="width: 82px; height: 82px; object-fit: contain"
                :src="item.product.media ? item.product.media[0].url : ''"
                :alt="item.product.name"
              />
              <div>
                <p class="smallerText">
                  {{ item.product.name }}
                </p>
                <p>
                  <span class="text-primary"
                    >Purchase quantity : {{ item.quantity }}</span
                  >
                </p>
                <p class="smallerText">
                  <!-- <span class="q-mx-sm"></span> -->
                  <span class="text-weight-bold"
                    >₦{{
                      parseInt(item.product.price.minimum_price) * item.quantity
                    }}</span
                  >
                </p>
              </div>
              <q-separator />
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="row q-mt-sm justify-between items-center">
            <p class="smallerText">VAT</p>
            <p class="smallText">₦{{ cartStore.totalPrice * 0.075 }}</p>
          </div>
          <q-separator class="q-my-md" />
          <div class="row q-mt-sm justify-between items-center">
            <p class="smallerText">Sub Total</p>
            <p class="smallText">₦{{ cartStore.totalPrice }}</p>
          </div>
          <q-separator class="q-my-md" />
          <div class="row q-mt-sm justify-between items-center">
            <p class="smallerText">Order Total</p>
            <p class="smallText">
              ₦{{ cartStore.totalPrice + cartStore.totalPrice * 0.075 }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
  <q-dialog class="dialog" v-model="orderSuccessModal" persistent>
    <div class="auth">
      <q-card class="billing">
        <div class="text-center q-mb-lg">
          <div class="bigMediumText">Success!</div>
          <div class="smallText q-mt-md text-center">
            You have succesfully placed an order...
          </div>
          <!-- <div class="smallText q-mt-md text-center">
            You have succesfully placed an order , now you can <br />
            keep track or your order till it reaches you
          </div> -->
        </div>

        <div class="total no-wrap row justify-center q-mt-md items-center">
          <q-btn
            class="apply bg-primary q-px-xl q-mt-md"
            no-caps
            flat
            @click="initPayment"
            rounded
            text-color="white"
          >
            Continue to pay
          </q-btn>
          <!-- <q-btn
            class="apply bg-primary q-px-xl q-mt-md"
            no-caps
            flat
            :to="{ name: 'order.tracking' }"
            rounded
            text-color="white"
          >
            Track Order
          </q-btn> -->
        </div>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useCartStore } from "src/stores/cart";
import FooterCompVue from "src/components/FooterComp.vue";
import { Loading, Notify, QSpinnerRings } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute, useRouter } from "vue-router";
import countries from "app/countries";
let route = useRoute();
let router = useRouter();
let cartStore = useCartStore();
let authStore = useMyAuthStore();
let data = ref({});
let errors = ref({});
let loading = ref(false);
let loadBtn = ref(false);
let orderSuccessModal = ref(false);
let viewConfirmPassword = ref(false);
let countriesArr = ref([]);
let countriesBaseArr = [];
let country_code = ref("+234");

watch(
  () => authStore.token,
  (newValue, oldValue) => {
    // console.log(newValue);
    // console.log(oldValue);
    data.value = {};
  },
  { deep: true }
);

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
const getCountries = async () => {
  try {
    Loading.show();
    let countriesResp = await authAxios.get("country/supported-countries");
    countriesBaseArr = countriesResp.data.data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((country) => ({
        ...country,
        label: country.name,
        value: country.id,
      }));

    Loading.hide();
  } catch (error) {
    console.error(error);
  }
};
const onRequest = (props) => {
  if (authStore.token) {
    data.value = {
      ...authStore.userdetails,
      phone: authStore.userdetails.phone.substring(4),
    };
  }
};
const handleCheckout = () => {
  if (authStore.token) {
    updateShippingDetails();
  } else {
    loadBtn.value = true;
    authAxios
      .post("customer/signup", {
        firstname: data.value.firstname,
        lastname: data.value.lastname,
        email: data.value.email,
        phone: country_code.value + data.value.phone,
        password: data.value.password,
        confirm_password: data.value.password,
      })
      .then((response) => {
        console.log(response);
        // Notify.create({
        //   message: response.data.message,
        //   color: "green",
        //   position: "top",
        // });
        loadBtn.value = false;
        authStore.setUserDetails(response);
        updateShippingDetails();
      })
      .catch(({ response }) => {
        console.log(response);
        loadBtn.value = false;
        errors.value = response.data.data.errors || {};
        Notify.create({
          message: response.data.message
            ? response.data.message
            : "Recheck your credentials",
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
};
const updateShippingDetails = () => {
  Loading.show({
    spinner: QSpinnerRings,
    spinnerColor: "yellow",
    spinnerSize: 140,
    message: "Hold on... We are creating your order",
    messageColor: "white",
  });
  authAxios
    .post("customer/shipping/address/update", {
      // ...data.value,
      country_id: data.value.country_id.value,
      city_id: 2,
      state_id: 3,
      zip_code: data.value.zip_code.toString(),
      street_address: data.value.street_address,
    })
    .then((response) => {
      console.log(response);
      // loadBtn.value = false;
      authStore.userdetails.address = response.data.data.street_address;
      // authStore.userdetails.zip_code = response.data.data.zip_code;
      createOrder();
    })
    .catch(({ response }) => {
      errors.value = response.data.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const createOrder = () => {
  if (!cartStore.cart.length) {
    Loading.hide();
    Notify.create({
      message: "You have not added any items to cart",
      color: "red",
      position: "top",
    });

    return;
  } else {
    const result = cartStore.cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));
    const formData = new FormData();
    for (var key in result) {
      formData.append(key, JSON.stringify(result[key]));
    }
    authAxios
      .post(
        "customer/order/create",
        {
          cart_items: result,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        loadBtn.value = false;
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
        // cartStore.cart = [];

        cartStore.orderDetail = response.data.data;
        Loading.hide();
        orderSuccessModal.value = true;
      })
      .catch(({ response }) => {
        errors.value = response.data.data.errors;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
        Loading.hide();
      });
  }
};
const initPayment = () => {
  Loading.show({
    spinner: QSpinnerRings,
    spinnerColor: "yellow",
    spinnerSize: 140,
    message: "Initializing payment...",
    messageColor: "white",
  });
  // customer/payment/initialize
  authAxios
    .post("customer/order/payment/initialize")
    .then((response) => {
      console.log(response);
      loadBtn.value = false;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      cartStore.cart = [];

      // cartStore.orderDetail = response.data.data;
      console.log(response.data.data.paystack);
      Loading.hide();
      window.location.href = response.data.data.data.authorization_url;
      // router.replace({ name: "order.tracking" });
    })
    .catch(({ response }) => {
      Loading.hide();
      loadBtn.value = false;
      errors.value = response.data.data.errors;
      console.log(
        Object.values(response.data.data.errors).map((error) => error + ",")
      );
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

onMounted(async () => {
  try {
    onRequest();
    countriesBaseArr = countries.map((country) => ({
      ...country,
      label: country.name,
      value: country.code,
    }));
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.cart {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  .small_container.left {
    width: 90%;
  }
}

@media (max-width: 800px) {
  .cart {
    grid-template-columns: 1fr;
    .small_container.left {
      width: 100%;
    }
  }
}
</style>
