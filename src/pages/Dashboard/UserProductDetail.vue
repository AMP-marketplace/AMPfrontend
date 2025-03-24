<template>
  <q-layout>
    <div class="load q-pt-xl row justify-center q-mb-xl" v-if="loading">
      <q-skeleton width="90%" height="300px" />
    </div>
    <article id="mainCOn" class="container" v-else>
      <section class="section product" aria-label="product">
        <div class="container">
          <div>
            <q-carousel swipeable animated v-model="slide" thumbnails infinite>
              <q-carousel-slide
                :name="index + 1"
                v-for="(images, index) in product.media"
                :key="index"
                :img-src="images.url"
              />
            </q-carousel>
          </div>

          <div class="product-content">
            <p class="product-subtitle">{{ product.name }}</p>

            <h1 class="h1 product-title">
              Minumum Order Quantity -
              <q-badge class="orange" :label="product.minimum_order" />
            </h1>
            <h1 class="h1 product-title">
              Condition -
              <q-badge class="orange" :label="product.condition" />
            </h1>
            <h1 class="h1 product-title">
              Country -
              <q-badge class="orange" :label="product.country" />
            </h1>
            <h1 class="h1 product-title">
              Currency -
              <q-badge class="orange" :label="product.currency" />
            </h1>
            <div>
              <router-link
                :to="{
                  name: 'store.detail',
                  query: {
                    name: product.merchant?.name,
                    id: product.merchant?.id,
                    slug: product.merchant?.slug,
                  },
                }"
              >
                <span class="badge"
                  >Visit Store: {{ product.merchant?.business_name }}</span
                >
              </router-link>

              <div class="q-mt-md">
                <q-separator />
              </div>

              <!-- <p>
                Email:
                <a :href="`mailto:${product.merchant?.user.email}`">
                  {{ product.merchant?.user.email }}</a
                >
              </p>
              <p>
                Phone:
                <a :href="`tel:${product.merchant?.user.phone}`">
                  {{ product.merchant?.user.phone }}</a
                >
              </p> -->
            </div>
            <div v-if="product?.price?.minimum_price" class="wrapper">
              <span class="price" data-total-price
                >{{ getCountryCurrencySymbol(product?.country) }}
                {{
                  product?.price?.minimum_price
                    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    .replace(/[^\d.]/g, "")
                }}
                <span v-if="product?.price?.maximum_price !== '1'"> - </span>
                <span v-if="product?.price?.maximum_price !== '1'"
                  >{{ getCountryCurrencySymbol(product?.country)
                  }}{{
                    product?.price?.maximum_price
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      .replace(/[^\d.]/g, "")
                  }}</span
                ></span
              >

              <!-- <del class="del"
                >₦{{ (parseInt(product.price) + 500).toLocaleString() }}</del
              > -->
            </div>
            <p
              style="line-height: 1.1"
              v-if="
                !product?.price?.minimum_price &&
                route.name !== 'account.dashboard'
              "
              class="text-blue-10 q-pb-md text-italic q-mt-md text-h6 text-weight-bold"
            >
              <a
                target="_blank"
                :href="`mailto:${product?.merchant?.user?.email}`"
                ><small>Contact seller for price details</small></a
              >
            </p>
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
        <div class="grid items-center">
          <div class="desc_wrap">
            <h6 class="text-h4 text-weight-bold">Description</h6>
            <p v-html="product.description" class="product-text q-mt-md"></p>
          </div>
          <div>
            <div class="q-my-md">
              <h6 class="text-h6 text-weight-bold">Delivery</h6>
              <p>
                Shipping to be negotiated. Contact supplier for more details(you
                can chat or call seller)
              </p>
            </div>
            <q-separator />
            <div class="q-my-md">
              <h6 class="text-weight-bold text-h5">Seller information</h6>
              <div class="q-mt-sm">
                <p>
                  Name: <strong>{{ product.merchant?.business_name }}</strong>
                </p>
                <p>
                  Address: <strong>{{ product.merchant?.address }}</strong>
                </p>
                <p>
                  Country: <strong>{{ product.merchant?.country }}</strong>
                </p>
              </div>
              <!-- <div class="bg-grey-3 q-mt-sm q-pa-sm">
                <p>
                  <i class="ri-phone-line q-mr-sm"></i>
                  {{ product.merchant?.user?.phone }}
                </p>
              </div> -->
              <div class="q-mt-sm">
                <q-btn
                  @click="chatSeller"
                  flat
                  :loading="loadingChatBtn"
                  no-caps
                  v-if="authStore.token"
                  no-wrap
                  class="bg-green-7 text-white"
                >
                  <i class="ri-chat-2-line q-mr-sm"></i> Contact seller
                </q-btn>
                <q-btn
                  v-else
                  flat
                  @click="contactSellerModal = !contactSellerModal"
                  no-caps
                  no-wrap
                  class="bg-green-7 text-white"
                >
                  <i class="ri-chat-2-line q-mr-sm"></i> Please login to send
                  seller a message
                </q-btn>
              </div>
            </div>
            <q-separator />
            <div class="q-my-md">
              <h6 class="text-h6 text-weight-bold">
                Payments for this product
              </h6>
              <div class="q-mt-md">
                <div style="gap: 1rem" class="row items-start no-wrap">
                  <div>
                    <i class="ri-git-repository-private-line"></i>
                  </div>
                  <div>
                    <p class="text-weight-bold">Secure payments</p>
                    <p class="">
                      Every payment you make on Africa medical marketplace is
                      secured with strict SSL encryption and PCI DSS data
                      protection protocols.
                    </p>
                  </div>
                </div>
                <div style="gap: 1rem" class="row q-mt-sm items-start no-wrap">
                  <div>
                    <i class="ri-refund-line"></i>
                  </div>
                  <div>
                    <p class="text-weight-bold">Refund policy</p>
                    <p class="">
                      Claim a refund if your order doesn't ship, is missing, or
                      arrives with product issues
                    </p>
                  </div>
                </div>
              </div>

              <p class="q-mt-md text-grey-8">
                Africa medical marketplace protects all your orders placed and
                paid on the platform with

                <strong class="">
                  <i class="ri-shield-line q-mr-xs text-yellow-10"></i>Trade
                  assurance
                </strong>
              </p>

              <div style="gap: 1rem" class="share_btn row items-center nowrap">
                <q-btn
                  @click="showShareSheet"
                  flat
                  no-wrap
                  no-caps
                  class="review_big text-center"
                >
                  <i class="fa-solid q-mr-sm fa-share-nodes"></i> Share link
                </q-btn>

                <q-btn
                  @click="copyTo"
                  flat
                  text-color="white"
                  class="bg-primary"
                  no-caps
                  no-wrap
                  rounded
                >
                  Copy Link
                </q-btn>
              </div>
            </div>
          </div>
        </div>

        <div class="reviews_list">
          <q-toolbar id="reviews" class="text-black">
            <q-toolbar-title>Reviews</q-toolbar-title>
            <q-btn
              class="bg-green-7 text-white"
              no-wrap
              no-caps
              @click="rateModal = !rateModal"
            >
              Add Ratings
            </q-btn>
          </q-toolbar>
          <q-list
            v-if="product?.review?.length"
            class="q-mb-lg"
            separator
            bordered
          >
            <q-item
              v-for="(review, index) in product?.review"
              :key="index"
              class="q-my-sm"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar
                  v-if="review?.media?.length"
                  color="primary"
                  text-color="white"
                >
                  <img
                    :src="review.media[0] ? review?.media[0]?.url : ''"
                    alt=""
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ review.remark }}</q-item-label>
                <q-item-label caption lines="1"
                  >{{ review.author.name }} -
                  {{ review.author.email }}</q-item-label
                >
              </q-item-section>

              <q-item-section side>
                <q-btn v-if="review.is_author" @click="deleteReview(review)">
                  Delete
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div style="margin: 0.5rem" class="auth">
          <div class="row justify-start q-mb-md">
            <q-rating
              v-model="product.rating"
              size="2em"
              color="green-7"
              disable
              icon="star_border"
              icon-selected="star"
            />
          </div>
          <div class="text-left q-mb-sm">
            <div class="text-body1">Please kindly leave a review</div>
          </div>

          <form @submit.prevent="uploadReview">
            <div class="input_wrap">
              <div class="input">
                <textarea
                  placeholder="Leave a comment"
                  v-model="data.remark"
                  required
                  cols="20"
                  rows="5"
                ></textarea>
              </div>

              <div>
                <q-file v-model="data.media" label="Upload review file" />
              </div>
            </div>
            <q-btn
              class="apply bg-primary q-px-xl q-mt-md"
              no-caps
              :loading="loadingReview"
              flat
              type="submit"
              rounded
              text-color="white"
            >
              Submit
            </q-btn>
          </form>
        </div>
      </section>
    </article>
    <FooterComp />

    <q-dialog class="dialog" v-model="rateModal">
      <div class="auth">
        <q-card class="rate">
          <div class="text-center q-mb-sm">
            <div class="bigMediumText">Rate product</div>
          </div>

          <div class="auth">
            <div class="row justify-center">
              <q-rating
                v-model="ratingModel"
                size="2em"
                color="info"
                icon="star_border"
                icon-selected="star"
              />

              <div class="input_wrap">
                <div class="input">
                  <select v-model="rating_type">
                    <option value="Top rated seller">Top Rated Seller</option>
                    <option value="Excellent customer service">
                      Excellent Customer Service
                    </option>
                    <option value="Fast shipping">Fast Shipping</option>
                    <option value="Trusted supplier">Trusted Supplier</option>
                    <option value="Responsive eller">Responsive Seller</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="total no-wrap row justify-center q-mt-md items-center">
            <q-btn
              class="apply bg-primary q-px-xl q-mt-md"
              no-caps
              flat
              @click="rateProduct"
              rounded
              :loading="loadingRating"
              text-color="white"
            >
              Submit
            </q-btn>
          </div>
        </q-card>
      </div>
    </q-dialog>

    <q-dialog v-model="chatModal" persistent class="chatDialog">
      <div>
        <ChatPage
          :product="product"
          :conversationMessages="conversationMessages"
          :conversationDetails="conversationDetails"
          @closeModal="closeModalToggle"
        />
      </div>
    </q-dialog>

    <q-dialog v-model="contactSellerModal">
      <q-card v-if="!authStore.token">
        <div class="column items-center justify-center text-center">
          <p>You have to be signed in to contact seller</p>

          <div
            style="gap: 1rem"
            class="row q-mt-md justify-center items-center no-wrap"
          >
            <q-btn
              :to="{
                name: 'customer.login',
                query: {
                  redirect: signleRouteData.name,
                  name: signleRouteData.query.name,
                  slug: signleRouteData.query.slug,
                  id: signleRouteData.query.id,
                },
              }"
              no-wrap
              no-caps
              color="primary"
            >
              Login as a user
            </q-btn>
            <q-btn
              :to="{
                name: 'merchant.login',
                query: {
                  redirect: signleRouteData.name,
                  name: signleRouteData.query.name,
                  slug: signleRouteData.query.slug,
                  id: signleRouteData.query.id,
                },
              }"
              no-wrap
              no-caps
              color="primary"
            >
              Login as a merchant
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import {
  Dialog,
  Loading,
  Notify,
  QSpinnerOval,
  BottomSheet,
  copyToClipboard,
  useMeta,
} from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref, watch, computed, watchEffect } from "vue";
import FooterComp from "src/components/FooterComp.vue";
import ChatPage from "src/components/ChatPage.vue";
import { useCartStore } from "src/stores/cart";
import { useRoute, useRouter } from "vue-router";
import { useMyAuthStore } from "src/stores/auth";
import he from "he";
import countries from "app/countries";
import currencies from "app/currencies";
const route = useRouter();
let signleRouteData = useRoute();
let store = useCartStore();
let authStore = useMyAuthStore();
const routeParams = ref(route.params);
let product = ref({ rating: 0 });
let data = ref({ media: null });
let qty = ref(1);
let ratingModel = ref(0);
let loading = ref(false);
let contactSellerModal = ref(false);
let chatModal = ref(false);
let rateModal = ref(false);
let loadingChatBtn = ref(false);
let loadingReview = ref(false);
let loadingRating = ref(false);
let conversationDetails = ref({});
let errors = ref({});
let conversationMessages = ref([]);
let rating_type = ref("");
let slide = ref(1);
let recommendedProducts = ref({});
watch(routeParams, (newParams, oldParams) => {
  // Handle the route parameter changes here
  // console.log("Route parameters changed:", newParams);
});
const closeModalToggle = () => {
  chatModal.value = false;
};
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

function getCountryFlag(countryName) {
  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName?.toLowerCase()
  );
  return country ? country.flag : "🏳️"; // Return white flag if country not found
}
function getCountryCurrencySymbol(countryName) {
  const country = currencies.find(
    (c) => c.code.toLowerCase() === product.value?.currency?.toLowerCase()
  );
  return country ? country.symbol : ""; // Return white flag if country not found
}
const deleteReview = (review) => {
  Dialog.create({
    title: "Note",
    message: `Are you sure you want to delete this review?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerOval,
        message: "Deleting review...",
      });
      authAxios
        .delete(`review/delete/${review.id}`)
        .then(({ data }) => {
          Loading.hide();
          console.log(data);
          getDetail();
        })
        .catch(({ response }) => {
          Loading.hide();
          loading.value = false;
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
const getProductDetail = () => {
  loading.value = true;
  authAxios
    .get(`${signleRouteData.query.slug}/show`)
    .then(({ data }) => {
      console.log(data);
      product.value = {
        ...data.data,
      };
      loading.value = false;

      document.getElementById("mainCOn").scrollIntoView({ behavior: "smooth" });
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const rateProduct = () => {
  loadingRating.value = true;
  authAxios
    .post(`product/${signleRouteData.query.slug}/rating/create`, {
      value: ratingModel.value,
    })
    .then(({ data }) => {
      console.log(data);
      Notify.create({
        message: "Ratings successfully added",
        position: "top",
        color: "green",
      });
      getDetail();
      loadingRating.value = false;
      rateModal.value = false;
      document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
    })
    .catch(({ response }) => {
      loadingRating.value = false;
      Notify.create({
        message: "An error occurred",
        position: "top",
        color: "red",
      });
    });
};
const uploadReview = () => {
  // if (!data.value.media) {
  //   Notify.create({
  //     message: "Please upload a review file",
  //     position: "top",
  //     color: "red",
  //   });

  //   return;
  // } else {
  const formData = new FormData();
  formData.append("remark", data.value.remark);
  formData.append("media[]", data.value.media);
  loadingReview.value = true;
  authAxios
    .post(`product/${signleRouteData.query.slug}/review/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      Notify.create({
        message: "Review successfully added",
        position: "top",
        color: "green",
      });
      loadingReview.value = false;
      data.value = { media: null };
      getDetail();
    })
    .catch(({ response }) => {
      loadingReview.value = false;
      Notify.create({
        message: "An error occurred",
        position: "top",
        color: "red",
      });
    });
};
const getDetail = async () => {
  try {
    let prodData = await authAxios.get(`${signleRouteData.query.slug}/show`);
    // console.log(prodData);
    product.value = prodData.data.data;
    document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
  } catch (error) {}
};

let chatSeller = () => {
  loadingChatBtn.value = true;
  authAxios
    .post(`chat/create-or-get`, {
      participant_one_id:
        authStore.userdetails.roles[0].name === "merchant"
          ? authStore.storedetails.id
          : authStore.userdetails.id,
      participant_one_type:
        authStore.userdetails.roles[0].name === "shopper" ? "user" : "merchant",
      participant_two_id: product.value.merchant.id,
      participant_two_type: product.value.merchant.user.roles[0].name,
      // user_id: authStore.userdetails.id,
      // merchant_id: product.value.merchant.id,
    })
    .then((response) => {
      loadingChatBtn.value = false;
      console.log(response);
      conversationDetails.value = response.data.data;
      chatModal.value = true;
      // getConversations(response.data.conversation.id);
    })
    .catch(({ response }) => {
      // console.log(response);
      if (response.data.message === "The user id field is required.") {
        Notify.create({
          message: "You need to be logged in to start a conversation",
          position: "top",
          color: "red",
        });

        Dialog.create({
          title: "Authenticate",
          message: `Please login to start conversation with vendor`,
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            route.replace({
              name: "customer.login",
              query: {
                redirect: signleRouteData.name,
              },
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }

      loadingChatBtn.value = false;
      errors = response.data.errors || {};
    });
  // chat = true;
};

let getConversations = (id) => {
  authAxios
    .get(`chat/${id}`)
    .then((response) => {
      console.log(response);
      conversationMessages.value = response.data.messages;
      console.log(conversationMessages);
      chat = true;
    })
    .catch(({ response }) => {
      // $q.loading.hide();

      errors.value = response.data.errors || {};
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

const cleanedDescription = product.value?.description
  ? cleanDescription(
      truncatedDescription(product.value?.description) ||
        "Check out this amazing product!"
    )
  : "";

console.log(product.value?.media);

useMeta({
  title: product.value?.name || "Product Details",
  meta: [
    {
      property: "og:title",
      content: product.value?.name || "Product Details",
    },
    { property: "og:description", content: cleanedDescription },
    {
      property: "og:image",
      content: product.value?.media
        ? product.value?.media[0]?.url // Ensure this is the full Cloudinary URL
        : "https://www.africamedicalmarketplace.com/images/logo.svg",
    },
    {
      property: "og:url",
      content: `https://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value?.slug}`,
    },
    { property: "og:type", content: "product" },

    // Twitter Card Meta Tags
    { name: "twitter:card", content: "summary_large_image" }, // Use "summary" for small images
    {
      name: "twitter:title",
      content: product.value?.name || "Product Details",
    },
    { name: "twitter:description", content: cleanedDescription },
    {
      name: "twitter:image",
      content: product.value?.media
        ? product.value?.media[0]?.url // Ensure this is the full Cloudinary URL
        : "https://www.africamedicalmarketplace.com/images/logo.svg",
    },
    {
      name: "twitter:url",
      content: `https://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value?.slug}`,
    },
  ],
});

// let copyTo = () => {
//   copyToClipboard(
//     `https://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value.slug}`
//   ).then(() => {
//     Notify.create({
//       message: "Link copied successfully",
//       position: "top",
//       color: "green-7",
//     });
//   });
// };

// Utility function to strip HTML tags
function stripHtmlTags(html) {
  return html.replace(/<[^>]*>?/gm, "");
}

// Utility function to clean description
function cleanDescription(description) {
  const stripped = stripHtmlTags(description); // Remove HTML tags
  return he.decode(stripped); // Decode HTML entities
}

// Copy link and description to clipboard
let copyTo = () => {
  const cleanedDescription = cleanDescription(
    truncatedDescription(product.value?.description) ||
      "Check out this amazing product!"
  );
  const textToCopy = `Check out this product: ${product.value.name}\n\n${cleanedDescription}\n\nhttps://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value.slug}`;

  copyToClipboard(textToCopy).then(() => {
    Notify.create({
      message: "Link and description copied successfully",
      position: "top",
      color: "green-7",
    });
  });
};

let truncatedDescription = (description) => {
  return (
    description.split(" ").slice(0, 20).join(" ") +
    (description.split(" ").length > 20 ? "..." : "")
  );
};

const showShareSheet = () => {
  BottomSheet.create({
    title: `Share ${product.value.name}`,
    grid: true,
    actions: [
      {
        label: "Copy Link",
        icon: "content_copy",
        id: "copyLink",
      },
      {
        label: "Share via WhatsApp",
        icon: "fa-brands fa-whatsapp",
        id: "whatsapp",
      },
      {
        label: "Share via X (formerly Twitter)",
        icon: "fa-brands fa-x-twitter",
        id: "twitter",
      },
      {
        label: "Share via Facebook",
        icon: "facebook",
        id: "facebook",
      },
      {
        label: "Share via Instagram",
        icon: "fa-brands fa-instagram",
        id: "instagram",
      },
      {
        label: "Share via TikTok",
        icon: "tiktok",
        id: "tiktok",
      },
      {
        label: "Share via Email",
        icon: "email",
        id: "email",
      },
    ],
  })
    .onOk((action) => {
      if (action.id === "copyLink") {
        copyTo();
      } else if (action.id === "whatsapp") {
        shareViaWhatsApp();
      } else if (action.id === "twitter") {
        shareViaX();
      } else if (action.id === "facebook") {
        shareViaFacebook();
      } else if (action.id === "instagram") {
        shareViaInstagram();
      } else if (action.id === "tiktok") {
        shareViaTikTok();
      } else {
        shareViaEmail();
      }
    })
    .onCancel(() => {
      // console.log('Dismissed')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

// const shareViaWhatsApp = () => {
//   const url = `https://wa.me/?text=${encodeURIComponent(
//     "Check out this amazing platform for your medical equipments needs across africa! " +
//       `https://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value.slug}`
//   )}`;
//   window.open(url, "_blank");
// };
// Example sharing function
const shareViaWhatsApp = () => {
  const cleanedDescription = cleanDescription(
    truncatedDescription(product.value?.description) ||
      "Check out this amazing product!"
  );
  const url = `https://wa.me/?text=${encodeURIComponent(
    `Check out this product: ${product.value.name}\n\n${cleanedDescription}\n\nhttps://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value.slug}`
  )}`;
  window.open(url, "_blank");
};

const shareViaX = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    "Check out this amazing platform for your medical equipments needs across africa! " +
      `https://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value.slug}`
  )}`;
  window.open(url, "_blank");
};

const shareViaFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value.slug}`
  )}`;
  window.open(url, "_blank");
};

const shareViaInstagram = () => {
  Notify.create({
    color: "orange",
    icon: "info",
    position: "top",
    progress: 100,
    message: "Instagram sharing requires opening the app directly.",
  });
};

const shareViaTikTok = () => {
  Notify.create({
    color: "purple",
    icon: "info",
    position: "top",
    progress: 100,
    message: "TikTok sharing requires opening the app directly.",
  });
};

const shareViaEmail = () => {
  const url = `mailto:?subject=Join me on this amazing app!&body=${encodeURIComponent(
    "Check out this amazing platform for your medical equipments needs across africa" +
      `https://www.africamedicalmarketplace.com/user/product-detail?slug=${product.value.slug}`
  )}`;
  window.open(url, "_blank");
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
  font-size: 1.6rem;
  font-weight: 700;
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
  font-size: 1.5rem;
  font-weight: 700;
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

.share_btn {
  width: 100%;
  margin-top: 1rem;
  .q-btn {
    padding: 12px 20px 12px 20px;
    border-radius: 15px;
    border: 2px solid #efefef;
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
