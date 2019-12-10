<template>
    <div id="home">
        <div id="header">
            <div id="logo">
                <img src="../../public/images/logo.png" width="100" height="100" alt="Logo" title="Logo">
            </div>
            <div id="headerTitle">
                    <h3>Cổng thông tin đăng kí thi</h3>
                    <h4>Dành cho <span>Admin</span></h4>
                </div>
            <div id="header-right">
                <div id="headerWelcome">
                    <div>
                        <p>
                            Xin chào: <strong>Admin</strong>
                        </p>
                    </div>
                </div>
                
                <div id="headerMenu">
                    <ul>
                        <li>
                            <a href="#/home"><img src="../../public/icons/notification.png" width="18" height="20" id='notification'> Thông báo</a>
                        </li>
                        <li>
                            <a href="#/home"><img src="../../public/icons/change_password.png" width="18" height="18" id='change_password'>  Đổi mật khẩu</a>
                        </li>
                        <li id='li_1'>
                            <a href="#/home"><img src="../../public/icons/sign_out.png" width="20" height="20" id='sign_out'> Đăng xuất</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr>
        <div id="body">
            <div id="menu">
                <div id="components-menu">
                    <tbody>
                        <button @click="check0 = !check0">Quản lý môn</button>
                        <template v-if="check0">
                            <ul>
                                <li><a href="">Thêm lịch thi</a></li>
                                <li><a href="">Sửa lịch thi</a></li>
                            </ul>   
                        </template>
                        <button @click="check1 = !check1">Quản lý sinh viên</button>
                        <template v-if="check1">
                            <ul>
                                <li><a href="">Import danh sách sinh viên</a></li>
                                <li><a href="">Import danh sách sinh viên đủ điều kiện thi</a></li>
                                <li><a href="">Sửa danh sách sinh viên</a></li>
                                <li><a href="">Sửa danh sách sinh viên đủ diều kiện thi</a></li>
                            </ul>   
                        </template>
                    </tbody>

                </div>
            </div>
            <div id="content">
                <h1>
                    content
                </h1>

                
            </div>
        </div>
        <hr>
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
                144 Xuân Thủy, Cầu Giấy, Hà Nội <br>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            check0:false,
            check1:false,
        }   
    },
}
</script>
<style scoped>
/* *{
    border: 1px solid #CDCDCD;
    box-sizing: border-box;
} */

#home{
    margin: 0;
    
}
/* header */
#header{
    color: #066c00;
    height: 100px;
    margin-bottom:5px;
    display: block;
}
#logo{
    position: absolute;
}
#header-right{
    position: absolute;
    right: 10px;
}
#headerTitle{
    position: absolute;
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
    width: 100%;
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