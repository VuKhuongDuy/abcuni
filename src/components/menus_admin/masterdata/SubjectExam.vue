<template>
  <div id="student">
    <!-- import file -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <div>
      <b-form-select
      v-model="selectedExam"
      class="optionExam"
      :options="listExam"
      size="sm"
      @change="loadSubject"
      style="margin-bottom:4px;"
    ></b-form-select>
    </div>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list subject exam..."
      drop-placeholder="Drop file here..."
      multiple
      id="fileImport"
      @change="importData"
      style="width:630px;"
    ></b-form-file>
    <b-button id="submit" @click="addSubject" :variant="variantState">Thêm môn thi</b-button>
      <!-- <i class='title'>
        *Quản lý môn thi
      </i> -->
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" v-model="keySearch" v-on:keyup.enter="searchSubjetc" type="search" style="width: 230px" placeholder="Tìm kiếm tên môn thi..."></b-form-input>
    </div>

    <!-- table -->
<<<<<<< HEAD
    <div class="wrapper_table">
      <b-table striped hover :items="listSubject"
=======
    <div class="wapper_table">
      <b-table striped hover :items="listSubjectRender"
>>>>>>> 01a3265d46e2fb0cd4afb5d88aedb6e375ab048d
      id="table"
      :fields="fields"
      head-variant="light"
      no-border-collapse="false" 
      sort-by.sync="code_subject"
      sort-desc.sync="false"
      caption-top
      small
      >
        <template v-slot:cell(index)="data">
          <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

          <template v-slot:cell(delete)="row" class="mr-2"> <!--button ở cột delete -->
          <b-button @click="deleteSubject(row.value)">
            Xóa môn thi
          </b-button>
          </template>

          
        </b-table><!-- head-variant: màu <th>-->
    </div>
  </div>
</template>

<script>
import * as axios from '../../../../config/axios'
import readXlsxFile from "read-excel-file";
export default {
  data(){
    return{
      selectedExam: "",
      message: '',
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",
      dataXml: [],

      keySearch: null,
      turn:null,
      file:'',
      listExam: [{ value: null, text: "Kì thi" }],
      listSubject: [],
      listSubjectRender: [],
      fields:[
        {
          key:'index',
          label:"STT",
        },
        {
          key:"code_subject",
          label:"Mã môn học",
          sortable: true
        },
        {
          key:"name_subject",
          label:'Tên môn học',
          sortable: true
        },
        {
          key:"credit",
          label:'Số tín chỉ',
          sortable: true
        },
        {
          key:'delete',
          label:'Xóa'
        }
      ],
    }
  },
  methods: {
    loadExam: async function() {
      try {
        this.dismissCountDown = 0;
        this.listExam = [{ value: null, text: "Exam" }];
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
        this.listSubject = [];
        this.listSubjectRender = [];
        let url = "/subject/" + this.selectedExam;
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((subject, index) => {
          let obj = { 
            index: index,
            code_subject: subject.subject_code,
            name_subject: subject.subject_name,
            credit: subject.credit,
            delete: index
          };
          this.listSubject.push(obj);
          this.listSubjectRender = this.listSubject;
        });
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    addSubject: async function(){
      this.dismissCountDown = 0;
      let listSubjectJson = JSON.stringify(this.dataXml);
      let url = '/admin/subject/add';
      let body = {listRoom: listSubjectJson, exam_id:  this.selectedExam};
      let data = await axios.postAxios(url, body);
      if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
      }else {
        await this.loadSubject();
        this.changeTypeAlert(data.message, "success");
      }
    },

    searchSubjetc: async function(){
      this.dismissCountDown = 0;
      if(this.keySearch.length === 0){
        this.listSubjectRender = this.listSubject;
        return;
      }
      this.listSubjectRender = [];
      this.listSubject.forEach(subject => {
        if(subject.name_subject.indexOf(this.keySearch) >= 0)
          this.listSubjectRender.push(subject);
      })
    },

    deleteSubject:async function(index){
      if(!window.confirm('Bạn có muốn xoá môn học này, nếu bạn xoá, tất cả danh sách sinh viên đã đăng kí thi môn học này sẽ bị xoá ?')
      ){return;}
      this.dismissCountDown = 0;
      let url = '/admin/subject/delete/' + this.selectedExam + '/' + this.listSubject[index].code_subject;
      let result = await axios.deleteAxios(url);
      if (!result.success) {
          this.changeTypeAlert(result.message, "warning");
      }else {
        await this.loadSubject();
        this.changeTypeAlert(result.message, "success");
      }
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
  },
  computed: {
      variantState(){
        return this.file!='' && this.selectedExam!=null ? 'success':''
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
}
#submit{
  position: relative;
  /* left:300px; */
  bottom:-1px;
}
.optionExam{
  width: 480px;
  position: relative;
  top: 1px;
}
.sort{
    font-style: italic;
}
.wrapper_table{
  height: 408px;
  border: 1px solid #cccccc;
  overflow: auto;
}
*{
  font-size: 14px;
}
</style>
