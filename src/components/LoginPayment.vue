<template>
    <v-container> 
        <v-row>
            <v-col cols="12" sm="8" md="5">
                <v-container>
                    <v-form >
                        <p class="text-h6 pb-3">
                            Accedi per guardare la diretta
                        </p>
                        <v-text-field
                        v-model="email"
                        label="Email"
                        ></v-text-field>
                        <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        ></v-text-field>
                        <div class="text-center" >
                            <v-btn
                            class="text-none mb-4"
                            size="large"
                            variant="elevated"
                            @click="authUser">
                            Login
                            </v-btn>
                            <p><a href="">Ho dimenticato la password.</a></p>
                        </div>
                        
                    </v-form>
                </v-container>
            </v-col>
            
            <v-divider
            class="ms-3"
            inset
            vertical
            ></v-divider>

            <v-col cols="12" sm="8" md="5">
                <v-container>
                    <p class="text-h6 pb-3">
                        Acquista il tuo biglietto virtuale
                    </p>
                    <PaypalButtons></PaypalButtons>
                </v-container>
            </v-col>

        </v-row>
        
    </v-container>   


</template>

<script>
import PaypalButtons from '@/components/PaypalButtons.vue'
import { login } from '@/services/api.js'


export default {
    name: 'LoginPayment',
    components: {
        PaypalButtons
    },
    props: {
        idEvento: {
            required: true
        }
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {

        authUser() {
            login(this.email, this.password, this.idEvento)
                .then(response => {

                    this.$store.dispatch('setCredentials', { email: this.email, password: this.password });
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

</style>