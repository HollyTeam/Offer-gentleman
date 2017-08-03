/**
 * @author regaliastar
 * 使用装饰者模式，提高代码可复用性
 * @param {function} Function.before  函数插件
 * @param {function} window.checkRes  表单验证
 */

$(document).ready(function(){

    //若函数返回false，则终止，否则继续执行before前的函数
    //用法：function_1.before(function_2);
    //     先执行function_2,
    //     若function_2返回false，则不执行function_1,
    //     否则，继续执行function_1
    Function.prototype.before = function(beforefn){
        var _self = this;
        return function(){
            if(beforefn.apply(this,arguments) === false){
                //不再执行后面的函数
                return;
            }
            return _self.apply(this,arguments);
        }
    }

    var toastWarning = function(){
        var args = Array.prototype.slice.call(arguments);

        $.toast({
            heading: '<strong>提醒</strong>',
            text: args,
            icon: 'warning',
            showHideTransition: 'fade', //fade,slide,plain
            hideAfter: 60000, //false
            stack: 1, //the max number of toast, or false == 1
            position: 'bottom-right',
            loader: true,
            loaderBg: '#09b3ba'
        });
    }

    var validata = function(resume){
        var flag = false;

        if(!Util.isUserName(resume.name)){
            toastWarning('姓名格式有误');
            $('div.name').addClass('warn-border');
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return;
        }
        if(resume.address === ''){
            toastWarning('请填写地址');
            $('div.address').addClass('warn-border');
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return;
        }
        if(!Util.isTel(resume.phone)){
            toastWarning('电话格式有误');
            $('div.phone').addClass('warn-border');
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return;
        }
        if(!Util.isMail(resume.mail)){
            toastWarning('邮箱格式有误');
            $('div.mail').addClass('warn-border');
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return;
        }

        //教育背景
        resume.edus.forEach(function(i,index){
            if(flag)    return;
            if(i.school === ''){
                toastWarning('教育背景','请填写学校名称');
                $('html, body').animate({
                       scrollTop: $('.parent-edu').children('.add-blank').eq(index).find('div.school').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-edu').children('.add-blank').eq(index).find('div.school').addClass('warn-border');
                return;
            }
            if(i.city === ''){
                toastWarning('教育背景','请填写城市信息');
                $('html, body').animate({
                       scrollTop: $('.parent-edu').children('.add-blank').eq(index).find('div.city').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-edu').children('.add-blank').eq(index).find('div.city').addClass('warn-border');
                return;
            }
            if(i.province === ''){
                toastWarning('教育背景','请填写省份信息');
                $('html, body').animate({
                       scrollTop: $('.parent-edu').children('.add-blank').eq(index).find('div.province').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-edu').children('.add-blank').eq(index).find('div.province').addClass('warn-border');
                return;
            }
            if(i.college === ''){
                toastWarning('教育背景','请填写专业信息');
                $('html, body').animate({
                       scrollTop: $('.parent-edu').children('.add-blank').eq(index).find('div.college').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-edu').children('.add-blank').eq(index).find('div.college').addClass('warn-border');
                return;
            }
            if(i.end_time === ''){
                toastWarning('教育背景','请填写毕业时间');
                $('html, body').animate({
                       scrollTop: $('.parent-edu').children('.add-blank').eq(index).find('div.end-time').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-edu').children('.add-blank').eq(index).find('div.end-time').addClass('warn-border');
                return;
            }
        });

        //工作经历
        resume.works.forEach(function(i,index){
            if(flag)    return;
            if(i.company === ''){
                toastWarning('工作经历','请填写公司名称');
                $('html, body').animate({
                       scrollTop: $('.parent-works').children('.add-blank').eq(index).find('div.company').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-works').children('.add-blank').eq(index).find('div.company').addClass('warn-border');
                return;
            }
            if(i.city === ''){
                toastWarning('工作经历','请填写城市');
                $('html, body').animate({
                       scrollTop: $('.parent-works').children('.add-blank').eq(index).find('div.city').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-works').children('.add-blank').eq(index).find('div.city').addClass('warn-border');
                return;
            }
            if(i.province === ''){
                toastWarning('工作经历','请填写省份');
                $('html, body').animate({
                       scrollTop: $('.parent-works').children('.add-blank').eq(index).find('div.province').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-works').children('.add-blank').eq(index).find('div.province').addClass('warn-border');
                return;
            }
            if(i.position === ''){
                toastWarning('工作经历','请填写职位名称');
                $('html, body').animate({
                       scrollTop: $('.parent-works').children('.add-blank').eq(index).find('div.position').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-works').children('.add-blank').eq(index).find('div.position').addClass('warn-border');
                return;
            }
            if(i.project === ''){
                toastWarning('工作经历','请填写项目名称');
                $('html, body').animate({
                       scrollTop: $('.parent-works').children('.add-blank').eq(index).find('div.project').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-works').children('.add-blank').eq(index).find('div.project').addClass('warn-border');
                return;
            }
            if(i.start_time === '' || i.end_time === ''){
                toastWarning('工作经历','请填写起止时间');
                $('html, body').animate({
                       scrollTop: $('.parent-works').children('.add-blank').eq(index).find('div.start_time').offset().top-100
                   }, 800);
                flag = true;
                $('.parent-works').children('.add-blank').eq(index).find('div.start_time').addClass('warn-border');
                return;
            }
        });

        //领导经验
        resume.leader.organization.forEach(function(i,index){
            if(flag)    return;
            if(i.name === ''){
                toastWarning('领导经验','请填写学生社团名称');
                $('html, body').animate({
                       scrollTop: $('.leader').children('div.organization').eq(index).find('div.name').offset().top-100
                   }, 800);
                flag = true;
                $('.leader').children('div.organization').eq(index).find('div.name').addClass('warn-border');
                return;
            }
            if(i.position === ''){
                toastWarning('领导经验','请填写职位信息');
                $('html, body').animate({
                       scrollTop: $('.leader').children('div.organization').eq(index).find('div.position').offset().top-100
                   }, 800);
                flag = true;
                $('.leader').children('div.organization').eq(index).find('div.position').addClass('warn-border');
                return;
            }
            if(i.start_time === '' || i.end_time === ''){
                toastWarning('领导经验','请填写起止时间');
                $('html, body').animate({
                       scrollTop: $('.leader').children('div.organization').eq(index).find('div.start_time').offset().top-100
                   }, 800);
                flag = true;
                $('.leader').children('div.organization').eq(index).find('div.start_time').addClass('warn-border');
                return;
            }
        });

        resume.leader.club.forEach(function(i,index){
            if(flag)    return;
            if(i.name === ''){
                toastWarning('领导经验','请填写学生俱乐部名称');
                $('html, body').animate({
                       scrollTop: $('.leader').children('div.club').eq(index).find('div.name').offset().top-100
                   }, 800);
                flag = true;
                $('.leader').children('div.club').eq(index).find('div.name').addClass('warn-border');
                return;
            }
            if(i.position === ''){
                toastWarning('领导经验','请填写职位信息');
                $('html, body').animate({
                       scrollTop: $('.leader').children('div.club').eq(index).find('div.position').offset().top-100
                   }, 800);
                flag = true;
                $('.leader').children('div.club').eq(index).find('div.position').addClass('warn-border');
                return;
            }
            if(i.start_time === '' || i.end_time === ''){
                toastWarning('领导经验','请填写起止时间');
                $('html, body').animate({
                       scrollTop: $('.leader').children('div.club').eq(index).find('div.start_time').offset().top-100
                   }, 800);
                flag = true;
                $('.leader').children('div.club').eq(index).find('div.start_time').addClass('warn-border');
                return;
            }
        });

        if(flag){
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return false;
        }

        //技能&兴趣
        if(resume.skill.language === ''){
            toastWarning('技能&兴趣','请填写语言');
            $('html, body').animate({
                   scrollTop: $("div.language").offset().top-100
               }, 800);
            $("div.language").addClass('warn-border');
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return false;
        }
        if(resume.skill.computer === ''){
            toastWarning('技能&兴趣','请填写计算机');
            $('html, body').animate({
                   scrollTop: $("div.computer").offset().top-100
               }, 800);
            $("div.computer").addClass('warn-border');
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return false;
        }
        if(resume.skill.hobby === ''){
            toastWarning('技能&兴趣','请填写兴趣');
            $('html, body').animate({
                   scrollTop: $("div.hobby").offset().top-100
               }, 800);
            $("div.hobby").addClass('warn-border');
            $('.warn-border').on('click',function(evt){
                $(this).removeClass('warn-border');
            });
            return false;
        }
    }

    window.checkRes = function(resume){
        return validata(resume);
    }
});
