<template>
  <div id="student">
    <!-- import file -->
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
      <b-button id="submit" :variant="variantState">Thêm tài khoản sinh viên</b-button>
    <br>
    <br>
    <b-button variant="success">Thay đổi mật khẩu sinh viên</b-button>
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
    };
  },
  methods: {
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



    registUser: async function(){
      let listUserJson = JSON.stringify(this.dataXml);
      let url = '/user/add';
      let body = [listUserJson];
      let data = await axios.postAxios(url, body);
    },

    addSubject: async function(){
      let listSubjectJson = JSON.stringify(this.dataXml);
      let url = '/admin/subject/add';
      let body = [listSubjectJson];
      console.log(listStudentJson);
      let data = await axios.postAxios(url, body);
      console.log(addSubject);
    },

    addStudent: async function(){
      let listStudentJson = JSON.stringify(this.dataXml);
      let url = '/admin/student/add';
      let body = [listStudentJson];
      let data = await axios.postAxios(url, body);
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
*{
  font-size: 14px;
}

</style>
