<template>
  <div id="subject">
    <b-alert :variant="typeAlert" :show="dismissCountDown">{{message}}</b-alert>
    <div class="wrapper_table">
      <b-form-select
        v-model="selectedExam"
        :options="listExam"
        id="selectExam"
        class="select"
        @change="getListSubjectStudent"
      ></b-form-select>
      <h3 class="header">Danh sách môn đã học</h3>
      <b-table striped hover dark :items="listSubject" :fields="fields"></b-table>
    </div>
  </div>
</template>
<script>
import * as config from "../../../config/config";
import * as axios from "../../../config/axios";
export default {
  data: function() {
    return {
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",
      selectedExam: "",
      fields: [
        {
          key: "Mã môn học"
        },
        {
          key: "Tên môn học",
          sortable: true
        },
        {
          key: "Số tín chỉ",
          sortable: true
        },
        {
          key: "Được thi",
          sortable: true
        }
      ],
      listSubject: [],
      listExam: []
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

    getListSubjectStudent: async function() {
      try {
        this.dismissCountDown = 0;
        this.listSubject = [];
        let url = "/subjectstudent/" + this.selectedExam;
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach(subject => {
          let sub = {
            isActive: true,
            "Mã môn học": subject.subject_code,
            "Tên môn học": subject.subject_name,
            "Số tín chỉ": subject.credit,
            "Được thi": subject.enable_test
          };
          this.listSubject.push(sub);
        });
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
    await this.getListSubjectStudent();
  }
};
</script>
<style scoped>
#subject {
  text-align: center;
}
.header {
  margin-top: 10px;
  margin-bottom: 20px;
}
.wrapper_table {
  width: 80%;
  margin-left: 100px;
  height: 400px;
  overflow: scroll;
}

.select {
  width: 250px;
  margin-top: 20px;
}
</style>