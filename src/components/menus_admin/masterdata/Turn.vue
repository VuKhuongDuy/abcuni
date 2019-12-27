<template>
  <div id="student">
    <!-- import file -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here and click 'Submit' to import list caseExam..."
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
      @change="importData"
      id="fileImport"
    ></b-form-file>
    <b-button id="submit" :variant="variantState" @click="addTurn">Thêm ca thi</b-button>
    <br>
    <div class="wrapper_table">
      <b-table striped hover :items="listTurn"
      id="table-transition-example"
      :fields="fields"
      head-variant="light"
      :no-border-collapse="noCollapse"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      small
      caption-top
      >
        <template v-slot:cell(index)="data"> <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

          <template v-slot:cell(crud)="row" class="mr-2"> <!--button ở cột crud -->
          <b-button @click="deleteTurn(row.value)">
            Xóa ca thi
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
import * as axios from '../../../../config/axios'
import readXlsxFile from "read-excel-file";
export default {
  data(){
    return{
      message: '',
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",
      dataXml: [],
      file:[],
      listTurn: [],
      sortBy: 'number',
      sortDesc: false,
      turn: null,
      noCollapse: false,
      fields:[
        {
          key:'index',
          label:"STT",
        },
        {
          key:"number",
          label:"Ca thi",
          sortable: true
        },
        {
          key:"time",
          label:"Thời gian bắt đầu",
          sortable: true
        },
        {
          key:'crud',
          label:'Xóa'
        }
      ],
    }
  },
  methods: {

    loadTurn: async function(){
      try {
        this.dismissCountDown = 0;
        this.listTurn = [];
        let url = "/turn";
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((turn, index) => {
          let obj = {
            index: index,
            number: turn.turn_id,
            time: turn.time_begin,
            crud: turn.turn_id
          };
          this.listTurn.push(obj);
        });        
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    addTurn: async function(){
      this.dismissCountDown = 0;
      let listTurnJson = JSON.stringify(this.dataXml);
      let url = "/admin/turn/add";
      let body = {listTurnJson};
      let data = await axios.postAxios(url, body);
      if (!data.success) {
        this.changeTypeAlert(data.message, "warning");
        return;
      }else {
        await this.loadTurn();
        this.changeTypeAlert(data.message, "success");
      }
    },

    deleteTurn: async function(turn_id){
      this.dismissCountDown = 0;
      if(!window.confirm(' Bạn có muốn xoá ca thi này không ? ')) return;
      let url = "/admin/turn/" + turn_id;
      let result = await axios.deleteAxios(url);
      if (!result.success) {
        this.changeTypeAlert(result.message, "warning");
        return;
      }else {
        await this.loadTurn();
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
    await this.loadTurn();
  },
  computed: {
      variantState(){
        return this.file.length != 0 ? 'success':''
      }
    },
};
</script>

<style scoped>
.wrapper_table{
  height: 485px;
  margin-top: 4px;
  border: 1px solid #cccccc;
  overflow: auto;
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

</style>
