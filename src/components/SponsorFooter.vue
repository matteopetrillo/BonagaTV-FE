<template>
    <v-footer app color="grey-darken-2" class="footer">
        <v-flex xs1>
            <v-row justify="center" >
                <p class="text-h5 text-white">
                    {{ $t('sponsor') }}
                </p> 
            </v-row>
            <v-row justify="center" >
                <v-col v-for="(sponsor, index) in sponsors" :key="index">
                    <img :src="sponsor.srcImgLink" class="sponsor-image">
                </v-col>
            </v-row>
        </v-flex>              
    </v-footer>
</template>

<script>
    import { mapGetters } from 'vuex'

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
        created() {
            this.sponsors = this.getSponsors;
        }
    }
</script>

<style scoped>
.footer {
    height: 15%;
    width: 100%;
    padding: 25px;
    flex-direction: column;
}

.sponsor-image {
    width: 80px;
    height: auto;
}


</style>