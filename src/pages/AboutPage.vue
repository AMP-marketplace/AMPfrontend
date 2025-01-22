<template>
  <q-page class="">
    <section class="about">
      <div class="hero">
        <div class="container">
          <p class="text text-white">
            <q-badge color="white" rounded class="q-mr-sm" />About Us
          </p>
          <h1 class="text-h3">
            Revolutionalising Healthcare <br />Access in Africa
          </h1>

          <p class="text text-white">
            #1 Marketplace to Buy & Sell Medical Equipment in Africa
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid items-center">
          <div class="left">
            <h4 class="text-h3 q-mb-md text-weight-bold">About us</h4>
            <p>
              At Africa Medical Marketplace, we are dedicated to facilitating
              access to quality and affordable healthcare solutions across
              Africa’s diverse communities. Our platform serves as a bridge,
              connecting global manufacturers, distributors, and suppliers with
              healthcare professionals and institutions across all 54 countries
              of Africa. We are committed to democratizing healthcare access,
              ensuring that even those at the grassroots level can access
              essential medical supplies and services. Through our user-friendly
              platform and dedication to social responsibility, we strive to
              make a positive impact on healthcare delivery and improve the
              lives of individuals across the continent
            </p>
          </div>
          <div class="right">
            <img src="/images/hero.png" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section class="about_us section">
      <div class="container">
        <div class="grid">
          <div class="left card card_one">
            <h4 class="text-h4">
              <span class="text-white">Our</span>
              <span class="text-blue-10"> Vision </span>
            </h4>
            <p class="q-mt-md">
              To lead the evolution of healthcare in Africa. Creating a future
              where cutting-edge technology, robust partnerships, and unwavering
              commitment ensure equitable, world-class healthcare for all. We
              aspire to be the driving fore behind a healthier, more connected,
              and prosperous Africa, where healthcare is a universal right, and
              communities thrive on well-being.
            </p>
            <div class="row justify-start">
              <img src="/images/vision.png" alt="" />
            </div>
            <div class="row justify-start">
              <img src="/images/mission.png" alt="" />
            </div>
          </div>
          <div class="left card card_two">
            <div class="row justify-end">
              <img src="/images/mission.png" alt="" />
            </div>
            <h4 class="text-h4">
              <span class="text-white">Our</span>
              <span class="text-blue-10"> Mission </span>
            </h4>
            <p class="q-mt-md">
              To transform healthcare accessibility and excellence in Africa and
              beyond by providing an innovative, inclusive, and
              technology-driven platform. we are dedicated to connecting medical
              professionals, suppliers, and biomedical engineers, fostering
              collaboration, and delivering accessible, affordable and
              high-quality healthcare solutions that empower grass root
              communities and save lives
            </p>
          </div>
        </div>

        <div class="card q-mt-md card_three">
          <div class="grid">
            <div class="q-pa-lg">
              <h4 class="text-h4">
                <span class="text-white">Our</span>
                <span class="text-blue-10"> Values </span>
              </h4>

              <div style="gap: 1rem" class="q-mt-lg row items-center no-wrap">
                <ul>
                  <li>Team work</li>
                  <li>Accessibility</li>
                  <li>Innovation</li>
                  <li>Affordability</li>
                  <li>Networking</li>
                </ul>
                <ul>
                  <li>Transparency</li>
                  <li>Personalization</li>
                  <li>Service</li>
                </ul>
              </div>
            </div>
            <div>
              <div class="row justify-end">
                <img src="/images/corevalues.png" alt="" />
              </div>
            </div>
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
  </q-page>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import SponsorsCompVue from "src/components/SponsorsComp.vue";
import { ref } from "vue";
import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Africa Medical Marketplace",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - About Us`,

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
let watchAStoreModal = ref(false);
</script>

<style scoped>
/* Add styles for your loading spinner, product grid, and cards */
.loading-spinner {
  text-align: center;
  padding: 20px;
}

.no-products {
  text-align: center;
  color: #666;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
}
</style>
