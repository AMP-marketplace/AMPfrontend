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

      <!-- <h4 class="biggerText text-center">Welcome Back</h4> -->
      <p class="text-center mediumText">Lets help you set your password</p>

      <div class="auth">
        <form @submit.prevent="submitForm">
          <div class="input_wrap">
            <label for="">OTP<span>*</span></label>
            <div class="input">
              <input
                v-model="data.token"
                placeholder="Enter OTP"
                required
                name="otp"
                type="text"
              />
            </div>
            <small v-if="errors.token" class="text-red text-weight-bold">
              {{ errors.token[0] }}
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
                  v-model="data.password_confirmation"
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
            Didn't get password reset mail?
            <q-btn @click="resendMail" no-wrap no-caps color="green">
              Resend
            </q-btn>
          </p>
        </form>
      </div>
    </div>
    <q-dialog v-model="successModal">
      <q-card class="q-pa-md">
        <h4 class="text-h5">
          Password change was successful!
          <i class="fa-solid text-green fa-check"></i>
        </h4>
        <p class="q-mt-md">You have successfully reset your password</p>

        <div
          style="gap: 1rem"
          class="row q-mt-lg items-center justify-end no-wrap"
        >
          <div
            style="gap: 1rem"
            class="row q-mt-lg items-center justify-end no-wrap"
            v-if="!store.token"
          >
            <q-btn
              :to="{ name: 'customer.login' }"
              color="primary"
              no-caps
              no-wrap
              >Continue to login as a user</q-btn
            >
            <q-btn
              :to="{ name: 'merchant.login' }"
              color="primary"
              no-caps
              no-wrap
              >Continue to login as a merchant</q-btn
            >
          </div>
          <q-btn
            v-else
            :to="{
              name:
                store.role === 'merchant' ? 'account.dashboard' : 'dashboard',
            }"
            no-caps
            color="primary"
            no-wrap
            >Continue to dashboard</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
  </div>
  <FooterCompVue />
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { Dialog, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref, watch } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute, useRouter } from "vue-router";
let route = useRoute();
let router = useRouter();
let data = ref({});
let errors = ref({});
let verifyModal = ref(false);
let verifyEmailModal = ref(false);
let viewPassword = ref(false);
let successModal = ref(false);
let code = ref("");
const bindModal = ref("");
const bindEmailModal = ref("");
const resending = ref(false);
const viewConfirmPassword = ref(false);
const loading = ref(false);
const resendLoading = ref(false);
let store = useMyAuthStore();

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
const resendMail = () => {
  resendLoading.value = true;
  authAxios
    .post("request/otp", newData)
    .then((response) => {
      console.log(response);
      resendLoading.value = false;

      Dialog.create({
        title: "Successful",
        message: `We have sent some password reset instructions to enable you reset your password`,
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
    });
};
const submitForm = () => {
  let newData = {
    ...data.value,
  };
  console.log(newData);

  if (data.value.password !== data.value.password_confirmation) {
    Notify.create({
      message: "Password does not match",
      color: "red",
      position: "top",
    });
  } else {
    loading.value = true;

    authAxios
      .post("postpassword", newData)
      .then((response) => {
        console.log(response);
        loading.value = false;
        data.value = {};
        successModal.value = true;
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
      });
  }
};

onMounted(() => {
  data.value.email = route.query.email;
});
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
