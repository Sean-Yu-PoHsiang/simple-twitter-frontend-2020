<template>
  <div class="sign-in-wrapper">
    <div class="ac-logo">
      <Logo class="logo-image" />
      <div class="title">登入 Alphitter</div>
    </div>
    <form>
      <div class="input-container">
        <div class="input-title">帳號</div>
        <label for="exampleInputEmail1" class="form-label"></label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text"></div>
      </div>
      <div class="input-container">
        <div class="input-title">帳號</div>

        <label
          for="exampleInputPassword1"
          class="form-label"
          aria-placeholder="密碼"
        ></label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <button type="submit" class="btn btn-primary btn-submit" id="btn-submit">
        登入
      </button>
    </form>
    <div class="pages-link">
      <router-link class="link" to=""> 註冊 Alphitter </router-link>
      <span>·</span>
      <router-link class="link" to=""> 後台登入 </router-link>
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
  /* bottom: -30px; */
}

.btn-submit {
  background: #ff6600;
  border-radius: 50px;
  width: 100%;
  margin-top: 30px;
}
.pages-link {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}

.link {
  text-decoration: underline;
}

span {
  color: #0099ff;
}
</style>