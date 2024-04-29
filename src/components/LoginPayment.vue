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
                        <v-text-field id="psw" density="compact" v-model="password" label="Password"
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
                <v-alert
                v-if="alertValidEmail"
                density=“compact”
                class="popup"
                closable
                close-label="Chiudi"
                color="error"
                ><strong>Attenzione!</strong> <br> La mail inserita deve essere valida e non deve essere già associata ad un altro account.</v-alert>

                <v-alert
                v-if="alertSuccesso"
                density=“compact”
                class="popup"
                closable
                close-label="Chiudi"
                color="success"
                ><strong>Congratulazioni!</strong> <br> La registrazione è avvenuta con successo. A breve le arriverà una mail con le credenziali per effettuare 
                l'accesso.</v-alert>
                <v-container>
                    <p class="text-h6 pb-3">
                        Registrati al Servizio
                    </p>
                    <p>1. Inserisci e convalida la tua mail:</p>
                    <v-text-field :disabled="emailRegDisabled" density="compact" v-model="emailReg" label="Email"
                        class="mb-n5"></v-text-field>
                    <div class="text-center">
                        <v-btn class="my-3" size="small" variant="elevated" @click="confirmEmail()"
                            :text="this.emailRegDisabled ? 'Modifica Email' : 'Conferma Email'" />
                    </div>
                    <div v-if="this.showPayment">
                        <v-divider class="py-2"></v-divider>
                        <p>2. <label><input :checked="checkBoxCondizioni" type="checkbox"
                                    style="margin-bottom: 20px; margin-right: 10px; margin-left: 5px;"
                                    @change="checkCondizioni()"><span>Accetto le <a href="">condizioni di
                                        utilizzo</a>.</span></label></p>
                    </div>
                    <div v-if="this.checkBoxCondizioni">
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
import { login, registraUtente, registraOrdine, checkDispEmail, sendEmail } from '@/services/api.js'
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
            showPayment: false,
            checkBoxCondizioni: false,
            idOrdine: null,
            emailRegDisabled: false,
            alertValidEmail: false,
            alertSuccesso: false,
            idUtente: null
        }
    },
    watch: {
        checkBoxCondizioni(newVal) {
            if (newVal) {
                this.renderPaypal();
            }
        },
    },
    mounted() {
        document.getElementById('psw').onkeydown = (e) => {
        if(e.keyCode == 13){
            this.authUser();
            }
        };
    },
    methods: {
        ...mapActions(['setCredentials', 'setIdUtente']),
        authUser() {

            login(this.emailLogin, this.password, this.idEvento)
                .then((response) => {
                    this.setCredentials({ email: this.emailLogin, password: this.password });
                    this.setIdUtente(response.idUtente);
                    this.$router.push('special-event');
                })
                .catch(error => {
                    // Se la risposta è 401, mostra il popup di errore
                    console.log("error", error)
                });
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
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Errore nella creazione dell'ordine");   
                            }
                            return response.json();
                        })
                        .then((res) => {
                            this.idOrdine = res.idOrdine;
                            return res.idOrdine;
                        })
                        .catch((error) => { console.log(error) });
                },

                onApprove: (data, actions) => {
                    return fetch(baseURL + "/ordine/conferma-ordine?id=" + this.idOrdine, {
                        method: "POST", headers: { "Content-Type": "application/json" }
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Errore nella cattura del pagamento");
                            }
                            return response.json();
                        })
                        .then((details) => {
                            this.completeRegistration(details);
                            this.resetRegisterFields();
                            this.alertSuccesso = true;
                        })
                        .catch(error => { 
                            console.log(details)
                            console.error("Errore in onApprove",error) 
                        })
                },

                onCancel: (data, actions) => {
                    console.log("ordine cancellato")
                },

                onError: function (err) {
                    console.error("Errore in onError di Paypal",err)
                }


            }).render('#paypal-button-container')
                .catch((error) => { console.log(error) });

        },
        checkCondizioni() {
            this.checkBoxCondizioni = !this.checkBoxCondizioni;
        },
        async confirmEmail() {
            const email = this.emailReg
            const isValidEmail = await this.validaEmail(email)
            if (isValidEmail) {
                this.emailRegDisabled = !this.emailRegDisabled;
                this.showPayment = !this.showPayment;
                this.alertValidEmail = false;
                if (this.checkBoxCondizioni) {
                    this.checkBoxCondizioni = false;
                }
            } else {
                this.alertValidEmail = true
            }
        },

        async validaEmail(email) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (regex.test(email)) {
                try {
                    const dispEmail = await checkDispEmail(email);
                    return dispEmail;
                } catch (error) {
                    return false;
                }   
            } else {
                return false;
            }
        },
        completeRegistration(orderDetails) {
            registraUtente(this.emailReg, this.idEvento)
            .then(response => {
                this.idUtente = response;
                const data = {
                    idUtente: this.idUtente,
                    codiceOrdine: orderDetails.id,
                    codicePagamento: orderDetails.purchase_units[0].payments.captures[0].id,
                    importo: orderDetails.purchase_units[0].payments.captures[0].amount.value
                };
                registraOrdine(data)
                .then(() => {
                    sendEmail(this.idUtente)
                    .catch(error => console.error("Errore durante l'invio della mail all'utente", error))
                } )
                .catch(error => console.error("Errore durante la registrazione dell'ordine", error))

            })
            .catch(error => console.error("Errore durante la registrazione dell'utente", error))
        },
        resetRegisterFields() {
            this.emailRegDisabled = false;
            this.emailReg = '';
            this.showPayment = false;
            this.checkBoxCondizioni = false;
        }
    }
}

</script>

<style scoped>
.popup {
    max-width: 500px;
    max-height: 150px;
    font-size: medium;
}

.checkbox-styled .v-input--selection-controls__input {
    border-color: #000;
    /* Cambia il colore del bordo del checkbox */
}
</style>