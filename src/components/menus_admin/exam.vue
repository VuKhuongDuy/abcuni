<template>
  <div id="home">
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-select v-model="subject" :options="options_subject" id="subject"></b-form-select>
    <b-form-input  v-model="day" id="date" type="date"></b-form-input>
    <b-form-select v-model="time" :options="options_time" id="time"></b-form-select>
    <b-form-select v-model="room" :options="options_room" id="room"></b-form-select>
    <b-form-select v-model="number" :options="options_number" id="number"></b-form-select>
    <b-button id="submit" :variant="variantState">Thêm lịch thi</b-button>
    <i class='title'>
        *Danh sách các phòng thi
    </i>
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" type="search" style="width: 230px" placeholder="Tìm kiếm phòng thi..."></b-form-input>
    </div>
    <!-- table -->
    <b-table
      striped
      hover
      :items="listAll"
      id="table-transition-example"
      :fields="fields"
      :head-variant="headVariant"
      :sticky-header="stickyHeader"
      :no-border-collapse="noCollapse"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      caption-top
    >
      <template v-slot:cell(index)="data">
        <!--STT không bị thay đổi khi sort-->
        {{ data.index + 1 }}
      </template>

      <template v-slot:cell(delete)="row" class="mr-2">
        <!--button ở cột delete -->
        <b-button @mouseover="mouseOver" :variant="variant_delete">Xóa ca thi</b-button>
      </template>
    </b-table>
    <!-- head-variant: màu <th>-->
    <div class="sort">
      Sắp xếp theo:
      <b>{{ sortBy }}</b>, Thứ tự:
      <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subject: null,
      time: null,
      day: null,
      room: null,
      number: null,
      headVariant: "light",
      stickyHeader: true,
      noCollapse: false,
      sortBy: "name_subject",
      sortDesc: false,
      file: "null",
      variant_delete:'',
      fields: [
        {
          key: "index",
          label: "STT"
        },
        {
          key: "name_subject",
          label: "Tên môn học",
          sortable: true
        },
        {
          key: "date",
          label: "Ngày thi",
          sortable: true
        },
        {
          key: "time",
          label: "Thời gian",
          sortable: true
        },
        {
          key: "room",
          label: "Phòng thi",
          sortable: true
        },
        {
          key: "number_of_computer",
          label: "Số lượng sinh viên tối đa",
          sortable: true
        },
        {
          key: "delete",
          label: "Xóa"
        }
      ],
      listStudent: [
        {
          code_subject: "ELT2028",
          name_subject: "Chuyên nghiệp trong công nghệ"
        },
        {
          code_subject: "INT3507",
          name_subject: "Các vấn đề hiện đại của Công nghệ thông tin"
        },
        { code_subject: "INT3307", name_subject: "An toàn và an ninh mạng" },
        { code_subject: "INT3306", name_subject: "Phát triển ứng dụng Web" },
        {
          code_subject: "INT3115",
          name_subject: "Thiết kế giao diện người dùng"
        },
        { code_subject: "INT3202", name_subject: "Hệ quản trị cơ sở dữ liệu" },
        { code_subject: "INT3401", name_subject: "Trí tuệ nhân tạo" }
      ],
      options_subject: [
        { value: null, text: "Chọn môn học", disabled: true },
        { value: "ELT2028", text: "Chuyên nghiệp trong công nghệ" },
        {
          value: "INT3507",
          text: "Các vấn đề hiện đại của Công nghệ thông tin"
        },
        { value: "INT3307", text: "An toàn và an ninh mạng" },
        { value: "INT3306", text: "Phát triển ứng dụng Web" },
        { value: "INT3115", text: "Thiết kế giao diện người dùng" },
        { value: "INT3202", text: "Hệ quản trị cơ sở dữ liệu" },
        { value: "INT3401", text: "Trí tuệ nhân tạo" }
      ],
      options_time: [
        { value: null, text: "Ca thi", disabled: true },
        { value: "1", text: "Ca 1 - 07:30" },
        { value: "2", text: "Ca 2 - 09:00" },
        { value: "3", text: "Ca 3 - 13:00" },
        { value: "4", text: "Ca 4 - 15:00" }
      ],
      options_room: [
        { value: null, text: "Phòng thi", disabled: true },
        { value: "101-G2", text: "101-G2" },
        { value: "102-G2", text: "102-G2" },
        { value: "103-G2", text: "103-G2" },
        { value: "104-G2", text: "104-G2" },
        { value: "105-G2", text: "105-G2" },
        { value: "106-G2", text: "106-G2" },
        { value: "107-G2", text: "107-G2" },
        { value: "108-G2", text: "108-G2" },
        { value: "109-G2", text: "109-G2" }
      ],
      options_number: [
        { value: null, text: "Số lượng sinh viên", disabled: true },
        { value: "10", text: "10" },
        { value: "12", text: "12" },
        { value: "14", text: "14" },
        { value: "16", text: "16" },
        { value: "18", text: "18" },
        { value: "20", text: "20" }
      ],
      listAll: [
        {
          name_subject: "Chuyên nghiệp trong công nghệ",
          date: "24/12/2019",
          time: "07:30",
          room: "101-G2",
          number_of_computer: 20
        },
        {
          name_subject: "Các vấn đề hiện đại của Công nghệ thông tin",
          date: "24/12/2019",
          time: "09:00",
          room: "103-G2",
          number_of_computer: 14
        },
        {
          name_subject: "An toàn và an ninh mạng",
          date: "24/12/2019",
          time: "13:00",
          room: "107-G2",
          number_of_computer: 12
        },
        {
          name_subject: "Phát triển ứng dụng Web",
          date: "24/12/2019",
          time: "15:30",
          room: "108-G2",
          number_of_computer: 16
        }
      ]
    };
  },
  computed: {
      variantState(){
        return this.number!=null && this.subject!=null && this.time!=null && this.day!=null && this.room!=null ? 'success':''
      },
      mouseOver(){
        
      }
    },
};
</script>
<style scoped>
#subject {
  width: 400px;
}

#date {
  width: 180px;
  position: relative;
}
#time {
  width: 140px;
}
#room {
  width: 120px;
}
#number {
  width: 180px;
}
#add {
  position: relative;
  top: -1px;
}
#submit{
  position: relative;
  /* left:300px; */
  bottom:-1px;
}
/* #delete:hover{
  background-color: brown;
} */
.search{
  margin-bottom: 4px;
}
.title{
  position: relative;
  float: right;
  right: 30px;
}
.sort{
    font-style: italic;
}
</style>

