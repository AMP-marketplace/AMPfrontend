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
                {{ store.userdetails?.fullname }}
                <!-- {{ store.userdetails?.lastname }} -->
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
      <q-skeleton v-if="!addressArr.length && loadingPage" height="150px" />
      <q-list v-else class="bg-white">
        <q-item
          class="q-my-sm bg-grey-2"
          v-for="(address, index) in addressArr"
          :key="index"
        >
          <q-item-section>
            <q-item-label
              >{{ address.first_name }} {{ address.last_name }}</q-item-label
            >
            <q-item-label caption lines="2">{{
              address.address_line_1
            }}</q-item-label>
            <q-item-label caption lines="2"
              >{{ address.city }}, {{ address.state }},
              {{ address.country }}.</q-item-label
            >
            <q-item-label caption lines="2">{{
              address.postal_code
            }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div style="gap: 1rem" class="row q-mt-md items-center no-wrap">
              <q-btn
                @click="setDefault(address)"
                no-caps
                no-wrap
                color="primary"
              >
                Set Default
              </q-btn>
              <q-btn
                @click="deleteAddress(address)"
                no-caps
                no-wrap
                color="red-7"
              >
                <i class="fa-solid fa-trash"></i>
              </q-btn>
            </div>
          </q-item-section>
          <q-badge v-if="address.is_default" color="blue" floating>
            Default
          </q-badge>
        </q-item>

        <!-- <q-separator v-if="addressArr.length" spaced inset /> -->
      </q-list>

      <div
        v-if="!addressArr.length && !loadingPage"
        class="column items-center text-center justify-center"
      >
        <img style="width: 150px" src="/images/box.png" alt="" />
        <p class="q-mt-sm">You have not checked out with any addresses yet</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Dialog, Loading, QSpinnerOval } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
let store = useMyAuthStore();

let loading = ref(false);
let loadingPage = ref(true);
let addressArr = ref([]);

const setDefault = (address) => {
  Loading.show({
    spinner: QSpinnerOval,
    message: "Setting Default...",
  });
  authAxios
    .post(`shipping/address/default/${address.id}`)
    .then(({ data }) => {
      console.log(data);
      onRequest();
      Loading.hide();
    })
    .catch(({ response }) => {
      loading.value = false;
      Loading.hide();
    });
};
const deleteAddress = (address) => {
  Dialog.create({
    title: "Delete",
    message: `Are you sure you want to delete this address`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerOval,
        message: "Deleting...",
      });
      authAxios
        .delete(`shipping/address/delete/${address.id}`)
        .then(({ data }) => {
          console.log(data);
          onRequest();
          Loading.hide();
        })
        .catch(({ response }) => {
          loading.value = false;
          Loading.hide();
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
const onRequest = () => {
  loading.value = true;
  authAxios
    .get(`shipping/address/index`)
    .then(({ data }) => {
      console.log(data);
      addressArr.value = data.data;
      loading.value = false;
      loadingPage.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};

onMounted(() => {
  onRequest();
});
</script>

<style lang="scss" scoped></style>
