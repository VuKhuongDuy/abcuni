<template>
  <div class="login">
    <div class="loginbox">
      <img src="../../public/images/avatar.jpg" class="avatar">
      <h1>Login</h1>
      <div>
        <p>Username:</p>
        <input type="text" name="username" placeholder="mssv or username" id="username" v-model="username">
        <p>Password:</p>
        <input type="password" name="password" placeholder="password" id="password" v-model="password">
        <input type="submit" name="" value="Login" @click="click_login"><br>
        <a href="#"> Quên tài khoản?</a>
      </div>
    </div>

    <div id="welcome">
      <div id="welcomeLogo">
        <img src="../../public/images/logo.png">
      </div>
      <div id="welcomeTitle">
          CỔNG THÔNG TIN ĐĂNG KÍ DỰ THI
      </div>
    </div>

    <div id="footer">
      <p>
        Cổng thông tin đăng kí dự thi trường đại học ABC <br>
        Phát triển bởi team DTT<br>
        144 Xuân Thủy, Cầu Giấy, Hà Nội 
      </p>
    </div>
  </div>
</template>

<script>
import {listuser} from '../../config/test_user.js';
export default {
  
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    click_login: function(){
      let isLogin = false;
      listuser.forEach((user) => {
        if(user.mssv === this.username && user.password === this.password){
          isLogin = true;
          this.$router.push("/registertest");
        }
        return;
      })
      
      if(!isLogin){
        alert('Login faild');
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#login{
	margin: 0px;
	padding: 0px;
  /* background-image: url("../../public/images/bg.png"); */
	background-size: cover;
	background-repeat: no-repeat;
	font-family: sans-serif;
}

.loginbox{
	width: 320px;
	height: 420px;
	background: #fff;
	top: 50%;
	left: 50%;
	position: absolute;
	transform: translate(-50%, -50%);
	box-sizing: border-box;
	padding: 70px 30px;
	border-radius: 10px;
}
.avatar{
	width: 100px;
	height: 100px;
	position: absolute;
	top: -50px;
	left: calc(50% - 50px);
}
h1{
	margin: 0px;
	padding: 0px 0px 20px;
	text-align: center;
	font-size: 22px;

}
.loginbox p{
	margin: 0px;
	padding: 0px;
	font-weight: bold;
}
.loginbox input[id="username"], input[id="password"]{
	width: 100%;
	border: none;
	border-bottom: 1px solid #00ff00;
	background: transparent;
	outline: none;
	height: 40px;
	font-size: 16px;
	margin-bottom: 20px;
}
.loginbox input[type="submit"]{
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
.loginbox a{
	color: #339933;
	text-decoration: none;
}
.loginbox a:hover{
	color: #ff0000;
	text-decoration: underline;
}
.loginbox input:hover{
	background:  #d9d9d9;
}
.loginbox input[type="submit"]:hover{
	background: #066c00;
	font-weight: bold;
}

/* welcome */
#welcomeLogo img{
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
#footer{
	position: absolute;
	right: 5px;
	bottom: 0px;
	text-align: right;
	font-size: 12px;
	font-family: Courier New;
}
</style>
