<template>
  <div>
    <div class="product_card">
      <img
        :src="
          product.images[0] ? product.images[0].url : '/images/man_smile.png'
        "
        alt=""
      />
      <div style="gap: 0.5rem" class="row justify-end items-center no-wrap">
        <q-btn
          v-if="
            store.storedetails.id === product.store.id &&
            route.name === 'account.dashboard'
          "
          :to="{
            name: 'product.detail',
            query: {
              id: product.id,
            },
          }"
          flat
          ><i class="fa-solid fa-pen-to-square"></i
        ></q-btn>
      </div>
      <h6 class="mediumText text-primary">{{ product.name }}</h6>
      <p class="smallText">
        {{ product.description }}
      </p>

      <p class="bigMediumText">
        {{ product.currency.code }} {{ product.price.toLocaleString() }}
        <small>per {{ product.unit.name }}</small>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { useCartStore } from "src/stores/cart";
import { useRoute } from "vue-router";
import img from "../assets/man_smile.png";
let route = useRoute();
let store = useMyAuthStore();
let cartStore = useCartStore();
let props = defineProps({
  product: Object,
});

const emit = defineEmits(["editProduct"]);

const handleBtnClicked = () => {
  emit("editProduct", props.product);
};
</script>

<style lang="scss" scoped></style>
