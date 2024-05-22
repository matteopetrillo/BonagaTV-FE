import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layout/MainLayout.vue'
import ChannelView from '../views/ChannelView.vue'
import SpecialEventView from '@/views/SpecialEventView.vue'
import LavoriInCorso from '@/views/LavoriInCorso.vue'
import i18n from '@/i18n'

const lavoriInCorso = false;

const routes = [
  {
    path: '/:lang',
    name: 'base',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomeView,
        name: 'HomeView'
      },
      {
        path: 'channel/:nomeCanale',
        component: ChannelView,
        name: 'ChannelView',
      },
      {
        path: 'special-event',
        name: 'SpecialEventView',
        component: SpecialEventView
      },
      {
        path: 'inprogress',
        name: 'LavoriInCorso',
        component: LavoriInCorso
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  let language = to.params.lang || i18n.global.locale.value;
  i18n.global.locale.value = language;

  if (lavoriInCorso && to.name !== 'LavoriInCorso') {
    next({ name: 'LavoriInCorso', params: {lang: language}});
  } else if (!to.params.lang) {
    next({path: `/${language}` })
  } else {
    next();
  }

})

export default router
