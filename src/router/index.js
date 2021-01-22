import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store'

import NotFound from '../views/NotFound.vue'
import SignIn from './../views/SignIn.vue'
// import Home from './../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/',
    name: 'root',
    component: () => import('../views/Layout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'public-chatroom',
        name: 'public-chat-room',
        component: () => import('../views/PublicChatroom.vue')
      },
      {
        path: 'tweets/:tweetId',
        name: 'tweet',
        component: () => import('../views/Tweet.vue')
      },
      {
        path: 'setting',
        name: 'user-setting',
        component: () => import('../views/UserSetting.vue')
      },
      {
        path: 'users/:userId/followers',
        name: 'user-followers',
        component: () => import('../views/UserFollowers.vue')
      },
      {
        path: 'users/:userId/followings',
        name: 'user-followings',
        component: () => import('../views/UserFollowings.vue')
      },
      {
        path: 'users/:userId',
        name: 'user',
        component: () => import('../views/User.vue')
      },
      {
        path: 'users/:userId/with_replies',
        name: 'user-with-replies',
        component: () => import('../views/UserWithReplies.vue')
      },
      {
        path: 'users/:userId/likes',
        name: 'user-likes',
        component: () => import('../views/UserLikes.vue')
      },
    ]
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('../views/Home.vue')
  // },
  // {
  //   path: '/tweets/:tweetId',
  //   name: 'tweet',
  //   component: () => import('../views/Tweet.vue')
  // },
  // {
  //   path: '/setting',
  //   name: 'user-setting',
  //   component: () => import('../views/UserSetting.vue')
  // },
  // {
  //   path: '/users/:userId/followers',
  //   name: 'user-followers',
  //   component: () => import('../views/UserFollowers.vue')
  // },
  // {
  //   path: '/users/:userId/followings',
  //   name: 'user-followings',
  //   component: () => import('../views/UserFollowings.vue')
  // },
  // {
  //   path: '/users/:userId',
  //   name: 'user',
  //   component: () => import('../views/User.vue')
  // },
  // {
  //   path: '/users/:userId/with_replies',
  //   name: 'user-with-replies',
  //   component: () => import('../views/UserWithReplies.vue')
  // },
  // {
  //   path: '/users/:userId/likes',
  //   name: 'user-likes',
  //   component: () => import('../views/UserLikes.vue')
  // },
  // {
  //   path: '/public-chatroom',
  //   name: 'public-chat-room',
  //   component: () => import('../views/PublicChatroom.vue')
  // },
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

// const authorizeIsAdmin = (to, from, next) => {
//   const currentUser = store.state.currentUser
//   if (currentUser && !currentUser.isAdmin) {
//     next('/404')
//     return
//   }

//   next()
// }

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'sign-in', 'admin-sign-in']

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  // 如果 token 有效則轉址到餐廳首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/home')
    return
  }

  next()
})

export default router
