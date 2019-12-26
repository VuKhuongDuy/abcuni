<template>
  <div id="student">
    <!-- import file -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      id="fileListUser"
      @change="importData"
      placeholder="Choose a file or drop it here and click 'Submit' to import list user..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
    ></b-form-file>
      <b-button id="submit" :variant="variantState" @click="registUser">Thêm tài khoản sinh viên</b-button>
    <br>
    <br>
    <b-button variant="success" @click="changePassword">Thay đổi mật khẩu sinh viên</b-button>
  </div>
</template>

<script>
import readXlsxFile from "read-excel-file";
import * as axios from '../../../../config/axios';
export default {
  data() {
    return {
      dataXml: [],
      file:'',
      typeAlert: "info",
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
    };
  },
  methods: {
    changePassword: function(){
      this.$router.push('/admin/password');
    },

    registUser: async function(){
      this.dismissCountDown = 0;
      let listUserJson = JSON.stringify(this.dataXml);
      let url = '/admin/user/add';
      let body = [listUserJson];
      let data = await axios.postAxios(url, body);
      if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        this.changeTypeAlert(data.message, "success");
    },

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    },

    importData: async function(){      
      const input = document.getElementById("fileListUser");
      this.dataXml = await this.xlsxToArray(input.files[0]);
    },

    xlsxToArray: function(file) {      
      return new Promise((resolve, reject) => {
        readXlsxFile(file).then((rows, err) => {
          if(err) reject(err);
          let arrayObject = [];
          for(let i=1;i<rows.length;i++){
            let user = {};
            rows[0].forEach((field, index) => {
              user[field] = rows[i][index];
            });
            arrayObject.push(user);
          }
          resolve(arrayObject);
        });
      })
    },
  },
  computed: {
      variantState(){
        return this.file!='' ? 'success':''
      }
    },
};
</script>

<style scoped>
#student{
  text-align: center;
  margin: auto;
  position: relative;
  top: 142px;
}
#submit{
  position: relative;
  top:1px;
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

*{
  font-size: 14px;
}

</style>
