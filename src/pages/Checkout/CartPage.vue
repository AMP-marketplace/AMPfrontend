v
<template>
  <div class="q-my-xl q-pb-xl">
    <div class="container">
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md">Shopping Cart</h4>
        <div class=""></div>
      </div>

      <div v-if="cartStore.cart.length" class="cart">
        <div class="table">
          <q-table
            :rows="cartStore.cart"
            :hide-header="mode === 'grid'"
            :columns="columns"
            row-key="investor"
            :filter="filter"
            class="sort_tables"
            :loading="loading"
            @request="onRequest"
          >
            <template v-slot:body-cell-product="props">
              <q-td :props="props">
                <div style="gap: 1rem" class="row no-wrap items-center">
                  <div>
                    <img
                      style="
                        width: 120.957px;
                        height: 107px;
                        object-fit: contain;
                      "
                      :src="
                        props.row.product?.media
                          ? props.row.product?.media[0]?.url
                          : ''
                      "
                      alt=""
                    />
                  </div>
                  <div>
                    <h6 class="smallText">{{ props.row.product.name }}</h6>
                    <!-- <p v-html="props.row.product.description" class="smallerText q-mt-sm">
                    </p> -->
                  </div>
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-price="props">
              <q-td :props="props">
                <p class="smallerText q-mt-sm">
                  <!-- ₦{{ props.row.product.price.minimum_price.toLocaleString() }} -->
                  <!-- {{
                    getCountryCurrencySymbol(
                      props.row.product?.country,
                      props.row.product
                    )
                  }} -->
                  $
                  {{
                    props.row.product?.price?.minimum_price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )
                  }}
                  <span v-if="props.row.product.price?.maximum_price !== '1'">
                    -</span
                  >
                  <span v-if="props.row.product.price?.maximum_price !== '1'">
                    <!-- {{
                      getCountryCurrencySymbol(
                        props.row.product?.country,
                        props.row.product
                      )
                    }} -->
                    $
                    {{
                      props.row.product.price?.maximum_price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )
                    }}
                  </span>
                </p>
                <!-- <p class="smallerText q-mt-sm">
                  ₦{{
                    (
                      props.row.product.price * props.row.quantity
                    ).toLocaleString()
                  }}
                </p> -->
              </q-td>
            </template>

            <template v-slot:body-cell-quantity="props">
              <q-td :props="props">
                <div
                  style="width: fit-content"
                  class="table_btn bg-grey-3 row items-center no-wrap"
                >
                  <q-btn
                    flat
                    no-wrap
                    @click="cartStore.remove(props.row.product.id)"
                    no-caps
                    text-color="black"
                    size="lg"
                    :loading="loaders.save[props]"
                  >
                    <i class="fa-solid fa-minus"></i>
                  </q-btn>

                  <strong class="q-mx-md">{{ props.row.quantity }}</strong>
                  <q-btn
                    flat
                    no-wrap
                    no-caps
                    text-color="black"
                    @click="cartStore.add(props.row.product.id)"
                    size="lg"
                    :loading="loaders.save[props]"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </q-btn>
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
                    @click="cartStore.removeFromCart(props.row.product.id)"
                    text-color="blue-7"
                    size="lg"
                    :loading="loaders.save[props]"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </q-btn>
                </div>
              </q-td>
            </template>
            <template v-slot:no-data="{ message }">
              <div
                class="full-width column flex-center text-negative q-gutter-sm"
              >
                <img
                  style="width: 150px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIG_sHzMPgIiEPAEQmblhiH9Evtuz2z56X39QnY-vdQ&s"
                  alt=""
                />
                <span>{{ message }}. You have not added any item to cart </span>
              </div>
            </template>
          </q-table>

          <div
            style="gap: 1rem"
            class="row q-mt-lg q-px-xl continue justify-center items-center no-wrap"
          >
            <q-btn no-caps :to="{ name: 'explore' }" no-wrap outline rounded>
              Continue Shopping
            </q-btn>
            <q-btn
              @click="cartStore.clearCart"
              no-wrap
              no-caps
              color="black"
              rounded
            >
              Clear Shopping Cart
            </q-btn>
          </div>
        </div>
        <div class="checkout_details">
          <h4 class="bigMediumText">Summary</h4>
          <q-separator />

          <div class="row justify-between items-center">
            <p style="opacity: 1" class="smallerText">Subtotal</p>
            <p style="opacity: 1" class="smallerText">
              ${{ cartStore.totalPrice.toLocaleString() }}
            </p>
          </div>
          <div class="row q-mt-sm justify-between items-center">
            <div>
              <p style="opacity: 1" class="smallerText">Delivery</p>
              <p class="smallestText color">
                (Standard Rate - Price may vary depending on the item weight and
                destination. Traacking details will be sent to your mail after
                successful payment)
              </p>
            </div>
            <!-- <p style="opacity: 1" class="smallerText">₦21.00</p> -->
          </div>
          <!-- <div class="row q-mt-sm justify-between items-center">
            <p style="opacity: 1" class="smallerText">VAT(7.5%)</p>
            <p style="opacity: 1" class="smallerText">
              ₦{{ (cartStore.totalPrice * 0.075).toLocaleString() }}
            </p>
          </div> -->
          <!-- <div class="row q-mt-sm justify-between items-center">
            <p style="opacity: 1" class="smallerText">GST(10%)</p>
            <p style="opacity: 1" class="smallerText">₦1.91</p>
          </div> -->
          <div class="row q-mt-sm justify-between items-center">
            <p style="opacity: 1" class="smallerText">Order Total</p>
            <p style="opacity: 1" class="smallText">
              ${{ cartStore.totalPrice.toLocaleString() }}
            </p>
          </div>
          <!-- <div class="row q-mt-sm justify-between items-center">
            <p style="opacity: 1" class="smallerText">Order Total</p>
            <p style="opacity: 1" class="smallText">
              ₦{{
                (
                  cartStore.totalPrice +
                  cartStore.totalPrice * 0.075
                ).toLocaleString()
              }}
            </p>
          </div> -->

          <div class="q-mt-lg">
            <q-btn
              :to="{ name: 'checkout' }"
              rounded
              color="primary"
              class="full-width"
              no-caps
              no-wrap
            >
              Proceed to Checkout
            </q-btn>
            <!-- <q-btn rounded class="full-width paypal" no-caps no-wrap>
              Check out with
              <img
                style="width: 72px; height: 18px"
                src="../../assets/paypal.svg"
                alt=""
              />
            </q-btn>
            <q-btn rounded class="full-width mul" no-caps no-wrap>
              Check Out with Multiple Addresses
            </q-btn> -->
          </div>
        </div>
      </div>
      <div
        v-else
        class="full-width column q-mb-xl q-pb-xl flex-center q-gutter-sm"
      >
        <img
          style="width: 150px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIG_sHzMPgIiEPAEQmblhiH9Evtuz2z56X39QnY-vdQ&s"
          alt=""
        />

        <span class="text-negative"
          >{{ message }}. You have not added any item to cart
        </span>
        <q-btn no-caps :to="{ name: 'explore' }" no-wrap outline rounded>
          Continue Shopping
        </q-btn>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import currencies from "app/currencies";
import FooterCompVue from "src/components/FooterComp.vue";
import { useCartStore } from "src/stores/cart";
import { onMounted, ref } from "vue";

let cartStore = useCartStore();
let loading = ref(false);
const columns = [
  {
    name: "product",
    required: true,
    label: "Item",
    align: "left",
    field: "product",
    sortable: true,
  },
  {
    name: "price",
    required: true,
    label: "Price",
    align: "left",
    field: "price",
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
let message = ref("");
let separator = ref("");
let mode = ref("list");
let loaders = ref({
  delete: false,
  category: false,
  deleteBtn: [],
  save: [],
});
let rows = ref([]);
const onRequest = (props) => {
  // rows.value = cartStore.cart;
  console.log(rows.value);
};
function getCountryCurrencySymbol(countryName, product) {
  const country = currencies.find(
    (c) => c.code.toLowerCase() === product?.currency?.toLowerCase()
  );
  return country ? country.symbol : ""; // Return white flag if country not found
}
onMounted(async () => {
  try {
    onRequest();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
  .cart {
    display: block;
    .checkout_details {
      width: fit-content;
      margin-top: 2rem;
    }
    .small_container.left {
      width: 100%;
    }
  }
}
</style>
