<template>
  <div class="container">
    <div class="sign-in-wrapper">
      <div class="ac-logo">
        <Logo class="logo-image" />
        <div class="title">登入 Alphitter</div>
      </div>
      <form @submit.stop.prevent>
        <div class="input-container">
          <div class="input-title">Email</div>
          <label for="Email" class="form-label"></label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            required
            autofocus
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text"></div>
        </div>
        <div class="input-container">
          <div class="input-title">密碼</div>

          <label
            for="password"
            class="form-label"
            aria-placeholder="密碼"
          ></label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            @keyup.enter="handleSubmit"
          />
        </div>
      </form>
      <button
        type="submit"
        class="btn btn btn-submit"
        id="btn-submit"
        :disabled="isProcessing"
        @click="handleSubmit"
      >
        {{ isProcessing ? "登入中..." : "登入" }}
      </button>

      <div class="pages-link">
        <router-link class="link" to="/signup"> 註冊 Alphitter </router-link>
        <span>·</span>
        <router-link class="link" to="/admin/signin"> 後台登入 </router-link>
      </div>
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

        const response = await authorizationAPI.SignIn({
          email: this.email,
          password: this.password
        })

        const { data } = response

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)
        this.isProcessing = false

        this.$router.push('/home')

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
.sign-in-wrapper {
  max-width: 540px;
  margin: 0 auto;
}
.ac-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-image {
  margin: 65px 0 35px 0;
}

.title {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 33px;
  color: #1c1c1c;
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

input {
  text-align: start;
  vertical-align: bottom;
  position: relative;
  height: 50px;
  border-style: none;
  background: #f5f8fa;
  border-radius: 4px;
  padding-top: 30px;
  position: relative;
}

.input-title {
  position: absolute;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
  top: 28px;
  left: 12px;
  z-index: 2;
  /* bottom: -30px; */
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
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  text-align: right;
  text-decoration-line: underline;
  color: #0099ff;
}

span {
  color: #0099ff;
}
</style>