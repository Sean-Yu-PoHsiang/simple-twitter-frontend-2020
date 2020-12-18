<template>
  <div class="sign-in-wrapper">
    <div class="ac-logo">
      <Logo class="logo-image" />
      <div class="title">建立你的帳號</div>
    </div>
    <form method="post" @submit.prevent.stop="handleSubmit">
      <div class="input-account">
        <div class="input-title">帳號</div>
        <label class="form-label"></label>
        <input v-model="account" type="text" class="form-control" />
      </div>
      <div class="input-name">
        <div class="input-title">名稱</div>
        <label class="form-label"></label>
        <input v-model="name" type="text" class="form-control" />
      </div>
      <div class="input-email">
        <div class="input-title">email</div>
        <label for="inputEmail" class="form-label"></label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text"></div>
      </div>
      <div class="input-password">
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
          id="password"
        />
      </div>
      <div class="input-password-check">
        <div class="input-title">密碼確認</div>

        <label
          for="password-check"
          class="form-label"
          aria-placeholder="密碼確認"
        ></label>
        <input
          v-model="checkPassword"
          type="password"
          class="form-control"
          id="password-check"
        />
      </div>

      <button type="submit" class="btn btn-submit" id="btn-submit">登入</button>
    </form>
    <div class="pages-link">
      <router-link class="link" to="/signin"> 取消 </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "./../components/Logo";

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
    };
  },
  methods: {
    // eslint-disable-next-line
    handleSubmit(e) {
      const data = JSON.stringify({
        email: this.email,
        password: this.password,
      });

      // TODO: 向後端驗證使用者登入資訊是否合法
      console.log("data", data);
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

.title {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 33px;
  color: #1c1c1c;
}

.input-account,
.input-name,
.input-email,
.input-password,
.input-password-check {
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
  border-bottom: 2px solid #657786;
  padding-top: 30px;
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
}

span {
  color: #0099ff;
}
</style>