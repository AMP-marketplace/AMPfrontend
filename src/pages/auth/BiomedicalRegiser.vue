<template>
  <div>
    <div class="container q-py-xl">
      <div class="grid">
        <div class="left">
          <h4 class="text1">Register Now</h4>
          <p class="mediumText">Fill in the details below to get started.</p>

          <div class="auth">
            <form @submit.prevent="submitForm">
              <div class="input_wrap">
                <label for="">Type<span>*</span></label>
                <div class="input">
                  <select v-model="data.type">
                    <option value="company">Company</option>
                    <option value="biomedical_engineer">
                      Biomedical Engineer
                    </option>
                  </select>
                </div>
                <small v-if="errors.type" class="text-red text-weight-bold">
                  {{ errors.type[0] }}
                </small>
              </div>
              <div class="input_wrap">
                <label for="">Fullname<span>*</span></label>
                <div class="input">
                  <input
                    v-model="data.fullname"
                    placeholder="Enter your name"
                    required
                    name="name"
                    type="text"
                  />
                </div>
                <small v-if="errors.fullname" class="text-red text-weight-bold">
                  {{ errors.fullname[0] }}
                </small>
              </div>
              <div class="input_wrap">
                <label for="">Email<span>*</span></label>
                <div class="input">
                  <input
                    v-model="data.email"
                    placeholder="Enter email address"
                    required
                    name="email"
                    type="email"
                  />
                </div>
                <small v-if="errors.email" class="text-red text-weight-bold">
                  {{ errors.email[0] }}
                </small>
              </div>
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
                <label for="">NIN<span>*</span></label>
                <div class="input">
                  <input
                    v-model="data.nin"
                    placeholder="Enter NIN or your national identification"
                    required
                    name="nin"
                    type="text"
                  />
                </div>
                <small v-if="errors.nin" class="text-red text-weight-bold">
                  {{ errors.nin[0] }}
                </small>
              </div>
              <div class="input_wrap">
                <label for=""
                  >Certificate of License from Authorized bodies eg COREN<span
                    >*</span
                  ></label
                >
                <div class="input">
                  <q-file outlined v-model="data.certificate">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
                <small
                  v-if="errors.certificate"
                  class="text-red text-weight-bold"
                >
                  {{ errors.certificate[0] }}
                </small>
              </div>

              <div class="password">
                <div class="input_wrap">
                  <label for=""> Password<span>*</span></label>
                  <div class="input row items-center no-wrap justify-between">
                    <input
                      v-model="data.password"
                      required
                      placeholder="*********"
                      :type="!viewConfirmPassword ? 'password' : 'text'"
                    />
                    <q-btn
                      @click="viewConfirmPassword = !viewConfirmPassword"
                      flat
                      icon="visibility"
                    >
                    </q-btn>
                  </div>

                  <small
                    v-if="errors.password"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.password[0] }}
                  </small>
                </div>
              </div>
              <div class="password">
                <div class="input_wrap">
                  <label for=""> Confirm Password<span>*</span></label>
                  <div class="input row items-center no-wrap justify-between">
                    <input
                      v-model="data.confirm_password"
                      required
                      placeholder="*********"
                      :type="!viewConfirmPassword ? 'password' : 'text'"
                    />
                    <q-btn
                      @click="viewConfirmPassword = !viewConfirmPassword"
                      flat
                      icon="visibility"
                    >
                    </q-btn>
                  </div>

                  <small
                    v-if="errors.confirm_password"
                    class="text-red text-weight-bold"
                  >
                    {{ errors.confirm_password[0] }}
                  </small>
                </div>
              </div>
              <div class="row justify-end">
                <router-link
                  class="text-weight-bold"
                  :to="{ name: 'forgot.password' }"
                >
                  Forgot password
                </router-link>
              </div>
              <div class="row justify-end q-mt-lg">
                <q-btn
                  style="width: 100%"
                  color="primary"
                  rounded
                  disable
                  class="q-pa-sm"
                  no-wrap
                  no-caps
                  :loading="loading"
                  type="submit"
                >
                  Submit
                </q-btn>
              </div>
            </form>

            <p class="text-h6 text-center q-mt-lg">
              Already have an account?
              <router-link
                :to="{
                  name: 'biomedic.login',
                }"
              >
                Sign in
              </router-link>
            </p>
          </div>
        </div>

        <div class="right">
          <img class="" src="/images/biomedic1.jpg" alt="" />
          <img class="q-mt-lg" src="/images/biomedic.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />

  <q-dialog class="dialog" v-model="verifyModal">
    <div class="auth">
      <q-card class="billing">
        <div class="text-center q-mb-lg">
          <div class="bigMediumText">Enter your security code.</div>
          <div class="smallText q-mt-sm text-center">
            Please kindly enter the OTP code we sent to <br />
            your phone
          </div>
        </div>

        <div
          class="justify-center otp_wrap"
          style="display: flex; flex-direction: row; gap: 0.5rem"
        >
          <v-otp-input
            ref="otpInput"
            v-model:value="bindModal"
            input-classes="otp-input"
            separator=" "
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="number"
            :conditionalClass="['one', 'two', 'three', 'four']"
            :placeholder="['', '', '', '']"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>

        <div class="text2 text-center grey">
          Didn’t get a code?
          <q-btn
            @click="resend"
            flat
            v-if="!resending"
            no-caps
            style="padding: 0; text-decoration: underline"
          >
            Click to resend.
          </q-btn>
          <p v-else><q-spinner-tail color="primary" size="2em" /> Resending</p>
        </div>

        <div
          style="gap: 0.5rem"
          class="total no-wrap row justify-between q-mt-md items-center"
        >
          <q-btn
            @click="verifyModal = false"
            class="act_btn cancel full-width"
            no-caps
            flat
          >
            Cancel
          </q-btn>
          <q-btn
            @click="Verify"
            class="apply bg-primary full-width"
            no-caps
            :loading="loading"
            flat
            text-color="white"
          >
            Verify
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-dialog>
  <q-dialog class="dialog" v-model="verifyEmailModal">
    <div class="auth">
      <q-card class="billing">
        <div class="text-center q-mb-lg">
          <div class="bigMediumText">Enter your security code.</div>
          <div class="smallText q-mt-sm text-center">
            Please kindly enter the OTP code we sent to <br />
            your email
            <!-- <span class="text5"> {{ data.email }} </span> -->
          </div>
        </div>

        <div
          class="justify-center otp_wrap"
          style="display: flex; flex-direction: row; gap: 0.5rem"
        >
          <v-otp-input
            ref="otpInput"
            v-model:value="bindEmailModal"
            input-classes="otp-input"
            separator=" "
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="number"
            :conditionalClass="['one', 'two', 'three', 'four']"
            :placeholder="['', '', '', '']"
            @on-change="handleOnChange"
            @on-complete="handleOnCompleteEmailCode"
          />
        </div>

        <div class="text2 text-center grey">
          Didn’t get a code?
          <q-btn
            @click="resend"
            flat
            v-if="!resending"
            no-caps
            style="padding: 0; text-decoration: underline"
          >
            Click to resend.
          </q-btn>
          <p v-else><q-spinner-tail color="primary" size="2em" /> Resending</p>
        </div>

        <div
          style="gap: 0.5rem"
          class="total no-wrap row justify-between q-mt-md items-center"
        >
          <q-btn
            @click="verifyEmailModal = false"
            class="act_btn cancel full-width"
            no-caps
            flat
          >
            Cancel
          </q-btn>
          <q-btn
            @click="VerifyEmail"
            class="apply bg-primary full-width"
            no-caps
            :loading="loading"
            flat
            text-color="white"
          >
            Verify
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { Dialog, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute, useRouter } from "vue-router";
import countries from "app/countries";

let router = useRouter();
let route = useRoute();
let data = ref({});
let errors = ref({});
let verifyModal = ref(false);
let verifyEmailModal = ref(false);
let code = ref("");
const bindModal = ref("");
const country_code = ref("");
const bindEmailModal = ref("");
const resending = ref(false);
const viewConfirmPassword = ref(false);
const loading = ref(false);
let store = useMyAuthStore();

const submitForm = () => {
  let newData = {
    ...data.value,
  };
  console.log(newData);
  loading.value = true;
  authAxios
    .post("login", newData)
    .then((response) => {
      console.log(response);

      data.value = {};
      loading.value = false;
      if (response.data.data.user.roles[0].name === "shopper") {
        store.setUserDetails(response.data);
        if (route.query.redirect) {
          router.replace({
            name: route.query.redirect,
            query: {
              redirect: route.name,
              name: route.query.name,
              slug: route.query.slug,
              id: route.query.id,
            },
          });
        } else if (store.previousRoute) {
          router.push(store.previousRoute);
        } else {
          router.replace({ name: "dashboard" });
        }
      } else {
        Dialog.create({
          title: "Note",
          message: `You are a merchant please login from the merchant end`,
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            router.replace({
              name: "merchant.login",
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }

      // getKycData();
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
      errors.value = response.data.errors || {};
      Notify.create({
        message: response.data.message
          ? response.data.message
          : "Recheck your credentials",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });

      if (response.data.verification.type === "phone") {
        verifyModal.value = true;
      } else if (response.data.verification.type === "email") {
        verifyEmailModal.value = true;
      }
    });
};
const handleOnComplete = (value) => {
  console.log("OTP completed: ", value);
  code.value = value;
};
const handleOnCompleteEmailCode = (value) => {
  console.log("OTP completed: ", value);
  code.value = value;
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
};

const Verify = () => {
  let dataReg = {
    code: code.value,
    // email: data.value.email,
    type: "phone",
  };
  loading.value = true;
  authAxios
    .post("verification/verify", dataReg)
    .then((response) => {
      // console.log(response);
      loading.value = false;
      verifyModal.value = false;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      verifyEmailModal.value = true;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const VerifyEmail = () => {
  let dataReg = {
    code: code.value,
    // email: data.value.email,
    type: "email",
  };
  loading.value = true;
  authAxios
    .post("verification/verify", dataReg)
    .then((response) => {
      console.log(response);
      loading.value = false;
      verifyModal.value = false;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      verifyEmailModal.value = false;

      store.setUserDetails(response);
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const resend = () => {
  let dataReg = {
    email: data.value.email,
  };
  loading.value = true;
  authAxios
    .post("verification/code/resend", dataReg)
    .then((response) => {
      // console.log(response);
      Notify.create({
        message: "Code Resent",
        color: "green",
        position: "top",
      });
      loading.value = false;
      verifyModal.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
</script>

<style lang="scss" scoped>
.container {
  .grid {
    grid-template-columns: 1fr 1fr;
    .mediumText {
      font-weight: 300;
      line-height: 1.4;
      font-size: 14px;
    }
    & > div {
      background: #f5f9ff;
      padding: 2rem;
      border-radius: 10px;

      ul {
        padding-left: 1rem;
        li {
          list-style: disc;
          margin: 0.8rem 0;
        }
      }
    }

    .right {
      .q-btn {
        width: fit-content;
      }
    }
  }
}
.auth .input_wrap {
  margin: 0.5rem 0;
  .input {
    padding: 0.5rem;
  }
}
.auth {
  margin: 1rem auto 0;
}
@media (max-width: 700px) {
  .small_container {
    padding: 1rem;
  }
  .container {
    .grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
