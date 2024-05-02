<template>

    <v-sheet
    class="text-center pr-8 bar"
    :height="85"
    :elevation="3"
    style="flex-direction: column; z-index: 999; position: fixed; width: 100%;">
    <router-link :to="{name: 'HomeView'}">
        <img class="mt-n5" style="height: 100px; padding-top: 22px;" src='@/assets/bonaga.png'></img>
    </router-link>
    </v-sheet>

    <RouterView class="view"></RouterView>

    <SponsorFooter/>

</template>

<script>
import SponsorFooter from "@/components/SponsorFooter.vue";

export default {
    components: {
        SponsorFooter
    }
}
</script>

<style scoped>

.view { 
    width: 80%; 
    margin-right: auto; 
    margin-left: auto;
    margin-top: 80px;
}


@media screen and (max-width: 600px) { 
    .view {
    margin-top: 70px;
    width: 100%; 
    margin-right: auto; 
    margin-left: auto;
    }
} 

@media screen and (min-width: 750px) and (max-width: 1200px) { 
    .view {
    margin-top: 70px;
    width: 100%; 
    margin-right: auto; 
    margin-left: auto;
    }
} 

</style>
  