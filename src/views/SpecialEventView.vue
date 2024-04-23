<template>
    <v-main class="bg-white-2">
        <div class="iframe-wrapper">
            <iframe
            :src="streamingSrc"
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
import { baseURL, getSpecialEventChannel, attivaUtente, disattivaUtente } from '@/services/api';
import { mapActions, mapGetters } from 'vuex'



export default {

    name: 'SpecialEventView',
    computed: {
      ...mapGetters([
        'getCredentials',
        'getIdUtente'
      ])

    },
    data() {
        return {
            streamingSrc: null,
        }
    },

    beforeMount() {
        const credentials = this.$store.getters.getCredentials;

        getSpecialEventChannel(credentials)
                .then(response => {
                    this.streamingSrc = response.streamingSrc                        
                })
                .catch(error => {
                    console.log(error)
            });
        
        attivaUtente(this.$store.getters.getIdUtente)

        window.addEventListener('beforeunload', this.handleUnload)
        window.addEventListener('pagehide', this.handlePageHide)
        document.addEventListener('visibilitychange', this.handleVisibilityChange)

    },
    beforeUnmount() {
        disattivaUtente(this.$store.getters.getIdUtente)

    },
    methods: {
        handleUnload(event) {
            const id = this.$store.getters.getIdUtente
            navigator.sendBeacon(baseURL+'/utente/disattiva?id='+id)
            disattivaUtente(this.$store.getters.getIdUtente)
        },
        handlePageHide(event) {
        // In caso di pagehide, disattiva l'utente
        const id = this.$store.getters.getIdUtente
        navigator.sendBeacon(baseURL+'/utente/disattiva?id='+id)
        disattivaUtente(this.$store.getters.getIdUtente)
        },
        handleVisibilityChange(event) {
        // Se la visibilità del documento diventa "hidden", disattiva l'utente
        if (document.visibilityState === 'hidden') {
            const id = this.$store.getters.getIdUtente
            navigator.sendBeacon(baseURL+'/utente/disattiva?id='+id)
            disattivaUtente(this.$store.getters.getIdUtente)
            }
        }
    },

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

@media screen and (max-width: 600px) { 
    .iframe-wrapper iframe { 
    width: 90%; 
    height: 65vw;
    padding-top: 7%
    } 
} 

</style>