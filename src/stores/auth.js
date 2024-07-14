import { defineStore } from "pinia";
export const useMyAuthStore = defineStore("ampauth", {
  state: () => ({
    token: "",
    userdetails: {},
    dashboardSettings: {},
    previousRoute: "",
    typeOfPersonnel: "",
  }),
  persist: {
    key: "ampauth",
    storage: localStorage,
  },
  getters: {
    registrationForm: (state) => state.userdetails,
  },
  actions: {
    setUserDetails(data) {
      // console.log(data);
      const token = data.token;
      const user = data.user;
      // console.log(data);
      this.userdetails = user;
      this.token = token;

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
