<template>
  <div id="exam">
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-input v-model="exam" placeholder="Nhập tên kỳ thi" id="name"></b-form-input>
    <br />
    <b-button :variant="variantState" @click="addExam">Thêm kỳ thi</b-button>
    <div class="wrapper_table">
      <b-table
        striped
        hover
        :items="listExam"
        id="tableExam"
        :fields="fields"
        head-variant="light"
        :no-border-collapse="noCollapse"
        sort-by.sync="room"
        sort-desc.sync="false"
        caption-top
        small
      >
        <template v-slot:cell(index)="data">
          <!--STT không bị thay đổi khi sort-->
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(delete)="row" class="mr-2">
          <!--button ở cột delete -->
          <b-button @click="deleteExam(row.value)">Xóa kì thi</b-button>
        </template>
      </b-table>
      <!-- head-variant: màu <th>-->
    </div>
  </div>
</template>

<script>
import * as axios from "../../../../config/axios";
export default {
  data() {
    return {
      exam: "",
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",
      listExam: [],
      noCollapse: false,
      fields: [
        {
          key: "index",
          label: "STT"
        },
        {
          key: "exam_name",
          label: "Kì thi",
          sortable: true
        },
        {
          key: "delete",
          label: "Xóa"
        }
      ]
    };
  },
  methods: {
    loadExam: async function() {
      try {
        this.dismissCountDown = 0;
        this.listExam = [];
        let url = "/exam";
        let data = await axios.getAxios(url);
        if (!data.success) {
          this.changeTypeAlert(data.message, "warning");
          return;
        }
        data.data.forEach((exam, index) => {
          let obj = {
            index: index,
            exam_name: exam.exam_name,
            delete: index
          };
          this.listExam.push(obj);
        });
        if (this.selectedExam === "")
          this.selectedExam = this.listExam[this.listExam.length - 1].value;
      } catch (e) {
        this.changeTypeAlert("SERVER gặp sự cố", "warning");
      }
    },

    addExam: async function() {
      this.dismissCountDown = 0;
      let url = "/admin/exam/add";
      let body = { nameExam: this.exam };
      let data = await axios.postAxios(url, body);
      if (!data.success) {
        this.changeTypeAlert(data.message, "warning");
        return;
      }
      await this.loadExam();
      this.changeTypeAlert(data.message, "success");
    },

    deleteExam: async function(index) {
      if (!window.confirm("Bạn có muốn xoá kì thi vừa chọn? ")) return;
      this.dismissCountDown = 0;
      let url = "/admin/exam/" + this.listExam[index].exam_name;
      let data = await axios.deleteAxios(url);
      if (!data.success) {
        this.changeTypeAlert(data.message, "warning");
        return;
      }
      await this.loadExam();
      this.changeTypeAlert(data.message, "success");
    },

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    }
  },
  mounted: function() {
    this.loadExam();
  },
  computed:{
    variantState(){
       return this.exam!=""? "success":''
    }
  }
};
</script>

<style scoped>
#exam {
  text-align: center;
  margin: auto;
  position: relative;
  /* top: 142px; */
}

.wrapper_table {
  height: 350px;
  width: 600px;
  /* border: 1px solid gray; */
  overflow: auto;
  margin-left: 351px;
  margin-top: 10px;
  background-color: white;
  box-shadow: #d9d2ba 0px 0px 7px;
}

#name {
  width: 600px;
  height: 45px;
  position: relative;
  text-align: center;
  margin: auto;
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
