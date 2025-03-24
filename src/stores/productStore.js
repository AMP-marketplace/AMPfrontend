import { defineStore } from "pinia";
import axios from "axios";
import { authAxios } from "src/boot/axios";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    loadingProducts: true,
    products: [], // Holds all loaded products
    nextPageUrl: null, // For loading the next page
    loading: false, // Tracks loading state
    noMoreData: false, // Indicates if there are no more pages
    exchangeRates: {},
    selectedCurrency: "USD",
    currentPage: 1, // Tracks the current page from meta
    lastPage: 1, // Total number of pages from meta
    rowsPerPage: 15, // Number of items per page
    totalItems: 0, // Total number of products from meta
    filters: {
      country: "",
      category: "",
      minPrice: "", // Text input for minimum price
      maxPrice: "", // Text input for maximum price
      searchTerm: "",
      dateSortOrder: "newest", // 'newest' or 'oldest'
      nameFilter: "",
    },
    sortOption: "relevance", // Default sort option
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

      // Filter by price range
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

      // Sort by date
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
          // Default sort option
          break;
      }

      return sorted;
    },
  },
  actions: {
    async fetchProducts(
      url = `products/index/all?perPage=${15}`,
      reset = false
    ) {
      console.log(this.rowsPerPage);
      this.loadingProducts = true;

      return authAxios.get(url).then((response) => {
        console.log(response);
        const { products: newProducts, meta } = response.data.data;

        if (reset) {
          this.products = newProducts; // Replace existing products
        } else {
          this.products.push(...newProducts); // Append products
        }

        this.nextPageUrl = meta.next_page_url;
        this.currentPage = meta.current_page; // Update current page from response
        this.lastPage = meta.last_page;
        this.rowsPerPage = meta.per_page;
        this.totalItems = meta.total;

        this.loadingProducts = false;
      });
    },

    async fetchExchangeRates() {
      try {
        const response = await axios.get("YOUR_EXCHANGE_RATE_API");
        this.exchangeRates = response.data.rates;
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
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
        minPrice: "",
        maxPrice: "",
        searchTerm: "",
        dateSortOrder: "newest",
        nameFilter: "",
      };
      this.sortOption = "relevance";
    },
  },
});
