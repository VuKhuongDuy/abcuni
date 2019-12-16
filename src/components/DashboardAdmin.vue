<template>
    <div id="home">
        <div id="header">
            <app-header
              :dataAdmins="dataAdmins"
            ></app-header>
        </div>
        <div id="body">
            <div id="menu">
                <div id="components-menu">
                    <tbody>
                        <button @click="check2 = !check2" class="button_menu"><img src="@/../public/icons/stack.png" class="icon_stack"> Quản lý sinh viên<img v-if="check2" src="@/../public/icons/up.png" class="icon_down"><img v-if="!check2" src="@/../public/icons/down.png" class="icon_down"></button>
                        <template v-if="check2" class="transition_menu">
                            <button class="btn" type="button" @click="activeBtn = 'btn1'" :class="{active: activeBtn === 'btn1' }"><router-link to='/student' class="btn_router"><img src="@/../public/icons/right_1.png" class="icon_right">Sinh Viên</router-link></button>
                            <button class="btn" type="button" @click="activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }"><router-link to='/user' class="btn_router" ><img src="@/../public/icons/right_1.png" class="icon_right">Tài khoản sinh viên</router-link></button>
                            <button class="btn" type="button" @click="activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }"><router-link to='/subjectfull' class="btn_router" ><img src="@/../public/icons/right_1.png" class="icon_right">Môn học SV đã học</router-link></button>
                            <button class="btn" type="button" @click="activeBtn = 'btn4'" :class="{active: activeBtn === 'btn4' }"><router-link to='/notenough' class="btn_router" ><img src="@/../public/icons/right_1.png" class="icon_right">SV không đủ điều kiện</router-link></button>
                        </template>
                        <button @click="check0 = !check0" class="button_menu"><img src="@/../public/icons/stack.png" class="icon_stack"> Quản lý khách quan<img v-if="check0" src="@/../public/icons/up.png" class="icon_down"><img v-if="!check0" src="@/../public/icons/down.png" class="icon_down"></button>
                        <template v-if="check0" class="transition_menu">
                            <button class="btn" type="button" @click="activeBtn = 'btn5'" :class="{active: activeBtn === 'btn5' }"><router-link to='/infrastructure' class="btn_router" ><img src="@/../public/icons/right_1.png" class="icon_right">Cơ sở vật chất</router-link></button>
                            <button class="btn" type="button" @click="activeBtn = 'btn6'" :class="{active: activeBtn === 'btn6' }"><router-link to='/subjectexam' class="btn_router" ><img src="@/../public/icons/right_1.png" class="icon_right">Môn thi</router-link></button>
                            <button class="btn" type="button" @click="activeBtn = 'btn7'" :class="{active: activeBtn === 'btn7' }"><router-link to='/ca' class="btn_router" ><img src="@/../public/icons/right_1.png" class="icon_right">Ca thi</router-link></button>
                        </template>
                        <button @click="check1 = !check1" class="button_menu"><img src="@/../public/icons/stack.png" class="icon_stack"> Quản lý lịch thi<img v-if="check1" src="@/../public/icons/up.png" class="icon_down"><img v-if="!check1" src="@/../public/icons/down.png" class="icon_down"></button>
                        <template v-if="check1"  class="transition_menu">
                            <button class="btn" type="button"  @click="activeBtn = 'btn8'" :class="{active: activeBtn === 'btn8' }"><router-link to='/testexam' class="btn_router" ><img src="@/../public/icons/right_1.png" class="icon_right">Lịch thi</router-link></button>
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
            check0:false,
            check1:true,
            check2:false,
            dataAdmins:{
                home:'/testexam',
                level:'admin',
                user: 'Admin',
            },
            activeBtn:'btn8',
            // backgroundImage: './public/images/logo.png',
        }   
    },
    methods: {
        checkUser: async function(){
            let url = "/admin";
            let data = await axios.getAxios(url);
            console.log(data);
            if(!data.success){
                cookie.clearCookie();
                this.$router.push("/login");	  
            }
        }
    },
    mounted: function(){
        this.checkUser();
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
    height: 552px;
}

#menu{
    width: 200px;
    float: left;
    min-height: 100%;
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
/* .button_menu{
    background-color: #4da6ff;
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
.btn{
    display: block;
    width: 200px;
    margin:0px;
    padding: 0px;
}
.btn:hover{
    background-color: #e6e6e6;
    display: block;
}
.active, .active:hover{
    background: #33ff33;
    width: 100%;
    text-align: left;
    border: none;
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
    width:calc(100% - 205px);
    margin-left: 5px;
    min-height: 100%;
    float:left;
}

/* footer */

</style>