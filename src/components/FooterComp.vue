<template>
  <footer class="footer">
    <div class="container">
      <div class="flex items-center justify-between">
        <h4 class="text-h5 text-weight-bold text-white">
          Africa Medical Marketplace
        </h4>

        <div style="gap: 0.5rem" class="row items-center no-wrap">
          <a
            target="_blank"
            href="https://www.instagram.com/africa_medical_marketplace/"
            ><img src="/images/ig.svg" alt=""
          /></a>
          <a
            target="_blank"
            href="https://web.facebook.com/africamedicalmarketplace/?_rdc=1&_rdr"
            ><img src="/images/fb.svg" alt=""
          /></a>
          <a
            target="_blank"
            href="https://ng.linkedin.com/company/africa-medical-marketplace"
            ><img src="/images/linkedin.svg" alt=""
          /></a>
          <a target="_blank" href=""
            ><img src="/images/twitter.svg" alt=""
          /></a>
          <!-- <a href=""><img src="/images/youtube.svg" alt="" /></a> -->
        </div>
      </div>

      <p class="text-white q-mt-md">
        We are the number 1 Medical Equipment Marketplace for New and Used
        Medical Equipment for sale or Refurbished Medical Equipment In Africa.
        We also offer Medical Equipment related Services Directory
      </p>

      <div class="q-mt-lg">
        <div class="responsive_grid">
          <div>
            <h4 class="text-h6 text-white text-weight-bold">
              How to sell fast
            </h4>
            <q-separator class="bg-white" />
            <p class="text-white q-my-md">
              <router-link to=""> How to upload </router-link>
            </p>
            <p class="text-white q-my-s">
              <router-link to=""> Buy and Sell Quickly </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link to="">Membership </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link to=""> Banner Advertising </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link to=""> Promote your ad </router-link>
            </p>
          </div>
          <div>
            <h4 class="text-h6 text-white text-weight-bold">Information</h4>
            <q-separator class="bg-white" />
            <p class="text-white q-my-md">
              <router-link to=""> Company info </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link to=""> Biomedical </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link to="">Privacy policy </router-link>
            </p>
          </div>
          <div>
            <h4 class="text-h6 text-white text-weight-bold">
              Help and support
            </h4>
            <q-separator class="bg-white" />
            <p class="text-white q-my-md">
              <router-link to=""> FAQ </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link to=""> Contact us </router-link>
            </p>
          </div>
        </div>
      </div>

      <div class="row items-center q-mt-lg justify-between">
        <p class="text-white text-weight-medium">
          © {{ new Date().getFullYear() }} Africa Medical Marketplace. All
          rights reserved.
        </p>
        <p class="text-white text_underline text-weight-medium">
          <router-link to="" class="text_underline"
            >Terms & Condition</router-link
          >
        </p>
        <p class="text-white text-weight-medium">
          <router-link class="text_underline" to=""
            >Terms & Condition</router-link
          >
        </p>
      </div>
    </div>
    <div class="fixed_mvr">
      <div class="vr_btn_hold">
        <a
          href="https://wa.me/+2349046251822"
          target="_blank"
          class="animated-button1"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.fixed_mvr {
  position: fixed;
  bottom: 12%;
  z-index: 10000;
  right: 3%;
  background: #25d366;
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}

.fixed_mvr i {
  font-size: 2.5rem;
  color: #fff;
}
</style>
