<template>
  <div id="student">
    <!-- import file -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list student..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
      id="fileListStudent"
      @change="importData"
    ></b-form-file>
    <b-button id="submit" :variant="variantState"  @click="registStudent">Thêm sinh viên</b-button>
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" v-model="keySearch" v-on:keyup.enter="searchStudent" type="search" style="width: 230px" placeholder="Tìm kiếm MSSV..."></b-form-input>
    </div>
    <!-- table -->
    <div class="wrapper_table">
      <b-table striped hover :items="listStudentRender"
      id="table"
      :fields="fields"
      head-variant="light"
      :no-border-collapse="noCollapse" 
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      caption-top
      small
      >
        <template v-slot:cell(index)="data"> <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

          <template v-slot:cell(delete)="row" class="mr-2"> <!--button ở cột xóa -->
            <b-button @click="deleteStudent(row.value)">
              Xóa sinh viên
            </b-button>
          </template>

          
        </b-table>
    </div>
    <!-- head-variant: màu <th>-->
      <div class="sort">
        Sắp xếp theo: <b>{{ sortBy }}</b>, Thứ tự:
        <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
      </div>
  </div>
</template>

<script>
import readXlsxFile from "read-excel-file";
import * as axios from '../../../../config/axios';
export default {
  data(){
    return{
      dataXml: [],
      message: "",
      keySearch: '',
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",

      noCollapse: false,
      sortBy: 'MSSV',
      sortDesc: false,
      file:[],
      fields:[
        {
          key:'index',
          label:"STT",
        },
        {
          key:"mssv",
          sortable: true
        },
        {
          key:"fullName",
          label:'Họ và tên',
          sortable: true
        },
        {
          key:'birthDay',
          sortable: true,
          label:"Ngày sinh",
        },
        {
          key:'sex',
          label:'Giới tính',
          sortable:true,
        },
        {
          key:'delete',
          label:'Xóa'
        }
      ],
      listStudent: [],
      listStudentRender: []
    }
  },
  methods: {
    getListStudent: async function(){
      try {
        this.dismissCountDown = 0;
        this.listStudent = [];
        this.listStudentRender = [];
        let url = "/admin/student";
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((student, index) => {
          let obj = {
            index: index+1,
            mssv: student.mssv,
            fullName: student.name_student,
            birthDay: student.birthday,
            sex: student.sex,
            delete: index
          };
          this.listStudent.push(obj);
        });
        if(this.listStudentRender.length === 0) this.listStudentRender = this.listStudent;
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    importData: async function(){      
      const input = document.getElementById("fileListStudent");
      this.dataXml = await this.xlsxToArray(input.files[0]);
    },

    xlsxToArray: function(file) {      
      return new Promise((resolve, reject) => {
        const schema = {
          'mssv': {
            prop: 'mssv',
            type: String,
            required: true
          },
          'name': {
            prop: 'name',
            type: String
          },
          'birthday': {
            prop: 'birthday',
            type: Date
          },
          'sex': {
            prop: 'sex',
            required: true,
            type: String
          }
        };
        readXlsxFile(file, {schema}).then(({rows, err}) => {
          if(err) reject(err);
          let arrayObject = [];
          for(let i=0;i<rows.length;i++){
            let student = {};
            if(!rows[i].birthday){
              continue;
            }
            student['mssv'] = rows[i].mssv;
            student['name'] = rows[i].name;
            let date = new Date(rows[i].birthday);
            student['birthday'] = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            student['sex'] = rows[i].sex;
            arrayObject.push(student);
          }
          resolve(arrayObject);
        });
      })
    },

    registStudent: async function(){
      this.dismissCountDown = 0;
      let listStudentJson = JSON.stringify(this.dataXml);
      let url = '/admin/student/add';
      let body = [listStudentJson];
      let data = await axios.postAxios(url, body);
      if(!data.success){
        this.changeTypeAlert(data.message, 'warning');
      }
      else {
        await this.getListStudent();
        this.changeTypeAlert(data.message, 'success');
      }
    },

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    },

    searchStudent: function(){
      if(this.keySearch) this.listStudentRender = [];
      else {
        this.listStudentRender = this.listStudent;
        return;
      }
      
      this.listStudent.forEach(student => {
        if(student.mssv.indexOf(this.keySearch) >= 0){
          this.listStudentRender.push(student);
        }
      });
    },

    deleteStudent: async function(index){
      this.dismissCountDown = 0;
      if(!window.confirm("Bạn có muốn xoá sinh viên này ?")){return}

      let url = '/admin/student/delete/' + this.listStudentRender[index].mssv;
      let data = await axios.deleteAxios(url);
      if(!data.success){
        this.changeTypeAlert(data.message, 'warning');
        return;
      }  
      await this.getListStudent();
      this.changeTypeAlert(data.message, 'success');
    }
  },
  mounted: async function(){
    await this.getListStudent();
  },
  computed: {
      variantState(){
        return this.file.length != 0 ? 'success':''
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
.search{
  margin-bottom: 4px;
  margin-top: -8px;
}
#submit{
  position: relative;
  /* left:300px; */
  bottom:-1px;
}
.sort{
    font-style: italic;
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
.wrapper_table{
  height: 438px;
  border: 1px solid #cccccc;
  overflow: auto;
}
</style>
