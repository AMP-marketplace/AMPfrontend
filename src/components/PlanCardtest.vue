<template>
  <div class="card">
    <div class="img_wrap">
      <img src="/images/plancircle.png" alt="" />
      <img :src="`/images/sellerplan.png`" alt="" />
    </div>
    <div v-if="plan.name === 'free'" class="title">{{ "Free Plan" }}</div>
    <div v-else-if="plan.name === 'basic'" class="title">
      {{ "Lite Plan" }}
      <!-- {{ "Lite Plan ($7/month or $70/year – Save 17%)" }} -->
    </div>
    <div v-else-if="plan.name === 'standard'" class="title">
      {{ "Pro Plan" }}
      <!-- {{ "Pro Plan ($15/month or $150/year – Save 17%)" }} -->
    </div>

    <div v-else class="title">
      {{ "Elite Plan" }}
      <!-- {{ "Elite Plan ($30/month or $300/year – Save 17%)" }} -->
    </div>
    <div class="amount">
      ${{
        planDesc !== "yearly"
          ? parseInt(plan.price).toLocaleString()
          : parseInt(plan.price).toLocaleString()
      }}
      <!-- ₦{{ plan.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} -->
      <br />
      <!-- {{ planDesc }} -->
      <div class="small">
        {{ planDesc === "month" ? "Per month" : "Per year" }}
      </div>
    </div>
    <!-- {{  }} -->
    <div class="options">
      <div v-if="plan.name === 'free'">
        <div class="q-my-md">
          <p><strong>Perfect for:</strong> New vendors testing the platform.</p>
          <h6 class="text-weight-bold">Features:</h6>
        </div>
        <ul>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Access to RFQs after 48 hours of posting
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Upload up to 5 products
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Send 10 buyer
            messages per month
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Basic
            storefront
          </li>
          <li>❌ <span class="ml-sm">No analytics</span></li>
          <li>❌ <span class="ml-sm">No search priority</span></li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Local pricing
            display available
          </li>
        </ul>
        <p class="q-mt-md">
          <strong
            >Start for free and upgrade to get first dibs on high-value
            RFQs!</strong
          >
        </p>
      </div>

      <div v-else-if="plan.name === 'basic'">
        <div class="q-my-md">
          <p><strong>Perfect for:</strong>Small businesses ready to grow.</p>
          <h6 class="text-weight-bold">Features:</h6>
        </div>
        <ul>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Access to RFQs after 36 hours of posting
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Upload up to 20 products
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Send 30 buyer
            messages per month
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Basic analytics
            (traffic and product views)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Category
            listing priority (Page 2 for niche searches)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Email support
            (72-hour response time)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Local pricing
            display available
          </li>
        </ul>

        <p class="q-mt-md">
          <strong>Get faster RFQ access and grow your business!</strong>
        </p>
      </div>

      <div v-else-if="plan.name === 'standard'">
        <div class="q-my-md">
          <p>
            <strong>Perfect for:</strong>Growing businesses with steady demand.
          </p>
          <h6 class="text-weight-bold">Features:</h6>
        </div>
        <ul>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Access to RFQs after 24 hours of posting
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Upload up to 50 products
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Unlimited buyer
            messages
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Advanced
            analytics (customer demographics, search trends)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Search result
            boost (Page 1 for niche keywords)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Live chat
            support
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Local pricing
            display available
          </li>
        </ul>

        <p class="q-mt-md">
          <strong
            >Join 50+ businesses scaling with Pro Plan insights and faster RFQ
            access!</strong
          >
        </p>
      </div>

      <div v-else>
        <div class="q-my-md">
          <p>
            <strong>Perfect for:</strong>Established businesses looking to
            dominate.
          </p>
          <h6 class="text-weight-bold">Features:</h6>
        </div>
        <ul>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Immediate access to RFQs after screening
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Upload up to 100 products
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i>
            Priority RFQ access (Guaranteed 20 high-value RFQs per month)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Full analytics
            suite (sales forecasting, competitor insights)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Homepage
            feature (rotating banner, 1 week per month)
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> 24/7 priority
            support + dedicated account manager
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> “Top Seller”
            badge for credibility
          </li>
          <li>
            <i class="fa-solid q-mr-sm text-green fa-check"></i> Local pricing
            display available
          </li>
          <!-- <li v-for="(option, index) in plan.description" :key="index">
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          {{ option }}
        </li> -->
        </ul>
        <p class="q-mt-md">
          <strong
            >Elite users see 2x more RFQs and 40% faster sales cycles!</strong
          >
        </p>
      </div>
    </div>

    <div class="btn">
      <q-btn
        v-if="plan.name === 'free'"
        :to="{ name: 'account.dashboard' }"
        color="primary"
      >
        Proceed to dashboard
      </q-btn>
      <q-btn v-else @click="purchasePlan" :loading="loading" color="primary">
        Start Plan
      </q-btn>
    </div>

    <q-dialog v-model="dialogCreate" persistent>
      <q-card class="dialog_card">
        <div class="dialog_content">
          <div class="dialog_top">
            <div class="img_wrap">
              <img src="/images/plancircle.png" alt="" />
              <img :src="`/images/sellerplan.png`" alt="" />
            </div>
          </div>
          <div class="title">{{ plan.name }}</div>
          <div class="amount">
            ${{ parseInt(plan.price).toLocaleString() }}
            <!-- ₦{{ plan.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} -->
          </div>

          <div class="text-center q-mb-lg">
            <!-- <div class="bigMediumText">Dear customer</div> -->

            <p class="q-mt-sm text-center">
              Dear exteemed customer please note that transactions are
              <br />
              currenctly in Dollars and Naira. <strong>NOTE:</strong> Using the
              Dollar option will require you to enter a valid Card detail and it
              will charge the dollar equivalent in your local currency.
            </p>
          </div>

          <div class="column items-center justify-center">
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
                    plan.price * currencyRatesData?.rates["NGN"]
                  ).toLocaleString()
                }}</strong
              >
            </p>
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
              class="q-mt-xs text-weight-bold"
            >
              Your subscription total in {{ showEquivInCurrency }} is
              <strong>
                {{ showEquivInCurrency }}
                {{
                  (
                    plan.price * currencyRatesData?.rates[showEquivInCurrency]
                  ).toLocaleString()
                }}</strong
              >
            </p>
          </div>

          <div v-if="errors.name" class="input-box active-grey">
            <label class="input-label">Business Name</label>
            <input
              type="text"
              name="name"
              v-model="vendordetails.name"
              class="input-1"
              placeholder="Red Dress Co."
            />
            <small v-if="errors.name" class="text-red text-weight-bold">
              {{ errors.name[0] }}
            </small>
          </div>
          <div class="input-box q-mx-md active-grey">
            <label class="input-label">Duration</label>
            <select name="" id="">
              <option value="+243">1 {{ props.view }}</option>
            </select>
          </div>

          <div class="boost">
            <q-btn
              :loading="loading"
              class="q-pa-sm"
              color="green-7"
              v-if="checkoutCurrency === 'dollar'"
              @click="bringStripe"
              >Proceed</q-btn
            >
            <q-btn
              :loading="loading"
              class="q-pa-sm"
              color="green-7"
              v-if="checkoutCurrency === 'naira'"
              @click="initPayment"
              >Proceed</q-btn
            >
          </div>

          <q-btn @click="dialogCreate = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showPaymentForm">
      <q-card>
        <div class="stripe-logo row justify-center">
          <img src="/images/stripe.png" alt="Stripe Logo" />
        </div>

        <div class="form-header">
          <div>Enter continue to complete your payment</div>
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

          <div class="stripe-logo q-mt-lg row justify-center">
            <img src="/images/cards.png" alt="Stripe Logo" />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Dialog, Loading, Notify, QSpinnerRings, useQuasar } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { ref, watch } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "vue-router";
import axios from "axios";

let store = useMyAuthStore();
let props = defineProps(["plan", "loadingsign", "planDesc", "view"]);
let router = useRouter();
let dialogCreate = ref(false);
let loading = ref(false);
let loadingBtn = ref(false);
let stripepaymentDialog = ref(false);
let errors = ref({});
let vendordetails = ref({});
let stripeLoaded = ref(false);
let stripeMounted = ref(false);
let stripeIns = ref(null);
let paymentDialog = ref(false);
let plans = ref([]);
let particularPlan = ref({});
let refValue = ref("");
let paymentRef = ref();
const $q = useQuasar();
let checkoutCurrency = ref("dollar");
let currencyRatesData = ref({});
let showEquivInCurrency = ref("");
const appearance = {
  theme: "stripe",
};
let stripe;
let elements;
let card;
const cardElement = ref(null);
const showPaymentForm = ref(false); // Initially, the payment form is hidden
const errorMessage = ref("");
let key = process.env.STRIPE_PUBLISHABLE_KEY;
let stripeSecretKey = process.env.STRIPE_PUBLISHABLE_KEY_SECRET;

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

let bringStripe = () => {
  Loading.show();
  dialogCreate.value = false;
  showPaymentForm.value = !showPaymentForm.value;
  Loading.hide();
};
let proceed = () => {
  dialogCreate.value = true;
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
      dialogCreate.value = false;
      console.log(response);
      Notify.create({
        message: "Payment Successful...",
        color: "green",
        position: "top",
      });

      Dialog.create({
        title: `Your $${props.plan.price} payment was successful`,
        message: `Your payment was successful and you are now subscribed to '${props.plan.name}' plan and now have access to our premium features.`,
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
          Loading.show();
          authAxios
            .get(`merchant/${store.storedetails.slug}`)
            .then((response) => {
              Loading.hide();
              console.log(response);
              store.storedetails = response.data.data;
              router.replace({
                name: "subscription.success.page",
              });
            })
            .catch(({ response }) => {
              Loading.hide();

              loading.value = false;
              Notify.create({
                message: response.data.message,
                color: "red",
                position: "bottom",
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

      // if (result.status === "success") {
      //   $q.notify({ type: "positive", message: "Payment successful!" });
      // } else {
      //   $q.notify({ type: "negative", message: result.message });
      // }
    } catch (err) {
      console.error(err);
      $q.notify({ type: "negative", message: "Payment failed!" });
    } finally {
      $q.loading.hide();
    }
  }
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
let purchasePlan = () => {
  loading.value = true;
  authAxios
    .post(`subscription/purchase/${props.plan.slug}?duration=${props.view}`)
    .then((response) => {
      console.log(response);
      loading.value = false;
      Notify.create({
        message: "Initiated...",
        color: "green",
        position: "top",
      });
      refValue.value = response.data.data.reference;
      dialogCreate.value = true;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      errors.value = response.data.errors || {};
    });
};

const initPayment = () => {
  Loading.show();
  // console.log(currencyRatesData?.rates);
  authAxios
    .post(`payment/charge?type=paystack&reference=${refValue.value}`, {
      amount: (
        parseInt(props.plan.price) *
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
      // cartStore.cart = [];
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
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 5rem 3rem 0 3rem;
}
.main_title {
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
}
#card-element {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.card-input.StripeElement--focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.card-input.StripeElement--invalid {
  border-color: #fa755a;
}

.card-input.StripeElement--complete {
  border-color: #4caf50;
}
.sub_title {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;

  margin-bottom: 2rem;
}

.card_wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
}

.card {
  position: relative;
  padding: 1rem;
}

.card:nth-child(1) img:last-of-type {
  width: 35px;
  height: 35px;
}
.card:nth-child(2) img:last-of-type {
  width: 52px;
  height: 37px;
}
.card:nth-child(3) img:last-of-type {
  width: 58px;
  height: 32px;
}
.card:nth-child(4) img:last-of-type {
  width: 93px;
  height: 35px;
}
.img_wrap {
  position: relative;
  margin-top: 2rem;
}

.img_wrap img:first-of-type {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.img_wrap img:last-of-type {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.card {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  min-width: 230px;
  min-height: 1051px;
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
}

.title {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #000000;
  margin-top: 4rem;
}

.amount {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
}

.amount .small {
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.365em;
  text-transform: uppercase;
}

.btn {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
}

.btn .q-btn {
  text-transform: capitalize;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;

  border-radius: 8px;
}

.options {
  margin: 1rem 0;
}
.options ul li {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin: 0.4rem 0;
}

// dialog

.dialog_card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  width: 427px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 1rem;
  position: relative;
}

.dialog_top .img_wrap {
  margin-top: 0;
  padding-top: 5rem;
}

.dialog_card .amount,
.dialog_card .title {
  margin-top: 0rem;
}

.dialog_top img {
  width: auto;
  height: 32px;
}
.dialog_top .title {
  padding-top: 2rem;
}

.dialog_content .boost .q-btn {
  width: 100%;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;

  border-radius: 5px;
  text-transform: capitalize;
}

.dialog_content .boost {
  // padding: 1rem 0;
  margin: 25px 0;
  // margin: 0 25px;
}

.dialog_content .close {
  position: absolute;
  top: 1%;
  right: 1%;
  color: #979797;
  font-size: 1rem;
}
.dialog_content .close i {
  color: #979797;
  font-size: 1.3rem;
}
.dialog_content .close::before {
  box-shadow: none;
}

.card-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stripe-logo {
  text-align: center;
  margin-bottom: 16px;
}

.stripe-logo img {
  width: 120px;
}

.pay-button {
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: #5469d4;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pay-button:hover {
  background: #4355c6;
}

.error-message {
  color: #fa755a;
  font-size: 14px;
  margin-top: 8px;
}

$color: #80868b;
$input-value-color: #202124;
$border-color: 1px solid #dadce0;
$active-color: #1a73e8;
$default-background: #fff;
input,
select,
textarea {
  background: $default-background;
}

#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1,
  select,
  textarea {
    border: 1.5px solid #9d9d9d;
  }
  select,
  textarea {
    width: 100%;
    // margin: 0 auto !important;
  }
  .input-label {
    color: $color;
    top: -8px;
    background: $default-background;
    font-size: 11px;

    transition: 250ms;
  }
}
.input-box {
  position: relative;
  // display: grid;
  // place-items: center;
  margin: 25px;
  .input-label {
    position: absolute;
    color: $color;
    font-size: 16px;
    font-weight: 400;
    max-width: calc(100% - (2 * 8px));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 8px;
    top: 13px;
    padding: 0 8px;
    transition: 250ms;
    user-select: none;
    pointer-events: none;
  }
  .input-1,
  select,
  textarea {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    border-radius: 4px;
    color: $input-value-color;
    border: $border-color;
    padding: 13px 15px;

    transition: 250ms;
    &:focus {
      outline: none;
      border: 2px solid #1a73e8;
      transition: 250ms;
    }
  }
}

.input-box.focus,
.input-box.active {
  .input-label {
    color: $active-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
}
.input-box.active {
  .input-1 {
    border: 2px solid #1a73e8;
  }
}

.clear {
  clear: both;
}

::placeholder {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

@media (max-width: 500px) {
  .dialog_card {
    min-width: 100%;
    width: 100%;
  }
}
</style>
