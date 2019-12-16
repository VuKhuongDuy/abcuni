<template>
    <div id="dashboard">
        <div id="header">
            <div id="logo">
                <img src="@/../public/images/logo.png" width="100" height="100" alt="Logo" title="Logo">
            </div>
            <div id="headerTitle">
                <h3>Cổng thông tin đăng kí thi</h3>
                <h4>Dành cho <span>sinh viên</span></h4>
            </div>
            <div id="header-right">
                <div id="headerWelcome">
                    <div>
                        <p>
                            Xin chào: <strong>{{username}}</strong> <br>MSSV: <strong>{{mssv}}</strong>
                        </p>
                    </div>
                </div>
                <div id="headerMenu">
                    <ul>
                        <!-- <li>
                            <a href="#/login"><img src="@/../public/icons/notification.png" width="18" height="20" id='notification'> Thông báo</a>
                        </li> -->
                        <li>
                            <a href="#/login"><img src="@/../public/icons/change_password.png" width="18" height="18" id='change_password'>  Đổi mật khẩu</a>
                        </li>
                        <li id='li_1'>
                            <a href="#/login" @click.prevent="logout"><img src="@/../public/icons/sign_out.png" width="20" height="20" id='logout'> Đăng xuất</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div id = 'body'>
            <div id = "left">    
                <router-link to="/home"  tag='button' v-bind:class="[btnRouterClicked==='1'? 'btn_router_clicked' : 'btn_router']">
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Trang Chủ
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/subject'  tag='button' v-bind:class="[btnRouterClicked==='2'? 'btn_router_clicked' : 'btn_router']" > 
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Môn học
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/registertest'  tag='button' v-bind:class="[btnRouterClicked==='3'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Đăng kí dự thi
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/registed'  tag='button' v-bind:class="[btnRouterClicked==='4'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Môn đã đăng kí thi
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/print'  tag='button' v-bind:class="[btnRouterClicked==='5'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> In danh sách
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
            </div>
            <div id= 'right'>
                <router-view></router-view>
            </div>
        </div>
        <div id="footer">
            <div id="footerLeft">
                <span>Số người đang online </span>
                <br>
                <span class="numberOnline" id="numUserOnline">999  </span>
                <br>
                
            </div>
            <div id="footerSep">
            </div>
            <div id="footerRight">
                Cổng thông tin đăng kí dự thi trường đại học ABC <br>
                Phát triển bởi team DTT<br>
                144 Xuân Thủy, Cầu Giấy, Hà Nội 
                <br>
            </div>
        </div>
    </div>    
</template>
<script>
import * as config from '../../config/config';
import * as axios from '../../config/axios';
import * as cookie from '../../config/cookie'
export default {
    name: 'dashboard',
    data(){
        return {
            btnRouterClicked: this.$route.query,
            username: '',
            mssv: '',
        }
    },
    methods : {
        getUser: async function(){
            const data = await axios.getAxios(config.listUrl.getUser);
            if(data.success){
                this.username = data.data.username;
                this.mssv = data.data.mssv;
            }   
        },

        logout: function(){
            cookie.clearCookie();
            this.$router.push("login");
        }
    },
    mounted: function(){
        this.getUser();
    }
}
</script>
<style scoped>
#dashboard{
    width: 100%;
    min-height: 600px;
    overflow: hidden;
}
#header{
    width: 100%;
    height: 110px;
    /* background-color: rgb(9, 157, 94); */
    border-bottom: 4px double gray;
    color: #066c00;
    display: block;
}
#body{
    display: flex;
    min-height: 700px;
    /* margin-top: 50px; */
}
#left{
    width: 15%;
    height: 100%;
    display:block;
}
#right{
    width: 80%;
    height: 100%;
    display: inline-block;
}
.btn_router{
    width: 100%;
    height: 30px;
    text-align: left;
    /* background-color: #fff; */
}
.btn_router_clicked{
    width: 100%;
    height: 30px;
    text-align: left;
    transform: scaleY(1.1);
    border: 1px solid #29a2f2;
}
#home{
    margin: 0;
    
}
#logo{
    position: absolute;
    top: 3px;
    left: 25px;
}
#header-right{
    position: absolute;
    right: 30px;
}
#headerTitle{
    position: absolute;
    left: 160px;
    top: 13px;
}

#headerWelcome p{
    text-align: right;
    margin: 0;
    position: relative;
    float: right;
}
#headerMenu{
    margin-top: 70px;
}
ul{
    bottom: 10px;
    list-style-type: none;
    font-size: 17px;
}
li{
    float: left;
    width:150px;
}
#li_1{
    width: 126px;
}
li a{
    color: #066c00;
    vertical-align: super;
    text-align: right;
    text-decoration: none;
    float: right;
}
li a:hover{
    color: #0000ff;
}
li a:active{
    color:#ff0000;
}
/* body */
/* #body{
    margin: 0;
    height: 552px;
} */
#menu{
    width: 200px;
    float: left;
    min-height: 100%;
}
.icon_stack{
    width: 16px;
    position: relative;
    bottom: 2.5px;
}
.icon_right{
    width: 15px;
    float: right;
    position: relative;
    top: 5px;
}
#content{ 
    width:calc(100% - 205px);
    margin-left: 5px;
    /* min-height: 100%; */
    float:left;
}
/* footer */
#footer{
  width: 100%;
  height: 72px;
  /* clear: both; */
  /* color: #066c00; */
  font-family: "Courier New";
  font-weight: bold;
  background-color: #aaf2ab;
  /* border-top: 1px double gray; */
}
#footerLeft{
    float: left;
    padding: 5px;
    height: 100%;
}
#footerSep{
    margin-left:3px;
    border-left: 2px solid #066c00;
    float: left;
    height: 100%;
    left: 206px;
}
#numUserOnline{
    color:#ff0000;
    float:right;
}
#footerRight{
    position: absolute;
    left:208px;
}
</style>