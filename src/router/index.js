import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layout/MainLayout.vue'
import ChannelView from '../views/ChannelView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomeView,
        name: 'HomeView'
      },
      {
        path: '/channel/:nomeCanale',
        component: ChannelView,
        name: 'ChannelView',
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
