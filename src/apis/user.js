import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUserProfile({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopFollowersUser() {
    return apiHelper.get(`/users`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}