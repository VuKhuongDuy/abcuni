
<template>
<div>
  <hr class="hr_footer">
  <div id="footer">
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
    border-top: 1px solid #80dfff;
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
  /* background-color: #aaf2ab; */
  background-image :linear-gradient(to right, #ffffff, #b3ffb3 );
}
#footerRight{
    position: absolute;
    right: 0px;
    text-align: right;
}
</style>
