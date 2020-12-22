import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from './../views/SignIn.vue'
import SignUp from './../views/SignUp.vue'
import UserSetting from './../views/UserSetting.vue'
import UserFollows from './../views/UserFollows.vue'
// import UserFollowings from './../views/UserFollowings.vue'
import Home from './../views/Home.vue'
import Tweet from './../views/Tweet.vue'


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
    //:user/tweet/: id'
    path: '/tweets/:tweetId',
    name: 'tweet',
    component: Tweet
  },
  {
    path: '/setting',
    name: 'user-setting',
    component: UserSetting
  },
  {
    //:user/follows
    path: '/users/:userId/followers',
    name: 'user-followers',
    component: UserFollows
  },
  {
    //:user/follows
    path: '/users/:userId/followings',
    name: 'user-followings',
    component: UserFollows
  },
  {
    path: '/users/:userId',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:userId/with_replies',
    name: 'user-with-replies',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:userId/likes',
    name: 'user-likes',
    component: () => import('../views/User.vue')
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: () => import('../views/AdminSignIn.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
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
