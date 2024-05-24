<template>
    <v-footer app color="grey-darken-2" class="footer">
      <div class="container">
        <div class="header">
          <p class="text-h5 text-white scritta-sponsor">
            <strong>{{ $t('sponsor') }}</strong>
          </p>
        </div>
        <div class="sponsors-wrap">
          <div class="sponsor-item">
            <img src="@/assets/bannerQD.jpg" class="sponsor-image">
          </div>
          <div class="sponsor-item">
            <img src="@/assets/deniro.jpg" class="sponsor-image">
          </div>
          <div class="sponsor-item">
            <img src="@/assets/giannittiBanner.jpg" class="sponsor-image">
          </div>
        </div>
      </div>
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
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 98%;
  max-height: 20%;
}

.container {
  width: 100%;
  text-align: center;
}

.header {
  margin-top: 10px;
  margin-bottom: -3px;
}

.sponsors-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.sponsor-item {
  max-width: 50%;
  padding: 10px;
}

.sponsor-image {
  width: auto;
  max-height: 130px;
}

@media screen and (max-width: 600px) {
  .footer {
    padding: 10px;
    max-height: 23%;
  }

  .scritta-sponsor {
    font-size: 0.5rem;
  }

  .header {
    margin-top: -2px;
    margin-bottom: 5px;
    }

  .sponsors-wrap {
    gap: 5px;
  }
  .sponsor-item {
    max-width: 45%;
    padding: 2px;
  }

  .sponsor-image {
    max-height: 50px;
    margin: -4px 0;
  }
}
</style>