<template>
    <v-container class="special-event-container">
        <div class="header-container">
            <div class="my-4 logo">
                <img :src="this.logoSrc" alt="Event Logo">
            </div>
            <h3 class="text-h4 event-title text-center">
                <strong>{{ nomeEvento }}</strong>
            </h3>
        </div>

        <v-row>
            <v-col cols="12" sm="12" md="5" lg="6">
                <div class="description-container">
                    <p class="description-text">
                        <span class="subtitle">{{ $t('descSpecial.howToRegister') }}</span>
                        {{ $t('descSpecial.introduzione1') }} <br> {{ $t('descSpecial.introduzione2') }}
                        <ol class="requirements-list">
                            <li>{{ $t('descSpecial.elencoPunto1') }}</li>
                            <li>{{ $t('descSpecial.elencoPunto2') }}</li>
                            <li>{{ $t('descSpecial.elencoPunto3') }}{{ (this.getSpecialEvent.costo).toFixed(2) }}.</li>
                        </ol>
                        <br>
                        <span class="help-section">
                            {{ $t('descSpecial.conclusione1') }} <br> 
                            {{ $t('descSpecial.conclusione2') }}
                            <a href="mailto:help@bonagacommunication.tv" class="support-email">help@bonagacommunication.tv</a>.
                            <br>
                            {{ $t('descSpecial.conclusione3') }}
                        </span>
                    </p>
                </div>
            </v-col>

            <v-col cols="12" sm="10" md="7" lg="6">
                <LoginPayment class="loginComponent" :idEvento="this.idEvento" @lostPsw="lostPswDialog = true" />
            </v-col>
        </v-row>

        <div class="text-center pa-4">
            <v-dialog v-model="lostPswDialog" width="auto" persistent>
                <v-card max-width="600"
                    :text="this.$t('credenzialiSmarrite.testoIntro')">
                    <Alert v-if="showDialogAlert" :tipo="dialogAlertType" :titolo="dialogAlertTitle"
                    :testo="dialogAlertText" style="margin: auto;"></Alert>
                    <v-container class="text-center">
                        <v-text-field density="compact" v-model="emailDialog" label="Email" style="max-width: 450px; margin: auto"></v-text-field>
                        <v-btn :text="this.$t('credenzialiSmarrite.pulsanteConfermaMail')" class="ms-auto" @click="sendCredentials()"></v-btn>
                    </v-container>
                    <template v-slot:actions>
                        <v-btn density="compact" icon="mdi-close" class="ms-auto" @click="closeDialog()"></v-btn>
                    </template>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
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
                        this.showDialogAlertFunction('success',this.$t('credenzialiSmarrite.alertSuccessoTitolo'), this.$t('credenzialiSmarrite.alertSuccessoTesto'))
                        await sendEmail(idUtenteFromMail, this.$route.params.lang);
                        this.closeDialog();
                    } catch (errorInvioEmail) {
                        console.error("Errore durante l'invio della mail all'utente", errorInvioEmail);
                    }
                } else {
                    this.showDialogAlertFunction('error',this.$t('credenzialiSmarrite.alertErroreTitolo'), this.$t('credenzialiSmarrite.alertErroreTesto'))
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
    height: auto;
}


.event-title {
    position: relative;
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;  /* Reduced from 1.8rem */
    font-weight: 700;   /* Reduced from 800 */
    letter-spacing: -0.3px;  /* Reduced from -0.5px */
    background: linear-gradient(30deg, #1a1a1a 40%, #e27e2c 90%);  /* Modified gradient */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-bottom: 5px;
    width: 100%;
    text-align: center;
    opacity: 0.9;  /* Added slight transparency */
}

.description-text {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #333;
    width: 90%;
    padding-top: 10px;
    text-align: left;
    margin: 0 auto;
}

.requirements-list {
    margin-left: 20px;
}

.support-email {
    color: #e27e2c;
    text-decoration: none;
    transition: color 0.2s ease;
}

.support-email:hover {
    color: #c66a24;
    text-decoration: underline;
}

.loginComponent {
    margin-top: -0.5rem;  /* Valore negativo per alzare il componente */
}

@media screen and (max-width: 960px) {
    .loginComponent {
        margin-top: 2rem;  /* Mantenuto per schermi più piccoli */
    }
}

@media screen and (max-width: 600px) {
    .logo img {
        width: 140px;
    }

    .loginComponent {
        margin-top: 2rem;  /* Aumentato da 1rem */
    }

    .description-text {
        font-size: 0.85rem;
    }
}

.header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem; /* Ridotto da 3rem */
    width: 100%;
}

.description-container {
    margin-top: 0; /* Rimosso il margine */
}

.subtitle {
    display: block;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: #1a1a1a;
    margin-bottom: 0.3rem; /* Reduced from 0.8rem */
}

.special-event-container {
    padding-bottom: 0;  /* Remove bottom padding */
}
</style>