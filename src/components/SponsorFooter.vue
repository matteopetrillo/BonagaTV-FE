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
  align-items: flex-start;
  opacity: 98%;
  min-height: 20%;
  height: auto;
  flex-wrap: wrap;
}

.container {
  width: 100%;
  text-align: center;
}

.header {
  margin-top: -8px;
  margin-bottom: -3px;
}

.sponsors-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
}

.sponsor-item {
  max-width: 50%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: -15px;
}

.sponsor-image {
  width: 100%;
  height: auto;
  max-height: 130px;
}

@media screen and (max-width: 600px) {
  .footer {
    padding: 10px;
    min-height: 23%;
    align-items: flex-start;
  }

  .scritta-sponsor {
    font-size: 0.5rem;
  }

  .header {
    margin-top: -4px;
    margin-bottom: 5px;
    }

  .sponsors-wrap {
    gap: 20px;
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