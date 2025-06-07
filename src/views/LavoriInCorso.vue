<template>
<div class="maintenance-container">
    <h1>{{ $t('maintenance.titolo') }}</h1>
    <p>{{ $t('maintenance.messaggio') }}</p>
</div>
</template>

<script>
export default {
name: 'LavoriInCorso'
}
</script>

<style scoped>
.maintenance-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;
  flex-direction: column;
}


</style>