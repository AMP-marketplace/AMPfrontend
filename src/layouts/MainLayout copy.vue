<template>
  <q-layout view="lHh Lpr lFf">
    <header>
      <div class="q-mx-sm">
        <div class="row items-center no-wrap justify-between">
          <div class="logo">
            <img src="/images/logo.svg" alt="" />
          </div>
          <nav v-if="!$q.screen.lt.md">
            <ul
              style="gap: 1rem"
              class="row items-center no-wrap nav_wrap justify-between"
            >
              <li>
                <router-link to="">{{ $t("home") }}</router-link>
              </li>
              <li>
                <router-link to="">{{ $t("About us") }}</router-link>
              </li>
              <li>
                <router-link to="/pricing">{{ $t("Pricing") }}</router-link>
              </li>
              <li>
                <router-link to="">{{ $t("All stores") }}</router-link>
              </li>
              <li>
                <router-link to="">{{ $t("Donate") }}</router-link>
              </li>
              <li>
                <router-link to="">{{ $t("Job listings") }}</router-link>
              </li>
              <li>
                <router-link to="">{{ $t("Logistics") }}</router-link>
              </li>
              <!-- <li>
                <router-link to="">RFQ</router-link>
              </li> -->
              <li>
                <router-link to="onboarding">
                  <q-btn text-color="black" color="white">
                    {{ $t("Get started") }}
                  </q-btn>
                </router-link>
              </li>
              <li>
                <q-btn-dropdown text-color="black" label="Lang" color="white">
                  <q-list>
                    <q-item
                      clickable
                      v-close-popup
                      :class="language === 'en' ? 'text-blue-10' : ''"
                      @click="changeLanguage('en')"
                    >
                      <q-item-section>
                        <q-item-label>English</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-close-popup
                      @click="changeLanguage('fr')"
                      :class="language === 'fr' ? 'text-blue-10' : ''"
                    >
                      <q-item-section>
                        <q-item-label>French</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="changeLanguage('yo')"
                      :class="language === 'yo' ? 'text-blue-10' : ''"
                    >
                      <q-item-section>
                        <q-item-label>Yoruba</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
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
      </div>
    </header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <div class="row items-center no-wrap justify-between">
        <div class="logo">
          <img src="/images/logo.svg" alt="" />
        </div>
        <q-btn-dropdown text-color="black" label="Lang" color="white">
          <q-list>
            <q-item
              clickable
              v-close-popup
              :class="language === 'en' ? 'text-blue-10' : ''"
              @click="changeLanguage('en')"
            >
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="changeLanguage('fr')"
              :class="language === 'fr' ? 'text-blue-10' : ''"
            >
              <q-item-section>
                <q-item-label>French</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="changeLanguage('yo')"
              :class="language === 'yo' ? 'text-blue-10' : ''"
            >
              <q-item-section>
                <q-item-label>Yoruba</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <q-separator class="q-mb-lg" />
      <q-list>
        <q-item clickable to="">{{ $t("home") }}</q-item>
        <q-item clickable to="">{{ $t("About us") }}</q-item>
        <q-item clickable to="/pricing">{{ $t("Pricing") }}</q-item>
        <q-item clickable to="">{{ $t("All stores") }}</q-item>
        <q-item clickable to="">{{ $t("Donate") }}</q-item>
        <q-item clickable to="">{{ $t("Job listings") }}</q-item>
        <q-item clickable to="">{{ $t("Logistics") }}</q-item>
        <q-item clickable to="">{{ $t("Logistics") }}</q-item>

        <q-item
          style="border-radius: 5px"
          class="bg-secondary flex items-center text-center justify-center text-weight-bold text-white q-mx-md"
        >
          {{ $t("Get started") }}
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
let leftDrawerOpen = ref(false);
let language = ref("en");

function changeLanguage(lang) {
  language.value = lang;
  locale.value = lang;
}
</script>
