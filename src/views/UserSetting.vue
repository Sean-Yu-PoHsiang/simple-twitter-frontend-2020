<template>
  <div class="container">
    <div class="row">
      <div class="col-auto component-navbar left-area-rwd">
        <Navbar />
      </div>
      <div class="col user-setting-wrapper vh100scroll">
        <div class="title">帳戶設定</div>

        <form class="input-forms" @submit.stop.prevent="handleSubmit">
          <div class="input-container">
            <div class="input-title">帳號</div>
            <label class="form-label"></label>
            <input v-model="account" type="text" class="form-control" />
          </div>
          <div class="input-container">
            <div class="input-title">名稱</div>
            <label class="form-label"></label>
            <input v-model="name" type="text" class="form-control" />
          </div>
          <div class="input-container">
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
              id="password"
            />
          </div>
          <div class="input-container">
            <div class="input-title">密碼確認</div>
            <label
              for="password-confirm"
              class="form-label"
              aria-placeholder="密碼確認"
            ></label>
            <input
              v-model="checkPassword"
              type="password"
              class="form-control"
              id="password-confirm"
            />
          </div>
          <div class="flex-end">
            <button type="submit" class="btn btn-submit" id="btn-submit">
              儲存
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar.vue";
import { mapState } from "vuex";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Navbar,
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
  created() {
    this.account = this.currentUser.account;
    this.name = this.currentUser.name;
    this.email = this.currentUser.email;
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleSubmit() {
      if (!this.name) {
        Toast.fire({
          icon: "warning",
          title: "請填寫名稱",
        });
        return;
      } else if (!this.account) {
        Toast.fire({
          icon: "warning",
          title: "請填寫帳號",
        });
        return;
      } else if (!this.email) {
        Toast.fire({
          icon: "warning",
          title: "請填寫Email",
        });
        return;
      } else if (!this.password) {
        Toast.fire({
          icon: "warning",
          title: "請填寫密碼",
        });
        return;
      } else if (!this.checkPassword) {
        Toast.fire({
          icon: "warning",
          title: "請填寫密碼確認",
        });
        return;
      } else if (this.checkPassword !== this.password) {
        Toast.fire({
          icon: "warning",
          title: "密碼與密碼確認不符",
        });
        return;
      }

      try {
        let userEditContent = {
          userId: this.currentUser.id,
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        }

        const response = await authorizationAPI.EditUserSetting(userEditContent)

        if (response.status === "error") {
          throw new Error(response.message);
        }

        userEditContent = { ...userEditContent, password: "", checkPassword: "" }

        Toast.fire({
          icon: 'success',
          title: `修改成功！`
        })
        this.$store.commit('setCurrentUser', userEditContent)
        this.$router.push({ name: 'home' })

      } catch (error) {
        console.log("err", error);
        Toast.fire({
          icon: "error",
          title: `無法儲存設定，${error}`,
        });
      }
    },
  },
};
</script>

<style scoped>
/* 版面調整 */
.setting-page {
  width: 100%;
  display: flex;
}

/* 表單區 */
.user-setting-wrapper {
  width: 100%;
  border-left: 1px solid #e6ecf0;
}

.col {
  padding: 0;
}

.title {
  padding: 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  border-bottom: 1px solid #e6ecf0;
}

.input-forms {
  width: 100%;
  max-width: 640px;
  padding: 0 15px;
}
/* 表單本身 */
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
/* 按鈕 */

.btn-submit {
  height: 50px;
  background: #ff6600;
  border-radius: 50px;
  width: 122px;
  margin-top: 30px;
  border: 1px solid transparent;
  outline: none;
  color: #ffffff;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.active {
  background: #ff6600;
  border-radius: 50px;
  width: 122px;
  margin-top: 30px;
  border: 1px solid transparent;
  outline: none;
}
</style>