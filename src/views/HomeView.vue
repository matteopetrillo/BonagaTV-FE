  <template>
    <div v-if="!this.readyToShow" class="loading">
      <v-progress-circular color="orange" indeterminate></v-progress-circular>
    </div>
    <v-main v-else class="bg-white-2">
      <SpecialEvent v-if="this.specialEvent != null" :nomeEvento="this.specialEvent.nomeEvento"
        :logoSrc="this.specialEvent.logoEventoSrc" :idEvento="this.specialEvent.idEvento"></SpecialEvent>
      <v-container>
        <v-row>
          <v-col class="mb-n6" cols="12">
            <h2 class="text-h5"><strong>{{ $t('canaliLive') }}</strong></h2>
          </v-col>
          <v-item-group>
            <v-container>
              <v-row>
                <v-col v-for="(canale, index) in this.canaliOnline" :key="index" cols="12" xs="12" sm="10" md="4"
                  :lg="getNumCols(this.canaliOnline)" :class="{'pr-10' : this.canaliOnline.length < 3}">
                  <v-item>
                    <ChannelCard :idCanale="canale.id" :nomeCanale="canale.nomeCanale" :nomeEvento="canale.nomeEvento"
                      :descCanale="canale.descCanale" :srcLink="canale.streamingSrc" :channelLogo="canale.logoCanale" />
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>

          <v-col class="mt-4 mb-n6" cols="12">
            <h2 class="text-h5"><strong>{{ $t('canaliOffline') }}</strong></h2>
          </v-col>
          <v-item-group>
            <v-container>
              <v-row>
                <v-col v-for="(canale, index) in this.canaliOffline" :key="index" cols="12" xs="12" sm="10" md="4"
                  :lg="getNumCols(this.canaliOffline)">
                  <v-item>
                    <ChannelCard :idCanale="canale.id" :nomeCanale="canale.nomeCanale" :nomeEvento="canale.nomeEvento"
                    :descCanale="canale.descCanale" :srcLink="canale.streamingSrc" :channelLogo="canale.logoCanale" />
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
      this.getData();
    },
    data() {
      return {
        specialEvent: null,
        canaliOnline: null,
        canaliOffline: null,
        readyToShow: false
      }
    },
    methods: {
      ...mapActions(['beginningFetch']),
      async getData() {
          await this.beginningFetch();
          this.specialEvent = this.getSpecialEvent;
          this.canaliOnline = this.getCanaliProxLive;
          this.canaliOffline = this.getCanaliOffline;
          this.readyToShow = true;
      },
      getNumCols(canali) {
          const col = Math.round(12 / canali.length);
          return col > 3 ? col : 3;
      }

    }
  }
</script>

<style scoped>

.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 20vh;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>


