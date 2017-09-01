/**
 * Created by huangzhenyang on 2017/8/2.
 */

$(document).ready(function () {
    setOverlay();
    getData();

    getUserName(); //获取用户名
});


/*
 * @author:HuangZhenyang
 * 获取简历概览信息数据
 * */
function getData() {
    $.ajax({
        url: '/roughInfo.do',
        type: 'get',
        dataType: 'json'
    }).done(function (recvData) {
        setData(recvData);
    }).fail(function (xhr, status) {
        console.log(xhr + " " + status);
    });
}


/*
 * @author:HuangZhenyang
 * 插入dom
 * */
function setData(recvData) {
    let data = recvData.data;
    let imgUrl = "";
    let resumeHref = ""; //id
    let resumeTitle = "";
    let completeTime = "";

    let dom = "";
    let eachDom = "";

    let firstStyle = "";

    //如果历史简历数小于等于3，那么就只要在#effect-5 append三个概览简历信息
    //如果大于3，每4（≤4）个放在一个#effect-5这种里面,插在#container里面
    if (data.length <= 3) {
        for (let i = 0; i < data.length; i++) {
            imgUrl = data[i].imgUrl;
            resumeHref = data[i].resumeHref;
            resumeTitle = data[i].resumeTitle;
            if(resumeTitle === null){
                resumeTitle = "未命名";
            }
            completeTime = data[i].completeTime;

            eachDom = '<div class="img" style="width:20%;margin-left: 15px;margin-right:20px;" >' +
                '<img src="' + imgUrl + '" alt="" style="width:250px;height:320px;">' +
                '<div class="overlay" style="height:89%;">' +
                '<a href="' + resumeHref + '" class="expand">✎</a>' +
                '<a class="close-overlay hidden">x</a>' +
                '</div>' +
                '<div class="pi-price" style="width:90%"s>&nbsp;</div>' +
                '<div class="resume-info">' +
                '<h4 style="text-align:left;width:90%;">' + resumeTitle + '</h4>' +
                '<h5 style="text-align:left;width:90%;">' + completeTime + '</h5>' +
                '</div>' +
                '</div>';
            dom += eachDom;
        }
        $('#effect-5').append(dom);
    } else {
        //插入前三个
        for (let i = 0; i < 3; i++) {
            imgUrl = data[i].imgUrl;
            resumeHref = data[i].resumeHref;
            resumeTitle = data[i].resumeTitle;
            if(resumeTitle === null){
                resumeTitle = "未命名";
            }
            completeTime = data[i].completeTime;

            eachDom = '<div class="img" style="width:20%;margin-left: 15px;margin-right:20px;" >' +
                '<img src="' + imgUrl + '" alt="" style="width:250px;height:320px;">' +
                '<div class="overlay" style="height:89%;">' +
                '<a href="' + resumeHref + '" class="expand">✎</a>' +
                '<a class="close-overlay hidden">x</a>' +
                '</div>' +
                '<div class="pi-price" style="width:90%"s>&nbsp;</div>' +
                '<div class="resume-info">' +
                '<h4 style="text-align:left;width:90%;">' + resumeTitle + '</h4>' +
                '<h5 style="text-align:left;width:90%;">' + completeTime + '</h5>' +
                '</div>' +
                '</div>';
            dom += eachDom;
        }
        $('#effect-5').append(dom);
        //插入后面的
        dom = "";
        for (let i = 3; i < data.length; i++) {
            //加上外层div
            if ((i + 5) % 4 === 0) {
                dom += '<div id="effect-5" class="effects clearfix" style="background-color:#EFEFEF;width:auto;">';
                //设置一开头的那个历史简历的样式
                firstStyle = "width:20%;margin-left: 50px;margin-right:20px;";
            }else{
                firstStyle = "width:20%;margin-left: 15px;margin-right:20px;";
            }

            imgUrl = data[i].imgUrl;
            resumeHref = data[i].resumeHref;
            resumeTitle = data[i].resumeTitle;
            if(resumeTitle === null){
                resumeTitle = "未命名";
            }
            completeTime = data[i].completeTime;

            eachDom = '<div class="img" style="'+firstStyle+'">' +
                '<img src="' + imgUrl + '" alt="" style="width:250px;height:320px;">' +
                '<div class="overlay" style="height:89%;">' +
                '<a href="' + resumeHref + '" class="expand">✎</a>' +
                '<a class="close-overlay hidden">x</a>' +
                '</div>' +
                '<div class="pi-price" style="width:90%"s>&nbsp;</div>' +
                '<div class="resume-info">' +
                '<h4 style="text-align:left;width:90%;">' + resumeTitle + '</h4>' +
                '<h5 style="text-align:left;width:90%;">' + completeTime + '</h5>' +
                '</div>' +
                '</div>';
            dom += eachDom;
            //关闭外层div
            if ((i + 2) % 4 === 0) {
                dom += '</div>';
            }
        }
        $('#container').append(dom);
    }

    setOverlay();
}


/*
* @author:HuangZhenyang
* 设置overlay效果
* */
function setOverlay() {
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function (e) {
            if (!$(this).hasClass("hover")) {

                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {

                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function () {

            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
            .mouseleave(function () {
                $(this).removeClass("hover");
            });
    }
}



/*
 * @author:Huang Zhenyang
 * 获取当前用户用户名
 * */
function getUserName() {
    $.ajax({
        url: '/getUserName.do',
        dataType: "json",
        type: "get"
    }).done(function (data) {
        let app = new Vue({
            el: '#userName',
            data: {
                message: data.userName
            }
        });
    }).fail(function (xhr,status) {

    });
}






