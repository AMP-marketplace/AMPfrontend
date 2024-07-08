<template>
    <q-page class="bg-background-image h-screen bg-cover bg-center relative">
      <div>
        <div class="md:py-44 py-28  text-white flex flex-col items-center justify-center px-5 md:px-auto">
          <p class="text-white">
            <q-badge color="white" rounded class="q-mr-sm" />Pricing
          </p>
          <div class="flex text-xl items-center justify-center my-5 md:my-0  md:flex-col md:gap-1">
            <h1 class="md:text-4xl leading-5 md:leading-none   font-semibold">Start changing lives today</h1>
            <p class="md:text-4xl  font-semibold">with a plan tailored for you.</p>
          </div>
          <p class="m:w-1/3 my-3 text-center">
            Gain access to our extensive library of components, integration tools, and combinations for selling better products faster, with regular updates.
          </p>
          <div class="flex md:flex-row flex-col my-5 items-center gap-2 relative">
            <p class="text-md">Billing Cycle</p>
            <div class="input_wrap">
              <div class="input">
                <q-btn color="secondary" rounded no-caps no-wrap>Search >></q-btn>
                <input type="text" placeholder="Yearly (Save 30%)" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col items-center justify-center absolute top-[85%] gap-3 md:gap-0 mx-10 md:mx-20">
          <PricingComp
            v-for="plan in plans"
            :key="plan.title"
            :title="plan.title"
            :price="plan.price"
            :description="plan.description"
            :features="plan.features"
            :buttonLabel="plan.buttonLabel"
            :colorClass="plan.colorClass"
            :bgColor="plan.bgColor"
            :textColor="plan.textColor"
            :textColor2="plan.textColor2"
            :textColor3="plan.textColor3"
            :priceColor="plan.priceColor"
          />
        </div>
      </div>
      <div class="md:my-[55em] mt-[250em]">
        <FaqComp />
      </div>
    </q-page>
  </template>
  
  <script setup>
  import FaqComp from '../components/FaqComp.vue';
  import PricingComp from '../components/PricingComp.vue';
  
  const plans = [
    {
      title: 'FREE PLAN',
      price: '$0',
      description: 'A free account gives you access to our library with limited access. Upgrade your plan for greater access.',
      features: [
        { name: 'Chrome Extension', available: true },
        { name: 'Single User Account', available: true },
        { name: 'Limited Searches', available: true },
        { name: '2 Component Libraries', available: true },
        { name: '1 Download per month', available: true },
        { name: 'Customer Support', available: true },
        { name: 'Site Integration', available: false },
        { name: 'Site Analytics Integration', available: false },
        { name: 'Team Library', available: false },
        { name: 'Admin Tools', available: false },
      ],
      buttonLabel: 'You are on this plan',
      colorClass: 'bg-blue-700',
      bgColor: 'bg-white',
      textColor: 'text-black',
      textColor2: 'text-green-800',
      textColor3: 'text-white',
      priceColor: 'text-blue-700 font-bold'
    },
    {
      title: 'SILVER PLAN',
      price: '$39',
      description: 'A silver plan is best for lorem ipsum, lorem ipsum, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      features: [
        { name: 'Chrome Extension', available: true },
        { name: '5 User Accounts', available: true },
        { name: 'Unlimited Searches', available: true },
        { name: '10 Component Libraries', available: true },
        { name: 'Up to 10 Downloads per month', available: true },
        { name: 'Customer Support', available: true },
        { name: 'Site Integration', available: true },
        { name: 'Site Analytics Integration', available: true },
        { name: 'Team Library', available: true },
        { name: 'Admin Tools', available: true },
      ],
      buttonLabel: 'You are on this plan',
      colorClass: 'bg-blue-700',
      bgColor: 'bg-white',
      textColor: 'text-black',
      textColor2: 'text-green-800',
      textColor3: 'text-white',
      priceColor: 'text-blue-700 font-bold'
    },
    {
      title: 'GOLD PLAN',
      price: '$99',
      description: 'A gold plan is for large teams. It gives you access to our library with unlimited access and site integration. Upgrade now.',
      features: [
        { name: 'Chrome Extension', available: true },
        { name: 'More Than 5 Users', available: true },
        { name: 'Limited Searches', available: true },
        { name: 'Unlimited Component Libraries', available: true },
        { name: 'Unlimited Downloads per month', available: true },
        { name: 'Customer Support', available: true },
        { name: 'Site Integration', available: true },
        { name: 'Site Analytics Integration', available: true },
        { name: 'Team Library', available: true },
        { name: 'Admin Tools', available: true },
      ],
      buttonLabel: 'Upgrade to Professional',
      colorClass: 'bg-white',
      bgColor: 'bg-blue-700',
      textColor: 'text-white',
      textColor2: 'text-white font-bold',
      priceColor: 'text-white font-bold'
    },
    {
      title: 'PRO PLAN',
      price: '$99',
      description: 'A pro plan is for large teams. It gives you access to our library with unlimited access and site integration. Upgrade now.',
      features: [
        { name: 'Chrome Extension', available: true },
        { name: 'More Than 5 Users', available: true },
        { name: 'Limited Searches', available: true },
        { name: 'Unlimited Component Libraries', available: true },
        { name: 'Unlimited Downloads per month', available: true },
        { name: 'Customer Support', available: true },
        { name: 'Site Integration', available: true },
        { name: 'Site Analytics Integration', available: true },
        { name: 'Team Library', available: true },
        { name: 'Admin Tools', available: true },
      ],
      buttonLabel: 'You are on this plan',
      colorClass: 'bg-blue-700',
      bgColor: 'bg-white',
      textColor: 'text-black',
      textColor2: 'text-green-800',
      textColor3: 'text-white',
      priceColor: 'text-blue-700 font-bold'
    },
  ];
  </script>
  
  <style lang="scss">
  @import "tailwindcss/utilities";
  
  .bg-background-image {
    @apply bg-cover bg-center;
    background-image: url("/Ampbg.png");
  }
  </style>
  