'use strict';

/**
 * 用于服务器的上传操作
 * tips: 未测试
 */
(function(){
    var currentInstance = null;

    class Resume {
        /**
         * @constructor
         * @param {string[]} edus
         * @param {string[]} works
         * 使用单例模式，防止实例化多个类
         */
        constructor() {
            if(Resume.instance){
                throw new Error('不能重复实例化类！');
            }
            this.id = null,
            this.name = null,
            this.photo = null,
            this.address = null,
            this.phone = null,
            this.mail = null,
            this.language = null,
            this.skill = null,
            this.hobby = null,
            this.related_info = null,
            this.edus = [],
            this.works = []
        }

        /**
         * @return {Resume} Resume.instance
         * 单例模式
         */
        static getInstance() {
            if (!Resume.instance) {
                Resume.instance = new Resume();
            }
            return Resume.instance;
        }

        /**
         * @param 打印信息，用于调试
         */
        print(){
            console.log(JSON.stringify(this));
        }

        /**
         * 得到数据
         */
        getResume(){
            return JSON.stringify(this);
        }
    }

    var resume = Resume.getInstance();
    /**
     * 初始化操作，包括按钮的绑定事件等
     */
    Resume.prototype.init = function(){
        $('#saveResume').on('click',function(){
            resume.setResume();
            var INSTANCE = resume.getResume();
            //resume.saveResume(INSTANCE);
        });



    }

    /**
     * 得到用户填表的信息
     */
    Resume.prototype.setResume = function(){
        var _self = this;
        this.id = $('input.resume-id').val();

        this.name = $('div.name').html();   //pass

        this.photo = $('div.photo').html();

        this.address = $('div.address').html(); //pass

        this.mail = $('div.mail').html();   //pass

        this.language = $('div.language').html();   //pass

        this.skill = $('div.skill').html(); //pass

        this.hobby = $('div.hobby').html(); //pass

        this.related_info = $('div.related-info').html();   //pass

        //pass
        $('.parent-edu .add-blank').each(function(edu) {
            var _edu = {};
            _edu.id = $(this).find('input.edu-exp-id').val();
            _edu.school = $(this).find('div.school').html();
            _edu.education = $(this).find('div.education').html();
            _edu.subject = $(this).find('div.subject').html();
            _edu.edu_experience = $(this).find('div.edu-experience').html();
            _edu.city = $(this).find('div.city').html();
            _edu.start_time = $(this).find('div.start-time').html();
            _edu.end_time = $(this).find('div.end-time').html();
            _self.edus.push(_edu);
        });
        //alert(JSON.stringify(this.edus[0]));

        //pass
        var spe = '|';
        $('.parent-work, .parent-practice').children('.add-blank').each(function(work) {

            if($(this).parent().hasClass('deleted')) {
                return;
            }
            var _work = {};
            _work.id = $(this).find('input.work-exp-id').val();
            _work.company = $(this).find('div.company').html();
            _work.company_des = $(this).find('div.company_des').html();
            _work.department = $(this).find('div.department').html();
            _work.position = $(this).find('div.position').html();
            $(this).find('div.experience-desc').each(function() {
                _work.experience_desc += spe + $(this).html().trim();
            });
            _work.experience_desc = _work.experience_desc.substring(spe.length);
            _work.city = $(this).find('div.city').html();
            _work.start_time = $(this).find('div.start-time').html();
            _work.end_time = $(this).find('div.end-time').html();
            _work.type = $(this).parent().attr('data-type');
            _self.works.push(_work);
        });
        //alert(JSON.stringify(this.works[0]));

    }

    /**
     * 保存信息，发送到服务器
     */
    Resume.prototype.saveResume = function(INSTANCE){
        var date = INSTANCE;
        $.ajax({
            url:'/main/save',
            type:'post',
            date:date,
            success:function(){

            },
            error:function(err){
                console.log(err);
            }
        })
    }

    resume.init();

    resume.print();

    var cs = function() {
       var Sys = {};
       var ua = navigator.userAgent.toLowerCase();
       window.ActiveXObject ? Sys.ie = ua.match(/msie ([\d.]+)/)[1] :
           document.getBoxObjectFor ? Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1] :
               window.MessageEvent && !document.getBoxObjectFor ? Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1] :
                   window.opera ? Sys.opera = ua.match(/opera.([\d.]+)/)[1] :
                       window.openDatabase ? Sys.safari = ua.match(/version\/([\d.]+)/)[1] : 0;

       //浏览器不支持
       if(Sys.ie){
           $('#waring').show();
       }
       if(Sys.firefox){
           $('#waring').show();
       }
       if(Sys.safari){
           $('#waring').show();
       }
   }

   //若浏览器不支持，则给出提示
   //cs();
   $('#waring_close').on("click",function () {
       $('#waring').hide();

   })

})();
