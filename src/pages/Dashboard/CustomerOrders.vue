<template>
  <div class="container">
    <div class="auth">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <h4 class="bigMediumText">Orders</h4>
          <div>
            <q-btn-dropdown no-caps no-wrap color="primary" label="Sort by">
              <q-list>
                <q-item
                  :class="currentSortOption === 'ascending' ? 'bg-grey-3' : ''"
                  clickable
                  v-close-popup
                  @click="sortOrders('ascending')"
                >
                  <q-item-section>
                    <q-item-label>Ascending</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  :class="currentSortOption === 'descending' ? 'bg-grey-3' : ''"
                  clickable
                  v-close-popup
                  @click="sortOrders('descending')"
                >
                  <q-item-section>
                    <q-item-label>Descending</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  :class="currentSortOption === 'processed' ? 'bg-grey-3' : ''"
                  clickable
                  v-close-popup
                  @click="sortOrders('processed')"
                >
                  <q-item-section>
                    <q-item-label>Proccessed</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  :class="currentSortOption === 'dispatched' ? 'bg-grey-3' : ''"
                  clickable
                  v-close-popup
                  @click="sortOrders('dispatched')"
                >
                  <q-item-section>
                    <q-item-label>Dispatched</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  :class="currentSortOption === 'delivered' ? 'bg-grey-3' : ''"
                  clickable
                  v-close-popup
                  @click="sortOrders('delivered')"
                >
                  <q-item-section>
                    <q-item-label>Delivered</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  :class="currentSortOption === 'declined' ? 'bg-grey-3' : ''"
                  clickable
                  v-close-popup
                  @click="sortOrders('declined')"
                >
                  <q-item-section>
                    <q-item-label>Declined</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <!-- <q-select
              outlined
              v-model="sortByModel"
              :options="sortByOptions"
              label="Sort by"
            /> -->
          </div>
        </div>
        <q-table
          :rows="sortedOrders"
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
                  <!-- <q-carousel
                    animated
                    style="height: 100px; width: 100px"
                    v-model="slide"
                    arrows
                    navigation
                    infinite
                  >
                    <q-carousel-slide
                      v-for="(productImg, index) in product?.product?.media"
                      :key="index"
                      :name="index + 1"
                      :img-src="productImg.url"
                    />
                  </q-carousel> -->
                  <!-- <img
                    style="width: 80.957px; height: 107px; object-fit: contain"
                    :src="props.row.product.media[0].url"
                    alt=""
                  /> -->
                  <p class="smallerText q-mt-md">
                    <!-- {{
                      props?.row?.products?.map((product) =>
                        product?.product?.name?.toString()
                      )[0]
                    }} -->
                    {{ props?.row?.product?.name }}
                  </p>
                </div>
              </div>
            </q-td>
          </template>
          <!-- <template v-slot:body-cell-date="props">
              <q-td :props="props">
                <div style="gap: 1rem" class="row items-center">
                  <div>
                    {{
                      new Date(props.row.startDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    }}
                  </div>
                </div>
              </q-td>
            </template> -->

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="table_btn row items-center no-wrap">
                <q-btn
                  @click="chatSeller(props.row)"
                  flat
                  no-wrap
                  no-caps
                  text-color="blue-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Chat Customer
                </q-btn>
                <q-btn
                  @click="acceptOrder(props.row)"
                  flat
                  no-wrap
                  v-if="
                    props.row.merchant_response !== 'declined' &&
                    props.row.merchant_response !== 'accepted'
                  "
                  no-caps
                  text-color="blue-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  {{
                    props.row.merchant_response === "accepted"
                      ? "Accepted"
                      : "Accept"
                  }}
                </q-btn>
                <!-- <q-btn
                  @click="acceptOrder(props.row)"
                  flat
                  no-wrap
                  v-if="
                    props.row.status !== 'dispatched' &&
                    props.row.status !== 'declined' &&
                    props.row.status !== 'accepted' &&
                    props.row.status !== 'delivered' &&
                    props.row.status !== 'processed'
                  "
                  no-caps
                  text-color="blue-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  {{ props.row.merchant_response === "accepted" ? "Accepted" : "Accept" }}
                </q-btn> -->
                <q-btn
                  flat
                  no-wrap
                  no-caps
                  disable
                  text-color="blue-7"
                  v-if="props.row.merchant_response === 'accepted'"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Accepted
                </q-btn>
                <!-- <q-btn
                  flat
                  no-wrap
                  no-caps
                  disable
                  text-color="blue-7"
                  v-if="props.row.status === 'processed'"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Proccessed
                </q-btn> -->
                <!-- <q-btn
                  flat
                  no-wrap
                  no-caps
                  disable
                  text-color="blue-7"
                  v-if="props.row.status === 'dispatched'"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Dispatched
                </q-btn> -->
                <!-- <q-btn
                  flat
                  no-wrap
                  no-caps
                  disable
                  text-color="blue-7"
                  v-if="props.row.status === 'delivered'"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  Delivered
                </q-btn> -->

                <span
                  v-if="
                    props.row.merchant_response !== 'accepted' &&
                    props.row.merchant_response !== 'declined'
                  "
                  >|</span
                >
                <q-btn
                  @click="rejectOrder(props.row)"
                  flat
                  :disable="props.row.merchant_response === 'declined'"
                  no-wrap
                  v-if="
                    props.row.merchant_response !== 'declined' &&
                    props.row.merchant_response !== 'accepted'
                  "
                  no-caps
                  text-color="red-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  {{
                    props.row.merchant_response === "declined"
                      ? "Declined"
                      : "Decline"
                  }}
                </q-btn>
                <!-- <q-btn
                  @click="rejectOrder(props.row)"
                  flat
                  :disable="props.row.status === 'declined'"
                  no-wrap
                  v-if="
                    props.row.status !== 'dispatched' &&
                    props.row.status !== 'declined' &&
                    props.row.status !== 'accepted' &&
                    props.row.status !== 'delivered' &&
                    props.row.status !== 'processed'
                  "
                  no-caps
                  text-color="red-7"
                  size="md"
                  :loading="loaders.save[props]"
                >
                  {{ props.row.status === "declined" ? "Declined" : "Decline" }}
                </q-btn> -->
                <q-btn-dropdown
                  no-caps
                  flat
                  v-if="
                    props?.row?.merchant_response !== 'declined' ||
                    props?.row?.shipping_status !== 'delivered'
                  "
                  no-wrap
                  label="Track order"
                  color="primary"
                >
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      @click="setTrackingStatus(props.row)"
                    >
                      <q-item-section>
                        <q-item-label>Order Shipped</q-item-label>
                      </q-item-section>
                    </q-item>

                    <!-- <q-item
                      clickable
                      v-close-popup
                      @click="setTrackingStatus(props.row)"
                    >
                      <q-item-section>
                        <q-item-label>Order Dispatched</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="setTrackingStatus(props.row)"
                    >
                      <q-item-section>
                        <q-item-label>Order Delivered</q-item-label>
                      </q-item-section>
                    </q-item> -->
                  </q-list>
                </q-btn-dropdown>
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

  <q-dialog v-model="dispatchRiderModal">
    <q-card style="max-width: 520px">
      <div class="top_modal row items-center justify-between">
        <h4 class="text1">DIspatch Item</h4>

        <q-btn @click="dispatchRiderModal = false" flat rounded>
          <img src="../../assets/circle.svg" alt="" />
        </q-btn>
      </div>

      <p class="q-mt-sm q-mb-md">
        Choose the dispatch driver you would like to asssign this delivery to
        for easy tracking for customer.
      </p>

      <div>
        <h6 class="smallText q-mb-sm color">Select Driver</h6>
        <q-option-group
          v-model="ridersGroupChoice"
          :options="ridersOptions"
          color="primary"
        />
      </div>

      <div class="row justify-end">
        <q-btn color="primary" no-caps no-wrap class="q-pa-md" rounded>
          Continue
        </q-btn>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="chatModal" persistent class="chatDialog">
    <div>
      <ChatPage
        :product="product"
        :conversationMessages="conversationMessages"
        :conversationDetails="conversationDetails"
        @closeModal="closeModalToggle"
      />
    </div>
  </q-dialog>
</template>

<script setup>
import { Dialog, Loading, Notify, QSpinnerRings } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ChatPage from "src/components/ChatPage.vue";
let authStore = useMyAuthStore();
let loading = ref(false);
let signleRouteData = useRoute();
let router = useRouter();
let dispatchRiderModal = ref(false);
let loadingChatBtn = ref(false);
let ridersGroupChoice = ref("op1");
let slide = ref(1);
let chatModal = ref(false);
let conversationDetails = ref({});

let ridersOptions = [
  {
    label: "Option 1",
    value: "op1",
  },
  {
    label: "Option 2",
    value: "op2",
  },
  {
    label: "Option 3",
    value: "op3",
  },
];
let sortByModel = ref("ascending");
let sortByOptions = ["Ascending", "Descending", "Dispatched", "Received"];
const columns = [
  {
    name: "product",
    required: true,
    label: "Products",
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
    field: (row) => `$${row.price}`,
    sortable: true,
  },
  {
    name: "unit",
    required: true,
    label: "Quantity",
    align: "left",
    field: "unit",
    sortable: true,
  },
  {
    name: "customer",
    required: true,
    label: "Customer name",
    align: "left",
    field: (row) => row?.customer?.name,
    sortable: true,
  },
  {
    name: "customer",
    required: true,
    label: "Customer email",
    align: "left",
    field: (row) => row?.customer?.email,
    sortable: true,
  },
  // {
  //   name: "shipping_information",
  //   required: true,
  //   label: "City",
  //   align: "left",
  //   field: (row) => row?.shipping_information?.address?.city,
  //   sortable: true,
  // },
  // {
  //   name: "shipping_information",
  //   required: true,
  //   label: "Country",
  //   align: "left",
  //   field: (row) => row?.shipping_information?.address?.country,
  //   sortable: true,
  // },
  // {
  //   name: "shipping_information",
  //   required: true,
  //   label: "Customer Name",
  //   align: "left",
  //   field: (row) =>
  //     `${row?.shipping_information?.address?.first_name} ${row?.shipping_information?.address?.last_name}`,
  //   sortable: true,
  // },
  // {
  //   name: "shipping_information",
  //   required: true,
  //   label: "State",
  //   align: "left",
  //   field: (row) => `${row?.shipping_information?.address?.state} `,
  //   sortable: true,
  // },
  // {
  //   name: "shipping_information",
  //   required: true,
  //   label: "Postal Code",
  //   align: "left",
  //   field: (row) => `${row?.shipping_information?.address?.postal_code} `,
  //   sortable: true,
  // },

  {
    name: "created_at",
    required: true,
    label: "Date",
    align: "left",
    field: (row) =>
      new Date(row.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    sortable: true,
  },

  {
    name: "actions",
    required: true,
    label: "",
    align: "left",
    field: (row) => row.investor,
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

// Current sort option
const currentSortOption = ref("ascending");

// Method to sort orders based on the selected// Reactive object to track the active slide for each product
const slideTracker = ref({});

// Function to initialize slideTracker safely
const initializeSlideTracker = (row) => {
  console.log(row);
  if (!row || !row.products) return;

  row.products.forEach((_, index) => {
    const key = `${row.id}-${index}`;
    if (!(key in slideTracker.value)) {
      slideTracker.value[key] = 1; // Start at slide 1
    }
  });
};

const sortOrders = (option) => {
  currentSortOption.value = option;
};

// Computed property to get sorted orders
const sortedOrders = computed(() => {
  let sorted = [...rows.value];

  switch (currentSortOption.value) {
    case "ascending":
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "descending":
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "dispatched":
      sorted = sorted.filter((order) => order.status === "dispatched");
      break;
    case "delivered":
      sorted = sorted.filter((order) => order.status === "delivered");
      break;
  }

  return sorted;
});

const closeModalToggle = () => {
  chatModal.value = false;
};

let chatSeller = (order) => {
  loadingChatBtn.value = true;
  authAxios
    .post(`chat/create-or-get`, {
      participant_one_id:
        authStore.userdetails.roles[0].name === "merchant"
          ? authStore.storedetails.id
          : authStore.userdetails.id,
      participant_one_type:
        authStore.userdetails.roles[0].name === "shopper" ? "user" : "merchant",
      participant_two_id: order.customer.id,
      participant_two_type: "shopper",
    })
    .then((response) => {
      loadingChatBtn.value = false;
      console.log(response);
      conversationDetails.value = response.data.data;
      chatModal.value = true;
      // getConversations(response.data.conversation.id);
    })
    .catch(({ response }) => {
      // console.log(response);
      if (response.data.message === "The user id field is required.") {
        Notify.create({
          message: "You need to be logged in to start a conversation",
          position: "top",
          color: "red",
        });

        Dialog.create({
          title: "Authenticate",
          message: `Please login to start conversation with vendor`,
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            router.replace({
              name: "customer.login",
              query: {
                redirect: signleRouteData.name,
              },
            });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }

      loadingChatBtn.value = false;
      errors = response.data.errors || {};
    });
  // chat = true;
};

const onRequest = (props) => {
  loading.value = true;

  authAxios
    .get(`merchant/order/index`)
    .then(({ data }) => {
      console.log(data);

      rows.value = data.orders;
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const getOrders = () => {
  loading.value = true;
  authAxios
    .get(`merchant/order/index`)
    .then(({ data }) => {
      console.log(data);
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const acceptOrder = (order) => {
  Dialog.create({
    title: "Accept order",
    message: `Are you sure you want to accept this order?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerRings,
        spinnerColor: "yellow",
        spinnerSize: 140,
        message: "Hold on... approving order",
        messageColor: "white",
      });

      authAxios
        .post(`merchant/order/${order.id}/accept`)
        .then(({ data }) => {
          console.log(data);
          Notify.create({
            message: data.message,
            color: "green",
            position: "top",
          });
          Loading.hide();
          onRequest();
        })
        .catch(({ response }) => {
          Loading.hide();
          Notify.create({
            message: "Error approving order",
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
const rejectOrder = (order) => {
  Dialog.create({
    title: "Reject order",
    message: `Are you sure you want to reject this order?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerRings,
        spinnerColor: "yellow",
        spinnerSize: 140,
        message: "Hold on... rejecting order",
        messageColor: "white",
      });

      authAxios
        .post(`merchant/order/${order.slug}/reject`, {
          status: "accepted",
        })
        .then(({ data }) => {
          console.log(data);
          Notify.create({
            message: data.message,
            color: "green",
            position: "top",
          });
          Loading.hide();
          onRequest();
        })
        .catch(({ response }) => {
          Loading.hide();
          Notify.create({
            message: "Error approving order",
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
const setTrackingStatus = (order) => {
  // console.log(order.shipping_information.tracking_number);
  Dialog.create({
    title: "Set Order Status",
    message: `Are you sure you want to change the status of this order?`,
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      Loading.show({
        spinner: QSpinnerRings,
        spinnerColor: "yellow",
        spinnerSize: 140,
        message: "Hold on... updating status",
        messageColor: "white",
      });
      authAxios
        .post(
          `merchant/tracking/${order?.shipping_information?.tracking_number}/${order.slug}`,
          {
            status: "shipped",
          }
        )
        .then(({ data }) => {
          console.log(data);
          Notify.create({
            message: data.message,
            color: "green",
            position: "top",
          });
          Loading.hide();
          onRequest();
        })
        .catch(({ response }) => {
          console.log(response);
          Loading.hide();
          Notify.create({
            message: "Error setting order status",
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
const declineOrder = (order) => {
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
        message: "Hold on... declining order",
        messageColor: "white",
      });
      authAxios
        .post(`merchant/order/${order.id}/action`, {
          status: "declined",
        })
        .then(({ data }) => {
          console.log(data);
          Notify.create({
            message: data.message,
            color: "green",
            position: "top",
          });
          Loading.hide();
          onRequest();
        })
        .catch(({ response }) => {
          Loading.hide();
          Notify.create({
            message: "Error declining order",
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
    // getOrders();
  } catch (error) {
    console.error(error);
  }
});

function wrapCsvValue(val, formatFn) {
  // console.log(val);
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}
const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.value.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format
            )
          )
          .join(",")
      )
    )
    .join("\r\n");
  const status = exportFile(`Customer Orders`, content, "text/csv");
  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
};
</script>

<style lang="scss" scoped></style>
