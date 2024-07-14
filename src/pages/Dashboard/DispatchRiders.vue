<template>
  <div class="container q-pb-xl">
    <div v-if="!rows.length" class="row justify-center">
      <div class="column items-center text-center justify-center">
        <img
          style="width: 308.001px; height: 204.304px"
          src="../../assets/rider.svg"
          alt=""
        />
        <p v-if="!rows.length" class="smallText text-center q-my-lg">
          You have not registered <br />
          a driver at this time.
        </p>

        <q-btn
          @click="addDriverModal = true"
          no-wrap
          no-caps
          rounded
          color="primary"
          >Add driver</q-btn
        >
      </div>
    </div>

    <div v-else class="auth">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <h4 class="bigMediumText">Dispatch Drivers</h4>
          <div>
            <q-btn
              @click="addDriverModal = true"
              no-wrap
              no-caps
              rounded
              color="primary"
              >Add driver</q-btn
            >
            <!-- <q-select
              outlined
              v-model="sortByModel"
              :options="sortByOptions"
              label="Sort by"
            /> -->
          </div>
        </div>
        <q-table
          :rows="rows"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="investor"
          :filter="filter"
          class="sort_tables"
          :loading="loading"
          v-model:pagination="pagination"
          @request="onRequest"
        >
          <template v-slot:body-cell-drivers_name="props">
            <q-td :props="props">
              <div style="gap: 1rem" class="row no-wrap items-center">
                <div>
                  <img
                    style="width: 40px; height: 40px; border-radius: 200px"
                    src="../../assets/box.png"
                    alt=""
                  />
                </div>
                <div>
                  <h6 class="smallText">{{ props.row.product }}</h6>
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="table_btn row items-center no-wrap">
                <q-btn
                  flat
                  no-wrap
                  no-caps
                  rounded
                  class="bg-red-2"
                  text-color="red-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Remove
                </q-btn>
              </div>
            </q-td>
          </template>
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-negative q-gutter-sm">
              <span> {{ message }} </span>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <q-dialog v-model="addDriverModal">
    <q-card style="min-width: 600px">
      <div class="top_modal row items-center justify-between">
        <h4 class="text1">Add Driver</h4>

        <q-btn @click="addDriverModal = false" flat rounded>
          <img src="../../assets/circle.svg" alt="" />
        </q-btn>
      </div>

      <q-separator class="q-mt-lg" />
      <form @submit.prevent="addRider">
        <div class="auth">
          <div class="auth_grid">
            <div class="input_wrap">
              <label for="">First Name <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.firstname"
                  placeholder="Enter first name"
                  required
                  type="text"
                />
              </div>
            </div>
            <div class="input_wrap">
              <label for="">Last Name <span>*</span></label>
              <div class="input">
                <input
                  v-model="data.lastname"
                  placeholder="Enter last name"
                  required
                  type="text"
                />
              </div>
            </div>
          </div>

          <div class="phone">
            <label for="">Drivers Phone Number<span>*</span></label>
            <div class="phone_wrap">
              <div class="country_select">
                <div class="input_wrap">
                  <div class="input">
                    <select v-model="country_code">
                      <option value="+234">+234</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="input_wrap">
                <div class="input">
                  <input
                    v-model="data.phone"
                    placeholder="Enter phone number"
                    required
                    type="text"
                  />
                </div>
              </div>
            </div>
            <small v-if="errors.phone" class="text-red text-weight-bold">
              {{ errors.phone[0] }}
            </small>
          </div>

          <div class="row justify-end q-mt-lg">
            <q-btn
              color="primary"
              class="q-px-xl q-py-sm"
              rounded
              no-wrap
              no-caps
              type="submit"
            >
              Add driver
            </q-btn>
          </div>
        </div>
      </form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Loading, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";

let errors = ref({});
let loading = ref(false);
let country_code = ref("+234");
let data = ref({
  location: "",
  productImage: null,
  attributes: [
    // {
    //   name: "",
    //   value: "",
    // },
  ],
});
let progress = ref(2);
let coverFile = ref(null);
let profileFile = ref(null);
let productImagePreview = ref("");
let profileFilePreview = ref("");
let coverFilePreview = ref("");
let addDriverModal = ref(false);

const columns = [
  {
    name: "firstname",
    required: true,
    label: "First Name",
    align: "left",
    field: "firstname",
    sortable: true,
  },
  {
    name: "lastname",
    required: true,
    label: "Last Name",
    align: "left",
    field: "lastname",
    sortable: true,
  },
  {
    name: "phone",
    required: true,
    label: "Phone number",
    align: "left",
    field: "phone",
    sortable: true,
  },

  {
    name: "actions",
    required: true,
    label: "",
    align: "left",
    field: (row) => row.driver,
    sortable: false,
  },
];

let pagination = ref({
  sortBy: "id",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
let filter = ref("");
let curl = ref("");
let separator = ref("");
let mode = ref("list");
let loaders = ref({
  delete: false,
  category: false,
  deleteBtn: [],
  save: [],
});
let rows = ref([]);

const onRequest = async () => {
  try {
    Loading.show();
    let prodList = await authAxios.get("merchant/driver/list");
    console.log(prodList);
    rows.value = prodList.data.data;
    Loading.hide();
  } catch (error) {
    console.error(error);
  }
};

const addRider = () => {
  let dataToSend = {
    ...data.value,
  };
  Loading.show();
  authAxios
    .post("merchant/driver/add", {
      ...dataToSend,
    })
    .then((response) => {
      console.log(response);
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      data.value = {};
      addDriverModal.value = false;
      onRequest();
    })
    .catch(({ response }) => {
      console.log(response);
      Loading.hide();
      // addDriverModal.value = false;

      errors.value = response.data.data.errors;
      Notify.create({
        message: response.data.message,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

onMounted(async () => {
  try {
    onRequest();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
