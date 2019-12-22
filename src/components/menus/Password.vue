<template>
    <div id="password">
        <b-alert :variant="typeAlert" class="alert" :show="dismissCountDown">{{message}}</b-alert>
        <b-form-input
            v-model="username"
            placeholder="Tài khoản"
            class="input"
            id="username"
            v-on:keyup.enter="nextLine('username')"
        ></b-form-input>
        <b-form-input
            v-model="oldPassword"
            placeholder="Mật khẩu cũ"
            class="input"
            id="oldPass"
            type="password"
            v-on:keyup.enter="nextLine('old')"
        ></b-form-input>
        <b-form-input
            v-model="newPassword"
            placeholder="Mật khẩu mới"
            class="input"
            id="newPass"
            type="password"
            v-on:keyup.enter="nextLine('new')"
        ></b-form-input>
        <b-form-input
            v-model="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            class="input"
            id="confirmPass"
            type="password"
            v-on:keyup.enter="saveChange"
        ></b-form-input>
        <b-button variant="success" id="btnSave" @click="saveChange">Lưu</b-button>
    </div>    
</template>
<script>
import * as axios from '../../../config/axios'
export default {
    name: "password",
    data: function(){
        return {
            message: "",
            dismissCountDown: 0,
            timeCountAlert: 5,
            typeAlert: "",
            username: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    methods: {
        nextLine: function(typePass){
            if(typePass === 'username') document.getElementById('oldPass').focus();
            else if(typePass === 'old') document.getElementById('newPass').focus();
            else document.getElementById('confirmPass').focus();
        },

        saveChange: async function(){
            this.dismissCountDown = 0;
            if(!window.confirm('Bạn có muốn thay đổi mật khẩu?')){
                return;
            }
            let url = '/changepassword';
            let body = {
                username: this.username, 
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword
            };
            let data = await axios.putAxios(url, body);
            if(!data.success){
                this.typeAlert = 'warning'
            }else this.typeAlert = 'success'
            this.changeTypeAlert(data.message, this.typeAlert);
        },

        changeTypeAlert: function(message, type) {
            this.message = message;
            this.typeAlert = type;
            this.dismissCountDown = this.timeCountAlert;
        }
    }
}
</script>
<style scoped>


#btnSave{
    margin-top: 20px;
}

#password{
    padding-top: 150px;
    text-align: center;
}

/* .alert{
  width: 50%;
  margin-left: 25%;
} */

.input{
    width: 200px;
    margin-left: 42%;
    margin-top: 15px;
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