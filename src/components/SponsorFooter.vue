<template>
    <v-footer app color="grey-darken-2" class="footer">
        <v-flex xs1>
            <v-row justify="center" >
                <p class="text-h5 text-white">
                    {{ $t('sponsor') }}
                </p> 
            </v-row>
        </v-flex>              
    </v-footer>
</template>

<script>
    export default {
        name: "SponsorFooter"
    }
</script>

<style scoped>
.footer {
    height: 15%;
    width: 100%;
    padding: 25px;
    flex-direction: column;
}

</style>