import { defineStore } from "pinia";
export const useMyAuthStore = defineStore("ampauth", {
  state: () => ({
    token: "",
    userdetails: {},
    dashboardSettings: {},
    previousRoute: "",
    role: "",
    createStoreStep: "",
    storedetails: {},
    userstores: [],
    token: "",
  }),
  persist: {
    key: "ampauth",
    storage: process.client ? localStorage : "",
  },
  getters: {
    registrationForm: (state) => state.userdetails,
  },
  actions: {
    setUserDetails(data) {
      console.log(data);
      const token = data.token;
      const user = data.data.user ? data.data.user : data.data;
      const typeOfUser = data.data.role
        ? data.data.roles[0].name
        : data.data.user.roles[0].name;
      this.userdetails = user;
      this.token = token;
      this.role = typeOfUser;
      localStorage.setItem("token", token);
      localStorage.setItem("userdet", JSON.stringify(user));
    },

    logOut() {
      // console.log(response);
      this.token = null;
      this.userDetails = null;
      localStorage.setItem("token", "");
      localStorage.setItem("userdet", "");
    },
  },
});
