<template>
  <q-page>
    <div class="tr container">
      <section class="section getstarted">
        <div class="login">
          <div class="login_wrapper">
            <div class="right">
              <div class="sign column text-center items-center">
                <img
                  style="width: 166px; height: 166px"
                  src="/images/setup.svg"
                  alt=""
                />
                <div class="head text-h4 text-weight-bold text-center q-my-md">
                  Setup Completed!
                </div>
                <p
                  style="max-width: 700px; margin: 0 auto"
                  class="text-center q-pa-sm"
                >
                  "Thank you for signing up to be one of the early users of
                  Buildadom. Our engineers are currently working to deliver our
                  full stack of features to you. In the mean time, a customer
                  support representative will contact you to let you know of
                  next steps. We can't wait to start doing business with you!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <FooterCompVue />
  </q-page>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
</script>

<style lang="scss" scoped></style>
