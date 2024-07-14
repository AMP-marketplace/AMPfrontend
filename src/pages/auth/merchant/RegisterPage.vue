<template>
  <div class="merchant">
    <div class="auth_grid">
      <div class="left">
        <img src="../../../assets/man_smile.png" alt="" />
      </div>

      <div class="right">
        <div class="frame">
          <img src="../../../assets/frame.png" alt="" />
        </div>
        <h4 class="biggerText">Welcome to Africa Medical Marketplace</h4>
        <p class="mediumText q-my-xs">
          Choose method of registration to proceed with creatng your account
          with us.
        </p>

        <div class="column">
          <q-btn
            :to="{
              name: 'individual.register',
              query: {
                type: 'individual',
              },
            }"
            no-wrap
            no-caps
            color="primary"
          >
            Register as a customer
          </q-btn>
          <q-btn
            :to="{
              name: 'business.register',
              query: {
                type: 'business',
              },
            }"
            no-wrap
            no-caps
            color="primary"
          >
            Register as a business
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
</script>

<style lang="scss" scoped></style>
