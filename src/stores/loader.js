import { useCartStore } from "stores/cart";
import { useMyAuthStore } from "stores/auth";

export default {
  ampauth: useCartStore(),
  apmcart: useMyAuthStore(),
};
