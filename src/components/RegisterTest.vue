<template>
    <div id = 'registerTest'>
        <b-breadcrumb :items="items" ></b-breadcrumb>
        <b-form-select v-model="selectedExam" :options="optionsExam" id="selectExam" class="select"></b-form-select>
        <b-form-select v-model="selectedSubject" :options="optionsSubject" id="selectSubject" class="select"></b-form-select>
        <b-form-select v-model="selectedTurn" :options="optionsTurn" id="selectTurn" class="select" @change="loadRoom"></b-form-select>
        <!-- <div v-for="(room, index) in listRoom" :key="index">
            <b-button variant="outline-primary">{{room}}</b-button>
        </div> -->
        <b-table striped hover :items="listRoom" class="room"></b-table>
        <b-button variant="success" id="btnRegisterTest">Đăng kí</b-button>
        <b-table striped hover :items="subjectRegisted" class="subjectRegisted" :style="{width: '900px', maxwidth: '600px'}"></b-table>
    </div>
</template>
<script>
export default {
    name: 'registertest',
    data () {
        return {
            items: [
                {
                    text: 'Admin',
                    href: '#'
                },
                {
                    text: 'Manage',
                    href: '#'
                },
                {
                    text: 'Library',
                    active: true
                }
            ],
            selectedExam: null,
            selectedSubject: null,
            selectedTurn: null,
            optionsExam: [
                { value: null, text: 'Exam' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            optionsSubject: [
                { value: null, text: 'Exam' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            optionsTurn: [
                { value: null, text: 'Exam' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            listRoom: [
                {id: '301GD2', computer: 30, registed: 20},
                {id: '302GD2', computer: 30, registed: 25},
                {id: '303GD2', computer: 30, registed: 30},
                {id: '304GD2', computer: 30, registed: 20}
            ],
            listRoomRender: [],
            subjectRegisted: [
                {"Kì thi": 'HK I 2018-2019', "Môn học": 'Hệ quản trị cơ sở dữ liệu', 'Ca thi': 'Ca 1 (06:00 12-12-2019)',"Phòng thi": '301GD2'},
                {"Kì thi": 'HK I 2018-2019', "Môn học": 'Hệ quản trị cơ sở dữ liệu', 'Ca thi': 'Ca 1 (06:00 12-12-2019)',"Phòng thi": '301GD2'},
                {"Kì thi": 'HK I 2018-2019', "Môn học": 'Hệ quản trị cơ sở dữ liệu', 'Ca thi': 'Ca 1 (06:00 12-12-2019)',"Phòng thi": '301GD2'},
                {"Kì thi": 'HK I 2018-2019', "Môn học": 'Hệ quản trị cơ sở dữ liệu', 'Ca thi': 'Ca 1 (06:00 12-12-2019)',"Phòng thi": '301GD2'},
                {"Kì thi": 'HK I 2018-2019', "Môn học": 'Hệ quản trị cơ sở dữ liệu', 'Ca thi': 'Ca 1 (06:00 12-12-2019)',"Phòng thi": '301GD2'},
            ]
        }
    },
    methods: {
        loadRoom: function(){
            
        }
    }
}
</script>
<style>

#registerTest{
    padding-left: 60px;
}


#selectExam{
    width: 200px;
}

#selectSubject{
    width: 400px;
}

#selectTurn{
    width: 200px;
}

#btnRegisterTest{
    margin-left: 400px;
}

.subjectRegisted{
    margin-top: 10px;
}

.breadcrumb{
    margin-left: -60px;
}

.room{
    margin-top: 10px;
    width: 900px;
}

.select{
    margin-right: 15px;
}
</style>