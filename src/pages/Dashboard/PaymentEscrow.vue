<template>
  <div>
    <div class="auth">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <h4 class="bigMediumText">Escrow Information</h4>
          <div></div>
        </div>

        <q-separator />

        <div class="escrow_top_area">
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="img">
              <img src="../../assets/escrowtotalamt.svg" alt="" />
            </div>
            <div>
              <h6>Total Escrow Amount</h6>
              <h4 class="text1">$20,000</h4>
            </div>
          </div>
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="img">
              <img src="../../assets/productreleased.svg" alt="" />
            </div>
            <div>
              <h6>Product Released</h6>
              <h4 class="text1">25</h4>
            </div>
          </div>
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="img">
              <img src="../../assets/productpending.svg" alt="" />
            </div>
            <div>
              <h6>Product Pending</h6>
              <h4 class="text1">15</h4>
            </div>
          </div>
        </div>

        <div style="gap: 1rem" class="sortbtns row items-center">
          <q-btn
            no-wrap
            no-caps
            @click="setView('Pending')"
            flat
            :class="view === 'Pending' ? 'text-weight-bold active' : ''"
            >Pending Release</q-btn
          >
          <q-btn
            no-wrap
            no-caps
            @click="setView('Released')"
            flat
            :class="view === 'Released' ? 'text-weight-bold active' : ''"
            >Released Funds</q-btn
          >
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
          <template v-slot:body-cell-product="props">
            <q-td :props="props">
              <div style="gap: 1rem" class="row no-wrap items-center">
                <div>
                  <img
                    style="width: 120.957px; height: 107px"
                    src="../../assets/box.png"
                    alt=""
                  />
                </div>
                <div>
                  <h6 class="smallText">{{ props.row.product }}</h6>
                  <p class="smallerText q-mt-md">
                    EX DISPLAY : MSI Pro 16 Flex-036AU <br />
                    15.6 MULTITOUCH All-In-On...
                  </p>
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <p
                v-if="view === 'Pending'"
                class="bg-yellow-2 text-center q-pa-sm text-yellow-10"
              >
                Pending
              </p>
              <p
                v-if="view === 'Released'"
                class="bg-green-2 text-center q-pa-sm text-green-10"
              >
                Released
              </p>
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
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";

let loading = ref(false);
let view = ref("Pending");

const columns = [
  {
    name: "product",
    required: true,
    label: "Product Purchased",
    align: "left",
    field: "product",
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Release Status",
    align: "left",
    field: "amount",
    sortable: true,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: "quantity",
    sortable: true,
  },
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: "date",
    sortable: true,
  },

  {
    name: "status",
    required: true,
    label: "Release Status",
    align: "left",
    field: "status",
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
let rows = ref([
  // {
  //   product: "Emulsion Pain",
  //   amount: "$70.00",
  //   quantity: "4",
  //   date: "April 8th 2023",
  //   reviews: "2",
  // },
  // {
  //   product: "Emulsion Pain",
  //   amount: "$70.00",
  //   quantity: "4",
  //   date: "April 8th 2023",
  //   reviews: "5",
  // },
]);
const setView = (viewArg) => {
  view.value = viewArg;
};
const onRequest = (props) => {
  loading.value = true;

  authAxios
    .get(`merchant/payment/list`)
    .then(({ data }) => {
      console.log(data);
      rows.value = data.data.data;
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
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
