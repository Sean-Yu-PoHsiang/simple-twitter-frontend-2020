<template>
  <nav class="d-flex flex-column">
    <Logo class="mt-3 mb-5" />
    <router-link to="/home" class="nav-btn d-flex fonSize18 align-items-center">
      <IconHome class="mr-3" />
      首頁
    </router-link>
    <router-link
      :to="{ name: 'user', params: { userId: currentUser.id } }"
      class="nav-btn d-flex fonSize18 align-items-center"
    >
      <IconUserProfile class="mr-3" />
      個人資料
    </router-link>
    <router-link
      to="/setting"
      class="nav-btn d-flex fonSize18 align-items-center"
    >
      <IconSetting class="mr-3" />
      設定
    </router-link>

    <button
      type="button"
      class="btn-tweet"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      推文
    </button>

    <button
      type="button"
      class="btn sign-out-btn d-flex fonSize18 align-items-center"
      @click="signOut"
    >
      <IconSignOut class="mr-3" />
      登出
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <div class="btn-cancel pointer"></div>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex">
              <img :src="currentUser.avatar | emptyImage" alt="no photo" />
              <form
                class="d-flex flex-column w-100"
                @submit.stop.prevent="handleSubmit"
              >
                <textarea
                  v-model="description"
                  class="form-textarea w-100"
                  name="text"
                  id="newTweet"
                  rows="6"
                  placeholder="有什麼新鮮事？"
                  autofocus
                ></textarea>
                <button
                  type="submit"
                  class="btn-tweet-submit align-self-end"
                  data-dismiss="modal"
                  @click="handleSubmit"
                >
                  推文
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "./Logo";
import IconHome from "./IconHome";
import IconSetting from "./IconSetting";
import IconUserProfile from "./IconUserProfile";
import IconSignOut from "./IconSignOut";
import { emptyImageFilter } from "../utils/mixins";

import userAPI from "./../apis/user";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "./../utils/helpers";

import { mapState } from "vuex";

export default {
  components: {
    Logo,
    IconHome,
    IconSetting,
    IconUserProfile,
    IconSignOut,
  },
  data() {
    return {
      avatar: "",
      id: -1,
      description: "",
      createdAt: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },

  methods: {
    signOut() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },

    async handleSubmit() {
      if (this.description.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "親愛的用戶，請勿發空空的思念。",
        });
        return;
      } else if (this.description.length > 140) {
        Toast.fire({
          icon: "error",
          title: "推文字數超過140囉！",
        });
        return;
      }

      try {
        this.createdAt = Date.now();
        const response = await userAPI.addUserNewTweet({
          description: this.description,
          createdAt: this.createdAt,
        });

        if (response.status !== 200) {
          throw new Error(response);
        }

        this.$emit("after-create-tweet", {
          User: {
            id: this.currentUser.id,
            account: this.currentUser.account,
            name: this.currentUser.name,
            avatar: this.currentUser.avatar,
          },
          id: uuidv4(),
          name: this.currentUser.name,
          description: this.description,
          createdAt: this.createdAt,
          repliesCount: 0,
          likesCount: 0,
          isLiked: false,
        });
        this.description = "";
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
  },
  mixins: [emptyImageFilter],
};
</script>

<style scoped>
.modal-dialog {
  max-width: 600px;
}
.modal-content {
  border-radius: 14px;
  border: 0;
}
.modal-header {
  height: 54px;
}
.close {
  color: #ff6600;
  opacity: 1;
  margin: -1rem -1rem -1rem -1rem;
  font-size: 30px;
}
.modal-footer {
  border: 0;
}
nav {
  height: 100vh;
}
.nav-btn {
  width: 200px;
  color: #1c1c1c;
  font-weight: 700;
  margin-bottom: 34px;
}
.active {
  color: #ff6600;
}
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}
hr {
  margin: 0;
}
.nav-btn:hover {
  text-decoration: none;
}
.fonSize18 {
  font-size: 18px;
}
.btn-tweet {
  color: white;
  background: #ff6600;
  border-color: transparent;
  height: 50px;
  border-radius: 25px;
  width: 200px;
}
.btn-tweet-submit {
  color: white;
  background: #ff6600;
  border-color: transparent;
  height: 40px;
  border-radius: 20px;
  width: 64px;
}
.btn-tweet:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem transparent;
}
.btn-tweet:hover {
  opacity: 0.9;
}
.sign-out-btn {
  width: 200px;
  margin: auto 0 17px 0;
  padding: 0;
  font-weight: 700;
}
.sign-out-btn:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem transparent;
  background: transparent;
}
.pointer {
  cursor: pointer;
}
/* modal-setting */
.new-tweet-card-pack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.new-tweet-card {
  position: relative;
  height: auto;
  width: 600px;
  background: white;
  margin: 30px auto;
  z-index: 999;
  border-radius: 14px;
}
textarea {
  margin: 0;
  padding: 0;
  margin-top: 12px;
  resize: none;
  border: none;
}
textarea:focus {
  outline: none;
}
.btn-cancel {
  position: relative;
  width: 24px;
  height: 24px;
}
.btn-cancel::before,
.btn-cancel::after {
  content: "";
  position: absolute;
  height: 24px;
  width: 4px;
  border-radius: 2px;
  background: #ff6600;
  z-index: 99;
  left: 42%;
  /* transform: translate(-50%, -50%); */
}
.btn-cancel::before {
  transform: rotate(45deg);
}
.btn-cancel::after {
  transform: rotate(-45deg);
}
.router-link-active {
  color: #ff6600;
}
</style>