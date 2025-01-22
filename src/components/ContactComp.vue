<template>
  <section class="section">
    <div class="wrap container">
      <div class="grid">
        <div class="">
          <div class="head_text">Get in Touch</div>
          <p class="section-desc contact q-mt-md">
            We're here to answer your questions, provide information, and
            discuss how we can assist you in achieving your goals. Feel free to
            reach out to us using the following contact options:
          </p>
          <form class="q-mt-xl" @submit.prevent="sendMessage">
            <div class="inputs">
              <div class="input">
                <label for="">Full Name</label>
                <input
                  required
                  v-model="data.name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                />
              </div>

              <div class="input">
                <label for="">Email</label>
                <input
                  v-model="data.email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="input">
                <label for="">Phone</label>
                <input
                  v-model="data.phoneNumber"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                />
              </div>
              <!-- <div class="input">
                <label for="">What product is your interest</label>
                <select v-model="data.products">
                  <option
                    v-for="(product, index) in products"
                    :key="index"
                    :value="product.name"
                  >
                    {{ product.name }}
                  </option>
                </select>
              </div> -->
              <div class="input">
                <label for="">Ask your question</label>
                <textarea
                  v-model="data.message"
                  name="message"
                  required
                  id=""
                  cols="20"
                  rows="10"
                ></textarea>
              </div>

              <q-btn
                no-caps
                type="submit"
                :loading="loading"
                class="btn btn-primary q-mt-lg"
                >Send message</q-btn
              >
            </div>
          </form>
        </div>

        <div class="">
          <div class="img">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
              alt=""
            />
          </div>

          <h5>Call Us Today or Leave a Message</h5>

          <div class="hold_det">
            <!-- <div class="call">
              <div class="icon">
                <i class="fa-solid fa-phone"></i>
              </div>

              <div class="det">
                <a href="tel:+2348103394304" class="footer-item-link">
                  08103394304</a
                >
              </div>
            </div> -->
            <div class="call">
              <div class="icon">
                <i class="fa-solid fa-envelope"></i>
              </div>

              <div class="det">
                <div class="">
                  <a
                    href="mailto:info@africamedicalmarketplace.com"
                    class="footer-item-link"
                    >hello@africamedicalmarketplace.com</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="call">
            <div class="det">
              <address style="gap: 1rem" class="row items-start no-wrap">
                <span
                  ><i class="fa-solid text-primary fa-location-dot"></i
                ></span>
                <span>
                  <span class="text-weight-bold"> Corporate Office: </span>
                  Lagos, Nigeria.</span
                >
              </address>
            </div>
          </div>
        </div>
      </div>
      <!-- <div
        class="q-mt-xl"
        style="overflow: hidden; max-width: 100%; width: 100%; height: 500px"
      >
        <div
          id="embed-ded-map-canvas"
          style="height: 100%; width: 100%; max-width: 100%"
        >
          <iframe
            style="height: 100%; width: 100%; border: 0"
            frameborder="0"
            src="https://www.google.com/maps/embed/v1/place?q=awka+road+onitsha&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          ></iframe>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { Notify } from "quasar";
let bar = ref(false);
let loading = ref(false);
let data = ref({ state: "" });

const sendMessage = async () => {
  try {
    let dataa = {
      ...data.value,
    };
    loading.value = true;
    let response = await axios.post(
      // "http://localhost:5000/api/posts",
      "https://formspree.io/f/xkgwdnbo",
      dataa
    );
    loading.value = false;
    data.value = {};
    Notify.create({
      message:
        "Your message has been successfully sent, we are glad to hear from you and we would reach out soon.",
      position: "top-right",
      timeout: 1000000,
      actions: [{ icon: "close", color: "white" }],
      color: "green",
    });
    // console.log(response);
  } catch ({ response }) {
    loading.value = false;
    console.log(response);
  }
};
</script>

<style scoped>
.wrapper {
  padding-top: 3rem;
  position: relative;
  margin: 1rem 0 4rem;
  padding-bottom: 1rem;
}
#g-mapdisplay img {
  max-width: none !important;
  background: none !important;
  font-size: inherit;
  font-weight: inherit;
}
img {
  width: 100%;
}

a {
  display: inline;
}
.mapouter {
  position: relative;
  text-align: right;
  width: 100%;
  height: 400px;
  padding: 4rem 0;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  width: 100%;
  height: 400px;
}
.gmap_iframe {
  width: 100% !important;
  height: 400px !important;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.hold_dia {
  background: white;
  padding: 3rem 1rem;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

/* .det {
  display: flex;
  align-items: flex-start;
  margin: 1rem 0;
  gap: 0.4rem;
} */

.hold_dia .top {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
}

.contact_row {
  gap: 2rem;
}

.head_text {
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
}
.icon {
  display: grid;
  place-items: center;
  animation: zoom 4s infinite;
  transition: all 0.5s ease-in-out;
}

.icon i {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
}

.call {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.call a {
  color: var(--st-patricks-blueL);
  text-decoration: underline;
}

.call .span {
  font-weight: bold;
}

@keyframes zoom {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(0.9);
    opacity: 1;
    transform: scale(1);
  }
}

.head_desc {
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 1rem;
}

label {
  /* color: black; */
  font-style: normal;
  font-weight: 500;
  font-size: 12.3667px;
  line-height: 20px;
}
input {
  border: none;
  background: var(--st-patricks-blueL);
}
.inputs .input input,
.inputs .input textarea,
.inputs .input select {
  background-color: white;
  box-shadow: 2px 0 50px hsla(0, 0%, 0%, 0.2);
  padding: 0.85rem;
  width: 100%;
  margin: 1rem 0;
  color: black;
  border: none;
  border-radius: 3px;
}

::placeholder {
  color: var(--cadet-grey);
  font-size: 12px;
}
.bg {
  width: 150px;
  position: absolute;
  right: 0;
  top: 0%;
}

.img {
  position: relative;
  max-height: 400px;
  margin-bottom: 1rem;
}

.img img {
  /* position: absolute; */
  /* height: 100%; */
  /* object-fit: contain; */
  margin-top: 1rem;
  border-radius: 10px;
}
address {
  font-size: 12px;
}

@media (max-width: 800px) {
  .contact_row {
    flex-wrap: wrap;
  }

  .img {
    position: relative;
    height: 300px;
  }
  h4 {
    font-size: 1.4rem;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 500px) {
  .det div,
  .det a {
    font-size: 13px;
  }

  .det {
    margin: 0;
  }

  .head_text {
    font-size: 25px;
  }
  .head_desc {
    font-size: 18px;
    margin-top: 0;
    padding: 0;
  }
  .inputs .input input,
  .inputs .input textarea {
    font-size: 12px;
  }
}
</style>
