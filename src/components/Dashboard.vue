<template>
    <div id="dashboard">
        <div id="header">
            <app-header
              :data="dataStudent"
            ></app-header>
        </div>
        <div id = 'body'>
            <div id = "left">
                <!-- <button class="btn" type="button" @click="activeBtn = 'btn1'" :class="{active: activeBtn === 'btn1' }"><router-link to='/home'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Trang Chủ<img src="@/../public/icons/right.png" class="icon_right"></router-link></button> -->
                <button class="btn" type="button" @click="activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }"><router-link to='/subject'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Môn học<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }"><router-link to='/registertest'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Đăng kí dự thi<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn4'" :class="{active: activeBtn === 'btn4' }"><router-link to='/registed'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Môn đã đăng kí thi<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn5'" :class="{active: activeBtn === 'btn5' }"><router-link to='/print'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> In danh sách<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>          
                <b-alert :variant="typeAlert" :show="dismissCountDown">{{message}}</b-alert>
            </div>
        <!-- <div id = 'body'>
            <div id = "left">     -->
                <!-- <router-link to="/home"  tag='button' v-bind:class="[btnRouterClicked==='1'? 'btn_router_clicked' : 'btn_router']">
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Trang Chủ
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link> -->
                <!-- <router-link to='/subject' @click.native="changePath" tag='button' v-bind:class="[path==='/subject'? 'btn_router_clicked' : 'btn_router']" > 
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
            </div> -->
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
import Header from './component_dashboard/Header.vue'
import Footer from './component_dashboard/Footer.vue'
export default {
    data(){
        return{
            activeBtn:'btn2',
            dataStudent:{
                home:'/subject',
                level:'sinh viên',
                name:'Nguyễn Xuân Tự',
                mssv: '17021119',
            },
            username: '',
            mssv: '',
            path: '',
            message: "",
            dismissCountDown: 0,
            timeCountAlert: 5,
            typeAlert: "",
        }
    },
    components:{
        appHeader:Header,
        appFooter:Footer
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
    overflow: hidden;
}
#body{
    display: flex;
    height: 557px;
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
    position: relative;
    text-align: left;
    text-decoration: none;
    display: block;
    color:#262626;
    margin: 0px;
    padding:4px;
    height: 30px;
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
.active,  .active:hover{
    background: #33ff33;
    width: 100%;
    text-align: left;
}

/* .btn_router_clicked{
    width: 100%;
    height: 30px;
    text-align: left;
    transform: scaleY(1.2);
    box-shadow: gray 0px 2px 2px;
    background-color: #f1f7f0;
} */

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
button{
    width: 200px;
    text-align: left;
    border: none;
    display: block;
    border: 1px solid  #d9d9d9;
}
</style>