<template>
  <div>
    <div v-if="loading" class="fund_wrap">
      <q-spinner color="primary" size="5em" />
    </div>
    <div v-else class="q-ma-md fund_wrap bg-white">
      <div style="width: fit-content" class="column items-center text-center">
        <img src="/images/success.png" alt="" />
        <h4 class="q-my-sm">Order successful</h4>
        <div style="gap: 1rem" class="row q-mt-lg items-center no-wrap">
          <q-btn
            :to="{ name: 'explore' }"
            flat
            no-caps
            no-wrap
            class="bg-primary text-white"
          >
            Continue Shopping
          </q-btn>
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
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { useCartStore } from "src/stores/cart";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
let cartStore = useCartStore();
let route = useRoute();
let loading = ref(true);

const confirmOrder = () => {
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};
onMounted(() => {
  // confirmOrder();
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
