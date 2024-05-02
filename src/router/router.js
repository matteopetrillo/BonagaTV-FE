import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layout/MainLayout.vue'
import ChannelView from '../views/ChannelView.vue'
import SpecialEventView from '@/views/SpecialEventView.vue'
import InCostruzione from '@/components/InCostruzione.vue'
import store from '@/store/store.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: InCostruzione,
        name: 'HomeView'
      },
      {
        path: '/channel/:nomeCanale',
        component: ChannelView,
        name: 'ChannelView',
      },
      {
        path: '/special-event',
        name: 'SpecialEventView',
        component: SpecialEventView
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Aggiungi una guardia di navigazione per controllare l'autenticazione dell'utente prima di accedere alle rotte protette
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Controlla se l'utente è autenticato nello store Vuex
    if (!store.state.isAuthenticated) {
      // Se l'utente non è autenticato, reindirizza alla pagina di login
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
