/**
 * @author regaliastar
 * 该模块用来保存各种正则函数
 * 用于表单验证
 */

var Util = {};

/**
 * 该函数用来判断一个对象是否为空，如：
 *
 * isEmptyObject();	true
 * isEmptyObject({});	true
 * isEmptyObject(null);	true
 * isEmptyObject(2233);	true
 * isEmptyObject({"name":"kiana"});	false
 */
Util.isEmptyObject = function(e){
	var t;
	for(t in e)
		return !1;
	return !0;
}

/**
 * 使用正则表达式判断输入是否为手机号码
 * 以下条件均满足则输出true:
 *
 * 1、长度13
 * 2、以1开头
 *
 * 如：123-4567-8901
 */
Util.isTel = function isTel(Tel){
	var re= /^1\S{12,13}$/;

	if(re.test(Tel)){
		return true;
	}else{
		return false;
	}
}

/**
 * 长度 1-10
 */
Util.isUserName = function isUserName(str){
	var re = /^\S{1,10}$/;
	if(re.test(str)){
		return true;
	}else{
		return false;
	}
}

/**
 * 邮箱
 */
Util.isMail = function(mail){
	var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if(re.test(mail)){
		return true;
	}else {
		return false;
	}
}
