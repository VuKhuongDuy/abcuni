<template>
  <div id="student">
    <!-- import file -->
    <b-button variant="outline-primary" @click="addStudent">AddStudent</b-button>
    <b-button variant="outline-primary">AddSubject</b-button>
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
    <div class="mt-3">
      Selected file: {{ file ? file.name : '' }}
      <b-button id="submit" :variant="variantState">Submit</b-button>
      <i class='title'>
        *Quản lý tài khoản SV
      </i>
    </div>

    <!-- table -->
    <b-table
      striped
      hover
      :items="listStudent"
      id="table-transition-example"
      :fields="fields"
      :head-variant="headVariant"
      :sticky-header="stickyHeader"
      :no-border-collapse="noCollapse"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      caption-top
    >
      <template v-slot:cell(index)="data">
        <!--STT không bị thay đổi khi sort-->
        {{ data.index + 1 }}
      </template>

        <template v-slot:cell(delete)="row" class="mr-2"> <!--button ở cột delete -->
        <b-button>
          Delete
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
import readXlsxFile from "read-excel-file";
import * as axios from '../../../../config/axios';
export default {
  data() {
    return {
      dataXml: [],
      headVariant: "light",
      stickyHeader: true,
      noCollapse: false,
      sortBy: "MSSV",
      sortDesc: false,
      file:'',
      fields:[
        {
          key: "index",
          label: "STT"
        },
        {
          key: "MSSV",
          sortable: true
        },
        {
          key: "full_name",
          sortable: true
        },
        {
          key: "password",
          label: "Mật khẩu",
          sortable: true
        },
        {
          key:'delete',
          label:'Xóa'
        }
      ],
      listStudent: [
        { MSSV: 17021119, full_name: "Nguyễn Xuân Tự", password: "demo1" },
        { MSSV: 17021120, full_name: "Nguyễn Ngọc Nhi", password: "zz123" },
        { MSSV: 17021121, full_name: "Nguyễn Xuân Long", password: "31231" }
      ]
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
.title {
  position: relative;
  float: right;
  right: 30px;
}
.form {
  position: relative;
  float: right;
}
.list {
  position: relative;
  top: 46px;
}
#submit {
  position: relative;
  left: 300px;
  bottom: 4px;
}
.sort{
    font-style: italic;
}
</style>
