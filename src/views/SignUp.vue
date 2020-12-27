<template>
  <div class="sign-in-wrapper">
    <div class="ac-logo">
      <Logo class="logo-image" />
      <div class="page-title">建立你的帳號</div>
    </div>
    <form method="post" @submit.stop.prevent="handleSubmit">
      <div class="input-container">
        <div class="input-account title">帳號</div>
        <label class="form-label"></label>
        <input
          v-model="account"
          name="account"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="input-container">
        <div class="input-name title">名稱</div>
        <label class="form-label"></label>
        <input
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="input-container">
        <div class="input-email title">email</div>
        <label for="inputEmail" class="form-label"></label>
        <input
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
          required
        />
        <div id="emailHelp" class="form-text"></div>
      </div>
      <div class="input-container">
        <div class="input-password title">密碼</div>
        <label
          for="password"
          class="form-label"
          aria-placeholder="密碼"
        ></label>
        <input
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <div class="input-container">
        <div class="input-password-check title">密碼確認</div>

        <label
          for="password-check"
          class="form-label"
          aria-placeholder="密碼確認"
        ></label>
        <input
          v-model="checkPassword"
          name="checkPassword"
          type="password"
          class="form-control"
          id="password-check"
          required
        />
      </div>

      <button
        type="submit"
        class="btn btn-submit"
        id="btn-submit"
        :disabled="isProcessing"
      >
        {{ isProcessing ? "建立中..." : "建立" }}
      </button>
    </form>
    <div class="pages-link">
      <router-link class="link" to="/signin"> 取消 </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "./../components/Logo";
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  components: {
    Logo,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫名稱'
        })
        return
      } else if (!this.account) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫帳號'
        })
        return
      } else if (!this.email) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫Email'
        })
        return
      } else if (!this.password) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫密碼'
        })
        return
      } else if (!this.checkPassword) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫密碼確認'
        })
        return
      } else if (this.checkPassword !== this.password) {
        Toast.fire({
          icon: 'warning',
          title: '密碼與密碼確認不符'
        })
        return
      }

      try {
        this.isProcessing = true
        const response = await authorizationAPI.SignUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })

        if (response.status === "error") {
          throw new Error(response.message)
        }

        Toast.fire({
          icon: 'success',
          title: `建立成功！ 請登入`
        })
        this.isProcessing = false
        this.$router.push({ name: 'sign-in' })

      } catch (error) {
        console.log('err', error)
        Toast.fire({
          icon: 'error',
          title: `無法建立帳號，${error}`
        })
        this.isProcessing = false
      }

    },
  },
};
</script>

<style scoped>
.sign-in-wrapper {
  width: 540px;
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

.page-title {
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

input {
  text-align: start;
  vertical-align: bottom;
  position: relative;
  height: 50px;
  border-style: none;
  background: #f5f8fa;
  border-radius: 4px;
  padding-top: 30px;
}
.title {
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
  justify-content: center;
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