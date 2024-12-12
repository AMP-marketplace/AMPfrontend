<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="header_dashboard bg-white q-py-xs"
      height-hint="58"
    >
      <q-toolbar class="row justify-between">
        <q-btn flat no-caps no-wrap class="q-ml-xs logo">
          <img src="/images/logo.svg" alt="" />
        </q-btn>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="35px">
              <img
                src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
              />
            </q-avatar>
            <q-menu>
              <div class="q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img
                      src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                    />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    <!-- {{ store.userdetails.first_name }}
                    {{ store.userdetails.last_name }} -->
                  </div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    no-caps
                    no-wrap
                    push
                    :to="{ name: 'logout' }"
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
            class="text-black"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="206"
      :breakpoint="800"
    >
      <q-scroll-area class="fit">
        <!-- <q-btn flat no-caps no-wrap class="q-mt-lg logo">
          <img src="/images/unizik.png" alt="" />
        </q-btn> -->
        <q-list padding>
          <q-item
            :to="{ name: 'admin.list.payments' }"
            class="links"
            v-ripple
            clickable
          >
            <q-item-section class="avater_side" avatar>
              <q-icon size="18px" name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>All Payments</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item
            :to="{ name: 'admin.list.kyc' }"
            class="links"
            v-ripple
            clickable
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-verified-badge-line text-h6"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Verify KYC</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            :to="{ name: 'admin.list.orders' }"
            class="links"
            v-ripple
            clickable
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-list-unordered text-h6"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Orders</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            :to="{ name: 'admin.list.fees' }"
            class="links"
            v-ripple
            clickable
          >
            <q-item-section class="avater_side" avatar>
              <i class="ri-wallet-3-line text-h6"></i>
            </q-item-section>
            <q-item-section>
              <q-item-label>Fees</q-item-label>
            </q-item-section>
          </q-item> -->

          <q-separator class="q-my-md" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { useMyAuthStore } from "src/stores/auth";
const store = useMyAuthStore();
// import { useRouter } from "vue-router";
// let router = useRouter();
export default {
  name: "MyLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    // console.log(store.userdetails);
    let userDetails = store.userdetails;
    return {
      fabYoutube,
      store,
      userDetails,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #ffffff;
  border-bottom: 1px solid #dddddd;
}

.logo img {
  width: 152px;
  height: 60px;
  object-fit: contain;
}

.links {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  // color: #000000;
}

.q-list {
  padding: 2rem 1rem;
}

.avater_side {
  min-width: 0;
}

.q-item.q-router-link--active,
.q-item--active {
  background: #e9e9e9;
  border-radius: 5px;
}
@media (max-width: 900px) {
  .menu {
    display: block;
  }
}
@media (max-width: 500px) {
  .mybtn {
    width: 160px;
  }
  .logo img {
    width: 70px;
    height: 50px;
    object-fit: contain;
  }
  .btn {
    width: 106px;
    height: 36px;
    font-size: 11px;
  }

  .q-btn.logo {
    padding: unset;
  }
}
</style>
