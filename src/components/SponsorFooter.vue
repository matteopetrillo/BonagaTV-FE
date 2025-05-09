<template>
    <v-footer v-if="isVisible" app class="footer" elevation="4">
      <div class="close-btn" @click="closeFooter">
        <span class="close-text d-none d-sm-block">{{ $t('chiudiFooter') }}</span>
        <span class="close-icon d-sm-none">×</span>
      </div>
      <div class="container">
        <div class="header">
          <h3 class="text-h5 text-white scritta-sponsor">
            {{ $t('sponsor') }}
          </h3>
        </div>
        <div class="sponsors-wrap">
          <div v-for="(sponsor, index) in sponsorImages" :key="index" class="sponsor-item">
            <img :src="sponsor" class="sponsor-image">
          </div>
        </div>
      </div>
    </v-footer>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getSponsors } from '@/services/api'

    export default {
        name: "SponsorFooter",
        computed: {
        ...mapGetters([
            'getSponsors',
        ])},
        data() {
            return {
                sponsors: null,
                isVisible: true,
                sponsorImages: [
                    require('@/assets/bannerQD.jpg'),
                    require('@/assets/ELEMENTA.jpg'),
                    require('@/assets/giannittiBanner.jpg')
                ]
            }
        },
        methods: {
          closeFooter() {
            this.isVisible = false;
          }
        }
    }
</script>

<style scoped>
.footer {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(66, 66, 66, 0.85), rgba(33, 33, 33, 0.85)) !important;
  backdrop-filter: blur(5px);
  min-height: 140px;
  max-height: 180px;
  height: auto;
  flex-wrap: wrap;
  transition: all 0.3s ease;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.header {
  margin-bottom: 4px; /* Ridotto da 20px */
}

.scritta-sponsor {
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  margin: 0;
  padding-bottom: 8px;
}

.scritta-sponsor::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #e27e2c;
  border-radius: 2px;
}

.sponsors-wrap {
  display: flex;
  justify-content: center;
  align-items: center; /* Aggiunto per allineamento verticale */
  flex-wrap: wrap;
  gap: 15px; /* Ridotto da 30px */
  padding: 0 20px;
}

.sponsor-item {
  flex: 0 1 280px;
  padding: 8px;
  margin-bottom: 15px; /* Aggiunto spazio dal fondo */
}

.sponsor-image {
  width: auto;
  height: auto;
  max-height: 95px; /* Aumentato da 80px */
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  padding: 8px 15px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.close-text {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.close-icon {
  font-size: 24px;
  font-weight: 300;
  color: white;
  line-height: 1;
}

@media screen and (max-width: 600px) {
  .footer {
    padding: 12px 5px 8px 5px;
    min-height: 155px;
    max-height: 180px;
  }

  .header {
    margin-bottom: 6px;
  }

  .scritta-sponsor {
    font-size: 0.95rem !important;
    margin-bottom: 0;
    padding-bottom: 2px;
  }

  .sponsors-wrap {
    gap: 10px;
    padding: 0 6px;
    row-gap: 2px; /* Ridotto da 12px */
  }

  .sponsor-item {
    flex: 0 1 31%;
    padding: 0;
    margin-bottom: 0;
  }

  .sponsor-image {
    max-height: 52px;
  }

  .close-btn {
    top: 8px;
    right: 8px;
    padding: 4px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .close-text {
    font-size: 0.8rem;
  }
}

@media screen and (min-width: 601px) and (max-width: 959px) {
  .footer {
    padding: 20px 15px;
    min-height: 200px;
    max-height: 240px;
  }

  .header {
    margin-bottom: 15px;
  }

  .scritta-sponsor {
    font-size: 1.5rem !important;
    padding-bottom: 6px;
  }

  .scritta-sponsor::after {
    height: 4px;
    width: 80px;
  }

  .sponsors-wrap {
    gap: 12px;
    padding: 0 20px;
    row-gap: 8px;
  }

  .sponsor-item {
    flex: 0 1 30%;
    padding: 0;
  }

  .sponsor-image {
    max-height: 85px;
  }
}

@media only screen and (min-width: 480px) and (max-width: 800px) {
  .footer {
    padding: 8px 5px;
    min-height: 90px;
    max-height: 120px;
  }

  .scritta-sponsor {
    font-size: 0.9rem !important;
    margin-bottom: 2px;
  }

  .sponsors-wrap {
    gap: 12px;
    margin-top: 0;
    justify-content: center;
  }

  .sponsor-item {
    flex: 0 1 140px; /* Dimensione fissa più piccola */
  }

  .sponsor-image {
    max-height: 35px;
  }

  .header {
    margin-bottom: 10px;
  }
}

/* Nuova media query per tablet 800-820px */
@media only screen and (min-width: 700px) and (max-width: 820px) {
  .footer {
    padding: 15px 10px;
    min-height: 150px;
    max-height: 180px;
  }

  .scritta-sponsor {
    font-size: 1.3rem !important;
    margin-bottom: 8px;
  }

  .sponsors-wrap {
    gap: 2px;
    margin-top: 10px;
    padding: 0 10px;
  }

  .sponsor-item {
    flex: 0 1 230px;
    padding: 4px;
    margin-bottom: 8px;
  }

  .sponsor-image {
    max-height: 80px;
  }

  .header {
    margin-bottom: 8px;
  }
}
</style>