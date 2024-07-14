<template>
  <div class="q-py-xl q-my-xl">
    <div class="column items-center text-center justify-center">
      <img
        style="width: 308.001px; height: 204.304px"
        src="../assets/rider.svg"
        alt=""
      />
      <p class="smallText text-center q-my-lg">
        Welcome back {{ stores.userdetails.fullname }}, which store are you
        checking into...
      </p>

      <div class="row items-center no-wrap">
        <div class="q-pa-md q-gutter-sm">
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
            color="green-7"
            >Create new store</q-btn
          >
          <q-btn
            v-for="store in stores.userstores"
            :key="store.id"
            @click="setStore(store)"
            no-wrap
            no-caps
            rounded
            color="primary"
            >{{ store.name }}</q-btn
          >
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
