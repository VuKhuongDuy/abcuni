<template>
  <div id="manageadmin">
    <!-- table -->
    <div class='div_add'>
      <b-button variant="success" class="add_new" v-show="check" @click="check=!check">Thêm admin</b-button>
      <div v-show="!check" class='add_new_admin'>
        <div>
          <label for="email">Email:</label>
          <b-button class="" id="button_exit" @click='check=!check'>x</b-button>
          <b-form-input v-model="email" type='email' :state="emailState" placeholder="Nhập email" class="add_new_admin"></b-form-input>
          <b-form-invalid-feedback id="name">Bạn chưa nhập email</b-form-invalid-feedback>
        </div>
        <div>
          <label for="password">Mật khẩu:</label>
          <b-form-input v-model="password" type='password' :state="passwordState" placeholder="Nhập mật khẩu" class="add_new_admin"></b-form-input>
          <b-form-invalid-feedback id="name">Bạn chưa nhập mật khẩu</b-form-invalid-feedback>
        </div>
        <div>
          <label for="repassword">Nhập lại mật khẩu:</label>
          <b-form-input v-model="repassword" type='password' :state="rePasswordState" placeholder="Nhập lại mật khẩu" class="add_new_admin"></b-form-input>
          <b-form-invalid-feedback id="name">Bạn cần nhập lại mật khẩu đúng</b-form-invalid-feedback>
        </div>
        <b-button :variant="variantState" id="button_add">Thêm admin</b-button>
    </div>
    </div>
    
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
  </div>
</template>

<script>
import * as axios from "@/../config/axios.js";
export default {
  data(){
    return{
      email:'admin@gmail.com',
      password: 'a',
      repassword:'a',
      check:true,
      headVariant:'light',
      noCollapse: false,
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
    },
  },
  mounted: function(){
    this.loadAdmin();
  },
  computed:{
    emailState() {
      return this.email.length > 0 ? true : false
    },
    passwordState() {
      return this.password.length > 0 ? true : false
    },
    rePasswordState() {
      return (this.repassword == this.password && this.password.length > 0) || this.password.length==0 ? true : false
    },
    variantState(){
        return this.email.length > 0  && this.password.length > 0 && 
        ((this.repassword == this.password && this.password.length > 0) || this.password.length==0 ) ? 'success':''
    },
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
.form_add_new_admin{
  margin: center;
  width: 300px;
}
.add_new{
  position: relative;
  left: 45%;
  margin-top:100px;
}
.add_new_admin{
  width: 300px;
  margin:auto;
}
.sort{
    font-style: italic;
}
* {
  font-size: 14px;
}
.div_add{
  min-height: 295px;
}

.wrapper_table {
  height: 245px;
  border: 1px solid #cccccc;
  overflow: auto;
}
#wrapper_button_add{
  margin: center;
}
#button_exit{
  position: relative;
  right:-268px;
  margin-top:-30xp;
}
#button_exit:hover{
  background-color: #e60000;
}
#button_add{
  position: relative;
  right: -180px;
  margin-top: 10px;
}
</style>