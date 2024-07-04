import { createI18n } from "vue-i18n";
import messages from "src/i18n";

export default ({ app }) => {
  const i18n = createI18n({
    locale: "en", // set locale
    fallbackLocale: "en", // set fallback locale
    messages, // set locale messages
  });

  // Tell Quasar to use the i18n instance
  app.use(i18n);
};
