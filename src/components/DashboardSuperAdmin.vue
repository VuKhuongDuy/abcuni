<template>
    <div id="dashboard">
        <div id="header">
            <app-header
              :data="dataSuperAdmin"
            ></app-header>
        </div>
        <div id = 'body'>
            <div id = "left">
                <button class="btn" type="button" @click="activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }"><router-link to='/superadmin'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Thông tin Super Admin<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }"><router-link to='/manage_admin'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Quản lý admin<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>          
                <!-- <b-alert :variant="typeAlert" :show="dismissCountDown">{{message}}</b-alert> -->
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
import Header from './component_dashboard/Header.vue'
import Footer from './component_dashboard/Footer.vue'
export default {
    data(){
        return{
            activeBtn:'btn2',
            dataSuperAdmin:{
                home:'/sa',
                level:'Super Admin',
                name:'Super Admin',
            },
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
    height: 100%;
    width: 85%;
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
    width: 210px;
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
    width: 210px;
    text-align: left;
    border: none;
    display: block;
    border: 1px solid  #d9d9d9;
}
</style>