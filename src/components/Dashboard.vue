<template>
    <div id="dashboard">
        <div id = 'header'>
            <h1>This is header</h1>
        </div>
        <div id = 'body'>
            <div id = "left">
                <router-link to='/registertest'  tag='button' class="btn_router" >Đăng kí thi</router-link>
                <router-link to='/home'  tag='button' class="btn_router">abc</router-link>
                <router-link to='/home'  tag='button' class="btn_router">xyz</router-link>
            </div>
            <div id= 'right'>
                <router-view></router-view>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style scoped>
#dashboard{
    width: 100%;
    height: 100%;
}

#header{
    width: 100%;
    height: 70px;
    background-color: aquamarine;
    border-bottom: 4px double gray;
}
#body{
    display: flex;
}
#left{
    width: 15%;
    height: 700px;
    background-color: blue;
    display:block;
}

#right{
    width: 85%;
    height: 700px;
}

.btn_router{
    width: 100%;
    height: 30px;
}
</style>