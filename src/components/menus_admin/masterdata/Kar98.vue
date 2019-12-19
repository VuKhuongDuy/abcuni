<template>
  <div id="student">
    <!-- import file -->
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list caseExam..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
    ></b-form-file>
    <b-button id="submit" :variant="variantState">Thêm ca thi</b-button>
      <i class='title'>
        *Ca thi
      </i>
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" type="search" style="width: 230px" placeholder="Tìm kiếm tên môn thi..."></b-form-input>
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
          Xóa ca thi
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
      sortBy: 'number',
      sortDesc: false,
      file:'',
      fields:[
        {
          key:'index',
          label:"STT",
        },
        {
          key:"number",
          label:"Ca thi",
          sortable: true
        },
        {
          key:"time",
          label:"Thời gian bắt đầu",
          sortable: true
        },
        {
          key:'crud',
          label:'Xóa'
        }
      ],
      listStudent: [
          {number: 1, time: "07:30"},
          {number: 2, time: "09:00"},
          {number: 3, time: "13:00"},
          {number: 4, time: "15:30"},
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
</style>
