<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <Navbar />
      </div>
      <div class="col-auto"></div>
      <div class="col">
        <h1>public chat room</h1>
        <textarea
          v-model="message.content"
          name="messageContent"
          rows="1"
          @keyup.enter="sendMessage"
        ></textarea>
        <button @click="sendMessage">send</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import Navbar from '../components/Navbar.vue'
import { mapState } from "vuex";

//eslint-disable-next-line
const socket = io('http://localhost:4000')
socket.on('messageToAll', message => {
  console.log('form server', message)
})

export default {
  components: {
    Navbar
  },
  data() {
    return {
      message: {
        userName: '',
        content: ''
      }
    }
  },
  created() {
    this.message.userName = this.currentUser.name
  }
  ,
  computed: {
    ...mapState(["currentUser"]),
  },
  mounted() {
    //eslint-disable-next-line

  },
  methods: {
    sendMessage() {
      socket.emit('message', this.message)
      this.message.content = ''
    }
  }
}
</script>

<style>
</style>