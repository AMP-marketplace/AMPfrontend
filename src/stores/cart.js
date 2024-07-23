import { defineStore } from "pinia";
import { Notify } from "quasar";
export const useCartStore = defineStore("apmcart", {
  state: () => ({
    cart: [],
    total: "",
    discounter: 0,
    deliveryLocationFee: 5000,
    orderDetail: [],
  }),
  persist: {
    key: "apmcart",
    storage: localStorage,
  },
  getters: {
    totalPrice: (state) => {
      return Object.keys(state.cart).reduce((acc, id) => {
        return (
          acc +
          parseInt(state.cart[id].product.price.minimum_price) *
            state.cart[id].quantity
        );
      }, 0);
    },
  },
  actions: {
    addTocart(product_item) {
      console.log(product_item);
      let item = {
        product: product_item,
        quantity: product_item.quantityy ? product_item.quantityy : 1,
        // quantity: product_item.quantity ? product_item.quantity : 1,
      };
      let findproduct_item = this.cart.find(
        (product) => product.product.id === product_item.id
      );
      if (findproduct_item) {
        if (
          product_item.detail &&
          findproduct_item.product.id === item.product.id
        ) {
          findproduct_item.quantity = item.quantity;
        } else {
          findproduct_item.quantity++;
        }

        Notify.create({
          message: "Item already added",
          position: "top",
        });
        return;
      }
      this.cart.push(item);
      Notify.create({
        message: "Item successfully added to cart",
        color: "green",
        position: "top",
      });
    },
    add(id) {
      let findproduct_item = this.cart.find(
        (product_item) => product_item.product.id === id
      );

      if (findproduct_item) {
        findproduct_item.quantity =
          findproduct_item.quantity === "" || 0
            ? 0 + 1
            : parseInt(findproduct_item.quantity) + 1;
      }
    },

    remove(id) {
      // console.log(id);
      let findproduct_item = this.cart.find(
        (product_itemItme) => product_itemItme.product.id === id
      );
      if (!findproduct_item) {
        return;
      }
      findproduct_item.quantity = parseInt(findproduct_item.quantity) - 1;

      if (parseInt(findproduct_item.quantity) <= 0) {
        alert("Cannot Subtract");
        findproduct_item.quantity = 1;
        return;
      }
    },

    removeFromCart(id) {
      // console.log(id);
      this.cart = this.cart.filter((items) => items.product.id !== id);
      Notify.create({
        message: "Item successfully removed from cart",
        color: "red",
        position: "top",
      });
    },
    clearCart() {
      this.cart = [];
      Notify.create({
        message: "Cart successfully cleared",
        color: "green",
        position: "top",
      });
    },
  },
});
