<template>
  <q-card class="q-pa-md card_under">
    <q-card-section>
      <q-input
        v-model="selectedLocation.address"
        label="Search Location"
        ref="autocompleteInput"
      />
    </q-card-section>

    <div id="map" style="width: 100%; height: 400px"></div>

    <q-card-section>
      <q-input
        v-model="selectedLocation.address"
        label="Selected Location"
        readonly
      />
      <q-btn
        label="Confirm Location"
        color="primary"
        @click="confirmLocation"
        class="q-mt-md"
        no-wrap
        no-caps
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";

const selectedLocation = ref({ lat: null, lng: null, address: "" });
const emits = defineEmits(["locationSelected"]);
let map, marker, autocomplete;

onMounted(() => {
  initMap();
});

function initMap() {
  const defaultPosition = { lat: 6.5244, lng: 3.3792 }; // Default: Lagos, Nigeria
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultPosition,
    zoom: 10,
  });

  marker = new google.maps.Marker({
    position: defaultPosition,
    map: map,
    draggable: true,
  });

  const geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    document.querySelector(".q-field__native"), // Target input field
    { types: ["geocode"] }
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    selectedLocation.value.lat = place.geometry.location.lat();
    selectedLocation.value.lng = place.geometry.location.lng();
    selectedLocation.value.address = place.formatted_address;

    marker.setPosition(place.geometry.location);
    map.setCenter(place.geometry.location);
    map.setZoom(14);
  });

  marker.addListener("dragend", (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    selectedLocation.value.lat = lat;
    selectedLocation.value.lng = lng;

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        selectedLocation.value.address = results[0].formatted_address;
      }
    });
  });
}

function confirmLocation() {
  emits("locationSelected", selectedLocation.value);
}
</script>
