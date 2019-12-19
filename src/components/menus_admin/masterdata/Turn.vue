<template>
  <div id="turn">
     <b-form-input v-model="turn" placeholder="Nhập tên kỳ thi" id='name'></b-form-input>
     <br>
     <b-button :variant="variantSate">Thêm kỳ thi</b-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            turn:'',
        }
    },
    computed:{
        variantSate(){
            return this.turn!='' ? 'success':''
        }
    }
}
    
</script>

<style scoped>
#turn{
  text-align: center;
  margin: auto;
  position: relative;
  top: 142px;
}
#name{
    width: 600px;
    height: 45px;
    position: relative;
    text-align: center;
    margin: auto;
}
*{
  font-size: 14px;
}
</style>
