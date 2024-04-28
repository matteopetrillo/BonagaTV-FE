<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="10" md="5">
                <v-container>
                    <v-form>
                        <p class="text-h6 pb-3">
                            Accedi per guardare la diretta
                        </p>
                        <v-text-field density="compact" v-model="emailLogin" label="Email"></v-text-field>
                        <v-text-field density="compact" v-model="password" label="Password"
                            type="password"></v-text-field>
                        <div class="text-center">
                            <v-btn class="mb-4" size="large" variant="elevated" @click="authUser">
                                Login
                            </v-btn>
                            <p><a href="">Ho dimenticato la password</a></p>
                        </div>

                    </v-form>
                </v-container>
            </v-col>

            <v-divider class="ms-3" inset vertical></v-divider>

            <v-col cols="12" sm="10" md="6">
                <v-container>
                    <p class="text-h6 pb-3">
                        Registrati al Servizio
                    </p>
                    <p>1. Inserisci e convalida la tua mail:</p>
                    <v-text-field density="compact" v-model="emailReg" label="Email" class="mb-n5"></v-text-field>
                    <div class="text-center">
                        <v-btn class="my-3" size="small" variant="elevated" @click="this.isEmailValid = true">
                            Conferma Mail
                        </v-btn>
                    </div>
                    <div v-if="this.isEmailValid">
                        <v-divider class="py-2"></v-divider>
                        <p>2. <input type="checkbox"
                                style="margin-bottom: 20px; margin-right: 10px; margin-left: 5px;"><span>Accetto le <a
                                    href="">condizioni di utilizzo</a>.</span></p>

                        <v-divider class="py-2"></v-divider>
                        <p>3. Completa la registrazione effettuando il pagamento:</p>
                        <div id="paypal-button-container"></div>
                    </div>
                </v-container>
            </v-col>

        </v-row>

    </v-container>


</template>

<script>
import { login } from '@/services/api.js'
import { loadScript } from '@paypal/paypal-js';
import { baseURL } from '@/services/api.js'
import { mapActions } from 'vuex';

export default {
    name: 'LoginPayment',
    props: {
        idEvento: {
            required: true
        }
    },
    data() {
        return {
            emailLogin: '',
            emailReg: '',
            password: '',
            isEmailValid: false,
            checkBoxCondizioni: false,
            idOrdine: null,

        }
    },
    watch: {
        isEmailValid(newVal) {
            if (newVal) {
                this.renderPaypal();
            }
        }
    },
    methods: {
        ...mapActions(['setCredentials', 'setIdUtente']),
        authUser() {

            login(this.emailLogin, this.password, this.idEvento)
                .then(response => {

                    this.setCredentials({ email: this.emailLogin, password: this.password });
                    this.setIdUtente(response.idUtente);
                    this.$router.push('special-event');

                })
                .catch(error => {
                    // Se la risposta è 401, mostra il popup di errore
                    console.log("error", error)
                });
        },

        completeUserRegistration(orderDetails) {
            console.log(orderDetails)
            console.log(this.emailReg)
        },

        async renderPaypal() {
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
                createOrder: (data, actions) => {
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

                onApprove: (data, actions) => {
                    return fetch(baseURL + "/ordine/conferma-ordine?id=" + this.idOrdine, {
                        method: "POST", headers: { "Content-Type": "application/json" }
                    })
                        .then((response) => { return response.json() })
                        .then((details) => {
                            this.completeUserRegistration(details)
                        })
                        .catch((error) => { console.log(error) })
                },

                onCancel: (data, actions) => {
                    console.log("ordine cancellato")
                },

                onError: function (err) {
                    console.log(err)
                }


            }).render('#paypal-button-container')
                .catch((error) => { console.log(error) });

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
    border-color: #000;
    /* Cambia il colore del bordo del checkbox */
}
</style>