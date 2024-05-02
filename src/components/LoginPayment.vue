<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="10" md="5">
                <Alert v-if="showAlertLogin" :tipo="tipoAlertLogin" :titolo="titoloAlertLogin" :testo="testoAlertLogin">
                </Alert>

                <v-container>
                    <v-form>
                        <p class="text-h6 pb-3">
                            <strong>{{ $t('login.titolo') }}</strong> 
                        </p>
                        <v-text-field density="compact" v-model="emailLogin" label="Email"></v-text-field>
                        <v-text-field id="psw" density="compact" v-model="password" label="Password"
                            type="password"></v-text-field>
                        <div class="text-center">
                            <v-btn class="mb-4" size="large" variant="elevated" @click="authUser">
                                Login
                            </v-btn>
                            <p><a href="#" @click="handleLostPsw()">Ho dimenticato le credenziali</a></p>
                        </div>
                    </v-form>
                </v-container>
            </v-col>

            <v-divider class="ms-3" inset vertical></v-divider>

            <v-col cols="12" sm="10" md="6">
                <Alert v-if="showAlertRegistrazione" :tipo="tipoAlertReg" :titolo="titoloAlertReg"
                    :testo="testoAlertReg"></Alert>

                <v-container>
                    <p class="text-h6 pb-3">
                        <strong>Registrati al Servizio</strong> 
                    </p>
                    <p>1. Inserisci e convalida la tua mail:</p>
                    <v-text-field :disabled="emailRegDisabled" density="compact" v-model="emailReg" label="Email"
                        class="mb-n5" id="email-reg"></v-text-field>
                    <div class="text-center">
                        <v-btn class="my-3" size="small" variant="elevated" @click="confirmEmail()"
                            :text="this.emailRegDisabled ? 'Modifica Email' : 'Conferma Email'" />
                    </div>
                    <div v-if="this.showPayment">
                        <v-divider class="py-2"></v-divider>
                        <p>2. <label><input :checked="checkBoxCondizioni" type="checkbox"
                                    style="margin-bottom: 20px; margin-right: 10px; margin-left: 5px;"
                                    @change="checkCondizioni()"><span>Accetto le <a href="http://www.andreabonaga.it/node/9">condizioni di
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
import Alert from '@/components/Alert.vue';

export default {
    name: 'LoginPayment',
    components: {
        Alert
    },
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
            idUtente: null,
            showAlertRegistrazione: false,
            tipoAlertReg: '',
            titoloAlertReg: '',
            testoAlertReg: '',
            tipoAlertLogin: '',
            titoloAlertLogin: '',
            testoAlertLogin: '',
            showAlertLogin: false,
        }
    },
    watch: {
        checkBoxCondizioni(newVal) {
            if (newVal) {
                this.renderPaypal();
            }
        },
        showAlertRegistrazione(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.showAlertRegistrazione = false
                }, 10000)
            }
        },
        showAlertLogin(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.showAlertLogin = false
                }, 10000)
            }
        }
    },
    mounted() {
        document.getElementById('psw').onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.authUser();
            }
        };
        document.getElementById('email-reg').onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.confirmEmail();
            }
        };
    },
    methods: {
        ...mapActions(['setCredentials', 'setIdUtente']),
        async authUser() {
            try {
                const response = await login(this.emailLogin, this.password, this.idEvento);
                if (response.ok) {
                    const responseData = await response.json();
                    this.setCredentials({ email: this.emailLogin, password: this.password });
                    this.setIdUtente(responseData.idUtente);
                    this.$router.push('special-event');
                } else if (response.status == 409) {
                    this.showAlertLoginFunction("error", "Attenzione!", "La connessione non può essere effettuata da due dispositivi contemporaneamente. Si prega di disconnetterne uno e riprovare.");
                } else if (response.status == 401) {
                    this.showAlertLoginFunction("error", "Attenzione!", "Le credenziali fornite non sono corrette o l'utenza non è registrata al servizio. Si prega di ricontrollare la mail inviata con le credenziali o effettuare la registrazione al servizio.");
                } else {
                    throw new Error("Errore imprevisto nel login: status " + response.status);
                }

            } catch (error) {
                console.error("Errore durante l'autenticazione", error);
            }
        },
        async renderPaypal() {
            try {
                const paypalSdk = await loadScript({
                    clientId: process.env.VUE_APP_PAYPAL_ID,
                    currency: 'EUR'
                });
                paypalSdk.Buttons({
                    style: {
                        layout: 'horizontal',
                        label: 'buynow',
                        tagline: false
                    },
                    onClick: (data) => { },
                    createOrder: async (data, actions) => {
                        try {
                            const response = await fetch(baseURL + "/ordine/crea-ordine?id=" + this.idEvento, {
                                method: "POST", headers: { "Content-Type": "application/json" }
                            });
                            if (!response.ok) {
                                throw new Error("Errore nella creazione dell'ordine");
                            }
                            const res = await response.json();
                            this.idOrdine = res.idOrdine;
                            return res.idOrdine;
                        } catch (error) {
                            console.error("Errore durante la creazione dell'ordine", error);
                        }
                    },
                    onApprove: async (data, actions) => {
                        try {
                            const response = await fetch(baseURL + "/ordine/conferma-ordine?id=" + this.idOrdine, {
                                method: "POST", headers: { "Content-Type": "application/json" }
                            });
                            if (!response.ok) {
                                throw new Error("Errore nella cattura del pagamento");
                            }
                            const details = await response.json();
                            this.completeRegistration(details);
                            this.resetRegisterFields();
                            this.showAlertReg("success","Congratulazioni!","La registrazione è avvenuta con successo. A breve le arriveranno le credenziali di accesso alla mail utilizzata durante la registrazione.")
                        } catch (error) {
                            console.error("Errore in onApprove", error);
                        }
                    },
                    onCancel: (data, actions) => {
                        console.log("ordine cancellato")
                    },
                    onError: function (err) {
                        console.error("Errore in onError di Paypal", err)
                    }
                }).render('#paypal-button-container');
            } catch (error) {
                console.error("Errore durante il rendering di Paypal", error);
            }
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
                this.showAlertRegistrazione = false;
                if (this.checkBoxCondizioni) {
                    this.checkBoxCondizioni = false;
                }
            } else {
                this.showAlertReg("error", "Attenzione!", "La mail inserita non è valida o già associata ad un altro utente.")
            }
        },

        async validaEmail(email) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (regex.test(email)) {
                try {
                    const dispEmail = await checkDispEmail(email);
                    return dispEmail == 0;
                } catch (error) {
                    return false;
                }
            } else {
                return false;
            }
        },
        async completeRegistration(orderDetails) {
            try {
                // Registra l'utente e ottieni l'ID utente
                const responseUtente = await registraUtente(this.emailReg, this.idEvento);
                this.idUtente = responseUtente;

                // Prepara i dettagli dell'ordine
                const data = {
                    idUtente: this.idUtente,
                    codiceOrdine: orderDetails.id,
                    codicePagamento: orderDetails.purchase_units[0].payments.captures[0].id,
                    importo: orderDetails.purchase_units[0].payments.captures[0].amount.value
                };

                // Registra l'ordine
                try {
                    await registraOrdine(data);
                } catch (errorRegistrazioneOrdine) {
                    console.error("Errore durante la registrazione dell'ordine", errorRegistrazioneOrdine);
                }

                // Invia l'email all'utente
                try {
                    await sendEmail(this.idUtente);
                } catch (errorInvioEmail) {
                    console.error("Errore durante l'invio della mail all'utente", errorInvioEmail);
                }
            } catch (errorRegistrazioneUtente) {
                console.error("Errore durante la registrazione dell'utente", errorRegistrazioneUtente);
            }
        },
        resetRegisterFields() {
            this.emailRegDisabled = false;
            this.emailReg = '';
            this.showPayment = false;
            this.checkBoxCondizioni = false;
        },
        showAlertReg(tipo, titolo, testo) {
            this.tipoAlertReg = tipo;
            this.titoloAlertReg = titolo;
            this.testoAlertReg = testo;
            this.showAlertRegistrazione = true;
        },
        showAlertLoginFunction(tipo, titolo, testo) {
            this.tipoAlertLogin = tipo;
            this.titoloAlertLogin = titolo;
            this.testoAlertLogin = testo;
            this.showAlertLogin = true;
        },
        handleLostPsw() {
            this.$emit('lostPsw');
        }
    }
}

</script>
