<template>
  <q-layout>
    <div class="load row justify-center q-mb-xl" v-if="loading">
      <q-skeleton width="90%" height="300px" />
    </div>
    <article class="container" v-else>
      <section class="section product" aria-label="product">
        <div class="container">
          <div>
            <q-carousel swipeable animated v-model="slide" thumbnails infinite>
              <q-carousel-slide
                :name="index + 1"
                v-for="(images, index) in product.images"
                :key="index"
                :img-src="images.url"
              />
            </q-carousel>
          </div>

          <div class="product-content">
            <p class="product-subtitle">{{ product.name }}</p>

            <h1 class="h1 product-title">
              Quantity - {{ product.quantity }} {{ product?.unit?.name }}(s)
            </h1>
            <div>
              <router-link
                :to="{
                  name: 'store.detail',
                  query: {
                    name: product.store?.name,
                    id: product.store?.id,
                  },
                }"
              >
                <span class="badge">Store: {{ product.store?.name }}</span>
              </router-link>
            </div>
            <div class="wrapper">
              <span class="price" data-total-price
                >₦{{ parseInt(product.price).toLocaleString() }}</span
              >

              <del class="del"
                >₦{{ (parseInt(product.price) + 500).toLocaleString() }}</del
              >
            </div>

            <div class="btn-group">
              <div class="counter-wrapper">
                <button
                  @click="removeFromQty"
                  class="counter-btn"
                  data-qty-minus
                >
                  <i class="fa-solid fa-minus"></i>
                </button>

                <span class="span" data-qty>{{ qty }}</span>

                <button @click="addToQty" class="counter-btn" data-qty-plus>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>

              <div style="gap: 1rem" class="row items-center no-wrap">
                <button @click="addtoCart" class="cart-btn">
                  <i class="fa-solid text-white fa-bag-shopping"></i>

                  <span class="span text-white">Add to cart</span>
                </button>
                <!-- <button
                  @click="
                    product.liked === false
                      ? addtoWishList()
                      : removeFromWishlist()
                  "
                  class="card-action-btn"
                  aria-label="add to whishlist"
                  title="add to whishlist"
                >
                  <i
                    style="font-size: 2.5rem"
                    v-if="product.liked"
                    class="fa-solid text-warning fa-heart"
                  ></i>
                  <i
                    style="font-size: 2.5rem"
                    v-else
                    class="fa-regular fa-heart"
                  ></i>
                </button> -->
              </div>
            </div>
          </div>
        </div>

        <div class="desc_wrap q-mt-lg">
          <h6 class="text-h4 text-weight-bold">Description</h6>
          <p v-html="product.description" class="product-text q-mt-md"></p>
          <!-- <h6 class="text-h3 text-weight-bold">Specifications</h6>
          <p v-html="product.content"></p> -->
        </div>
      </section>
    </article>
    <FooterComp />
  </q-layout>
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref, watch } from "vue";
import FooterComp from "src/components/FooterComp.vue";
let loading = ref(false);
import { useCartStore } from "src/stores/cart";
import { useRoute, useRouter } from "vue-router";
import { useMyAuthStore } from "src/stores/auth";
const route = useRouter();
let signleRouteData = useRoute();
let store = useCartStore();
let authStore = useMyAuthStore();
const routeParams = ref(route.params);
let product = ref({});
let qty = ref(1);
let slide = ref(1);
let recommendedProducts = ref({});
watch(routeParams, (newParams, oldParams) => {
  // Handle the route parameter changes here
  // console.log("Route parameters changed:", newParams);
});
const addtoCart = () => {
  let productValue = {
    ...product.value,
    quantityy: qty.value,
    detail: "detail",
  };
  // console.log(productValue);
  store.addTocart(productValue);
};
const addToQty = () => {
  qty.value++;
};
const removeFromQty = () => {
  qty.value--;
  if (qty.value === 0) {
    qty.value = 1;
    Notify.create({
      message: "Your product quantity must be at least 1",
    });
    return;
  }
};
const getProductDetail = () => {
  loading.value = true;
  authAxios
    .get(`product/show/${signleRouteData.query.id}`)
    .then(({ data }) => {
      console.log(data);
      product.value = {
        ...data.data,
      };
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const getRecommendedProducts = () => {
  authAxios
    .get("recommend-products")
    .then((data) => {
      // console.log(data);
      recommendedProducts.value = data.data;
    })
    .catch(({ response }) => {
      Notify.create({
        message: `Could not fetch products, please check your network settings.`,
        color: "red",
        position: "bottom",
        timeout: 10500,
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const addtoWishList = () => {
  // console.log(data)
  product.value.liked = !product.value.liked;
  authAxios
    .post(`customer/dashboard/wishlist/add`, {
      product_id: product.value.id,
    })
    .then((response) => {
      // console.log(response);
      const updatedItemIndex = authStore.allProducts.findIndex(
        (i) => i.id === product.value.id
      );
      if (updatedItemIndex !== -1) {
        authStore.allProducts[updatedItemIndex].liked = product.value.liked;
      }
      Notify.create({
        message: "Product added to favourites",
        color: "green",
      });
      authStore.getWish();
    })
    .catch(({ response }) => {
      product.value.liked = !product.value.liked;
      // console.log(response);
      Notify.create({
        message: response.data.message,
        color: "red",
      });
    });
};

const removeFromWishlist = () => {
  product.value.liked = !product.value.liked;
  authAxios
    .delete(`customer/dashboard/wishlist/remove?product_id=${product.value.id}`)
    .then((response) => {
      const updatedItemIndex = authStore.allProducts.findIndex(
        (i) => i.id === product.value.id
      );
      if (updatedItemIndex !== -1) {
        authStore.allProducts[updatedItemIndex].liked = product.value.liked;
      }
      Notify.create({
        message: "Product removed to favourites",
        color: "green",
      });

      authStore.getWish();
    })
    .catch(({ response }) => {});
};
onMounted(() => {
  getProductDetail();
});
</script>

<style lang="scss" scoped>
.product-slides {
  position: relative;
  margin-inline: -15px;
  overflow: hidden;
}

.slider-banner {
  display: flex;
  transition: var(--transition-2);
}

.product-banner {
  min-width: 100%;
  max-height: 300px;
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--white);
  color: var(--eerie-black);
  padding: 12px;
  border-radius: var(--radius-circle);
}
.product .container {
  margin-top: 3rem;
}

.slide-btn.prev {
  left: 15px;
}

.slide-btn.next {
  right: 15px;
}
section {
  padding: 0;
}

.slide-btn.disabled {
  color: var(--dark-electric-blue);
  opacity: 0.8;
  pointer-events: none;
}

.product-content {
  padding-block: 24px 50px;
  padding-inline: 8px;
}

.product-content .product-subtitle {
  color: hsl(146, 75%, 30%);
  font-size: var(--fs-4);
  font-weight: var(--fw-700);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-content .product-title {
  color: var(--eerie-black);
  font-size: var(--fs-2);
  line-height: 1.1;
  margin-block: 12px 18px;
}

.desc_wrap {
  max-width: 1300px;
  width: 90%;
  margin: 0 auto;
  padding-top: 4rem;
  .product-text {
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
}

.product-content .product-text {
  font-size: var(--fs-3);
  line-height: 1.7;
}

.product-content .wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-block: 10px 25px;
}

.product-content .price {
  color: var(--eerie-black);
  font-size: var(--fs-1);
  font-weight: var(--fw-700);
}

.product-content .badge {
  background: var(--sea-green_10);
  color: hsl(146, 75%, 30%);
  font-weight: var(--fw-700);
  padding: 4px 10px;
  border-radius: var(--radius-6);
}

.product-content .del {
  color: var(--cadet-blue-crayola);
  font-weight: var(--fw-500);
  margin-inline-start: auto;
}

.counter-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ghost-white);
  border-radius: var(--radius-10);
  margin-block-end: 15px;
}

.counter-btn {
  color: hsl(146, 75%, 30%);
  font-size: 18px;
  padding: 19px;
  border: 1px solid white;
  transition: var(--transition-1);
}

.counter-btn i {
  --ionicon-stroke-width: 80px;
}

.counter-btn:is(:hover, :focus) {
  color: var(--shamrock-green);
}

.counter-wrapper .span {
  color: var(--eerie-black);
  font-weight: var(--fw-700);
}

.cart-btn {
  display: flex;
  align-items: center;
  border: 1px solid white;
  justify-content: center;
  gap: 15px;
  width: 100%;
  background: hsl(146, 75%, 30%);
  color: var(--white);
  font-weight: var(--fw-500);
  padding: 18px;
  border-radius: var(--radius-10);
  box-shadow: var(--shadow-2);
  transition: var(--transition-1);
}

.cart-btn i {
  --ionicon-stroke-width: 50px;
}

.cart-btn:is(:hover, :focus) {
  background-color: hsl(146, 51%, 41%);
}

@media (min-width: 768px) {
  .container {
    max-width: 400px;
    margin-inline: auto;
  }

  // .product {
  //   margin-block-start: 45px;
  // }

  .product .container {
    display: grid;
    gap: 20px;
  }

  .product-slides {
    border-radius: var(--radius-15);
  }

  .product-banner {
    max-height: unset;
  }
}

@media (min-width: 992px) {
  :root {
    --fs-2: 1.4rem;
    --fs-4: 1.3rem;
  }

  .container {
    max-width: 950px;
  }

  .profile-btn .img {
    width: 50px;
  }

  .product {
    margin-block: 15px 100px;
  }

  .product .container {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 90px;
  }

  .product-slides {
    margin-inline: 0;
  }

  .product-content {
    padding: 0;
  }

  .product-title {
    --fs-1: 4.5rem;
  }

  .btn-group {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    align-items: center;
    gap: 15px;
  }

  .counter-wrapper {
    margin-block-end: 0;
  }
}
</style>
