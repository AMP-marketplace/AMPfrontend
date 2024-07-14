<template>
  <div class="container q-pt-xl">
    <div>
      <p class="mediumText q-pb-sm">Account Information</p>
      <q-separator />

      <div class="wrapp">
        <div class="grid">
          <div class="left">
            <img
              style="width: 128px; height: 128px; border-radius: 100%"
              src="../../assets/buyer.png"
              alt=""
            />
          </div>
          <div class="right">
            <p class="smallText">Contact Information</p>
            <div class="q-mt-sm">
              <p>
                {{ store.userdetails?.firstname }}
                {{ store.userdetails?.lastname }}
              </p>
              <p>{{ store.userdetails.email }}</p>
              <p>{{ store.userdetails.phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-xl">
      <p class="mediumText q-pb-sm">Address Book</p>
      <q-separator />

      <div v-if="store.userdetails?.address" class="wrapp">
        <div class="grid">
          <div class="left">
            <div class="right">
              <p class="smallText">Default Billing Address</p>
              <div class="q-mt-sm">
                <p>
                  <i class="fa-solid q-mr-sm fa-location-dot"></i
                  >{{ store.userdetails?.address }}
                </p>
                <!-- <p>example@gmail.com</p> -->
              </div>
            </div>
          </div>
          <div class="right">
            <!-- <p class="smallText">Default Billing Address</p>
            <div class="q-mt-sm">
              <p>You have not set a default billing address.</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { ref } from "vue";
let store = useMyAuthStore();
</script>

<style lang="scss" scoped></style>
