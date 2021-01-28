<template>
  <div class="col">
    <div class="row">
      <div class="col-auto no-gutters center-column p-0">
        <div class="title-wrapper px-3 d-flex align-items-center">
          <h1 class="title">上線使用者({{ onlineUsers.length || 0 }})</h1>
        </div>
        <div
          v-for="onlineUser in onlineUsers"
          :key="onlineUser.id"
          class="user-panel"
        >
          <!-- 上線使用者 -->
          <div class="d-flex align-items-center connected-user p-2">
            <img class="user-avatar mr-2" :src="onlineUser.avatar" alt="" />
            <span>
              <strong class="mr-2">{{ onlineUser.name }}</strong>
              <span class="text-gray">@{{ onlineUser.account }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="col right-column no-gutters p-0" id="main-panel">
        <div class="title-wrapper px-3 d-flex align-items-center">
          <h1 class="title">公開聊天室</h1>
        </div>
        <div @scroll="isToBelow" class="message-board" id="message-board">
          <div
            class="message-box"
            v-for="message in messages"
            :key="message.id"
          >
            <!-- 自己發的訊息 -->
            <div
              v-if="message.UserId === currentUser.id"
              class="my-message-wrapper d-flex justify-content-end px-3 py-1"
            >
              <div class="message">
                <div class="d-flex justify-content-end">
                  <div class="message-text my-message-text py-2 px-3">
                    {{ message.message }}
                  </div>
                </div>
                <div class="message-time text-right text-gray">
                  {{ new Date(message.time).toLocaleString() }}
                </div>
              </div>
            </div>
            <!-- 他人發的訊息 -->
            <div
              v-else
              class="message-wrapper d-flex align-items-end px-3 py-2"
            >
              <img class="message-avatar mr-2" :src="message.avatar" alt="" />
              <div class="message flex-grow-1">
                <div class="message-text bg-gray py-2 px-3">
                  {{ message.message }}
                </div>
                <div class="message-time text-gray">
                  {{ message.name }} said at
                  {{ new Date(message.time).toLocaleString() }}
                </div>
              </div>
            </div>
            <!-- 使用者上下線訊息 -->
            <div
              v-if="false"
              class="user-status-wrapper d-flex justify-content-center py-2"
            >
              <div
                class="user-status badge badge-pill bg-gray font-weight-bold text-gray px-3"
              >
                Kelly 上線
              </div>
            </div>
          </div>
          <button
            v-show="!scrollToBottom"
            class="to-bot-btn btn"
            @click="scrollToBottom = true"
          >
            <i class="fas fa-arrow-down"></i>
          </button>
        </div>
        <!-- 訊息輸入表單 -->
        <form action="" class="message-form" @submit.stop.prevent>
          <input
            v-model="newMessage"
            type="text"
            name="message"
            class="message-input flex-grow-1 border-0 rounded-pill bg-gray form-control"
            placeholder="輸入訊息..."
            autocomplete="off"
          />
          <button
            @click="sendMessage"
            @keyup.enter="sendMessage"
            class="btn send-message-btn"
          >
            <i class="fas fa-location-arrow"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import chatRoomAPI from "./../apis/chatRoom"
import { Toast } from "./../utils/helpers"
import { v4 as uuidv4 } from "uuid"

export default {
  components: {},
  data() {
    return {
      onlineUsers: [],
      messages: [],
      newMessage: '',
      scrollModel: '',
      scrollPosition: 0,
      scrollToBottom: true
    }
  },
  created() {
    this.fetchPublicChatRoomHistory()
  },
  mounted() {
    this.fetchOnlineUsers()
    this.scrollModel = document.getElementById("message-board")
  },
  updated() {
    if (this.scrollToBottom === true) {
      this.scrollModel.scrollTop = this.scrollModel.scrollHeight
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  sockets: {
    'init-public': function (onlineUsers) {
      this.onlineUsers = onlineUsers
    },
    'public-message': function (message) {
      message.id = uuidv4()
      message.UserId = message.userId
      this.messages.push(message)
    }
  },
  methods: {
    fetchOnlineUsers() {
      this.$socket.emit('init-public', Date.now())
    },
    async fetchPublicChatRoomHistory() {
      try {
        const { data } = await chatRoomAPI.getPublicChatRoomHistory({ userId: this.currentUser.id })
        this.messages = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得上線使用者資訊，請稍後再試",
        })
      }
    },
    async sendMessage() {
      if (this.newMessage.trim().length === 0) { return }
      await this.$socket.emit('public-message', {
        account: this.currentUser.account,
        avatar: this.currentUser.avatar,
        UserId: this.currentUser.id,
        name: this.currentUser.name,
        message: this.newMessage,
        time: Date.now()
      })
      this.newMessage = ''
      this.scrollToBottom = true
    },
    isToBelow() {
      this.scrollPosition = this.scrollModel.scrollTop + this.scrollModel.clientHeight
      if (this.scrollPosition < this.scrollModel.scrollHeight) {
        this.scrollToBottom = false
      } else {
        this.scrollToBottom = true
      }
    }
  }
}
</script>

<style>
.main-panel {
  position: relative;
}
.message-input:focus {
  background: #e6ecf0;
  outline: none;
  box-shadow: none;
}
.user-panel {
  height: auto;
}
.message-time {
  font-size: 14px;
}
.user-avatar {
  height: 50px;
  width: 50px;
  border-radius: 25px;
}
.right-column {
  border-right: 1px solid #e6ecf0;
}
.no-gutters {
  padding-right: 0;
  padding-left: 0;
}
.bg-gray {
  background: #e6ecf0;
}

.text-gray {
  color: #666;
}
.text-larger {
  font-size: larger;
}

/* public - center */
.center-column {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  width: 300px;
  height: 100vh;
}

.title-wrapper {
  border-bottom: 1px solid #e6ecf0;
  height: 55px;
}

.title {
  color: #1c1c1c;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.connected-user {
  border-bottom: 1px solid #e6ecf0;
}
/* message-board */

.message-board {
  height: calc(100vh - 55px - 61px);
  overflow-y: auto;
  /* transform: rotate(180deg);
  direction: rtl; */
}

/* .message-box {
  transform: rotate(180deg);
  direction: ltr;
} */

.message-board .badge-pill {
  font-size: 0.8rem;
  font-weight: normal;
  line-height: 20px;
}

.message-text {
  border-radius: 1.5em 1.5em 1.5em 0;
  max-width: 60%;
  word-break: break-all;
  width: fit-content;
  background: #eeeeee;
  color: #333333;
}

.message-avatar {
  width: 40px;
  height: 40px;
  position: relative;
  bottom: 4px;
  border-radius: 20px;
}

.my-message-wrapper .message {
  width: calc(100% - 40px - 16px);
}

.my-message-text {
  border-radius: 1.5em 1.5em 0 1.5em;
  background: #ff6600;
  color: white;
  position: relative;
  right: 0;
  max-width: 60%;
}

/* message-board: input */
.message-form {
  padding: 10px 10px;
  border-top: 1px solid #e6ecf0;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
}

.send-message-btn {
  flex-basis: auto;
}

.fa-location-arrow {
  transform: rotate(45deg);
  font-size: 24px;
  color: #ff6600;
}
/* 按鈕寬度class不行改，但id可以 */
#btn-submit {
  width: 100%;
  height: 50px;
}
.btn-submit {
  background: #ff6600;
  border-radius: 50px;
  width: 122px;
  margin-top: 30px;
  border: 1px solid transparent;
  outline: none;
  color: #ffffff;
}
.pages-link {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}

.link {
  text-decoration: underline;
}

.sign-in-wrapper span {
  color: #0099ff;
}

a {
  color: inherit;
}

.to-bot-btn {
  border: 1px solid #666666;
  font-size: 20px;
  background: white;
  color: #666666;
  line-height: 30px;
  padding: 4px 10px;
  position: absolute;
  bottom: 74px;
  right: 24px;
}
</style>