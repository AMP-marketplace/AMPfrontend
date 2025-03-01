<template>
  <div class="wrapperr container">
    <div class="text-center">
      <h4 class="text-h3 text-weight-bold">Testimonials</h4>
    </div>
    <div style="margin: 0 auto" class="other_cards row justify-center">
      <Splide
        :options="{
          rewind: true,
          gap: 10,
          perPage: 5,
          autoScroll: {
            speed: 0.5,
          },
          breakpoints: {
            640: {
              perPage: 1,
            },
            767: {
              perPage: 1,
            },
            1024: {
              perPage: 1,
            },
            2000: {
              perPage: 1,
            },
          },
        }"
        aria-label="My Favorite Images"
      >
        <SplideSlide v-for="(card, index) in cards" :key="index">
          <div class="card bg-primary text-white">
            <div class="q-my-sm">
              <h3 class="text-h4 text-center text-weight-bold">
                {{ card.main }}
              </h3>
            </div>

            <p class="text-center">{{ card.amt }}</p>

            <div class="row justify-end">
              <h3 class="text-weight-bold">
                {{ card.person }}
              </h3>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/vue-splide/css";
import "@splidejs/vue-splide/css/core";
export default {
  components: { Splide, SplideSlide },
  data() {
    return {
      dialog: false,
      plan: [],
      data: {},
      errors: [],
      options: {
        drag: "free",
        rewind: true,
        focus: "center",
        autoWidth: true,
        pagination: true,
        arrows: false,
        gap: 10,
        perPage: 3,
        autoScroll: {
          speed: 0.5,
        },
      },
      // extensions: {
      //   AutoScroll,
      // },
      cards: [
        {
          main: "Mentor",
          person: "Mr. Agan, Kenya",
          amt: "The passion and drive behind Africa Medical Marketplace are truly remarkable. This platform is setting a new standard for healthcare accessibility in Africa, and the team’s dedication to innovation and collaboration is inspiring. They’re not just building a business—they’re creating a movement for change.",
        },
        {
          main: "Project I2M",
          person: "Project I2M",
          amt: "Your hard work and dedication to driving impactful innovation in healthcare are truly inspiring. We are proud to have supported you through the Project I2M program, and we look forward to seeing the positive change your solutions will bring to the community. Together, we can build a healthier and more equitable future for Africa!",
        },
        {
          main: "Data Analysis Expert",
          person: "Professor (Dr.) Yinka",
          amt: "Africa Medical Marketplace is not just solving a supply issue—it’s addressing the deeper, systemic problem of fragmented healthcare data. The platform’s potential to unlock actionable insights is game-changing. I see how AMP is poised to empower providers, NGOs, and governments with better tools to make decisions that save lives. This isn’t just an initiative; it’s a transformative movement redefining healthcare access for Africa.",
        },
        {
          main: "African Manufacturer",
          person: "Mr. Shyne, African Manufacturer (CEO, SeeTok)",
          amt: "AMP has given my small business a place on a global-Africa stage. With their help, I can showcase my products to hospitals and medical professionals across the continent. Their platform and guidance have helped me present my products professionally, making a big difference in my sales and visibility.",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.wrapperr {
  padding: 5rem 0;
}

.main_text {
  font-weight: 900;
  font-size: 34.0381px;
  line-height: 117%;
  text-align: center;
  letter-spacing: 0.1em;
  color: #ffffff;
  padding-top: 7rem;
}
.Omain_text {
  font-weight: 900;
  font-size: 19.9953px;
  line-height: 117%;
  text-align: center;
  letter-spacing: 0.1em;
  color: #ffffff;
  padding-top: 2rem;
}

.card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0.5rem;
  max-width: 300px;
  margin: 0 auto;
}
.Oprice {
  font-weight: 700;
  font-size: 11.2844px;
  line-height: 117%;
  text-align: center;
  letter-spacing: 0.8em;
  color: rgba(255, 255, 255, 0.43);
}
.Oamt {
  font-weight: 700;
  font-size: 16.0034px;
  line-height: 117%;
  text-align: center;
  color: #ffffff;
  padding: 2rem 3rem;
}

.other_cards {
  max-width: 600px;
  .card {
    max-width: 100%;
  }
}

.price {
  font-weight: 700;
  font-size: 19.2095px;
  line-height: 117%;
  text-align: center;
  letter-spacing: 0.8em;
  color: rgba(255, 255, 255, 0.43);
}

h2.amt {
  font-weight: 700;
  font-size: 54.4796px;
  line-height: 117%;
  text-align: center;
  color: #ffffff;
}

p.open {
  font-weight: 400;
  font-size: 26.1502px;
  line-height: 117%;
  text-align: center;
  text-decoration-line: underline;
  color: #ffffff;
  cursor: pointer;
}
.addbor {
  background: #fffbfb;
  border: 6px solid #550619;
}
.pack {
  font-weight: 500;
  font-size: 24px;
  line-height: 117%;
  text-align: center;
  color: #3a1f12;

  margin-top: 2rem;
}
h2.head {
  font-weight: 700;
  font-size: 60px;
  line-height: 117%;
  text-align: center;
  text-transform: capitalize;
  color: #1f1b5e;
}

/* small cards */
.Omain_card {
  border-radius: 6.40068px;
  position: relative;
  padding-top: 3rem;
  min-height: 350px;
  height: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    207.09deg,
    #8d354a 16.92%,
    rgba(171, 4, 44, 0.78) 113.39%
  );
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.Omain_card img {
  width: 90px;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 20.7647px 71.878px 20.7647px rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  object-fit: contain;
  height: 90px;
}

.card {
  border-radius: 6.40068px;
  position: relative;
  padding-top: 3rem;
  min-height: 270px;
  height: 420px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card img {
  width: 90px;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 20.7647px 71.878px 20.7647px rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  object-fit: contain;
  height: 90px;
}

.become {
  margin-top: 4rem;
  background: linear-gradient(180deg, #150f70 0%, #463cdf 100%);
}

@media (min-width: 900px) {
  .other_cards {
    max-width: 600px;
    .card {
      max-width: 100%;
      height: 350px;
    }
  }
}
@media (max-width: 800px) {
  h2.head {
    font-size: 50px;
  }
  h2.amt {
    font-size: 45px;
  }
}
</style>
