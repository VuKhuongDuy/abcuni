<template>
  <div id="manageadmin">
    <!-- table -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <div class="wrapper_table">
      <b-table striped hover :items="listAdmin"
      id="table-admin"
      :fields="fields"
      :head-variant="headVariant"
      :no-border-collapse="noCollapse" 
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      caption-top
      small
      >
        <template v-slot:cell(index)="data"> <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

          <template v-slot:cell(crud)="row" class="mr-2"> <!--button ở cột crud -->
          <b-button variant="danger">
            Xóa
          </b-button>
          </template>
          
        </b-table>
    </div>
    <!-- head-variant: màu <th>-->
      <div class="sort">
        Sắp xếp theo: <b>{{ sortBy }}</b>, Thứ tự:
        <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
        <b-button variant="success" class="add_new">Thêm mới admin</b-button>
      </div>
  </div>
</template>

<script>
import * as axios from "@/../config/axios.js";
export default {
  data(){
    return{
      headVariant:'light',
      noCollapse: false,
      sortBy: 'MSSV',
      sortDesc: false,
      file:'null',

      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",

      fields:[
        {
          key:'index',
          label:"STT",
        },
        {
          key:"email",
          label:"Email",
          sortable: true
        },
        {
          key:'crud',
          label:'Edit'
        }
      ],
      listAdmin: [],
    }
  },
  methods: {
    loadAdmin: async function(){
      this.listAdmin = [];
      this.dismissCountDown = 0;
      let url = '/admin/list';
      let data = await axios.getAxios(url);
      if(!data.success){
        this.changeTypeAlert(data.message, 'warning');
        return;
      }
      data.data.forEach((admin, index) => {
        let obj = {
          index: index,
          email: admin.email
        }
        this.listAdmin.push(obj);
      });
    },



    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    }
  },
  mounted: function(){
    this.loadAdmin();
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
    top: 5px;
}
.sort{
    font-style: italic;
}
* {
  font-size: 14px;
}
.wrapper_table {
  height: 500px;
  border: 1px solid #cccccc;
  overflow: auto;
}
</style>