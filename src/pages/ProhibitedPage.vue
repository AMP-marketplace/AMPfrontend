<template>
  <q-page>
    <section>
      <div class="hero">
        <div class="container">
          <p class="text text-white">
            <q-badge color="white" rounded class="q-mr-sm" />Where Convenience
            Meets Efficiency
          </p>
          <h1 class="text-h3">#Prohibited Item Policy</h1>
        </div>
      </div>
    </section>

    <section class="q-pb-xl">
      <div class="container">
        <div class="q-mt-lg">
          <!-- <h4 class="text-h5 text-weight-bold q-mb-md text-center">
            General Questions
          </h4> -->
          <div
            style="max-width: 600px; margin: 0 auto"
            class="row justify-center"
          >
            <q-list bordered class="rounded-borders p-4 full-width">
              <div class="q-mt-md">
                <h4 class="text-weight-bold">
                  Africa Medical Marketplace (AMP) Prohibited Item Policy
                </h4>

                <p class="q-mt-md">
                  At Africa Medical Marketplace (AMP), we are committed to
                  maintaining a safe, legal, and ethical marketplace for the
                  trade of medical equipment and healthcare-related products. To
                  ensure compliance with industry regulations and to protect our
                  users, the following items are strictly prohibited from being
                  listed, sold, or traded on our platform.
                </p>
              </div>
              <div class="q-mt-md">
                <h4 class="text-weight-bold">1) Prohibited Items</h4>

                <p class="">
                  The following categories of items are not allowed on Africa
                  Medical Marketplace (AMP):
                </p>

                <ul>
                  <li>
                    Medications, prescription drugs, over-the-counter (OTC)
                    drugs, and pharmaceuticals.
                  </li>
                  <li>
                    Controlled substances, narcotics, or any substance requiring
                    a medical prescription.
                  </li>
                  <li>
                    Illegal or unregistered medical devices that do not comply
                    with local and international regulations.
                  </li>
                  <li>Counterfeit, recalled, or stolen medical products.</li>
                  <li>
                    Hazardous materials, including radioactive and biohazardous
                    substances.
                  </li>
                  <li>
                    Used, refurbished, or non-sterile single-use medical items.
                  </li>
                  <li>
                    Any product that makes misleading or false health claims.
                  </li>
                  <li>Human body parts, tissues, or organs.</li>
                  <li>Medical waste or expired medical products.</li>
                </ul>
              </div>
              <div class="q-mt-md">
                <h4 class="text-weight-bold">2) Vendor Responsibility</h4>
                <p>
                  All vendors on Africa Medical Marketplace (AMP) are
                  responsible for ensuring their listings comply with applicable
                  laws, industry regulations, and this policy. AMP serves solely
                  as a marketplace platform and does not directly sell,
                  distribute, or verify the legality of listed products. Vendors
                  must ensure that all products meet safety standards and are
                  legally authorized for sale in their target markets.
                </p>
              </div>
              <div class="q-mt-md">
                <h4 class="text-weight-bold">3) Compliance & Enforcement</h4>

                <p>
                  AMP reserves the right to remove any listing that violates
                  this policy, suspend vendor accounts, or take legal action
                  where necessary. Vendors who repeatedly violate these
                  guidelines may be permanently banned from using our platform.
                </p>
              </div>
              <div class="q-mt-md">
                <h4 class="text-weight-bold">4) Reporting Violations</h4>

                <p>
                  If you come across any prohibited item listings or suspect a
                  vendor is violating this policy, please report it immediately
                  to our support team at
                  <a href="mailto:hello@africamedicalmarketplace.com."
                    >hello@africamedicalmarketplace.com</a
                  >
                  Our team will review the report and take appropriate action.
                </p>
              </div>
              <div class="q-mt-md">
                <h4 class="text-weight-bold">5) Policy Updates</h4>
                <p>
                  AMP reserves the right to modify this policy at any time.
                  Vendors are encouraged to regularly review our guidelines to
                  ensure compliance.
                </p>
              </div>
            </q-list>
          </div>
        </div>
      </div>
    </section>
    <FooterCompVue />
  </q-page>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";

import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Africa Medical Marketplace",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Frequently asked questions`,

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
</script>

<style lang="scss" scoped>
hr {
  margin: auto !important;
  padding: auto !important;
}

.hero {
  height: 30vh;
}
</style>
