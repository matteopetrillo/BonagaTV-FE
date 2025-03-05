<template>
    <v-footer v-if="isVisible" app color="grey-darken-2" class="footer">
      <div class="close-btn" @click="closeFooter">
      <span class="close-text">X</span> 
    </div>
      <div class="container">
        <div class="header">
          <p class="text-h5 text-white scritta-sponsor">
            <strong>{{ $t('sponsor') }}</strong>
          </p>
        </div>
        <div class="sponsors-wrap">
          <div class="sponsor-item">
            <img src="@/assets/bannerQD.jpg" class="sponsor-image">
          </div>
          <div class="sponsor-item">
            <img src="@/assets/ELEMENTA.jpg" class="sponsor-image">
          </div>
          <div class="sponsor-item">
            <img src="@/assets/giannittiBanner.jpg" class="sponsor-image">
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
                isVisible: true
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
  align-items: flex-start;
  opacity: 98%;
  min-height: 20%;
  height: auto;
  flex-wrap: wrap;
}

.container {
  width: 100%;
  text-align: center;
}

.header {
  margin-top: -8px;
  margin-bottom: -3px;
}

.sponsors-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
}

.sponsor-item {
  max-width: 50%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: -15px;
}

.sponsor-image {
  width: auto;
  height: auto;
  max-height: 130px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 2%;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: white;
  border-bottom: 2px solid white; /* Sottolineatura unica */
  line-height: 1; /* Riduce l'altezza della linea di testo */

}

.close-text {
  margin: 0 3px;
  font-weight: bold;
}

/* Aggiungi interazione */
.close-btn:hover {
  color: #e27e2c; /* Cambia colore al passaggio del mouse */
  border-bottom-color: #e27e2c; /* Cambia il colore della sottolineatura */
}


@media screen and (max-width: 600px) {
  .footer {
    padding: 10px;
    min-height: 23%;
    align-items: flex-start;
  }

  .scritta-sponsor {
    font-size: 0.5rem;
  }

  .header {
    margin-top: -4px;
    margin-bottom: 5px;
    }

  .sponsors-wrap {
    gap: 15px;
  }
  .sponsor-item {
    max-width: 45%;
    padding: 2px;
    margin-bottom: -10px;

  }

  .sponsor-image {
    max-height: 50px;
    margin: -4px 0;
  }

}

@media only screen and (min-width: 480px) and (max-width: 767px) and (orientation: landscape) {
  .footer {
    padding: 2px;
    max-height: 10%;
    align-items: flex-start;
  }

  .scritta-sponsor {
    font-size: 18px !important;
  }

  .header {
    margin-top: -4px;
    margin-bottom: 4px;
    }

  .sponsors-wrap {
    gap: 8px;
  }
  .sponsor-item {
    max-width: 45%;
    padding: 2px;
    margin-bottom: -10px;

  }

  .sponsor-image {
    max-height: 40px;
    margin: -12px 0;
  }

}
</style>