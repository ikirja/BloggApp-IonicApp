import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'
import Main from '@/views/Main.vue'

Vue.use(IonicVueRouter)

const routes = [
  {
    path: '/',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blog',
    component: Main
  },
  {
    path: '/post',
    name: 'post',
    component: Main
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Main
  },
  {
    path: '/account',
    name: 'account',
    component: Main
  }
]

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
