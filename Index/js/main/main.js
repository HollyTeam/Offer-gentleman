'use strict';

/**
 * 用于服务器的上传操作
 * tips: 未测试
 * @param {function} Resume.prototype.setResume -- 用于得到整张表单数据
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
            this.name = null,
            this.address = null,
            this.phone = null,
            this.mail = null,
            this.edus = {},
            this.works = [],
            this.leader = {},
            this.skill = {},
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

        this.name = $('div.name').html();

        this.address = $('div.address').html();

        this.phone = $('div.phone').html();

        this.mail = $('div.mail').html();

        this.skill.language = $('div.language').html();

        this.skill.computer = $('div.computer').html();

        this.skill.hobby = $('div.hobby').html();

        //pass
        this.edus.school = $('.edus').find('div.school').html();
        this.edus.city = $('.edus').find('div.city').html();
        this.edus.province = $('.edus').find('div.province').html();
        this.edus.college = $('.edus').find('div.college').html();
        this.edus.end_time = $('.edus').find('div.end-time').html();
        this.edus.grade = $('.edus').find('div.grade').html();
        this.edus.honors = $('.edus').find('div.honors').html();
        this.edus.related_course = $('.edus').find('div.related_course').html();
        //alert(JSON.stringify(this.edus));

        //pass
        var spe = '#|#';

        $('.parent-works').children('.add-blank').each(function(work) {
            if($(this).parent().hasClass('deleted')) {
                return;
            }
            var _work = {};
            _work.company = $(this).find('div.company').html();
            _work.city = $(this).find('div.city').html();
            _work.province = $(this).find('div.province').html();
            _work.position = $(this).find('div.position').html();
            _work.project = $(this).find('div.project').html();
            _work.start_time = $(this).find('div.start-time').html();
            _work.end_time = $(this).find('div.end-time').html();
            _work.sentence_1 = $(this).find('div.sentence_1').html();
            _work.sentence_2 = $(this).find('div.sentence_1').html();
            _work.sentence_3 = $(this).find('div.sentence_1').html();
            _work.sentence_4 = $(this).find('div.sentence_1').html();
            _self.works.push(_work);
        });
        //alert(JSON.stringify(this.works[0]));

        $('.leader').find('div.organization').children().each(function(org){
            var _organization = {};
            var _organization.name = $(this).find('div.name').html();
            var _organization.position = $(this).find('div.position').html();
            var _organization.start_time = $(this).find('div.start_time').html();
            var _organization.end_time = $(this).find('div.end_time').html();
            var _organization.sentence_1 = $(this).find('div.sentence_1').html();
            var _organization.sentence_2 = $(this).find('div.sentence_2').html();
            var _organization.sentence_3 = $(this).find('div.sentence_3').html();
            _self.leader.organization.push(_organization);
        })

        $('.leader').find('div.club').children().each(function(clu){
            var _club = {};
            var _club.name = $(this).find('div.name').html();
            var _club.position = $(this).find('div.position').html();
            var _club.start_time = $(this).find('div.start_time').html();
            var _club.end_time = $(this).find('div.end_time').html();
            var _club.sentence_1 = $(this).find('div.sentence_1').html();
            var _club.sentence_2 = $(this).find('div.sentence_2').html();
            _self.leader.club.push(_club);
        })

    }

    /**
     * 保存信息，发送到服务器
     */
    Resume.prototype.saveResume = function(INSTANCE){
        var date = INSTANCE;
        $.ajax({
            url:'/main',
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
   cs();
   $('#waring_close').on("click",function () {
       $('#waring').hide();

   })

})();
