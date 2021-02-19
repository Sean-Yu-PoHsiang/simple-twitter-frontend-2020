<template>
  <div class="container-md">
    <div class="row">
      <div class="col-auto left-container left-area-rwd component-navbar">
        <Navbar @after-create-tweet="afterCreateTweet" />
      </div>

      <router-view
        :newTweetsPayload="newTweetsPayload"
        :addFollowingPayload="addFollowingPayload"
        :deleteFollowingPayload="deleteFollowingPayload"
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
  }
}
</script>

<style scoped>
.container-md {
  height: 100vh;
}
.row {
  height: 100%;
}
@media screen and (max-width: 992px) {
  .left-container {
    padding: 0 8px 0 8px;
  }
  .right-container {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .main-area-rwd {
    border-right: 0;
  }
}
@media screen and (max-width: 576px) {
  .left-container {
    padding: 0;
  }
  .main-area-rwd {
    border: 0;
  }
}
</style>