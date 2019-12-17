<template>
    <div id="dashboard">
        <div id="header">
            <app-header
              :data="dataStudent"
            ></app-header>
        </div>
        <div id = 'body'>
            <div id = "left">
                <button class="btn" type="button" @click="activeBtn = 'btn1'" :class="{active: activeBtn === 'btn1' }"><router-link to='/home'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Trang Chủ<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn2'" :class="{active: activeBtn === 'btn2' }"><router-link to='/subject'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Môn học<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn3'" :class="{active: activeBtn === 'btn3' }"><router-link to='/registertest'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Đăng kí dự thi<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn4'" :class="{active: activeBtn === 'btn4' }"><router-link to='/registed'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Môn đã đăng kí thi<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                <button class="btn" type="button" @click="activeBtn = 'btn5'" :class="{active: activeBtn === 'btn5' }"><router-link to='/print'  class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> In danh sách<img src="@/../public/icons/right.png" class="icon_right"></router-link></button>
                
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
            activeBtn:'btn1',
            dataStudent:{
                home:'/home',
                level:'sinh viên',
                name:'Nguyễn Xuân Tự',
                mssv: '17021119',
            },
        }
    },
    components:{
        appHeader:Header,
        appFooter:Footer
    },
    methods:{
    }
}
</script>
<style scoped>
#dashboard{
    width: 100%;
    min-height: 552px;
    overflow: hidden;
}
/* body  */
#body{
    display: flex;
    height: 552px;
}
/* menu */
#left{
    width: 200px;
    display:block;
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
    width: 200px;
    text-align: left;
    border: none;
    display: block;
    border: 1px solid  #d9d9d9;
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
.active,  .active:hover{
    background: #33ff33;
    width: 100%;
    text-align: left;
    /* border: none; */
}
/* content */
#right{
    width: 85%;
    max-height: 552px;
    display: inline-block;
}
</style>