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
        <b-alert :variant="typeAlert" :show="dismissCountDown">{{message}}</b-alert>
        <div id = 'body'>
            <div id = "left">    
                <!-- <router-link to="/home"  tag='button' v-bind:class="[btnRouterClicked==='1'? 'btn_router_clicked' : 'btn_router']">
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Trang Chủ
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link> -->
                <router-link to='/subject' @click.native="changePath" tag='button' v-bind:class="[path==='/subject'? 'btn_router_clicked' : 'btn_router']" > 
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Môn học
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/registertest' @click.native="changePath" tag='button' v-bind:class="[path==='/registertest'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Đăng kí dự thi
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/registed' @click.native="changePath" tag='button' v-bind:class="[path==='/registed'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Môn đã đăng kí thi
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/print' @click.native="changePath" tag='button' v-bind:class="[path==='/print'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> In danh sách
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
            </div>
            <div id= 'right'>
                <router-view></router-view>
            </div>
        </div>
        <div id="footer">
            <app-footer></app-footer>
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
            username: '',
            mssv: '',
            path: '',
            message: "",
            dismissCountDown: 0,
            timeCountAlert: 5,
            typeAlert: "",
        }
    },
    methods : {
        getUser: async function(){
            const data = await axios.getAxios(config.listUrl.getUser);
            if(!data || !data.success){
                this.changeTypeAlert(data.message, 'warning');
            }else{
                this.username = data.data.username;
                this.mssv = data.data.mssv;
            }
        },

        logout: function(){
            cookie.clearCookie();
            this.$router.push("login");
        },

        changePath: function(){
            this.path = this.$route.path;    
        },

        changeTypeAlert: function(message, type){
			this.message = message;
			this.typeAlert = type;
			this.dismissCountDown = this.timeCountAlert;
		}
    },
    mounted: function(){
        this.path = this.$route.path;
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
    border-bottom: 4px double gray;
    color: #066c00;
    display: block;
}

#body{
    display: flex;
    min-height: 700px;
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

#menu{
    width: 200px;
    display:block;
}

#li_1{
    width: 126px;
}

#footer{
  width: 100%;
  height: 72px;
  font-family: "Courier New";
  font-weight: bold;
  background-color: #aaf2ab;
}
#footerLeft{
    float: left;
    padding: 5px;
    height: 100%;
}
.btn:hover{
    background-color: #e6e6e6;
    display: block;
}
.active,  .active:hover{
    background: #33ff33;
    width: 100%;
    text-align: left;
}

.btn_router{
    width: 100%;
    height: 30px;
    text-align: left;
}
.btn_router_clicked{
    width: 100%;
    height: 30px;
    text-align: left;
    transform: scaleY(1.2);
    box-shadow: gray 0px 2px 2px;
    background-color: #f1f7f0;
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
ul{
    bottom: 10px;
    list-style-type: none;
    font-size: 17px;
}
li{
    float: left;
    width:150px;
}

li a{
    color: #066c00;
    vertical-align: super;
    text-align: right;
    text-decoration: none;
    float: right;
}

li a:active{
    color:#ff0000;
}

button{
    width: 200px;
    text-align: left;
    border: none;
    display: block;
    border: 1px solid  #d9d9d9;
}
</style>