<template>
  <v-app id="app">
    <v-main class="bg-white-2">
      <div class="ma-4 logo">
        <img src="../src/assets/bonaga.png"></img>
      </div>
      <v-container>
        <v-row>
          <v-col class="mt-2 mb-n6" cols="12">
            <h2>Canali Live</h2>
          </v-col>
          <v-item-group>
            <v-container>
              <v-row>
                <v-col>
                  <v-item>
                    <ChannelCard :name="nomiCanali[0]" :color="iconColors[0]" />
                  </v-item>
                </v-col>
                
              </v-row>
            </v-container>
          </v-item-group>

          <v-col class="mt-4 mb-n6" cols="12">
            <h2>Canali Offline</h2>
          </v-col>
          <v-item-group>
            <v-container>
              <v-row>
                <v-col>
                  <v-item>
                    <ChannelCard :name="nomiCanali[1]" :color="iconColors[1]" />
                  </v-item>
                </v-col>
                <v-col>
                  <v-item>
                    <ChannelCard :name="nomiCanali[1]" :color="iconColors[1]" />
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-row>
      </v-container>
    </v-main>
    <SponsorFooter/>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const drawer = ref(null)

</script>

<script>
  import SponsorFooter from '../src/components/SponsorFooter.vue'
  import ChannelCard from '../src/components/ChannelCard.vue'

  export default {
    components: {
      SponsorFooter,
      ChannelCard
    },
    data() {
      return {
        drawer: null,
        nomiCanali: ["ARER","ARTA"],
        iconColors: ["red","grey"]
      }
    }
  }
</script>

<style scoped>

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>