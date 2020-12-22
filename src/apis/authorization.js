import { apiHelper } from './../utils/helpers'

export default {
  AdminSignIn({ email, password }) {
    return apiHelper.post('/admin/signin', {
      email,
      password
    })
  },
  SignIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  }
}