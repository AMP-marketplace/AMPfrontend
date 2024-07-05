<template>
    <q-layout view="lHh Lpr lFf">
      <q-header class=" px-10 py-5 bg-white ">
        <div class="row items-center no-wrap  justify-between">
            <div class="logo">
              <img class=" w-[50px] " src="/images/logo.svg" alt="" />
            </div>
            <nav v-if="!$q.screen.lt.md">
              <ul
                style="gap: 1rem"
                class="row deep-purple-8 items-center no-wrap nav_wrap justify-between"
              >
              
                <li>
                  <router-link class="text-black" to="">{{ $t("About us") }}</router-link>
                </li>
                <li>
                  <router-link class="text-black" to="">{{ $t("All stores") }}</router-link>
                </li>
              </ul>
            </nav>
            <q-btn
              v-if="$q.screen.lt.md"
              class="text-white"
              flat
              @click="leftDrawerOpen = !leftDrawerOpen"
              round
              ><i class="ri-menu-2-line text-h5"></i
            ></q-btn>
          </div>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
      <FooterCompVue/>
    </q-layout>
  </template>
  
  <script setup>
import FooterCompVue from "src/components/FooterComp.vue";
  </script>
  
  <style scoped>
  /* Add your styles here if necessary */
  </style>
  