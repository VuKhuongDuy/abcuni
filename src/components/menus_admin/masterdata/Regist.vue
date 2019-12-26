<template>
  <div id="home">
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-button @click="check=!check" v-show="!check" id="add" variant="success">Thêm lịch thi</b-button>
    <b-form-select v-model="selectedExam" :options="listExam" id="exam" @change="eventLoadExam"></b-form-select>
    <div v-show="check" class='add'>
      <b-form-select v-model="selectedSubject" :options="listSubject" id="subject"></b-form-select>
      <b-form-input v-model="selectedDate" id="date" type="date"></b-form-input>
      <b-form-select v-model="selectedTurn" :options="listTurn" id="turn"></b-form-select>
      <b-form-select v-model="selectedRoom" :options="listRoom" id="room"></b-form-select>
      <b-button
        id="submit"
        :variant="variantState"
        v-show="check"
        class="add_and_close"
        @click="addSubjectRegist"
      >Thêm lịch thi</b-button>
      <b-button variant="danger" @click="check=!check" class="add_and_close">Đóng</b-button>
    </div>
    <div class="search">
      <b-form-input
        id="search_MSSV"
        type="search"
        style="width: 230px"
        placeholder="Tìm kiếm môn thi..."
        v-model="keySearch"
        v-on:keyup.enter="searchRoom"
      ></b-form-input>
    </div>
    <!-- table -->
    <div class="wrapper_table">
      <b-table
        striped
        hover
        :items="listSubjectRegistedRender"
        class="table"
        id="table-transition-example"
        :fields="fields"
        head-variant="light"
        :no-border-collapse="false"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        small
        :tbody-tr-class="rowClass"
        caption-top
      >
        <template v-slot:cell(index)="data">
          <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(delete)="row" class="mr-2">
          <!--button ở cột delete -->
          <b-button @click="deleteSubjectRegist(row.value)">Xóa lịch thi</b-button>
        </template>
      </b-table>
    </div>

    <!-- head-variant: màu <th>-->
    <div class="sort">
      Sắp xếp theo:
      <b>{{ sortBy }}</b>, Thứ tự:
      <b>{{ sortDesc ? 'giảm dần' : 'tăng dần' }}</b>
    </div>
  </div>
</template>
<script>
import * as axios from '../../../../config/axios'
export default {
  data() {
    return {
      check: false,      
      selectedExam: null,
      selectedSubject: null,
      selectedDate: null,
      selectedTurn: null,
      selectedRoom: null,
      message: '',
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",
      listSubjectRegisted: [],
      listSubjectRegistedRender: [],
      sortBy: "name_subject",
      sortDesc: false,
      variant_delete: "",
      fields: [
        {
          key: "index",
          label: "STT"
        },
        {
          key: "subject_code",
          label: "Tên môn học",
          sortable: true
        },
        {
          key: "subject_name",
          label: "Tên môn học",
          sortable: true
        },
        {
          key: "credit",
          label: "Số tín chỉ",
          sortable: true
        },
        {
          key: "date",
          label: "Ngày thi",
          sortable: true
        },
        {
          key: "time",
          label: "Thời gian",
          sortable: true
        },
        {
          key: "room",
          label: "Phòng thi",
          sortable: true
        },
        {
          key: "number_of_computer",
          label: "Số lượng đã đăng kí",
          sortable: true
        },
        {
          key: "delete",
          label: "Xóa"
        }
      ],
      listSubject: [],
      listTurn: [],
      listRoom: [],
      listExam: [],
      keySearch: ''
    };
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
        console.log(e.message);
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    eventLoadExam: async function(){
      await this.loadSubject();
      await this.loadRoom();
      await this.loadSubjectRegisted();
    },

    loadSubject: async function() {
      try {
        this.dismissCountDown = 0;
        this.listSubject = [];
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

    loadSubjectRegisted: async function(){
      try{
        this.dismissCountDown = 0;
        this.listSubjectRegisted = [];
        this.listSubjectRegistedRender = [];
        let url = '/regist/' + this.selectedExam;
        let data = await axios.getAxios(url);
        console.log( data);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((subject, index) => {
          let obj = { 
            registed_id: subject.registed_id,
            index : index,
            subject_code : subject.subject_code,
            subject_name : subject.subject_name,
            credit : subject.credit,
            date : subject.date,
            time : subject.time_begin,
            room : subject.room_name,
            number_of_computer : subject.count_registed,
            delete : index
          };
          this.listSubjectRegisted.push(obj);
        });
        this.listSubjectRegistedRender = this.listSubjectRegisted;
      } catch (e) {
        console.log(e.message);
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    loadTurn: async function(){
      try {
        this.dismissCountDown = 0;
        this.listTurn = [{ value: null, text: "Ca thi", disabled: true }];
        let url = "/turn";
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((turn, index) => {
          let obj = { value: turn.turn_id, text: turn.time_begin, disabled: false };
          this.listTurn.push(obj);
        });        
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    loadRoom: async function(){
      try {
        this.dismissCountDown = 0;
        this.listRoom = [{value: null, text: "Phòng thi"}];
        let url = "/room/" + this.selectedExam;
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((room, index) => {
          let obj = {value: room.room_id, text: room.room_name};
          this.listRoom.push(obj);
        });
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    addSubjectRegist: async function(){
      try{
        this.dismissCountDown = 0;
        let url = '/admin/regist/';
        let body = {exam_id: this.selectedExam, subject_code: this.selectedSubject, turn_id: this.selectedTurn, room_id: this.selectedRoom, date: this.selectedDate};
        let data = await axios.postAxios(url ,body);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
        }else {
          await this.loadSubjectRegisted();
          this.changeTypeAlert(data.message, "success");
        }
      }catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    searchRoom: async function(){
      if(this.keySearch.length === 0){
        this.listSubjectRegistedRender = this.listSubjectRegisted;
        return;
      }
      this.listSubjectRegistedRender = [];
      this.listSubjectRegisted.forEach(subject => {
        if(subject.subject_name.indexOf(this.keySearch) >= 0)
          this.listSubjectRegistedRender.push(subject);
      })
    },

    deleteSubjectRegist: async function(index){
      try{
        this.dismissCountDown = 0;
        let url = '/admin/regist/' + this.listSubjectRegistedRender[index].registed_id;

        let data = await axios.deleteAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
        }else{
          await this.loadSubjectRegisted();
          this.changeTypeAlert(data.message, "success");
        }
      }catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    },

    rowClass(item, type) {
      if (!item) return;
      if (item.status === "awesome") return "row";
    }
  },
  mounted: async function(){
    await this.loadExam();
    await this.loadSubject();
    await this.loadTurn();
    await this.loadRoom();
    await this.loadSubjectRegisted();
  },
  computed: {
    variantState() {
      return this.selectedExam != null &&
        this.selectedSubject != null &&
        this.selectedDate != null &&
        this.selectedTurn != null &&
        this.selectedRoom != null
        ? "success"
        : "";
    },
    checkFunction() {
      this.check = !check;
    },
    mouseOver() {}
  }
};
</script>
<style scoped>
#exam {
  width: 338px;
}
#subject {
  width: 330px;
}
#date {
  width: 180px;
  position: relative;
  display: inline-block;
  top: 1px;
}
#turn {
  width: 140px;
}
#room {
  width: 120px;
}
#add {
  position: relative;
  float: right;
  right: 10px;
}
#submit {
  position: relative;
  bottom: -1px;
}
.add{
  position: absolute;
}
.add_and_close {
  position: relative;
  top: -1px;
}
.table {
  position: relative;
}
.search {
  margin-bottom: 4px;
}
.title {
  position: relative;
  float: right;
  right: 30px;
}
.sort {
  font-style: italic;
}
.row {
  background-color: blue;
}
.wrapper_table {
  height: 450px;
  border: 1px solid #cccccc;
  overflow: auto;
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

* {
  font-size: 14px;
}
</style>

