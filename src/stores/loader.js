import { useCartStore } from "stores/cart";
import { useMyAuthStore } from "stores/auth";
import { useProductStore } from "stores/productStore";

export default {
  ampauth: useMyAuthStore(),
  apmcart: useCartStore(),
  productsStore: useProductStore(),
};
