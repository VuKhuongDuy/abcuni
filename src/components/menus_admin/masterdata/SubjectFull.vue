<template>
  <div id="student">
    <!-- import file -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list student..."
      drop-placeholder="Drop file here..."
      multiple
    ></b-form-file>
    <div class="mt-3">
      Selected file: {{ file ? file.name : '' }}
      <b-button id="submit" variant="">Submit</b-button>
      <i class='title'>
        Danh sách SV và các môn SV đã học
      </i>
    </div>

    <!-- table -->
    <b-table striped hover :items="listStudent"
    id="table-transition-example"
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

        <template v-slot:cell(crud)="row" class="mr-2"> <!--button ở cột crud -->
        <b-button>
          Edit
        </b-button>
        <b-button>
          Delete
        </b-button>
        </template>

        
      </b-table><!-- head-variant: màu <th>-->
      <div class="sort">
        Sắp xếp theo: <b>{{ sortBy }}</b>, Thứ tự:
        <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
        <b-button variant="success" class="add_new">Thêm mới</b-button>
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
      file:'null',
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
          key:'crud',
          label:'Edit'
        }
      ],
      listStudent: [
          {MSSV: 17021119, full_name:"Nguyễn Xuân Tự",code_subject: 'INT3306', name_subject: 'Phát triển ứng dụng web'},
          {MSSV: 17021119, full_name:"Nguyễn Xuân Tự",code_subject: 'INT3115',name_subject: 'Thiết kế giao diện người dùng'},
          {MSSV: 17021119, full_name:"Nguyễn Xuân Tự", code_subject: 'INT3202',name_subject: 'Hệ quản trị cơ sở dữ liệu'},
      ],
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
#submit{
  position: relative;
  left:300px;
  bottom:4px;
}
.add_new{
    position: relative;
    left: 850px;
}
.sort{
    font-style: italic;
}
</style>
