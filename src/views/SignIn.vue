<template>
  <div class="sign-in-wrapper">
    <form>
      <div class="ac-logo">
        <img :src="AcLogo" alt="" />
        <div class="sign-in-title">登入 Alphitter</div>
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
          for="exampleInputPassword1"
          class="form-label"
          aria-placeholder="密碼"
        ></label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="密碼"
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
import AcLogo from "./../assets/acLogo.png";
export default {
  data() {
    return {
      AcLogo,
    };
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
.ac-logo img {
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
  border-style: none;
  background: #f5f8fa;
  border-radius: 4px;
  border-bottom: 1px solid #657786;
}
/* 要用偽元素做底線？ */

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