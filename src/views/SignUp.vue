<template>
  <div class="sign-in-wrapper">
    <div class="ac-logo">
      <Logo class="logo-image" />
      <div class="sign-in-title">建立你的帳號</div>
    </div>
    <form>
      <div class="account-container">
        <label class="form-label"></label>
        <input type="text" class="form-control" placeholder="帳號" />
      </div>
      <div class="account-container">
        <label class="form-label"></label>
        <input type="text" class="form-control" placeholder="名稱" />
      </div>
      <div class="account-container">
        <label for="exampleInputEmail1" class="form-label"></label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="帳號"
        />
        <div id="emailHelp" class="form-text"></div>
      </div>
      <div class="password-container">
        <label
          for="password"
          class="form-label"
          aria-placeholder="密碼"
        ></label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="密碼"
        />
      </div>
      <div class="password-confirm-container">
        <label
          for="password-confirm"
          class="form-label"
          aria-placeholder="密碼確認"
        ></label>
        <input
          type="password"
          class="form-control"
          id="password-confirm"
          placeholder="密碼確認"
        />
      </div>

      <button type="submit" class="btn btn-primary btn-submit" id="btn-submit">
        登入
      </button>
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

.sign-in-title {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 33px;
  color: #1c1c1c;
}

input {
  position: relative;
  height: 50px;
  border-style: none;
  background: #f5f8fa;
  border-radius: 4px;
  border-bottom: 2px solid #657786;
}
/* 要用偽元素做底線？ */

/* placeholder樣式 */
::placeholder {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  color: #657786;
  position: absolute;
  left: 10px;
  top: 2px;
}

.btn-submit {
  background: #ff6600;
  border-radius: 50px;
  width: 100%;
  margin-top: 30px;
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