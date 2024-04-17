<template>
    <div class="my-4 logo">
        <img src="https://test.it-mil-1.linodeobjects.com/eufutlogo.png"></img>
    </div>
    <div style="display: flex; justify-content: center; text-align: center; align-items: center; flex-direction: column;">
        <h3 class="text-h4">
            <strong>{{ nomeEvento }}</strong>
        </h3>
        <p class="text-caption" style="width: 50%; max-width: 90%;" >
            Per accedere alla diretta bisogna acquistare il proprio biglietto virtuale. Bisognerà quindi inserire la propria mail nell'apposito spazio e 
            procedere con il pagamento. Una volta convalidato riceverete alla mail indicata in fase di registrazione la password generata dal nostro sistema.
            In caso di smarrimento di suddetta password potrà essere richiesta cliccando sul pulsante apposito nella sezione di login. Solo per ulteriori problemi potrete 
            contattarci all'indirizzo mail <a href="">help@bonagacommunication.tv</a> . Grazie e buona visione
        </p>
    </div>
    
    <LoginPayment 
    :idEvento="idEvento"
    ></LoginPayment>
</template>

<script>
import LoginPayment from '@/components/LoginPayment.vue'

export default {
    name: 'SpecialEvent',
    components: {
        LoginPayment
    },
    props: {
        idEvento: {
            required: true
        },
        nomeEvento: {
            type: String,
            required: true
        }, 
        logoSrc: {
        },
        importoBiglietto: {
            
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

.logo img {
    width: 180px;
}

@media screen and (max-width: 600px) { 
    .logo img {
    width: 140px;
}
} 

</style>