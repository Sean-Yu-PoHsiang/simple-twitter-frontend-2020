<template>
  <nav class="d-flex flex-column nav-wrapper">
    <Logo class="mt-3 mb-5" />
    <router-link to="/home" class="nav-btn d-flex fonSize18 align-items-center">
      <div class="d-flex">
        <IconHome class="nav-link-icon" />
        <p class="nav-link-title">首頁</p>
      </div>
    </router-link>

    <router-link
      :to="{ name: 'user', params: { userId: currentUser.id } }"
      class="nav-btn d-flex fonSize18 align-items-center"
    >
      <div class="d-flex">
        <IconUserProfile class="nav-link-icon" />
        <p class="nav-link-title">個人資料</p>
      </div>
    </router-link>
    <router-link
      :to="{ name: 'public-chat-room' }"
      class="nav-btn d-flex fonSize18 align-items-center"
    >
      <div class="d-flex navbar-item">
        <i class="far fa-envelope text-larger nav-link-icon"></i>
        <p class="nav-link-title">公開聊天室</p>
        <div v-show="unread !== 0" class="public-chat-unread">
          {{ unread | unreadOver }}
        </div>
      </div>
    </router-link>
    <router-link
      to="/setting"
      class="nav-btn d-flex fonSize18 align-items-center"
    >
      <div class="d-flex">
        <IconSetting class="nav-link-icon" />
        <p class="nav-link-title">設定</p>
      </div>
    </router-link>

    <button
      type="button"
      class="btn-tweet"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      推文
    </button>

    <button
      type="button"
      class="btn sign-out-btn d-flex fonSize18 align-items-center"
      @click="signOut"
    >
      <div class="d-flex nav-btn">
        <IconSignOut class="nav-link-icon" />
        <p class="nav-link-title">登出</p>
      </div>
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <div class="btn-cancel pointer"></div>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex">
              <img
                :src="currentUser.avatar || 'https://i.imgur.com/S4PE66O.png'"
                alt="no photo"
              />
              <form
                class="d-flex flex-column w-100"
                @submit.stop.prevent="handleSubmit"
              >
                <textarea
                  v-model="description"
                  class="form-textarea w-100"
                  name="text"
                  id="newTweet"
                  rows="6"
                  placeholder="有什麼新鮮事？"
                ></textarea>
                <div class="d-flex justify-content-end">
                  <div v-if="description.length">
                    <span
                      class="contentAlert"
                      :class="{ fontRed: isDescriptionOverSize }"
                      >{{ description.length }}</span
                    ><span class="contentAlert mr-3">/140</span>
                  </div>
                  <button
                    type="submit"
                    class="btn-tweet-submit"
                    data-dismiss="modal"
                    @click="handleSubmit"
                  >
                    推文
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "./icons/Logo"
import IconHome from "./icons/IconHome"
import IconSetting from "./icons/IconSetting"
import IconUserProfile from "./icons/IconUserProfile"
import IconSignOut from "./icons/IconSignOut"
import { emptyImageFilter } from "../utils/mixins"
import { v4 as uuidv4 } from "uuid"
import { Toast } from "./../utils/helpers"
import { mapState } from "vuex"
import chatRoomAPI from "./../apis/chatRoom"
import userAPI from "./../apis/user"

export default {
  components: {
    Logo,
    IconHome,
    IconSetting,
    IconUserProfile,
    IconSignOut,
  },
  data() {
    return {
      avatar: "",
      id: -1,
      description: "",
      createdAt: "",
      unread: 0,
    }
  },
  watch: {
    isInPublicChatRoom(newValue) {
      if (newValue === true) {
        this.unread = 0
      }
    }
  },
  created() {
    // console.log('>>>>>>>>> navbar created')
  },
  mounted() {
    this.$socket.auth.token = localStorage.getItem('token')
    this.$socket.open()
    this.fetchUnreads()
  },
  beforeRouteEnter(to, from, next) {
    // console.log('navbarRRRR route update!!!!!!!!!!!')
    next()
  },
  updated() {
    // console.log('navbar update////////', this.$route)
  },
  destroyed() {
    this.$socket.auth.token = ''
    this.$socket.close()
    // console.log('>>>>>>>>> navbar destroyed')
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "isInPublicChatRoom"]),
    isDescriptionOverSize() {
      return this.description.length > 140 ? true : false
    },
  },
  sockets: {
    'public-message': function () {
      if (this.$route.path !== '/public-chatroom') {
        this.unread++
      }
    },
  },
  methods: {
    signOut() {
      this.$store.commit("revokeAuthentication")
      this.$router.push("/signin")
    },

    async handleSubmit() {
      if (this.description.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "親愛的用戶，請勿發空空的思念。",
        })
        return
      } else if (this.description.length > 140) {
        Toast.fire({
          icon: "error",
          title: "推文字數超過140囉！",
        })
        return
      }

      try {
        this.createdAt = Date.now()
        const response = await userAPI.addUserNewTweet({
          description: this.description,
          createdAt: this.createdAt,
        })

        if (response.status !== 200) {
          throw new Error(response)
        }

        this.$emit("after-create-tweet", {
          User: {
            id: this.currentUser.id,
            account: this.currentUser.account,
            name: this.currentUser.name,
            avatar: this.currentUser.avatar,
          },
          id: uuidv4(),
          name: this.currentUser.name,
          description: this.description,
          createdAt: this.createdAt,
          repliesCount: 0,
          likesCount: 0,
          isLiked: false,
        })
        this.description = ""
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        })
      }
    },
    async fetchUnreads() {
      try {
        const response = await chatRoomAPI.getPublicChatRoomUnread({ userId: this.currentUser.id })
        this.unread = response.data.count

        if (response.status !== 200) {
          throw new Error(response)
        }

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得公開聊天室未讀數量，請稍後再試",
        })
      }
    }
  },
  mixins: [emptyImageFilter],
  filters: {
    unreadOver(unread) {
      return unread > 99 ? '99+' : unread
    }
  }
}
</script>

<style scoped>
.nav-link-icon {
  margin-right: 16px;
}
.fa-envelope {
  font-size: 24px;
}
.public-chat-unread {
  position: absolute;
  top: -10px;
  left: 15px;
  background-color: #ff2d00;
  color: white;
  font-size: 10px;
  padding: 4px;
  border-radius: 12px;
  height: 24px;
  width: 24px;
  line-height: 16px;
  text-align: center;
}
.navbar-item {
  position: relative;
}
.fontRed {
  color: red;
}
.contentAlert {
  line-height: 40px;
}
.modal-dialog {
  max-width: 600px;
}
.modal-content {
  border-radius: 14px;
  border: 0;
}
.modal-header {
  height: 54px;
}
.close {
  color: #ff6600;
  opacity: 1;
  margin: -1rem -1rem -1rem -1rem;
  font-size: 30px;
}
.modal-footer {
  border: 0;
}
nav {
  height: 100vh;
}
.nav-btn {
  width: 200px;
  color: #1c1c1c;
  font-weight: 700;
  margin-bottom: 34px;
}
.active {
  color: #ff6600;
}
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}
hr {
  margin: 0;
}
.nav-btn:hover {
  text-decoration: none;
}
.fonSize18 {
  font-size: 18px;
}
.btn-tweet {
  color: white;
  background: #ff6600;
  border-color: transparent;
  height: 50px;
  border-radius: 25px;
  width: 200px;
}
.btn-tweet-submit {
  color: white;
  background: #ff6600;
  border-color: transparent;
  height: 40px;
  border-radius: 20px;
  width: 64px;
}
.btn-tweet:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem transparent;
}
.btn-tweet:hover {
  opacity: 0.9;
}
.sign-out-btn {
  width: 200px;
  margin: auto 0 17px 0;
  padding: 0;
  font-weight: 700;
}
.sign-out-btn:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem transparent;
  background: transparent;
}
.pointer {
  cursor: pointer;
}
/* modal-setting */
textarea {
  margin: 0;
  padding: 0;
  margin-top: 12px;
  resize: none;
  border: none;
}
textarea:focus {
  outline: none;
}
.btn-cancel {
  position: relative;
  width: 24px;
  height: 24px;
}
.btn-cancel::before,
.btn-cancel::after {
  content: "";
  position: absolute;
  height: 24px;
  width: 4px;
  border-radius: 2px;
  background: #ff6600;
  z-index: 99;
  left: 42%;
}
.btn-cancel::before {
  transform: rotate(45deg);
}
.btn-cancel::after {
  transform: rotate(-45deg);
}
.router-link-active {
  color: #ff6600;
}
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}
.nav-btn {
  display: flex;
  align-content: center;
}

@media screen and (max-width: 1200px) {
  .nav-link-icon {
    margin-right: 0px;
  }
  .nav-link-title {
    display: none;
  }
  .btn-tweet {
    color: white;
    background: #ff6600;
    border-color: transparent;
    height: 50px;
    border-radius: 25px;
    width: 50px;
  }
  .nav-btn {
    width: 50px;
    justify-content: center;
  }
  .sign-out-btn {
    width: 50px;
  }
  .nav-wrapper {
    align-items: center;
  }
}
</style>