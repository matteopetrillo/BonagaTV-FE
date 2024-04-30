<template>
    <v-alert density=“compact” class="popup" closable close-label="Chiudi"
        :color="tipo"><strong>{{ titolo }}</strong> <br> {{ testo }}</v-alert>
</template>

<script>

export default {

    name: 'Alert',
    props: {
    tipo: {
      type: String,
      required: true
    },
    titolo: {
      type: String,
      required: true
    },
    testo: {
      type: String,
      required: true
    }
  }


}


</script>

<style scoped>

.popup {
    max-width: 500px;
    max-height: 170px;
    font-size: small;
}

</style>