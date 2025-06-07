<template>
  <v-main class="bg-white-2">
    <v-container class="py-8 d-flex justify-center">
      <v-card max-width="500" class="mx-auto">
        <v-card-text class="text-center pa-8">
          <!-- Loading State -->
          <div v-if="loading" class="confirmation-state">
            <v-progress-circular
              indeterminate
              color="orange"
              size="64"
              class="mb-4"
            ></v-progress-circular>
            <h2 class="mb-3">{{ $t('emailConfirmation.confermaInCorso') }}</h2>
            <p>{{ $t('emailConfirmation.verificandoAccount') }}</p>
          </div>

          <!-- Email Form -->
          <div v-else-if="showEmailForm" class="confirmation-state">
            <v-icon 
              color="orange" 
              size="64" 
              class="mb-4"
            >mdi-email</v-icon>
            <h2 class="mb-3">{{ $t('emailConfirmation.confermaEmail') }}</h2>
            <p class="mb-4">
              {{ $t('emailConfirmation.inserisciEmail') }}
            </p>
            <v-form @submit.prevent="handleEmailConfirmation">
              <v-text-field
                v-model="confirmationEmail"
                label="Email"
                type="email"
                required
                class="mb-3"
              />
              <v-btn 
                type="submit" 
                color="orange"
                :loading="emailLoading"
                :disabled="emailLoading"
                block
                class="login-btn"
              >
                {{ $t('emailConfirmation.confermaAccount') }}
              </v-btn>
              <v-alert
                v-if="emailError"
                type="error"
                class="mt-3"
                dense
              >{{ emailError }}</v-alert>
            </v-form>
          </div>

          <!-- Success State -->
          <div v-else-if="confirmed" class="confirmation-state">
            <v-icon 
              color="success" 
              size="64" 
              class="mb-4"
            >mdi-check-circle</v-icon>
            <h2 class="mb-3 text-success">{{ $t('ondemand.emailConfermata') }}</h2>
            <p class="mb-4">
              {{ $t('ondemand.accountAttivato') }}
            </p>
            <v-btn 
              color="orange" 
              @click="goToLogin"
              class="login-btn"
            >
              {{ $t('emailConfirmation.vaiAlLogin') }}
            </v-btn>
          </div>

          <!-- Error State -->
          <div v-else class="confirmation-state">
            <v-icon 
              color="error" 
              size="64" 
              class="mb-4"
            >mdi-alert-circle</v-icon>
            <h2 class="mb-3 text-error">{{ $t('ondemand.erroreConferma') }}</h2>
            <p class="mb-4">{{ errorMessage }}</p>
            <v-btn 
              color="orange" 
              @click="goToLogin"
            >
              {{ $t('emailConfirmation.tornaAlLogin') }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { ondemandAuthApi } from '@/api/ondemand';

export default {
  name: 'EmailConfirmationView',
  data() {
    return {
      loading: true,
      confirmed: false,
      errorMessage: '',
      showEmailForm: false,
      confirmationEmail: '',
      emailLoading: false,
      emailError: '',
    }
  },
  async mounted() {
    const token = this.$route.query.token;
    const email = this.$route.query.email;
    
    if (!token) {
      this.redirectWithError('Token di conferma mancante o non valido.');
      return;
    }

    if (email) {
      await this.confirmWithEmail(token, email);
    } else {
      this.loading = false;
      this.showEmailForm = true;
    }
  },
  methods: {
    async confirmWithEmail(token, email) {
      try {
        await ondemandAuthApi.confirmEmail(token, email);
        // Reindirizza alla pagina OnDemand con successo
        this.$router.push({
          path: `/${this.$i18n.locale}/ondemand`,
          query: { emailConfirmed: 'success' }
        });
      } catch (error) {
        this.redirectWithError(error.message || 'Errore durante la conferma dell\'email.');
      }
    },

    async handleEmailConfirmation() {
      if (!this.confirmationEmail) {
        this.emailError = this.$t('emailConfirmation.inserisciEmailValida');
        return;
      }

      this.emailLoading = true;
      this.emailError = '';
      const token = this.$route.query.token;

      await this.confirmWithEmail(token, this.confirmationEmail);
    },

    redirectWithError(errorMessage) {
      this.$router.push({
        path: `/${this.$i18n.locale}/ondemand`,
        query: { emailConfirmed: 'error', error: errorMessage }
      });
    }
  }
}
</script>

<style scoped>
.bg-white-2 {
  background: linear-gradient(to bottom, rgba(249, 249, 249, 0.97), rgba(255, 255, 255, 0.97));
  min-height: 100vh;
}

.confirmation-state {
  padding: 2rem 0;
}

.login-btn {
  border-radius: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #ff9800 0%, #e27e2c 100%);
  color: #fff !important;
  box-shadow: 0 2px 8px 0 #e27e2c33;
  transition: background 0.2s, box-shadow 0.2s;
}

.login-btn:hover {
  background: linear-gradient(90deg, #e27e2c 0%, #ff9800 100%);
  box-shadow: 0 4px 16px 0 #e27e2c44;
}

.action-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 600px) {
  .action-buttons {
    flex-direction: column;
  }
  .action-buttons .v-btn {
    margin: 4px 0;
  }
}
</style>
