<template>
    <v-container style="display: flex; max-width: fit-content;">
        <v-avatar @click="currentLang = 'it'" style="cursor: pointer; margin-inline: 10px;">
            <img :src="itaIcon">
        </v-avatar>
        <div :class="selectedLineClass"
            style="height: 3px; background-color: orange; position: absolute; z-index: 999;"></div>
        <v-avatar @click="currentLang = 'en'" style="cursor: pointer;">
            <img :src="engIcon">
        </v-avatar>
        <div v-if="currentLang === 'en'" class="selected-line-en"></div>
    </v-container>
</template>

<script>
import i18n from '@/i18n';

export default {
    data() {
        return {
            engIcon: require('@/assets/flags/en.png'),
            itaIcon: require('@/assets/flags/it.png'),
            currentLang: 'it'
        };
    },
    watch: {
        currentLang(newVal) {
            i18n.global.locale.value = newVal;
            const query = this.$route.query;
            this.$router.replace({ query, params: { lang: i18n.global.locale.value } });
        }
    },
    computed: {
        selectedLineClass() {
            return `selected-line ${this.currentLang}`;
        }
    }
};
</script>

<style scoped>
.selected-line {
    width: 33px;
    margin-top: 45px;
}

.selected-line.it {
    margin-left: 14px;
}

.selected-line.en {
    margin-left: 64px;
}
</style>