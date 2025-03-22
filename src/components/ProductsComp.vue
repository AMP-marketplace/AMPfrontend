<template>
  <div>
    <div class="product_card">
      <router-link
        :to="{
          name:
            store.userdetails.type === 'business'
              ? 'product.detail'
              : 'user.product.detail',
          params: {
            slug: product.slug,
          },
          query: {
            id: product.id,
          },
        }"
      >
        <img
          :src="
            product.images[0] ? product.images[0].url : '/images/man_smile.png'
          "
          alt=""
        />
      </router-link>
      <div style="gap: 0.5rem" class="row justify-end items-center no-wrap">
        <q-btn
          no-caps
          class="addtocart"
          no-wrap
          v-if="store.userdetails.type !== 'business'"
          @click="cartStore.addTocart(product)"
          color="primary"
          >Add to cart <i class="fa-solid q-ml-sm fa-cart-shopping"></i
        ></q-btn>
        <!-- <q-btn flat><i class="fa-regular fa-heart"></i></q-btn> -->
        <!-- @click="handleBtnClicked" -->
        <!-- {{ product.store }} -->
        <q-btn
          v-if="
            store.storedetails.id === product.store.id &&
            route.name === 'account.dashboard'
          "
          :to="{
            name: 'product.detail',
            params: {
              slug: product.slug,
            },
            query: {
              id: product.id,
            },
          }"
          flat
          ><i class="fa-solid fa-pen-to-square"></i
        ></q-btn>
      </div>
      <h6 class="mediumText text-primary">
        <router-link
          :to="{
            name:
              store.userdetails.type === 'business'
                ? 'product.detail'
                : 'user.product.detail',
            params: {
              slug: product.slug,
            },
            query: {
              name: product.name,
              id: product.id,
            },
          }"
          >{{ product.name }}</router-link
        >
      </h6>
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
