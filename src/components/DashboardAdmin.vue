<template>
    <div id="home">
        <div id="header">
            <app-header
              isAdmin="quản trị viên"
            ></app-header>
        </div>
        <div id="body">
            <div id="menu">
                <div id="components-menu">
                    <tbody>
                        <button @click="check2 = !check2" :class="check2?shadow:noshadow"><img src="@/../public/icons/stack.png" class="icon_stack"> Quản lý sinh viên<img v-if="check2" src="@/../public/icons/up.png" class="icon_down"><img v-if="!check2" src="@/../public/icons/down.png" class="icon_down"></button>
                        <template v-if="check2" class="transition_menu">
                            <router-link to='/student' @click.native="changePath" tag='button' v-bind:class="[path==='/student'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Sinh Viên</router-link>
                            <router-link to='/user' @click.native="changePath" tag='button' v-bind:class="[path==='/user'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Tài khoản sinh viên</router-link>
                            <router-link to='/subjectfull' @click.native="changePath" tag='button' v-bind:class="[path==='/subjectfull'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Môn học SV đã học</router-link>
                        </template>
                        <button @click="check0 = !check0"  :class="check0?shadow:noshadow"><img src="@/../public/icons/stack.png" class="icon_stack"> Quản lý khách quan<img v-if="check0" src="@/../public/icons/up.png" class="icon_down"><img v-if="!check0" src="@/../public/icons/down.png" class="icon_down"></button>
                        <template v-if="check0" class="transition_menu">
                            <router-link to='/exam' @click.native="changePath" tag='button' v-bind:class="[path==='/exam'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Tạo kì thi</router-link>
                            <router-link to='/room' @click.native="changePath" tag='button' v-bind:class="[path==='/room'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Cơ sở vật chất</router-link>
                            <router-link to='/subjectexam' @click.native="changePath" tag='button' v-bind:class="[path==='/subjectexam'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Môn học</router-link>
                            <router-link to='/turn' @click.native="changePath" tag='button' v-bind:class="[path==='/turn'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Ca thi</router-link>
                        </template>
                        <button @click="check1 = !check1" :class="check1?shadow:noshadow"><img src="@/../public/icons/stack.png" class="icon_stack"> Quản lý lịch thi<img v-if="check1" src="@/../public/icons/up.png" class="icon_down"><img v-if="!check1" src="@/../public/icons/down.png" class="icon_down"></button>
                        <template v-if="check1"  class="transition_menu">
                            <router-link to='/regist' @click.native="changePath" tag='button' v-bind:class="[path==='/regist'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Lịch thi</router-link>
                        </template>
                        <button @click="check3 = !check3" :class="check3?shadow:noshadow"><img src="@/../public/icons/stack.png" class="icon_stack"> Super Admin<img v-if="check3" src="@/../public/icons/up.png" class="icon_down"><img v-if="!check3" src="@/../public/icons/down.png" class="icon_down"></button>
                        <template v-if="check3"  class="transition_menu">
                            <router-link to='/manage_admin' @click.native="changePath" tag='button' v-bind:class="[path==='/manage_admin'? 'active' : 'no_active']"><img src="@/../public/icons/right_1.png" class="icon_right">Quản lý admin</router-link>
                        </template>
                    </tbody>
                </div>
            </div>
            <div id="content">
                    <router-view></router-view>
            </div>
        </div>
        <div id="footer">
            <app-footer></app-footer>
        </div>
        
    </div>    
</template>
<script>
import * as axios from '../../config/axios'
import * as cookie from '../../config/cookie'
import Header from './component_dashboard/Header.vue'
import Footer from './component_dashboard/Footer.vue'
export default {
    data(){
        return{
            check0:true,
            check1:true,
            check3:true,
            check2:true,            
            // activeBtn:'btn8',
            noshadow:'button_menu',
            shadow:'button_menu_shadow',
            path:'/regist',
            // backgroundImage: './public/images/logo.png',
        }   
    },
    methods: {
        checkUser: async function(){
            let url = "/admin";
            let data = await axios.getAxios(url);
            if(!data.success){
                cookie.clearCookie();
                this.$router.push("/login");	  
            }
        },
        changePath: function(){
            this.path = this.$route.path;    
        },
    },
    mounted: function(){
        this.checkUser();
        this.path = this.$route.path;
    },
    components:{
        appHeader:Header,
        appFooter:Footer
    },
}
</script>
<style scoped>

/* body */
#body{
    margin: 0;
    height: 560px;
}

#menu{
    width: 200px;
    float: left;
    min-height: 100%;
    border-right: 1px solid #e6e6e6;
}
tbody {
    display: table-row-group;
    border-collapse: collapse;
}
button{
    width: 200px;
    text-align: left;
    border: none;
    display: block;
}
.button_menu{
    /* background-color: #4da6ff; */
    background-color: #f5f5f0;
    height: 35px;
}
.button_menu_shadow{
    /* background-color: #4da6ff; */
    background-color: #f5f5f0;
    box-shadow: gray 0px 2px 5px;
    height: 35px;
}
.btn_router{
    width: 100%;
    position: relative;
    text-align: left;
    text-decoration: none;
    display: block;
    color:#262626;
    margin: 0px;
    padding:4px;
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

/* .btn{
    display: block;
    width: 200px;
    margin:0px;
    padding: 0px;
}
.btn:hover{
    background-color: #8cd98c;
    display: block;
} */
.active, .active:hover{
    background-image: linear-gradient(to right, white, #b3ffb3 );
    width: 100%;
    text-align: left;
    border: none;
    height: 32px;
}

.no_active{
    background: #ffffff;
    width: 100%;
    text-align: left;
    border: none;
    height: 32px;
}
.no_active:hover{
    background-image: linear-gradient(to right, white, #e6ffe6 );
}

.icon_stack{
    width: 16px;
    position: relative;
    bottom: 2.5px;
}
.icon_down{
    width: 15px;
    float: right;
    position: relative;
    top: 5px;
}
.icon_right{
    width: 15px;
    float: left;
    position: relative;
    top: 5px;
}
.icon_right_0{
    width: 18px;
    float: right;
    position: relative;
    top: 3px;
}
#content{ 
    width:calc(100% - 200px);
    padding-left:10px;
    padding-right: 10px;
    padding-top: 10px;
    margin: 0px;
    min-height: 100%;
    float:left;
    background-color: #e3e6e5;
    /* font-size:3px; */
    
}
</style>