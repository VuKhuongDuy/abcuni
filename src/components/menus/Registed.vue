<template>
  <div id="registed">
    <b-form-select
      v-model="selectedExam"
      class="optionExam mt-3"
      :options="listExam"
      size="sm"
      @change="loadSubjectRegisted"
    ></b-form-select>
    <b-alert :variant="typeAlert" :show="dismissCountDown">{{message_alert}}</b-alert>
    <b-form-input
      v-model="codeSubjectSearch"
      placeholder="Tìm môn"
      class="input searchSubject"
      v-on:keyup.enter="searchSubject"
    ></b-form-input>
    <b-button variant="success" id="btnGoToAdd" @click="gotoAdd">Đăng kí thi</b-button>
    <b-button variant="danger" id="btnRemove" @click="removeSubject">Xoá môn</b-button>
    <div class="wrapper_table">
      <b-table
        striped
        hover
        :items="listSubjectRender"
        small
        fixed
        show-empty
        class="table"
        id="subjectRegisted"
        :fields="fieldsSubject"
        @row-clicked="chooseSubject"
      >
        <template v-slot:empty="scope">
          <h4>{{ message }}</h4>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import * as axios from "../../../config/axios";
export default {
  name: "registed",
  data: function() {
    return {
      message_alert: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",
      fieldsSubject: [
        { key: "Mã môn" },
        { key: "Tên môn", sortable: true },
        { key: "Phòng thi", sortable: true },
        { key: "Ngày thi", sortable: true },
        { key: "Thời gian bắt đầu" },
        { key: "Số lượng đăng kí", sortable: true }
      ],
      listSubjectRegisted: [],
      listSubjectRender: [],
      codeSubjectSearch: "",
      isEmptySubjectRegisted: false,
      listExam: [{ value: null, text: "Please select an exam" }],
      selectedExam: "",
      message: "",
      subjectChoosed: null
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

    loadSubjectRegisted: async function() {
      try {
        this.dismissCountDown = 0;
        this.listSubjectRegisted = [];
        this.isEmptySubjectRegisted = true;
        let url = "/regist/" + this.selectedExam + '/student';

        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }

        if (data.data.length === 0) this.isEmptySubjectRegisted = false;
        data.data.forEach(turn => {
          let obj = {
            Id: turn.registed_id,
            "Mã môn": turn.subject_code,
            "Tên môn": turn.subject_name,
            "Phòng thi": turn.room_name,
            "Ngày thi": turn.date,
            "Thời gian bắt đầu": turn.time_begin,
            "Số lượng đăng kí": turn.count_registed + "/" + turn.count_computer
          };
          this.listSubjectRegisted.push(obj);
        });
        this.listSubjectRender = this.listSubjectRegisted;
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    searchSubject: function() {
      try {
        this.dismissCountDown = 0;
        this.listSubjectRender = [];
        if (this.codeSubjectSearch === "") {
          this.listSubjectRender = this.listSubjectRegisted;
          return;
        }
        this.listSubjectRegisted.forEach(subjetc => {
          if (subjetc["Mã môn"].indexOf(this.codeSubjectSearch) >= 0) {
            this.listSubjectRender.push(subjetc);
          }
        });
        if (this.listSubjectRender.length === 0) {
          this.message = "Không có môn nào";
        }
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    chooseSubject: function(record, index) {
      this.subjectChoosed = this.listSubjectRender[index];
    },

    removeSubject: async function() {
      try {
        this.dismissCountDown = 0;
        if (!this.subjectChoosed) {
          return;
        }
        if(!window.confirm('Bạn có muốn xoá môn đã chọn ')){
          return;
        }
        let url = "/student/" + this.subjectChoosed.Id;

        let data = await axios.deleteAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        this.changeTypeAlert(data.message, "success");

      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    gotoAdd: function() {
      this.$router.push("/registertest");
    },

    changeTypeAlert: function(message, type) {
      this.message_alert = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    }
  },

  mounted: async function() {
    this.$emit("change_path");
    await this.loadExam();
    await this.loadSubjectRegisted();
    if (this.listSubjectRender.length === 0) {
      this.message = "Không có môn nào";
    }
  },
  computed: {
    selectedExam: function(){
      this.$emit('updateExam', this.selectedExam);
    }
  }
};
</script>
<style scoped>
b-alert {
  display: block;
}

#registed{
  width: 100%;
  padding-left: 50px;
  min-height: 100%;
}


#btnRemove {
  margin-left: 10px;
}

#btnGoToAdd {
  margin-left: 200px;
}

.optionExam {
  width: 15%;
  line-height: 20px;
  display: block;
  margin-bottom: 10px;
}

.searchSubject {
  width: 30%;
  /* margin-left: 10px; */
  float: left;
}

.wrapper_table {
  width: 90%;
  margin-top: 20px;
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
</style>