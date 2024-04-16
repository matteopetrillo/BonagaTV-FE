<template>
  <v-app id="app">
    <RouterView></RouterView>
    <SponsorFooter/>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';
  import SponsorFooter from './components/SponsorFooter.vue';


  const drawer = ref(null)

</script>

<script>
import SponsorFooter from './components/SponsorFooter.vue';

export default {
  name: 'App',
  components: {
    SponsorFooter,
  },
}
</script>