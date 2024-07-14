v
<template>
  <div class="q-my-xl">
    <div class="container">
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md">Order Tracking</h4>
        <div class=""></div>
      </div>

      <h6>Your Order is on the way</h6>
      <q-separator class="q-my-sm" />
      <div class="cart">
        <div class="">
          <q-timeline
            class="timeline"
            layout="comfortable"
            side="right"
            color="secondary"
          >
            <q-timeline-entry
              title="Order Accepted"
              subtitle="12/08/2022, 3:45pm"
              side="left"
              color="primary"
              icon="fa-solid fa-check"
            >
            </q-timeline-entry>

            <q-timeline-entry
              title="Order Dispatched"
              subtitle="12/08/2022, 3:45pm"
              side="left"
              color="primary"
            >
              <div>Your order is on it’s way to you</div>
            </q-timeline-entry>
            <q-timeline-entry
              title="Order Arrival"
              subtitle="Awaiting"
              side="left"
            >
              <div>You will be notified when your driver get’s to you</div>
            </q-timeline-entry>
          </q-timeline>

          <h6>Confirm Order Received</h6>
          <q-separator class="q-my-sm" />

          <div class="q-mt-lg">
            <p class="smallertext">
              Please confirm you have recieved your order to complete the
              purchase process
            </p>
            <div class="container confirmForm q-mt-lg">
              <div class="">
                <form @submit.prevent="submitOrderConfirmation" class="q-mt-lg">
                  <div class="input">
                    <label for=""> Confirmation Code* </label>

                    <div class="input_wrap">
                      <input
                        v-model="confirmData.code"
                        placeholder="Enter the confirmation code sent to your mail"
                        type="text"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <q-checkbox
                      v-model="confirmData.payment"
                      label="Confirm that you have received this your order"
                    />
                  </div>
                  <q-btn
                    color="primary"
                    class="q-px-xl q-mt-md"
                    rounded
                    no-wrap
                    no-caps
                    type="submit"
                  >
                    Confirm
                  </q-btn>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div v-if="loading">
            <q-skeleton height="100px" />
          </div>
          <div v-else class="checkout_details">
            <h4 class="bigMediumText">Order Summary</h4>
            <q-separator class="q-mt-md" />
            <p class="text-h6 q-mb-md text-info">
              {{ mergedOrdersArr.length }} Items
            </p>
            <div class="q-my-lg">
              <div v-for="(item, index) in mergedOrdersArr" :key="index">
                <div
                  style="gap: 0.5rem"
                  class="row no-wrap q-my-md items-center"
                >
                  <img
                    style="width: 82px; height: 82px; object-fit: contain"
                    :src="item.product.images[0].url"
                    :alt="item.product.name"
                  />
                  <div>
                    <p class="smallText">
                      {{ item.product.name }}
                    </p>
                    <p>
                      <span class="text-info"
                        >Purchase quantity : {{ item.quantity }}</span
                      >
                    </p>
                    <p class="smallerText">
                      <!-- <span class="q-mx-sm"></span> -->
                      <span class="text-weight-bold"
                        >₦{{
                          (item.product.price * item.quantity).toLocaleString()
                        }}</span
                      >
                    </p>
                  </div>
                  <q-separator />
                </div>
                <p>
                  Product tracking number:<strong class="text-red">{{
                    item.tracking_number
                  }}</strong>
                </p>
              </div>

              <!-- <q-separator class="q-my-md" />
            <div class="row q-mt-sm justify-between items-center">
              <p class="smallerText">Order Total</p>
              <p class="smallText">₦{{ totalSumVal.toLocaleString() }}</p>
            </div> -->
              <q-separator class="q-my-md" />
              <div class="row q-mt-sm justify-between items-center">
                <p class="smallerText">VAT</p>
                <p class="smallText">
                  ₦{{ (totalSumVal * 0.075).toLocaleString() }}
                </p>
              </div>
              <q-separator class="q-my-md" />
              <div class="row q-mt-sm justify-between items-center">
                <p class="smallerText">Sub Total</p>
                <p class="smallText">₦{{ totalSumVal.toLocaleString() }}</p>
              </div>
              <q-separator class="q-my-md" />
              <div class="row q-mt-sm justify-between items-center">
                <p class="smallerText">Order Total</p>
                <p class="smallText">
                  ₦{{ (totalSumVal + totalSumVal * 0.075).toLocaleString() }}
                </p>
              </div>
            </div>
            <div class="checkout_details no_stick q-mt-lg">
              <h4 class="bigMediumText">Deliver details</h4>
              <q-separator class="q-mt-md" />
              <div class="q-my-lg">
                <p class="smallerText q-mb-md text-info">
                  Estimated delivery date
                </p>
                <p class="mediumText">4th August - in 6days</p>
              </div>
              <div class="q-my-lg">
                <p class="smallerText q-mb-md text-info">Order number</p>
                <p class="mediumText">NL2309443064</p>
              </div>
              <div class="q-mt-xl">
                <h4 class="bigMediumText">Contact Number</h4>
                <q-separator class="q-mt-md" />

                <div class="q-my-lg">
                  <p class="smallerText q-mb-md text-info">Courier number</p>
                  <p class="mediumText">09087663552</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog class="dialog" v-model="orderSuccessModal">
    <div class="auth">
      <q-card class="rate">
        <div class="text-center q-mb-lg">
          <div class="bigMediumText">Thanks for your purchase</div>
          <div class="smallerText text-info q-mt-md text-center">
            Please kindly leave a review on the service and <br />
            product purchased.
          </div>
        </div>

        <div class="auth">
          <div class="row justify-center">
            <q-rating
              v-model="ratingModel"
              size="2.5em"
              color="info"
              icon="star_border"
              icon-selected="star"
            />
          </div>
          <div class="input_wrap">
            <div class="input">
              <textarea
                placeholder="Leave a comment"
                v-model="data.description"
                name=""
                id=""
                cols="20"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="total no-wrap row justify-center q-mt-md items-center">
          <q-btn
            class="apply bg-primary q-px-xl q-mt-md"
            no-caps
            flat
            rounded
            text-color="white"
          >
            Submit
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { Loading, QSpinnerRings } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();
let data = ref({});
let confirmData = ref({ payment: false });
let prodListArr = ref([]);
let mergedOrdersArr = ref([]);
let loading = ref(true);
let ratingModel = ref(4);
let totalSumVal = ref("");
let orderSuccessModal = ref(true);
const onRequest = (props) => {};

const getOrders = async () => {
  try {
    let orderlistResp = await authAxios.get("customer/order/list");
    console.log(orderlistResp);
    const mergedOrders = orderlistResp.data.data.map((order) => {
      const product = prodListArr.value.find(
        (prod) => prod.id === order.product_id
      );
      return {
        ...order,
        product: { ...product }, // Spread product properties into the order
      };
    });
    const totalSum = mergedOrders.reduce((sum, order) => {
      return sum + order.product.price * order.quantity;
    }, 0);

    mergedOrdersArr.value = mergedOrders;
    totalSumVal.value = totalSum;
    console.log(mergedOrders);
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};
const getProducts = async () => {
  try {
    let prodList = await authAxios.get("product/list");
    // let orderData = await authAxios.get(
    //   `customer/order/${route.query.order_id}/trackings`
    // );
    // console.log(orderData);
    prodListArr.value = prodList.data.data;
    getOrders();
  } catch (error) {
    console.error(error);
  }
};
const submitOrderConfirmation = () => {
  Dialog.create({
    title: "Confirm Order",
    message: `Are you sure you have received this order?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerRings,
        spinnerColor: "yellow",
        spinnerSize: 140,
        message: "Hold on... confirming order",
        messageColor: "white",
      });
      authAxios
        .post(`customer/order/delivery/confirm`, {
          order_id: route.query.order_id,
          payment_authorized: confirmData.value.payment ? 1 : 0,
          confirmation_code: confirmData.value.code,
        })
        .then(({ data }) => {
          console.log(data);
          Notify.create({
            message: response.data.message,
            color: "green",
            position: "top",
          });
          getProducts();
        })
        .catch(({ response }) => {
          Loading.hide();
          Notify.create({
            message: "Error canceling order",
            color: "red",
            position: "top",
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

onMounted(async () => {
  try {
    getProducts();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.confirmForm {
  input,
  select,
  textarea {
    border: none;
    background: transparent;
    width: 100%;
  }
  input:focus,
  select:focus {
    outline: none;
  }
  label {
    font-size: 14px;
    font-weight: 600;
    display: block;
    margin-bottom: 0.2rem;
    line-height: 27px;
    color: rgb(51, 51, 51, 1);
    span {
      color: red;
    }
  }

  .input_wrap {
    border: 1px solid rgba(140, 140, 140, 1);
    border-radius: 8px;
    padding: 1rem;
    color: var(--color);
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
