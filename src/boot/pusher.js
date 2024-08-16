import { boot } from "quasar/wrappers";
import Pusher from "pusher-js";

export default boot(({ app }) => {
  const pusher = new Pusher("f71ee69f460a2ede9930", {
    cluster: "eu",
    encrypted: true,
  });

  // Make Pusher available globally via the app instance
  app.config.globalProperties.$pusher = pusher;
});
// export { Pusher };
