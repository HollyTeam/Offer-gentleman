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
            resume.saveResume(INSTANCE);
        });

    }

    /**
     * 得到用户填表的信息
     */
    Resume.prototype.setResume = function(){
        var _self = this;
        this.id = $('input.resume-id').val();
        this.name = $('div.name').html();
        this.photo = $('div.photo').html();
        this.address = $('div.address').html();
        this.phone = $('div.phone').html();
        this.mail = $('div.mail').html();
        this.language = $('div.language').html();
        this.skill = $('div.skill').html();
        this.hobby = $('div.hobby').html();
        this.related_info = $('div.related-info').html();
        this.edus.splice(0, this.edus.length);
        $('.parent-edu .add-blank').each(function() {
            var _edu = clone(edu);
            _edu.id = $(this).find('input.edu-exp-id').val();
            _edu.school = $(this).find('div.school').html();
            _edu.education = Resume.fromType == 2 ? '无' : $(this).find('div.education').html();
            _edu.subject = $(this).find('div.subject').html();
            _edu.edu_experience = $(this).find('div.edu-experience').html();
            _edu.city = $(this).find('div.city').html();
            _edu.start_time = $(this).find('div.start-time').html();
            _edu.end_time = $(this).find('div.end-time').html();
            this.edus.push(_edu);
        });
        this.works.splice(0, this.works.length);
        $('.parent-work, .parent-practice').children('.add-blank').each(function() {

            if($(this).parent().hasClass('deleted')) {
                return;
            }
            var _work = clone(work);
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
            this.works.push(_work);
        });
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

    //resume.init();

    resume.print();
})();
