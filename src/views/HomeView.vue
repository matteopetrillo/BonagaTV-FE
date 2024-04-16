  <template>
    <v-main class="bg-white-2">
      <v-container>
        <v-row>
          <v-col class="mt-2 mb-n6" cols="12">
            <h2>In diretta questa settimana</h2>
          </v-col>
          <v-item-group>
            <v-container>
              <v-row>
                <v-col v-for="(canale, index) in canaliProxLive" :key="index">
                  <v-item>
                    <ChannelCard 
                    :idCanale="canale.id"
                    :nomeCanale="canale.nomeCanale" 
                    :nomeEvento="canale.nomeEvento" 
                    :srcLink="canale.streamingSrc" 
                    :isLive="true"/>
                  </v-item>
                </v-col>             
              </v-row>
            </v-container>
          </v-item-group>

          <v-col class="mt-4 mb-n6" cols="12">
            <h2>I nostri altri canali</h2>
          </v-col>
          <v-item-group>
            <v-container>
              <v-row>
                <v-col v-for="(canale, index) in canaliOffline" :key="index">
                  <v-item>
                    <ChannelCard 
                    :idCanale="canale.id"
                    :nomeCanale="canale.nomeCanale" 
                    :nomeEvento="canale.nomeEvento" 
                    :srcLink="canale.streamingSrc" 
                    :isLive="false"/>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
  import ChannelCard from '../../src/components/ChannelCard.vue';
  import { getCanali } from '../services/api.js';

  export default {
    name: 'HomeView',
    components: {
      ChannelCard
    },
    mounted() {
      getCanali()
        .then(response => {
          this.canaliProxLive = response.canaliProssimamenteLive;
          this.canaliOffline = response.canaliOffline;
        })
        .catch(error => {
        console.error('Errore durante il recupero dei canali:', error);
        })
    },
    data() {
      return {
        canaliProxLive: null,
        canaliOffline: null
      }
    }
  }
</script>


