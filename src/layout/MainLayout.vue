<template>

    <v-sheet
    class="text-center pr-8"
    :height="85"
    :elevation="3"
    style="flex-direction: column; z-index: 999; position: fixed; width: 100%;">
    <router-link to="/">
        <img class="mt-n5" style="height: 130px;" src="https://test.it-mil-1.linodeobjects.com/bonaga.png"></img>
    </router-link>
    </v-sheet>
<!-- 
    <v-app-bar :elevation="2" class="py-4"> 
        <v-app-bar-title class="grow">
            <div class="text-center pr-8">
                <router-link to="/">
                    <img src="https://test.it-mil-1.linodeobjects.com/bonaga.png"></img>
                </router-link>
            </div>
        </v-app-bar-title>
    </v-app-bar> -->


    <RouterView style="padding-top: 80px;"></RouterView>

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

</style>
  