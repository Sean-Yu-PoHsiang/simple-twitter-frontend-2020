<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <AdminNav />
      </div>
      <div class="panel-right col">
        <h1 class="title">使用者列表</h1>
        <div class="users-panel px-3">
          <div
            class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2"
          >
            <div class="col my-3">
              <div class="user-card d-flex flex-column justify-content-between">
                <img
                  class="user-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Classic_view_of_a_cloudfree_Peyto_Lake%2C_Banff_National_Park%2C_Alberta%2C_Canada_%284110933448%29.jpg/240px-Classic_view_of_a_cloudfree_Peyto_Lake%2C_Banff_National_Park%2C_Alberta%2C_Canada_%284110933448%29.jpg"
                  alt="no pic"
                />
                <img
                  class="user-avatar"
                  :src="picture | emptyImage"
                  alt="no pic"
                />
                <div class="user-content d-flex flex-column pb-3">
                  <span class="user-name">John Doe</span>
                  <span class="user-acount">&#64;heyjohn</span>
                  <div>
                    <span class="user-like">1.5&#75;</span>
                    <span class="user-like ml-2">20&#75;</span>
                  </div>
                  <div>
                    <span class="user-follow following">34個</span>
                    <span class="user-follow follower ml-2">59位</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav'
import { emptyImageFilter } from '../utils/mixins'

export default {
  components: {
    AdminNav
  },
  mixins: [emptyImageFilter],
}
</script>

<style scoped>
.panel-right {
  height: 100vh;
}
.title {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  color: #1c1c1c;
  font-size: 18px;
  font-weight: 700;
  line-height: 55px;
  padding-left: 25px;
  margin: 0;
}
.user-avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid white;
  position: absolute;
  top: 140px;
  right: 50%;
  transform: translate(50%, -50%);
}
.user-cover {
  height: 140px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
.user-card {
  position: relative;
  background: #f6f7f8;
  border-radius: 10px;
  width: 100%;
  height: 300px;
  text-align: center;
}
.panel-right {
  position: relative;
  height: 100vh;
}
.users-panel {
  position: absolute;
  top: 55px;
  bottom: 0px;
  left: 15px;
  right: 15px;
  border: 1px solid #e6ecf0;
  border-bottom: 0;
  overflow: scroll;
}
.user-name {
  font-size: 15px;
  font-weight: 900;
}
.user-acount {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
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
</style>