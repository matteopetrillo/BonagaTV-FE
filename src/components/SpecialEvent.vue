<template>

    <v-container>

        <v-row>

            <v-col cols="12" sm="12" md="5" lg="6">

                <div class="my-4 logo">
                    <img :src="getLogoSrc()"></img>
                </div>
                <div
                    style="display: flex; justify-content: center; text-align: center; align-items: center; flex-direction: column;">
                    <h3 class="text-h4">
                        <strong>{{ nomeEvento }}</strong>
                    </h3>
                    <p class="text-caption" style="width: 90%; padding-top: 10px; text-align: justify;">
                        Per registrarsi al servizio streaming bisognerà seguire i passaggi illustrati nella sezione "Registrati al Servizio". <br> 
                        In particolare verrà richiesto di: 
                        <ol style="margin-left: 20px;">
                            <li>Inserire una mail valida a cui successivamente riceverete la vostra password</li>
                            <li>Accettare le condizioni di utilizzo del sito</li>
                            <li>Finalizzare la registrazione tramite il pagamento. Il costo della diretta è di €{{ this.getSpecialEvent.costo }} .</li>
                        </ol>
                        <br>
                        In caso di smarrimento di della mail contenente le credenziali di accesso, essa potrà essere richiesta nuovamente cliccando sul pulsante
                        "Ho dimenticato le credenziali" nella sezione di login. <br> Solo per ulteriori problemi potrete
                        contattarci all'indirizzo mail <a href="mailto:help@bonagacommunication.tv">help@bonagacommunication.tv</a> . <br> Grazie e buona
                        visione.
                    </p>
                </div>

            </v-col>

            <v-col cols="12" sm="10" md="7" lg="6">
                <LoginPayment class="loginComponent" :idEvento="this.idEvento" @lostPsw="lostPswDialog = true">
                </LoginPayment>
            </v-col>

        </v-row>


    </v-container>


    <div class="text-center pa-4">
        <v-dialog v-model="lostPswDialog" width="auto" persistent>
            <v-card max-width="600"
                text="Inserisci l'email di registrazione e provvederemo a inviarle nuovamente le credenziali.">
                    <Alert v-if="showDialogAlert" :tipo="dialogAlertType" :titolo="dialogAlertTitle"
                    :testo="dialogAlertText" style="margin: auto;"></Alert>
                <v-container class="text-center">
                    <v-text-field density="compact" v-model="emailDialog" label="Email" style="max-width: 450px; margin: auto"></v-text-field>
                    <v-btn text="Conferma Email" class="ms-auto" @click="sendCredentials()"></v-btn>
                </v-container>
                <template v-slot:actions>
                    <v-btn density="compact" icon="mdi-close" class="ms-auto" @click="closeDialog()"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>


    <v-divider></v-divider>

</template>

<script>
import LoginPayment from '@/components/LoginPayment.vue';
import { checkDispEmail, sendEmail } from '@/services/api.js';
import { mapGetters } from 'vuex';
import Alert from './Alert.vue';


export default {
    name: 'SpecialEvent',
    components: {
        LoginPayment,
        Alert
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
    },
    computed: {
        ...mapGetters([
            'getCanaliProxLive',
            'getCanaliOffline',
            'getSpecialEvent',
        ]),

    },
    data() {
        return {
            lostPswDialog: false,
            showDialogAlert: false,
            dialogAlertText: '',
            dialogAlertType: '',
            dialogAlertTitle: '',
            emailDialog: ''
        }
    },
    watch: {
        showDialogAlert(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.showDialogAlert = false
                }, 10000)
            }
        },
    },
    methods: {
        handleLostPassword(event) {
            this.lostPswDialog = true;
        },
        getLogoSrc() {
            return require(`@/${this.logoSrc}`);
        },
        async sendCredentials() {
            try {
                const idUtenteFromMail = await checkDispEmail(this.emailDialog);
                if (idUtenteFromMail != 0) {
                    try {
                        this.showDialogAlertFunction('success','Email Valida!','Stiamo inviando alla tua email le credenziali di accesso.')
                        await sendEmail(idUtenteFromMail);
                        this.closeDialog();
                    } catch (errorInvioEmail) {
                        console.error("Errore durante l'invio della mail all'utente", errorInvioEmail);
                    }
                } else {
                    this.showDialogAlertFunction('error','Attenzione!','La mail inserita non è registrata nel nostro sistema per questo evento')
                }
            } catch (error) {
                console.log(error)
            }
        },
        showDialogAlertFunction(tipo, titolo, testo) {
            this.dialogAlertType = tipo;
            this.dialogAlertTitle = titolo;
            this.dialogAlertText = testo;
            this.showDialogAlert = true;
        },
        closeDialog() {
            this.lostPswDialog = false;
            this.emailDialog = '';
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