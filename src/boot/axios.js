import { boot } from "quasar/wrappers";
import axios from "axios";
import loadStore from "stores/loader";
import { Notify, Platform } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: process.env.baseURL })
// axios.defaults.baseURL = process.env.baseURL;
// axios.defaults.headers.common["Content-Type"] =
//   "application/json; charset=utf-8";
// axios.defaults.headers.common["Accept"] = "application/json";
// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const authAxios = axios.create({
  baseURL: "https://agora.africamedicalmarketplace.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$authAxios = authAxios;
  app.config.globalProperties.$store = loadStore;

  let auth = store.state.value.ampauth;
  // console.log(auth);
  authAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    (e) => {
      console.log(e);
      let status_code = !e.response || e.response.status;
      console.log(status_code);
      if (e.message === "Network Error") {
        Notify.create({
          message: e.message
            ? e.message +
              " this could be be because of your internet, check your internet connectivity..."
            : "Network error, check your internet connectivity...",
          color: "red",
          position: "top",
          timeout: 20033,
        });
      } else if (status_code === 401) {
        // console.log(status_code);
        if (e.response.data.message !== "Invalid credentials") {
          Notify.create({
            message: e.response.data.error
              ? e.response.data.error || e.response.data.message
              : "You need to login",
            color: "red",
            position: "top",
          });

          store.state.value.ampauth.previousRoute =
            router.currentRoute.value.name;

          return router.replace({ name: "logout" });
        } else {
          Notify.create({
            message: e.response.data.message
              ? e.response.data.message || e.response.data.message
              : "You need to login",
            color: "red",
            position: "top",
          });
        }
      } else if (e.response.data.message === "Unauthorized User") {
        Notify.create({
          message: e.response.data.message,
          color: "red",
        });
        return router.replace({ name: "logout" });
      } else if (e.message === "Network Error") {
        Notify.create({
          message: e.message + " check your internet connection",
          color: "red",
        });
      } else if (e.message === "timeout exceeded") {
        Notify.create({
          message: e.message + " check your internet connection",
          color: "red",
        });
      } else if (status_code === 500) {
        if (typeof e.response.data.message !== "string") {
          return;
        } else {
          Notify.create({
            message: e.response.data.message
              ? e.response.data.message
              : "This is not your fault, we have been notified and is currently fixing any issues.",
            position: "top",
            color: "red",
          });
        }
      } else {
        return Promise.reject(e);
      }
    }
  );

  authAxios.interceptors.request.use(function (config) {
    // console.log(auth);
    if (auth.token) {
      config.headers.Authorization = "Bearer " + auth.token;
    }
    return config;
  });

  router.beforeEach((to, from, next) => {
    // if (to.path === "/") {
    //   if (Platform.is.mobile && to.path !== "/login") {
    //     next("/login");
    //   } else if (!Platform.is.mobile && to.name !== "home") {
    //     next({ name: "home" });
    //   } else {
    //     next();
    //   }
    // } else
    if (to.name === "logout") {
      store.state.value.ampauth.token = "";
      store.state.value.ampauth.userdetails = {};
      localStorage.setItem("token", "");
      localStorage.setItem("userdet", "");
      router.replace({ name: "login" });
    } else if (to.name === "login" && store.state.value.ampauth.token) {
      router.replace({ name: "dashboard" });
    } else {
      next();
    }
  });

  //   // Continue with the navigation as is
  //   next();
  // });

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, authAxios };
