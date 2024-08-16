<template>
  <div>
    <div class="small_container q-py-xl">
      <h4 class="biggerText text-center">Create an account</h4>
      <!-- <p class="text-center mediumText">ID/Business Verification</p> -->

      <div class="auth">
        <form @submit.prevent="submitForm">
          <div class="input_wrap">
            <label for="">First Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.first_name"
                placeholder="Enter first name"
                required
                name="firstname"
                type="text"
              />
            </div>
            <small v-if="errors.first_name" class="text-red text-weight-bold">
              {{ errors.first_name[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">Last Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.last_name"
                placeholder="Enter last name"
                required
                name="lastname"
                type="text"
              />
            </div>
            <small v-if="errors.last_name" class="text-red text-weight-bold">
              {{ errors.last_name[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for=""> Email<span>*</span></label>
            <div class="input">
              <input
                v-model="data.email"
                placeholder="Enter email"
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
                    name="phone"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <small v-if="errors.phone" class="text-red text-weight-bold">
              {{ errors.phone[0] }}
            </small>
          </div>

          <div class="password">
            <div class="input_wrap">
              <label for="">Password<span>*</span></label>
              <div class="rules">
                <p v-for="(requirement, index) in requirements" :key="index">
                  <span
                    :class="requirement.met ? 'icon-check' : 'icon-cancel'"
                  ></span>
                  {{ requirement.text }}
                </p>
                <!-- <p>Minimum of 8 characters</p>
                <p>At least one numeric character is requried</p>
                <p>A special character is required</p>
                <p>An uppercase and lowercase character is required</p> -->
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
              name: 'customer.login',
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
            Please stay on this page
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
            Please stay on this page
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
  <FooterCompVue />
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";
import countries from "../../../../countries";
let router = useRouter();
import { ref, watch } from "vue";
import FooterCompVue from "src/components/FooterComp.vue";
let data = ref({ password: "" });
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
const formatPhoneNumber = (phone) => {
  if (phone.startsWith("0")) {
    return phone.slice(1);
  } else {
    return phone;
  }
};

const requirements = ref([
  { text: "Minimum of 8 characters", met: false },
  { text: "At least one numeric character is required", met: false },
  { text: "A special character is required", met: false },
  { text: "An uppercase and lowercase character is required", met: false },
]);

const checkRequirements = (password) => {
  requirements.value[0].met = password?.length >= 8;
  requirements.value[1].met = /\d/.test(password);
  requirements.value[2].met = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  requirements.value[3].met = /[a-z]/.test(password) && /[A-Z]/.test(password);
};

// Watch for changes in the password and update requirements
watch(
  () => data.value.password,
  (newPassword) => {
    checkRequirements(newPassword);
  }
);
const submitForm = () => {
  let newData = {
    ...data.value,
    role_id: "2",
    // type: router.currentRoute.value.query.type,
    phone: country_code.value + formatPhoneNumber(data.value.phone),
  };
  console.log(newData);

  if (data.value.password !== data.value.confirm_password) {
    Notify.create({
      message: "Password does not match",
      color: "red",
      position: "top",
    });
  } else {
    loading.value = true;

    authAxios
      .post("register", newData)
      .then((response) => {
        console.log(response);
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });

        store.setUserDetails(response.data);
        loading.value = false;
        // verifyModal.value = true;

        data.value = {};
        router.replace({
          name: "dashboard",
        });
        // store.setToken(response.data);
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
  }
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
  loadingBtn.value = true;
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
        name: "all.set",
      });
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
const skipProcess = () => {
  router.replace({
    name: "dashboard",
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

<style lang="scss" scoped>
.small_container {
  background: #f5f9ff;
}

.icon-check::before {
  content: "✔"; /* You can replace this with an actual icon */
  color: green;
}

.icon-cancel::before {
  content: "✖"; /* You can replace this with an actual icon */
  color: red;
}
</style>
