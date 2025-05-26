<template>
  <v-main class="bg-white-2">
    <!-- Popup di conferma email -->
    <v-dialog 
      v-model="showEmailConfirmationPopup" 
      max-width="500" 
      persistent
    >
      <v-card class="confirmation-popup">
        <v-card-text class="text-center pa-8">
          <!-- Success State -->
          <div v-if="emailConfirmationStatus === 'success'" class="popup-content">
            <v-icon 
              color="success" 
              size="64" 
              class="mb-4"
            >mdi-check-circle</v-icon>
            <h2 class="popup-title success-title">Email confermata!</h2>
            <p class="popup-message">
              Il tuo account è stato attivato con successo.<br>
              Ora puoi accedere a tutti i contenuti on demand.
            </p>
            <div class="countdown-text">
              <small>Questo popup si chiuderà automaticamente tra {{ countdown }} secondi</small>
            </div>
          </div>
          
          <!-- Error State -->
          <div v-else class="popup-content">
            <v-icon 
              color="error" 
              size="64" 
              class="mb-4"
            >mdi-alert-circle</v-icon>
            <h2 class="popup-title error-title">Errore di conferma</h2>
            <p class="popup-message">{{ emailConfirmationError }}</p>
          </div>
          
          <v-btn 
            color="orange" 
            @click="closeEmailConfirmationPopup"
            class="close-popup-btn mt-4"
            block
          >
            Chiudi
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-container class="py-8">
      <!-- Messaggio di benvenuto per utenti autenticati -->
      <div v-if="isUserAuthenticated" class="welcome-section">
        <div class="welcome-card">
          <v-icon color="success" size="64" class="mb-4">mdi-check-circle</v-icon>
          <h2 class="welcome-title">Benvenuto!</h2>
          <p class="welcome-message">
            Hai effettuato l'accesso con successo.<br>
            Ora puoi accedere a tutti i contenuti on demand.
          </p>
          <v-btn 
            color="orange" 
            @click="logout"
            class="logout-btn"
          >
            Logout
          </v-btn>
        </div>
      </div>

      <!-- Form di login/registrazione per utenti non autenticati -->
      <div v-else>
        <div class="intro-text">
          <p>
            Per acquistare i prodotti è necessario effettuare l'accesso o la registrazione se non si possiede già un account.
          </p>
        </div>
        <v-row no-gutters align="stretch" class="login-register-row">
          <!-- Login Form -->
          <v-col cols="12" md="5" class="d-flex flex-column justify-center fill-height login-col">
            <h3 class="form-title">Accedi</h3>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="loginEmail"
                :label="$t('register.email')"
                type="email"
                required
                class="mb-3"
              />
              <v-text-field
                v-model="loginPassword"
                :label="$t('register.password')"
                type="password"
                required
                class="mb-3"
              />
              <div class="login-actions-row">
                <v-btn 
                  color="orange" 
                  type="submit" 
                  block 
                  class="login-btn"
                  :loading="loginLoading"
                  :disabled="loginLoading"
                >
                  Accedi
                </v-btn>
              </div>
            </v-form>
            <v-alert
              v-if="loginError"
              type="error"
              class="mt-3"
              dense
            >{{ loginError }}</v-alert>
          </v-col>
          <!-- Divider: visibile solo su md e superiori -->
          <v-col cols="0" md="2" class="d-none d-md-flex align-center justify-center px-0">
            <div class="custom-divider"></div>
          </v-col>
          <!-- Register Form -->
          <v-col cols="12" md="5" class="d-flex flex-column justify-center fill-height register-col">
            <h3 class="form-title">Registrati</h3>
            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="registerEmail"
                :label="$t('register.email')"
                type="email"
                required
                class="mb-3"
              />
              <v-text-field
                v-model="registerPassword"
                :label="$t('register.password')"
                type="password"
                required
                class="mb-3"
              />
              <v-text-field
                v-model="registerPasswordConfirm"
                :label="$t('register.passwordConfirm')"
                type="password"
                required
                class="mb-3"
              />
              <v-btn 
                color="orange" 
                type="submit" 
                block
                :loading="registerLoading"
                :disabled="registerLoading"
              >
                Registrati
              </v-btn>
            </v-form>
            <v-alert
              v-if="registerError"
              type="error"
              class="mt-3"
              dense
            >{{ registerError }}</v-alert>
            <v-alert
              v-if="registerSuccess"
              type="success"
              class="mt-3"
              dense
            >
              <div class="success-message">
                <strong>Registrazione completata!</strong><br>
                Ti abbiamo inviato un'email di conferma all'indirizzo <strong>{{ registerEmail }}</strong>.<br>
                Clicca sul link nell'email per attivare il tuo account.
              </div>
            </v-alert>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { ondemandAuthApi } from '@/api/ondemand';

export default {
  name: 'OnDemandView',
  data() {
    return {
      // Login
      loginEmail: '',
      loginPassword: '',
      loginError: '',
      loginLoading: false,
      // Register
      registerEmail: '',
      registerPassword: '',
      registerPasswordConfirm: '',
      registerError: '',
      registerSuccess: false,
      registerLoading: false,
      showConfirmationDialog: false,
      // Auth
      isUserAuthenticated: false,
      // Email confirmation popup
      showEmailConfirmationPopup: false,
      emailConfirmationStatus: null,
      emailConfirmationError: '',
      countdown: 5,
      countdownInterval: null,
    }
  },
  methods: {
    async handleLogin() {
      this.loginError = '';
      this.loginLoading = true;
      
      if (!this.loginEmail || !this.loginPassword) {
        this.loginError = this.$t('register.fillAllFields') || 'Compila tutti i campi';
        this.loginLoading = false;
        return;
      }

      try {
        const response = await ondemandAuthApi.login(this.loginEmail, this.loginPassword);
        
        // Login riuscito - vai al contenuto OnDemand
        this.loginError = '';
        // Reindirizza alla dashboard OnDemand (quando sarà creata)
        // this.$router.push(`/${this.$i18n.locale}/ondemand/dashboard`);
        
        // Per ora rimani sulla stessa pagina e ricarica
        window.location.reload();
        
      } catch (error) {
        this.loginError = error.message || this.$t('login.invalid') || 'Credenziali non valide';
      } finally {
        this.loginLoading = false;
      }
    },

    async handleRegister() {
      this.registerError = '';
      this.registerSuccess = false;
      this.registerLoading = true;
      
      if (!this.registerEmail || !this.registerPassword || !this.registerPasswordConfirm) {
        this.registerError = this.$t('register.fillAllFields') || 'Compila tutti i campi';
        this.registerLoading = false;
        return;
      }
      
      if (this.registerPassword !== this.registerPasswordConfirm) {
        this.registerError = this.$t('register.passwordMismatch') || 'Le password non coincidono';
        this.registerLoading = false;
        return;
      }

      try {
        // Passo solo email e password all'API
        await ondemandAuthApi.register(this.registerEmail, this.registerPassword);
        
        this.registerSuccess = true;
        this.registerError = '';
        
        // Reset del form dopo registrazione riuscita
        setTimeout(() => {
          this.registerPassword = '';
          this.registerPasswordConfirm = '';
        }, 2000);
        
      } catch (error) {
        this.registerError = error.message || 'Errore durante la registrazione';
      } finally {
        this.registerLoading = false;
      }
    },

    logout() {
      ondemandAuthApi.logout();
      this.isUserAuthenticated = false;
    },
    
    checkAuthentication() {
      this.isUserAuthenticated = ondemandAuthApi.isAuthenticated();
    },

    closeEmailConfirmationPopup() {
      this.showEmailConfirmationPopup = false;
      this.clearCountdown();
      // Rimuovi i parametri dalla query string
      this.$router.replace({ 
        path: this.$route.path,
        query: {} 
      });
    },
    
    startCountdown() {
      this.countdown = 5;
      this.countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.closeEmailConfirmationPopup();
        }
      }, 1000);
    },
    
    clearCountdown() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    },
    
    checkEmailConfirmationStatus() {
      const status = this.$route.query.emailConfirmed;
      if (status) {
        this.emailConfirmationStatus = status;
        if (status === 'success') {
          this.showEmailConfirmationPopup = true;
          this.startCountdown();
        } else if (status === 'error') {
          this.emailConfirmationError = this.$route.query.error || 'Errore sconosciuto';
          this.showEmailConfirmationPopup = true;
        }
      }
    }
  },
  
  mounted() {
    this.checkAuthentication();
    this.checkEmailConfirmationStatus();
  },
  
  watch: {
    // Controlla l'autenticazione quando cambia la rotta
    '$route'() {
      this.checkAuthentication();
      this.checkEmailConfirmationStatus();
    }
  },
  
  beforeUnmount() {
    this.clearCountdown();
  }
}
</script>

<style scoped>
.bg-white-2 {
  background: linear-gradient(to bottom, rgba(249, 249, 249, 0.97), rgba(255, 255, 255, 0.97));
  min-height: 100vh;
}
.intro-text {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #444;
  font-family: 'Montserrat', sans-serif;
}
.form-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #e27e2c;
  letter-spacing: -0.5px;
  text-align: center;
}
.login-register-row {
  min-height: 350px;
  height: 100%;
  flex-wrap: nowrap;
  align-items: stretch;
}
.login-col,
.register-col {
  padding: 24px 0 24px 2px;
}
.register-col {
  padding: 24px 2px 24px 0;
}
.border-right-col {
  height: 100%;
}
.fill-height {
  height: 100%;
}

/* --- COMPATTA I FORM (via di mezzo) --- */
.v-form {
  max-width: 100%;
  min-width: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.v-form .v-text-field {
  margin-bottom: -6px !important;
  min-width: 300px;
  max-width: 100%;
}
.v-form .v-btn {
  margin-top: 8px;
  min-width: 180px;
  width: 100%;
  font-size: 1.08rem;
  height: 44px;
  align-self: center;
  border-radius: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #ff9800 0%, #e27e2c 100%);
  color: #fff !important;
  box-shadow: 0 2px 8px 0 #e27e2c33;
  transition: background 0.2s, box-shadow 0.2s;
}
.v-form .v-btn:hover,
.v-form .v-btn:focus {
  background: linear-gradient(90deg, #e27e2c 0%, #ff9800 100%);
  box-shadow: 0 4px 16px 0 #e27e2c44;
}

.v-alert {
  margin-top: 10px !important;
  margin-bottom: 0 !important;
  font-size: 0.97rem;
  padding: 6px 12px;
}

/* Divider centrale */
.custom-divider {
  width: 2px;
  height: 80%;
  min-height: 220px;
  max-height: 90%;
  background: linear-gradient(to bottom, #eee 10%, #e27e2c 50%, #eee 90%);
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 8px 0 #e27e2c33;
}

.success-message {
  line-height: 1.4;
}
.success-message strong {
  color: #2e7d32;
}

/* Nuovi stili per la sezione di benvenuto */
.welcome-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
.welcome-card {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}
.welcome-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #e27e2c;
}
.welcome-message {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.logout-btn {
  border-radius: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #ff9800 0%, #e27e2c 100%);
  color: #fff !important;
  box-shadow: 0 2px 8px 0 #e27e2c33;
  transition: background 0.2s, box-shadow 0.2s;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #e27e2c 0%, #ff9800 100%);
  box-shadow: 0 4px 16px 0 #e27e2c44;
}

/* Stili per il popup di conferma email */
.confirmation-popup {
  border-radius: 16px !important;
}

.popup-content {
  padding: 1rem 0;
}

.popup-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.success-title {
  color: #2e7d32;
}

.error-title {
  color: #d32f2f;
}

.popup-message {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.countdown-text {
  color: #666;
  margin-bottom: 1rem;
}

.close-popup-btn {
  border-radius: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #ff9800 0%, #e27e2c 100%);
  color: #fff !important;
  box-shadow: 0 2px 8px 0 #e27e2c33;
  transition: background 0.2s, box-shadow 0.2s;
}

.close-popup-btn:hover {
  background: linear-gradient(90deg, #e27e2c 0%, #ff9800 100%);
  box-shadow: 0 4px 16px 0 #e27e2c44;
}

@media (max-width: 960px) {
  .login-register-row {
    flex-wrap: wrap;
  }
  .border-right-col {
    border-right: none;
    border-bottom: none;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    height: auto;
  }
  .fill-height {
    height: auto;
  }
  .custom-divider {
    display: none;
  }
  .login-col {
    margin-top: 10px;
  }
  .register-col {
    padding: 20px 0 !important;
    margin-top: 15px;
  }
  .v-form {
    max-width: 100%;
    padding-left: 8px;
    padding-right: 8px;
  }
}

/* Larghezza dinamica simile alla sezione live */
.v-container {
  width: 80%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 600px) {
  .v-container {
    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
  }
}
@media (min-width: 750px) and (max-width: 1200px) {
  .v-container {
    width: 90%;
  }
}
</style>
