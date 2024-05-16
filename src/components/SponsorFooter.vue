<template>
    <v-footer app color="grey-darken-2" class="footer">
        <v-flex xs1>
            <v-row justify="center" >
                <p class="text-h5 text-white">
                    {{ $t('sponsor') }}
                </p> 
            </v-row>
            <v-row justify="center" >
                <v-col v-for="(sponsor, index) in sponsors" :key="index" cols="2">
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
    height: 18%;
    width: 100%;
    padding: 25px;
    flex-direction: column;
    opacity: 98%;
}

.sponsor-image {
    width: 100px;
    height: auto;
    margin-left: 15px;
    margin-right: 15px;
}

@media screen and (max-width: 600px) {
    .footer {
        height: 22%;
        width: 100%;
        padding: 15px;
        flex-direction: column;
    }

    .sponsor-image {
        width: 60px;
        height: auto;
        margin: auto;
    }
}


</style>