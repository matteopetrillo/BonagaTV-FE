<template>
    <v-footer app color="grey-darken-2" class="footer">
        <v-flex xs1>
            <v-row justify="center" >
                <p class="text-h5 text-white mb-n2">
                   <strong>{{ $t('sponsor') }}</strong> 
                </p> 
            </v-row>
            <v-row justify="center" >
                <v-col cols="6">
                    <img src="@/assets/bannerQD.jpg" class="sponsor-image">
                </v-col>
                <v-col cols="6">
                    <img src="@/assets/giannittiBanner.jpg" class="sponsor-image">
                </v-col>
            </v-row>
        </v-flex>              
    </v-footer>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getSponsors } from '@/services/api'

    export default {
        name: "SponsorFooter",
        computed: {
        ...mapGetters([
            'getSponsors',
        ])},
        data() {
            return {
                sponsors: null
            }
        },
        // async created() {
        //     const responseSponsor = await getSponsors();
        //     this.sponsors = this.getSponsors;
        // }
    }
</script>

<style scoped>
.footer {
    height: 20%;
    width: 100%;
    padding: 25px;
    flex-direction: column;
    opacity: 98%;
}

.sponsor-image {
    width: auto;
    height: 130px;
    margin: auto;
}

@media screen and (max-width: 600px) {
    .footer {
        height: 20%;
        width: 100%;
        padding: 15px;
        flex-direction: column;
    }

    .sponsor-image {
        width: auto;
        height: 60px;
        margin: auto;
    }
}


</style>