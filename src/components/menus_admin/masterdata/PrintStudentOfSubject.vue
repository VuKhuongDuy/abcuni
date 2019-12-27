
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
                <td style="min-width: 400px;">Môn thi: <b>{{subject}}</b></td>
                <td >Số tín chỉ: <b>{{credit}}</b></td>
            </tr>
            <tr>
                <td>Phòng thi: <b>{{room}}</b></td>
                <td>Ca thi: <b>{{turn}}</b></td>     
            </tr>
            <tr>
                <td>Ngày thi: <b>{{date}}</b></td>
                <td>Giờ thi: <b>{{time}}</b></td>
            </tr>
            <tr>
                
            </tr>
        </table>
    </div>
    <div class="content">
        <b-table striped hover :items="listSubjectRegisted" :fields="fields" small id='table'></b-table>
    </div>
    <div class="footer">
        <div>
            <i>Danh sách này có tổng số: {{number}} sinh viên!</i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'exam' : {
      type: String,
      require: true
    }
  },
  data() {
    return {
      subject:'Phát triển ứng dụng web',
      credit:'3',
      turn: '1',
      room: '306 GĐ2',
      date:"28/12/2019",
      time: '7h30',
      number: '80',
      name: '',
      mssv: '',
      school:"DTT",
      headerTitle: "Danh sách sinh viên dự thi học kỳ I, năm học 2019- 2020",
      fields:[
        {
          key:'stt',
          label:"STT",
        },
        {
          key:'mssv',
          label:"MSSV",
        },
        {
          key:'name',
          label:"Họ tên",
        },
        {
          key:'date',
          label:"Ngày sinh",
        },
        {
          key:'null_1',
          label:'Ký tên',
        },
        {
          key:'null_2',
          label:"Tổng số tờ",
        },
        {
          key:'null_3',
          label:"Ghi chú",
        },
      ],
      listSubjectRegisted: []
    };
  },
  methods: {
    // getUser: async function() {
    //   const data = await axios.getAxios("/user");
    //   if (!data || !data.success) {
    //     return;
    //   } else {
    //     this.name = data.data.username;
    //     this.mssv = data.data.mssv;
    //   }
    // },

    // loadSubjectRegisted: async function() {
    //   try {        
    //     this.listSubjectRegisted = [];
    //     let url = "/regist/" + this.exam + '/student';
    //     let data = await axios.getAxios(url);
    //     if (!data.success) {
    //       return;
    //     }

    //     data.data.forEach(turn => {
    //       let obj = {
    //         Id: turn.registed_id,
    //         "code_subject": turn.subject_code,
    //         "name_subject": turn.subject_name,
    //         "room": turn.room_name,
    //         "date": turn.date,
    //         "time": turn.time_begin,
    //       };
    //       this.listSubjectRegisted.push(obj);
    //     });        
    //   } catch (e) {
    //   }
    // },

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
.info table tr td{
    text-align: left;
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
