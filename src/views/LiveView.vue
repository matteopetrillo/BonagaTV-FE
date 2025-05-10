<template>
  <div v-if="!this.readyToShow" class="loading">
    <v-progress-circular color="orange" indeterminate size="64"></v-progress-circular>
  </div>
  <v-main v-else class="bg-white-2">
    <SpecialEvent v-if="isSpecialEventComplete" 
      :nomeEvento="this.specialEvent.nomeEvento"
      :logoSrc="this.specialEvent.logoEventoSrc" 
      :idEvento="this.specialEvent.idEvento">
    </SpecialEvent>

    <v-container class="py-8">
      <FreeSpecialEvent v-if="this.freeSpecialEvent != null" 
        :nomeEvento="this.freeSpecialEvent.nomeEvento" 
        :logoSrc="this.freeSpecialEvent.logoEventoSrc" 
        :streamSrc="this.freeSpecialEvent.streamingSrc">
      </FreeSpecialEvent>

      <!-- Live Channels Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold mb-6">{{ $t('canaliLive') }}</h2>
        <v-container class="pa-0">
          <v-row dense>
            <v-col v-for="(canale, index) in this.canaliOnline" 
              :key="index" 
              cols="12" 
              sm="6" 
              md="4" 
              lg="3"
              class="channel-col">
              <ChannelCard 
                :idCanale="canale.id" 
                :nomeCanale="canale.nomeCanale" 
                :nomeEvento="canale.nomeEvento"
                :descCanale="canale.descCanale" 
                :srcLink="canale.streamingSrc" 
                :channelLogo="canale.logoCanale" />
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Offline Channels Section -->
      <section>
        <h2 class="text-h4 font-weight-bold mb-6">{{ $t('canaliOffline') }}</h2>
        <v-container class="pa-0">
          <v-row dense>
            <v-col v-for="(canale, index) in this.canaliOffline" 
              :key="index" 
              cols="12" 
              sm="6" 
              md="4" 
              lg="3"
              class="channel-col">
              <ChannelCard 
                :idCanale="canale.id" 
                :nomeCanale="canale.nomeCanale" 
                :nomeEvento="canale.nomeEvento"
                :descCanale="canale.descCanale" 
                :srcLink="canale.streamingSrc" 
                :channelLogo="canale.logoCanale" />
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-container>
  </v-main>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ChannelCard from '@/components/ChannelCard.vue'
  import SpecialEvent from '@/components/SpecialEvent.vue'
  import FreeSpecialEvent from '@/components/FreeSpecialEvent.vue'

  export default {
    name: 'LiveView',
    components: {
      ChannelCard,
      SpecialEvent,
      FreeSpecialEvent
    },
    computed: {
      ...mapGetters([
        'getCanaliProxLive',
        'getCanaliOffline',
        'getSpecialEvent',
        'getFreeSpecialEvent'
      ]),
      isSpecialEventComplete() {
        return this.specialEvent && 
               this.specialEvent.nomeEvento && 
               this.specialEvent.logoEventoSrc && 
               this.specialEvent.idEvento;
      }
    },
    created() {
      this.getData();
      
    },
    data() {
      return {
        specialEvent: null,
        canaliOnline: null,
        canaliOffline: null,
        freeSpecialEvent: null,
        readyToShow: false
      }
    },
    methods: {
      ...mapActions(['beginningFetch']),
      async getData() {
          await this.beginningFetch();
          this.specialEvent = this.getSpecialEvent;
          this.canaliOnline = this.getCanaliProxLive;
          this.canaliOffline = this.getCanaliOffline;
          this.freeSpecialEvent = this.getFreeSpecialEvent;
          this.readyToShow = true;
      },
      getNumCols(canali) {
          const col = Math.round(12 / canali.length);
          return col > 3 ? col : 3;
      }

    },
    mounted() {
      // Animazione delle carte al caricamento
      const cards = document.querySelectorAll('.channel-col');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }
</script>

<style scoped>
.v-main {
  background: linear-gradient(to bottom, rgba(249, 249, 249, 0.97), rgba(255, 255, 255, 0.97));
  position: relative;
  overflow-x: hidden;
}

.v-main::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 100% 50%, rgba(226, 126, 44, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(226, 126, 44, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.v-container {
  position: relative;
  z-index: 1;
  animation: fadeIn 0.8s ease-out;
}

.v-container.py-8 {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 2rem 2rem 2rem;  /* Aggiunto padding top di 2rem */
}

.loading {
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 80px;
  height: 80px;
  background: transparent;
}

.iframe-wrapper {
  text-align: center;
  padding: 3rem 0;
}

.iframe-wrapper iframe {
  width: 854px;
  height: 480px;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.channel-col {
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 12px;
  opacity: 0;
  animation: slideIn 0.6s ease-out forwards;
  min-width: 300px; /* Aggiunto per mantenere una larghezza minima */
  flex: 1;
}

section {
  position: relative;
  padding: 1.5rem 0;  /* Aumentato da 0.5rem a 1.5rem */
  margin: 1.5rem 0;   /* Aumentato da 0.5rem a 1.5rem */
  text-align: center;
}

section:first-of-type {
  margin-top: 0;  /* Rimosso il margine negativo */
  padding-top: 1rem;  /* Aggiunto padding top */
}

section:hover {
  transform: none;
}

section h2 {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;  /* Ridotto da 2.5rem */
  font-family: 'Montserrat', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(30deg, #1a1a1a 30%, #e27e2c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 2px;  /* Ridotto da 5px */
  width: 100%;
  text-align: center;
}

section h2::after {
  content: '';
  position: absolute;
  bottom: -8px;  /* Cambiato da -12px */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 120px;
  height: 4px;
  background: linear-gradient(to right, #e27e2c, rgba(226, 126, 44, 0.5));
  border-radius: 2px;
  transition: width 0.3s ease;
  opacity: 0.9;
}

section h2:hover::after {
  width: 140px;
}

.mb-12 {
  margin-bottom: 0 !important;  /* Ridotto da 0.3rem a 0 */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.channel-col:nth-child(1) { animation-delay: 0.1s; }
.channel-col:nth-child(2) { animation-delay: 0.2s; }
.channel-col:nth-child(3) { animation-delay: 0.3s; }
.channel-col:nth-child(4) { animation-delay: 0.4s; }

@media screen and (max-width: 1000px) {
  .iframe-wrapper iframe {
    width: 90%;
    height: 65vw;
  }

  .channel-col {
    min-width: 280px;  /* Ridotto leggermente per schermi più piccoli */
  }

  section h2 {
    font-size: 1.8rem !important;
    margin-bottom: 2rem;
  }

  section h2::after {
    max-width: 100px;
    height: 3px;
    bottom: -8px;
  }
}

@media screen and (max-width: 600px) {
  .v-container.py-8 {
    padding: 1rem 0.5rem;
  }
  
  .channel-col {
    min-width: unset;  /* Rimuove la larghezza minima su mobile */
    width: 100%;
  }

  section {
    padding: 1rem 0;
    margin: 0.5rem 0;
  }
  
  section:hover {
    transform: none;
  }

  section h2 {
    font-size: 1.5rem !important;
    letter-spacing: -0.3px;
  }

  section h2::after {
    max-width: 80px;
  }
}

</style>