<template>
  <div id="registerTest">
    <b-form-select
      v-model="selectedExam"
      :options="listExam"
      id="selectExam"
      class="select"
      @change="loadSubject"
    ></b-form-select>
    <b-form-select
      v-model="selectedSubject"
      :options="listSubject"
      id="selectSubject"
      class="select"
      @change="loadTurn"
    ></b-form-select>
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <div class="wrapper-table wrapper-roomtb">
      <b-table
        striped
        hover
        :items="listTurn"
        small
        fixed
        show-empty
        class="table"
        id="room"
        @row-clicked="chooseTurnRegist"
        :fields="fieldsTurn"
      >
        <template v-slot:empty="scope">
          <h4>{{ "Không có ca thi nào" }}</h4>
        </template>
      </b-table>
    </div>
    <b-button
      variant="success"
      class="btn"
      id="btnRegisterTest"
      v-show="listTurn.length > 0"
      @click="clickRegist"
    >Đăng kí</b-button>
    <div class="wrapper-table wrapper wrapper-subjectRegistedTb">
      <b-table
        striped
        hover
        :items="listTurnRegisted"
        dark
        small
        fixed
        show-empty
        class="table"
        id="subjectRegisted"
        :fields="fieldsTurn"
        @row-clicked="chooseTurnRegisted"
      >
        <template v-slot:empty="scope">
          <h4>{{ "Chưa đăng kí ca thi nào" }}</h4>
        </template>
      </b-table>
    </div>
    <b-button
      variant="danger"
      class="btn"
      id="btnDeleteTest"
      @click="removeSubject"
      v-show="listTurnRegisted.length > 0"
    >Huỷ</b-button>
  </div>
</template>
<script>
import * as axios from "../../../config/axios";
export default {
  name: "registertest",
  data() {
    return {
      isEmptyTurn: true,
      isEmptyTurnRegisted: true,
      codeSubjectSearch: "",
      typeAlert: "info",
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      fieldsTurn: [
        { key: "Mã môn" },
        { key: "Tên môn", sortable: true },
        { key: "Phòng thi", sortable: true },
        { key: "Ngày thi", sortable: true },
        { key: "Thời gian bắt đầu" },
        { key: "Thời gian kết thúc" },
        { key: "Số lượng đăng kí", sortable: true }
      ],
      selectedExam: null,
      selectedSubject: null,
      selectedTurn: null,
      listExam: [{ value: null, text: "Kì thi" }],
      listSubject: [{ value: null, text: "Môn học" }],
      listTurn: [],
      listTurnRegisted: [],
      turnRegistChoosed: null,
      turnRegistedChoosed: null
    };
  },
  methods: {
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

    loadTurn: async function() {
      try {
        this.dismissCountDown = 0;
        this.listTurn = [];
        this.isEmptyTurn = true;
        let url = "/regist/" + this.selectedExam + "/" + this.selectedSubject;

        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        if (data.data.length > 0) this.isEmptyTurn = false;
        data.data.forEach(turn => {
          let obj = {
            Id: turn.registed_id,
            "Mã môn": turn.subject_code,
            "Tên môn": turn.subject_name,
            "Phòng thi": turn.room_name,
            "Ngày thi": turn.date,
            "Thời gian bắt đầu": turn.time_begin,
            "Số lượng đăng kí": turn.count_registed + "/" + turn.count_computer,
            'count_registed': turn.count_registed
          };
          this.listTurn.push(obj);
        });
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    loadTurnRegisted: async function() {
      try {
        this.dismissCountDown = 0;
        this.listTurnRegisted = [];
        this.isEmptyTurnRegisted = true;
        let url = "/regist/" + this.selectedExam + '/student';

        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach(turn => {
          let obj = {
            Id: turn.registed_id,
            "Mã môn": turn.subject_code,
            "Tên môn": turn.subject_name,
            "Phòng thi": turn.room_name,
            "Ngày thi": turn.date,
            "Thời gian bắt đầu": turn.time_begin,
            "Số lượng đăng kí": turn.count_registed + "/" + turn.count_computer,
            'count_registed': turn.count_registed
          };
          this.listTurnRegisted.push(obj);
        });
        if (data.data.length === 0) this.isEmptyTurnRegisted = false;
      } catch (e) {
        // this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

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

    chooseTurnRegist: function(turn, index) {
      this.turnRegistChoosed = this.listTurn[index];
    },

    chooseTurnRegisted: function(turn, index) {
      this.turnRegistedChoosed = this.listTurnRegisted[index];
    },

    removeSubject: async function() {
      try {
        this.dismissCountDown = 0;
        if (!this.turnRegistedChoosed) {
          return;
        }
        if(!window.confirm('Bạn có muốn xoá môn đã chọn ')){
          return;
        }
        let url = "/student/" + this.turnRegistedChoosed.Id;
        let data = await axios.deleteAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        this.loadTurnRegisted();
        this.changeTypeAlert(data.message, "success");

      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    clickRegist: async function() {
      try {
        let url = "/student/registSubject";
        let body = { subject: this.turnRegistChoosed };
        this.dismissCountDown = 0;
        let data = await axios.postAxios(url, body);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        this.changeTypeAlert(data.message, "success");
        this.loadTurnRegisted();
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    }
  },
  mounted: async function() {
    await this.loadExam();
    await this.loadSubject();
    await this.loadTurnRegisted();
  },
  beforeUpdate: function() {
    if (this.listTurnRegisted.length === 0) {
      this.isEmptyTurnRegisted = true;
    }
  },
  computed: {
    selectedExam: function(){
      this.$emit('updateExam', this.selectedExam);
    }
  }
};
</script>
<style>
#registerTest {
  width: 100%;
  height: 100%;
  padding-left: 60px;
  padding-top: 40px;
}

#selectExam {
  width: 200px;
}

#selectSubject {
  width: 400px;
}

#selectTurn {
  width: 200px;
}

#subjectRegisted {
  margin-top: 10px;
}
#btnRegisterTest  {
  margin-left: 88.5%;
  margin-top: -8px;
  margin-bottom: 20px;
}
#btnDeleteTest {
  margin-left:90.6%;
  margin-top: -8px;
  margin-bottom: 20px;
}

.inputSearch {
  width: 40%;
  margin-top: 10px;
}

.table {
  font-size: 12px;
}

.alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 400px;
  /* left: 25%; */
  z-index: 100;
}
.wrapper-table {
  width: 90%;
  margin: auto;
  overflow: auto;
}

.wrapper-roomtb {
  max-height: 400px;
  overflow: auto;
}

.wrapper-subjectRegistedTb {
  max-height: 300px;
  overflow: auto;
}

.select {
  margin-right: 15px;
  width: 200px;
  max-width: 200px;
  min-width: 190px;
}
</style>