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
      <p class="text-center mediumText">Lets verify your mail</p>

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

          <p v-if="store.token" class="text-h6 text-center q-mt-lg">
            <q-btn
              no-wrap
              no-caps
              color="green-7"
              :to="{
                name:
                  store.role === 'merchant' ? 'account.dashboard' : 'dashboard',
              }"
            >
              Go back to dashboard
            </q-btn>
          </p>
        </form>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { Dialog, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";
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
    .get("request/mail/verification", newData)
    .then((response) => {
      console.log(response);
      loading.value = false;
      Dialog.create({
        title: "Successful",
        message: `We have sent some instructions to your mail enable you continue, please check your mail ${data.value.email}. By clicking 'Ok' we would take you back to your dashboard`,
        persistent: true,
      })
        .onOk(() => {
          data.value = {};
          router.replace({
            name: store.role === "merchant" ? "account.dashboard" : "dashboard",
          });
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

onMounted(() => {
  data.value.email = store.userdetails.email;
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
