
<template>
  <div id="printf">
    <div class="header">
        <table>
            <tr>
                <td class="headerName">Đại Học ABC</td>
                <td class="headerVN" >CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</td>
            </tr>
            <tr>
                <td></td>
                <td class="headerVN"><b> Độc lập- Tự do- hạnh Phúc</b></td>
            </tr>
        </table>
    </div>
    <div id="headerTitle">
        {{headerTitle}}
    </div>
    <div class="info">
        <table>
            <tr>
                Họ tên: <b>{{name}}</b>
            </tr>
            <tr>
                MSSV: <b>{{mssv}}</b>
            </tr>
            <tr>
                Ngày sinh: <b>{{birth_day}}</b>
            </tr>
        </table>
    </div>
    <div class="content">
        <b-table striped hover :items="listSubjectRegisted" :fields="fields" small id='table'></b-table>
    </div>
    <div class="footer">
        <table style="width:100%">
            <tr>
                <td style="font-size: 18px;font-weight:bold;">Sinh viên</td>
                <td style="font-size: 18px;font-weight:bold;">Hà Nội, ngày 24 tháng 12 năm 2019</td>
            </tr>
            <tr>
                <td><i>(Ký và ghi rõ họ tên)</i></td>
                <td><i>(Xác nhận phía nhà trường)</i></td>
            </tr>
            <tr>
                <td style="padding: 55px;"><b>{{name}}</b></td>
                <td><b>{{school}}</b></td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import * as axios from '../../../config/axios'
export default {
  props: {
    'exam' : {
      type: String,
      require: true
    }
  },
  data() {
    return {
      name: '',
      mssv: '',
      school:"DTT",
      headerTitle: "Lịch đăng kí thi học kỳ I, năm học 2019- 2020",
      fields:[
        {
          key:'',
          label:"STT",
        },
        {
          key:'code_subject',
          label:"Mã môn thi",
        },
        {
          key:'name_subject',
          label:"Tên môn thi",
        },
        {
          key:'date',
          label:"Ngày thi",
        },
        {
          key:'time',
          label:'Giờ thi',
        },
        {
          key:'room',
          label:"Phòng thi",
        },
      ],
      listSubjectRegisted: []
    };
  },
  methods: {
    getUser: async function() {
      const data = await axios.getAxios("/user");
      if (!data || !data.success) {
        return;
      } else {
        this.name = data.data.username;
        this.mssv = data.data.mssv;
      }
    },

    loadSubjectRegisted: async function() {
      try {        
        this.listSubjectRegisted = [];
        let url = "/regist/" + this.exam + '/student';
        let data = await axios.getAxios(url);
        if (!data.success) {
          return;
        }

        data.data.forEach(turn => {
          let obj = {
            Id: turn.registed_id,
            "code_subject": turn.subject_code,
            "name_subject": turn.subject_name,
            "room": turn.room_name,
            "date": turn.date,
            "time": turn.time_begin,
          };
          this.listSubjectRegisted.push(obj);
        });        
      } catch (e) {
      }
    },

    print() {
      window.print();
    }
  },
  mounted: async function(){
    this.exam = this.$route.params.exam_id;
    await this.getUser();
    await this.loadSubjectRegisted();
      setTimeout(function(){
          print();
        }, 1);
  }
};
</script>

<style scoped>
/* header  */
#printf{
  margin: 10px;
}

*{
    border-collapse: collapse;
    text-align: center;
}
.headerName{
    width: 60%;
    font-size: 17px;
    font-weight: bold;
}
.headerVN{
    font-size: 18px;
}
#headerTitle{
    margin:30px 0 30px 0;
    font-size: 25px;
    font-weight: bold;
}
.content{
    margin: 20px 0 20px 0;
}
#table{
  border: 1px solid #d9d9d9;
}
.info table tr{
    text-align: left;
    font-weight: initial
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
#bottom{
    padding:20px 0 0;
}
</style>
