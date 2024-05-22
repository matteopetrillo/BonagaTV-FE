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
import { getSpecialEventChannel} from '@/services/api';
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
                    this.$router.push({name: 'HomeView'})
            });
        
        this.connect();
    },
    beforeUnmount() {
        this.disconnect();
    },
    methods: {
        connect() {
            this.socket = new SockJS(process.env.VUE_APP_HEARTBEAT);
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
                {idUtente: this.$route.query.usr},
                error => {
                    console.log(error);
                    this.connect = false;
                }
            );
        },
        disconnect() {
            this.stompClient.disconnect(() => {
                this.connect = false;
            },{idUtente: this.$route.query.usr});
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