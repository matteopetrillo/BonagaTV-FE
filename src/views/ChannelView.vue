<template>
    <div v-if="!this.readyToShow" class="loading">
      <v-progress-circular color="orange" indeterminate></v-progress-circular>
    </div>
    <v-main v-else class="bg-white-2">
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
            streamingSrc: '',
            readyToShow: false
        }
    },
    methods: {
        setStreamingSrc() {
            const canaliOnline = this.getCanaliProxLive
            const canaliOffline = this.getCanaliOffline

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

            this.readyToShow = true;

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