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
import { mapGetters } from 'vuex';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

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

    created() {

        getSpecialEventChannel(this.getCredentials)
                .then(response => {
                    this.streamingSrc = response.streamingSrc                        
                })
                .catch(error => {
                    console.log(error)
            });
        
        this.connect();
    },
    beforeUnmount() {
        this.disconnect();

    },
    methods: {
        handleUnload(event) {
            navigator.sendBeacon(baseURL+'/utente/disattiva?id='+this.getIdUtente)
            disattivaUtente(this.getIdUtente)
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
        },
        connect() {
            this.socket = new SockJS("http://localhost:8080/heartbeat");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
                {idUtente: this.getIdUtente},
                error => {
                    console.log(error);
                    this.connect = false;
                }
            );
        },
        disconnect() {
            this.stompClient.disconnect(() => {
                this.connect = false;
            },{idUtente: this.getIdUtente});
        },
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