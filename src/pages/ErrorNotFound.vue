<template>
  <q-layout>
    <q-header class="header bg-white">
      <div class="">
        <div class="top_nav">
          <div class="container">
            <!-- <div class="left">Mon-Sat : <span>9:00am - 5:00pm</span></div> -->
            <div style="gap: 0.5rem" class="middle row items-center no-wrap">
              <p>
                For advert placements & store features on Africa Medical
                Marketplace(AMP)
              </p>
              <a
                href="mailto:hello@africamedicalmarketplace.com"
                target="_blank"
                >Contact Us</a
              >
            </div>
            <div class="right">
              <!-- <p>
                <span>
                  <a
                    href="mailto:hello@africamedicalmarketplace.com"
                    target="_blank"
                    >hello@africamedicalmarketplace.com</a
                  ></span
                >
              </p> -->
              <div style="gap: 1rem" class="row items-center no-wrap">
                <a
                  target="_blank"
                  href="https://web.facebook.com/africamedicalmarketplace/?_rdc=1&_rdr"
                >
                  <i class="fa-brands fa-facebook"></i
                ></a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/africa_medical_marketplace/"
                >
                  <i class="fa-brands fa-instagram"></i
                ></a>
                <a
                  target="_blank"
                  href="https://ng.linkedin.com/company/africa-medical-marketplace"
                >
                  <i class="fa-brands fa-linkedin"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="down_nav">
          <div class="container">
            <div class="logo">
              <router-link :to="{ name: 'home' }">
                <img src="/images/logo.svg" alt="" />
              </router-link>
            </div>
            <nav class="nav_items_">
              <ul>
                <li class="navLinks">
                  <router-link :to="{ name: 'stores' }">All Stores</router-link>
                </li>
                <!-- <li class="navLinks">
                  <router-link to="">Merchant</router-link>
                </li> -->
                <!-- <li class="navLinks">
                  <router-link to="">Categories</router-link>
                </li> -->
                <li class="navLinks">
                  <router-link :to="{ name: 'explore' }"
                    >All Products</router-link
                  >
                </li>
                <li class="navLinks">
                  <router-link :to="{ name: 'donate' }"
                    >Donate Medical Equipments</router-link
                  >
                </li>
                <!-- <li class="navLinks">
                  <router-link to="">Services</router-link>
                </li> -->
              </ul>
            </nav>

            <div style="gap: 0.5rem" class="row items-center no-wrap">
              <q-btn :to="{ name: 'cart' }" flat>
                <i class="fa-solid text-black fa-cart-shopping"></i>
                <q-badge color="red" floating>{{
                  cartStore.cart.length
                }}</q-badge>
              </q-btn>

              <q-btn v-if="store.token" flat>
                <img
                  style="width: 36px; height: 36px; border-radius: 100%"
                  src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  alt=""
                />
                <q-menu class="q-pa-md">
                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img
                        src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                      />
                    </q-avatar>

                    <div
                      style="white-space: nowrap"
                      class="text-subtitle1 name_text q-mt-md q-mb-xs"
                    >
                      {{
                        store.storedetails.business_name
                          ? store.storedetails.business_name
                          : store.userdetails.name
                      }}
                    </div>
                    <q-btn
                      color="green-7"
                      label="View Dashboard"
                      :to="{
                        name:
                          store.role === 'merchant'
                            ? 'account.dashboard'
                            : 'dashboard',
                      }"
                      push
                      no-caps
                      no-wrap
                      size="sm"
                      v-close-popup
                    />
                    <q-btn
                      color="primary"
                      label="Logout"
                      class="q-mt-sm"
                      no-wrap
                      no-caps
                      push
                      :to="{
                        name: 'logout',
                        query: {
                          redirect: route.name,
                        },
                      }"
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </q-menu>
              </q-btn>

              <q-btn
                v-if="!store.token"
                :to="{
                  name: 'merchant.register',
                }"
                color="primary"
                no-caps
                no-wrap
                rounded
                label="Login"
              />
              <q-btn @click="drawer = !drawer" class="expand_cats" flat>
                <i class="fa-solid text-black fa-bars"></i>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer
      v-model="drawer"
      @click.capture="drawer = !drawer"
      :width="250"
      :breakpoint="800"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <div class="explore_categories">
          <h6 class="text-h5 text-weight-bold q-mb-md">Navigation</h6>

          <q-list>
            <q-item :to="{ name: 'stores' }" clickable> All Stores </q-item>
            <q-item :to="{ name: 'explore' }" clickable> All Products </q-item>
            <q-item :to="{ name: 'donate' }" clickable
              >Donate Medical Equipments</q-item
            >
            <q-item
              v-if="!store.token"
              :to="{ name: 'merchant.register' }"
              clickable
            >
              Register
            </q-item>
            <q-item
              v-if="!store.token"
              :to="{ name: 'merchant.login' }"
              clickable
            >
              Login
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>

    <div class="text-center container py-20 flex flex-center">
      <div>
        <div class="row justify-center items-center">
          <img class="not_found" src="/images/404.jpg" alt="" />
        </div>
        <!-- <div class="text-black pt-10" style="font-size: 15vh">404</div> -->

        <div
          class="text-body1 text-black"
          style="opacity: 0.8; max-width: 800px"
        >
          Oops. We are so sorry we cannot display this page at this time, we are
          working on this currently to bring you more quality, please visit our
          store and product pages to shop unique and exceptional medical
          equipments with a seamless experience...
        </div>

        <div class="q-gutter-sm q-mt-xl row justify-center">
          <q-btn
            color="primary"
            text-color="white"
            unelevated
            :to="{ name: 'home' }"
            label="Go Home"
            no-caps
          />
          <q-btn
            color="primary"
            text-color="white"
            unelevated
            :to="{ name: 'explore' }"
            label="Shop products"
            no-caps
          />
          <q-btn
            color="primary"
            text-color="white"
            unelevated
            :to="{ name: 'stores' }"
            label="Visit stores"
            no-caps
          />
          <q-btn
            color="green-7"
            text-color="white"
            unelevated
            :to="{ name: 'donate' }"
            label="Donations"
            no-caps
          />
        </div>
      </div>
    </div>

    <FooterCompVue />
  </q-layout>
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute } from "vue-router";
import { useCartStore } from "src/stores/cart";
let store = useMyAuthStore();
let route = useRoute();
let cartStore = useCartStore();
let leftDrawerOpen = ref(true);
let drawer = ref(false);
</script>
