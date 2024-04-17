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
import { mapGetters } from 'vuex';

export default {
    name: 'ChannelView',

    computed: {
      ...mapGetters([
        'getCanaliProxLive',
        'getCanaliOffline'
      ])

    },
    created() {
        this.setStreamingSrc()
    },
    data() {
        return {
            streamingSrc: ''
        }
    },
    methods: {
        setStreamingSrc() {
            const canaliOnline = this.$store.getters.getCanaliProxLive
            const canaliOffline = this.$store.getters.getCanaliOffline

            canaliOnline.forEach((element,index) => {
                if (element.id == this.$route.query.id) {
                    this.streamingSrc = element.streamingSrc
                }
            })

            if (this.streamingSrc == '') {
                canaliOffline.forEach((element,index) => {
                if (element.id == this.$route.query.id) {
                    this.streamingSrc = element.streamingSrc
                    }
                })
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

@media screen and (max-width: 600px) { 
    .iframe-wrapper iframe { 
    width: 90%; 
    height: 65vw;
    padding-top: 7%
    } 
} 

</style>