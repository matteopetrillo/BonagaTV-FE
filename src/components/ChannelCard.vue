<template>
    <v-card class="mainCard ma-3" border>
        <div class="player-container">
            <iframe 
            class="player"
            :src="srcLink"
            frameborder="0"
            allowfullscreen 
            webkitallowfullscreen 
            mozallowfullscreen 
            oallowfullscreen 
            msallowfullscreen>
            </iframe>
        </div>

        <div class="channel-info">
            <v-avatar class="channelIcon">
                <img :src="channelLogo" />
            </v-avatar>
            <div class="channel-details">
                <div class="channelName" :style="channelNameStyle" @click="openChannel">{{ nomeCanale }}</div>
                <div v-if="nomeEvento" class="liveDescription">{{ nomeEvento }}</div>
            </div>
        </div>
    </v-card>
</template>

<script>
import ChannelView from '@/views/ChannelView.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountCircle } from '@mdi/js';
import { mdiCircle } from '@mdi/js';

export default {
    name: "ChannelCard",
    props: {
        idCanale: {
            type: String
        },
        nomeCanale: {
            type: String
        },
        nomeEvento: {
            type: String
        },
        descCanale: {
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
        SvgIcon,
        ChannelView
    },
    data() {
        return {
            logo: mdiAccountCircle,
            circle: mdiCircle,
        };
    },
    computed: {
        channelNameStyle() {
            const length = this.nomeCanale.length;
            let fontSize;
            
            if (length <= 6) {
                fontSize = '1.2rem'; // Dimensione default per testi corti
            } else if (length <= 13) {
                fontSize = '1.0rem'; // Prima riduzione per testi medi
            } else {
                fontSize = '0.8rem'; // Dimensione minima per testi lunghi
            }
            
            return {
                fontSize: fontSize
            };
        }
    },
    mounted() {
        console.error = () => {};
    },
    methods: {
        openChannel() {
            this.$router.push({
                name: 'ChannelView',
                params: { nomeCanale: this.nomeCanale },
                query: { id: this.idCanale }
            });
        }
    }
};
</script>

<style scoped>
.mainCard {
    width: 100%;
    margin: 0;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mainCard:hover {
    transform: translateY(-5px);
    box-shadow: 4px 8px 15px rgba(0, 0, 0, 0.2);
}

.player-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
}

.player {
    width: 100%;
    height: 12rem;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.channel-info {
    display: flex;
    align-items: center;
    padding: 0.8rem 0.7rem;  /* Reduced padding top and bottom */
    gap: 0.5rem;
    width: 100%;
    position: relative;
    min-height: 4rem; /* Reduced minimum height */
}

.channelIcon {
    position: absolute; /* Position absolute to take it out of flow */
    left: 1rem; /* Increased from 0.7rem to move right */
    width: 3.5rem; /* Increased from 3rem */
    height: 3.5rem; /* Increased from 3rem */
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.channelIcon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.channel-details {
    flex: 1;
    min-width: 0;
    text-align: center;
    padding: 0 4rem; /* Increased from 3.5rem to account for larger icon */
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 2.2rem; /* Reduced minimum height */
}

.channelName {
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    color: #1a1a1a;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: color 0.2s ease, font-size 0.2s ease;
    max-width: 100%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(26, 26, 26, 0.2);
    padding-bottom: 1px;
    display: inline-block;
    padding: 0 0.1rem;
    margin: 0 auto;
    border-bottom: 1px solid rgba(26, 26, 26, 0.2);
    padding-bottom: 0px;
    line-height: 1.3;
}

.channelName:hover {
    color: #e27e2c; /* Change color on hover - using your theme orange color */
    border-bottom-color: #e27e2c;
    border-bottom-width: 2px;
}

.channel-details .channelName {
    font-size: 1.1rem; /* Smaller size only when event name is present */
}

.liveDescription {
    font-size: 0.9rem;
    color: gray;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Add ellipsis for long text */
}

@media screen and (min-width: 1904px) {
    .mainCard {
        max-width: 400px;
    }
}

@media screen and (max-width: 1903px) {
    .mainCard {
        max-width: 350px;
    }
}

@media screen and (max-width: 600px) {
    .mainCard {
        max-width: 100%;
    }
}
</style>