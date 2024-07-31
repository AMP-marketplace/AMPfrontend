<template>
  <div class="q-mx-lg">
    <div class="auth">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <h4 class="bigMediumText">Orders</h4>
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
                    props.row.status === 'pending'
                      ? 'bg-yellow-10 q-pa-xs text-white'
                      : 'bg-green-10 q-pa-xs text-white'
                  "
                >
                  {{ props.row.status }}
                </p>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div>
                <q-btn
                  @click="cancelOrder(props.row)"
                  flat
                  no-wrap
                  no-caps
                  text-color="blue-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Cancel Order
                </q-btn>

                <span>|</span>
                <q-btn
                  flat
                  no-wrap
                  no-caps
                  @click="deleteOrder(props.row)"
                  text-color="red-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Delete Order
                </q-btn>
                <q-btn
                  :to="{
                    name: 'order.tracking.new',
                    query: {
                      order_id: props.row.slug,
                    },
                  }"
                  no-caps
                  no-wrap
                  flat
                  color="primary"
                >
                  Track order
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
</template>

<script setup>
import { Dialog, Loading, Notify, QSpinnerRings } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref } from "vue";

let loading = ref(false);
let view = ref("Pending");

const columns = [
  {
    name: "product",
    required: true,
    label: "Products name",
    align: "left",
    field: (row) =>
      `${row.products.map((product) => product.product.name.toString())} `,
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Amount",
    align: "left",
    field: (row) => `${row.amount}`,
    sortable: true,
  },
  // {
  //   name: "quantity",
  //   required: true,
  //   label: "Quantity",
  //   align: "left",
  //   field: "quantity",
  //   sortable: true,
  // },
  {
    name: "tracking_number",
    required: true,
    label: "Tracking number",
    align: "left",
    field: (row) => `${row.shipping_information.tracking_number} `,
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
  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "left",
    field: (row) => row.id,
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
let prodListArr = ref([]);
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
    .get(`order/index`)
    .then(({ data }) => {
      console.log(data);
      rows.value = data.data;
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
      rows.value = [];
    });
};
const getProducts = async () => {
  try {
    loading.value = true;
    let prodList = await authAxios.get("product/list");
    console.log(prodList);
    prodListArr.value = prodList.data.data;

    onRequest();
  } catch (error) {
    console.error(error);
  }
};

const deleteOrder = (order) => {
  Dialog.create({
    title: "Delete Order",
    message: `Are you sure you want to delete this order?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerRings,
        spinnerColor: "yellow",
        spinnerSize: 140,
        message: "Hold on... deleting order",
        messageColor: "white",
      });

      authAxios
        .post(`customer/order/${order.id}/delete`)
        .then(({ data }) => {
          console.log(data);
          Notify.create({
            message: response.data.message,
            color: "green",
            position: "top",
          });
          Loading.hide();
          getProducts();
        })
        .catch(({ response }) => {
          Loading.hide();
          Notify.create({
            message: "Error deleting order",
            color: "red",
            position: "top",
          });
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
const cancelOrder = (order) => {
  Dialog.create({
    title: "Cancel Order",
    message: `Are you sure you want to cancel this order?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerRings,
        spinnerColor: "yellow",
        spinnerSize: 140,
        message: "Hold on... canceling order",
        messageColor: "white",
      });
      authAxios
        .post(`customer/order/${order.id}/cancel`)
        .then(({ data }) => {
          console.log(data);
          Notify.create({
            message: response.data.message,
            color: "green",
            position: "top",
          });
          getProducts();
        })
        .catch(({ response }) => {
          Loading.hide();
          Notify.create({
            message: "Error canceling order",
            color: "red",
            position: "top",
          });
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
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
