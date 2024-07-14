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
                      order_id: props.row.id,
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
    label: "Product name",
    align: "left",
    field: (row) => `${row.product.name} `,
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Amount",
    align: "left",
    field: (row) => `${row.currency.code} ${row.amount}`,
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
    name: "tracking_number",
    required: true,
    label: "Tracking number",
    align: "left",
    field: "tracking_number",
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
  authAxios
    .get(`customer/order/list`)
    .then(({ data }) => {
      console.log(data);
      // rows.value = data.data;
      rows.value = data.data.map((order) => {
        const product = prodListArr.value.find(
          (prod) => prod.id === order.product_id
        );
        return {
          ...order,
          product: { ...product }, // Spread product properties into the order
        };
      });
      console.log(rows.value);
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
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
    getProducts();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>

<!-- v
<template>
  <div class="q-mt-xl">
    <div class="container">
      <div class="q-mt-lg">
        <div class="">
          <div class="q-pb-lg">
            <div style="gap: 1rem" class="row items-center no-wrap">
              <q-btn
                class="expand_cats"
                dense
                round
                unelevated
                color="accent"
                icon="chevron_right"
                @click="drawer = !drawer"
              />
              <q-btn-dropdown outline label="Sort by">
                <q-list>
                  <q-item
                    :class="
                      selectedSort === 'name' ? 'bg-primary text-white' : ''
                    "
                    clickable
                    v-close-popup
                    @click="setSortParam('name')"
                  >
                    <q-item-section>
                      <q-item-label>Name</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item
                    :class="
                      selectedSort === 'price' ? 'bg-primary text-white' : ''
                    "
                    clickable
                    v-close-popup
                    @click="setSortParam('price')"
                  >
                    <q-item-section>
                      <q-item-label>Price</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    :class="
                      selectedSort === 'date' ? 'bg-primary text-white' : ''
                    "
                    clickable
                    v-close-popup
                    @click="setSortParam('date')"
                  >
                    <q-item-section>
                      <q-item-label>Date</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="q-pa-md responsive_grid">
              <div v-for="n in 4" :key="n">
                <q-card v-if="loadingProducts" flat style="max-width: 300px">
                  <q-skeleton height="150px" square />

                  <q-card-section>
                    <q-skeleton type="text" class="text-subtitle1" />
                    <q-skeleton
                      type="text"
                      width="50%"
                      class="text-subtitle1"
                    />
                    <q-skeleton type="text" class="text-caption" />
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div
              v-if="!loadingProducts && filteredProducts.length !== 0"
              class="responsive_grid"
            >
              <div v-for="product in filteredProducts" :key="product.id">
                <OrderComp :product="product.product" :noBtn="false" />
              </div>
            </div>
            <div
              v-if="!loadingProducts && filteredProducts.length === 0"
              class="column items-center text-center justify-center"
            >
              <img
                style="width: 308.001px; height: 204.304px"
                src="../../assets/box.png"
                alt=""
              />
              <p class="smallText q-my-lg">No products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { computed, onMounted, ref } from "vue";
import OrderComp from "src/components/OrderListComp.vue";

let loadingProducts = ref(true);
let loading = ref(true);
let prodListArr = ref([]);
let orderListArr = ref([]);
let categoryListArr = ref([]);
const selectedSort = ref("name");
const searchQuery = ref("");
const drawer = ref(false);

const filteredProducts = computed(() => {
  let filtered = [...orderListArr.value];

  // Sorting
  if (selectedSort.value === "name") {
    filtered.sort((a, b) => a.product.name.localeCompare(b.product.name));
  } else if (selectedSort.value === "price") {
    filtered.sort((a, b) => a.product.price - b.product.price);
  } else if (selectedSort.value === "date") {
    filtered.sort(
      (a, b) => new Date(b.product.date) - new Date(a.product.date)
    );
  }

  // Searching
  if (searchQuery.value.trim() !== "") {
    filtered = filtered.filter((product) =>
      product.product.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});
const setSortParam = (sortParam) => {
  selectedSort.value = sortParam;
};
const orderList = async () => {
  try {
    loadingProducts.value = true;
    let orderlistResp = await authAxios.get("customer/order/list");
    // prodListArr.value = prodorderlistRespList.data.data;
    const mergedOrders = orderlistResp.data.data.map((order) => {
      const product = prodListArr.value.find(
        (prod) => prod.id === order.product_id
      );
      return {
        ...order,
        product: { ...product }, // Spread product properties into the order
      };
    });

    orderListArr.value = mergedOrders;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async () => {
  try {
    let prodList = await authAxios.get("product/list");
    console.log(prodList);
    prodListArr.value = prodList.data.data;
    orderList();
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" scoped></style> -->
