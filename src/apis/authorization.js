import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

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
  },
  SignUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      name,
      email,
      password,
      checkPassword
    })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response.data
      })
  },
  EditUserSetting({ userId, account, name, email, password, checkPassword }) {
    return apiHelper.put(`/users/${userId}`, {
      page: "setting",
      account,
      name,
      email,
      password,
      checkPassword,
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response.data
      })
  },
}