<template>
  <div>
    <div v-if="loading" class="fund_wrap">
      <q-spinner color="primary" size="5em" />
    </div>
    <div v-else class="q-ma-md fund_wrap bg-white">
      <div style="width: fit-content" class="column items-center text-center">
        <div class="sign column text-center items-center">
          <img
            style="width: 166px; height: 126px; object-fit: contain"
            src="/images/ordersuccess.webp"
            alt=""
          />
          <div class="head text-h4 text-weight-bold text-center q-my-md">
            Payment Successful!
          </div>
          <p style="max-width: 700px; margin: 0 auto" class="text-left q-pa-sm">
            🎉 <strong>Congratulations!</strong> Your payment has been
            successfully processed. <br />

            Thank you for your purchase! Your order is being processed, and you
            will receive an email confirmation shortly. <br />

            If you have any questions or need further assistance, feel free to
            contact our support team. <br />

            Happy shopping!
          </p>

          <div class="row justify-center">
            <q-btn
              :to="{ name: 'dashboard' }"
              flat
              no-caps
              no-wrap
              class="bg-green-7 text-white"
            >
              Go to Dashboard
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Loading, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let route = useRoute();
let loading = ref(true);

const confirmOrder = () => {
  authAxios
    .get(
      `subscription/payment/callback?trxref=${route.query.trxref}&reference=${route.query.reference}`
    )
    .then((response) => {
      console.log(response);
      loading.value = false;
    })
    .catch(({ response }) => {
      Notify.create({
        message: response.data.message ? response.data.message : "Error",
        position: "top",
        color: "red",
        timeout: 102003,
      });
      console.error(error);
      Loading.hide();
    });
};
onMounted(() => {
  confirmOrder();
});
</script>

<style lang="scss" scoped>
.fund_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  border-radius: 10px;
  img {
    max-width: 150px;
  }
}
</style>
