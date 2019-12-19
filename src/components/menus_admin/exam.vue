<template>
  <div id="home">
    <b-button @click="check=!check" v-show='!check' id='add' variant="success">
      Thêm lịch thi
    </b-button>
    <div v-show="check">
      <b-form-select v-model="turn" :options="options_turn" id="turn"></b-form-select>
      <b-form-select v-model="subject" :options="options_subject" id="subject"></b-form-select>
      <b-form-input  v-model="day" id="date" type="date"></b-form-input>
      <b-form-select v-model="time" :options="options_time" id="time"></b-form-select>
      <b-form-select v-model="room" :options="options_room" id="room"></b-form-select>
      <b-button id="submit" :variant="variantState" v-show='check' class='add_and_close'>Thêm lịch thi</b-button>
      <b-button variant='danger' @click="check=!check" class='add_and_close'>Đóng</b-button>
    </div>
    <div class="search">
          <b-form-input id="search_MSSV" type="search" style="width: 230px" placeholder="Tìm kiếm phòng thi..."></b-form-input>
    </div>
    <!-- table -->
    <div class="wapper_table">
      <b-table
        striped
        hover
        :items="listAll"
        class = "table"
        id="table-transition-example"
        :fields="fields"
        :head-variant="headVariant"
        :sticky-header="stickyHeader"
        :no-border-collapse="noCollapse"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        small
        :tbody-tr-class="rowClass"
        caption-top
      >
        <template v-slot:cell(index)="data">
          <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(delete)="row" class="mr-2">
          <!--button ở cột delete -->
          <b-button>Xóa lịch thi</b-button>
        </template>
      </b-table>
    </div>
    
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
      check:false,
      subject: null,
      time: null,
      day: null,
      room: null,
      turn: null,
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
          key: "credit",
          label: "Số tín chỉ",
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
          label: "Số lượng đã đăng kí",
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
      options_turn: [
        { value: null, text: "Chọn kì thi", disabled: true },
        { value: "HKI_19-20", text: "Học kì I. Năm học 2019-2020" },
      ],
      listAll: [
        {
          name_subject: "Chuyên nghiệp trong công nghệ",
          date: "24/12/2019",
          time: "07:30",
          room: "101-G2",
          number_of_computer: '1/20'
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
  methods:{
    rowClass(item, type) {
        if (!item) return
        if (item.status === 'awesome') return 'row'
      }
  },
  computed: {
      variantState(){
        return this.turn!=null && this.subject!=null && this.time!=null && this.day!=null && this.room!=null ? 'success':''
      },
      checkFunction(){
        this.check=!check;
      },
      mouseOver(){
        
      }
    },
};
</script>
<style scoped>
#turn {
  width: 338px;
}
#subject {
  width: 330px;
}
#date {
  width: 180px;
  position: relative;
  display: inline-block;
  top: 1px;
}
#time {
  width: 140px;
}
#room {
  width: 120px;
}
#add {
  position: relative;
  float: right;
  right:10px;
}
#submit{
  position: relative;
  bottom:-1px;
}
.add_and_close{
  position: relative;
  top:-1px;
}
.table{
  position: relative;
}
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
.row{
  background-color: blue;
}
.wapper_table{
  height: 450px;
  border: 1px solid gray;
  overflow: auto;
}
*{
  font-size: 14px;
}
</style>

