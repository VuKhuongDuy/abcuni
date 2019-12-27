<template>
  <div id="room">
    <!-- import file -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-select
      v-model="selectedExam"
      class="optionExam mt-3"
      :options="listExam"
      size="sm"
    ></b-form-select>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      id="fileListUser"
      @change="importData"
      placeholder="Choose a file or drop it here"
      drop-placeholder="Drop file here..."
      multiple
      style="width:630px"
    ></b-form-file>
    <b-button id="submit" @click="addRoom" :variant="variantState">Thêm phòng thi</b-button>
    <br>
    <br>
    <div class="wrapper_table">
      <b-table
        striped
        hover
        :items="listRoom"
        id="tableTransitionExample"
        :fields="fields"
        head-variant="light"
        :no-border-collapse="noCollapse"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        caption-top
        small
      >
        <template v-slot:cell(index)="data">
          <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

          <template v-slot:cell(delete)="row" class="mr-2"> <!--button ở cột delete -->
            <b-button @click="deleteRoom(row.value)">
              Xóa phòng thi
            </b-button>
          </template>

          
        </b-table><!-- head-variant: màu <th>-->
    </div>
    
      <div class="sort">
        Sắp xếp theo: <b>{{ sortBy }}</b>, Thứ tự:
        <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
      </div>
  </div>
</template>

<script>
import * as axios from '../../../../config/axios';
import readXlsxFile from "read-excel-file";
export default {
  data() {
    return {
      listExam: [{ value: null, text: "Please select an exam", disabled: true  }],
      selectedExam: "",
      listRoom: [],
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",
      dataXml: [],
      file:[],

      noCollapse: false,
      turn: null,
      sortBy: "room",
      sortDesc: false,
      fields: [
        {
          key: "index",
          label: "STT"
        },
        {
          key: "room",
          label: "Phòng thi",
          sortable: true
        },
        {
          key: "count_of_computer",
          label:'Số lượng máy tính',
          sortable: true
        },
        {
          key: "delete",
          label: "Xóa"
        }
      ],
    };
  },

  methods: {
    loadExam: async function() {
      try {
        this.dismissCountDown = 0;
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
        if (this.selectedExam === "")
          this.selectedExam = this.listExam[this.listExam.length - 1].value;
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    loadRoom: async function(){
      try {
        this.dismissCountDown = 0;
        this.listRoom = [];
        let url = "/room/" + this.selectedExam;
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((room, index) => {
          let obj = {
            room_id: room.room_id,
            index: index,
            room: room.room_name,
            count_of_computer: room.count_computer,
            delete: index
          };
          this.listRoom.push(obj);
        });
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    addRoom: async function(){
      this.dismissCountDown = 0;
      let listRoomJson = JSON.stringify(this.dataXml);
      let url = '/admin/room/add';
      let body = {listRoom: listRoomJson, exam_id:  this.selectedExam};
      let data = await axios.postAxios(url, body);
      if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
      }else this.changeTypeAlert(data.message, "success");
      await this.loadRoom();
    },

    deleteRoom: async function(index){
      this.dismissCountDown = 0;
      let url = '/admin/room/' + this.selectedExam + '/' + this.listRoom[index].room_id;

      let data = await axios.deleteAxios(url);
      if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
      }else {
        await this.loadRoom();
        this.changeTypeAlert(data.message, "success");
      }
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

  mounted: async function() {
    await this.loadExam();
    await this.loadRoom();
  },
  computed: {
    variantState() {
      return this.file.length != 0 && this.selectedExam!=null ? 'success':''
    }
  }
};
</script>

<style scoped>
#room{
  margin-top: -17px;
}
.optionExam{
  width: 300px;
  display:block;
  margin-bottom: 5px;
}

.wrapper_table{
  max-height: 395px;
  border: 1px solid #cccccc;
  overflow: auto;
}
.search{
  margin-bottom: 4px;
}
#turn{
  width: 480px;
  position: relative;
  top: 1px;
}
#submit{
  position: relative;
  /* left:300px; */
  bottom:-1px;
}
.sort {
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
