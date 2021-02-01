<template>
  <div class="container">
    <div class="row">
      <div class="col-auto left-container left-area-rwd component-navbar">
        <Navbar
          @after-create-tweet="afterCreateTweet"
          :isPublicChatRoomRead="isPublicChatRoomRead"
        />
      </div>

      <router-view
        :newTweetsPayload="newTweetsPayload"
        :addFollowingPayload="addFollowingPayload"
        :deleteFollowingPayload="deleteFollowingPayload"
        @after-messages-read="afterMessagesRead"
        @after-leave-public-chat-room="afterLeavePublicChatRoom"
      />

      <div class="col-auto right-container right-area-rwd">
        <TopFollowersUser
          class="component-top-followers-user"
          @after-click-add-following="afterClickAddFollowingPayload"
          @after-click-delete-following="afterClickDeleteFollowingPayload"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TopFollowersUser from "./../components/TopFollowersUser.vue"
import Navbar from "./../components/Navbar.vue"

export default {
  components: {
    TopFollowersUser,
    Navbar,
  },
  data() {
    return {
      newTweetsPayload: {},
      addFollowingPayload: {},
      deleteFollowingPayload: {},
      isPublicChatRoomRead: false
    }
  },
  created() { },
  mounted() { },
  methods: {
    afterCreateTweet(payload) {
      this.newTweetsPayload = payload
    },
    afterClickAddFollowingPayload(payload) {
      this.addFollowingPayload = payload
    },
    afterClickDeleteFollowingPayload(payload) {
      this.deleteFollowingPayload = payload
    },
    afterMessagesRead() {
      console.log("message read")
      this.isPublicChatRoomRead = true
    },
    afterLeavePublicChatRoom() {
      console.log("leave chat room ?>>>>>>>")
      this.isPublicChatRoomRead = false
    }
  }
}
</script>

<style scoped>
</style>