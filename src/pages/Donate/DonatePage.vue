<template>
  <q-page class="">
    <section>
      <div class="hero donate">
        <div class="container">
          <div class="column justify-center items-center">
            <p class="text text-white">
              <q-badge color="white" rounded class="q-mr-sm" />Donate
            </p>
            <h1 class="text-h3 text-center">
              Donate To African <br />
              Communities
            </h1>

            <p
              style="max-width: 650px; margin-top: 1rem"
              class="text-white text-center"
            >
              Donating directly to African Communities through the interactive
              website can help bridge the gap and provide much-needed relief to
              those in need, improving the quality of life for countless people.
            </p>

            <div class="q-mt-md">
              <q-btn
                @click="toggleDonationModal"
                color="white"
                text-color="black"
                no-caps
                no-wrap
              >
                Donate <i class="q-ml-sm ri-hand-heart-line"></i>
              </q-btn>
            </div>
          </div>

          <div>
            <div class="row justify-end q-mt-xl">
              <q-btn
                @click="watchAStoreModal = !watchAStoreModal"
                color="white"
                outline
                rounded
                class="q-py-sm q-px-xl"
              >
                Watch a story
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="q-pt-md q-px-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el :to="{ name: 'home' }" label="Home" />
        <q-breadcrumbs-el :to="{ name: 'donate' }" label="Donate" />
        <q-breadcrumbs-el label="Explore" />
      </q-breadcrumbs>
    </div>
    <section class="new_products section">
      <div class="container">
        <div class="row items-center justify-between">
          <h4 class="text-h6 text-weight-bold">Donations</h4>
          <div>
            <!-- <router-link class="text_underline" :to="{ name: 'explore' }"
              >See All New Products</router-link
            > -->
          </div>
        </div>
        <div v-if="loadingDonations" class="responsive_grid q-mt-md">
          <div v-for="n in 3" :key="n">
            <q-card flat style="max-width: 300px">
              <q-skeleton height="150px" square />

              <q-card-section>
                <q-skeleton type="text" class="text-subtitle1" />
                <q-skeleton type="text" width="50%" class="text-subtitle1" />
                <q-skeleton type="text" class="text-caption" />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div v-if="!loadingDonations" class="q-mt-md">
          <q-infinite-scroll
            @load="loadMore"
            :offset="100"
            :disable="disableInfiniteScroll"
          >
            <div class="grid">
              <DonationsComp
                class="q-mt-lg"
                :donatePost="donation"
                v-for="(donation, index) in donationsArr"
                :key="index"
              />
            </div>
          </q-infinite-scroll>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid">
          <div class="left">
            <p>Join our waitlist</p>
            <h5 class="text-weight-bold text-h5">
              Be the first to be notified once theres a donation!
            </h5>

            <form @submit.prevent="joinWaitlist">
              <div class="auth">
                <div class="input_wrap">
                  <label for=""> Email <span>*</span></label>
                  <div class="input">
                    <input
                      v-model="waitlistData.email"
                      placeholder="Enter email"
                      required
                      type="text"
                    />
                  </div>
                </div>
                <div class="row justify-start q-mt-lg">
                  <q-btn
                    color="primary"
                    class="q-px-xl q-py-sm"
                    rounded
                    no-wrap
                    no-caps
                    type="submit"
                  >
                    Join waitlist
                  </q-btn>
                </div>
              </div>
            </form>
          </div>

          <div class="right">
            <q-img src="/images/donate.jpg" />
          </div>
        </div>
      </div>
    </section>

    <SponsorsCompVue />

    <FooterCompVue />

    <q-dialog v-model="watchAStoreModal">
      <q-card>
        <q-video
          style="height: 250px"
          src="https://res.cloudinary.com/dvs0cchst/video/upload/v1725036270/Emmy_slides_1_ekfp6n.mp4"
        />
      </q-card>
    </q-dialog>
    <q-dialog v-model="addDonationModal">
      <q-card v-if="!store.token">
        <div class="column items-center justify-center text-center">
          <p>You have to be signed in to create a donation</p>

          <div
            style="gap: 1rem"
            class="row q-mt-md justify-center items-center no-wrap"
          >
            <q-btn
              :to="{ name: 'customer.login' }"
              no-wrap
              no-caps
              color="primary"
            >
              Login as a Donor
            </q-btn>

            <!-- <q-btn
              :to="{ name: 'merchant.login' }"
              btn
              no-wrap
              no-caps
              color="primary"
            >
              Login as a merchant
            </q-btn> -->
          </div>
        </div>
      </q-card>
      <q-card v-if="store.token">
        <div class="top_modal row items-center justify-between">
          <h4 class="text1">
            {{ editState ? "Edit donation" : "Upload donation" }}
          </h4>

          <q-btn @click="addDonationModal = !addDonationModal" flat rounded>
            <img src="../../assets/circle.svg" alt="" />
          </q-btn>
        </div>

        <q-separator class="q-mt-lg" />
        <div class="auth">
          <div
            v-if="showAddDonateImage"
            style="gap: 1rem"
            class="input justify-between column items-center no-wrap"
          >
            <div class="smallText text-weight-bold">Donations image</div>
            <!-- {{ addedDonationObj }} -->
            <!-- @rejected="onRejected"  max-file-size="512000"-->
            <q-file
              @update:model-value="setDonateImage"
              accept=".png,.jpeg,.jpg"
              class="column profile_field justify-center items-center"
              v-model="donateImageFile"
            >
              <div class="img q-mb-sm">
                <img src="../../assets/upload.svg" alt="" />
              </div>
              <div class="smallText">Upload image</div>
            </q-file>
          </div>
          <form v-else @submit.prevent="addDonationFcn">
            <div class="input_wrap">
              <label for=""> Name <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.name"
                  placeholder="Enter product name"
                  required
                  type="text"
                />
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Description <span>*</span></label>
              <div class="input editor">
                <q-editor v-model="data.description" min-height="5rem" />
              </div>
            </div>

            <div class="auth_grid">
              <div class="input_wrap">
                <label for="">Country of donation<span>*</span></label>
                <div class="input">
                  <select v-model="data.country" required>
                    <option disabled value="">Choose</option>
                    <option
                      v-for="country in countries"
                      :key="country.name"
                      :value="country.name"
                    >
                      {{ country.name }} {{ country.flag }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Donation targets<span>*</span></label>
                <div class="input">
                  <input
                    v-model="data.target_audience"
                    type="text"
                    placeholder="Lagos, Nigeria residents"
                  />
                </div>
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Condition <span>*</span></label>
              <div class="input">
                <select v-model="data.condition">
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                  <option value="pre-owned">Pre owned</option>
                  <option value="open_box">Open Box</option>
                </select>
              </div>
            </div>
            <div class="row justify-end q-mt-lg">
              <q-btn
                color="primary"
                class="q-px-xl q-py-sm"
                rounded
                no-wrap
                no-caps
                type="submit"
              >
                Create donation
              </q-btn>
            </div>
          </form>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { useProductStore } from "src/stores/productStore";
import FooterCompVue from "src/components/FooterComp.vue";
import SponsorsCompVue from "src/components/SponsorsComp.vue";
import DonationsComp from "src/components/DonationsComp.vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useMyAuthStore } from "src/stores/auth";
import { Loading, Notify, QSpinnerOval } from "quasar";
import countries from "app/countries";
useI18n();

import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Africa Medical Marketplace",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Donate`,

  // meta tags
  meta: {
    description: {
      name: "description",
      content:
        "At Africa Medical Marketplace, we are dedicated to facilitating access to quality and affordable healthcare solutions across Africa’s diverse communities. Our platform serves as a bridge, connecting global manufacturers, distributors, and suppliers with healthcare professionals and institutions across all 54 countries of Africa. We are committed to democratizing healthcare access, ensuring that even those at the grassroots level can access essential medical supplies and services. Through our user-friendly platform and dedication to social responsibility, we strive to make a positive impact on healthcare delivery and improve the lives of individuals across the continent",
    },
    keywords: {
      name: "keywords",
      content:
        "Africa Medical Marketplace, Medical Equipments, X-ray Machine, Africa products",
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle} - Africa Medical Marketplace`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};

useMeta(metaData);

let productStore = useProductStore();
let store = useMyAuthStore();
let showAddDonateImage = ref(false);
let loadingDonations = ref(true);
let watchAStoreModal = ref(false);
let addDonationModal = ref(false);
let editState = ref(false);
const donationsArr = ref([]);
const searchTerm = ref("");
const donateImageFile = ref(null);
const errors = ref({});
const data = ref({ description: "" });
const donateImagePreview = ref("");
const addedDonationObj = ref({});
const waitlistData = ref({});
let page = ref(1);
let totalPages = ref(1);
let perPage = 10;
let disableInfiniteScroll = ref(false);
const currentPage = ref(1);
const lastPage = ref(1); // Total number of pages from the backend
const onRejected = () => {
  Notify.create({
    type: "negative",
    position: "top",
    message: `Your upload size should be less than 500kb `,
  });
};

const joinWaitlist = () => {};
const toggleDonationModal = () => {
  addDonationModal.value = !addDonationModal.value;
};
const addDonationFcn = () => {
  let dataToSend = {
    ...data.value,
  };
  Loading.show();
  authAxios
    .post(`donation/create`, {
      ...dataToSend,
    })
    .then((response) => {
      console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      data.value = { description: "" };
      addedDonationObj.value = response.data.data;
      showAddDonateImage.value = true;
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();

      errors.value = response.data.errors;
      Notify.create({
        message: response.data.message
          ? response.data.message
          : Object.values(response.data.errors) + ",",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const loadMore = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value += 1; // Increment page number
    getDonations(currentPage.value); // Fetch next page
  }
};

const setDonateImage = (props) => {
  donateImageFile.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    donateImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
  const formData = new FormData();
  formData.append("media[]", donateImageFile.value);
  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading image...",
  });

  authAxios
    .post(`donation/media/upload/${addedDonationObj.value.slug}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);

      Notify.create({
        message: response.data.message + ", donate successfully added.",
        color: "green",
        position: "top",
      });
      Loading.hide();
      donateImageFile.value = null;
      addDonationModal.value = false;
      getDonations();
    })
    .catch(({ response }) => {
      Loading.hide();
      errors.value = response.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const getDonations = () => {
  authAxios
    .get("donation/index")
    .then((response) => {
      console.log(response);
      // donationsArr.value = response.data.data.donations;
      const { donations, meta } = response.data.data;
      donationsArr.value = [...donationsArr.value, ...donations]; // Append the new donations to the existing array
      currentPage.value = meta.current_page; // Update the current page from the response
      lastPage.value = meta.last_page; // Update the last page from the response
      disableInfiniteScroll.value = meta.next_page_url === null; // Disable if there's no next page
      loadingDonations.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loadingDonations.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
onMounted(() => {
  getDonations();
});
</script>

<style scoped>
@media (max-width: 790px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
