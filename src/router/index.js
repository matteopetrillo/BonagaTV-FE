import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue' // Commentato se non esiste
import i18n from '../i18n'

const setLocale = (locale) => {
  if (i18n.global.availableLocales.includes(locale)) {
    i18n.global.locale.value = locale;
  }
}

const routes = [
  {
    path: '/',
    redirect: '/it'
  },
  {
    path: '/:locale',
    name: 'Home',
    component: () => import('../views/LiveView.vue'), // Uso LiveView come home temporaneamente
    beforeEnter: (to, from, next) => {
      setLocale(to.params.locale);
      next();
    }
  },
  {
    path: '/:locale/live',
    name: 'Live',
    component: () => import('../views/LiveView.vue'),
    beforeEnter: (to, from, next) => {
      setLocale(to.params.locale);
      next();
    }
  },
  {
    path: '/:locale/ondemand',
    name: 'OnDemand',
    component: () => import('../views/OnDemandView.vue'),
    beforeEnter: (to, from, next) => {
      setLocale(to.params.locale);
      next();
    }
  },
  {
    path: '/:locale/ondemand/confirm-email',
    name: 'EmailConfirmation',
    component: () => import('../views/EmailConfirmationView.vue'),
    beforeEnter: (to, from, next) => {
      setLocale(to.params.locale);
      next();
    }
  },
  {
    path: '/:locale/ondemand/player',
    name: 'VodPlayer',
    component: () => import('../views/VodPlayerView.vue'),
    beforeEnter: (to, from, next) => {
      setLocale(to.params.locale);
      next();
    }
  },
  {
    path: '/:locale/channel',
    name: 'ChannelView',
    component: () => import('../views/ChannelView.vue'),
    beforeEnter: (to, from, next) => {
      setLocale(to.params.locale);
      next();
    }
  },
  // Commento le rotte che puntano a file inesistenti
  // {
  //   path: '/:locale/about',
  //   name: 'About',
  //   component: () => import('../views/AboutView.vue'),
  //   beforeEnter: (to, from, next) => {
  //     setLocale(to.params.locale);
  //     next();
  //   }
  // },
  // {
  //   path: '/:locale/contact',
  //   name: 'Contact',
  //   component: () => import('../views/ContactView.vue'),
  //   beforeEnter: (to, from, next) => {
  //     setLocale(to.params.locale);
  //     next();
  //   }
  // },
  // {
  //   path: '/:locale/privacy-policy',
  //   name: 'PrivacyPolicy',
  //   component: () => import('../views/PrivacyPolicyView.vue'),
  //   beforeEnter: (to, from, next) => {
  //     setLocale(to.params.locale);
  //     next();
  //   }
  // },
  // {
  //   path: '/:locale/terms-of-service',
  //   name: 'TermsOfService',
  //   component: () => import('../views/TermsOfServiceView.vue'),
  //   beforeEnter: (to, from, next) => {
  //     setLocale(to.params.locale);
  //     next();
  //   }
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/LiveView.vue'), // Reindirizzo a LiveView per ora
    beforeEnter: (to, from, next) => {
      // Reindirizza alla home con locale italiano
      next('/it');
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;