<template>
  <div>
    <div style="max-width: 700px" class="small_container q-py-xl">
      <div class="frame row justify-center">
        <img
          style="width: 40px; height: 40px"
          src="../../assets/frame.png"
          alt=""
        />
      </div>

      <h4 class="biggerText text-center">Welcome Back</h4>
      <p class="text-center mediumText">
        Input your correct details to login to your store
      </p>

      <div class="auth">
        <form @submit.prevent="submitForm">
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

              <small v-if="errors.password" class="text-red text-weight-bold">
                {{ errors.password[0] }}
              </small>
            </div>
          </div>

          <div class="row justify-end q-mt-lg">
            <q-btn
              style="width: 100%"
              color="primary"
              rounded
              class="q-pa-md"
              no-wrap
              no-caps
              :loading="loading"
              type="submit"
            >
              Submit
            </q-btn>
          </div>

          <p class="text-h6 text-center q-mt-lg">
            Don't have an account?
            <router-link
              :to="{
                name: 'business.register',
              }"
            >
              Register
            </router-link>
          </p>
        </form>
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
            <!-- <span class="text5"> {{ data.email }} </span> -->
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
import { useRouter } from "vue-router";
let router = useRouter();
let data = ref({});
let errors = ref({});
let verifyModal = ref(false);
let verifyEmailModal = ref(false);
let code = ref("");
const bindModal = ref("");
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
      loading.value = false;
      data.value = {};
      if (response.data.data.roles[0].name === "merchant") {
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });

        store.setUserDetails(response.data);
        router.replace({
          name: "create.store",
          query: {
            create: "new",
          },
        });
        // getKycData();
      } else {
        Dialog.create({
          title: "Note",
          message: `You are a user please login from the user end`,
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            router.replace({
              name: "customer.login",
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
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
const getKycData = async () => {
  try {
    let kycData = await authAxios.get("auth/kyc/verification/info");
    console.log(kycData);
    loading.value = false;
    if (kycData.data.data === null) {
      router.replace({
        name: "kyc",
      });
    } else if (kycData.data.data.status === "pending") {
      router.replace({
        name: "success.page",
      });
    } else if (kycData.data.data.status === "rejected") {
      Dialog.create({
        title: "Note",
        message: `Your KYC document upload was rejected, proceed to upload new documents and continue`,
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          router.replace({
            name: "kyc",
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    } else {
      if (store.userdetails.type === "business" && store.userstores.length) {
        router.replace({
          name: "user.stores",
        });
      } else if (
        store.userdetails.type === "business" &&
        !store.userstores.length
      ) {
        router.replace({
          name: "all.set",
        });
      } else {
        router.replace({
          name: "dashboard",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
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
.small_container {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 2rem;
  border-radius: 10px;
  margin: 3rem auto;
}

@media (max-width: 700px) {
  .small_container {
    padding: 1rem;
  }
}
</style>
