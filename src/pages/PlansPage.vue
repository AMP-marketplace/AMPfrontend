<template>
  <q-layout class="page_">
    <div class="wrapper q-mb-xl">
      <div class="main_title">Africa Medical Marketplace Plans</div>
      <div class="sub_title">Choose a plan that fits your need</div>
      <div
        style="gap: 1rem"
        class="row justify-center q-mb-lg items-center no-wrap"
      >
        <!-- {{ planView }} -->
        <q-btn
          :class="planView === 'month' ? 'bg-green-7 text-white' : 'bg-grey-4'"
          no-wrap
          no-caps
          @click="setView('month')"
        >
          Monthly
        </q-btn>
        <q-btn
          :class="planView === 'year' ? 'bg-green-7 text-white' : 'bg-grey-4'"
          no-wrap
          @click="setView('year')"
          no-caps
        >
          Yearly
        </q-btn>
      </div>
      <div class="load">
        <div v-if="loading" class="row justify-center">
          <q-card>
            <q-skeleton width="200px" height="100px" />
          </q-card>
        </div>
      </div>
      <div class="card_wrap">
        <div v-if="!loading" class="div">
          <PlanCardVue
            v-for="(plan, index) in businessPlans"
            :key="index"
            :plan="plan"
            :view="planView"
            :planDesc="planView"
            :loadingsign="loading"
          />
        </div>
      </div>

      <!-- <q-btn @click="cancelProcess" class="close_">
        <i class="fa-solid fa-xmark"></i>
      </q-btn> -->
    </div>
    <FooterCompVue />
  </q-layout>
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import PlanCardVue from "src/components/PlanCardtest.vue";
// import PlanCardVue from "src/components/PlanCard.vue";
import { onMounted, ref } from "vue";

let businessPlans = ref([]);
let loading = ref(true);
let planView = ref("year");
let errors = ref({});
let plans = ref([
  {
    name: "Seller",
    img: "sellerplan.png",
    amount: "1000",
    containing: [
      {
        title: "Make up to 10 Listings",
      },
    ],
  },
]);

let setView = (view) => {
  planView.value = view;
  loading.value = true;
  authAxios
    .get(`subscription/plans?duration=${view}`)
    .then((response) => {
      console.log(response);
      loading.value = false;
      businessPlans.value = response.data.data;
    })
    .catch(({ response }) => {
      loading = false;
      errors.value = response.errors || {};
    });
};
// let cancelProcess = () => {
//   if ($router.currentRoute.value.query.getplan === "yes") {
//     $router.replace({
//       name: "business.dashboard",
//       query: { videotour: "yes" },
//     });
//   } else {
//     $router.replace({
//       name: "business.dashboard",
//     });
//   }
// };
let getPlans = () => {
  authAxios
    .get("subscription/plans?duration=year")
    .then((response) => {
      console.log(response);
      loading.value = false;
      businessPlans.value = response.data.data;
    })
    .catch(({ response }) => {
      loading = false;
      errors.value = response.errors || {};
    });
};

onMounted(() => {
  getPlans();
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 5rem 3rem 0 3rem;
  position: relative;
}
.close_ {
  position: absolute;
  right: 1%;
  font-size: 2rem;
  height: auto;
  color: #f5f5f5;
  top: -4%;
}
.main_title {
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  text-align: center;
}

.sub_title {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;

  margin-bottom: 2rem;
}

.card_wrap .div {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  position: relative;
}

.card:nth-child(1) img:last-of-type {
  width: 35px;
  height: 35px;
}
.card:nth-child(2) img:last-of-type {
  width: 52px;
  height: 37px;
}
.card:nth-child(3) img:last-of-type {
  width: 58px;
  height: 32px;
}
.card:nth-child(4) img:last-of-type {
  width: 93px;
  height: 35px;
}
.img_wrap {
  position: relative;
  margin-top: 2rem;
}

.img_wrap img:first-of-type {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.img_wrap img:last-of-type {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.card {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
  min-width: 100%;
  // min-width: 300px;
  min-height: 321px;
  // min-height: 351px;
  padding: 1rem;
}

.title {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #000000;
}

.amount {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: center;

  margin-top: 1rem;
}

.amount .small {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.365em;
  text-transform: uppercase;
}

.btn {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10%;
  background: white;
  left: 50%;
  transform: translateX(-50%);
}

.btn .q-btn {
  text-transform: capitalize;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 8px;
}

.options {
  margin: 1.5rem 0;
}
.options ul li {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin: 0.4rem 0;
}
</style>
