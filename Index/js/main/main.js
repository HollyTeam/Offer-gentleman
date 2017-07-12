'use strict';

/**
 * 用于服务器的上传操作
 * tips: 未测试
 * @param {function} Resume.prototype.setResume -- 用于得到整张表单数据
 */
(function(){
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
            this.leader.organization = [],
            this.leader.club = [],
            this.skill = {}
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
         * @return {JSON} this
         * 得到数据
         */
        getResume(){
            return JSON.stringify(this);
        }
    }


    /**
     * 初始化操作，包括按钮的绑定事件等
     */
    Resume.prototype.init = function(){
        $('#saveResume').on('click',function(){
            resume.setResume();
            var INSTANCE = resume.getResume();
            resume.saveResume(INSTANCE);
            Avatar.saveImage();
            alert(JSON.stringify(INSTANCE));
        });
    }

    /**
     * 得到用户填表的信息
     */
    Resume.prototype.setResume = function(){
        var _self = this;

        this.name = $('div.name').html();   //pass
        //alert('name: '+this.name);
        this.address = $('div.address').html();   //pass

        this.phone = $('div.phone').html();   //pass

        this.mail = $('div.mail').html();   //pass

        this.skill.language = $('div.language').html();   //pass

        this.skill.computer = $('div.computer').html();   //pass

        this.skill.hobby = $('div.hobby').html();   //pass

        //pass
        this.edus.school = $('.edus').find('div.school').html();   //pass

        this.edus.city = $('.edus').find('div.city').html();   //pass

        this.edus.province = $('.edus').find('div.province').html();   //pass

        this.edus.college = $('.edus').find('div.college').html();   //pass

        this.edus.end_time = $('.edus').find('div.end-time').html();   //pass

        this.edus.grade = $('.edus').find('div.grade').html();   //pass

        this.edus.honors = $('.edus').find('div.honors').html();    //字数大于3会出现br标签
        //alert(this.edus.honors);
        this.edus.related_course = $('.edus').find('div.related_course').html();    //字数大于3会出现br标签
        //alert(this.edus.related_course);
        //alert(JSON.stringify(this.edus));

        var spe = '#|#';
        //pass
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
            _work.start_time = $(this).find('div.start_time').html();
            _work.end_time = $(this).find('div.end_time').html();
            _work.sentence_1 = $(this).find('div.sentence_1').html();
            _work.sentence_2 = $(this).find('div.sentence_2').html();
            _work.sentence_3 = $(this).find('div.sentence_3').html();
            _work.sentence_4 = $(this).find('div.sentence_4').html();
            _self.works.push(_work);
        });
        //alert(JSON.stringify(_self.works));
        //pass
        $('.leader').children('div.organization').each(function(org){
            var _organization = {};
            _organization.name = $(this).find('div.name').html();
            _organization.position = $(this).find('div.position').html();
            _organization.start_time = $(this).find('div.start_time').html();
            _organization.end_time = $(this).find('div.end_time').html();
            _organization.sentence_1 = $(this).find('div.sentence_1').html();
            _organization.sentence_2 = $(this).find('div.sentence_2').html();
            _organization.sentence_3 = $(this).find('div.sentence_3').html();
            _self.leader.organization.push(_organization);
        })
        //alert(JSON.stringify(this.leader.organization));
        //pass
        $('.leader').children('div.club').each(function(clu){
            var _club = {};
            _club.name = $(this).find('div.name').html();
            _club.position = $(this).find('div.position').html();
            _club.start_time = $(this).find('div.start_time').html();
            _club.end_time = $(this).find('div.end_time').html();
            _club.sentence_1 = $(this).find('div.sentence_1').html();
            _club.sentence_2 = $(this).find('div.sentence_2').html();
            _self.leader.club.push(_club);
        })
        //alert(JSON.stringify(this.leader.club));
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


   /**
    * @param {function} init
    * @param {function} rotateImage
    * @param {function} saveImage
    * @param {function} window.selectImage
    *
    * @see imagecropper.js
    */
    var cropper;
    class Avatar{
        /**
         * @constructor
         */
        constructor(){
            throw new Error('Avatar 不能使用构造函数');
        }
    }
    Avatar.init = function(){
        //绑定
        cropper = new ImageCropper(600, 600, 340, 420);
        cropper.setCanvas("cropper");
        cropper.addPreview("preview180");

        //检测用户浏览器是否支持imagecropper插件
        if(!cropper.isAvaiable()){
            alert("Sorry, your browser doesn't support FileReader, please use Firefox3.6+ or Chrome10+ to run it.");
        }
    }

    Avatar.rotateImage = function(e){
        switch(e.target.id)
        {
            case "rotateLeftBtn":
            cropper.rotate(-90);
            break;
            case "rotateRightBtn":
            cropper.rotate(90);
            break;
        }
    }

    Avatar.saveImage = function(){
        //选个需要的大小
        var imgData = cropper.getCroppedImageData(180, 180);
        console.log("上传了："+imgData);
        alert("上传了："+imgData);
        //上传代码
        $.ajax({
            type:'post',
            url:'/site/avatar',
            data:{imgData:imgData},
            success: function(data){

            },
            error:function(err){
                console.log("error..."+err);

            }
        })
    }

    Avatar.selectImage = function(fileList){
        $('#oldAvatar').addClass('hide');
        $('#big-avatar').addClass('hide');
        var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

        if(!rFilter.test(fileList[0].type)){
            alert("文件格式不正确");
            return ;
        }else{
            //隐藏预览图片，显示裁剪图片
            document.getElementById('uploadCoverImg').style.display='none';
            document.getElementById('preview180').style.display='block';
            document.getElementById('showModal').click();
            cropper.loadImage(fileList[0]);
        }
    }

   //打开本地图片
   window.selectImage = Avatar.selectImage;

   var resume = Resume.getInstance();
   resume.init();
   Avatar.init();

})();
