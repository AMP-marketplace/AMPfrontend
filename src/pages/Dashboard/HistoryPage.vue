<template>
  <div>
    <div class="auth">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <h4 class="bigMediumText">Orders</h4>
          <div>
            <q-btn
              outline
              color="secondary"
              no-caps
              no-wrap
              label="Clear All"
            />
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
import { onMounted, ref } from "vue";

let loading = ref(false);

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
    label: "Amount Sold",
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
    name: "reviews",
    required: true,
    label: "Reviews",
    align: "left",
    field: "reviews",
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
  {
    product: "Emulsion Pain",
    amount: "$70.00",
    quantity: "4",
    date: "April 8th 2023",
    reviews: "2",
  },
  {
    product: "Emulsion Pain",
    amount: "$70.00",
    quantity: "4",
    date: "April 8th 2023",
    reviews: "5",
  },
]);
const onRequest = (props) => {
  // loading.value = true;
  // const url = `subscriptions?populate=user.subscription+organizations,paymentMethod.stripe,plan`;
  // curl.value = url;
  // api
  //   .get(url)
  //   .then(({ data }) => {
  //     rows.value = data.payload
  //       .filter((sub) => sub.user._id === store.userdetails._id)
  //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //     loading.value = false;
  //     mockPlan.value = rows.value.length ? rows.value[0].plan : {};
  //   })
  //   .catch(({ response }) => {
  //     loading.value = false;
  //   });
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
