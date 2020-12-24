import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './../apis/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      email: '',
      avatar: '',
      // isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      console.log('clear local storage')
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('currentUserId')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const getCurrentUserId = () => localStorage.getItem('currentUserId')

        //add api with token only user profile return

        const response = await userAPI.getUserProfile({ userId: getCurrentUserId() })

        if (response.status !== 200) {
          throw new Error(response)
        }

        const { id, name, account, email, avatar } = response.data

        commit('setCurrentUser', {
          id,
          name,
          account,
          email,
          avatar,
          // isAdmin
        })
        return true

      } catch (error) {
        console.error(error)
        console.error('can not fetch user information')
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
