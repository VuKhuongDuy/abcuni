<template>
  <div id="login" style="background-image: url(./public/images/bg.png)">
    <div class="loginbox">
      <b-alert variant="danger" :show="dismissCountDown">{{message}}</b-alert>
      <img src="@/../public/images/avatar.jpg" class="avatar" />
      <h1>Login</h1>
      <div>
        <p>Username:</p>
        <input
          type="text"
          name="username"
          placeholder="Mssv or username"
          id="username"
          v-model="username"
        />
        <p>Password:</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          v-model="password"
        />
        <input type="submit" name value="Login" @click="click_login" />
        <br />
        <a href="#">Quên tài khoản?</a>
      </div>
    </div>

    <div id="welcome">
      <div id="welcomeLogo">
        <img src="@/../public/images/logo.png" />
      </div>
      <div id="welcomeTitle">CỔNG THÔNG TIN ĐĂNG KÍ DỰ THI</div>
    </div>

    <div id="footer">
      <p>
        Cổng thông tin đăng kí dự thi trường đại học ABC
        <br />Phát triển bởi team DTT
        <br />144 Xuân Thủy, Cầu Giấy, Hà Nội
      </p>
    </div>
  </div>
</template>

<script>
import * as config from "@/../config/config.js";
import * as axios from "@/../config/axios.js";
import * as cookie from "@/../config/cookie.js";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      dismissCountDown: 0,
      dismissSecs: 4,
      message: ""
    };
  },

  methods: {
    click_login: async function() {
      this.dismissCountDown = 0;
      let isLogin = false;
      let url = config.listUrl.login;
      let body = { username: this.username, password: this.password };
      let result = await axios.postAxios(url, body);
      if (!result.success) {
        this.dismissCountDown = this.dismissSecs;
        this.message = result.message;
        return;
      }

	  cookie.setCookie(result.token, this.username);
	  if(result.isAdmin){
		this.$router.push("/");	  
	  }
	  else this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  margin: 0px;
  padding: 0px;
  /* background-image: url("@/../public/images/bg.png"); */
  background-size: cover;
  background-repeat: no-repeat;
  font-family: sans-serif;
  width: 100%;
  height: 700px;
}

.loginbox {
  width: 320px;
  height: 420px;
  background: #fff;
  border: 1px solid green;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 70px 30px;
  border-radius: 10px;
}
.avatar {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -50px;
  left: calc(50% - 50px);
}
h1 {
  margin: 0px;
  padding: 0px 0px 20px;
  text-align: center;
  font-size: 22px;
}
.loginbox p {
  margin: 0px;
  padding: 0px;
  font-weight: bold;
}
.loginbox input[id="username"],
input[id="password"] {
  width: 100%;
  border: none;
  border-bottom: 1px solid #00ff00;
  background: transparent;
  outline: none;
  height: 40px;
  font-size: 16px;
  margin-bottom: 20px;
}
.loginbox input[type="submit"] {
  border: none;
  outline: none;
  height: 40px;
  background: #339933;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  float: right;
  cursor: pointer;
}
.loginbox a {
  color: #339933;
  text-decoration: none;
}
.loginbox a:hover {
  color: #ff0000;
  text-decoration: underline;
}
.loginbox input:hover {
  background: #d9d9d9;
}
.loginbox input[type="submit"]:hover {
  background: #066c00;
  font-weight: bold;
}

/* welcome */
#welcomeLogo img {
  width: 150px;
  height: 150px;
  margin: 0;
  border: 0;
}
#welcomeLogo {
  float: left;
  display: block;
  top: 100px;
}
#welcomeTitle {
  float: left;
  display: block;
  height: 100px;
  color: #339933;
  font-size: 16pt;
  font-weight: bold;
  margin: 0 0px 10px 0;
  text-align: center;
  font-size: 22px;
  padding: 60px 0 0 10px;
}
/*footer*/
#footer {
  position: absolute;
  right: 5px;
  bottom: 0px;
  text-align: right;
  font-size: 12px;
  font-family: "Courier New";
}
</style>
