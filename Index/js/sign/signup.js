$(document).ready(function(){

	//设置验证码倒计时
	var countdown=60;
	function settime(obj) {

		if (countdown === 0) {
			obj.removeAttribute("disabled");
			//obj.value="免费获取验证码";
			obj.innerHTML = "免费获取验证码";
			countdown = 60;
			return;
		} else {
			obj.setAttribute("disabled", 'true');
			//obj.value="重新发送(" + countdown + ")";
			obj.innerHTML = "重新发送(" + countdown + ")";
			countdown--;
		}
		setTimeout(function() {
			settime(obj) }
			,1000)
	}

	function showWrongMsg(msg){
		document.getElementById('wrong-msg').innerHTML = msg;
		$('#wrong-msg').slideDown();
	}

	function isMail(mail){
		var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if(re.test(mail)){
			return true;
		}else {
			return false;
		}
	}

	function isPassword(password){
		var re = /^[a-zA-Z\d]{6,16}$/;
		if(re.test(password)){
			return true;
		}else{
			return false;
		}
	}

	//得到验证码
	$('.getIdentify').on('click',function(evt){
	    //手机号码检测
	    var mail = $('.mail').val().trim();
	    if(!isMail(mail)){
	    	evt.preventDefault();
	    	showWrongMsg('邮箱格式不规范');
	    	return;
	    }

		$('.identify').removeAttr('disabled');
		settime(this);

		$.ajax({
			type:'post',
			url:"/signup/identify",
			data:{mail:mail},
			success:function(data){
				if(data){
					console.log("请求发送成功~"+data);
				}else{
					console.log("出现错误");
				}
			}
		})

	})

	$('.signup').on('click',function(evt){
		//邮箱检测
		var mail = $('.mail').val().trim();
		if(!isMail(mail)){
		 	evt.preventDefault();
		 	//$('#mail-wrong').slideDown();
		 	showWrongMsg('邮箱格式不规范');
		 	return;
	 	}
		//密码检测
		var password = $('.password').val().trim();
		if(!isPassword(password)){
			evt.preventDefault();
			//$('#pw-wrong').slideDown();
			showWrongMsg('密码由6-16位之间的数字或字母组成');
			return;
		}

	    //验证码检测
	    var code = $('.identify').val().trim();
	    if(code === ''){
	    	evt.preventDefault();
	    	//$('#iden-wrong').slideDown();
	    	showWrongMsg('验证码有误');
	    	return;
	    }

	    evt.preventDefault();

	    //向服务器发送ajax请求
	    $.ajax({
	    	type:'post',
	    	url:"/signup",
	    	data:{
	    		password:password,
	    		mail:mail,
	    		code:code,
	    	},
	    	success:function(data){
	  			
	    	},
	    	error:function(err){
	    		console.log("error...");
	    	}

	    })


	})


	$('.password').focusin(function(){
		$('#wrong-msg').slideUp();
	})

	$('.mail').focusin(function(){
		$('#wrong-msg').slideUp();
	})

	$('.identify').focusin(function(){
		$('#wrong-msg').slideUp();
	})

})
