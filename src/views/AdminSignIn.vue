<template>
  <div class="container">
    <form
      class="d-flex flex-column mt-3"
      autocomplete="off"
      @submit.stop.prevent
    >
      <Logo class="align-self-center m-4" />
      <h1 class="align-self-center fonSize23 mb-4">後台登入</h1>
      <div class="form-item input-line">
        <div class="input-container">
          <label for="InputAcount" class="form-label w-100 fonSize15"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="InputAcount"
            aria-describedby="emailHelp"
            required
            autofocus
          />
        </div>
      </div>
      <div class="form-item input-line">
        <div class="input-container">
          <label for="InputPassword" class="form-label w-100 fonSize15"
            >密碼</label
          >
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="InputPassword"
            required
            @keyup.enter="handleSubmit"
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary align-self-center w-100 fonSize15 signin-btn mb-5 fonSize18"
        @click="handleSubmit"
        :disabled="isProcessing"
      >
        {{ isProcessing ? "登入中..." : "登入" }}
      </button>
    </form>
    <div class="d-flex justify-content-end w-100">
      <router-link class="fonSize18 link-underline link" to="/signin">
        前台登入
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "./../components/icons/Logo"
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  components: {
    Logo,
  },
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.AdminSignIn({
          email: this.email,
          password: this.password
        })

        const { data } = response

        console.log(data.user)

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)
        this.isProcessing = false

        this.$router.push('/admin/tweets')

      } catch (error) {
        console.log(error)
        this.password = ''
        this.isProcessing = false

        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 540px;
}
.form-control {
  border: 0;
}
.form-label {
  color: #657786;
  padding: 5px 0 0 10px;
  margin: 0;
  cursor: text;
}
.fonSize15 {
  font-size: 15px;
}
.fonSize23 {
  font-size: 23px;
}
.fonSize18 {
  font-size: 18px;
}
input {
  background: transparent;
  height: 20px;
  line-height: 16px;
}
.form-item {
  background: #f5f8fa;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 4px;
  /* border-bottom: 2px solid #657786; */
}
.signin-btn {
  background: #ff6600;
  border-color: transparent;
  height: 50px;
  border-radius: 25px;
}
.link-underline {
  text-decoration: underline;
}
.form-control:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem transparent;
  background: transparent;
}

.link {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #0099ff;
}
.input-container {
  position: relative;
}

/* 底線 */
.input-container::after {
  content: "";
  background-color: #657786;
  height: 2px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>