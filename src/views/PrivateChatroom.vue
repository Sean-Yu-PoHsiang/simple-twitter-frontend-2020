<template>
  <div class="col chat-room-wrapper">
    <div class="row">
      <!-- 聊天室/用戶列表區 -->
      <input
        class="folding-chat-users d-none"
        id="folding-chat-users"
        type="checkbox"
      />
      <div class="col-auto no-gutters center-column p-0 online-user-box">
        <div
          class="online-user-title-wrapper title-wrapper px-3 d-flex align-items-center justify-content-between">
          <h1 class="title">私人聊天室 ({{privateChatRooms.length}}) </h1>
          <!-- 信封按鈕，點擊顯示所有用戶清單 -->
          <label for="chat-room-user-toggle">
            <div class="envelope-icon-set">
              <i class="far fa-envelope text-larger nav-link-icon"></i>
            </div>
          </label>
          <input type="checkbox" id="chat-room-user-toggle" class="d-none">
         <!-- 搜尋用，所有用戶清單 -->
          <div class="chat-room-user-list-wrapper">
            <div
              class="title-wrapper px-3 d-flex align-items-center justify-content-between">
              <form class="search-form" action="" @submit.prevent>
                <input type="text" 
                v-model="searchKeywords"
                class="search-user-input border-0 rounded-pill bg-gray form-control"
                placeholder="輸入用戶名搜尋..."
                id="search-user-input">
                <label for="search-user-input"></label>
              </form>
              <label for="chat-room-user-toggle">
                <div class="cancel-icon">
                  <i class="fas fa-times"></i>
                </div>
              </label>
            </div>
            <div class="chat-room-user-list">
              <div
                v-for="renderUser in fillterUsers"
                :key="renderUser.id"
                class="user-panel" 
                @click="addNewPrivateChatRoom(renderUser)"
              >
                <!-- 渲染所有用戶 -->
                <div class="d-flex align-items-center connected-user p-2">
                  <img class="user-avatar mr-2" :src="renderUser.avatar" alt="" />
                  <span>
                    <strong class="mr-2">{{ renderUser.name }}</strong>
                    <span class="text-gray">@{{ renderUser.account }}</span>
                    <div class="text-gray followedStatus">{{ renderUser.isFollowed | followedStatus }}</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 使用者已開的私人聊天室 -->
        <div class="chat-room-list">
          <div
            v-for="privateChatRoom in privateChatRooms"
            :key="privateChatRoom.channelId"
            @click="privateChatRoomOnClick(privateChatRoom)"
            class="user-panel"
          >
            <!-- 渲染已開的私人聊天室 -->
            <div class="d-flex align-items-center connected-user p-2">
              <div class="avatar-and-status-wrapper mr-2">
                <img  class="user-avatar" :src="privateChatRoom.chatTo.avatar" alt=""/>
                <div class="status" :class="{notShow: privateChatRoom.chatToUserIsOnline === false }"></div>
              </div>
              <span>
                <router-link class="link-style" :to="'/users/' + privateChatRoom.chatTo.userId">
                  <strong class="mr-2">{{ privateChatRoom.chatTo.name }}</strong>
                </router-link>
                <span class="text-gray">@{{ privateChatRoom.chatTo.account }}</span>
                <div class="last-message text-gray">{{privateChatRoom.lastMsg}}</div>
              </span>
              <span>
                <div v-if="privateChatRoom.unreadCount !== 0" class="private-unread">{{privateChatRoom.unreadCount}}</div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 聊天室對話區 -->
      <div class="col right-column no-gutters p-0" id="main-panel">
        <div class="title-wrapper px-3 d-flex align-items-center">
          <img class="user-avatar mr-2" :src= chatToUser.avatar alt="" />
          <h1 class="title message-receiver">{{chatToUser.name}}</h1>
          <label for="folding-chat-users" class="chat-users-toggle"
            ><i class="fas fa-list-ul"></i
          ></label>
        </div>
        <div @scroll="isToBelow" class="message-board" id="message-board">
          <div
            class="message-box"
            v-for="message in privateMessages"
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
                message.stasus === 'on' && message.userId === currentChatRoom.chatTo.userId
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
                message.stasus === 'off' && message.userId === currentChatRoom.chatTo.userId
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
            @click="sendPrivateMessage"
            @keyup.enter="sendPrivateMessage"
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
      
      newMessage: '',
      scrollModel: '',
      scrollPosition: 0,
      scrollToBottom: true,

      onlineUsers: [],
      chatRoomsFromAPI:[],
      privateChatRooms: [],
      currentChatRoom: [],
      chatToUser: [],
      privateMessages: [],
      allUsers: [],
      searchKeywords:'',
    }
  },
  created() {
    this.fetchAllUsers()
    this.fetchOnlineUsers()
    this.fetchAllPrivateChatRooms()
  },
  mounted() {
    this.scrollModel = document.getElementById("message-board")
  },  
  beforeUpdate(){

  },
  updated() {
    if (this.scrollToBottom === true) {
      this.scrollModel.scrollTop = this.scrollModel.scrollHeight
    }
  },
  destroyed() {
    this.$store.commit("leavePrivateChatRoom")
  },
  computed: {
    fillterUsers(){
      return this.searchKeywords.trim().length === 0 ? this.allUsers : this.allUsers.filter((user)=>{
          return user.name.toLowerCase().includes(this.searchKeywords.toLowerCase().trim())
      })
    },
    ...mapState(["currentUser", "isInPublicChatRoom","isInPrivateChatRoom"]),
  },
  sockets: {
    'init-public': function (onlineUsers) {
      this.onlineUsers = onlineUsers
    },
    'private-message': function (privateMessage) {
      const chatRoomChannelIdList = []
      this.privateChatRooms.forEach(room => {
        chatRoomChannelIdList.push(room.channelId)
      });

      const channelIdIndex = chatRoomChannelIdList.indexOf(privateMessage.channelId)

      if (channelIdIndex === -1 && privateMessage.userId !== this.currentUser.id){
        const roomData = {
          channelId: privateMessage.channelId,
          lastMsg: privateMessage.message,
          unreadCount: 1,
          chatToUserIsOnline: true,
          chatTo: {
            account: privateMessage.account,
            avatar: privateMessage.avatar,
            name: privateMessage.name,
            userId: privateMessage.userId
          }
        }
        this.privateChatRooms.unshift(roomData)
      } else if (channelIdIndex === -1 && privateMessage.userId === this.currentUser.id){
          const roomData = {
            channelId: privateMessage.channelId,
            lastMsg: privateMessage.message,
            unreadCount: 0,
            chatToUserIsOnline: false,
            chatTo: {
              account: this.currentChatRoom.account,
              avatar: this.currentChatRoom.avatar,
              name: this.currentChatRoom.name,
              userId: this.currentChatRoom.userId
            }
          }
          this.privateChatRooms.unshift(roomData)

      } else if (privateMessage.channelId === this.currentChatRoom.channelId){
        privateMessage.id = uuidv4()
        privateMessage.UserId = privateMessage.userId
        this.currentChatRoom.lastMsg = privateMessage.message
        this.privateMessages.push(privateMessage)

        this.privateChatRooms = this.privateChatRooms.map(room => {
          if (room.channelId === privateMessage.channelId) {
            return { 
              ...room,
              lastMsg: this.currentChatRoom.lastMsg,
              unreadCount: 0
            }
          } else {
            return room
          }
        })
      } else {
        this.privateChatRooms = this.privateChatRooms.map(room => {
          if (room.channelId === privateMessage.channelId) {
            return { 
              ...room,
              lastMsg: privateMessage.message,
              unreadCount: room.unreadCount + 1
            }
          } else {
            return room
          }
        })
      }
    },
    'private-update-channelId': function (updateChannelId){
      this.currentChatRoom.channelId = updateChannelId.channelId
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
      this.privateMessages.push(userStasus)
      if (nowOnlineUser.status === 'on') {
        this.onlineUsers.push(nowOnlineUser)
        this.changeOnlineUserStatus(this.onlineUsers,this.privateChatRooms)
      }
    }
  },
  filters:{
    followedStatus(isFollowed){
      if (isFollowed === true) {
        return "已追隨"
      }
    }
  },
  methods: {
    fetchOnlineUsers() {
      this.$socket.emit('init-public', Date.now())
    },
    async getPrivateUnread(){
      try{
        const response = await chatRoomAPI.getPrivateChatRoomUnread()
        
        if (response.status !== 200){
          throw new Error(response.statusText)
        }
        
        const unreadData = response.data
        const unreadChannelIdList = Object.keys(unreadData)//印出所有key值，型別是字串

        //用所有key去找同channelId聊天室 記得字串轉為數字 Number()
        //沒有符合的 channelId 的聊天室return
        //有符合的 channelId 的聊天室顯示未讀數量

        let newRoomList = []

        this.chatRoomsFromAPI.forEach((room)=>{
          const indexResult = unreadChannelIdList.indexOf(room.channelId.toString())

          if (indexResult === -1){
            newRoomList.push(room)
            return
          } else {
            room.unreadCount = unreadData[room.channelId]
            newRoomList.push(room)
          }
        })
        this.chatRoomsFromAPI = newRoomList       
        this.privateChatRooms = newRoomList

      }catch (error){
        Toast.fire({
          icon:"error",
          title:"無法取得私人聊天個別未讀數量，請稍後再試"
        })
      }
    },
    async fetchAllPrivateChatRooms() {
      try {
        this.$store.commit("enterPrivateChatRoom")

        const response = await chatRoomAPI.getAllPrivateChatRooms()

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        if(response.data.length === 0){
          Toast.fire({
            icon: "info",
            title: "您目前沒有任何聊天室",
          })
          return
        }

        const roomList = [...response.data]
        let newRoomList=[]

        roomList.forEach(room => {
          newRoomList.push({...room, unreadCount:0 })
        })

        this.chatRoomsFromAPI = newRoomList
        this.currentChatRoom = newRoomList[0]
        this.chatToUser =  newRoomList[0].chatTo
        this.fetchPrivateChatRoomHistory()

      } catch (error) {    
        Toast.fire({
          icon: "error",
          title: "無法取得私人聊天室清單，請稍後再試",
        })
      }
    },
    async fetchAllUsers(){
      try {
        const response = await chatRoomAPI.getAllUsers()
        this.allUsers = [...response.data]

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon:"error",
          title:"無法取得用戶資訊，請稍後再試"
        })
      }
    },
    async fetchPrivateChatRoomHistory() {
      try {
        const response = await chatRoomAPI.getPrivateChatRoomHistory({ 
          channelId:this.currentChatRoom.channelId,
          userId: this.currentUser.id 
        })

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        this.privateMessages = [...response.data]

        this.changeOnlineUserStatus(this.onlineUsers,this.chatRoomsFromAPI)
        
        this.$socket.emit('message-read-timestamp', { channelId: this.currentChatRoom.channelId , time: Date.now() })

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得私人聊天室訊息，請稍後再試",
        })
      }
      
    },
    async sendPrivateMessage() {
        if (this.newMessage.trim().length === 0) { return }

        await this.$socket.emit('private-message', {
          message: this.newMessage,
          time: Date.now(),
          channelId: this.currentChatRoom.channelId,
          receiverId: this.currentChatRoom.chatTo.userId,
          receiverName: this.currentChatRoom.chatTo.name,
        })

        this.newMessage = ''
        this.scrollToBottom = true
        this.currentChatRoom.lastMsg = this.newMessage 
        this.updateChatRooms()

        this.$socket.emit('message-read-timestamp', { channelId: this.currentChatRoom.channelId , time: Date.now() })
    },
    changeOnlineUserStatus(onlineUsers, chatRooms){      
      const userOnlineIdList=[]
      let newRooms=[]

      for (let user of onlineUsers) {
        const userId = user.id
        userOnlineIdList.push(userId)
      }

      chatRooms.forEach((room)=>{
        const index = userOnlineIdList.indexOf(room.chatTo.userId)
        if(index !== -1){
          const newdata = {
            ...room,
            chatToUserIsOnline: true
          }
          newRooms.push(newdata)
        }else {
          newRooms.push(room)
        }
      })
      this.chatRoomsFromAPI = newRooms
      this.getPrivateUnread()
    },
    updateChatRooms(){
      this.chatRoomsFromAPI = this.chatRoomsFromAPI.filter((chatroom)=>{
        return chatroom.channelId !== this.currentChatRoom.channelId
      })

      const data = {
        ...this.currentChatRoom,
      }
      this.currentChatRoom = data
      
      this.chatRoomsFromAPI.unshift(data)
      this.privateChatRooms = this.chatRoomsFromAPI

    },
    privateChatRoomOnClick(target){
      this.currentChatRoom = target
      this.chatToUser = target.chatTo
      this.fetchPrivateChatRoomHistory()

      if (target. v === 0){
        return
      }
      this.chatRoomsFromAPI = this.chatRoomsFromAPI.map(room => {
        if (room.channelId === target.channelId) {
          return { ...room, unreadCount: 0}
        } else {
          return room
        }
      })
      this.privateChatRooms = this.chatRoomsFromAPI
    },
    addNewPrivateChatRoom(user){     
      //確認user是否開過聊天室
      const historyChatRoom = this.chatRoomsFromAPI.some((room)=>{
        return user.id === room.chatTo.userId
      })
      //若被點user聊天室已存在，不做任何事
      if(historyChatRoom === true){
        return
      }
      //把user資料存成新聊天室資料
      const data = {
        channelId: -1,
        unreadCount: 0,
        chatToUserIsOnline: false,
        chatTo: {
          account: user.account,
          avatar: user.avatar,
          name: user.name,
          userId: user.id
        },
      }

      //整理渲染聊天室需要的資料
      this.currentChatRoom = data

      this.privateChatRoomOnClick(data)
      
      //若聊天室channelId為-1的存在，把舊的-1的聊天室去掉，用新的取代
      //channelId:-1表示尚未對話的聊天室
      //維持channelId:-1 只有一個，避免v-for渲染聊天室時，重複的id會報錯      
      if (this.privateChatRooms.length === 0){
        this.privateChatRooms.unshift(data)
      } else if (this.privateChatRooms[0].channelId === -1){
        this.privateChatRooms.shift()
        this.privateChatRooms.unshift(data)
        return
      } else {
        this.privateChatRooms.unshift(data)
        return
      }
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
/* envelope-icon area */
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
.envelope-icon-set,
.cancel-icon{
  width:40px;
  height:40px;
  border-radius:50px;
  text-align:center;
  line-height:40px;
  margin-top:10px;
}
.envelope-icon-set:hover,
.cancel-icon:hover {
  cursor:pointer;
  background: #ff6600;
  color:#ffffff;
  width:40px;
  /* height:40px; */
  text-align:center;
}
.cancel-icon{
  font-size:20px;
}
#chat-room-user-toggle:checked ~ .chat-room-user-list-wrapper {
  transform: scale(1, 1);
  transition: transform 0.2s ease-out;
  transform-origin:left;
}
.chat-users-toggle {
  display: none;
}
.link-style:hover {
  text-decoration:underline;
  color:#ff6600;
}
/* clicked envelope-icon-set will show this part */
/* user list for new chat room */
.chat-room-user-list-wrapper {
  transform: scale(0, 1);
  transition: transform 0.2s ease-out;
  transform-origin:left;
  width:290px;
  position:absolute;
  top:0px;
  right:-290px;
  background: #ffffff;
  z-index:10;
  border-right:1px solid #e6ecf0;
  border-left:1px solid #e6ecf0;
  box-shadow: 10px 10px 10px -10px #666666;
}
.chat-room-user-list {
  height: calc(100vh - 100px - 61px);
  overflow:scroll;
}
.private-unread{
  position: absolute;
  top: 20px;
  right: 8px;
  background-color: #ff6600;
  color: white;
  font-size: 10px;
  padding: 4px;
  border-radius: 12px;
  height: 24px;
  width: 24px;
  line-height: 16px;
  text-align: center;
}
.followedStatus {
  font-size:14px;
}
.search-form{
  line-height:45px;
  display:flex;
  align-items:center;
}
.search-user-input{
  width: 210px;
}
.search-user-input:focus{
  background: #e6ecf0;
  outline: none;
  box-shadow: none;
}


/* main */
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
.avatar-and-status-wrapper{
  position: relative;
}
.status {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 12px;
  height: 12px;
  background: #ff6600;
  border-radius: 50%;
  box-shadow: inset 0 0 1px 2px #ddd;
}
.notShow{
  display: none;
}

.last-message{
  width:220px;
  height:26px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
.user-panel {
  cursor:pointer;
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
  position:relative;
}
/* chat room list */
.chat-room-list{
  height: 90%;
  overflow: scroll;
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
  .chat-users-toggle {
    font-size: 21px;
    display: block;
    margin: 0;
    margin-left: 10px;
    padding: 0 6px;
  }
  .chat-users-toggle:hover {
    background: #ff6600;
    border-radius: 6px;
    cursor: pointer;
  }
  .folding-chat-users:checked ~ .online-user-box {
    transform: scale(1, 1);
    transition: transform 0.2s ease-out;
  }
  #chat-room-user-toggle:checked ~ .chat-room-user-list-wrapper {
  transform: scale(1, 1);
  transform-origin:right;
  }
  .chat-room-user-list-wrapper {
    transform: scale(0, 1);
    transform-origin:right;
    top:0px;
    right:0px;
  }
  .chat-room-user-list-wrapper{
    box-shadow: -10px 10px 10px -10px #666666;
  }
}
@media screen and (max-width: 768px) {
  .chat-room-wrapper {
    margin: 0;
  }
}
</style>