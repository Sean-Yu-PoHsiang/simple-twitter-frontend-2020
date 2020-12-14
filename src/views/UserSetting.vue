<template>
  <div class="user-setting-wrapper">
    <div class="title">帳戶設定</div>

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
      <div class="flex-end">
        <button
          type="submit"
          class="btn btn-primary btn-submit"
          id="btn-submit"
        >
          儲存
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.user-setting-wrapper {
  /* border: 1px solid #e6ecf0; */
  width: 640px;
  margin: 0 auto;
}

.title {
  /* border: 1px solid #e6ecf0; */
  padding: 15px 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
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
  width: 122px;
  margin-top: 30px;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>