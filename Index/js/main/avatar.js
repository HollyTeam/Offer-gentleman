/**
* @param {function} init
* @param {function} rotateImage
* @param {function} saveImage
* @param {function} window.selectImage
*
* @see imagecropper.js
*/
(function(){
    var cropper;

    function init(){
        //绑定
        cropper = new ImageCropper(600, 600, 340, 420);
        cropper.setCanvas("cropper");
        cropper.addPreview("preview180");

        //检测用户浏览器是否支持imagecropper插件
        if(!cropper.isAvaiable()){
            alert("Sorry, your browser doesn't support FileReader, please use Firefox3.6+ or Chrome10+ to run it.");
        }
    }

    init();

    //旋转图片
    function rotateImage(e){
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

    //上传图片
    function saveImage(){
        //选个需要的大小
        var imgData = cropper.getCroppedImageData(180, 180);
        console.log("上传了："+imgData);
        //上传代码
        $.ajax({
            type:'post',
            url:'/site/avatar',
            data:{imgData:imgData},
            success: function(data){
                if(data){
                    $('#successMsg').slideDown();
                    location.reload();
                    setTimeout(function(){
                        $('#successMsg').slideUp();
                    },1500)
                }
            },
            error:function(err){
                console.log("error..."+err);

            }
        })
    }

    //打开本地图片
    window.selectImage = function(fileList){
        $('#oldAvatar').addClass('hide');
        $('#big-avatar').addClass('hide');
        rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

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

})();
