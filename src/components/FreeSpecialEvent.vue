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
        <h2>{{ nomeEvento }}</h2>
    </div>

    <!-- Divider sotto il logo e il titolo -->
    <hr class="divider" />

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
    display: flex;
    justify-content: center; /* Centra l'iframe orizzontalmente */
    align-items: center;
    padding-top: 20px;
    position: relative; /* Usato per allineare il logo */
}

.iframe-wrapper iframe {
    width: 854px;
    height: 480px;
    border: 0;
}

.event-info {
    display: flex;
    align-items: center; /* Allinea verticalmente il titolo con il logo */
    padding-bottom: 40px;
    padding-top: 10px;
    text-align: left;
    position: relative; /* Allineamento preciso rispetto all'iframe */
    margin-left: calc((100% - 854px) / 2); /* Allinea il logo con il bordo sinistro del player */
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

.divider {
    border: 0;
    height: 1px;
    background: #ccc; /* Colore della linea di divisione */
    margin: 0 5%; /* Margini orizzontali per mantenere il divider centrato */
    margin-bottom: 40px; /* Spazio sotto la linea */
    width: 90%; /* Lunghezza della linea */
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
        margin-left: 0; /* Reset del margine per schermi piccoli */
    }
    .event-logo {
        margin-bottom: 10px; /* Spazio tra logo e titolo per layout mobile */
        margin-right: 0;
    }
    .divider {
        margin-left: 5%; /* Mantieni una piccola distanza a sinistra sul mobile */
        width: 90%; /* Assicura che il divider non sia troppo largo su mobile */
    }
} 

</style>
