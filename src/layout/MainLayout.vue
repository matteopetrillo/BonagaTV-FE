<template>
    <v-sheet class="bar" :height="75" :elevation="3">
        <div class="header-container">
            <!-- Desktop/Tablet Layout -->
            <div class="desktop-layout">
                <div class="logo-container">
                    <router-link :to="`/${language}`">
                        <img class="logo" src='@/assets/bonaga.png'></img>
                    </router-link>
                </div>
                <div class="tabs-container">
                    <v-tabs
                        v-model="activeTab"
                        color="orange"
                        align-tabs="center"
                        @update:model-value="handleTabChange"
                    >
                        <v-tab value="live">Live</v-tab>
                        <v-tab value="ondemand">On Demand</v-tab>
                    </v-tabs>
                </div>
                <div class="lang-switcher-container">
                    <LangSwitcher class="lang-switcher" />
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="mobile-layout">
                <div class="center-group">
                    <div class="logo-container">
                        <router-link :to="`/${language}`">
                            <img class="logo" src='@/assets/bonaga.png'></img>
                        </router-link>
                    </div>
                    <div class="lang-switcher-container">
                        <LangSwitcher class="lang-switcher" />
                    </div>
                </div>
                <v-icon 
                    class="menu-icon"
                    @click="showMobileMenu = !showMobileMenu"
                >
                    {{ showMobileMenu ? 'mdi-close' : 'mdi-menu' }}
                </v-icon>
            </div>
        </div>
    </v-sheet>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'show-mobile': showMobileMenu }">
        <v-tabs
            v-model="activeTab"
            color="orange"
            align-tabs="center"
            @update:model-value="handleTabChange"
        >
            <v-tab value="live">Live</v-tab>
            <v-tab value="ondemand">On Demand</v-tab>
        </v-tabs>
    </div>
    
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
    data() {
        return {
            activeTab: 'live',
            showMobileMenu: false
        }
    },
    computed: {
        language() {
            return i18n.global.locale.value;
        }
    },
    methods: {
        handleTabChange(newTab) {
            this.$store.commit('setActiveTab', newTab);
            this.$router.push(`/${this.language}/${newTab}`);
        }
    }
}
</script>

<style scoped>
.view {
    width: 80%;
    max-width: 1600px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 65px;  /* Ridotto da 80px */
}

@media screen and (max-width: 600px) {
    .view {
        margin-top: 55px;  /* Ridotto da 70px */
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
}

@media screen and (min-width: 750px) and (max-width: 1200px) {
    .view {
        margin-top: 55px;  /* Ridotto da 70px */
        width: 90%;
        margin-right: auto;
        margin-left: auto;
    }
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    max-width: 1600px;
    margin: 0 auto;
    height: 100%;
    padding: 0 20px;
}

.center-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.logo-container {
    flex: 0 0 auto;
}

.tabs-container {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-left: 2rem;
}

.lang-switcher-container {
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-end;
}

.logo {
    height: 65px;
    padding-top: 5px;
}

.bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    position: fixed;
    width: 100%;
    z-index: 999;
    background-color: white; /* Add solid background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Consistent shadow */
}

.lang-switcher {
    transform: scale(0.9);
    width: auto;
    margin-left: 0;
}

.menu-icon {
    cursor: pointer;
    font-size: 28px;
    color: rgba(0, 0, 0, 0.87);  /* Grigio standard Material Design */
}

/* Mobile only */
@media screen and (max-width: 600px) {
    .header-container {
        width: 100%;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .center-group {
        flex: 1;
        justify-content: center;
    }

    .menu-icon {
        display: block;
    }

    .tabs-container {
        display: none;
        position: absolute;
        top: 75px;
        left: 0;
        width: 100%;
        background: white;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tabs-container.show-mobile {
        display: block;
    }

    .view {
        margin-top: 85px;
        width: 100%;
    }

    .logo {
        height: 60px;
        padding-top: 3px;
    }

    .bar {
        height: auto;
        min-height: 75px;
        padding: 10px 0;
    }
}

/* Tablet */
@media screen and (min-width: 601px) and (max-width: 1024px) {
    .header-container {
        width: 90%;
    }

    .menu-icon {
        display: none;
    }

    .tabs-container {
        display: flex;
        margin-left: 2rem;
    }
}

/* Desktop */
@media screen and (min-width: 1025px) {
    .header-container {
        width: 80%;
    }
}

@media screen and (min-width: 750px) and (max-width: 1200px) {
    .header-container {
        width: 90%;
    }
}

.desktop-layout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.mobile-layout {
    display: none;
}

.mobile-menu {
    display: none;
}

@media screen and (max-width: 600px) {
    .desktop-layout {
        display: none;
    }

    .mobile-layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .mobile-menu {
        display: none;
        position: absolute;
        top: 75px;
        left: 0;
        width: 100%;
        background: white;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .mobile-menu.show-mobile {
        display: block;
    }

    /* ...existing mobile styles... */
}

/* Tablet and Desktop */
@media screen and (min-width: 601px) {
    .desktop-layout {
        position: relative;  /* Aggiunto per il posizionamento assoluto del lang switcher */
    }

    .tabs-container {
        position: absolute;
        left: 49%;
        transform: translateX(-50%);
        width: auto;
    }

    .logo-container {
        flex: 1;
    }

    .lang-switcher-container {
        position: absolute;  /* Posizionamento assoluto per non influenzare il layout delle tab */
        right: -2rem;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>