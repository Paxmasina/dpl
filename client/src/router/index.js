import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import Catalogue from '../views/Catalogue.vue'
import MyTravels from '../views/MyTravels.vue'
import Update from '../views/Update.vue'
import UpdateImage from '../views/UpdateImage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    component: Catalogue
  },
  {
    path: '/myTravels',
    name: 'myTravels',
    component: MyTravels
  },
  {
    path: '/update',
    name: 'update',
    component: Update
  },
  {
    path: '/updateImage',
    name: 'updateImage',
    component: UpdateImage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
