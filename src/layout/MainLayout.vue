<template>
    <div>
        <div class="ma-4 logo">
        <router-link to="/">
            <img src="../assets/bonaga.png"></img>
        </router-link>
        </div>

        <RouterView></RouterView>

        <SponsorFooter/>
    </div>
</template>

<script>
import SponsorFooter from "../components/SponsorFooter.vue";

export default {
components: {
    SponsorFooter
}
}
</script>

<style scoped>

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>
  