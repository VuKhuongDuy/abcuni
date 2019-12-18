
<template>
<div>
  <hr class="hr_footer">
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
}
</script>

<style scoped>
.hr_footer{
    border-top: 1px solid #2196f3;
    margin-bottom: 0px;
}
#footer{
  width: 100%;
  height: 71px;
  clear: both;
  color: #066c00;
  font-family: "Courier New";
  font-weight: bold;
  margin:0;
  background-color: #aaf2ab;
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
