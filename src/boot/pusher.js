// src/boot/pusher.js
import { boot } from "quasar/wrappers";
import Pusher from "pusher-js";

export default boot(({ app, store }) => {
  // console.log(store.state.value.ampauth);
  const pusher = new Pusher("f71ee69f460a2ede9930", {
    cluster: "eu",
    authEndpoint: "https://agora.lyt24tech.com/api/broadcasting/auth", // Laravel's default
    auth: {
      headers: {
        Authorization: `Bearer ${store.state.value.ampauth.token}`,
      },
    },
  });

  // Make pusher available globally
  app.config.globalProperties.$pusher = pusher;
});
