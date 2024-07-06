<template>
   <q-page>
    <div>
    <StepHeader title="Log in" subtitle="Continue to your account" />
    <div class="flex flex-col mx-10 md:mx-0 gap-3 items-center my-10 justify-center">
        <q-input
          v-model="email"
          borderless
          label="Email"
          class="md:w-1/3 w-full border px-3 rounded-lg  "
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-btn class="bg-blue-800 rounded-lg text-white px-5 w-full md:w-1/3 py-4"> Continue with email </q-btn>

        
      </div>
      <div class="flex items-center justify-center">
        <hr class="border-t w-44 border-gray-300" />
        <p>or</p>
        <hr class="w-44 border-t border-gray-300" />
      </div>
      <div class="flex items-center justify-center gap-5 my-6">
        <q-btn class=" bg-gray-200 px-6 py-3"  icon="fa-brands fa-apple"/>
        <q-btn class=" bg-gray-200 px-6 py-3"  icon="fa-brands fa-facebook"/>
        <q-btn class=" bg-gray-200 px-6 py-3"  icon="fa-brands fa-google"/>
        
      </div>
      <div class="flex items-center justify-center">
        <p>New here?</p>
        <q-btn icon-right="arrow_forward" to="/sign-up" class="text-blue-700">
            Get Started
        </q-btn>
      </div>
      <div class="text-center my-10">
        <p>
          By proceeding, you agree to the <b> Terms and Conditions </b> and
          <b>Privacy Policy </b>
        </p>
      </div>
    </div>
   </q-page>
</template>

<script setup>
import StepHeader from "./StepHeader.vue"

</script>

<style lang="scss" scoped>

</style>