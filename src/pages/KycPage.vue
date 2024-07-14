<template>
  <q-page id="landingpage" class="landingpage">
    <div class="flex container flex-center">
      <div class="auth q-pb-xl">
        <p class="text-green-10 text-weight-bold">
          You have successfully verified your Email and Phone, <br />
          follow through to start your KYC verification...
        </p>
        <h5 class="text-h5 text-weight-bold">
          Get started with your KYC Verification
        </h5>
        <form v-if="hideForm" @submit.prevent="initializeKycVerification">
          <div class="input_wrap">
            <label for="">Full name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.fullname"
                placeholder="Enter name"
                required
                type="text"
                name="fullname"
              />
            </div>

            <small v-if="errors.fullname" class="text-weight-bold text-red">
              {{ errors.fullname[0] }}
            </small>
          </div>

          <div class="auth_grid">
            <div class="input_wrap">
              <label for="">Document type <span>*</span></label>
              <div class="input">
                <select
                  @change="getDocumentType"
                  name=""
                  v-model="data.document_type_id"
                  id=""
                >
                  <option
                    v-for="(document, index) in documentsArr"
                    :key="index"
                    :value="document.id"
                  >
                    {{ document.name }}
                  </option>
                </select>
                <small
                  v-if="errors.document_type_id"
                  class="text-weight-bold text-red"
                >
                  {{ errors.document_type_id[0] }}
                </small>
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Document number <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.document_number"
                  placeholder="288282"
                  required
                  type="text"
                />
              </div>
              <small
                v-if="errors.document_number"
                class="text-weight-bold text-red"
              >
                {{ errors.document_number[0] }}
              </small>
            </div>
          </div>
          <div class="auth_grid">
            <div class="input_wrap q-sel">
              <label for=""> Birth Country <span>*</span></label>
              <div class="input">
                <q-select
                  v-model="data.birth_country"
                  use-input
                  @filter="filterFn"
                  behavior="dialog"
                  :options="countriesArr"
                  class="multi_select"
                  label="Select from the list of countiries"
                  style="width: 100%"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template></q-select
                >
              </div>
              <small
                v-if="errors.birth_country"
                class="text-weight-bold text-red"
              >
                {{ errors.birth_country[0] }}
              </small>
            </div>
            <div class="input_wrap q-sel">
              <label for=""> Citizenship Country <span>*</span></label>
              <div class="input">
                <q-select
                  v-model="data.citizenship_country"
                  use-input
                  @filter="filterFn"
                  behavior="dialog"
                  :options="countriesArr"
                  class="multi_select"
                  label="Select from the list of countiries"
                  style="width: 100%"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template></q-select
                >
              </div>
              <small
                v-if="errors.citizenship_country"
                class="text-weight-bold text-red"
              >
                {{ errors.citizenship_country[0] }}
              </small>
            </div>
          </div>
          <div class="auth_grid">
            <div class="input_wrap">
              <label for="">Document expiry date <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.document_expiry_date"
                  placeholder="10/04/2026"
                  required
                  type="date"
                />
              </div>
              <small
                v-if="errors.document_expiry_date"
                class="text-weight-bold text-red"
              >
                {{ errors.document_expiry_date[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for="">Birth date <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.birth_date"
                  placeholder="10/01/1990"
                  required
                  type="date"
                />
              </div>
              <small v-if="errors.birth_date" class="text-weight-bold text-red">
                {{ errors.birth_date[0] }}
              </small>
            </div>
          </div>

          <div class="input_wrap">
            <label for="">Address <span>*</span></label>
            <div class="input">
              <textarea
                placeholder="Address"
                v-model="data.address"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <small v-if="errors.address" class="text-weight-bold text-red">
              {{ errors.address[0] }}
            </small>
          </div>

          <div class="row justify-end q-mt-lg">
            <q-btn
              color="primary"
              class="q-px-xl q-py-sm"
              rounded
              :loading="loading"
              no-wrap
              no-caps
              type="submit"
            >
              Initialize verification
            </q-btn>
          </div>
        </form>
        <div v-else style="gap: 1rem" class="input">
          <p class="text-weight-bold">Upload documents</p>
          <div style="grid-template-columns: 1fr 1fr" class="grid">
            <q-file
              @update:model-value="setFileFront"
              accept=".png,.jpeg,.jpg,.pdf"
              class="column profile_field justify-center items-center"
              v-model="kycFileFront"
              max-file-size="2097152"
              @rejected="onRejected"
            >
              <div class="img q-mb-sm">
                <img src="../assets/upload.svg" alt="" />
              </div>
              <div class="smallText">Upload front-page KYC</div>
            </q-file>
            <!-- {{ chosenDocument }} -->
            <q-file
              v-if="chosenDocument[0]?.double_sided"
              @update:model-value="setFileBack"
              accept=".png,.jpeg,.jpg,.pdf"
              class="column profile_field justify-center items-center"
              v-model="kycFileBack"
              max-file-size="2097152"
              @rejected="onRejected"
            >
              <div class="img q-mb-sm">
                <img src="../assets/upload.svg" alt="" />
              </div>
              <div class="smallText">Upload back-page KYC</div>
            </q-file>
          </div>
        </div>
      </div>
    </div>
    <FooterCompVue />
  </q-page>
</template>

<script setup>
import { Dialog, Loading, Notify, QSpinnerOval } from "quasar";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
let store = useMyAuthStore();
let kycFileFront = ref(null);
let kycFileBack = ref(null);
let kycFileFrontPreview = ref(null);
let kycFileBackPreview = ref(null);
let loading = ref(false);
let showUploadKycInput = ref(false);
let hideForm = ref(true);
let countriesArr = ref([]);
let documentsArr = ref([]);
let chosenDocument = ref({});
let verificationData = ref({});
let data = ref({});
let errors = ref({});
let countriesBaseArr = [];

const setFileBack = (props) => {
  kycFileBack.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    kycFileBackPreview.value = e.target.result;
  };
  reader.readAsDataURL(props);

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading back kyc file...",
  });
  authAxios
    .post(
      `auth/kyc/file/upload`,
      {
        file_side: "back",
        kyc_verification_id: verificationData.value.id
          ? verificationData.value.id
          : 1,
        kyc_file: kycFileBack.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });

      Loading.hide();
      Dialog.create({
        title: "Successful",
        message: `You have successfully uploaded the back part of your KYC`,
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          router.replace({
            name: "success.page",
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    })
    .catch(({ response }) => {
      // console.log(response);

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
const setFileFront = (props) => {
  kycFileFront.value = props;

  var reader = new FileReader();
  reader.onload = (e) => {
    kycFileFrontPreview.value = e.target.result;
  };
  reader.readAsDataURL(props);

  Loading.show({
    spinner: QSpinnerOval,
    message: "Uploading front kyc file...",
  });
  authAxios
    .post(
      `auth/kyc/file/upload`,
      {
        file_side: "front",
        kyc_verification_id: verificationData.value.id
          ? verificationData.value.id
          : 1,
        kyc_file: kycFileFront.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);

      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });

      Loading.hide();
      Dialog.create({
        title: "Successful",
        message: `You have successfully uploaded the front part of your KYC`,
        cancel: true,
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
      // console.log(response);

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

const filterFn = (val, update, abort) => {
  if (val === "") {
    update(() => {
      countriesArr.value = countriesBaseArr;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    // console.log(val);
    countriesArr.value = countriesBaseArr.filter(
      (v) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
};
const onRejected = () => {
  Notify.create({
    type: "negative",
    position: "top",
    message: `Your upload size should be less than 2mb `,
  });
};
const getDocumentType = () => {
  let documentChosen = documentsArr.value.filter(
    (doc) => doc.id === data.value.document_type_id
  );
  chosenDocument.value = documentChosen;
  // console.log(documentChosen);
};
const initializeKycVerification = () => {
  let dataToSend = {
    ...data.value,
    birth_country: data.value.birth_country.value,
    citizenship_country: data.value.citizenship_country.value,
  };
  loading.value = true;
  Loading.show();
  authAxios
    .post(
      "auth/kyc/verification/initialize",
      {
        ...dataToSend,
      }
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    )
    .then((response) => {
      console.log(response);
      hideForm.value = !hideForm.value;
      Loading.hide();
      loading.value = false;
      verificationData.value = response.data.data;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });

      document
        .getElementById("landingpage")
        .scrollIntoView({ behavior: "smooth" });
    })
    .catch(({ response }) => {
      // console.log(response);
      Loading.hide();
      loading.value = false;

      errors.value = response.data.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
onMounted(async () => {
  try {
    // data.value.fullname =
    //   store.userdetails.firstname + store.userdetails.lastname;
    let countriesResp = await authAxios.get("country/list");
    let documentTouse = await authAxios.get("auth/document-types");
    // console.log(documentTouse);
    documentsArr.value = documentTouse.data.data;
    countriesBaseArr = countriesResp.data.data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((country) => ({
        ...country,
        label: country.name,
        value: country.id,
      }));
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
}
</style>
