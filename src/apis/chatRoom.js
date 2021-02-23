import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getPublicChatRoomHistory({ userId }) {
    return apiHelper.post('/chat/messages', {
      channelId: 0,
      userId
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getPublicChatRoomUnread({ userId }) {
    return apiHelper.post('/chat/public_unread', {
      userId
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getAllPrivateChatRooms() {
    return apiHelper.get('/chat/all_private_rooms', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}