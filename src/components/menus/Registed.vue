<template>
  <div id="register">
    <div class="title">
      <h4>Môn học đã đăng kí thi</h4>
    </div>
    <table>
      <tr id="tr_th">
        <th style>STT</th>
        <th style>Tên môn</th>
        <th style>Ngày thi</th>
        <th style>Ca thi</th>
        <th style>Giờ thi</th>
        <th style>Phòng thi</th>
        <th style>SBD</th>
      </tr>
      <tr>
        <td>1</td>
        <td class="name_left">Chuyên nghiệp trong công nghệ</td>
        <td>16/12/2019</td>
        <td>4</td>
        <td>15:30</td>
        <td>102-G2</td>
        <td>12</td>
      </tr>
      <tr>
        <td>2</td>
        <td class="name_left">Các vấn đề hiện đại của Công nghệ thông tin</td>
        <td>17/12/2019</td>
        <td>4</td>
        <td>15:30</td>
        <td>103-G2</td>
        <td>16</td>
      </tr>
      <tr>
        <td>3</td>
        <td class="name_left">An toàn và an ninh mạng</td>
        <td>18/12/2019</td>
        <td>3</td>
        <td>13:30</td>
        <td>101-G2</td>
        <td>11</td>
      </tr>
      <tr>
        <td>4</td>
        <td class="name_left">Thiết kế giao diện người dùng</td>
        <td>25/12/2019</td>
        <td>4</td>
        <td>15:30</td>
        <td>106-G2</td>
        <td>21</td>
      </tr>
      <tr>
        <td>5</td>
        <td class="name_left">Hệ quản trị cơ sở dữ liệu</td>
        <td>26/12/2019</td>
        <td>3</td>
        <td>13:00</td>
        <td>108-G2</td>
        <td>20</td>
      </tr>
      <tr>
        <td>6</td>
        <td class="name_left">Trí tuệ nhân tạo</td>
        <td>30/12/2019</td>
        <td>1</td>
        <td>7:00</td>
        <td>106-G2</td>
        <td>14</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.title {
  position: relative;
  margin: 20px 250px 20px 0px;
  padding: 10px;
  left: -100px;
  text-align: center;
  /* background-color: #99ccff; */
}
.title:hover {
  transform: scale(1.3);
}
.icon_tick {
  width: 20px;
}
.name_left {
  text-align: left;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  margin: 10px 20px 0 20px;
  position: relative;
}
#tr_th {
  background-color: #cccccc;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
tr:nth-child(odd) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #cccccc;
  transform: scale(1.03);
}
</style>