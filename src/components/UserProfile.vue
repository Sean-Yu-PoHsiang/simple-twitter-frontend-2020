<template>
  <div>
    <div class="title-box d-flex">
      <button type="button" class="btn btn-link" @click="$router.push('/')">
        <ArrowIcon />
      </button>
      <div class="title-content d-flex flex-column justify-content-center ml-4">
        <span class="user-name">{{ userProfile.name }}</span>
        <span class="tweets-count">{{ userProfile.tweetsCount }}推文</span>
      </div>
    </div>

    <div class="user-card d-flex flex-column">
      <img
        class="user-cover"
        :src="userProfile.cover | emptyCover"
        alt="no pic"
      />
      <img
        class="user-avatar"
        :src="userProfile.avatar | emptyImage"
        alt="no pic"
      />
      <div class="control-panel d-flex justify-content-end px-2 pt-2">
        <button
          v-if="userProfile.id === currentUser.id"
          class="btn btn-shallow"
          :class="{ btnSolid: isProcessing }"
          :disabled="isProcessing"
          data-toggle="modal"
          data-target="#settingModal"
        >
          {{ isProcessing ? "資料更新中..." : "編輯個人資料" }}
        </button>
        <button v-if="userProfile.id !== currentUser.id" class="btn">
          <IconMessage />
        </button>
        <button v-if="userProfile.id !== currentUser.id" class="btn">
          <IconRing />
        </button>
        <button v-if="false" class="btn"><IconRingActive /></button>

        <button
          v-if="userProfile.id !== currentUser.id && !userProfile.isFollowed"
          class="btn btn-shallow"
          @click="addFollowing(userProfile.id)"
        >
          跟隨
        </button>
        <button
          v-if="userProfile.id !== currentUser.id && userProfile.isFollowed"
          class="btn btnSolid"
          @click="deleteFollowing(userProfile.id)"
        >
          正在跟隨
        </button>
      </div>
      <div class="user-content d-flex flex-column p-3">
        <span class="user-name">{{ userProfile.name }}</span>
        <span class="user-acount">&#64;{{ userProfile.account }}</span>
        <p class="user-description">
          {{ userProfile.introduction }}
        </p>
        <div>
          <router-link
            :to="{
              name: 'user-followings',
              params: { userId: userProfile.id },
            }"
            class="user-follow following"
            >{{ userProfile.FollowingsCount }}個</router-link
          >
          <router-link
            :to="{
              name: 'user-followers',
              params: { userId: userProfile.id },
            }"
            class="user-follow follower ml-2"
            >{{ userProfile.FollowersCount }}位</router-link
          >
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="settingModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <div class="btn-cancel pointer"></div>
              </button>
              <div class="modal-title">編輯個人資料</div>
            </div>
            <button
              type="submit"
              class="btn-tweet-submit"
              data-dismiss="modal"
              @click="handleSubmit"
            >
              儲存
            </button>
          </div>
          <div class="modal-body">
            <form
              id="edit-user-profile-form"
              class="d-flex flex-column w-100"
              @submit.stop.prevent
              enctype="multipart/form-data"
            >
              <div class="form-group cover-box">
                <div class="btn-box-cover d-flex align-items-center">
                  <label class="btn-edit-photo-cover" for="image-cover"
                    ><IconEditPhoto
                  /></label>
                  <div class="btn-delete-photo" @click="clearCoverImage">
                    <div class="btn-cancel pointer ml-3 white"></div>
                  </div>
                </div>
                <img
                  :src="tempUserProfile.cover | emptyCover"
                  class="d-block img-thumbnail-cover"
                />
                <!-- cover image -->
                <input
                  id="image-cover"
                  type="file"
                  name="cover"
                  accept="image/*"
                  class="form-control-file d-none"
                  @change="handleCoverImageChange"
                />
              </div>
              <div class="form-group avatar-box">
                <label class="btn-edit-photo-avatar" for="image-avatar"
                  ><IconEditPhoto
                /></label>
                <img
                  :src="tempUserProfile.avatar | emptyImage"
                  class="d-block img-thumbnail-avatar"
                />
                <!-- avatar image -->
                <input
                  id="image-avatar"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  class="form-control-file d-none"
                  @change="handleAvatarImageChange"
                />
              </div>
              <div class="input-container">
                <div class="input-title">名稱</div>
                <label class="form-label"></label>
                <input
                  v-model="tempUserProfile.name"
                  name="name"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="d-flex justify-content-end">
                <span :class="{ fontRed: isNameOverSize }">{{
                  nameInputLength
                }}</span
                ><span>/40</span>
              </div>
              <div class="texarea-box">
                <textarea
                  v-model="tempUserProfile.introduction"
                  class="form-textarea w-100"
                  name="introduction"
                  id="user-introduction"
                  rows="6"
                  placeholder="自我介紹"
                  autofocus
                ></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <span :class="{ fontRed: isIntroductionOverSize }">{{
                  introductionInputLength || 0
                }}</span
                ><span>/160</span>
              </div>
              <input
                type="text"
                class="form-control d-none"
                name="page"
                value="profile"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowIcon from "./../components/icons/ArrowIcon"
import IconMessage from "./../components/icons/IconMessage"
import IconRing from "./../components/icons/IconRing"
import IconRingActive from "./../components/icons/IconRingActive"
import IconEditPhoto from "./../components/icons/IconEditPhoto"
import { emptyImageFilter } from "../utils/mixins"
import { emptyCoverFilter } from "../utils/mixins"

import userAPI from "./../apis/user"
import { Toast } from "./../utils/helpers"
import { mapState } from "vuex"

export default {
  components: {
    ArrowIcon,
    IconMessage,
    IconRing,
    IconRingActive,
    IconEditPhoto,
  },
  props: {
    initialUserProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userProfile: this.initialUserProfile,
      tempUserProfile: this.initialUserProfile,
      isProcessing: false,
    }
  },
  created() {
    console.log('user profile create>>>>>>>>>>>>>')
  },
  destroyed() {
    console.log('user profile destroy>>>>>>>>>>>>>')
  },
  computed: {
    isNameOverSize() {
      if (this.tempUserProfile.name === null || this.tempUserProfile.name === undefined) {
        return false
      } else {
        return this.tempUserProfile.name.length > 40 ? true : false
      }
    },
    isIntroductionOverSize() {
      if (this.tempUserProfile.introduction === null || this.tempUserProfile.introduction === undefined) {
        return false
      }
      return this.tempUserProfile.introduction.length > 160 ? true : false
    },
    nameInputLength() {
      if (this.tempUserProfile.name === null || this.tempUserProfile.name === undefined) {
        return 0
      } else {
        return this.tempUserProfile.name.length
      }
    },
    introductionInputLength() {
      if (this.tempUserProfile.introduction === null || this.tempUserProfile.introduction === undefined) {
        return 0
      } else {
        return this.tempUserProfile.introduction.length
      }
    },
    ...mapState(["currentUser"]),
  },
  watch: {
    initialUserProfile(newValue) {
      this.userProfile = {
        ...this.userProfile,
        ...newValue,
      }
      this.tempUserProfile = {
        ...this.tempUserProfile,
        ...newValue,
      }
    },
  },
  methods: {
    async addFollowing(userId) {
      try {
        const { data } = await userAPI.addFollowing({ id: userId })

        if (data.status !== "success") {
          throw new Error(data.message)
        }

        this.userProfile.isFollowed = true
        this.userProfile.FollowersCount = this.userProfile.FollowersCount + 1
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法跟隨，請稍後再試",
        })
        console.log("error", error)
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId })

        console.log(data)

        if (data.status !== "success") {
          throw new Error(data.message)
        }

        this.userProfile.isFollowed = false
        this.userProfile.FollowersCount = this.userProfile.FollowersCount - 1
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        })
        console.log("error", error)
      }
    },
    handleCoverImageChange(e) {
      const { files } = e.target

      if (files.length === 0) {
        this.tempUserProfile.avatar = this.currentUser.avatar
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.tempUserProfile.cover = imageURL
      }
    },
    handleAvatarImageChange(e) {
      const { files } = e.target

      if (files.length === 0) {
        this.tempUserProfile.avatar = this.currentUser.avatar
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.tempUserProfile.avatar = imageURL
      }
    },
    clearCoverImage() {
      this.tempUserProfile.cover = ""
      const coverElement = document.getElementById('image-cover')
      coverElement.value = ""
    },
    async handleSubmit() {
      if (!this.tempUserProfile.name) {
        Toast.fire({
          icon: "warning",
          title: "請填寫名稱",
        })
        return
      } else if (!this.tempUserProfile.introduction) {
        Toast.fire({
          icon: "warning",
          title: "請填寫介紹",
        })
        return
      } else if (this.isNameOverSize) {
        Toast.fire({
          icon: "warning",
          title: "名稱限40個字",
        })
        return
      } else if (this.isIntroductionOverSize) {
        Toast.fire({
          icon: "warning",
          title: "自我介紹限160個字",
        })
        return
      }

      this.isProcessing = true
      let formData = new FormData(document.getElementById('edit-user-profile-form'))

      try {
        const response = await userAPI.EditUserProfile({
          userId: this.tempUserProfile.id,
          formData,
        })
        if (response.status !== 200) {
          throw new Error(response.data.message)
        }
        const newUserProfileRes = await userAPI.getCurrentUserProfile()
        this.userProfile = {
          ...this.userProfile,
          ...newUserProfileRes.data
        }
        this.$store.commit('setCurrentUser', newUserProfileRes.data)
        this.isProcessing = false

      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法更新資料，請稍後再試。",
        })
      }
    },
  },
  mixins: [emptyImageFilter, emptyCoverFilter],
}
</script>

<style scoped>
.fontRed {
  color: red;
}
.form-control:focus {
  box-shadow: 0 0 0 0.2rem transparent;
  background: transparent;
}
.btn-edit-photo-cover {
  margin: 0;
  cursor: pointer;
}
.btn-edit-photo-avatar {
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-body {
  position: relative;
}
.cover-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 200px;
  /* background: #666666; */
}
.btn-box-cover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar-box {
  position: absolute;
  top: 140px;
  left: 20;
  width: 120px;
  height: 120px;
}
.img-thumbnail-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-thumbnail-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
}
.modal-title {
  font-size: 19px;
  font-weight: 700;
  line-height: 24px;
  margin-left: 16px;
}
.modal-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}
.btn-tweet-submit {
  position: relative;
  top: -8px;

  color: white;
  background: #ff6600;
  border-color: transparent;
  height: 40px;
  border-radius: 20px;
  width: 64px;
}
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
.btn {
  padding: 0;
  margin: 0 5px;
}
.btn-shallow {
  border: 1px solid #ff6600;
  border-radius: 20px;
  height: 40px;
  padding: 0 16px;
  color: #ff6600;
  font-size: 15px;
  font-weight: 700;
}
.btnSolid {
  border: 1px solid #ff6600;
  border-radius: 20px;
  height: 40px;
  padding: 0 16px;
  color: white;
  background: #ff6600;
  font-size: 15px;
  font-weight: 700;
}
.title-box {
  height: 55px;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
}
.user-name {
  font-size: 19px;
  font-weight: 900;
  color: #1c1c1c;
}
.tweets-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}

.user-avatar {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  top: 192px;
  left: 85px;
  transform: translate(-50%, -50%);
}
.user-cover {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
.user-card {
  position: relative;
  border: 1px solid #e6ecf0;
  border-bottom: 0;
  width: 100%;
}
.user-acount {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}
.user-description {
  font-size: 14px;
  font-weight: 400;
  color: black;
}
.user-like {
  font-size: 15px;
  font-weight: 500;
}
.user-follow {
  font-size: 14px;
  font-weight: 500;
}
.following:after {
  content: "跟隨中";
  color: #657786;
}
.follower::after {
  content: "跟隨者";
  color: #657786;
}

/* modal-setting */
textarea {
  margin: 0;
  padding: 0;
  background: #f5f8fa;
  resize: none;
  border: none;
}
.texarea-box {
  padding: 10px;
  border-radius: 4px;
  background: #f5f8fa;
  border-bottom: 2px solid #657786;
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
  width: 2px;
  border-radius: 2px;
  background: #ff6600;
  z-index: 99;
  left: 42%;
  /* transform: translate(-50%, -50%); */
}
.white::after,
.white::before {
  background: white;
}
.btn-cancel::before {
  transform: rotate(45deg);
}
.btn-cancel::after {
  transform: rotate(-45deg);
}

/* input name */
.input-container {
  position: relative;
  margin-top: 250px;
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
.pointer {
  cursor: pointer;
}
</style>