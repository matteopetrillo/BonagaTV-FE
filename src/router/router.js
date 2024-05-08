import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layout/MainLayout.vue'
import ChannelView from '../views/ChannelView.vue'
import SpecialEventView from '@/views/SpecialEventView.vue'
import i18n from '@/i18n'

const routes = [
  {
    path: '/',
    redirect: `/${i18n.global.locale.value}`
  },  
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
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  let language = to.params.lang || i18n.global.locale.value;
  i18n.global.locale.value = language;
  next();
})

export default router
