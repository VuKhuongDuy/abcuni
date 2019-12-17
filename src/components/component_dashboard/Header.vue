
<template>
<div>
  <div id="header">
    <div id="logo">
        <router-link :to="{path:data.home}"><img src="@/../public/images/logo.png" width="100" height="100" alt="Trang chủ" title="Logo" ></router-link>
    </div>
    <div id="headerTitle">
            <h3>Cổng thông tin đăng kí thi</h3>
            <h4>Dành cho <span>{{data.level}}</span></h4>
        </div>
    <div id="header-right">
        <div id="headerWelcome">
            <div>
                    Xin chào: <strong>{{data.name}}</strong>
                    <br>
                    <p v-show="data.name != 'Admin'">
                        MSSV: <strong>{{data.mssv}}</strong>
                    </p>
            </div>
        </div>
        
        <div id="headerMenu">
            <app-button-blue></app-button-blue>
            <app-button-green> </app-button-green>
            <app-button-red></app-button-red>
        </div>
    </div>
    
  </div>
  <hr class="hr_head">
</div>
</template>

<script>
import ButtonBlue from './elements/ButtonBlue.vue'
import ButtonGreen from './elements/ButtonGreen.vue'
import ButtonRed from './elements/ButtonRed.vue'
export default {
  props: ['data'],
  data(){
    return{
      text:'homeadmin',
    }
  },
  components:{
      'app-button-blue':ButtonBlue,
      'app-button-green':ButtonGreen,
      'app-button-red':ButtonRed,
  }
}
</script>

<style scoped>
#header{
    color: #066c00;
    height: 100px;
    margin-bottom:-14px;
    display: block;
}
#logo{
    position: absolute;
}
#notification, #change_password, #sign_out{
    position: relative;
    top:-1px;
}
#header-right{
    position: absolute;
    right: 10px;
}
#headerTitle{
    position: absolute;
    top:14px;
    left: 120px;
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
.hr_head{
    border-top: 1px solid #2196f3;
    margin-bottom: 5px;
}
</style>
