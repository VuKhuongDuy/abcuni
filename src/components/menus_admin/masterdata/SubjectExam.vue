<template>
  <div id="student">
    <!-- import file -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list subject exam..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
    ></b-form-file>
    <div class="mt-3">
      Selected file: {{ file ? file.name : '' }}
      <b-button id="submit" :variant="variantState">Submit</b-button>
      <i class='title'>
        *Môn thi
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
        <div>
          <b-button variant="success" class="add_new">Thêm mới</b-button>
        </div>
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
      sortBy: 'code_subject',
      sortDesc: false,
      file:'',
      fields:[
        {
          key:'index',
          label:"STT",
        },
        {
          key:"code_subject",
          label:"Mã môn học",
          sortable: true
        },
        {
          key:"name_subject",
          label:'Tên môn học',
          sortable: true
        },
        {
          key:'crud',
          label:'Edit'
        }
      ],
      listStudent: [
          {code_subject: 'ELT2028', name_subject: 'Chuyên nghiệp trong công nghệ'},
          {code_subject: 'INT3507', name_subject: 'Các vấn đề hiện đại của Công nghệ thông tin'},
          {code_subject: 'INT3307', name_subject:'An toàn và an ninh mạng'},
          {code_subject: 'INT3306', name_subject: 'Phát triển ứng dụng Web'},
          {code_subject: 'INT3115', name_subject: 'Thiết kế giao diện người dùng'},
          {code_subject: 'INT3202', name_subject: 'Hệ quản trị cơ sở dữ liệu'},
          {code_subject: 'INT3401', name_subject: 'Trí tuệ nhân tạo'},
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
#submit{
  position: relative;
  left:300px;
  bottom:4px;
}
.add_new {
  position: relative;
  right: -1170px;
  top:-20px;
}
.sort{
    font-style: italic;
}
</style>
