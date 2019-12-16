<template>
	<div id="subject">
		<div class="wrapper_table">
			<h3 class="header">Danh sách môn đã học</h3>
			<b-table striped hover :items="listSubject" :fields="fields"></b-table>
		</div>
	</div>
</template>
<script>
import * as config from '../../../config/config';
import * as axios from '../../../config/axios';
export default {
    data: function(){
		return{
			fields: [
				{
					key: 'Mã môn học'
				},
				{
					key: 'Tên môn học',
					sortable: true
				},
				{
					key: 'Số tín chỉ',
					sortable: true
				},
				{
					key: 'Được thi',
					sortable: true
				}
			],
			listSubject: []

		}
	},
	methods: {
		getListSubjectStudent: async function(){
			this.listSubject = [];

			// Duy cmt
			let url = config.listUrl.getListSubjectStudent+'/'+'1';
			let data = await axios.getAxios(url);
			data.data.forEach(subject => {
				let sub = {
					isActive: true,
					'Mã môn học': subject.subject_code, 
					'Tên môn học': subject.subject_name, 
					"Số tín chỉ": subject.credit,
					'Được thi': subject.enable_test
				};
				this.listSubject.push(sub);
			});
		}
	},
	mounted: function(){
		this.getListSubjectStudent();
	}
}
</script>
<style scoped>
	#subject{
		text-align: center;
	}
	.header{
		margin-top: 10px;
		margin-bottom: 20px; 

	}
	.wrapper_table{
		width: 80%;
		margin-left: 30px;
		height: 400px;
		overflow:scroll;
	}
</style>