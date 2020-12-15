import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from './../views/SignIn.vue'
import SignUp from './../views/SignUp.vue'
import UserSetting from './../views/UserSetting.vue'
import Home from './../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/user/setting',
    name: 'user-setting',
    component: UserSetting
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },

]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
