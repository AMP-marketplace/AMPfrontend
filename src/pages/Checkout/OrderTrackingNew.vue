v
<template>
  <div class="q-my-xl">
    <div class="container" v-if="loading">
      <q-skeleton height="400px" />
    </div>
    <div v-else class="container">
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md">Order Tracking</h4>
        <div class=""></div>
      </div>

      <h6 v-if="data.status !== 'declined'">
        {{
          data.status === "delivered"
            ? "Your order has been delivered"
            : "Your Order is on the way"
        }}
      </h6>
      <q-separator class="q-my-sm" />
      <div class="cart">
        <!-- {{ data.status }} -->
        <div class="">
          <q-timeline
            class="timeline"
            layout="comfortable"
            side="right"
            color="secondary"
          >
            <q-timeline-entry
              title="Order Accepted"
              side="left"
              v-if="data.status === 'accepted'"
              color="primary"
              icon="fa-solid fa-check"
            >
            </q-timeline-entry>
            <q-timeline-entry
              title="Order was Declined"
              side="left"
              v-if="data.status === 'declined'"
              color="red"
              icon="fa-solid fa-xmark"
            >
            </q-timeline-entry>

            <div v-if="data.trackings.length">
              <q-timeline-entry
                title="Order Proccessed"
                :subtitle="formatDate(data.trackings[0].created_at)"
                side="left"
                v-if="data.trackings[0].status === 'processed'"
                color="primary"
                icon="fa-solid fa-check"
              >
                <div>
                  Your order has been processed and will be dispatched to you
                </div>
              </q-timeline-entry>
              <q-timeline-entry
                title="Order Dispatched"
                :subtitle="formatDate(data.trackings[1]?.created_at)"
                side="left"
                v-if="data.trackings[1]?.status === 'dispatched'"
                color="primary"
                icon="fa-solid fa-check"
              >
                <div>Your order has been processed and dispatched to you</div>
              </q-timeline-entry>

              <q-timeline-entry
                title="Order Arrival"
                subtitle="Awaiting"
                v-if="data.trackings[1]?.status === 'dispatched'"
                side="left"
              >
                <div>You will be notified when your driver get’s to you</div>
              </q-timeline-entry>
              <q-timeline-entry
                title="Order Delivered"
                :subtitle="formatDate(data.trackings[2]?.created_at)"
                v-if="data.trackings[2]?.status === 'delivered'"
                side="left"
                color="primary"
                icon="fa-solid fa-check"
              >
                <div>
                  Your order has been delivered, kindly enter your confirmation
                  code to confirm
                </div>
              </q-timeline-entry>
              <!-- <q-timeline-entry
                title="Order Confirmed"
                v-if="orderConfirmed"
                side="left"
                color="green"
                icon="fa-solid fa-check"
              >
                <div>Your order has been confirmed.</div>
              </q-timeline-entry> -->
            </div>
            <!-- <q-timeline-entry
              title="Order Dispatched"
              :subtitle="formatDate(data.trackings[0].created_at)"
              side="left"
              v-if="data.trackings[0].status === 'processed'"
              color="primary"
              icon="fa-solid fa-check"
            >
              <div>
                Your order has been processed and will be dispatched to you
              </div>
            </q-timeline-entry>
            <q-timeline-entry
              title="Order Dispatched"
              :subtitle="formatDate(data.trackings[1].status.created_at)"
              side="left"
              v-if="data.trackings[1].status === 'dispatched'"
              color="primary"
              icon="fa-solid fa-check"
            >
              <div>Your order is on it’s way to you</div>
            </q-timeline-entry>
            <q-timeline-entry
              title="Order Arrival"
              subtitle="Awaiting"
              v-if="data.status === 'dispatched'"
              side="left"
            >
              <div>You will be notified when your driver get’s to you</div>
            </q-timeline-entry>
            <q-timeline-entry
              title="Order Delivered"
              :subtitle="formatDate(data.trackings[2].created_at)"
              v-if="data.trackings[2].status === 'delivered'"
              side="left"
              color="primary"
              icon="fa-solid fa-check"
            >
              <div>
                Your order has been delivered, kindly enter your confirmation
                code to confirm
              </div>
            </q-timeline-entry> -->
          </q-timeline>

          <div v-if="data.status !== 'declined'">
            <h6>Confirm Order Received</h6>
            <q-separator class="q-my-sm" />

            <div class="q-mt-lg">
              <p class="smallertext">
                When the status of this delivery is delivered you will receive
                an OTP. Please confirm you have recieved this order by entering
                the OTP to complete the purchase process.
              </p>
              <p class="text-red-7 text-weight-bold">
                Note: When you confirm this order you are authorizing us to
                credit the merchant.
              </p>
              <div class="container confirmForm q-mt-lg">
                <div class="">
                  <form
                    @submit.prevent="submitOrderConfirmation"
                    class="q-mt-lg"
                  >
                    <div class="input">
                      <label for=""> Confirmation Code* </label>

                      <div class="input_wrap">
                        <input
                          v-model="confirmData.code"
                          placeholder="Enter the confirmation code sent to your mail"
                          type="text"
                          name="code"
                          required
                        />
                      </div>
                      <small
                        v-if="errors.confirmation_code"
                        class="text-red text-weight-bold"
                      >
                        {{ errors.confirmation_code[0] }}
                      </small>
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
                      :disable="!data.trackings[2]?.status === 'delivered'"
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
        </div>
        <div>
          <div v-if="loading">
            <q-skeleton height="100px" />
          </div>
          <div v-else class="checkout_details">
            <h4 class="bigMediumText">Order Summary</h4>
            <q-separator class="q-mt-md" />

            <div class="q-my-lg">
              <div>
                <div
                  style="gap: 0.5rem"
                  class="row no-wrap q-my-md items-center"
                >
                  <img
                    style="width: 82px; height: 82px; object-fit: contain"
                    :src="data.product.images[0].url"
                    :alt="data.product.name"
                  />
                  <div>
                    <p class="smallText">
                      {{ data.product.name }}
                    </p>
                    <p>
                      <span class="text-info"
                        >Purchase quantity : {{ data.quantity }}</span
                      >
                    </p>
                    <p class="smallerText">
                      <!-- <span class="q-mx-sm"></span> -->
                      <span class="text-weight-bold"
                        >₦{{
                          (data.product.price * data.quantity).toLocaleString()
                        }}</span
                      >
                    </p>
                  </div>
                  <q-separator />
                </div>
                <p>
                  Tracking number:<strong class="text-red">{{
                    data.tracking_number
                  }}</strong>
                </p>
              </div>

              <!-- <q-separator class="q-my-md" />
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
              </div> -->
            </div>
            <div class="checkout_details no_stick q-mt-lg">
              <h4 class="bigMediumText">Delivery details</h4>
              <q-separator class="q-mt-md" />
              <div class="q-my-lg">
                <p class="smallerText q-mb-md text-info">
                  Estimated delivery date
                </p>
                <p class="mediumText">4 - 6days</p>
              </div>
              <!-- <div class="q-my-lg">
                <p class="smallerText q-mb-md text-info">Order number</p>
                <p class="mediumText">NL2309443064</p>
              </div> -->
              <div style="gap: 1rem" class="q-my-lg row items-center no-wrap">
                <p class="smallerText text-info">Store Name:</p>
                <p class="mediumText">{{ data.store.name }}</p>
              </div>
              <div style="gap: 1rem" class="q-my-lg row items-center no-wrap">
                <p class="smallerText text-info">Store Address:</p>
                <p class="mediumText">{{ data.store.address }}</p>
              </div>
              <!-- <div class="q-mt-sm">
                <h4 class="bigMediumText">Contact Number</h4>
                <q-separator class="q-mt-md" />

                <div class="">
                  <p class="smallerText q-mb-md text-info">Courier number</p>
                  <p class="mediumText">09087663552</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-dialog class="dialog" v-model="orderSuccessModal">
    <div class="auth">
      <q-card class="rate">
        <div class="text-center q-mb-sm">
          <div class="bigMediumText">Thanks for your purchase</div>
          <div class="text-body2 text-info q-mt-sm text-center">
            Please kindly leave a review on the service and <br />
            product purchased.
          </div>
        </div>

        <div class="auth">
          <div class="row justify-center">
            <q-rating
              v-model="ratingModel"
              size="2em"
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
import { Dialog, Loading, Notify, QSpinnerRings } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();
let data = ref({});
let errors = ref({});
let confirmData = ref({ payment: false });
let prodListArr = ref([]);
let mergedOrdersArr = ref([]);
let loading = ref(true);
let ratingModel = ref(4);
let totalSumVal = ref("");
let orderSuccessModal = ref(false);
let orderConfirmed = ref(false);
const passwordPattern = /^\d{6}$/;
const formatDate = (datetimeString) => {
  const date = new Date(datetimeString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const getOrders = async () => {
  try {
    let orderlistResp = await authAxios.get(
      `customer/order/${route.query.order_id}/trackings`
    );
    console.log(orderlistResp);
    data.value = orderlistResp.data.data;
    loading.value = false;
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
      if (!confirmData.value.payment) {
        Notify.create({
          message:
            "Please confirm that you have received this order by checking the checkbox. By confirming this order you authorize this merchant be paid",
          color: "red",
          position: "top",
        });
      } else if (!passwordPattern.test(confirmData.value.code)) {
        Notify.create({
          message: "Your OTP must be 6 digits long",
          color: "red",
          position: "top",
        });
      } else {
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
              message: data.message,
              color: "green",
              position: "top",
            });
            confirmData.value = {};
            orderConfirmed.value = true;
            Loading.hide();
          })
          .catch(({ response }) => {
            Loading.hide();
            errors.value = response.data.data.errors;
            Notify.create({
              message: response.data.message || "Error confirming order",
              color: "red",
              position: "top",
            });
          });
      }
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
    getOrders();
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
