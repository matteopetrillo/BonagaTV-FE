<template>
    <v-card class="mainCard ma-3" border>
        <iframe 
        class="player"
        id="ce1e9100-ab79-714b-0ef6-d31d21f25b8f" 
        :src="srcLink"
        frameborder="0"
        allowfullscreen 
        webkitallowfullscreen 
        mozallowfullscreen 
        oallowfullscreen 
        msallowfullscreen>
        </iframe>
        <div class="channel">
            <v-avatar class="channelIcon">
                <svg-icon type="mdi" :path="logo" size="60"></svg-icon>
            </v-avatar>
            <div class="channelInfo">
                <div class="channelName">{{ nomeCanale }}</div>
                <div class="liveDescription"> {{ nomeEvento }} </div>
            </div>
            <!-- <div class="liveIcon">
                <svg-icon :color="isLive ? 'red' : 'grey'" type="mdi" :path="circle"></svg-icon>
            </div> -->
        </div>
    </v-card>
</template>

<script> 
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountCircle   } from '@mdi/js'
import { mdiCircle } from '@mdi/js'

export default {
    name: "ChannelCard",
    props: {
        nomeCanale: {
            type: String
        },
        nomeEvento: {
            type: String
        },
        isLive: {
            type: Boolean
        },
        color: {
            type: String
        },
        srcLink: {
            type: String
        },
        channelLogo: {
            type: String
        }
    },
    components: {
		SvgIcon
    },
    data() {
        return {
            logo: mdiAccountCircle,
            circle: mdiCircle,
        }
    }
}

</script>

<style scoped>

.mainCard {
    max-width: 18.5rem;
    max-height: 13rem;
    margin: auto;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
}


.channel {
    display: flex;
    align-items: center;
    padding: 2px;
}

.channelInfo {
    flex: 1;
}

.channelName {
    font-size: 1rem;
    font-weight: bold;
}

.liveDescription {
    font-size: 0.8rem;
    color: grey;
    margin-bottom: 0.4rem;

}

.channelIcon {
    margin-left: 0.7rem;
    margin-right: 0.7rem;
    margin-bottom: 8px;
}

.liveIcon {
    justify-content: right;
    margin-right: 0.7rem;
}

</style>