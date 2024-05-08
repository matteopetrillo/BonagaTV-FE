<template>

    <v-sheet class="pr-8 bar" :height="85" :elevation="3"
        style="z-index: 999; position: fixed; width: 100%; align-items: center;">
        <div
            style="display: flex; justify-content: center; align-items: center; max-width: fit-content; margin-top: 5px">
            <router-link :to="`/${language}`">
                <img class="logo" style="height: 100px; padding-top: 22px;" src='@/assets/bonaga.png'></img>
            </router-link>

            <LangSwitcher class="lang-switcher" style="margin-top: 13px;" />
        </div>

    </v-sheet>

    <RouterView class="view"></RouterView>

    <SponsorFooter />

</template>

<script>
import SponsorFooter from "@/components/SponsorFooter.vue";
import LangSwitcher from '@/components/LangSwitcher.vue';
import i18n from "@/i18n";

export default {
    components: {
        SponsorFooter,
        LangSwitcher
    },
    computed: {
        language() {
            return i18n.global.locale.value;
        }
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

.logo {
    height: 100px;
    padding-top: 22px;
    margin-top: -20px;
    margin-left: 40px;
}

.bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    position: fixed;
    width: 100%;
    z-index: 999;
}

.lang-switcher {
    transform: scale(0.8);
    width: 80%;
    margin-left: -10px;
}
</style>