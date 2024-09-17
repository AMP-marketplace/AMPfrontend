<template>
  <div class="donate_card">
    <div class="row items-center justify-between">
      <div style="gap: 1rem" class="row items-center no-wrap">
        <!-- <img src="" alt="" /> -->
        <div>
          <p style="margin-bottom: 0" class="text-weight-bold">
            {{ donatePost?.owner?.name }}
          </p>
          <!-- <small class="text-grey-7"> 8hrs Ago </small> -->
        </div>
      </div>

      <div>
        <span class="text-h4">{{ getCountryFlag(donatePost.country) }}</span>
      </div>
    </div>

    <div style="gap: 1rem" class="row q-mt-sm no-wrap items-center">
      <div style="gap: 1rem; flex: 2" class="row q-mt-sm no-wrap items-center">
        <div>
          <router-link
            :to="{
              name: 'donate.details',
              query: {
                slug: donatePost.slug,
              },
            }"
          >
            <img
              style="max-width: 250px; border-radius: 5px"
              :src="donatePost?.media?.length ? donatePost?.media[0]?.url : ''"
              :alt="donatePost?.name"
            />
          </router-link>
        </div>

        <div>
          <router-link
            :to="{
              name: 'donate.details',
              query: {
                slug: donatePost.slug,
              },
            }"
            ><h4 class="text-h5 text-weight-bold">
              {{ donatePost.name }}
            </h4></router-link
          >
          <p class="text-grey-7 q-mt-sm">
            {{ donatePost.description }}
          </p>
        </div>
      </div>

      <div class="right full-height">
        <div class="column items-end justify-between">
          <div style="white-space: nowrap" class="text3 trans q-mb-lg">
            {{
              formatDistanceToNow(parseISO(donatePost.created_at), {
                addSuffix: true,
              })
            }}
          </div>

          <div class="b">
            <q-btn no-wrap flat no-caps>
              <img style="width: 40px" src="/images/comment.svg" alt="" />
              {{ donatePost?.comments?.length }}
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import countries from "app/countries";
import { formatDistanceToNow, parseISO } from "date-fns";
const props = defineProps({
  donatePost: Object,
});

function getCountryFlag(countryName) {
  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName?.toLowerCase()
  );
  return country ? country.flag : "🏳️"; // Return white flag if country not found
}
</script>

<style lang="scss" scoped>
.donate_card {
  padding: 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
}
</style>
