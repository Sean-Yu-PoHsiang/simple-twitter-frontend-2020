import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

// test server 'http://localhost:4000'
Vue.use(new VueSocketIO({
  debug: false,
  connection: SocketIO('https://merry-simple-twitter.herokuapp.com', {
    auth: {
      token: localStorage.getItem('token')
    }
  }),
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
