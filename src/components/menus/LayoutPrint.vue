<template>
    <div id="layoutPrint">
        <b-alert :variant="typeAlert" :show="dismissCountDown">{{message}}</b-alert>
       <b-form-select
        v-model="selectedExam"
        class="optionExam mt-3"
        :options="listExam"
        small
        ></b-form-select>
        <b-button :variant="variantSate" id="btnPrint" @click="printf" >Printf</b-button>
    </div>    
</template>
<script>
import * as axios from "../../../config/axios";
export default {
    data: function(){
        return {
            listExam: [{ value: null, text: "Please select an exam"}],
            selectedExam: null,
            message: "",
            dismissCountDown: 0,
            timeCountAlert: 5,
            typeAlert: "",
        }
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

        printf: async function(){
            if(!this.selectedExam ){
                this.changeTypeAlert("Haỹ chọn 1 kì thi bạn muốn in đăng kí học", "warning");
                return;
            }
            this.$router.push('/print/' + this.selectedExam);
        },

        changeTypeAlert: function(message, type) {
            this.message = message;
            this.typeAlert = type;
            this.dismissCountDown = this.timeCountAlert;
        }
    },
    mounted: function(){
        this.loadExam();
    },
    computed:{
        variantSate(){
            return this.selectedExam!= null ? 'success':''
        }
    }
}
</script>
<style scoped>
#layoutPrint{
    text-align: center;
    position: relative;
    top:100px;
}

#btnPrint{
    margin-top: 20px;
    position: relative;
    top: -2px;
}

.optionExam{
    width: 50%;
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