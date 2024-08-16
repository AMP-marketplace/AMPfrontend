<template>
  <div class="merchant">
    <div class="auth_grid">
      <div class="left">
        <img
          style="height: 100%; object-fit: cover"
          src="../../../assets/man_smile.png"
          alt=""
        />
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
        <p class="text-body1 text-center">
          Customer already have an account?
          <router-link
            :to="{
              name: 'customer.login',
            }"
            class="text-primary text-weight-bold"
          >
            Login
          </router-link>
        </p>
        <p class="text-body1 text-center">
          Business already have an account?
          <router-link
            :to="{
              name: 'merchant.login',
            }"
            class="text-primary text-weight-bold"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
</script>

<style lang="scss" scoped></style>
