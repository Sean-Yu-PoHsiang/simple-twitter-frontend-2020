import { apiHelper } from './../utils/helpers'

export default {
  AdminSignIn({ email, password }) {
    return apiHelper.post('/admin/signin', {
      email,
      password
    })
  }
}