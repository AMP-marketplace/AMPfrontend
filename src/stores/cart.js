import { defineStore } from "pinia";
import { Notify } from "quasar";
import axios from "axios";

// Function to validate price and ensure it's numeric
function extractPrice(priceString) {
  const matches = priceString.match(/[0-9]+(?:\.[0-9]+)?/g);
  if (!matches) return 0;
  return parseFloat(matches[0]) || 0;
}

function validatePrice(priceString) {
  const cleanedPrice = extractPrice(priceString);
  return cleanedPrice > 0;
}

// Function to update Omnisend cart tracking
function updateOmnisendCart(cart) {
  if (window.omnisend) {
    window.omnisend.push([
      "cartUpdate",
      {
        cartID: `cart-${new Date().getTime()}`,
        products: cart.map((item) => ({
          productID: item.product.id,
          title: item.product.name,
          price: item.product.cleanedPrice,
          quantity: item.quantity,
          productURL: `https://yourwebsite.com/product/${item.product.id}`,
          imageURL: item.product.image || "",
        })),
      },
    ]);
    console.log("Omnisend cart updated:", cart);
  } else {
    console.warn("Omnisend not available yet.");
  }
}

export const useCartStore = defineStore("apmcart", {
  state: () => ({
    cart: [],
    total: "",
    discounter: 0,
    deliveryLocationFee: 5000,
    orderDetail: [],
    baseCurrency: "USD",
    exchangeRates: {},
  }),
  persist: {
    key: "apmcart",
    storage: process.client ? localStorage : "",
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
    // Add a product to the cart with Omnisend tracking
    addTocart(product_item) {
      const priceString = product_item.price.minimum_price;
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
        Notify.create({ message: "Item already added", position: "top" });
      } else {
        this.cart.push(item);
        Notify.create({
          message: "Item successfully added to cart",
          color: "green",
          position: "top",
        });
      }

      // Update Omnisend cart tracking
      updateOmnisendCart(this.cart);
    },

    // Increase quantity and update Omnisend
    add(id) {
      const findproduct_item = this.cart.find(
        (product_item) => product_item.product.id === id
      );

      if (findproduct_item) {
        findproduct_item.quantity =
          findproduct_item.quantity === "" || 0
            ? 0 + 1
            : parseInt(findproduct_item.quantity) + 1;

        // Update Omnisend
        updateOmnisendCart(this.cart);
      }
    },

    // Decrease quantity and update Omnisend
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

      // Update Omnisend
      updateOmnisendCart(this.cart);
    },

    // Remove product from cart and update Omnisend
    removeFromCart(id) {
      this.cart = this.cart.filter((items) => items.product.id !== id);
      Notify.create({
        message: "Item successfully removed from cart",
        color: "red",
        position: "top",
      });

      // Update Omnisend
      updateOmnisendCart(this.cart);
    },

    // Clear cart and update Omnisend
    clearCart() {
      this.cart = [];
      Notify.create({
        message: "Cart successfully cleared",
        color: "green",
        position: "top",
      });

      if (window.omnisend) {
        window.omnisend.push([
          "cartUpdate",
          { cartID: `cart-${new Date().getTime()}`, products: [] },
        ]);
        // console.log("Omnisend cart cleared.");
      }
    },
  },
});
