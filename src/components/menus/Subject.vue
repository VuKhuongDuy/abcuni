<template>
  <div id="subject">
    <div class="wrapper_table">
      <b-alert :variant="typeAlert" :show="dismissCountDown">{{message}}</b-alert>
      <h3 class="header">Danh sách môn đã học</h3>
      <b-table striped hover :items="listSubject" :fields="fields"></b-table>
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
      listSubject: []
    };
  },
  methods: {
    getListSubjectStudent: async function() {
      try {
        this.listSubject = [];

        // Duy cmt
        let url = config.listUrl.getListSubjectStudent + "/" + "1";
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
  mounted: function() {
    this.getListSubjectStudent();
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
  /* position: absolute; */
  width:100%;
  margin-left: 30px;
  height: 567px;
  overflow: scroll;
}
</style>