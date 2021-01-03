import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home';
import Login from '@/components/auth/Login';
import Sign from '@/components/auth/Sign';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/sign',
    name: 'Sign',
    component:Sign
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
