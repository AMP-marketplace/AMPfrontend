<template>
    <div :class="[ bgColor, 'md:w-1/4 md:h-[65em] grid grid-cols-1 grid-flow-row   px-5 py-3 border  rounded-md']">
      <div class="">
        <q-btn :class="[  colorClass , textColor3, ,  'my-2  px-3 py-2 rounded-full']" >{{ title }}</q-btn>
        <p :class=" [ priceColor , 'font-bold text-5xl']">{{ price }} <span class=" text-slate-300 text-xs">/Month</span> </p>
        <p :class="[ textColor,  'text-xs mt-5']">{{ description }}</p>
      </div>
      <div class="   border-b  w-full"></div>
      <ul class="plan-features">
        <li v-for="feature in features" :key="feature.name"  >
          <q-checkbox
            :label="feature.name"
            :class="textColor2"
            v-model="feature.available"
            disable
          />
        </li>
      </ul>
      <div class="" >
      <q-btn :label="buttonLabel"  :class="[  colorClass , textColor3, 'bg-blue-700   rounded-full px-5 py-2']" />

      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    //   color :string,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
    colorClass: {
    type: String,
    default: '', // Use this for general class-based color styling
  },
  bgColor: {
    type: String,
    default: '', // Use this for inline background color styling
  },
  textColor: {
    type: String,
    default: '', // Use this for inline text color styling
  },
  textColor2: {
    type: String,
    default: '', // Use this for inline text color styling
  },
  textColor3: {
    type: String,
    default: '', // Use this for inline text color styling
  },
  priceColor: {
    type: String,
    default: '', // Use this for inline text color styling
  },
  });
  </script>
  
  <style scoped>
  .pricing-plan {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }
  
  .plan-header {
    margin-bottom: 16px;
  }
  
  .plan-features {
    list-style-type: none;
    padding: 0;
    margin: 0 0 16px 0;
  }
  
  .plan-features li {
    margin: 8px 0;
  }
  
  .plan-features li.available {
    
  }
  
  .plan-features li:not(.available) {
    color: gray;
    text-decoration: line-through;
  }
  </style>
  