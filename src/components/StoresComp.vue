<template>
  <div>
    <div class="stores_card">
      <div class="img">
        <img v-if="storeData.banner" :src="storeData.banner.url" alt="" />
        <img v-else :src="img" alt="" />
        <h6 class="mediumText">{{ storeData.business_name }}</h6>

        <!-- <q-btn flat><i class="fa-regular fa-heart"></i></q-btn> -->
      </div>
      <p class="smallText q-mt-sm">
        {{ truncatedDescription(storeData.description) }}
      </p>
      <h6 class="mediumText">
        <i class="ri-map-pin-line"></i>{{ storeData.country }}
      </h6>
      <div class="row q-mt-lg justify-center">
        <router-link
          :to="{
            name: 'store.detail',
            query: {
              name: storeData.name,
              slug: storeData.slug,
              id: storeData.id,
            },
          }"
        >
          Visit store
        </router-link>
      </div>
      <q-badge v-if="storeData.subscription !== null" color="green" floating
        >Verified seller</q-badge
      >
    </div>
  </div>
</template>

<script setup>
import img from "../assets/man_smile.png";
let props = defineProps({
  storeData: Object,
});

let truncatedDescription = (description) => {
  return (
    description.split(" ").slice(0, 20).join(" ") +
    (description.split(" ").length > 20 ? "..." : "")
  );
};
</script>

<style lang="scss" scoped></style>
