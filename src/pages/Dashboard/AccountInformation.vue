<template>
  <div class="q-pb-xl">
    <div class="top_modal">
      <h4 class="text1">Account Information</h4>
    </div>
    <!-- {{ bankDetails }} -->
    <q-separator class="q-mt-lg" />
    <div v-if="!bankDetails.account_name || editState" class="auth">
      <form @submit.prevent="addInfo">
        <div class="auth_grid">
          <!-- <div class="input_wrap">
            <label for="">Account Name <span>*</span></label>
            <div class="input">
              <input
                v-model="data.account_name"
                placeholder="Enter account name"
                required
                type="text"
              />
            </div>
            <small v-if="errors.account_name" class="text-weight-bold text-red">
              {{ errors.account_name[0] }}
            </small>
          </div> -->
          <div class="input_wrap">
            <label for="">Choose Bank <span>*</span></label>
            <div class="input">
              <select v-model="data.bank_id">
                <option
                  v-for="(bank, index) in bankListArr"
                  :key="index"
                  :value="bank.id"
                >
                  {{ bank.name }}
                </option>
              </select>
            </div>
            <small v-if="errors.bank_id" class="text-weight-bold text-red">
              {{ errors.bank_id[0] }}
            </small>
          </div>

          <div class="input_wrap">
            <label for="">Account Number <span>*</span></label>
            <div class="input">
              <input
                v-model="data.account_number"
                placeholder="Enter account number"
                required
                type="text"
              />
            </div>
            <small
              v-if="errors.account_number"
              class="text-weight-bold text-red"
            >
              {{ errors.account_number[0] }}
            </small>
          </div>
        </div>

        <div style="gap: 1rem" class="row items-center justify-end q-mt-lg">
          <q-btn
            v-if="editState"
            @click="toggleCancelEdit"
            no-caps
            no-wrap
            rounded
            color="grey-10"
            >Cancel</q-btn
          >
          <q-btn
            color="primary"
            class="q-px-xl q-py-sm"
            rounded
            no-wrap
            no-caps
            type="submit"
          >
            {{ editState ? "Update" : "Add Bank Data" }}
          </q-btn>
        </div>
      </form>
    </div>

    <div v-else>
      <div class="row q-mt-md justify-end">
        <q-btn @click="toggleEdit" no-caps no-wrap color="primary"
          >Edit Data</q-btn
        >
      </div>

      <p class="mediumText">
        Account Name:
        <span style="font-weight: 400">{{ bankDetails.account_name }}</span>
      </p>
      <p class="mediumText q-mt-sm">
        Account Number:
        <span style="font-weight: 400">{{ bankDetails.account_number }}</span>
      </p>
      <p class="mediumText q-mt-sm">
        Bank:
        <span style="font-weight: 400">{{ bankDetails?.bank_name }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { Loading, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";

let data = ref({});
let bankDetails = ref({});
let errors = ref({});
let editState = ref(false);
let bankListArr = ref([]);

const toggleEdit = () => {
  data.value = {
    ...bankDetails.value,
  };

  editState.value = !editState.value;
};
const toggleCancelEdit = () => {
  editState.value = !editState.value;
};
const update = () => {};

const addInfo = () => {
  let dataToSend = {
    ...data.value,
  };
  if (editState.value) {
    Loading.show();
    authAxios
      .post("auth/bank/save-account", {
        ...dataToSend,
      })
      .then((response) => {
        console.log(response);
        editState.value = !editState.value;
        bankDetails.value = response.data.data;
        Loading.hide();
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
      })
      .catch(({ response }) => {
        Loading.hide();
        errors.value = response.data.data.errors;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  } else {
    Loading.show();
    authAxios
      .post("auth/bank/save-account", {
        ...dataToSend,
      })
      .then((response) => {
        console.log(response);
        bankDetails.value = response.data.data;
        Loading.hide();
        Notify.create({
          message: response.data.message,
          color: "green",
          position: "top",
        });
      })
      .catch(({ response }) => {
        Loading.hide();
        errors.value = response.data.data.errors;
        Notify.create({
          message: response.data.message,
          color: "red",
          position: "top",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  }
};

const getInfo = async () => {
  try {
    Loading.show();
    let accountInfo = await authAxios.get("auth/bank/details");
    let bankList = await authAxios.get("banks/list");

    console.log(accountInfo);
    console.log(bankList);
    bankDetails.value =
      accountInfo.data.data === null ? {} : accountInfo.data.data;
    bankListArr.value = bankList.data.data;
    Loading.hide();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getInfo();
});
</script>

<style lang="scss" scoped></style>
