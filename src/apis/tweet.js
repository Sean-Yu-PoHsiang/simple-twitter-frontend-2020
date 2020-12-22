import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets({ email, password }) {
    // return apiHelper.post('/admin/signin', {
    //   email,
    //   password
    // })
    get() {
      return apiHelper.get('/admin/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  }
}