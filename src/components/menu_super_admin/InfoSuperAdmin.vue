<template>
    <div id="superadmin">
        <div class="info">
            <div>
                <label for="name">Tên hiển thị:</label>
                <b-form-input v-model="name" :state="nameState" type="text" class='info' id="name" placeholder="Enter your name"></b-form-input>
                <b-form-invalid-feedback id="name">Bạn chưa nhập tên thay đổi</b-form-invalid-feedback>
            </div>
            <div>
                <label for="user">Tên đăng nhập:</label>
                <b-form-input v-model="user" type="text" class='info' id="" placeholder="" disabled="true"></b-form-input>
            </div>
            <div>
                <label for="user1">Tên đăng nhập khác:</label>
                <b-form-input v-model="user1" :state="user1State" type="text" class='info' id="" placeholder="Add another username different"></b-form-input>
                <b-form-invalid-feedback id="eamil">Bạn phải nhập từ 4 kí tự</b-form-invalid-feedback>
            </div>
            <div>
                <label for="email">Email:</label>
                <b-form-input v-model="email" :state="emailState"  type="eamil" class='info' id="" placeholder="Enter your eamil"></b-form-input>
                <b-form-invalid-feedback id="eamil">Bạn chưa nhập email</b-form-invalid-feedback>
            </div>
            <div class="save">
                <b-button :variant="variantState" id="save">Lưu</b-button>
            </div>
            
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            name:"Super Admin",
            user:"superadmin",
            user1:"",
            email:'email@gmail.com',
        }
    },
    computed: {
      nameState() {
        return this.name.length > 1 ? true : false
      },
      emailState() {
        return this.email.length > 1 ? true : false
      },
      user1State() {
        return this.user1.length == 0 || this.user1.length > 3 ? true : false
      },
      variantState(){
        return (this.user1.length == 0 || this.user1.length > 3) && this.email.length > 1 && this.name.length > 1 ? 'success':'danger'
      }
    },
}
</script>
<style scoped>
.info{
    width: 300px;
    margin: auto;
}
#superadmin{
    position: relative;
    top: 85px;
}
#save{
    position: relative;
    float:right;
    top: 10px;
}
* {
  font-size: 14px;
}
</style>


