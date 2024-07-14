<template>
  <div>
    <div class="small_container q-py-xl">
      <h4 class="biggerText text-center">Create your business account</h4>
      <p class="text-center mediumText">ID/Business Verification</p>

      <div class="auth">
        <form @submit.prevent="submitForm">
          <div class="input_wrap">
            <label for="">First Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.firstname"
                placeholder="Enter first name"
                required
                type="text"
              />
            </div>
            <small v-if="errors.firstname" class="text-red text-weight-bold">
              {{ errors.firstname[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">Last Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.lastname"
                placeholder="Enter last name"
                required
                type="text"
              />
            </div>
            <small v-if="errors.lastname" class="text-red text-weight-bold">
              {{ errors.lastname[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">Company Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.business_name"
                placeholder="Enter business name"
                required
                type="text"
              />
            </div>
            <small
              v-if="errors.business_name"
              class="text-red text-weight-bold"
            >
              {{ errors.business_name[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">Company Email<span>*</span></label>
            <div class="input">
              <input
                v-model="data.email"
                placeholder="Enter company email"
                required
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
                      <option value="+234">+234</option>
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
            <label for="">Website<span>*</span></label>
            <div class="input">
              <input
                v-model="data.website"
                required
                placeholder="Enter website address"
                type="text"
              />
            </div>
            <small v-if="errors.address" class="text-red text-weight-bold">
              {{ errors.address[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">CAC registration number<span>*</span></label>
            <div class="input">
              <input
                v-model="data.cac_number"
                required
                placeholder="Enter CAC number eg RC-939293, BN-9392993, IT-4838838"
                type="text"
              />
            </div>
            <small v-if="errors.cac_number" class="text-red text-weight-bold">
              {{ errors.cac_number[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">Address<span>*</span></label>
            <div class="input">
              <input
                v-model="data.address"
                required
                placeholder="Enter address"
                type="text"
              />
            </div>
          </div>
          <div class="password">
            <div class="input_wrap">
              <label for="">Password<span>*</span></label>
              <div class="rules">
                <p>Minimum of 8 characters</p>
                <p>At least one numeric character is requried</p>
                <p>A special character is required</p>
                <p>An uppercase and lowercase character is required</p>
              </div>
              <div class="input row justify-between no-wrap">
                <input
                  v-model="data.password"
                  required
                  :type="!viewPassword ? 'password' : 'text'"
                />
                <q-btn
                  @click="viewPassword = !viewPassword"
                  flat
                  icon="visibility"
                >
                </q-btn>
              </div>
            </div>
          </div>
          <div class="password">
            <div class="input_wrap">
              <label for="">Confirm Password<span>*</span></label>
              <div class="input row justify-between no-wrap">
                <input
                  v-model="data.confirm_password"
                  required
                  :type="!viewConfirmPassword ? 'password' : 'text'"
                />
                <q-btn
                  @click="viewConfirmPassword = !viewConfirmPassword"
                  flat
                  icon="visibility"
                >
                </q-btn>
              </div>
            </div>
          </div>

          <div class="row justify-end q-mt-lg">
            <q-btn
              :loading="loading"
              color="primary"
              rounded
              no-wrap
              no-caps
              type="submit"
            >
              Submit
            </q-btn>
          </div>
        </form>

        <p class="text-h6 text-center q-mt-lg">
          Do you already have an account?
          <router-link
            :to="{
              name: 'merchant.login',
            }"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
  <q-dialog class="dialog" persistent v-model="verifyModal">
    <div class="auth">
      <q-card class="billing">
        <div class="text-center q-mb-lg">
          <div class="bigMediumText">Enter your security code.</div>
          <div class="smallText q-mt-sm text-center">
            Please kindly enter the OTP code we sent to <br />
            your phone <small class="text-green-9">{{ data.phone }}</small>
            <!-- <span class="text5"> {{ data.email }} </span> -->
          </div>
          <div class="smallText text-center text-red-7 q-my-sm">
            Please stay on this page, the OTP could take sometime to come...
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
            @click="resendPhone"
            flat
            v-if="!resending"
            no-caps
            style="padding: 0; text-decoration: underline"
          >
            Click to resend.
          </q-btn>
          <p v-else><q-spinner-tail color="primary" size="2em" /> Resending</p>
          <!-- <q-btn
            @click="toggleVerifyModal"
            flat
            no-caps
            style="padding: 0; text-decoration: underline"
          >
           Verify Email
          </q-btn> -->
        </div>

        <div
          style="gap: 0.5rem"
          class="total no-wrap row justify-between q-mt-md items-center"
        >
          <q-btn
            @click="skipProcess"
            class="act_btn cancel full-width"
            no-caps
            flat
          >
            Skip
          </q-btn>
          <q-btn
            @click="Verify"
            class="apply bg-primary full-width"
            no-caps
            :loading="loadingBtn"
            flat
            text-color="white"
          >
            Verify
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-dialog>
  <q-dialog persistent class="dialog" v-model="verifyEmailModal">
    <div class="auth">
      <q-card class="billing">
        <div class="text-center q-mb-lg">
          <div class="bigMediumText">Enter your security code.</div>
          <div class="smallText q-mt-sm text-center">
            Please kindly enter the OTP code we sent to <br />
            your email <small class="text-green-9">{{ data.email }}</small>
            <!-- <span class="text5"> {{ data.email }} </span> -->
          </div>
          <div class="smallText text-red-7 text-center q-my-sm">
            Please stay on this page, the OTP could take sometime to come
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
          <!-- <q-btn
            @click="toggleVerifyModal"
            flat
            no-caps
            style="padding: 0; text-decoration: underline"
          >
           Verify Email
          </q-btn> -->
        </div>

        <div
          style="gap: 0.5rem"
          class="total no-wrap row justify-between q-mt-md items-center"
        >
          <q-btn
            @click="skipProcess"
            class="act_btn cancel full-width"
            no-caps
            flat
          >
            Skip
          </q-btn>
          <q-btn
            @click="VerifyEmail"
            class="apply bg-primary full-width"
            no-caps
            :loading="loadingBtn"
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
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

let router = useRouter();
import { ref } from "vue";
let data = ref({
  type: "business",
});
let errors = ref({});
let country_code = ref("+234");
let viewPassword = ref(false);
let viewConfirmPassword = ref(false);
let loading = ref(false);
let loadingBtn = ref(false);
let verifyModal = ref(false);
let code = ref("");
const bindModal = ref("");
const bindEmailModal = ref("");
const verifyEmailModal = ref(false);
const resending = ref(false);
let store = useMyAuthStore();

const submitForm = () => {
  let newData = {
    ...data.value,
    // type: router.currentRoute.value.query.type,
    phone: country_code.value + data.value.phone,
  };
  console.log(newData);
  loading.value = true;
  authAxios
    .post("merchant/signup", newData)
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      store.setUserDetails(response);
      loading.value = false;
      verifyModal.value = true;
      // data.value = {};
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
      errors.value = response.data.data.errors || {};
      Notify.create({
        message: response.data.message
          ? response.data.message
          : "Recheck your credentials",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
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
  console.log("OTP changedj: ", value);
};
const toggleVerifyModal = () => {
  if (verifyModal.value) {
    verifyModal.value = false;
    verifyEmailModal.value = true;
  }
  {
    verifyModal.value = true;
    verifyEmailModal.value = false;
  }
};

const Verify = () => {
  let dataReg = {
    code: code.value,
    // email: data.value.email,
    type: "phone",
  };
  loadingBtn.value = true;
  authAxios
    .post("auth/phone/verify", dataReg)
    .then((response) => {
      // console.log(response);
      loadingBtn.value = false;
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
      loadingBtn.value = false;
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
    .post("auth/email/verify", dataReg)
    .then((response) => {
      console.log(response);
      loadingBtn.value = false;
      verifyModal.value = false;
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      verifyEmailModal.value = false;

      // store.setUserDetails(response);

      router.replace({
        name: "kyc",
      });
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
const skipProcess = () => {
  router.replace({
    name: "kyc",
  });
};
const resend = () => {
  let dataReg = {
    email: data.value.email,
  };
  loadingBtn.value = true;
  authAxios
    .post("auth/email/resend-code", dataReg)
    .then((response) => {
      // console.log(response);
      Notify.create({
        message: "Code Resent",
        color: "green",
        position: "top",
      });
      loadingBtn.value = false;
      // verifyModal.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loadingBtn.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const resendPhone = () => {
  // let dataReg = {
  //   email: data.value.email,
  // };
  loadingBtn.value = true;
  authAxios
    .post("auth/phone/resend-code")
    .then((response) => {
      // console.log(response);
      Notify.create({
        message: "Code Resent",
        color: "green",
        position: "top",
      });
      loadingBtn.value = false;
      // verifyModal.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loadingBtn.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
</script>

<style lang="scss" scoped></style>
