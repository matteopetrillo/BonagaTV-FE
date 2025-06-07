<template>
    <div v-if="!this.readyToShow" class="loading">
      <v-progress-circular color="orange" indeterminate></v-progress-circular>
    </div>
    <v-main v-else class="bg-white-2">
        <div class="iframe-wrapper">
            <iframe
            :src="vodUrl"
            allowfullscreen 
            webkitallowfullscreen 
            mozallowfullscreen 
            oallowfullscreen 
            msallowfullscreen>
            </iframe>
        </div>

        <div class="back-button-container">
            <v-btn 
                color="orange" 
                variant="outlined"
                @click="goBack"
                class="back-btn"
            >
                <v-icon left>mdi-arrow-left</v-icon>
                {{ $t('ondemand.tornaAlCatalogo') }}
            </v-btn>
        </div>
    </v-main>
</template>

<script>
import { ondemandAuthApi } from '@/api/ondemand';

export default {
    name: 'VodPlayerView',
    data() {
        return {
            vodUrl: '',
            readyToShow: false
        }
    },
    async created() {
        await this.setVodUrl();
    },
    methods: {
        async setVodUrl() {
            try {
                // Carica il catalogo per trovare il VOD richiesto
                const catalogoData = await ondemandAuthApi.getCatalogo();
                const vodId = this.$route.query.id;
                
                // Cerca il VOD tra quelli acquistati
                const vod = catalogoData.acquistati?.find(item => item.id == vodId);
                
                if (vod && vod.urlVideo) {
                    this.vodUrl = vod.urlVideo;
                } else {
                    // VOD non trovato o non posseduto, reindirizza alla pagina OnDemand
                    this.$router.push(`/${this.$i18n.locale}/ondemand`);
                    return;
                }
                
                this.readyToShow = true;
            } catch (error) {
                console.error('Errore nel caricamento del VOD:', error);
                this.$router.push(`/${this.$i18n.locale}/ondemand`);
            }
        },
        
        goBack() {
            this.$router.push(`/${this.$i18n.locale}/ondemand`);
        }
    }
}
</script>

<style scoped>
.bg-white-2 {
  background: linear-gradient(to bottom, rgba(249, 249, 249, 0.97), rgba(255, 255, 255, 0.97));
  min-height: 100vh;
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
    padding-top: 50px;
}

.iframe-wrapper iframe {
  width: 854px;
  height: 480px;
  border: 0;
}

.back-button-container {
    padding: 20px;
    display: flex;
    justify-content: center;
}

.back-btn {
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.back-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

@media screen and (max-width: 600px) { 
    .iframe-wrapper iframe { 
    width: 90%; 
    height: 65vw;
    padding-top: 7%
    } 
} 
</style>
