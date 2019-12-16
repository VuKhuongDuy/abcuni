<template>
	<div id='renderbutton'>
		<a href="" v-if= "check" @mouseover="mouseOverdelay">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
			<img src="@/../public/icons/notification_1.png" width="18" height="20" id='notification'>
            Thông báo
        </a>
		<a href="" v-if= "!check" @mouseleave="mouseOver" id="adelay">
			<img src="@/../public/icons/notification_2.png" width="18" height="20" id='notification'>
            Thông báo
        </a>
	</div>
</template>

<script>
import { delay } from 'q'
export default {
	data(){
		return{
			check: true,
		}
	},
	methods: {
        mouseOver: function(){
			this.check=!this.check
		},
		mouseOverdelay() {
    		setTimeout(()=>this.check = !this.check,1000);
  			}
    }
}
</script>

<style scoped>
		a{
			position: absolute;
			width: 140px;
			/* display: inline-block; */
			padding: 8px 15px;
			text-decoration: none;
			font-size: 18px;
			overflow: hidden;
			transform: 0.2s;
			top: 54px;
			right: 294px;
		}
		#adelay:hover{
			color: #255784;
			background: #2196f3;
			box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3,0 0 80px #2196f3;
			color: white;
			/* transition-delay: 1s; */
		}
		a span{
			position: absolute;
			display: block;
		}
		a span:nth-child(1){
			top: 0;
			left: -100%;
			width:100%;
			height: 2px;
			background:  linear-gradient(90deg, transparent, #2196f3);
		}
		a:hover span:nth-child(1){
			left:100%;
			transition: 1s;
		}
		a span:nth-child(3){
			bottom: 0;
			right: -100%;
			width:100%;
			height: 2px;
			background:  linear-gradient(270deg, transparent, #2196f3);
		}
		a:hover span:nth-child(3){
			right:100%;
			transition: 1s;
			transition-delay: 0.5s;
		}
		a span:nth-child(2){
			top: -100%;
			right: 0;
			width:2px;
			height: 100%;
			background:  linear-gradient(270deg, transparent, #2196f3);
		}
		a:hover span:nth-child(2){
			top:100%;
			transition: 1s;
			transition-delay: 0.25s;
		}
		a span:nth-child(4){
			bottom: -100%;
			left: 0;
			width:2px;
			height: 100%;
			background:  linear-gradient(270deg, transparent, #2196f3);
		}
		a:hover span:nth-child(4){
			bottom:100%;
			transition: 1s;
			transition-delay: 0.75s;
		}
</style>
