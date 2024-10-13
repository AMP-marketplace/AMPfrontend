import { defineStore } from "pinia";
import axios from "axios";
import { authAxios } from "src/boot/axios";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    loadingProducts: true,
    products: [],
    nextPageUrl: null,
    loading: false,
    noMoreData: false, // Track if there are more pages to load
    exchangeRates: {},
    selectedCurrency: "USD",
    filters: {
      country: "",
      category: "",
      minPrice: "", // Text input for minimum price
      maxPrice: "", // Text input for maximum price
      searchTerm: "",
      dateSortOrder: "newest", // 'newest' or 'oldest'
      nameFilter: "",
    },
    sortOption: "relevance",
  }),
  persist: {
    key: "productStore",
    storage: localStorage,
  },
  getters: {
    filteredProducts: (state) => {
      let filtered = state.products;

      // Filter by country
      if (state.filters.country) {
        filtered = filtered.filter(
          (product) => product.country === state.filters.country
        );
      }

      // Filter by category
      if (state.filters.category) {
        filtered = filtered.filter(
          (product) => product.category === state.filters.category
        );
      }

      // Filter by price range (using text inputs for min and max price)
      // Filter by price range (without exchange rates)
      if (state.filters.minPrice) {
        filtered = filtered.filter(
          (product) =>
            parseInt(product.price.minimum_price) >=
            parseInt(state.filters.minPrice, 10)
        );
      }
      if (state.filters.maxPrice) {
        filtered = filtered.filter(
          (product) =>
            parseInt(product.price.minimum_price) <=
            parseInt(state.filters.maxPrice, 10)
        );
      }
      // if (state.filters.minPrice) {
      //   filtered = filtered.filter((product) => {
      //     const convertedPrice =
      //       parseInt(product.price.minimum_price) *
      //       state.exchangeRates[state.selectedCurrency];
      //     return convertedPrice >= parseInt(state.filters.minPrice, 10);
      //   });
      // }
      // if (state.filters.maxPrice) {
      //   filtered = filtered.filter((product) => {
      //     const convertedPrice =
      //       parseInt(product.price.minimum_price) *
      //       state.exchangeRates[state.selectedCurrency];
      //     return convertedPrice <= parseInt(state.filters.maxPrice, 10);
      //   });
      // }

      // Filter by search term
      if (state.filters.searchTerm) {
        filtered = filtered.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(state.filters.searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(state.filters.searchTerm.toLowerCase())
        );
      }

      // Sort by date (newest or oldest)
      if (state.filters.dateSortOrder === "newest") {
        filtered.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      } else if (state.filters.dateSortOrder === "oldest") {
        filtered.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      }

      // Filter by name
      if (state.filters.nameFilter) {
        filtered = filtered.filter((product) =>
          product.name
            .toLowerCase()
            .includes(state.filters.nameFilter.toLowerCase())
        );
      }

      return filtered;
    },
    sortedProducts: (state) => {
      let sorted = [...state.filteredProducts];

      switch (state.sortOption) {
        case "price-asc":
          sorted.sort(
            (a, b) =>
              parseInt(a.price.minimum_price) - parseInt(b.price.minimum_price)
          );
          break;
        case "price-desc":
          sorted.sort(
            (a, b) =>
              parseInt(b.price.minimum_price) - parseInt(a.price.minimum_price)
          );
          break;
        case "rating":
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // Relevance or any other default sort option
          break;
      }

      return sorted;
    },
  },
  actions: {
    async fetchProducts(url = `products/index/all`) {
      if (this.noMoreData || this.loading) return;
      const response = await authAxios.get(url);
      console.log(response);
      const { products: newProducts, meta } = response.data.data;

      this.products.push(...newProducts); // Add new products
      this.nextPageUrl = meta.next_page_url; // Update next page URL

      if (!this.nextPageUrl) {
        this.noMoreData = true; // No more pages to load
      }

      // this.products = response.data.data.products;
      this.loadingProducts = false;
    },
    async fetchExchangeRates() {
      const response = await axios.get("YOUR_EXCHANGE_RATE_API");
      this.exchangeRates = response.data.rates;
    },
    setCurrency(currency) {
      this.selectedCurrency = currency;
    },
    setFilter(filterType, value) {
      this.filters[filterType] = value;
    },
    setSortOption(option) {
      this.sortOption = option;
    },
    clearFilters() {
      this.filters = {
        country: "",
        category: "",
        minPrice: "", // Text input for minimum price
        maxPrice: "", // Text input for maximum price
        searchTerm: "",
        dateSortOrder: "newest", // 'newest' or 'oldest'
        nameFilter: "",
      };
      this.sortOption = "relevance";
    },
  },
});
