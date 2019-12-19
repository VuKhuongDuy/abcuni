<template>
  <div id="student">
    <!-- import file -->
    <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
    <b-form-select
      v-model="selectedExam"
      class="optionExam mt-3"
      :options="listExam"
      size="sm"
      @change="loadSubjectRegisted"
    ></b-form-select>
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here"
      drop-placeholder="Drop file here..."
      multiple
      id="inputFileRoom"
      style="width:630px"
    ></b-form-file>
    <b-button id="submit" :variant="variantState">Thêm phòng thi</b-button>
    <i class='title'>
        *Danh sách các phòng thi
    </i>
    <br>
    <br>
    <div class="search">
          <b-form-input id="search_MSSV" type="search" style="width: 230px" placeholder="Tìm kiếm phòng thi..."></b-form-input>
    </div>
    <b-table
      striped
      hover
      :items="listStudent"
      id="tableTransitionExample"
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
          Xóa phòng thi
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
export default {
  data() {
    return {
      listExam: [{ value: null, text: "Please select an exam" }],
      selectedExam: "",
      message: "",
      dismissCountDown: 0,
      timeCountAlert: 5,
      typeAlert: "",

      headVariant: "light",
      stickyHeader: true,
      noCollapse: false,
      sortBy: "room",
      sortDesc: false,
      file: "",
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
          key: "number_of_computer",
          label:'Số lượng máy tính',
          sortable: true
        },
        {
          key: "delete",
          label: "Edit"
        }
      ],
      listStudent: [
        { room: "101-G2", number_of_computer: 20 },
        { room: "103-G2", number_of_computer: 14 },
        { room: "107-G2", number_of_computer: 12 },
        { room: "108-G2", number_of_computer: 16 },
        { room: "102-G2", number_of_computer: 18 }
      ]
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

    changeTypeAlert: function(message, type) {
      this.message = message;
      this.typeAlert = type;
      this.dismissCountDown = this.timeCountAlert;
    }
  },

  mounted: function() {
    this.loadExam();
  },
  computed: {
    variantState() {
      return this.file != "" ? "success" : "";
    }
  }
};
</script>

<style scoped>
#student{
  margin-left: 15px;
}

#btnSubmit {
  margin-left: 50px;  
}

#tableTransitionExample{
  margin-top: 20px;
  color: red;
}

.optionExam{
  width: 300px;
  display:block;
  margin-bottom: 10px;
}

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
.search{
  margin-bottom: 4px;
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
</style>
