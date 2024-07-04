<template>
  <q-page class="">
    <section>
      <div class="hero">
        <div class="container">
          <p class="text text-white">
            <q-badge color="white" rounded class="q-mr-sm" />Where Convenience
            Meets Efficiency
          </p>
          <h1 class="text-h3">
            #1 Marketplace to Buy & Sell Medical Equipment in Africa
          </h1>

          <div class="q-mt-lg">
            <div class="input_wrap">
              <div class="input">
                <input
                  type="text"
                  placeholder="Eg: defibrillators, apnea monitors, etc"
                />
                <q-btn color="secondary" rounded no-caps no-wrap>
                  Search >>
                </q-btn>
              </div>
            </div>

            <div
              style="gap: 1rem"
              class="q-mt-lg row nav_wrap items-center no-wrap"
            >
              <small class="text-white">Trending:</small>
              <q-btn color="white" outline rounded> All </q-btn>
              <q-btn color="white" outline rounded> Cardiology </q-btn>
              <q-btn color="white" outline rounded> Dental </q-btn>
              <q-btn color="white" outline rounded> Hermodialysis </q-btn>
              <q-btn color="white" outline rounded> Laboratory </q-btn>
            </div>

            <div class="row justify-end q-mt-xl">
              <q-btn color="white" outline rounded class="q-py-sm q-px-xl">
                Watch a story
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="new_products section">
      <div class="container">
        <div class="row items-center justify-between">
          <h4 class="text-h6 text-weight-bold">New Products</h4>
          <div>
            <router-link class="text_underline" to=""
              >See All New Products</router-link
            >
          </div>
        </div>

        <div class="responsive_grid q-mt-md">
          <ProductCompVue
            :product="product"
            v-for="(product, index) in productsArr"
            :key="index"
          />
        </div>
      </div>
    </section>

    <section class="sponsors">
      <div class="container">
        <div class="">
          <h4 class="text-h5 text-center text-weight-bold">
            OUR PROUD SPONSORS
          </h4>
        </div>
        <div class="responsive_grid">
          <div>
            <img src="/images/rocat.svg" alt="" />
          </div>
          <div>
            <img src="/images/msi.svg" alt="" />
          </div>
          <div>
            <img src="/images/razer.svg" alt="" />
          </div>
          <div>
            <img src="/images/therma.svg" alt="" />
          </div>
          <div>
            <img src="/images/adata.svg" alt="" />
          </div>
          <div>
            <img src="/images/hp.svg" alt="" />
          </div>
          <div>
            <img src="/images/giga.svg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <FooterCompVue />
  </q-page>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import ProductCompVue from "src/components/ProductComp.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
useI18n();

const productsArr = ref([
  {
    category: "Biochemistry Analyzer",
    name: "Semi auto chemistry Analyzer",
    location: "Nigeria",
    posted: "2 weeks ago",
    views: "240",
    amount: "499",
    img: "/images/ambulance.jpeg",
    condition: "Used",
    flag: "/images/nigeria.png",
  },
  {
    category: "Biochemistry Analyzer",
    name: "Semi auto chemistry Analyzer",
    location: "Nigeria",
    posted: "2 weeks ago",
    views: "240",
    amount: "499",
    img: "/images/product1.webp",
    condition: "Used",
    flag: "/images/nigeria.png",
  },
  {
    category: "Biochemistry Analyzer",
    name: "Semi auto chemistry Analyzer",
    location: "Nigeria",
    posted: "2 weeks ago",
    views: "240",
    amount: "499",
    img: "/images/product2.png",
    condition: "Used",
    flag: "/images/nigeria.png",
  },
  {
    category: "Biochemistry Analyzer",
    name: "Semi auto chemistry Analyzer",
    location: "Nigeria",
    posted: "2 weeks ago",
    views: "240",
    amount: "499",
    img: "/images/product3.jpeg",
    condition: "Used",
    flag: "/images/nigeria.png",
  },
  {
    category: "Biochemistry Analyzer",
    name: "Semi auto chemistry Analyzer",
    location: "Nigeria",
    posted: "2 weeks ago",
    views: "240",
    amount: "499",
    img: "/images/product4.jpeg",
    condition: "Used",
    flag: "/images/nigeria.png",
  },
]);

// const { locale } = useI18n();

// function changeLanguage(lang) {
//   locale.value = lang;
// }
</script>
