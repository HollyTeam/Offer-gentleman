$(document).ready(function(){
	function isMail(mail){
		var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if(re.test(mail)){
			return true;
		}else {
			return false;
		}
	}
	function showWrongMsg(msg){
		document.getElementById('wrong-msg').innerHTML = msg;
		$('#wrong-msg').slideDown();
	}

	$('.signin').on('click',function(evt){
		var mail = $('.mail').val().trim();
		var password = $('.password').val().trim();
		if(!isMail(mail)){
		  	evt.preventDefault();
		  	showWrongMsg('邮箱格式不规范');
		  	return;
	  	}
		
		$.ajax({
			type:'post',
			url:'/signin.do',
			data:{
				mail:mail,
				password:password
			},
			success:function(data){
				if(data.result === "true"){
					// showWrongMsg('密码不正确');
					window.location.href = "resumes.html";
				}else if(data.result === "false"){
					showWrongMsg("登录失败");
				}else if(data.result === "noUser"){
					showWrongMsg("用户不存在");
				}
			},

			error:function(err){
				console.log("error...");
			}
		})


	})


	$('.mail').focusin(function(){
		$('#wrong-msg').slideUp();
	})

	$('.password').focusin(function(){
		$('#wrong-msg').slideUp();
	})

})
