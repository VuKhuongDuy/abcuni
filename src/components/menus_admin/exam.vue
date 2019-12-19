<template>
  <div id="home">
    <b-form-select v-model="selected_1" :options="options_subject" id="subject"></b-form-select>
    <b-form-select v-model="selected_2" :options="options_day" id="day" class="date"></b-form-select>/
    <b-form-select v-model="selected_3" :options="options_month" id="month" class="date"></b-form-select>/
    <b-form-select v-model="selected_4" :options="options_year" id="year" class="date"></b-form-select>
    <b-form-select v-model="selected_5" :options="options_time" id="time"></b-form-select>
    <b-form-select v-model="selected_6" :options="options_room" id="room"></b-form-select>
    <b-form-select v-model="selected_7" :options="options_number" id="number"></b-form-select>
    <b-button variant="success" id="add">Thêm ca thi</b-button>
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

      <template v-slot:cell(crud)="row" class="mr-2">
        <!--button ở cột crud -->
        <b-button>Edit</b-button>
        <b-button>Delete</b-button>
        <b-button>Details</b-button>
      </template>
    </b-table>
    <!-- head-variant: màu <th>-->
    <div class="sort">
      Sắp xếp theo:
      <b>{{ sortBy }}</b>, Thứ tự:
      <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
      <div>
        <b-button variant="success" class="add_new">Thêm mới</b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected_1: null,
      selected_2: null,
      selected_3: null,
      selected_4: null,
      selected_5: null,
      selected_6: null,
      selected_7: null,
      headVariant: "light",
      stickyHeader: true,
      noCollapse: false,
      sortBy: "name_subject",
      sortDesc: false,
      file: "null",
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
          key: "crud",
          label: "Edit"
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
      options_day: [
        { value: null, text: "Ngày", disabled: true },
        { value: "1", text: "01" },
        { value: "2", text: "02" },
        { value: "3", text: "03" },
        { value: "4", text: "04" },
        { value: "5", text: "05" },
        { value: "6", text: "06" },
        { value: "7", text: "07" },
        { value: "8", text: "08" },
        { value: "9", text: "09" },
        { value: "10", text: "10" },
        { value: "11", text: "11" },
        { value: "12", text: "12" },
        { value: "13", text: "13" },
        { value: "14", text: "14" },
        { value: "15", text: "15" },
        { value: "16", text: "16" },
        { value: "17", text: "17" },
        { value: "18", text: "18" },
        { value: "19", text: "19" },
        { value: "20", text: "20" },
        { value: "21", text: "21" },
        { value: "22", text: "22" },
        { value: "23", text: "23" },
        { value: "24", text: "24" },
        { value: "25", text: "25" },
        { value: "26", text: "26" },
        { value: "27", text: "27" },
        { value: "28", text: "28" },
        { value: "29", text: "29" },
        { value: "30", text: "30" },
        { value: "31", text: "31" }
      ],
      options_month: [
        { value: null, text: "Tháng", disabled: true },
        { value: "1", text: "01" },
        { value: "2", text: "02" },
        { value: "3", text: "03" },
        { value: "4", text: "04" },
        { value: "5", text: "05" },
        { value: "6", text: "06" },
        { value: "7", text: "07" },
        { value: "8", text: "08" },
        { value: "9", text: "09" },
        { value: "10", text: "10" },
        { value: "11", text: "11" },
        { value: "12", text: "12" }
      ],
      options_year: [
        { value: null, text: "Năm", disabled: true },
        { value: "2019", text: "2019" },
        { value: "2020", text: "2020" },
        { value: "2021", text: "2021" },
        { value: "2022", text: "2022" },
        { value: "2023", text: "2023" },
        { value: "2024", text: "2024" }
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
  }
};
</script>
<style scoped>
#subject {
  width: 400px;
}
.date {
  width: 90px;
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
.add_new {
  position: relative;
  right: -1170px;
  top:-20px;
}
</style>
