<template>
  <footer class="footer">
    <div class="container">
      <div class="flex items-center justify-between">
        <h4 class="text-h5 text-weight-bold text-white">
          Africa Medical Marketplace(AMP)
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
              <a
                download="Upload manual"
                class="ogency-btn"
                href="/images/AMP UPLOAD MANUAL.pdf"
              >
                How to upload
              </a>
            </p>
            <p class="text-white q-my-s">
              <router-link :to="{ name: 'explore' }">
                Buy and Sell Quickly
              </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link :to="{ name: 'plans.page' }"
                >Explore subscription plans
              </router-link>
            </p>
            <!-- <p class="text-white q-my-md">
              <router-link to=""> Banner Advertising </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link to=""> Promote your ad </router-link>
            </p> -->
          </div>
          <div>
            <h4 class="text-h6 text-white text-weight-bold">Explore</h4>
            <q-separator class="bg-white" />
            <p class="text-white q-my-md">
              <router-link :to="{ name: 'explore' }"> Marketplace</router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link :to="{ name: 'donate' }"> Donate </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link :to="{ name: 'biomedical.near.us' }">
                Biomedical near us
              </router-link>
            </p>
            <Translate />
            <!-- <div id="google_translate_element"></div> -->

            <!-- <p class="text-white q-my-md">
              <router-link to="">Blog </router-link>
            </p> -->
          </div>
          <div>
            <h4 class="text-h6 text-white text-weight-bold">
              Help and support
            </h4>
            <q-separator class="bg-white" />
            <p class="text-white q-my-md">
              <router-link :to="{ name: 'faq' }"> FAQ </router-link>
            </p>
            <p class="text-white q-my-md">
              <router-link :to="{ name: 'contact.us' }">
                Contact us
              </router-link>
            </p>
            <p class="text-white q-my-md">
              <a
                href="https://www.amp.africamedicalmarketplace.com/blog/"
                target="_blank"
              >
                Blog
              </a>
            </p>
            <p lass="text-white q-my-md">
              <a
                style="display: inline-block"
                href="http://s11.flagcounter.com/more/HNcw"
                ><img
                  style="
                    display: inline-block;
                    width: 100px;
                    height: 100px;
                    object-fit: contain;
                  "
                  src="https://s11.flagcounter.com/count2/HNcw/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                  alt="Flag Counter"
                  border="0"
              /></a>
            </p>
          </div>
        </div>
      </div>

      <div class="row items-center q-mt-lg justify-between">
        <p class="text-white text-weight-medium">
          © {{ new Date().getFullYear() }} Africa Medical Marketplace(AMP). All
          rights reserved.
        </p>
        <p class="text-white text_underline text-weight-medium">
          <router-link to="" class="text_underline"
            >Terms & Conditions</router-link
          >
        </p>
        <!-- <p class="text-white text-weight-medium">
          <router-link class="text_underline" to=""
            >Terms & Condition</router-link
          >
        </p> -->
      </div>
    </div>
    <div class="fixed_mvr">
      <div class="vr_btn_hold">
        <a
          href="mailto:hello@africamedicalmarketplace.com"
          target="_blank"
          class="animated-button1"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <i class="fa-solid fa-envelope"></i>
        </a>
        <!-- <a
          href="https://wa.me/+2349046251822"
          target="_blank"
          class="animated-button1"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <i class="fa-brands fa-whatsapp"></i>
        </a> -->
      </div>
    </div>
  </footer>
</template>

<script setup>
import Translate from "src/components/Translate.vue";
</script>

<style lang="scss" scoped>
.fixed_mvr {
  position: fixed;
  bottom: 12%;
  z-index: 10000;
  right: 3%;
  background: #254594;
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}

.fixed_mvr i {
  font-size: 2rem;
  color: #fff;
}
</style>
