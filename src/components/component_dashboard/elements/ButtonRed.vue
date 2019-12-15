<template>
	<div id='renderbutton'>
		<a href="" v-if= "check" @mouseover="mouseOverdelay">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
			<img src="@/../public/icons/sign_out_1.png" width="20" height="20" id='sign_out'>
            Đăng xuất
        </a>
		<a href="" v-if= "!check" @mouseleave="mouseOver" id="adelay">
			<img src="@/../public/icons/sign_out_2.png" width="20" height="20" id='sign_out'>
            Đăng xuất
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
    		setTimeout(() => this.check = !this.check,1000);
  			}
    }
}
</script>

<style scoped>
		a{
			position: absolute;
            width: 137px;
			/* display: inline-block; */
            color: #ff0000;
			padding: 8px 15px;
			text-decoration: none;
			font-size: 18px;
			overflow: hidden;
			transform: 0.2s;
            top:54px;
            right: -2px;
		}
		#adelay:hover{
			color: #ffffff;
			background: #ff0000;
			box-shadow: 0 0 10px #ff0000, 0 0 40px #ff0000,0 0 80px #ff0000;
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
			background:  linear-gradient(90deg, transparent, #ff0000);
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
			background:  linear-gradient(270deg, transparent, #ff0000);
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
			background:  linear-gradient(270deg, transparent, #ff0000);
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
			background:  linear-gradient(270deg, transparent, #ff0000);
		}
		a:hover span:nth-child(4){
			bottom:100%;
			transition: 1s;
			transition-delay: 0.75s;
		}
</style>
