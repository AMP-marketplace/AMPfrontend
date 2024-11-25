<template>
  <div class="q-pt-xl q-my-xl">
    <div class="column items-center text-center justify-center">
      <img
        style="width: 308.001px; height: 204.304px"
        src="../assets/rider.svg"
        alt=""
      />
      <p class="text-weight-bold text-center q-my-lg">You are all set...</p>

      <div class="row items-center no-wrap">
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            :to="{
              name: 'dashboard',
            }"
            no-wrap
            no-caps
            rounded
            v-if="stores.role === 'shopper'"
            color="primary"
            >Goto Dashboard</q-btn
          >
          <q-btn
            :to="{
              name: 'create.store',
              query: {
                create: 'new',
              },
            }"
            no-wrap
            no-caps
            rounded
            v-if="stores.role === 'merchant' && !stores.userstores.length"
            color="green-6"
            >Create Store</q-btn
          >
          <div
            style="gap: 1rem"
            class="row items-center no-wrap"
            v-if="stores.userstores.length"
          >
            <q-btn
              no-wrap
              @click="setStore(store)"
              v-for="(store, index) in stores.userstores"
              :key="index"
              no-caps
              rounded
              color="primary"
              >Login to{{ store.business_name }}</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";
let router = useRouter();
let stores = useMyAuthStore();

const setStore = (store) => {
  stores.storedetails = store;
  router.replace({
    name: "account.dashboard",
  });
};
</script>

<style lang="scss" scoped></style>
