<template>
  <q-page class=" ">
    <div>
      <StepHeader
        title=" Create an account"
        subtitle="One more step before starting your free trial"
      />
      <div class="flex flex-col gap-3 items-center my-10 mx-10 md:mx-0 justify-center">
        <q-btn
          class="bg-gray-100 w-full px-5 md:w-1/3 py-4"
          icon="mail"
          label="Sign up with email"
        ></q-btn>
        <q-btn
          class="bg-gray-100 w-full px-5 md:w-1/3 py-4"
          icon="fa-brands fa-apple"
          label="Sign up with Apple"
        ></q-btn>
        <q-btn
          class="bg-gray-100 w-full px-5 md:w-1/3 py-4"
          icon="fa-brands fa-facebook"
          label="Sign up with Facebook"
        ></q-btn>
        <q-btn
          class="bg-gray-100 w-full px-5 md:w-1/3 py-4"
          icon="fa-brands fa-google"
          label="Sign up with Google"
        ></q-btn>
      </div>
      <div class="flex items-center justify-center">
        <hr class="border-t w-44 border-gray-300" />
        <p>or</p>
        <hr class="w-44 border-t border-gray-300" />
      </div>
      <div class="flex items-center justify-center">
        <p>Already have an account?</p>
        <q-btn icon-right="arrow_forward" to="/login" class="text-blue-700">
          Login
        </q-btn>
      </div>
    </div>
    <div class="text-center my-10">
      <p>
        By proceeding, you agree to the <b> Terms and Conditions </b> and
        <b>Privacy Policy </b>
      </p>
    </div>
  </q-page>
</template>

<script setup>
import StepHeader from "./StepHeader.vue";
</script>

<style lang="scss" scoped></style>
