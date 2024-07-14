<template>
  <div>
    <div class="auth">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <h4 class="bigMediumText">Payments</h4>
          <div></div>
        </div>

        <q-separator />

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
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div style="gap: 1rem" class="row no-wrap items-center">
                <p
                  style="border-radius: 8px"
                  :class="
                    props.row.order.status === 'pending'
                      ? 'bg-yellow-10 q-pa-xs text-white'
                      : 'bg-green-10 q-pa-xs text-white'
                  "
                >
                  {{ props.row.order.status }}
                </p>
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
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";

let loading = ref(false);
let view = ref("Pending");

const columns = [
  {
    name: "amount",
    required: true,
    label: "Order amount",
    align: "left",
    field: (row) => `NGN ${row.order.amount}`,
    sortable: true,
  },
  {
    name: "order_tracking_number",
    required: true,
    label: "Order tracking number",
    align: "left",
    field: (row) => `NGN ${row.order.tracking_number}`,
    sortable: true,
  },

  // {
  //   name: "created_at",
  //   required: true,
  //   label: "Created At",
  //   align: "left",
  //   field: (row) =>
  //     new Date(row.created_at).toLocaleDateString("en-US", {
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //     }),
  //   sortable: true,
  // },

  {
    name: "status",
    required: true,
    label: "Status",
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
let rows = ref([]);
const setView = (viewArg) => {
  view.value = viewArg;
};
const onRequest = (props) => {
  loading.value = true;

  authAxios
    .get(`customer/order/payment`)
    .then(({ data }) => {
      console.log(data);
      rows.value = data.data;
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const getEscrowAccounts = () => {
  authAxios
    .get(`customer/escrow/accounts`)
    .then(({ data }) => {
      console.log(data);
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};

onMounted(async () => {
  try {
    onRequest();
    // getEscrowAccounts();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
