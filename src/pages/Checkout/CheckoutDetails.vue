v
<template>
  <div class="q-my-xl">
    <div class="container">
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md">Checkout</h4>
        <div class=""></div>
      </div>

      <!-- <h6>Shipping Address</h6> -->

      <!-- {{ route.name }} -->
      <div style="max-width: 700px" v-if="!authStore.token">
        <q-separator class="q-my-xs" />
        <p class="text-body1">
          Do you already have an account?
          <router-link
            class="text-primary"
            :to="{
              name: 'customer.login',
              query: {
                redirect: route.name,
              },
            }"
          >
            Login
          </router-link>

          or continue to create a new acount to checkout. You can use a default
          shipping address when you are logged in.
        </p>
        <p class="text-grey-7 text-weight-bold">
          Note: At this point you should have discussed delivery fee or delivery
          procedure with vendors, find the delivery type selection below.
        </p>
      </div>
      <div style="max-width: 700px" v-else>
        <q-separator class="q-my-sm" />
        <p>
          You can select from a list of delivery addresses you have checkedout
          with before or fill out delivery details to checkout
        </p>

        <p class="text-red-7 text-weight-bold">
          Note: If you select an address from the previous addresses you no
          longer need to fill in the form, just select a valid delivery type and
          click continue
        </p>
        <p class="text-grey-7 text-weight-bold">
          Note: At this point you should have discussed delivery fee with
          vendors.
        </p>
      </div>
      <!-- {{ addressData }} -->
      <div class="cart">
        <div class="">
          <div class="small_container left">
            <q-list bordered separator>
              <q-expansion-item
                v-if="authStore.token"
                default-opened
                label="Select from a list of your previous checkout addresses"
              >
                <q-card>
                  <q-card-section>
                    <div>
                      <q-skeleton v-if="loadingAddresses" height="150px" />
                      <div v-if="addressArr.length">
                        <p>Your previous delivery addresses</p>
                        <q-list class="bg-white">
                          <q-scroll-area style="height: 200px">
                            <q-item
                              class="q-my-sm bg-grey-2"
                              v-for="(address, index) in addressArr"
                              :key="index"
                            >
                              <q-item-section>
                                <q-item-label
                                  >{{ address.first_name }}
                                  {{ address.last_name }}</q-item-label
                                >
                                <q-item-label caption lines="2">{{
                                  address.address_line_1
                                }}</q-item-label>
                                <q-item-label caption lines="2"
                                  >{{ address.city }}, {{ address.state }},
                                  {{ address.country }}.</q-item-label
                                >
                                <q-item-label caption lines="2">{{
                                  address.postal_code
                                }}</q-item-label>
                              </q-item-section>

                              <q-item-section side top>
                                <div
                                  style="gap: 1rem"
                                  class="row q-mt-md items-center no-wrap"
                                >
                                  <q-btn
                                    @click="setDefault(address)"
                                    no-caps
                                    no-wrap
                                    color="green-7"
                                  >
                                    Use this delivery address
                                  </q-btn>
                                </div>
                              </q-item-section>

                              <q-badge
                                v-if="
                                  address.address_line_1 ===
                                  addressData.address_line_1
                                "
                                color="green"
                                floating
                              >
                                selected
                              </q-badge>
                            </q-item>
                          </q-scroll-area>
                        </q-list>
                      </div>

                      <div
                        v-if="!addressArr.length"
                        class="column items-center text-center justify-center"
                      >
                        <img
                          style="width: 150px"
                          src="/images/box.png"
                          alt=""
                        />
                        <p class="q-mt-sm">
                          You have not checked out with any addresses yet, you
                          don't have any previous address.
                        </p>
                      </div>
                    </div>
                  </q-card-section>
                  <p
                    class="text-green-7 q-px-md text-weight-bold"
                    v-if="addressData.address_line_1"
                  >
                    Please proceed to select delivery type
                  </p>
                  <div style="margin-top: 0" class="auth q-px-md">
                    <div
                      :class="addressData.address_line_1 ? 'add_border' : ''"
                      class="input_wrap"
                    >
                      <label for="">Delivery type </label>
                      <div class="input">
                        <select v-model="delivery_method">
                          <option value="Enter Delivery Amount from Seller">
                            Enter Delivery Amount from Seller – Allows the buyer
                            to input the agreed delivery fee with the vendor.
                          </option>
                          <option value="Free Delivery">
                            Free Delivery – Select this option if the vendor
                            offers free delivery for the purchase.
                          </option>
                          <option value="Using My Own Delivery Pickup">
                            Using My Own Delivery Pickup – Choose this option if
                            the buyer plans to arrange their own logistics or
                            pickup.
                          </option>
                        </select>
                      </div>
                    </div>
                    <div
                      v-if="
                        delivery_method === 'Enter Delivery Amount from Seller'
                      "
                      class="input_wrap"
                    >
                      <label for=""
                        >Delivery cost(from seller) in dollars($)
                        <span>*</span></label
                      >
                      <div class="input">
                        <input v-model="delivery_cost" type="number" />
                      </div>
                    </div>
                  </div>
                  <div class="q-pa-md">
                    <div class="row items-center justify-center">
                      <q-btn
                        :disable="
                          !addressData.address_line_1 || !delivery_method
                        "
                        @click="checkoutCurrencyModal = !checkoutCurrencyModal"
                        color="green-7"
                        no-caps
                        v-if="addressArr.length"
                        no-wrap
                      >
                        Continue
                      </q-btn>
                    </div>
                    <p v-if="addressArr.length" class="q-mt-xs text-center">
                      Please make sure you have selected
                      <span class="text-weight-bold text-green-7"
                        >an address
                      </span>
                      and a
                      <span class="text-weight-bold text-green-7">
                        valid delivery type
                      </span>
                      before clicking continue
                    </p>
                  </div>
                </q-card>
              </q-expansion-item>
            </q-list>
            <div class="text-h5 text-center q-my-sm" v-if="authStore.token">
              OR
            </div>
            <q-list bordered separator>
              <q-expansion-item
                :label="
                  authStore.token
                    ? 'Use another delivery address'
                    : 'Create a new account with a delivery address to checkout'
                "
              >
                <q-card>
                  <q-card-section>
                    <div>
                      <div style="margin-top: 0" class="auth">
                        <form @submit.prevent="handleCheckout">
                          <div v-if="!authStore.token" class="input_wrap">
                            <label for="">Email Address <span>*</span></label>
                            <div class="input">
                              <input
                                v-model="data.email"
                                required
                                type="email"
                              />
                            </div>
                            <small
                              v-if="errors.email"
                              class="text-red text-weight-bold"
                            >
                              {{ errors.email[0] }}
                            </small>
                          </div>
                          <!-- <p class="text-primary q-my-md smallerText">
                  You can create an account after checkout.
                </p> -->
                          <q-separator />

                          <div class="input_wrap">
                            <label for="">First Name <span>*</span></label>
                            <div class="input">
                              <input
                                v-model="data.first_name"
                                required
                                type="text"
                              />
                            </div>

                            <small
                              v-if="errors.first_name"
                              class="text-red text-weight-bold"
                            >
                              {{ errors.first_name[0] }}
                            </small>
                          </div>
                          <div class="input_wrap">
                            <label for="">Last Name <span>*</span></label>
                            <div class="input">
                              <input
                                v-model="data.last_name"
                                required
                                type="text"
                              />
                            </div>
                            <small
                              v-if="errors.last_name"
                              class="text-red text-weight-bold"
                            >
                              {{ errors.last_name[0] }}
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
                                        {{ country.phoneCode }}
                                        {{ country.flag }}
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
                            <small
                              v-if="errors.phone"
                              class="text-red text-weight-bold"
                            >
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
                                  :type="
                                    !viewConfirmPassword ? 'password' : 'text'
                                  "
                                />
                                <q-btn
                                  @click="
                                    viewConfirmPassword = !viewConfirmPassword
                                  "
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
                          <div class="input_wrap">
                            <label for="">State <span>*</span></label>
                            <div class="input">
                              <input
                                v-model="data.state"
                                required
                                type="text"
                              />
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
                              <input
                                v-model="data.postal_code"
                                required
                                type="number"
                              />
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
                                v-model="data.country"
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
                              v-if="errors.country"
                              class="text-weight-bold text-red"
                            >
                              {{ errors.country[0] }}
                            </small>
                          </div>
                          <div class="input_wrap">
                            <label for="">Delivery type </label>
                            <div class="input">
                              <select v-model="delivery_method">
                                <option
                                  value="Enter Delivery Amount from Seller"
                                >
                                  Enter Delivery Amount from Seller – Allows the
                                  buyer to input the agreed delivery fee with
                                  the vendor.
                                </option>
                                <option value="Free Delivery">
                                  Free Delivery – Select this option if the
                                  vendor offers free delivery for the purchase.
                                </option>
                                <option value="Using My Own Delivery Pickup">
                                  Using My Own Delivery Pickup – Choose this
                                  option if the buyer plans to arrange their own
                                  logistics or pickup.
                                </option>
                              </select>
                            </div>
                          </div>
                          <div
                            v-if="
                              delivery_method ===
                              'Enter Delivery Amount from Seller'
                            "
                            class="input_wrap"
                          >
                            <label for=""
                              >Delivery cost(from seller) in dollars($)
                              <span>*</span></label
                            >
                            <div class="input">
                              <input v-model="delivery_cost" type="number" />
                            </div>
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
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
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
                    >${{ item.product.cleanedPrice * item.quantity }}</span
                  >
                </p>
              </div>
              <q-separator />
            </div>
          </div>
          <!-- <q-separator class="q-my-md" />
          <div class="row q-mt-sm justify-between items-center">
            <p class="smallerText">VAT</p>
            <p class="smallText">₦{{ cartStore.totalPrice * 0.075 }}</p>
          </div> -->
          <q-separator class="q-my-md" />
          <div class="row q-mt-sm justify-between items-center">
            <p class="smallerText">Sub Total</p>
            <p class="smallText">${{ cartStore.totalPrice + delivery_cost }}</p>
          </div>
          <q-separator class="q-my-md" />
          <div class="row q-mt-sm justify-between items-center">
            <p class="smallerText">Order Total</p>
            <p class="smallText">
              ${{ (cartStore.totalPrice + delivery_cost).toLocaleString() }}
            </p>
          </div>
          <!-- <div class="row q-mt-sm justify-between items-center">
            <p class="smallerText">Order Total</p>
            <p class="smallText">
              ₦{{ cartStore.totalPrice + cartStore.totalPrice * 0.075 }}
            </p>
          </div> -->
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
        </div>

        <div
          style="gap: 0.6rem"
          class="total no-wrap row justify-center q-mt-md items-center"
        >
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
          <q-btn
            class="apply bg-red-6 q-px-xl q-mt-md"
            no-caps
            flat
            @click="orderSuccessModal = !orderSuccessModal"
            rounded
            text-color="white"
          >
            Close
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-dialog>
  <q-dialog class="dialog" v-model="checkoutCurrencyModal" persistent>
    <div class="auth">
      <q-card class="billing">
        <div class="text-center q-mb-lg">
          <div class="bigMediumText">Dear customer</div>
          <!-- <div class="smallText q-mt-md text-center">
            Before creating your order can you select the currency <br />
            you will be checking out with, it can be either Naira or Dollar...
          </div> -->
          <p class="q-mt-sm text-center">
            Dear exteemed customer please note that transactions are
            <br />
            currenctly in Dollars and Naira. <strong>NOTE:</strong> Using the
            Dollar option you can enter a valid Card detail and it will charge
            the dollar equivalent in your local currency.
          </p>
          <!-- <p class="text-green text-weight-bold">
            Please select naira to continue
          </p> -->
          <!-- {{ checkoutCurrency }} -->
          <div class="column justify-center">
            <div class="q-gutter-sm">
              <q-radio v-model="checkoutCurrency" val="dollar" label="Dollar" />
              <q-radio
                @update:model-value="getTotalInCurrencyNaira"
                v-model="checkoutCurrency"
                val="naira"
                label="Naira"
              />
            </div>

            <p v-if="currencyRatesData.rates" class="q-mt-xs">
              Your order total in Naira is
              <strong>
                NGN
                {{
                  (
                    (cartStore.totalPrice + delivery_cost) *
                    currencyRatesData?.rates["NGN"]
                  ).toLocaleString()
                }}</strong
              >
            </p>
          </div>
          <div>
            <div class="input_wrap">
              <label for="">See total in your currency</label>
              <div style="max-width: 400px; margin: 0 auto" class="input">
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
          </div>
          <p class="text-weight-bold text-h5">
            Your order total: ${{
              (cartStore.totalPrice + delivery_cost).toLocaleString()
            }}
          </p>
          {{ showEquivInCurrency }}
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
            Your order total in {{ showEquivInCurrency }} is
            <strong>
              {{ showEquivInCurrency }}
              {{
                (
                  (cartStore.totalPrice + delivery_cost) *
                  currencyRatesData?.rates[showEquivInCurrency]
                ).toLocaleString()
              }}</strong
            >
          </p>
        </div>

        <div class="total no-wrap column justify-center q-mt-md items-center">
          <q-btn
            class="apply bg-primary q-px-xl q-mx-sm q-mt-md"
            no-caps
            flat
            @click="createOrder(addressData.id)"
            rounded
            text-color="white"
          >
            Continue to create order
          </q-btn>
          <q-btn
            class="apply bg-red-6 q-px-xl q-mt-md"
            no-caps
            flat
            @click="checkoutCurrencyModal = !checkoutCurrencyModal"
            rounded
            text-color="white"
          >
            Close
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-dialog>

  <q-dialog v-model="showPaymentForm">
    <q-card>
      <div class="form-header">
        <div>Enter Your Payment Details</div>
      </div>

      <q-form @submit.prevent="handleSubmit" class="q-mt-md">
        <div ref="cardElement" id="card-element" class="q-mb-md"></div>
        <!-- <q-btn type="submit" label="Submit Payment" color="secondary" /> -->
        <div v-if="errorMessage" class="q-mt-md text-negative">
          {{ errorMessage }}
        </div>
        <div class="row justify-center">
          <q-btn
            class="bg-primary q-mt-md text-white"
            type="submit"
            no-caps
            no-wrap
            :loading="loadingBtn"
            >Proceed</q-btn
          >
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useCartStore } from "src/stores/cart";
import FooterCompVue from "src/components/FooterComp.vue";
import { Dialog, Loading, Notify, QSpinnerRings, useQuasar } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import countries from "app/countries";
import currencies from "app/currencies";
let route = useRoute();
let router = useRouter();
let cartStore = useCartStore();
let authStore = useMyAuthStore();
let data = ref({});
let errors = ref({});
let addressArr = ref([]);
let loading = ref(false);
let checkoutCurrencyModal = ref(false);
let loadingAddresses = ref(false);
let showPaymentForm = ref(false);
let addressData = ref({});
let currencyRatesData = ref({});
let loadBtn = ref(false);
let orderSuccessModal = ref(false);
let viewConfirmPassword = ref(false);
let showEquivInCurrency = ref("");
let countriesArr = ref([]);
let countriesBaseArr = [];
let country_code = ref("+234");
let checkoutCurrency = ref("dollar");
let stripeLoaded = ref(false);
let stripeMounted = ref(false);
let delivery_cost = ref(0);
let delivery_method = ref("");
let loadingBtn = ref(false);
let stripeIns = ref(null);
let refValue = ref("");
const $q = useQuasar();
const appearance = {
  theme: "stripe",
  labels: "floating",
};
const options = {
  layout: {
    type: "tabs",
    defaultCollapsed: false,
  },
};
let stripe;
let elements;
let card;
const cardElement = ref(null);
const errorMessage = ref("");
let key = process.env.STRIPE_PUBLISHABLE_KEY;
let stripeSecretKey = process.env.STRIPE_PUBLISHABLE_KEY_SECRET;
watch(
  () => authStore.token,
  (newValue, oldValue) => {
    // console.log(newValue);
    // console.log(oldValue);
    data.value = {};
  },
  { deep: true }
);
watch(showPaymentForm, async (newValue) => {
  if (newValue && !card) {
    stripe = await loadStripe(key);
    elements = stripe.elements({ appearance });
    card = elements.create("card", {
      style: {
        base: {
          fontSize: "16px",
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          "::placeholder": {
            color: "#aab7c4",
          },
          padding: "10px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#f8f9fa", // Light background for better contrast
        },
        invalid: {
          color: "#fa755a", // Error color for invalid input
        },
        complete: {
          color: "#4caf50", // Green color when the card input is valid
        },
      },
    });
    card.mount(cardElement.value);

    // Handle validation errors from the card element
    card.on("change", (event) => {
      errorMessage.value = event.error ? event.error.message : "";
    });
  }
});
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
const handleSubmit = async () => {
  $q.loading.show();

  const { token, error } = await stripe.createToken(card);
  console.log(token);
  if (error) {
    errorMessage.value = error.message;
    $q.loading.hide();
  } else {
    // Send token to the backend to process payment
    try {
      const response = await authAxios.post(
        `payment/charge?type=stripe&reference=${refValue.value}`,
        {
          stripeToken: token.id,
        }
      );

      console.log(response);
      Notify.create({
        message: "Payment Successful...",
        color: "green",
        position: "top",
      });

      Dialog.create({
        title: `Your order payment was successful`,
        message: `Your payment was successful and you are now placed your order. The details of your order will be sent to you via mail.`,
        ok: {
          push: true,
          label: "Proceed",
          color: "green",
        },
        cancel: {
          push: true,
          color: "grey",
        },
        persistent: true,
      })
        .onOk(() => {
          // Loading.show();
          cartStore.cart = [];
          router.replace({
            name: "payment.success.stripe",
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    } catch (err) {
      console.error(err);
      $q.notify({ type: "negative", message: "Payment failed!" });
    } finally {
      $q.loading.hide();
    }
  }
};
const formatPhoneNumber = (phone) => {
  if (phone.startsWith("0")) {
    return phone.slice(1);
  }
};
const setDefault = (address) => {
  addressData.value = address;
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
const getTotalInCurrencyNaira = async () => {
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
  showEquivInCurrency.value = "NGN";
  Loading.hide();
};

const handleCheckout = () => {
  if (authStore.token) {
    updateShippingDetails();
  } else {
    console.log(data.value);
    loadBtn.value = true;
    authAxios
      .post("register", {
        first_name: data.value.first_name,
        last_name: data.value.last_name,
        email: data.value.email,
        phone: data.value.phone.startsWith("0")
          ? country_code.value + formatPhoneNumber(data.value.phone)
          : country_code.value + data.value.phone,
        password: data.value.password,
        role_id: "2",
      })
      .then((response) => {
        console.log(response);
        // Notify.create({
        //   message: response.data.message,
        //   color: "green",
        //   position: "top",
        // });
        loadBtn.value = false;
        authStore.setUserDetails(response.data);
        updateShippingDetails();
      })
      .catch(({ response }) => {
        console.log(response);
        loadBtn.value = false;
        errors.value = response.data.errors || {};
        Notify.create({
          message: response.data.message
            ? response.data.message
            : "Recheck your credentials or login",
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
    message: "Hold on... ",
    messageColor: "white",
  });
  authAxios
    .post("shipping/address/create", {
      first_name: data.value.first_name
        ? data.value.first_name
        : authStore.userdetails.first_name,
      last_name: data.value.last_name
        ? data.value.last_name
        : authStore.userdetails.last_name,
      country: data.value.country.value,
      state: data.value.state,
      city: data.value.city,
      postal_code: data.value.postal_code.toString(),
      address_line_1: data.value.street_address,
      address_line_2: null,
    })
    .then((response) => {
      console.log(response);
      // loadBtn.value = false;
      // authStore.userdetails.address = response.data.street_address;
      // authStore.userdetails.postal_code = response.data.data.postal_code;
      addressData.value = response.data.data;
      checkoutCurrencyModal.value = true;
      Loading.hide();
      // createOrder(response.data.data.id);
    })
    .catch(({ response }) => {
      errors.value = response.data.data.errors;
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const createOrder = (shipping_id) => {
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
      id: item.product.id,
      unit: item.quantity,
      price: item.product.cleanedPrice,
    }));
    console.log(result);
    const formData = new FormData();
    result.forEach((item, index) => {
      formData.append(`products[${index}][id]`, item.id);
      formData.append(`products[${index}][unit]`, item.unit);
      formData.append(`products[${index}][price]`, item.price);
    });
    formData.append("shipping_address_id", shipping_id);
    // formData.append(
    //   "total_amount",
    //   cartStore.totalPrice * currencyRatesData.value?.rates["NGN"]
    // );
    formData.append("total_amount", cartStore.totalPrice + delivery_cost.value);
    Loading.show({
      spinner: QSpinnerRings,
      spinnerColor: "yellow",
      spinnerSize: 140,
      message: "Hold on... We are creating your order",
      messageColor: "white",
    });
    authAxios
      .post("order/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
        refValue.value = response.data.data.reference;
        Loading.hide();
        checkoutCurrencyModal.value = false;
        orderSuccessModal.value = true;
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
  }
};
const initPayment = () => {
  if (checkoutCurrency.value === "dollar") {
    Loading.show();
    orderSuccessModal.value = false;
    showPaymentForm.value = true;
    Loading.hide();
  } else {
    Loading.show();
    // console.log(currencyRatesData?.rates);
    authAxios
      .post(`payment/charge?type=paystack&reference=${refValue.value}`, {
        amount: (
          (cartStore.totalPrice + delivery_cost.value) *
          currencyRatesData.value?.rates[showEquivInCurrency.value]
        ).toString(),
        currency: showEquivInCurrency.value,
      })
      .then(({ data }) => {
        console.log(data);
        Loading.hide();
        Notify.create({
          message: data.message,
          color: "green",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
        window.location.href = data.data;
        cartStore.cart = [];
      })
      .catch(({ response }) => {
        Loading.hide();
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
  // window.location.href = cartStore.orderDetail;
};
const getDeliveryAddresses = () => {
  loadingAddresses.value = true;
  authAxios
    .get(`shipping/address/index`)
    .then(({ data }) => {
      console.log(data);
      addressArr.value = data.data;
      loadingAddresses.value = false;
    })
    .catch(({ response }) => {
      loadingAddresses.value = false;
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
    if (authStore.token) {
      getDeliveryAddresses();
    }
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
