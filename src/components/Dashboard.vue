<template>
    <div id="dashboard">
        <app-header isAdmin="sinh viên"></app-header>
        <div id = 'body'>
            <div id = "left">                    
                <router-link to='/subject' @click.native="changePath" tag='button' v-bind:class="[path==='/subject'? 'btn_router_clicked' : 'btn_router']" > 
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Môn đã học
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/registertest' @click.native="changePath" tag='button' v-bind:class="[path==='/registertest'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Đăng kí dự thi
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/registed' @click.native="changePath" tag='button' v-bind:class="[path==='/registed'? 'btn_router_clicked' : 'btn_router']" >
                    <img src="@/../public/icons/stack.png" class="icon_stack"> Ca đã đăng kí thi
                    <img src="@/../public/icons/right.png" class="icon_right">
                </router-link>
                <router-link to='/user/print' @click.native="changePath" tag='button' v-bind:class="[path==='/user/print'? 'btn_router_clicked' : 'btn_router']" >
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
import Header from './component_dashboard/Header.vue'
import Footer from './component_dashboard/Footer.vue'
export default {
    name: 'dashboard',
    components:{
        appHeader:Header,
        appFooter:Footer
    },
    data(){
        return {
            path: '',
        }
    },
    methods : {
        changePath: function(){
            this.path = this.$route.path;    
        },
    },
    mounted: function(){
        this.path = this.$route.path;
    }
}
</script>
<style scoped>
#dashboard{
    width: 100%;
    min-height: 700px;
    min-width: 400px;
    overflow: hidden;
}

#header{
    width: 100%;
    height: 110px;
    border-bottom: 4px double gray;
    min-width: 900px;
    color: #066c00;
    display: block;
}

#body{
    display: flex;
    min-height: 700px;
}

#left{
    width: 15%;
    min-height: 100%;
    display:block;
}
#right{
    width: 100%;
    min-height: 100%;
    background-color: #e3e6e5;
    display: inline-block;
    margin-top: 3px;
}

.btn:hover{
    background-color: #e6e6e6;
    display: block;
}

.btn_router{
    width: 100%;
    height: 40px;
    margin-top:3px;
    text-align: left;
}

.btn_router_clicked{
    width: 100%;
    height: 40px;
    text-align: left;
    transform: scaleY(1.1);
    box-shadow: gray -1px 2px 5px;
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
/* ul{
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
} */

button{
    width: 200px;
    text-align: left;
    border: none;
    display: block;
    border: 1px solid  #d9d9d9;
}

@media all and (max-width: 700px){
    #header{
        height: 70px;
    }
    #headerRight{
        position: relative;        
        margin-top: 130px;
    }
    #headerUsername{
        display: flex;
        margin-left: 50px;
        margin-right: 10%;
        float: left;
    }
    #headerOption{
        position: relative;
        margin-top: 20px;
    }
    .btn_router, .btn_router_clicked{
        height: 90px;
    }
    
}

@media all and (max-width: 1400px){
    .btn_router, .btn_router_clicked{
        height: 50px;
    }
}
</style>