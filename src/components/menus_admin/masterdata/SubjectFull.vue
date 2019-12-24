<template>
  <div id="student">
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <!-- import file -->
    <b-form-select
      v-model="selectedExam"
      :options="listExam"
      id="selectExam"
      class="select"
      @change="loadSubject"
      style="width:400px; margin-bottom: 4px;"
    ></b-form-select>
    <div>
      <b-form-select
      v-model="selectedSubject"
      :options="listSubject"
      id="selectSubject"
      class="select"
      @change="loadStudentSubject"
      style="width:500px; margin-bottom: 4px;"
    ></b-form-select>
    </div>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import..."
      drop-placeholder="Drop file here..."
      multiple
      @change="importData"
      id="fileImport"
      style="width:630px"
    ></b-form-file>
    <b-button id="submit" :variant="variantState" @click="addSubjectLearned" >Thêm danh sách sinh viên của môn học {{selectedSubject.nameSubject}}</b-button>
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" type="search"  v-model="keySearch" style="width: 230px" v-on:keyup.enter="searchStudent" placeholder="Tìm kiếm MSSV..."></b-form-input>
    </div>

    <!-- table -->
    <div class="wapper_table">
      <b-table striped hover :items="listStudentRender"
      id="table-transition-example"
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

          <template v-slot:cell(delete)="row" class="mr-2"> <!--button ở cột delete -->
          <b-button>
            Xóa môn
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
import * as axios from "../../../../config/axios";
import readXlsxFile from "read-excel-file";
export default {
  data(){
    return{
      headVariant:'light',
      noCollapse: false,
      sortBy: 'MSSV',
      sortDesc: false,
      file:'',
      dataXml: null,
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
          key:'fullName',
          label:"Họ tên",
          sortable: true
        },
        {
          key:"codeSubject",
          label:'Mã môn học',
          sortable: true
        },
        {
          key:'nameSubject',
          sortable: true,
          label:"Tên môn",
        },
        {
          key:'credit',
          sortable: true,
          label:"Tín chỉ",
        },
        {
          key:'enableTest',
          sortable: true,
          label:"Đủ điều kiện thi",
        }
        // ,
        // {
        //   key:'delete',
        //   label:'Xóa'
        // }
      ],
      keySearch: '',
      selectedExam: '',
      selectedSubject: '',
      selectedTurn: '',
      listExam: [],
      listSubject: [],
      listStudent: [],
      listStudentRender: [],
      typeAlert: "info",
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
    }
  },
  methods: {
    loadExam: async function() {
      try {
        this.dismissCountDown = 0;
        this.listExam = [{ value: null, text: "Exam", disabled: true }];
        let url = "/exam";
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach(exam => {
          let obj = { value: exam.exam_id, text: exam.exam_name };
          this.listExam.push(obj);
        });
        this.selectedExam = this.listExam[this.listExam.length - 1].value;
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },
    
    loadSubject: async function() {
      try {
        this.dismissCountDown = 0;
        this.listSubject = [{ value: null, text: "Môn học" }];
        let url = "/subject/" + this.selectedExam;
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach(subject => {
          let obj = { value: subject.subject_code, text: subject.subject_name };
          this.listSubject.push(obj);
        });        
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    loadStudentSubject: async function(){
      try {
        this.dismissCountDown = 0;
        this.listStudentRender = [];
        this.listStudent = [];
        let url = "/student/" + this.selectedExam + '/' + this.selectedSubject;
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((subject, index) => {
          let obj = {
            index: index+1,
            mssv: subject.mssv,
            fullName: subject.name_student,
            codeSubject: subject.subject_code,
            nameSubject: subject.subject_name,
            credit: subject.credit,
            enableTest: subject.enable_test
          }
          this.listStudent.push(obj);
          this.listStudentRender = this.listStudent;
        });
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    addSubjectLearned: async function(){
      this.dismissCountDown = 0;
      if(!this.selectedExam || !this.selectedSubject){
        this.changeTypeAlert('Hãy chọn kì thi và môn học', 'warning');
        return;
      }
      let listStudentJson = JSON.stringify(this.dataXml);
      let url = '/admin/subject/student';
      let body = {listStudent: listStudentJson, exam_id: this.selectedExam, subject_code: this.selectedSubject};
      let data = await axios.postAxios(url, body);
      if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
      }else this.changeTypeAlert(data.message, "success");
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

    importData: async function(){      
      const input = document.getElementById("fileImport");
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

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    }

  },
  mounted: async function(){
    await this.loadExam();
    await this.loadSubject();
    // await this.loadStudentSubject();
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
*{
  font-size: 14px;
}
.wapper_table{
  height: 363px;
  border: 1px solid #cccccc;
  overflow: auto;
}
</style>
