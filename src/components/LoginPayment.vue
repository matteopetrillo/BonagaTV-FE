<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="8" md="5">
                <v-container>
                    <v-form>
                        <p class="text-h6 pb-3">
                            Accedi per guardare la diretta
                        </p>
                        <v-text-field v-model="emailLogin" label="Email"></v-text-field>
                        <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                        <div class="text-center">
                            <v-btn class="text-none mb-4" size="large" variant="elevated" @click="authUser">
                                Login
                            </v-btn>
                            <p><a href="">Ho dimenticato la password.</a></p>
                        </div>

                    </v-form>
                </v-container>
            </v-col>

            <v-divider class="ms-3" inset vertical></v-divider>

            <v-col cols="12" sm="8" md="5">
                <v-container>
                    <p class="text-h6 pb-3">
                        Acquista il tuo biglietto virtuale:
                    </p>
                    <p>1. Inserisci la tua mail:</p>
                    <v-text-field v-model="email" label="Email"></v-text-field>
                    <v-divider class="py-2"></v-divider>
                    <p>2. <input type="checkbox" style="margin-bottom: 20px; margin-right: 10px; margin-left: 5px;"><span>Accetto le <a href="">condizioni di utilizzo</a>.</span></p>
                    
                    <v-divider class="py-2"></v-divider>
                    <p>3. Completa la registrazione effettuando il pagamento:</p>
                    <div id="paypal-button-container"></div>
                </v-container>
            </v-col>

        </v-row>

    </v-container>


</template>

<script>
import { login } from '@/services/api.js'
import { loadScript } from '@paypal/paypal-js';
import { baseURL } from '@/services/api.js'
import { mapGetters } from 'vuex';

export default {
    name: 'LoginPayment',
    data() {
        return {
            emailLogin: '',
            emailReg:'',
            password: '',
            checkBoxCondizioni: false,
            idOrdine: null,
            idEvento: null

        }
    },
    computed: {
      ...mapGetters([
        'getIdSpecialEvent'
      ])
    },
    async mounted() {

        this.idEvento = this.$store.getters.getSpecialEvent.idEvento;

        const paypalSdk = await loadScript({
            clientId: 'AZ-KdqJRqNOlHsDUsjH5ul8HB1bpb3X_5KjPrWWvRNHZyNgzNNqhFdSMNYO9_HFWdZysQgqAugN4WoxX',
            currency: 'EUR'
        });
        paypalSdk.Buttons({
            style: {
                layout: 'horizontal',
                label: 'buynow',
                tagline: false
            },
            onClick: (data) => {

            },
            createOrder: function (data, actions) {
                return fetch(baseURL + "/ordine/crea-ordine?id=" + this.idEvento, {
                    method: "POST", headers: { "Content-Type": "application/json" }
                })
                    .then((response) => { return response.json() })
                    .then((res) => {
                        this.idOrdine = res.idOrdine
                        return res.idOrdine
                    })
                    .catch((error) => { console.log(error) });
            },

            onApprove: function (data, actions) {
                const id = data.orderID
                return fetch(baseURL + "/ordine/conferma-ordine?id=" + id, {
                    method: "POST", headers: { "Content-Type": "application/json" }
                })
                    .then((response) => { return response.json() })
                    .then((details) => {
                        console.log(details)

                    })
                    .catch((error) => { console.log(error) })
            },

            onError: function (err) {
                console.log(err)
            }


        }).render('#paypal-button-container')
            .catch((error) => { console.log(error) });
    },
    methods: {

        authUser() {

            login(this.emailLogin, this.password, this.idEvento)
                .then(response => {

                    this.$store.dispatch('setCredentials', { email: this.emailLogin, password: this.password });
                    this.$store.dispatch('setIdUtente', response.idUtente);
                    this.$router.push('special-event');

                })
                .catch(error => {
                    // Se la risposta è 401, mostra il popup di errore
                    console.log("error", error)
                });
        }

    }
}

</script>

<style scoped>
.error-popup {
    max-width: 400px;
    text-align: center;
}

.checkbox-styled .v-input--selection-controls__input {
  border-color: #000; /* Cambia il colore del bordo del checkbox */
}

</style>