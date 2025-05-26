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
                        class="custom-tabs"
                    >
                        <v-tab value="live" class="font-weight-bold">
                            <v-icon left>mdi-video</v-icon>
                            Live
                        </v-tab>
                        <v-tab value="ondemand" class="font-weight-bold">
                            <v-icon left>mdi-play-circle</v-icon>
                            On Demand
                        </v-tab>
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
            class="custom-tabs"
        >
            <v-tab value="live" class="font-weight-bold">
                <v-icon left>mdi-video</v-icon>
                Live
            </v-tab>
            <v-tab value="ondemand" class="font-weight-bold">
                <v-icon left>mdi-play-circle</v-icon>
                On Demand
            </v-tab>
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
    watch: {
        // Aggiungi un watcher per sincronizzare il tab attivo con la rotta
        '$route'(to) {
            this.updateActiveTab(to);
        }
    },
    mounted() {
        // Imposta il tab attivo al mount basandosi sulla rotta corrente
        this.updateActiveTab(this.$route);
    },
    methods: {
        handleTabChange(newTab) {
            this.showMobileMenu = false; // Chiudi il menu mobile se aperto
            this.$router.push(`/${this.language}/${newTab}`);
        },
        
        updateActiveTab(route) {
            // Estrai la sezione dalla rotta corrente
            const path = route.path;
            if (path.includes('/ondemand')) {
                this.activeTab = 'ondemand';
            } else if (path.includes('/live')) {
                this.activeTab = 'live';
            } else {
                // Default a live per la home
                this.activeTab = 'live';
            }
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
    margin-top: 65px;
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
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lang-switcher {
    transform: scale(0.9);
    width: auto;
    margin-left: 0;
}

.menu-icon {
    cursor: pointer;
    font-size: 28px;
    color: rgba(0, 0, 0, 0.87);
}

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

/* Mobile */
@media screen and (max-width: 600px) {
    .view {
        margin-top: 55px;
        width: 100%;
    }
    
    .header-container {
        width: 100%;
        padding: 0 20px;
    }
    
    .logo {
        height: 60px;
        padding-top: 3px;
    }
}

/* Tablet and Desktop */
@media screen and (min-width: 601px) {
    .desktop-layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        position: relative;
    }
    
    .mobile-layout {
        display: none;
    }
    
    .mobile-menu {
        display: none;
    }
    
    .tabs-container {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
    }
    
    .lang-switcher-container {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}

@media screen and (min-width: 750px) and (max-width: 1200px) {
    .view {
        margin-top: 55px;
        width: 90%;
    }
    
    .header-container {
        width: 90%;
    }
}

/* Stili personalizzati per le tabs */
:deep(.custom-tabs) {
    .v-tab {
        min-width: 110px;
        font-weight: 600 !important;
        padding: 0 16px;
        margin-bottom: -10px;
        
        .v-icon {
            margin-right: 8px;
        }
    }

    .v-tab--selected {
        font-weight: 700 !important;
    }

    .v-tabs-bar {
        height: 32px !important;
    }

    .v-slide-group__content {
        gap: 8px;
    }

    .v-tab__slider {
        height: 2px !important;
        margin-top: -4px;
    }
}
</style>