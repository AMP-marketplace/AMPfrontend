<template>
  <v-offline
    @detected-condition="amIOnline"
    ping-url="https://google.com"
    v-if="!devMode"
  >
    <q-dialog
      v-model="offline"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-white text-grey" style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-center">
            {{ offline ? "Offline" : "Online" }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none no-wrap text-center">
          <div class="column no-wrap q-mb-sm flex-center">
            <img style="width: 100px" src="/images/off.png" alt="" />
          </div>
          Please connect to the internet...
          <div class="q-pa-sm q-gutter-sm">
            <q-btn
              class="q-px-lg"
              rounded
              color="primary"
              no-wrap
              no-caps
              label="Reconnect"
              @click="$router.go(0)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </v-offline>
</template>

<script>
import { ref, computed } from "vue";
import { VOffline } from "v-offline";

export default {
  components: {
    VOffline,
  },
  methods: {
    amIOnline(e) {
      this.offline = !e;
    },
  },
  setup() {
    return {
      offline: ref(false),
      devMode: computed(() => process.env.ENVIRONMENT == "development"),
    };
  },
};
</script>
