<template>
  <div class="sign-in-wrapper">
    <div class="ac-logo">
      <Logo class="logo-image" />
      <div class="title">建立你的帳號</div>
    </div>
    <form>
      <div class="input-container">
        <div class="input-title">帳號</div>
        <label class="form-label"></label>
        <input type="text" class="form-control" />
      </div>
      <div class="input-container">
        <div class="input-title">名稱</div>
        <label class="form-label"></label>
        <input type="text" class="form-control" />
      </div>
      <div class="input-container">
        <div class="input-title">email</div>
        <label for="inputEmail" class="form-label"></label>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
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
        <input type="password" class="form-control" id="password" />
      </div>
      <div class="input-container">
        <div class="input-title">密碼確認</div>

        <label
          for="password-confirm"
          class="form-label"
          aria-placeholder="密碼確認"
        ></label>
        <input type="password" class="form-control" id="password-confirm" />
      </div>

      <button type="submit" class="btn btn-submit" id="btn-submit">登入</button>
    </form>
    <div class="pages-link">
      <router-link class="link" to=""> 取消 </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "./../components/Logo";

export default {
  components: {
    Logo,
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