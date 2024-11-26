<template>
  <div>
    <div v-if="loading" class="fund_wrap">
      <q-spinner color="primary" size="5em" />
    </div>
    <div v-else class="q-ma-md fund_wrap bg-white">
      <div style="width: fit-content" class="column items-center text-center">
        <img src="/images/success.png" alt="" />
        <h4 class="q-my-sm">Email successfully verified</h4>
        <div
          style="gap: 1rem"
          class="row q-mt-lg justify-center items-center no-wrap"
        >
          <div
            style="gap: 1rem"
            class="row q-mt-lg items-center justify-end no-wrap"
            v-if="!store.token"
          >
            <q-btn
              :to="{ name: 'customer.login' }"
              color="primary"
              no-caps
              no-wrap
              >Continue to login as a user</q-btn
            >
            <q-btn
              :to="{ name: 'merchant.login' }"
              color="primary"
              no-caps
              no-wrap
              >Continue to login as a merchant</q-btn
            >
          </div>
          <q-btn
            :to="{ name: 'dashboard' }"
            flat
            no-caps
            v-if="store.token"
            no-wrap
            class="bg-green-7 text-white"
          >
            Go to Dashboard
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let store = useMyAuthStore();
let route = useRoute();
let loading = ref(true);

const confirmOrder = () => {
  authAxios
    .get(
      `/verify/email?expires=${route.query.expires}&user=${route.query.user}&signature=${route.query.signature}`
    )
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message ? response.data.message : "Successful",
        color: "green",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
      store.userdetails.email_verified_at = true;
      loading.value = false;
    })
    .catch(({ response }) => {
      Notify.create({
        message: response.data.message ? response.data.message : "Successful",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
  // else {
  //   Notify.create({
  //     message: "Email already verified",
  //     color: "red",
  //     position: "top",
  //     actions: [{ icon: "close", color: "white" }],
  //   });
  //   return;
  // }
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
