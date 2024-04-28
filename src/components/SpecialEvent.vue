<template>

    <v-container>

        <v-row>

            <v-col cols="12" sm="12" md="5" lg="6">

                <div class="my-4 logo">
                    <img :src="logoSrc"></img>
                </div>
                <div
                    style="display: flex; justify-content: center; text-align: center; align-items: center; flex-direction: column;">
                    <h3 class="text-h4">
                        <strong>{{ nomeEvento }}</strong>
                    </h3>
                    <p class="text-caption" style="width: 90%; padding-top: 10px; text-align: justify;">
                        Il costo della diretta è di €{{ this.$store.getters.getSpecialEvent.costo }} . Per registrarsi al servizio streaming 
                        bisognerà quindi inserire la propria mail nell'apposito spazio e
                        procedere con il pagamento. Una volta convalidato riceverete alla mail indicata in fase di
                        registrazione la password generata dal nostro sistema.
                        In caso di smarrimento di suddetta password potrà essere richiesta cliccando sul pulsante
                        apposito nella sezione di login. <br> Solo per ulteriori problemi potrete
                        contattarci all'indirizzo mail <a href="">help@bonagacommunication.tv</a> . <br> Grazie e buona
                        visione.
                    </p>
                </div>

            </v-col>

            <v-col cols="12" sm="10" md="7" lg="6">
                <LoginPayment 
                class="loginComponent"
                :idEvento="this.idEvento">
                </LoginPayment>
            </v-col>

        </v-row>

    </v-container>
    <v-divider></v-divider>

</template>

<script>
import LoginPayment from '@/components/LoginPayment.vue'

export default {
    name: 'SpecialEvent',
    components: {
        LoginPayment
    },
    props: {
        nomeEvento: {
            required: true
        }, 
        logoSrc: {
            type: String
        },
        idEvento: {
            required: true
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

.loginComponent {
    padding-top: 12%;
}

@media screen and (max-width: 600px) { 
    .logo img {
        width: 140px;
    }

    .loginComponent {
        padding-top: 2%;
    }
} 

</style>