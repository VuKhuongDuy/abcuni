
<template>
  <div>
    <div id="header">
      <div id="logo">
        <router-link :to="'/'">
          <img
            src="@/../public/images/logo.png"
            width="100"
            height="100"
            alt="Trang chủ"
            title="Logo"
          />
        </router-link>
      </div>
      <div id="headerTitle">
        <h3>Cổng thông tin đăng kí thi</h3>
        <h4>
          Dành cho
          <span>{{isAdmin}}</span>
        </h4>
      </div>
      <div id="header-right">
        <div id="headerWelcome">
          <p>
            Xin chào:
            <strong>{{username}}</strong>
          </p>
          <p v-show="mssv != null">
              MSSV:
                <strong>{{mssv}}</strong>
          </p>
        </div>

        <div id="headerMenu">
          <b-button variant="primary" class="btn-header" @click="changePassword">Đổi mật khẩu</b-button>
          <b-button variant="secondary" class="btn-header" @click="logout">Đăng xuất</b-button>
        </div>
      </div>
      <b-alert :variant="typeAlert" :show="dismissCountDown">{{message}}</b-alert>
    </div>
  </div>
</template>

<script>
import * as config from '../../../config/config';
import * as axios from '../../../config/axios';
import * as cookie from '../../../config/cookie';
export default {
  props: ["isAdmin"],
  
  data() {
    return {
      username: "",
      mssv: "",
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: ""
    };
  },
  methods: {
    getUser: async function() {
      this.dismissCountDown = 0;
      const data = await axios.getAxios("/user");
      if (!data || !data.success) {
        this.changeTypeAlert(data.message, "warning");
      } else {
        this.username = data.data.username;
        this.mssv = data.data.mssv;
      }
    },

    logout: function() {
      cookie.clearCookie();
      this.$router.push("login");
    },

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    },

    changePassword: function() {
      this.path = "";
      if(this.isAdmin === 'sinh viên'){
        this.$router.push("/password");
      }else 
        this.$router.push("/admin/password/admin");
    }
  },
  mounted: function() {
    this.path = this.$route.path;
    this.getUser();
  },
};
</script>

<style scoped>
#header {
  color: #066c00;
  height: 105px;
  margin-bottom: 0px;
  display: block;
  background-image :linear-gradient(to left, #ffffff, #ccffcc );
}
#logo {
  position: absolute;
}
#notification,
#change_password,
#sign_out {
  position: relative;
  top: -1px;
}
#header-right {
  position: absolute;
  right: 10px;
}
#headerTitle {
  position: absolute;
  top: 14px;
  left: 120px;
}
#headerWelcome{
    min-height: 48px;
}
#headerWelcome p{
  position: relative;
  text-align: right;
  margin-bottom:0px;
  right:10px;
}
#headerMenu {
  margin-top: 10px;
  margin-right: 10px;
}

.btn_header{
    height: 30px;
}
.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 300px;
  /* left: 25%; */
  z-index: 100;
}
</style>
