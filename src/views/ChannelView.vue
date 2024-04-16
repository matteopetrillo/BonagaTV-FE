<template>
    <v-main class="bg-white-2">
        <div class="iframe-wrapper">
            <iframe
            :src="canale.streamingSrc"
            allowfullscreen 
            webkitallowfullscreen 
            mozallowfullscreen 
            oallowfullscreen 
            msallowfullscreen>
            </iframe>
        </div>

    </v-main>
</template>



<script>
import { getInfoCanale } from '../services/api.js';

export default {
    name: 'ChannelView',
    mounted() {
        getInfoCanale(this.$route.query.id)
        .then(response => {
        this.canale = response;
        })
        .catch(error => {
        console.error('Errore durante il recupero delle informazioni:', error);
        })
    },
    data() {
        return {
            canale: {
                streamingSrc: '' // Inizializza con un valore vuoto
            }
        }
    }


}

</script>

<style scoped>

.iframe-wrapper {
    text-align: center;
    padding-top: 50px;
}

.iframe-wrapper iframe {
  width: 854px;
  height: 480px;
  border: 0;
}

</style>