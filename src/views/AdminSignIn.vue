<template>
  <div class="container">
    <form
      class="d-flex flex-column mt-3"
      autocomplete="off"
      @submit.stop.prevent
    >
      <Logo class="align-self-center m-4" />
      <h1 class="align-self-center fonSize23 mb-4">後台登入</h1>
      <div class="form-item">
        <label for="exampleInputEmail1" class="form-label w-100 fonSize15"
          >帳號</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-item">
        <label for="exampleInputPassword1" class="form-label w-100 fonSize15"
          >密碼</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary align-self-center w-100 fonSize15 signin-btn mb-5 fonSize18"
      >
        登入
      </button>
    </form>
    <div class="d-flex justify-content-end w-100">
      <router-link class="fonSize18 link-underline" to="/signin">
        前台登入
      </router-link>
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
  border-bottom: 2px solid #657786;
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
</style>