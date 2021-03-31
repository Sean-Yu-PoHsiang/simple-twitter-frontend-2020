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
      role: ''
    },
    isAuthenticated: false,
    token: '',
    isInPublicChatRoom: false,
    isInPrivateChatRoom: false,
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
    },
    enterPublicChatRoom(state) {
      state.isInPublicChatRoom = true
    },
    leavePublicChatRoom(state) {
      state.isInPublicChatRoom = false
    },
    enterPrivateChatRoom(state) {
      state.isInPrivateChatRoom = true
    },
    leavePrivateChatRoom(state) {
      state.isInPrivateChatRoom = false
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      console.log('vuex action start<<<<<<<<<')
      try {
        const response = await userAPI.getCurrentUserProfile()

        if (response.status !== 200) {
          throw new Error(response)
        }

        const {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          role
        } = response.data

        commit('setCurrentUser', {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          role
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
