<template>
  <div class="card">
    <div class="img_wrap">
      <img src="/images/plancircle.png" alt="" />
      <img :src="`/images/sellerplan.png`" alt="" />
    </div>
    <div class="title">{{ plan.name }}</div>
    <div class="amount">
      ${{
        planDesc !== "yearly"
          ? parseInt(plan.price).toLocaleString()
          : parseInt(plan.price).toLocaleString()
      }}
      <!-- ₦{{ plan.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} -->
      <br />
      <div class="small">
        {{ planDesc === "monthly" ? "Per month" : "Per year" }}
      </div>
    </div>
    <!-- {{  }} -->
    <div class="options">
      <ul v-if="plan.name === 'standard'">
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          Verified Badge
        </li>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          Users Chat
        </li>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i> Analytics 50
          Products uploads
        </li>

        <!-- <li v-for="(option, index) in plan.description" :key="index">
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          {{ option }}
        </li> -->
      </ul>
      <ul v-else>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          Verified Badge
        </li>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          Users Chat
        </li>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          Unlimited Products uploads
        </li>
        <li>
          <i class="fa-solid q-mr-sm text-green fa-check"></i> Analytics
          Dashboard
        </li>
        <!-- <li v-for="(option, index) in plan.description" :key="index">
          <i class="fa-solid q-mr-sm text-green fa-check"></i>
          {{ option }}
        </li> -->
      </ul>
    </div>

    <div class="btn">
      <q-btn @click="proceed" color="primary"> Start Plan </q-btn>
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
              @click="purchasePlan"
              >Proceed</q-btn
            >
          </div>

          <q-btn @click="dialogCreate = false" class="close">
            <i class="fa-solid fa-xmark"></i>
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="stripepaymentDialog">
      <q-card>
        <div class="stripe-logo row justify-center">
          <img src="/images/stripe.png" alt="Stripe Logo" />
        </div>
        <div class="form-header q-my-md">
          <div class="text-weight-bold">
            Enter valid card details to complete your payment
          </div>
        </div>
        <div ref="paymentRef"></div>

        <div class="row justify-center">
          <q-btn
            class="bg-primary q-mt-md text-white"
            type="button"
            @click="submit"
            no-caps
            no-wrap
            :loading="loadingBtn"
            >Pay</q-btn
          >
        </div>
        <div class="stripe-logo q-mt-lg row justify-center">
          <img src="/images/cards.png" alt="Stripe Logo" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Dialog, Loading, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";
let store = useMyAuthStore();
let props = defineProps(["plan", "loadingsign", "planDesc", "view"]);

let dialogCreate = ref(false);
let loading = ref(false);
let loadingBtn = ref(false);
let stripepaymentDialog = ref(false);
let errors = ref({});
let vendordetails = ref({});
let stripeLoaded = ref(false);
let stripeMounted = ref(false);
let elements = ref(null);
let stripeIns = ref(null);
let paymentDialog = ref(false);
let plans = ref([]);
let particularPlan = ref({});
let paymentRef = ref();
let key = process.env.STRIPE_PUBLISHABLE_KEY;
let stripeSecretKey = process.env.STRIPE_PUBLISHABLE_KEY_SECRET;

let elementsOptions = ref({
  appearance: {
    theme: "stripe",
    labels: "floating",
  },
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
});
let proceed = () => {
  dialogCreate.value = true;
};

async function submit() {
  loadingBtn.value = true;
  try {
    const { paymentIntent, error } = await stripeIns.value.confirmPayment({
      elements: elements.value,
      redirect: "if_required",
      confirmParams: {
        return_url: window.location.origin + router.currentRoute.value.fullPath,
      },
    });

    if (error) {
      Notify.create({
        message: error.message || "Payment was unsuccessful",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    } else {
      Notify.create({
        message: "Payment successful",
        color: "green",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
      // Show success dialog here
    }
  } catch (error) {
    console.error(error);
    Notify.create({
      message: "An error occurred during the payment process.",
      color: "red",
      position: "top",
    });
  } finally {
    loadingBtn.value = false;
  }
  // stripeIns.value
  //   .confirmPayment({
  //     elements: elements.value,
  //     redirect: "if_required",
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       return_url: window.location.origin + router.currentRoute.value.fullPath,
  //     },
  //   })
  //   .then(({ paymentIntent, error }) => {
  //     if (error) {
  //       console.log(error);
  //       loadingBtn.value = false;
  //       Notify.create({
  //         message: error.message || "Payment was unsuccessful",
  //         color: "red",
  //         position: "top",
  //         actions: [{ icon: "close", color: "white" }],
  //       });
  //     } else {
  //       console.log(paymentIntent);
  //       loadingBtn.value = false;
  //       paymentDialog.value = false;
  //       Notify.create({
  //         message: "Payment successful",
  //         color: "green",
  //         position: "top",
  //         actions: [{ icon: "close", color: "white" }],
  //       });
  //       Dialog.create({
  //         title: `Your $${props.plan.price / 100} payment was successful`,
  //         message: `Your payment was successful and you are now subscribed to '${props.plan.name}' plan and now have access to our premium features.`,
  //         ok: {
  //           push: true,
  //           label: "Proceed",
  //           color: "green",
  //         },
  //         cancel: {
  //           push: true,
  //           color: "grey",
  //         },
  //         persistent: true,
  //       })
  //         .onOk(() => {
  //           Loading.show();
  //           authAxios
  //             .get(`merchant/${store.storedetails.slug}`)
  //             .then((response) => {
  //               Loading.hide();
  //               console.log(response);
  //               store.storedetails(response.data.data);
  //               router.replace({
  //                 name: "account.dashboard",
  //               });
  //             })
  //             .catch(({ response }) => {
  //               Loading.hide();

  //               loading.value = false;
  //               Notify.create({
  //                 message: response.data.message,
  //                 color: "red",
  //                 position: "bottom",
  //                 actions: [{ icon: "close", color: "white" }],
  //               });
  //             });
  //         })
  //         .onCancel(() => {
  //           // console.log('>>>> Cancel')
  //         })
  //         .onDismiss(() => {
  //           // console.log('I am triggered on both OK and Cancel')
  //         });

  //       // Handle success
  //     }
  //   });
}

let initStripe = () => {
  elementsOptions.value.clientSecret = stripeSecretKey;
  // console.log(elementsOptions.value);
  paymentDialog.value = true;

  const stripePromise = loadStripe(key);
  // console.log(stripePromise);
  stripePromise.then((stripe) => {
    stripeLoaded.value = true;
    stripeIns.value = stripe;
    elements.value = stripe.elements(elementsOptions.value);
    const paymentElement = elements.value.create("payment", {});
    paymentElement.mount(paymentRef.value);
    paymentElement.on("ready", (e) => {
      stripeMounted.value = true;
      // this.loading[plan.id] = false;
    });
  });
};
let purchasePlan = () => {
  loading.value = true;
  authAxios
    .post(
      `subscription/plans/purchase/${props.plan.slug}?duration=${props.view}`
    )
    .then((response) => {
      console.log(response);
      loading.value = false;
      Notify.create({
        message: "Successful, redirecting to gateway...",
        color: "green",
        position: "top",
      });
      // Notify.create({
      //   message: response.data.message
      //     ? response.data.message + ", " + "redirecting to gateway"
      //     : "Successful, redirecting to gateway",
      //   color: "green",
      //   position: "top",
      // });
      window.location.href = response.data.data;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      errors.value = response.data.errors || {};
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
  min-height: 351px;
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
