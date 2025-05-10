<template>
  <v-main class="bg-white-2">
    <v-container class="py-8 text-center">
      <h2 class="text-h4 font-weight-bold mb-6">{{ $t('tabs.comingSoon') }}</h2>
      <p class="text-body-1">{{ $t('tabs.onDemandDesc') }}</p>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'OnDemandView'
}
</script>

<style scoped>
.bg-white-2 {
  background: linear-gradient(to bottom, rgba(249, 249, 249, 0.97), rgba(255, 255, 255, 0.97));
}
</style>
