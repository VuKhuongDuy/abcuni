<template>
  <div id="student">
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <!-- import file -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
    ></b-form-file>
    <b-button id="submit" :variant="variantState">Thêm môn học sinh viên đã học</b-button>
    <i class='title'>
        *Danh sách các môn sinh viên đã học
    </i>
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" type="search" style="width: 230px" placeholder="Tìm kiếm MSSV..."></b-form-input>
    </div>

    <!-- table -->
    <div class="wapper_table">
      <b-table striped hover :items="listStudent"
      id="table-transition-example"
      :fields="fields"
      :head-variant="headVariant"
      :sticky-header="stickyHeader"
      :no-border-collapse="noCollapse" 
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      caption-top
      small
      >
        <template v-slot:cell(index)="data"> <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

          <template v-slot:cell(delete)="row" class="mr-2"> <!--button ở cột delete -->
          <b-button>
            Xóa môn
          </b-button>
          </template>

          
        </b-table>
    </div>
    <!-- head-variant: màu <th>-->
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
          key:'full_name',
          label:"Họ tên",
          sortable: true
        },
        {
          key:"code_subject",
          label:'Mã môn học',
          sortable: true
        },
        {
          key:'name_subject',
          sortable: true,
          label:"Tên môn",
        },
        {
          key:'enough',
          sortable: true,
          label:"Đủ điều kiện thi",
        },
        {
          key:'delete',
          label:'Xóa'
        }
      ],
      listStudent: [
          {MSSV: 17021119, full_name:"Nguyễn Xuân Tự",code_subject: 'INT3306', name_subject: 'Phát triển ứng dụng web', enough:'Có'},
          {MSSV: 17021119, full_name:"Nguyễn Xuân Tự",code_subject: 'INT3115',name_subject: 'Thiết kế giao diện người dùng',  enough:'Có'},
          {MSSV: 17021119, full_name:"Nguyễn Xuân Tự", code_subject: 'INT3202',name_subject: 'Hệ quản trị cơ sở dữ liệu',  enough:'Có'},
      ],
    }
  },
  computed: {
      variantState(){
        return this.file!='' ? 'success':''
      }
    },
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
*{
  font-size: 14px;
}
.wapper_table{
  height: 400px;
  border: 1px solid gray;
  overflow: auto;
}
</style>
