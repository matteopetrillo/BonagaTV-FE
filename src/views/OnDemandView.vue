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
            <h2 class="popup-title success-title">{{ $t('ondemand.emailConfermata') }}</h2>
            <p class="popup-message">
              {{ $t('ondemand.accountAttivato') }}
            </p>
            <div class="countdown-text">
              <small>{{ $t('ondemand.popupChiusura') }} {{ countdown }} {{ $t('ondemand.secondi') }}</small>
            </div>
          </div>
          
          <!-- Error State -->
          <div v-else class="popup-content">
            <v-icon 
              color="error" 
              size="64" 
              class="mb-4"
            >mdi-alert-circle</v-icon>
            <h2 class="popup-title error-title">{{ $t('ondemand.erroreConferma') }}</h2>
            <p class="popup-message">{{ emailConfirmationError }}</p>
          </div>
          
          <v-btn 
            color="orange" 
            @click="closeEmailConfirmationPopup"
            class="close-popup-btn mt-4"
            block
          >
            {{ $t('ondemand.chiudi') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Overlay di acquisto -->
    <v-dialog 
      v-model="showPurchaseDialog" 
      max-width="500" 
      persistent
    >
      <v-card class="purchase-dialog">
        <v-card-title class="purchase-dialog-title">
          <v-icon color="orange" class="mr-3">mdi-cart</v-icon>
          {{ $t('ondemand.confermaAcquisto') }}
        </v-card-title>
        
        <v-card-text class="pa-6">
          <div class="purchase-content">
            <div class="product-info mb-4">
              <h3 class="product-title">{{ selectedVod?.titolo }}</h3>
              <div class="product-details">
                <span v-if="selectedVod?.durata" class="product-duration">
                  <v-icon size="16" color="#a0522d">mdi-clock-outline</v-icon>
                  {{ formatDuration(selectedVod.durata) }}
                </span>
                <span class="product-price">€{{ selectedVod?.prezzo?.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="payment-section">
              <h4 class="payment-title">{{ $t('ondemand.metodoPagamento') }}</h4>
              <div class="paypal-container">
                <PaypalButtons 
                  v-if="selectedVod"
                  type="vod"
                  :vod-id="selectedVod.id"
                  @payment-success="handlePaymentSuccess"
                  @payment-error="handlePaymentError"
                />
              </div>
            </div>
          </div>
        </v-card-text>
        
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn 
            variant="outlined"
            color="grey"
            @click="closePurchaseDialog"
          >
            {{ $t('ondemand.annulla') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container class="py-8">
      <!-- Loading del catalogo - mostrato solo durante il caricamento -->
      <div v-if="catalogoLoading" class="catalogo-loading-center">
        <v-progress-circular 
          color="orange" 
          indeterminate 
          size="64"
        ></v-progress-circular>
      </div>

      <!-- Contenuto principale - mostrato solo dopo il caricamento -->
      <div v-else-if="catalogoLoaded">
        <!-- Barra utente loggato -->
        <div v-if="isUserAuthenticated" class="user-info-bar">
          <v-card class="user-card" elevation="2">
            <v-card-text class="d-flex align-center justify-space-between pa-4">
              <div class="user-details">
                <div class="d-flex align-center">
                  <v-icon color="success" class="mr-3">mdi-account-circle</v-icon>
                  <div>
                    <h3 class="user-title">{{ $t('ondemand.accessoEffettuato') }}</h3>
                    <p class="user-email">{{ userEmail }}</p>
                  </div>
                </div>
              </div>
              <v-btn 
                color="orange" 
                variant="outlined"
                @click="logout"
                class="logout-btn-small"
              >
                <v-icon left>mdi-logout</v-icon>
                {{ $t('ondemand.logout') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </div>

        <!-- Form di login/registrazione per utenti non autenticati -->
        <div v-if="!isUserAuthenticated">
          <div class="intro-text">
            <p>
              {{ $t('ondemand.loginRequired') }}
            </p>
          </div>
          <v-row no-gutters align="stretch" class="login-register-row">
            <!-- Login Form -->
            <v-col cols="12" md="5" class="d-flex flex-column justify-center fill-height login-col">
              <h3 class="form-title">{{ $t('ondemand.accedi') }}</h3>
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
                <div class="forgot-password-link">
                  <a href="#" @click.prevent="handleForgotPassword" class="forgot-link">
                    {{ $t('ondemand.dimenticatoPassword') }}
                  </a>
                </div>
                <div class="login-actions-row">
                  <v-btn 
                    color="orange" 
                    type="submit" 
                    block 
                    class="login-btn"
                    :loading="loginLoading"
                    :disabled="loginLoading"
                  >
                    {{ $t('ondemand.accedi') }}
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
              <h3 class="form-title">{{ $t('ondemand.registrati') }}</h3>
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
                <v-checkbox
                  v-model="acceptTerms"
                  class="terms-checkbox"
                  required
                >
                  <template v-slot:label>
                    <span class="terms-label">
                      {{ $t('ondemand.accetto') }} 
                      <a href="#" @click.prevent="showTermsDialog" class="terms-link">
                        {{ $t('ondemand.terminiCondizioni') }}
                      </a>
                    </span>
                  </template>
                </v-checkbox>
                <v-btn 
                  color="orange" 
                  type="submit" 
                  block
                  :loading="registerLoading"
                  :disabled="registerLoading || !acceptTerms"
                >
                  {{ $t('ondemand.registrati') }}
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

        <!-- Divider centrale -->
        <v-divider v-if="isUserAuthenticated" class="my-12"></v-divider>

        <!-- Sezione "La Mia Libreria" (sempre visibile se autenticato) -->
        <section v-if="isUserAuthenticated" class="mb-12">
          <h2 class="catalogo-title">
            <v-icon color="orange" class="mr-3">mdi-video-box</v-icon>
            {{ $t('ondemand.laMiaLibreria') }}
          </h2>
          <div v-if="catalogoData.acquistati && catalogoData.acquistati.length > 0">
            <v-row>
              <v-col 
                v-for="(vod, index) in catalogoData.acquistati" 
                :key="'owned-' + index"
                cols="12" 
                sm="6" 
                md="4" 
                lg="3"
              >
                <v-card class="vod-card owned" elevation="3">
                  <v-img
                    v-if="vod.urlThumbnail"
                    :src="vod.urlThumbnail"
                    aspect-ratio="0.9"
                    cover
                    class="vod-image"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                  <div v-else class="placeholder-image">
                    <v-icon size="64" color="grey-lighten-2">mdi-video</v-icon>
                  </div>

                  <v-card-title class="vod-title">{{ vod.titolo }}</v-card-title>
                  
                  <v-card-text class="vod-card-text">
                    <div class="vod-info">
                      <span v-if="vod.durata" class="duration">{{ formatDuration(vod.durata) }}</span>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn 
                      color="orange" 
                      variant="elevated"
                      @click="riproduciVod(vod)"
                      block
                    >
                      <v-icon left>mdi-play</v-icon>
                      {{ $t('ondemand.riproduci') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-else class="no-content">
            <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-video-box-off</v-icon>
            <p>{{ $t('ondemand.nonHaiAcquistato') }}</p>
            <p class="text-caption">{{ $t('ondemand.acquistAppariranno') }}</p>
          </div>
        </section>

        <!-- Divider tra le sezioni -->
        <v-divider v-if="isUserAuthenticated" class="my-12"></v-divider>

        <!-- Sezione contenuti disponibili -->
        <section class="mb-12 mt-12">
          <h2 class="catalogo-title">
            <v-icon color="orange" class="mr-3">mdi-shopping</v-icon>
            {{ $t('ondemand.contenutiDisponibili') }}
          </h2>
          <div v-if="catalogoData.acquistabili && catalogoData.acquistabili.length > 0">
            <v-row>
              <v-col 
                v-for="(vod, index) in catalogoData.acquistabili" 
                :key="'available-' + index"
                cols="12" 
                sm="6" 
                md="4" 
                lg="3"
              >
                <v-card class="vod-card" elevation="3">
                  <v-img
                    v-if="vod.urlThumbnail"
                    :src="vod.urlThumbnail"
                    aspect-ratio="0.9"
                    cover
                    class="vod-image"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                  <div v-else class="placeholder-image">
                    <v-icon size="64" color="grey-lighten-2">mdi-video</v-icon>
                  </div>

                  <v-card-title class="vod-title">{{ vod.titolo }}</v-card-title>
                  
                  <v-card-text class="vod-card-text">
                    <div class="vod-info">
                      <span v-if="vod.durata" class="duration">{{ formatDuration(vod.durata) }}</span>
                      <span v-if="vod.prezzo" class="price">€{{ vod.prezzo.toFixed(2) }}</span>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn 
                      color="orange" 
                      variant="elevated"
                      :disabled="!isUserAuthenticated"
                      @click="acquistaVod(vod)"
                      block
                    >
                      <v-icon left>mdi-cart</v-icon>
                      {{ isUserAuthenticated ? $t('ondemand.acquista') : $t('ondemand.loginRichiesto') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-else class="no-content">
            <p>{{ $t('ondemand.nessunContenuto') }}</p>
          </div>
        </section>
      </div>

      <!-- Fallback per quando il catalogo non è caricato -->
      <div v-else class="catalogo-loading-center">
        <v-progress-circular 
          color="orange" 
          indeterminate 
          size="64"
        ></v-progress-circular>
        <p class="mt-4">Inizializzazione...</p>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { ondemandAuthApi } from '@/api/ondemand';
import PaypalButtons from '@/components/PaypalButtons.vue';

export default {
  name: 'OnDemandView',
  components: {
    PaypalButtons
  },
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
      // Catalogo VOD
      catalogoData: null,
      catalogoLoaded: false,
      catalogoLoading: false,
      userEmail: '',
      // Purchase dialog
      showPurchaseDialog: false,
      selectedVod: null,
      // Form additions
      acceptTerms: false,
    }
  },
  methods: {
    async handleLogin() {
      console.log('Login attempt started');
      this.loginError = '';
      this.loginLoading = true;
      
      if (!this.loginEmail || !this.loginPassword) {
        this.loginError = this.$t('register.fillAllFields') || 'Compila tutti i campi';
        this.loginLoading = false;
        return;
      }

      try {
        console.log('Calling login API...');
        const response = await ondemandAuthApi.login(this.loginEmail, this.loginPassword);
        console.log('Login response:', response);
        
        // Login riuscito - vai al contenuto OnDemand
        this.loginError = '';
        // Reindirizza alla dashboard OnDemand (quando sarà creata)
        // this.$router.push(`/${this.$i18n.locale}/ondemand/dashboard`);
        
        // Per ora rimani sulla stessa pagina e ricarica
        window.location.reload();
        
      } catch (error) {
        console.error('Login error:', error);
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
      
      if (!this.acceptTerms) {
        this.registerError = this.$t('ondemand.accettareCondizioni') || 'Devi accettare le condizioni di registrazione';
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
          this.acceptTerms = false;
        }, 2000);
        
      } catch (error) {
        this.registerError = error.message || 'Errore durante la registrazione';
      } finally {
        this.registerLoading = false;
      }
    },

    checkAuthentication() {
      console.log('Checking authentication...');
      this.isUserAuthenticated = ondemandAuthApi.isAuthenticated();
      console.log('Is authenticated:', this.isUserAuthenticated);
      if (this.isUserAuthenticated) {
        // Recupera l'email dell'utente dal token o da localStorage
        const user = ondemandAuthApi.getCurrentUser();
        this.userEmail = user?.email || 'Utente loggato';
      }
    },

    logout() {
      ondemandAuthApi.logout();
      this.isUserAuthenticated = false;
      this.userEmail = '';
      // Aggiorna immediatamente l'autenticazione e ricarica il catalogo
      this.checkAuthentication();
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
    },

    async loadCatalogo() {
      console.log('Loading catalog...');
      this.catalogoLoading = true;
      try {
        this.catalogoData = await ondemandAuthApi.getCatalogo();
        console.log('Catalog loaded:', this.catalogoData);
        this.catalogoLoaded = true;
      } catch (error) {
        console.error('Errore nel caricamento del catalogo:', error);
        // Mostra un messaggio di errore se necessario
      } finally {
        this.catalogoLoading = false;
      }
    },

    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours > 0) {
        return `${hours}h ${mins}m`;
      }
      return `${mins} min`;
    },

    acquistaVod(vod) {
      this.selectedVod = vod;
      this.showPurchaseDialog = true;
    },

    closePurchaseDialog() {
      this.showPurchaseDialog = false;
      this.selectedVod = null;
    },

    handlePaymentSuccess(details) {
      console.log('Pagamento completato:', details);
      this.closePurchaseDialog();
      // Ricarica il catalogo per aggiornare i contenuti posseduti
      this.loadCatalogo();
      // Mostra un messaggio di successo
      this.$toast.success('Acquisto completato con successo!');
    },

    handlePaymentError(error) {
      console.error('Errore nel pagamento:', error);
      this.$toast.error('Errore durante il pagamento. Riprova.');
    },

    riproduciVod(vod) {
      // Reindirizza al player VOD usando il path corretto dal router
      this.$router.push(`/${this.$i18n.locale}/ondemand/player?id=${vod.id}`);
    },

    handleForgotPassword() {
      // TODO: Implementare la logica per il recupero password
      console.log('Recupero password per:', this.loginEmail);
      // Per ora mostra solo un alert
      alert('Funzionalità di recupero password non ancora implementata');
    },

    showTermsDialog() {
      // TODO: Implementare il popup con i termini e condizioni
    }
  },
  
  async mounted() {
    console.log('OnDemandView mounted');
    this.checkAuthentication();
    this.checkEmailConfirmationStatus();
    await this.loadCatalogo();
  },
  
  watch: {
    '$route'() {
      this.checkAuthentication();
      this.checkEmailConfirmationStatus();
    },
    
    // Ricarica il catalogo quando cambia lo stato di autenticazione
    isUserAuthenticated() {
      this.loadCatalogo();
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
  margin-bottom: 1rem;
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

/* Stili per l'overlay di acquisto */
.purchase-dialog {
  border-radius: 16px !important;
}

.purchase-dialog-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: #e27e2c;
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
}

.purchase-content {
  text-align: center;
}

.product-info {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1.5rem;
  background-color: #fafafa;
}

.product-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #8b4513;
  margin-bottom: 1rem;
}

.product-details {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.product-duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #a0522d;
}

.product-price {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #d2691e;
  text-align: center;
}

.payment-section {
  margin-top: 1.5rem;
}

.payment-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: left;
}

.paypal-container {
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  min-height: 70vh;
  display: flex;
  flex-direction: column;
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

/* Stili per il catalogo VOD */
.catalogo-loading-center {
  position: fixed;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 80px;
  height: 80px;
  background: transparent;
  text-align: center;
  color: #666;
}

.catalogo-section {
  margin-top: 3rem;
}

.catalogo-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  margin-top: -2rem;
  color: #e27e2c;
  text-align: center;
}

.vod-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 200px;
  margin: 0 auto;
  overflow: hidden;
}

.vod-image {
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.vod-title {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
  font-size: clamp(0.65rem, 2.2vw, 0.85rem) !important;
  color: #8b4513 !important;
  padding: 6px 12px 6px 6px !important;
  line-height: 0.9 !important;
  min-height: auto !important;
  display: block !important;
  text-align: center !important;
  position: relative;
  white-space: normal !important;
  word-break: break-word;
  hyphens: auto;
}

.vod-title::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 6px;
  right: 6px;
  height: 2px;
  background: linear-gradient(90deg, #ffa726 0%, #ff8a50 100%);
  border-radius: 1px;
}

/* Override di Vuetify specifico */
.v-card-title.vod-title {
  line-height: 1.1 !important;
  padding: 6px 12px 6px 6px !important;
}

.vod-card-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 18px 10px 6px 10px;
}

.vod-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.duration {
  font-size: 0.75rem;
  color: #a0522d;
}

.price {
  font-weight: 700;
  padding-top: 4px;
  font-size: 1rem;
  color: #d2691e;
  text-align: center;
}

.owned-badge {
  background: #4caf50;
  color: white;
  padding: 1px 6px;
  border-radius: 10px;
  font-size: 0.65rem;
  font-weight: 600;
}

.v-card-actions {
  margin-top: auto;
  padding: 8px 12px 12px 12px;
}

/* Stili per la barra utente */
.user-info-bar {
  margin-bottom: 2rem;
}

.user-card {
  border-radius: 12px;
  border-left: 4px solid #4caf50;
}

.user-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #2e7d32;
  margin-bottom: 4px;
}

.user-email {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

.logout-btn-small {
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.logout-btn-small:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

/* Aggiornamenti per i contenuti posseduti */
.vod-card.owned {
  position: relative;
}

/* Aggiornamenti per i titoli delle sezioni */
.catalogo-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  width: 100%;
  aspect-ratio: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.placeholder-image .v-icon {
  font-size: 48px !important;
}

.no-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem 1rem;
  color: #666;
}

.no-content p {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.no-content .text-caption {
  color: #999;
  font-size: 0.9rem;
}

.catalogo-loading {
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 80px;
  height: 80px;
  background: transparent;
}

/* Stili per il link "Dimenticato password" */
.forgot-password-link {
  text-align: center;
  margin-top: -0.5rem;
}

.forgot-link {
  color: #e27e2c;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #ff9800;
  text-decoration: underline;
}

/* Stili per il checkbox delle condizioni */
.terms-checkbox {
  margin-bottom: -2rem;
  margin-top: -0.6rem;
}

.terms-label {
  font-size: 0.9rem;
  color: #666;
}

.terms-link {
  color: #e27e2c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: #ff9800;
  text-decoration: underline;
}
</style>
