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
			url:'/signin',
			data:{
				mail:mail,
				password:password
			},
			success:function(data){
				if(data === 'wrongPw'){
					showWrongMsg('密码不正确');
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
