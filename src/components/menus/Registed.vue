<template>
  <div id="registed">
    <b-form-select v-model="selectedExam" class="optionExam mt-3" :options="listExam" size="sm" @change="loadSubjectRegisted"></b-form-select>
    <b-form-input
      v-model="codeSubjectSearch"
      placeholder="Tìm môn"
      class="input searchSubject"
      v-on:keyup.enter="searchSubject"
    ></b-form-input>
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
      fieldsSubject: [
        { key: "Mã môn" },
        { key: "Tên môn", sortable: true },
        { key: "Phòng thi", sortable: true },
        { key: "Ngày thi", sortable: true },
        { key: "Thời gian bắt đầu" },
        { key: "Thời gian kết thúc" },
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
      let url = "/exam";
      let data = await axios.getAxios(url);
      if (data.success) {
        data.data.forEach(exam => {
          let obj = { value: exam.exam_id, text: exam.exam_name };
          this.listExam.push(obj);
        });
        if (this.selectedExam === "") this.selectedExam = this.listExam[this.listExam.length-1].value;
      }
    },

    loadSubjectRegisted: async function() {
      this.listSubjectRegisted = [];
      this.isEmptySubjectRegisted = true;
      let url = "/turn/registed/student/" + this.selectedExam;

      let data = await axios.getAxios(url);
      if (data.success) {
        if (data.data.length === 0) this.isEmptySubjectRegisted = false;
        data.data.forEach(turn => {
          let obj = {
            Id: turn.turn_id,
            "Mã môn": turn.subject_code,
            "Tên môn": turn.subject_name,
            "Phòng thi": turn.room_name,
            "Ngày thi": turn.date,
            "Thời gian bắt đầu": turn.time_begin,
            "Thời gian kết thúc": turn.time_end,
            "Số lượng đăng kí": turn.registed + "/" + turn.count_computer
          };
          this.listSubjectRegisted.push(obj);
        });
        this.listSubjectRender = this.listSubjectRegisted;
      }
    },

    searchSubject: function() {
      this.listSubjectRender = [];
      if(this.codeSubjectSearch === ""){
        this.listSubjectRender = this.listSubjectRegisted;
        return;
      }
      this.listSubjectRegisted.forEach(subjetc => {
        if (subjetc["Mã môn"] === this.codeSubjectSearch) {
          this.listSubjectRender.push(subjetc["Mã môn"]);
        }
      });
      if(this.listSubjectRender.length === 0){
        this.message = "Không có môn nào"
      }
    },

    chooseSubject: function(record, index) {
      this.subjectChoosed = this.listSubjectRender[index];
    },

    removeSubject: async function() {
      if(!this.subjectChoosed){
        // this.message = "Hãy chọn một môn";
        return;
      }
      let url = "/turn/" + this.subjectChoosed['Id'];
      let data = await axios.deleteAxios(url);
      if(!data.success){
        return;
      }
      this.loadSubjectRegisted();
      // something here
    },
  },

  mounted: async function() {
    await this.loadExam();
    await this.loadSubjectRegisted();
    if(this.listSubjectRender.length === 0){
      this.message = "Không có môn nào"
    }
  }
};
</script>
<style scoped>
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
  margin-top: 57px;
}

#btnRemove {
  position: absolute;
  right: 300px;
  top: 150px;
}

#registed {
  padding-left: 10px;
}
</style>