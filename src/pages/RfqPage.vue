<template>
  <q-page>
    <section>
      <div class="hero">
        <div class="container">
          <p class="text text-white">
            <q-badge color="white" rounded class="q-mr-sm" />Where Convenience
            Meets Efficiency
          </p>
          <h1 class="text-h3">#RFQ</h1>
        </div>
      </div>
    </section>

    <section class="q-pb-xl">
      <div class="q-mt-md">
        <h4 class="biggerText text-center">
          Create an RFQ that meets your needs
        </h4>
        <p class="text-center">
          Lets help source for your needs with best vendors
        </p>
      </div>
      <div class="container">
        <div class="auth">
          <form @submit.prevent="submitForm">
            <div class="input_wrap">
              <label for="">Organization Name <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.organization_name"
                  placeholder="Enter organization name"
                  required
                  type="text"
                />
              </div>
              <small
                v-if="errors.organization_name"
                class="text-red text-weight-bold"
              >
                {{ errors.organization_name[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for="">Company Details <span>*</span></label>

              <div class="input">
                <textarea
                  v-model="data.company_details"
                  cols="30"
                  placeholder="Enter company details"
                  rows="5"
                ></textarea>
              </div>
              <small
                v-if="errors.company_details"
                class="text-red text-weight-bold"
              >
                {{ errors.company_details[0] }}
              </small>
            </div>

            <div class="q-mt-md">
              <div class="grid items-center">
                <div class="phone">
                  <label for="">Phone Number<span>*</span></label>
                  <div class="phone_wrap">
                    <div class="country_select">
                      <div class="input_wrap">
                        <div class="input">
                          <select v-model="country_code">
                            <option
                              v-for="(country, index) in countries"
                              :key="index"
                              :value="country.phoneCode"
                            >
                              {{ country.phoneCode }} {{ country.flag }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="input_wrap">
                      <div class="input">
                        <input
                          v-model="data.phone"
                          placeholder="Enter phone number"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <small v-if="errors.phone" class="text-red text-weight-bold">
                    {{ errors.phone[0] }}
                  </small>
                </div>

                <div class="input_wrap">
                  <label for="">Email <span>*</span></label>
                  <div class="input">
                    <input
                      v-model="data.email"
                      placeholder="Enter email"
                      required
                      type="email"
                    />
                  </div>
                  <small v-if="errors.email" class="text-red text-weight-bold">
                    {{ errors.email[0] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="q-mt-md">
              <div class="grid">
                <div class="input_wrap">
                  <label for="">Website <span>*</span></label>
                  <div class="input">
                    <input
                      v-model="data.website"
                      placeholder="Enter website"
                      required
                      type="text"
                    />
                  </div>
                  <small
                    v-if="errors.website"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.website[0] }}
                  </small>
                </div>

                <div class="input_wrap">
                  <label for="">Contact person <span>*</span></label>
                  <div class="input">
                    <input
                      v-model="data.contact_person"
                      placeholder="Enter contact person"
                      required
                      type="text"
                    />
                  </div>
                  <small
                    v-if="errors.contact_person"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.contact_person[0] }}
                  </small>
                </div>
              </div>
            </div>

            <div class="input_wrap">
              <label for="">Project Details <span>*</span></label>
              <div class="input">
                <textarea
                  v-model="data.project_details"
                  cols="30"
                  placeholder="Enter project details"
                  rows="5"
                ></textarea>
              </div>
              <small
                v-if="errors.project_details"
                class="text-red text-weight-bold"
              >
                {{ errors.project_details[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for="">Project Description <span>*</span></label>

              <div class="input">
                <textarea
                  v-model="data.project_description"
                  cols="30"
                  placeholder="Enter project description"
                  rows="5"
                ></textarea>
              </div>
              <small
                v-if="errors.project_description"
                class="text-red text-weight-bold"
              >
                {{ errors.project_description[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for="">Specification<span>*</span></label>

              <div class="input">
                <textarea
                  v-model="data.specification"
                  cols="30"
                  placeholder="Enter specification"
                  rows="5"
                ></textarea>
              </div>
              <small
                v-if="errors.specification"
                class="text-red text-weight-bold"
              >
                {{ errors.specification[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for="">Delivery Location<span>*</span></label>

              <div class="input">
                <textarea
                  v-model="data.delivery_location"
                  cols="30"
                  placeholder="Enter location"
                  rows="5"
                ></textarea>
              </div>
              <small
                v-if="errors.delivery_location"
                class="text-red text-weight-bold"
              >
                {{ errors.delivery_location[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for="">Product Requirements<span>*</span></label>

              <div class="input">
                <textarea
                  v-model="data.product_requirements"
                  cols="30"
                  placeholder="Enter product requirements"
                  rows="5"
                ></textarea>
              </div>
              <small
                v-if="errors.product_requirements"
                class="text-red text-weight-bold"
              >
                {{ errors.product_requirements[0] }}
              </small>
            </div>
            <div class="q-mt-md">
              <div class="grid">
                <div class="input_wrap">
                  <label for="">Product Name<span>*</span></label>

                  <div class="input">
                    <input
                      v-model="data.product_name"
                      placeholder="Enter product name"
                      required
                      type="text"
                    />
                  </div>
                  <small
                    v-if="errors.product_name"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.product_name[0] }}
                  </small>
                </div>

                <div class="input_wrap">
                  <label for="">Product Quantity<span>*</span></label>

                  <div class="input">
                    <input
                      v-model="data.quantity"
                      placeholder="Enter quantity"
                      required
                      type="text"
                    />
                  </div>
                  <small
                    v-if="errors.quantity"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.quantity[0] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="q-mt-md">
              <div class="grid">
                <div class="input_wrap">
                  <label for="">Delivery Method<span>*</span></label>

                  <div class="input">
                    <select required v-model="data.delivery_method">
                      <option value="Air">Air</option>
                      <option value="Water">Water</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                  <small
                    v-if="errors.delivery_method"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.delivery_method[0] }}
                  </small>
                </div>

                <div class="input_wrap">
                  <label for="">Payment Terms<span>*</span></label>

                  <div class="input">
                    <select required v-model="data.payment_terms">
                      <option value="Direct">Direct</option>
                      <option value="Escrow">Escrow</option>
                    </select>
                  </div>
                  <small
                    v-if="errors.payment_terms"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.payment_terms[0] }}
                  </small>
                </div>
              </div>
            </div>

            <div class="q-mt-md">
              <div class="grid">
                <div class="input_wrap">
                  <label for="">Timeline<span>*</span></label>

                  <div class="input">
                    <input
                      v-model="data.timeline"
                      placeholder="Enter timeline"
                      required
                      type="text"
                    />
                  </div>
                  <small
                    v-if="errors.timeline"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.timeline[0] }}
                  </small>
                </div>

                <div class="input_wrap">
                  <label for="">Special Requirements<span>*</span></label>

                  <div class="input">
                    <input
                      v-model="data.special_requirements"
                      placeholder="Enter special requirements"
                      required
                      type="text"
                    />
                  </div>
                  <small
                    v-if="errors.special_requirements"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.special_requirements[0] }}
                  </small>
                </div>
              </div>
            </div>

            <div class="input_wrap">
              <label for=""
                >Attachments and Acknowledgement<span>*</span></label
              >
              <div class="input">
                <textarea
                  v-model="data.attachments_and_acknowledgement"
                  cols="30"
                  placeholder="Enter attachments and acknowledgement"
                  rows="5"
                ></textarea>
              </div>
              <small
                v-if="errors.attachments_and_acknowledgement"
                class="text-red text-weight-bold"
              >
                {{ errors.attachments_and_acknowledgement[0] }}
              </small>
            </div>
            <div class="row justify-center q-mt-md">
              <q-btn
                :loading="loading"
                color="primary"
                class="full-width q-pa-sm"
                rounded
                no-wrap
                no-caps
                type="submit"
              >
                Submit
              </q-btn>
            </div>
          </form>
        </div>
      </div>
    </section>

    <FooterCompVue />

    <q-dialog v-model="AttachModal">
      <q-card>
        <div class="top_modal row items-center justify-between">
          <h4 class="text1">Attach Document(s)</h4>

          <q-btn @click="AttachModal = !AttachModal" flat rounded>
            <img src="../assets/circle.svg" alt="" />
          </q-btn>
        </div>

        <q-separator class="q-mt-md" />
        <div class="auth">
          <div
            style="gap: 1rem"
            class="input justify-between column items-center no-wrap"
          >
            <q-file
              @update:model-value="setRfqFiles"
              accept=".png,.jpeg,.jpg"
              use-chips
              filled
              multiple
              class="column profile_field justify-center items-center"
              v-model="rfqDocuments"
            >
              <div class="img q-mb-sm">
                <img src="../assets/upload.svg" alt="" />
              </div>
            </q-file>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { Dialog, Loading, Notify, QSpinnerOval, useMeta } from "quasar";
import { ref } from "vue";
import { authAxios } from "src/boot/axios";
import countries from "app/countries";

let data = ref({});
let rfqData = ref({});
let errors = ref({});
let loading = ref(false);
let AttachModal = ref(false);
let rfqDocuments = ref(null);
let uploadPreviews = ref("");
let country_code = ref("+234");

const formatPhoneNumber = (phone) => {
  console.log(phone);
  if (phone.startsWith("0")) {
    return phone.slice(1);
  } else {
    return phone;
  }
};

const setRfqFiles = (props) => {
  const files = Array.isArray(props) ? props : [props]; // Ensure we handle multiple files
  const formData = new FormData();
  const imagePreviews = [];

  files.forEach((file) => {
    formData.append("documents[]", file);

    // Generate image previews
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.push(e.target.result);
      uploadPreviews.value = [...imagePreviews]; // Update previews
    };
    reader.readAsDataURL(file);
  });

  rfqDocuments.value = files; // Store the selected files

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading...",
  });

  authAxios
    .post(`rfq/${rfqData.value.id}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);

      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      Loading.hide();

      rfqDocuments.value = null;
      AttachModal.value = false;

      Dialog.create({
        title: `Your RFQ request was successful`,
        message: `We have received your RFQ request and we are looking through and proccessing it. We will get back to you very shortly.`,
        ok: {
          push: true,
          label: "Okay",
          color: "green",
        },
        cancel: {
          push: true,
          color: "grey",
        },
        persistent: true,
      })
        .onOk(() => {})
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    })
    .catch(({ response }) => {
      Loading.hide();
      errors.value = response.data.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const submitForm = () => {
  let newData = {
    ...data.value,
  };
  console.log(newData);

  loading.value = true;
  authAxios
    .post("rfq", {
      ...newData,
      phone: country_code.value + formatPhoneNumber(data.value.phone),
    })
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      data.value = {};
      loading.value = false;
      rfqData.value = response.data.rfq;
      AttachModal.value = true;
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
      errors.value = response.data.errors || {};
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
