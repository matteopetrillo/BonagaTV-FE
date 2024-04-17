<template>
    <v-container class="cont"> 
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
                            variant="elevated">
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
                </v-container>
            </v-col>

        </v-row>
        
    </v-container>   


</template>

<script>
import PaypalButtons from '@/components/PaypalButtons.vue'

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
            password: ''
        }
    }
}

</script>

<style scoped>

.cont {
    width: 60%;
    padding-left: 150px;
}

@media screen and (max-width: 600px) { 
    .cont { 
    width: 100%;
    padding-left: 0;
    } 
} 

@media screen and (max-width: 1300px) { 
    .cont { 
    width: 100%;
    padding-left: 0;
    } 
} 

</style>