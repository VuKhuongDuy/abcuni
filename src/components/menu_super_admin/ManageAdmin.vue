<template>
  <div id="manageadmin">
    <!-- table -->
    <div class='div_add'>
      <b-button variant="success" class="add_new" v-show="check" @click="check=!check">Thêm admin</b-button>
      <div v-show="!check" class='add_new_admin'>
        <table id="table_add">
          <tr>
            <td><label for="email">Email:</label></td>
            <td><label for="password">Mật khẩu:</label></td>
            <td><label for="repassword">Nhập lại mật khẩu:</label></td>
            <td><b-button class="" id="button_exit" @click='check=!check' style='margin-top:-19px;'>x</b-button></td>
          </tr>
          <tr>
            <td>
              <b-form-input v-model="email" type='email' :state="emailState" placeholder="Nhập email" class="add_new_admin"></b-form-input>
              <b-form-invalid-feedback id="name">Mail không hợp lệ</b-form-invalid-feedback>
            </td>
            <td>
              <b-form-input v-model="password" type='password' :state="passwordState" placeholder="Nhập mật khẩu" class="add_new_admin"></b-form-input>
              <b-form-invalid-feedback id="name">Bạn chưa nhập mật khẩu</b-form-invalid-feedback>
            </td>
            <td>
              <b-form-input v-model="repassword" type='password' :state="rePasswordState" placeholder="Nhập lại mật khẩu" class="add_new_admin"></b-form-input>
              <b-form-invalid-feedback id="name">Bạn cần nhập lại mật khẩu đúng</b-form-invalid-feedback>
            </td>
            <td><b-button :variant="variantState" @click="addAdmin" id="button_add" style="width: 104px">Thêm admin</b-button></td>
          </tr>
        </table>
        <!-- <b-button :variant="variantState" id="button_add">Thêm admin</b-button> -->
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
          <b-button variant="danger" @click="deleteAdmin(row.value)">
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
          email: admin.email,
          crud: index
        }
        this.listAdmin.push(obj);
      });
    },

    addAdmin: async function(){
      try{
        this.dismissCountDown = 0;
        if(this.password != this.repassword){
          this.changeTypeAlert('Mật khẩu xác nhận không khớp với mật khẩu', 'warning');
          return;
        }
        let url = '/admin/add';
        let body = {email: this.email, password: this.password};
        let data = await axios.postAxios(url, body);
        if(!data.success){
          this.changeTypeAlert(data.message, 'warning');
          return;
        }
        await this.loadAdmin();
        this.changeTypeAlert(data.message, 'success');
      }catch(err){
        this.changeTypeAlert('Có vấn đề xảy ra', 'warming');
      }
    },

    deleteAdmin: async function(index){
      this.dismissCountDown = 0;
      let url = '/admin/' + this.listAdmin[index].email;
      console.log(url);
      let data = await axios.deleteAxios(url);
      if(!data.success){
          this.changeTypeAlert(data.message, 'warning');
          return;
        }
        await this.loadAdmin();
        this.changeTypeAlert(data.message, 'success');
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
      if(this.email.length === 0)
        return false;
      this.email = this.email.trim();
      let regex = /^[a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
      let isEmail = regex.test(this.email);
      return isEmail;
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
#table_add{
  border-spacing: 0px;
  position: relative;
  left: 160px;
  margin-top:3px;
}
td{
  padding: 0px;
}
.input_ad td{
  min-height: 58px;
}
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
  margin-top:25px;
}
.add_new_admin{
  position: relative;
  padding: -4px;
  margin-top: -3px;
  width: 300px;
}
.sort{
    font-style: italic;
}
* {
  font-size: 14px;
}
.div_add{
  min-height: 100px;
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

.wrapper_table {
  height: 438px;
  border: 1px solid #cccccc;
  overflow: auto;
}
#wrapper_button_add{
  margin: center;
}
#button_exit{
  position: relative;
  right:-34px;
}
#button_exit:hover{
  background-color: #e60000;
}
/* #button_add{
  position: relative;
  right: -180px;
  margin-top: 10px;
} */
</style>