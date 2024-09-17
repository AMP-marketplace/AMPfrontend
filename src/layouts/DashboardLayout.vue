<template>
  <q-layout class="side_" view="hHh lpR fFf">
    <q-header class="header bg-white">
      <div class="">
        <div class="top_nav">
          <div class="container">
            <div class="left">Mon-Sat : <span>9:00am - 5:00pm</span></div>
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
                <span
                  >Call Us:
                  <a href="tel:+23408173896002" target="_blank"
                    >(+234) 8173896002</a
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
            <div class="row items-center no-wrap">
              <q-btn :to="{ name: 'cart' }" flat>
                <i class="fa-solid text-black fa-cart-shopping"></i>
                <q-badge color="red" floating>{{
                  cartStore.cart.length
                }}</q-badge>
              </q-btn>

              <q-btn flat>
                <img
                  style="width: 36px; height: 36px; border-radius: 100%"
                  src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  alt=""
                />
                <q-menu style="min-width: 100px" class="q-pa-md">
                  <div style="min-width: 100px" class="column items-center">
                    <q-avatar size="72px">
                      <img
                        src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                      />
                    </q-avatar>

                    <div class="text-subtitle1 q-mt-md q-mb-xs">
                      {{ store.userdetails.name }}
                    </div>

                    <q-btn
                      color="primary"
                      label="View Dashboard"
                      :to="{
                        name:
                          store.role === 'merchant' ? 'all.set' : 'dashboard',
                      }"
                      push
                      no-caps
                      no-wrap
                      size="sm"
                      v-close-popup
                    />
                    <!-- {{ route.name }} -->
                    <q-btn
                      color="primary"
                      label="Logout"
                      no-caps
                      no-wrap
                      :to="{
                        name: 'logout',
                        query: {
                          redirect: route.name,
                        },
                      }"
                      push
                      size="sm"
                      class="q-mt-sm"
                      v-close-popup
                    />
                  </div>
                </q-menu>
              </q-btn>
              <q-btn
                dense
                round
                unelevated
                color="accent"
                icon="menu"
                @click="leftDrawerOpen = !leftDrawerOpen"
              />
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer class="drawer" v-model="leftDrawerOpen" show-if-above bordered>
      <div class="q-mt-lg">
        <h4 class="bigText q-pa-sm q-mb-md">My Dashboard</h4>
        <q-list>
          <q-item
            :to="{ name: 'dashboard' }"
            class="navLinks"
            clickable
            v-ripple
          >
            <q-item-section> Account Dashboard </q-item-section>
          </q-item>
          <!-- <q-item class="navLinks" clickable v-ripple>
            <q-item-section> Favourite Stores </q-item-section>
          </q-item> -->
          <q-item
            :to="{ name: 'user.orders' }"
            class="navLinks"
            clickable
            v-ripple
          >
            <q-item-section> My Orders </q-item-section>
          </q-item>
          <q-item
            :to="{ name: 'user.payment.list' }"
            class="navLinks"
            clickable
            v-ripple
          >
            <q-item-section> Payments </q-item-section>
          </q-item>
          <q-item
            :to="{ name: 'user.messages' }"
            class="navLinks"
            clickable
            v-ripple
          >
            <q-item-section> Messages </q-item-section>
          </q-item>
          <!-- <q-item class="navLinks" clickable v-ripple>
            <q-item-section> My Wishlist </q-item-section>
          </q-item> -->
          <!-- <q-item
            :to="{ name: 'order.tracking' }"
            class="navLinks"
            clickable
            v-ripple
          >
            <q-item-section> Track Order </q-item-section>
          </q-item> -->
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { ref } from "vue";
let store = useMyAuthStore();
import { useCartStore } from "src/stores/cart";
let cartStore = useCartStore();
let leftDrawerOpen = ref(true);
import { useRoute } from "vue-router";
let route = useRoute();
</script>
