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
                        {{ $t('descSpecial.introduzione1') }} <br> {{ $t('descSpecial.introduzione2') }}
                        <ol style="margin-left: 20px;">
                            <li>{{ $t('descSpecial.elencoPunto1') }}</li>
                            <li>{{ $t('descSpecial.elencoPunto2') }}</li>
                            <li>{{ $t('descSpecial.elencoPunto3') }}{{ (this.getSpecialEvent.costo).toFixed(2) }} .</li>
                        </ol>
                        <br>
                        {{ $t('descSpecial.conclusione1') }} <br> {{ $t('descSpecial.conclusione2') }}
                        <a href="mailto:help@bonagacommunication.tv">help@bonagacommunication.tv</a> . 
                        <br>
                        {{ $t('descSpecial.conclusione3') }}
                        <br> 
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