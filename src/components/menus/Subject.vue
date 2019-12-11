<template>
    <div id="subject">
        <div class="title">
            <h4>
                Môn học đã đăng kí
            </h4> 
        </div>
        <table>
		<tr id="tr_th">
			<th style="width:5%">STT</th>
			<th style="width:10%">Mã môn học</th>
			<th style="width:30%">Tên môn học</th>
			<th style="width:10%">Đủ điều kiện dự thi</th>
			<th style="width:65%">Lý do không đủ điều kiện</th>
		</tr>
		<tr>
			<td>1</td>
			<td>ELT2028 02</td>
			<td class="name_left">Chuyên nghiệp trong công nghệ</td>
			<td><img src="@/../public/icons/tick_green.png" class="icon_tick" title="Bạn đủ điều kiện để đăng kí thi môn học này"></td>
			<td></td>
		</tr>
		<tr>
			<td>2</td>
			<td>INT3507 03</td>
			<td class="name_left">Các vấn đề hiện đại của Công nghệ thông tin</td>
			<td><img src="@/../public/icons/tick_green.png" class="icon_tick" title="Bạn đủ điều kiện để đăng kí thi môn học này"></td>
			<td></td>
		</tr>
		<tr>
			<td>3</td>
			<td>INT3307 01</td>
			<td class="name_left">An toàn và an ninh mạng</td>
			<td><img src="@/../public/icons/tick_green.png" class="icon_tick" title="Bạn đủ điều kiện để đăng kí thi môn học này"></td>
			<td></td>
		</tr>
		<tr>
			<td>4</td>
			<td>INT3306 10</td>
			<td class="name_left">Phát triển ứng dụng Web</td>
			<td><img src="@/../public/icons/tick_red.png" class="icon_tick" title="Bạn không đủ điều kiện để đăng kí thi môn học này"></td>
			<td>Nếu các bạn nhìn thấy những dòng chữ này, thì đã đang đến nhóm mình trình bày, còn tích đỏ thì mình tích vào cho vui và demo tính năng cho các bạn xem thôi!!</td>
		</tr>
		<tr>
			<td>5</td>
			<td>INT3115 03</td>
			<td class="name_left">Thiết kế giao diện người dùng</td>
			<td><img src="@/../public/icons/tick_green.png" class="icon_tick" title="Bạn đủ điều kiện để đăng kí thi môn học này"></td>
			<td></td>
		</tr>
		<tr>
			<td>6</td>
			<td>INT3202 08</td>
			<td class="name_left">Hệ quản trị cơ sở dữ liệu</td>
			<td><img src="@/../public/icons/tick_green.png" class="icon_tick" title="Bạn đủ điều kiện để đăng kí thi môn học này"></td>
			<td></td>
		</tr>
		<tr>
			<td>7</td>
			<td>INT3401 03</td>
			<td class="name_left">Trí tuệ nhân tạo</td>
			<td><img src="@/../public/icons/tick_green.png" class="icon_tick" title="Bạn đủ điều kiện để đăng kí thi môn học này"></td>
			<td></td>
		</tr>
	</table>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .title{
        position: relative;
        margin: 20px 250px 20px 250px;
        padding: 10px;
        text-align: center;
        /* background-color: #99ccff; */

    }
    .title:hover{
        transform: scale(1.3);
    }
    .icon_tick{
        width: 20px;
    }
    .name_left{
        text-align: left;
    }
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%-10px;
        margin: 10px 20px 0 20px;
    }
    #tr_th{
        background-color: #cccccc
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }
    tr:nth-child(odd) {
        background-color: #f2f2f2;
    }
    tr:hover{
        background-color: #cccccc;
        transform: scale(1.03);
    }
</style>