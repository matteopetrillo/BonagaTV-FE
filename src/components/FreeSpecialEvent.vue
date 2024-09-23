<template>
    <div class="iframe-wrapper">
        <iframe
        :src="streamSrc"
        allowfullscreen 
        webkitallowfullscreen 
        mozallowfullscreen 
        oallowfullscreen 
        msallowfullscreen>
        </iframe>
    </div>

    <div class="event-info">
        <!-- Logo dell'evento -->
        <img :src="logoSrc" alt="Event Logo" class="event-logo" />
        
        <!-- Nome dell'evento -->
        <h2 >{{ nomeEvento }}</h2>
    </div>

</template>

<script>

export default {

    name: 'FreeSpecialEvent',
    props: {
        logoSrc: {
            type: String
        },
        nomeEvento: {
            type: String
        },
        streamSrc: {
            type: String
        }
    }
}

</script>

<style scoped>

.iframe-wrapper {
    display: flex; /* Flexbox per centrare il contenuto */
    justify-content: center; /* Allinea al centro orizzontalmente */
    align-items: center; /* Allinea al centro verticalmente */
    padding-top: 20px;
}

.iframe-wrapper iframe {
  width: 854px;
  height: 480px;
  border: 0;
}

.event-info {
    display: flex;
    justify-content: center; /* Allinea il contenuto al centro orizzontalmente */
    align-items: center; /* Allinea verticalmente il titolo con il logo */
    padding-left: 10%; /* Padding a sinistra */
    padding-bottom: 40px; /* Padding in basso */
    padding-left: 5%;
    padding-top: 10px;
    text-align: center; /* Allinea il testo al centro */
}

.event-logo {
    max-width: 100px; /* Imposta la larghezza massima del logo */
    margin-right: 20px; /* Spazio tra il logo e il nome dell'evento */
}

h2 {
    font-size: 24px;
    margin: 0;
    line-height: 1; /* Imposta l'altezza della linea per allineare il testo verticalmente */
}

@media screen and (max-width: 600px) { 
    .iframe-wrapper iframe { 
        width: 90%; 
        height: 65vw;
        padding-top: 7%;
    }
    .event-info {
        flex-direction: column; /* Per dispositivi mobili, posiziona logo e titolo in verticale */
        text-align: center;
    }
    .event-logo {
        margin-bottom: 10px; /* Spazio tra logo e titolo per layout mobile */
        margin-right: 0;
    }
} 

</style>
