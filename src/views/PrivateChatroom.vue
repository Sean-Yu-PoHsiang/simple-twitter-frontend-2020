<template>
  <div class="col chat-room-wrapper">
    <div class="row">
      <input
        class="folding-online-user d-none"
        id="folding-online-user"
        type="checkbox"
      />
      <div class="col-auto no-gutters center-column p-0 online-user-box">
        <div
          class="online-user-title-wrapper title-wrapper px-3 d-flex align-items-center justify-content-between">
          <h1 class="title">私人聊天室 ({{privateChatRooms.length}}) </h1>
          <div class="envelope-icon-set">
            <i class="far fa-envelope text-larger nav-link-icon"></i>
          </div>
        </div>
        <div class="online-user-list">
          <div
            v-for="privateChatRoom in privateChatRooms"
            :key="privateChatRoom.channelId"
            class="user-panel"
          >
            <!-- 上線使用者 -->
            <div class="d-flex align-items-center connected-user p-2">
              <img class="user-avatar mr-2" :src="privateChatRoom.chatTo.avatar" alt="" />
              <span>
                <strong class="mr-2">{{ privateChatRoom.chatTo.name }}</strong>
                <span class="text-gray">@{{ privateChatRoom.chatTo.account }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="col right-column no-gutters p-0" id="main-panel">
        <div class="title-wrapper px-3 d-flex align-items-center">
          <h1 class="title message-receiver">User2</h1>
          <label for="folding-online-user"
            ><i class="fas fa-list-ul"></i
          ></label>
        </div>
        <div @scroll="isToBelow" class="message-board" id="message-board">
          <div
            class="message-box"
            v-for="message in messages"
            :key="message.id"
          >
            <!-- 自己發的訊息 -->
            <div
              v-if="
                message.stasus === undefined &&
                message.UserId === currentUser.id
              "
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
              v-if="
                message.stasus === undefined &&
                message.UserId !== currentUser.id
              "
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
              v-if="
                message.stasus === 'on' && message.userId !== currentUser.id
              "
              class="user-status-wrapper d-flex justify-content-center py-2"
            >
              <div
                class="user-status badge badge-pill bg-gray font-weight-bold text-gray px-3"
              >
                {{ message.userName }} 上線
              </div>
            </div>
            <div
              v-if="
                message.stasus === 'off' && message.userId !== currentUser.id
              "
              class="user-status-wrapper d-flex justify-content-center py-2"
            >
              <div
                class="user-status badge badge-pill bg-gray font-weight-bold text-gray px-3"
              >
                {{ message.userName }} 下線
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
      scrollToBottom: true,

      privateChatRooms:[]
    }
  },
  created() {
    this.fetchAllPrivateChatRooms()
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
  destroyed() {
    this.$store.commit("leavePublicChatRoom")
  },
  computed: {
    ...mapState(["currentUser", "isInPublicChatRoom"])
  },
  sockets: {
    'init-public': function (onlineUsers) {
      this.onlineUsers = onlineUsers
    },
    'public-message': function (message) {
      message.id = uuidv4()
      message.UserId = message.userId
      this.messages.push(message)
      this.$socket.emit('message-read-timestamp', { channelId: 0, time: Date.now() })
    },
    'user-on-off-line': function (userOnOff) {
      if (userOnOff.id === this.currentUser.id) {
        return
      }

      let userStasus = {
        stasus: userOnOff.status,
        userId: userOnOff.id,
        id: uuidv4(),
        userName: userOnOff.name
      }
      let nowOnlineUser = {
        status: userOnOff.status,
        account: userOnOff.account,
        avatar: userOnOff.avatar,
        id: userOnOff.id,
        name: userOnOff.name
      }
      this.messages.push(userStasus)
      if (nowOnlineUser.status === 'on') {
        this.onlineUsers.push(nowOnlineUser)
      }
    }
  },
  methods: {
    fetchOnlineUsers() {
      this.$socket.emit('init-public', Date.now())
    },
    async fetchAllPrivateChatRooms() {
      try {
        const response = await chatRoomAPI.getAllPrivateChatRooms()

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.privateChatRooms = response.data
        // this.$socket.emit('message-read-timestamp', { channelId: 0, time: Date.now() })
        // this.$store.commit("enterPublicChatRoom")

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

<style scoped>
.fa-envelope{
 font-size: 24px;
 position:relative;
}
.fa-envelope:after {
  content:'+';
  width:12px;
  height:12px;
  padding:0px;
  margin:0px;
  position:absolute;
  top: -12px;
  right: -9px;
}
.envelope-icon-set{
 width:40px;
 height:40px;
 border-radius:50px;
 text-align:center;
 line-height:50px;
}
.envelope-icon-set:hover{
 background: #eeeeee;
 width:40px;
 height:40px;
 text-align:center;
 line-height:45px;
}

label {
  display: none;
}
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
.center-column {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  width: 300px;
  height: 100vh;
}
.title-wrapper{
  border-bottom: 1px solid #e6ecf0;
  height: 55px;
}
.title,
.message-receiver {
  color: #1c1c1c;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}
.connected-user {
  border-bottom: 1px solid #e6ecf0;
}

/* message-board */
.row {
  height: 100%;
}
.message-board {
  height: calc(100vh - 55px - 61px);
  overflow-y: auto;
}
.message-board .badge-pill {
  font-size: 0.8rem;
  font-weight: normal;
  line-height: 20px;
}
.message-text {
  border-radius: 1.5em 1.5em 1.5em 0;
  max-width: 60%;
  width: fit-content;
  background: #eeeeee;
  color: #333333;
  word-break: break-word;
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
  font-size: 20px;
  background: #eeeeee;
  color: #666666;
  line-height: 30px;
  padding: 4px 10px;
  position: absolute;
  bottom: 74px;
  right: 24px;
}
.chat-room-wrapper {
  margin: 0 15px;
}
@media screen and (max-width: 992px) {
  .online-user-box {
    transform: scale(0, 1);
    transition: transform 0.2s ease-in;
    transform-origin: right;
  }
  .center-column {
    height: calc(100vh - 55px - 61px);
  }
  .online-user-box {
    position: absolute;
    top: 55px;
    right: 0;
    z-index: 99;
    background: white;
    box-shadow: -10px 0px 10px -10px #666666;
  }
  #main-panel {
    border-left: 1px solid #e6ecf0;
  }
  .online-user-title-wrapper {
    justify-content: flex-end;
  }
  label {
    font-size: 21px;
    display: block;
    margin: 0;
    margin-left: 10px;
    padding: 0 6px;
  }
  label:hover {
    background: #ff6600;
    border-radius: 6px;
    cursor: pointer;
  }
  .folding-online-user:checked ~ .online-user-box {
    transform: scale(1, 1);
    transition: transform 0.2s ease-out;
  }
}
@media screen and (max-width: 768px) {
  .chat-room-wrapper {
    margin: 0;
  }
}
</style>