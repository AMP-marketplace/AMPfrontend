<template>
  <div class="contactUs">
    <div class="businesses hero">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="container rima_det">
          <div class="hero_text">
            <h1 class="">Contact us</h1>

            <div class="hero-text text-weight-bold">
              We're Here to Answer Your Questions <br />
              and Listen to Your Feedback
            </div>
          </div>
        </div>
      </div>
    </div>
    <ContactComp />

    <div class="wrapper">
      <FooterComp />
    </div>
  </div>
</template>

<script setup>
import FooterComp from "src/components/FooterComp.vue";
import ContactComp from "src/components/ContactComp.vue";
import { onMounted } from "vue";
import { useMeta } from "quasar";

const metaData = {
  // sets document title
  title: "Africa Medical Marketplace",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title) => `${title} - Contact Us`,

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

<style scoped>
.businesses {
  position: relative;
  z-index: 1;
  height: 50vh;
  min-height: 70vh;
  /* pa */
  background: url("/images/company1.jpg") no-repeat center top/cover;
}

.wrapper {
  padding-top: 3rem;
}

img {
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.1);
}

img {
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
}
img:hover {
  transform: scale(1.1);
}
.welcome {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.37);
  border-radius: 83.4527px;

  margin-bottom: 1rem;
  width: 222px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #005be3;
}

.header__text {
  font-style: normal;
  font-weight: 900;
  font-size: 54.3307px;
  line-height: 63px;

  color: #ffffff;

  margin-top: 1rem;
  margin-bottom: 1rem;
}

.rima_det {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 10%;
  transform: translate(-10%, -50%);
  color: #fff;
}

.rima_det p.dett {
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  line-height: 104.4%;
  /* or 50px */

  color: #ffffff;
}

.hero-text {
  max-width: 70%;
}

@media (max-width: 500px) {
  .header__text {
    font-size: 44.3307px;
  }
  .hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .rima_det p.dett {
    font-size: 30px;
  }

  .hero_text {
    margin-top: 4rem;
  }

  .det div {
    font-size: 13px;
  }
}
</style>
