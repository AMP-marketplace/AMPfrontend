<template>
    <q-page class="q-pa-md">
      <div class="step-indicator">
        <div :class="circleClass(1)">1</div>
        <div :class="lineClass(1)"></div>
        <div :class="circleClass(2)">2</div>
        <div :class="lineClass(2)"></div>
        <div :class="circleClass(3)">3</div>
      </div>
  
      <div v-if="step === 1" class="step-content flex flex-col my-10 items-center justify-center">
        <StepHeader
          title="Let’s get started. Which of these best describes you?"
          subtitle="We’ll help you get set up based on your business needs"
        />
        <q-form @submit.prevent="onNext">
          <div class="flex gap-5 my-10">
            <q-radio
              v-model="userStatus"
              val="starting"
              label="I'm just starting"
              class="radio-option"
            />
            <q-radio
              v-model="userStatus"
              val="selling"
              label="I'm already selling"
              class="radio-option"
            />
          </div>
          <q-btn type="submit" label="Next" class="submit-btn -end-3/4 " />
        </q-form>
      </div>
  
      <div v-if="step === 2" class="step-content flex flex-col items-center">
        <StepHeader
          title="What do you plan to sell?"
          subtitle="Pick what you want to advertise"
        />
        <q-form @submit.prevent="onNext">
          <div class="grid grid-cols-2 my-10">
            <q-checkbox
              v-for="(item, index) in planOptions"
              :key="index"
              v-model="plans"
              :val="item.value"
              :label="item.label"
              class="checkbox-option"
            />
          </div>
          <q-btn type="submit" label="Next" class="submit-btn -end-3/4" />
        </q-form>
      </div>
  
      <div v-if="step === 3" class="step-content mx-auto flex flex-col items-center">
        <StepHeader
          title="Where would you like to sell?"
          subtitle="Pick as many as you like, you can always change later"
        />
        <q-form @submit.prevent="onFinish">
          <div class="grid grid-cols-2 my-10">
            <q-checkbox
              v-for="(item, index) in items"
              :key="index"
              v-model="plans"
              :val="item.value"
              class=" border border-black w-64 px-5 py-2 rounded-lg"
            >
              <div>
                <p class="font-semibold">{{ item.value }}</p>
                <p class="text-sm text-gray-600">{{ item.label }}</p>
              </div>
            </q-checkbox>
          </div>
          <q-btn to="/sign-up" replace class=" submit-btn  w-40 -end-3/4">Time to Sign-up</q-btn>
        </q-form>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import { useQuasar } from "quasar";
  import StepHeader from './StepHeader.vue';
  
  const step = ref(1);
  const userStatus = ref(null);
  const plans = ref([]);
  const $q = useQuasar();
  
  const onNext = () => {
    if (step.value < 3) {
      step.value++;
    }
  };
  
  const items = Array.from({ length: 4 }, (_, index) => ({
    value: "Online Store",
    label: "Create a fully customizable website",
  }));
  
  const planOptions = [
    { value: "1", label: "Lorem Ipsum 1" },
    { value: "2", label: "Lorem Ipsum 2" },
    { value: "3", label: "Lorem Ipsum 3" },
    { value: "4", label: "Lorem Ipsum 4" },
  ];
  
  const onFinish = () => {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Onboarding Complete!",
    });
  };
  
  const circleClass = (stepNumber) => ({
    'step-circle': true,
    active: step.value === stepNumber,
    completed: step.value > stepNumber,
  });
  
  const lineClass = (stepNumber) => ({
    'step-line': true,
    completed: step.value > stepNumber,
  });
  </script>
  
  <style scoped>
  .step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .step-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid grey;
    display: flex;
    align-items: center;
    justify-content: center;
    color: grey;
    background-color: white;
  }
  
  .step-line {
    width: 100px;
    height: 2px;
    background-color: grey;
  }
  
  .active {
    border-color: rgb(0, 0, 159);
    background-color: rgb(0, 0, 159);
    color: white;
  }
  
  .completed {
    border-color: rgb(0, 0, 159);
    background-color: rgb(0, 0, 159);
    color: white;
  }
  
  .radio-option {
    border: 1px solid;
    padding: 10px;
    width: 200px;
    color: #4a4a4a;
  }
  
  .checkbox-option {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    width: 200px;
  }
  
  .submit-btn {
    display: flex;
    padding: 10px 20px;
    border-radius: 50px;
    color: white;
    background-color: #00009f;
    margin-top: 20px;
  }
  </style>
  