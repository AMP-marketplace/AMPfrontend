import { defineStore } from "pinia";
import { Notify } from "quasar";
import axios from "axios";

// Function to validate price and ensure it's numeric
function extractPrice(priceString) {
  // Extract all numbers and decimals into an array
  const matches = priceString.match(/[0-9]+(?:\.[0-9]+)?/g);

  // If no matches found, return 0
  if (!matches) return 0;

  // Use only the first valid numeric part
  return parseFloat(matches[0]) || 0;
}

function validatePrice(priceString) {
  // Extract and normalize the price
  const cleanedPrice = extractPrice(priceString);

  // Ensure it's a valid number greater than 0
  return cleanedPrice > 0;
}

export const useCartStore = defineStore("apmcart", {
  state: () => ({
    cart: [],
    total: "",
    discounter: 0,
    deliveryLocationFee: 5000,
    orderDetail: [],
    baseCurrency: "USD", // Default currency
    exchangeRates: {}, // For storing exchange rates
  }),
  persist: {
    key: "apmcart",
    storage: localStorage,
  },
  getters: {
    totalPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        const price = parseFloat(item.product.cleanedPrice);
        return acc + price * item.quantity;
      }, 0);
    },
    cartCurrency: (state) => {
      return state.cart.length > 0 ? state.cart[0].product.currency : null;
    },
  },
  actions: {
    // Add a product to the cart with strict price validation
    addTocart(product_item) {
      const priceString = product_item.price.minimum_price;

      // Extract and validate the price
      const cleanedPrice = extractPrice(priceString);

      if (cleanedPrice <= 0) {
        Notify.create({
          message:
            "Invalid product price format. Please contact the seller for pricing details.",
          color: "yellow",
          position: "top",
        });
        return;
      }

      // Prevent mixing currencies in the cart
      if (
        this.cart.length > 0 &&
        product_item.currency !== this.cart[0].product.currency
      ) {
        Notify.create({
          message:
            "Cannot mix products with different currencies in the same cart.",
          color: "red",
          position: "top",
        });
        return;
      }

      const item = {
        product: { ...product_item, cleanedPrice },
        quantity: product_item.quantityy ? product_item.quantityy : 1,
      };

      const findproduct_item = this.cart.find(
        (product) => product.product.id === product_item.id
      );

      if (findproduct_item) {
        findproduct_item.quantity += item.quantity;
        Notify.create({
          message: "Item already added",
          position: "top",
        });
      } else {
        this.cart.push(item);
        Notify.create({
          message: "Item successfully added to cart",
          color: "green",
          position: "top",
        });
      }
    },
    // Other actions remain unchanged
    add(id) {
      const findproduct_item = this.cart.find(
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
      const findproduct_item = this.cart.find(
        (product_item) => product_item.product.id === id
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
