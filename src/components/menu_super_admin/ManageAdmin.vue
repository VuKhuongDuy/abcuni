<template>
  <div id="manageadmin">
    <!-- table -->
    <b-table striped hover :items="listAdmin"
    id="table-admin"
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
        <b-button variant="success" class="add_new">Thêm mới admin</b-button>
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
          key:'full_name',
          label: "Tên",
          sortable: true
        },
        {
          key:"username",
          label:"Tài khoản",
          sortable: true
        },
        
        {
          key:"password",
          label:'Mật khẩu',
          sortable: true
        },
        {
          key:'crud',
          label:'Edit'
        }
      ],
      listAdmin: [
          {full_name:"Admin 1",username:'admin1',password: 'ad1', },
          {full_name:"Admin 2",username:'admin2',password: 'ad2',},
          {full_name:"Admin 3",username:'admin3', password: 'ad3',},
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
.add_new{
    position: relative;
    left: 450px;
}
.sort{
    font-style: italic;
}
</style>