  <template>
    <v-main class="bg-white-2">
      <SpecialEvent 
      v-if="showSpecialEvent" 
      :nomeEvento="this.specialEvent.nomeEvento"
      :idEvento="this.specialEvent.idEvento"
      :logoSrc="this.specialEvent.logoEventoSrc"
      ></SpecialEvent>
      <v-container>
        <v-row>
          <v-col class="mb-n6" cols="12">
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
  import { mapActions, mapGetters } from 'vuex'
  import ChannelCard from '@/components/ChannelCard.vue'
  import SpecialEvent from '@/components/SpecialEvent.vue'

  export default {
    name: 'HomeView',
    components: {
      ChannelCard,
      SpecialEvent
    },
    computed: {
      ...mapGetters([
        'getCanaliProxLive',
        'getCanaliOffline',
        'getSpecialEvent'
      ])

    },
    created() {
      this.fetchCanali();
    },
    beforeMount() {
      this.canaliProxLive = this.$store.getters.getCanaliProxLive
      this.canaliOffline = this.$store.getters.getCanaliOffline
      this.specialEvent = this.$store.getters.getSpecialEvent
      this.showSpecialEvent = this.specialEvent != null
    },
    data() {
      return {
        canaliProxLive: null,
        canaliOffline: null,
        specialEvent: null,
        showSpecialEvent: false,
      }
    },
    methods: {
      ...mapActions(['fetchCanali']),

    }
  }
</script>


