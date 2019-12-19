<template>
  <div id="student">
    <!-- import file -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list student..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
    ></b-form-file>
    <b-button id="submit" :variant="variantState">Thêm danh sách sinh viên</b-button>
    <i class='title'>
        *Danh sách sinh viên
    </i>
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" type="search" style="width: 230px" placeholder="Tìm kiếm MSSV..."></b-form-input>
    </div>
    <!-- table -->
    <b-table striped hover :items="listStudent"
    id="table"
    :fields="fields"
    :head-variant="headVariant"
    :sticky-header="stickyHeader"
    :no-border-collapse="noCollapse" 
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    caption-top
    >
      <template v-slot:cell(index)="data"> <!--STT không bị thay đổi khi sort-->
        {{ data.index + 1 }}
      </template>

        <template v-slot:cell(delete)="row" class="mr-2"> <!--button ở cột xóa -->
          <b-button>
            Xóa sinh viên
          </b-button>
        </template>

        
      </b-table><!-- head-variant: màu <th>-->
      <div class="sort">
        Sắp xếp theo: <b>{{ sortBy }}</b>, Thứ tự:
        <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      headVariant:'light',
      stickyHeader: true,
      noCollapse: false,
      sortBy: 'MSSV',
      sortDesc: false,
      file:'',
      fields:[
        {
          key:'index',
          label:"STT",
        },
        {
          key:"MSSV",
          sortable: true
        },
        {
          key:"full_name",
          label:'Họ và tên',
          sortable: true
        },
        {
          key:'birth_day',
          sortable: true,
          label:"Ngày sinh",
        },
        {
          key:'sex',
          label:'Giới tính',
          sortable:true,
        },
        {
          key:'delete',
          label:'Xóa'
        }
      ],
      listStudent: [
          {MSSV: 17021119, full_name: 'Nguyễn Xuân Tự', birth_day: '01/01/1999', sex:'Nam'},
          {MSSV: 17021120, full_name: 'Nguyễn Ngọc Nhi', birth_day: '02/05/1999', sex:'Nữ'},
          {MSSV: 17021121, full_name: 'Nguyễn Xuân Long', birth_day: '01/01/1999', sex:'Nam'},
          {MSSV: 17021121, full_name: 'Phan Bá Phước', birth_day: '07/01/1999', sex:'Nam'},
          {MSSV: 17021122, full_name: 'Phạm Văn Mạnh', birth_day: '21/01/1999', sex:'Nam'},
      ],
    }
  },

  methods: {
    loadExam: async function() {
      try {
        this.dismissCountDown = 0;
        let url = "/student";
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach(exam => {
          let obj = { value: exam.exam_id, text: exam.exam_name };
          this.listExam.push(obj);
        });
        if (this.selectedExam === "")
          this.selectedExam = this.listExam[this.listExam.length - 1].value;
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    }
  },

  mounted: function() {
    this.loadExam();
  },
  computed: {
    variantState() {
      return this.file != "" ? "success" : "";
    }
  }

};
</script>

<style scoped>
.title{
  position: relative;
  float: right;
  right: 30px;
}
.form{
  position: relative;
  float: right;
}
.list{
  position: relative;
  top: 46px;
}
.search{
  margin-bottom: 4px;
}
#submit{
  position: relative;
  /* left:300px; */
  bottom:-1px;
}
.sort{
    font-style: italic;
}

.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 300px;
  /* left: 25%; */
  z-index: 100;
}
</style>
