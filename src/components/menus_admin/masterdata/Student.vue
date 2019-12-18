<template>
  <div id="student">
    <!-- import file -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list student..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
    ></b-form-file>
    <div class="mt-3">
      Selected file: {{ file ? file.name : '' }}
      <b-button id="submit" :variant="variantState">Submit</b-button>
      <i class='title'>
        *Danh sách sinh viên
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
          key:"first_name",
          label:'Họ',
          sortable: true
        },
        {
          key:'last_name',
          label:'Tên',
          sortable: true
        },
        {
          key:'birth_day',
          sortable: true,
          label:"Ngày sinh",
        },
        {
          key:'crud',
          label:'Edit'
        }
      ],
      listStudent: [
          {MSSV: 17021119, first_name: 'Nguyễn Xuân', last_name:"Tự",birth_day: '01/01/1999'},
          {MSSV: 17021120, first_name: 'Nguyễn Ngọc', last_name:"Nhi",birth_day: '02/05/1999'},
          {MSSV: 17021121, first_name: 'Nguyễn Xuân', last_name:"Long",birth_day: '01/01/1999'},
          {MSSV: 17021121, first_name: 'Phan Bá', last_name:"Phước",birth_day: '07/01/1999'},
          {MSSV: 17021122, first_name: 'Phạm Văn', last_name:"Mạnh",birth_day: '21/01/1999'},
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
