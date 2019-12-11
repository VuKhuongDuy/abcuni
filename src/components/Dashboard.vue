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
                            Xin chào: <strong>Nguyễn Xuân Tự</strong> <br>MSSV: <strong>17021119</strong>
                        </p>
                    </div>
                </div>
                
                <div id="headerMenu">
                    <ul>
                        <li>
                            <a href="#/home"><img src="@/../public/icons/notification.png" width="18" height="20" id='notification'> Thông báo</a>
                        </li>
                        <li>
                            <a href="#/home"><img src="@/../public/icons/change_password.png" width="18" height="18" id='change_password'>  Đổi mật khẩu</a>
                        </li>
                        <li id='li_1'>
                            <a href="#/home"><img src="@/../public/icons/sign_out.png" width="20" height="20" id='sign_out'> Đăng xuất</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id = 'body'>
            <div id = "left">
                <router-link to='/home'  tag='button' class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Trang Chủ<img src="@/../public/icons/right.png" class="icon_right"></router-link>
                <router-link to='/subject'  tag='button' class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Môn học<img src="@/../public/icons/right.png" class="icon_right"></router-link>
                <router-link to='/registertest'  tag='button' class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Đăng kí dự thi<img src="@/../public/icons/right.png" class="icon_right"></router-link>
                <router-link to='/registed'  tag='button' class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> Môn đã đăng kí thi<img src="@/../public/icons/right.png" class="icon_right"></router-link>
                <router-link to='/print'  tag='button' class="btn_router" ><img src="@/../public/icons/stack.png" class="icon_stack"> In danh sách<img src="@/../public/icons/right.png" class="icon_right"></router-link>
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
export default {
    
}
</script>
<style scoped>

#dashboard{
    width: 100%;
    min-height: 1000px;
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
}
#left{
    width: 15%;
<<<<<<< HEAD
    height: 700px;
    border: 1px solid #c1c1c1;
=======
    height: 95%;
>>>>>>> 817605c00194ae6d7a8d1b2a247ce86d93944531
    display:block;

}

#right{
    width: 85%;
    height: 95%;
}

.btn_router{
    width: 100%;
    height: 30px;
    text-align: left;
    /* background-color: #fff; */
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
<<<<<<< HEAD
    height: 552px;
} */
=======
    height: 95%;
}
>>>>>>> 817605c00194ae6d7a8d1b2a247ce86d93944531

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
    min-height: 100%;
    float:left;
}

/* footer */
#footer{
  width: 100%;
  height: 50px;
  clear: both;
  color: #066c00;
  font-family: "Courier New";
  font-weight: bold;
  border-top: 1px double gray;
}
#footerLeft{
    float: left;
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