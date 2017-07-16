'use strict';

/**
 * 用于服务器的上传操作
 * tips: 未测试
 * @param {function} Resume.prototype.setResume -- 用于得到整张表单数据
 */
(function () {
	class Resume {
		/**
		 * @constructor
		 * @param {string[]} edus
		 * @param {string[]} works
		 * 使用单例模式，防止实例化多个类
		 */
		constructor() {
			if (Resume.instance) {
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
		print() {
			console.log(JSON.stringify(this));
		}

		/**
		 * @return {JSON} this
		 * 得到数据
		 */
		getResume() {
			return JSON.stringify(this);
		}
	}


	/**
	 * 初始化操作，包括按钮的绑定事件等
	 */
	Resume.prototype.init = function () {
		$('#saveResume').on('click', function () {
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
	Resume.prototype.setResume = function () {
		var _self = this;

		this.name = $('div.name').html(); //pass
		//alert('name: '+this.name);
		this.address = $('div.address').html(); //pass

		this.phone = $('div.phone').html(); //pass

		this.mail = $('div.mail').html(); //pass

		this.skill.language = $('div.language').html(); //pass

		this.skill.computer = $('div.computer').html(); //pass

		this.skill.hobby = $('div.hobby').html(); //pass

		//pass
		this.edus.school = $('.edus').find('div.school').html(); //pass

		this.edus.city = $('.edus').find('div.city').html(); //pass

		this.edus.province = $('.edus').find('div.province').html(); //pass

		this.edus.college = $('.edus').find('div.college').html(); //pass

		this.edus.end_time = $('.edus').find('div.end-time').html(); //pass

		this.edus.grade = $('.edus').find('div.grade').html(); //pass

		this.edus.honors = $('.edus').find('div.honors').html(); //字数大于3会出现br标签
		//alert(this.edus.honors);
		this.edus.related_course = $('.edus').find('div.related_course').html(); //字数大于3会出现br标签
		//alert(this.edus.related_course);
		//alert(JSON.stringify(this.edus));

		var spe = '#|#';
		//pass
		$('.parent-works').children('.add-blank').each(function (work) {
			if ($(this).parent().hasClass('deleted')) {
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
		$('.leader').children('div.organization').each(function (org) {
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
		$('.leader').children('div.club').each(function (clu) {
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
	Resume.prototype.saveResume = function (INSTANCE) {
		var date = INSTANCE;
		$.ajax({
			url: '/main',
			type: 'post',
			date: date,
			success: function () {

			},
			error: function (err) {
				console.log(err);
			}
		})
	}



	var cs = function () {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		window.ActiveXObject ? Sys.ie = ua.match(/msie ([\d.]+)/)[1] :
			document.getBoxObjectFor ? Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1] :
			window.MessageEvent && !document.getBoxObjectFor ? Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1] :
			window.opera ? Sys.opera = ua.match(/opera.([\d.]+)/)[1] :
			window.openDatabase ? Sys.safari = ua.match(/version\/([\d.]+)/)[1] : 0;

		//浏览器不支持
		if (Sys.ie) {
			$('#waring').show();
		}
		if (Sys.firefox) {
			$('#waring').show();
		}
		if (Sys.safari) {
			$('#waring').show();
		}
	}

	//若浏览器不支持，则给出提示
	//cs();
	$('#waring_close').on("click", function () {
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
	class Avatar {
		/**
		 * @constructor
		 */
		constructor() {
			throw new Error('Avatar 不能使用构造函数');
		}
	}
	Avatar.init = function () {
		//绑定
		cropper = new ImageCropper(600, 600, 340, 420);
		cropper.setCanvas("cropper");
		cropper.addPreview("preview180");

		//检测用户浏览器是否支持imagecropper插件
		if (!cropper.isAvaiable()) {
			alert("Sorry, your browser doesn't support FileReader, please use Firefox3.6+ or Chrome10+ to run it.");
		}
	}

	Avatar.rotateImage = function (e) {
		switch (e.target.id) {
			case "rotateLeftBtn":
				cropper.rotate(-90);
				break;
			case "rotateRightBtn":
				cropper.rotate(90);
				break;
		}
	}

	Avatar.saveImage = function () {
		//选个需要的大小
		var imgData = cropper.getCroppedImageData(180, 180);
		console.log("上传了：" + imgData);
		alert("上传了：" + imgData);
		//上传代码
		$.ajax({
			type: 'post',
			url: '/site/avatar',
			data: {
				imgData: imgData
			},
			success: function (data) {

			},
			error: function (err) {
				console.log("error..." + err);

			}
		})
	}

	Avatar.selectImage = function (fileList) {
		$('#oldAvatar').addClass('hide');
		$('#big-avatar').addClass('hide');
		var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

		if (!rFilter.test(fileList[0].type)) {
			alert("文件格式不正确");
			return;
		} else {
			//隐藏预览图片，显示裁剪图片
			document.getElementById('uploadCoverImg').style.display = 'none';
			document.getElementById('preview180').style.display = 'block';
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


/*
 *  简历填写提示 jquery toast.    鼠标点击div的时候出现提示
 *  author: hzy
 */
//                         个人信息
$('.resume-uname').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(个人信息)',
		text: ['只需要 姓名 住址 电话 邮箱，其他都不需要，除了有的要特殊要求附上照片'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});

//地址
$('.address').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(个人信息)',
		text: ['地址无明确要求的情况下写现住址到街道级就好，如四川省成都市高新区益州大道'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});


//电话
$('.phone').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(个人信息)',
		text: ['电话号码格式为 131-xxxx-xxxx'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});

//邮箱地址
$('.mail').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(个人信息)',
		text: ['邮箱建议不要用 QQ 邮箱，QQ 邮箱给人感觉很娱乐化，最好开通一个专门找工作的号，可以用 Foxmail/Gmail 正式一点的邮箱，邮箱地址推荐使用自己的名称相关的,例如:Xiaoer.Wang@foxmail.com 这样你发送邮件过去 HR 会在几千封邮件里一眼锁定你的邮件'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});


//                       教育背景
$('#edu-background-title').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(教育背景)',
		text: ['教育经历按照时间倒叙依次填写，时间最近的放在第一栏'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});

//相关课程 
$('.related_course').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(教育背景)',
		text: ['相关课程不要把所学的所有课程写上，写和岗位需求和岗位职能相关的课程，例：应聘设计 就要写 CAD PS 等，做贷款类就写风控相关'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});


//                      工作经历 
$('#work-experience-title').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(工作经历)',
		text: ['按照时间倒叙的方式来写工作履历，时间最近的放在最开头'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});

//工作经验描述  
$('.parent-experience-wdesc').find('.sentence_1').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(工作经历)①',
		text: ['在写每一个 bullet point 的时候必须借助数据来量化你所做事情的成果，学会用数据化的语言描述内容。必须清楚你想要的每个点表达了什么特质或者素质。不要写了 3 点都是一个意思。列如：做了什么事使得公司销售额达到 100 万等/我服务了 300+客户/我审计了一个$500m 的公司等'],
		icon: 'info',
		showHideTransition: 'plain', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba'
	});
});

$('.parent-experience-wdesc').find('.sentence_2').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(工作经历)②',
		text: ['写每一个 bullet point 的时候最好以动词开头，尽量按照 STAR 原则来描述每一个经历即Situation（情况）、Task（任务）、Action（行动）、Result（结果）比如作为某活动的负责人需要为公司做拉新活动，在一个月内，带领一个 5 个人的团队，通过 xxx 方法，取得了10000+新增的成绩'],
		icon: 'info',
		showHideTransition: 'slide', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba'
	});
});

$('.parent-experience-wdesc').find('.sentence_3').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(工作经历)③',
		text: ['在每一个 bullet point 中要尽量包含或者展现 key words，因为越是针对性强的简历越是容易受到认可，甚至大公司直接采用机器筛选简历，如果你的简历中包含他们设置的关键词才能有机会被 HR 看到，否则直接 PASS，所以我们必须学会提炼出 JD 里面的 Key word。每个岗位都有自己对技能的关键词，如 Consulting 需要 Market research;Financial industry 的需要 Analytical skill'],
		icon: 'info',
		showHideTransition: 'fade', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba'
	});
});

//                          领导经验
$('.leader').find('h4').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(领导经验)',
		text: ['挑选能够体现个人能力的实践经历，可以是学校社团工作、校内比赛和活动、校外兼职经历，也是按照 STAR+量化成果的方式去写',
			   '如果有正式工作经验和实习那么可以将实习放在社会实践栏和社团放在一起，如果没有正式工作，则将实习经历放在工作经验栏',
			   '实践的内容最好也是和求职岗位需求相关的'],
		icon: 'info',
		showHideTransition: 'slide', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba',
		//bgColor: '#13f6ff',
	});
});


//                            技能&兴趣
//语言
$('.skill').find('.language').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(技能&兴趣)',
		text: ['语言栏建议填写掌握的语言和熟练程度（以证书或分数证明），如 英语（熟练，CET-6 640 分）；法语（熟练）'],
		icon: 'info',
		showHideTransition: 'fade', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba'
	});
});

//技能
$('.skill').find('.computer').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(技能&兴趣)',
		text: ['技能栏建议填写与所申请岗位相关的技能，有的时候 JD 里面会明确要求。列如互联网运营类工作可能涉及 PS 熟练、Xmind 精通'],
		icon: 'info',
		showHideTransition: 'fade', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba'
	});
});

//兴趣
$('.skill').find('.hobby').on('click', function () {
	$.toast({
		heading: '<strong>offer先生小贴士</strong>(技能&兴趣)',
		text: ['兴趣栏也是写和职位技能素养需求相关的，并尽量量化。比如你应聘体育类工作，你可以写你喜欢运动，跑过几个城市的马拉松'],
		icon: 'info',
		showHideTransition: 'fade', //fade,slide,plain
		hideAfter: 60000, //false
		stack: 1, //the max number of toast, or false == 1
		position: 'bottom-right',
		loader: true,
		loaderBg: '#09b3ba'
	});
});



/*
 *  加号减号的代码
 *  author: hzy
 */
//                  ***  教育背景  ***
//绑定加号事件
$('.edus').find('div.oper').find('a.add').on('click', function () {
	$('.edus').children('.add-blank').last().after('<div class="row area add-blank first-blank" data-target="edu">' +
		'<div class="col-xs-9">' +
		$('.edus').children('.add-blank').find('.col-xs-9').html() +
		'</div>' +
		'<div class="col-xs-3 text-right">' +
		$('.edus').children('.add-blank').find('.col-xs-3 ').html() +
		'</div>' +
		'<div class="oper"> 								<div class="box">									<a class="minus" href="javascript:;"> 										<img src="images/main/minus.png"> 									</a> 								</div> 							</div>' +
		'</div>');


	//绑定减号事件
	$('.edus').find('div.oper').find('.minus').on('click', function () {
		$(this).parent().parent().parent().remove();
	});
});


//                  ***  工作经历  ***
//绑定加号事件
$('.works').find('div.oper').find('a.add').on('click', function () {
	$('.works').children('.add-blank').last().after('<div class="row area add-blank first-blank" data-target="work">' +
											'<div class="col-xs-9">' + 
											$('.works').children('.add-blank').find('.col-xs-9').html() + 
											'</div>' + 
											'<div class="col-xs-3 text-right">' + 
											$('.works').children('.add-blank').find('.col-xs-3').html() + 
											'</div>' + 
											'<div class="oper">                                                         <div class="box">									                        <a class="minus" href="javascript:;"> 										<img src="images/main/minus.png"> 								   </a> 																</div> 															</div>' + 
											'</div>');
	
	//绑定减号事件
	$('.works').find('div.oper').find('.minus').on('click', function () {
		$(this).parent().parent().parent().remove();
	});
});


//                  ***  领导经验  ***
//绑定加号事件   学生社团
$('.leader').find('.organization').find('div.oper').find('a.add').on('click', function () {
	$('.leader').children('.organization').last().after('<div class="row area add-blank first-blank organization" data-target="practice">' +
											'<div class="col-xs-9">' + 
											$('.leader').children('.organization').find('.col-xs-9').html() + 
											'</div>' + 
											'<div class="col-xs-3 text-right">' + 
											$('.leader').children('.organization').find('.col-xs-3').html() + 
											'</div>' + 
											'<div class="oper">                                                         <div class="box">									                        <a class="minus" href="javascript:;"> 										<img src="images/main/minus.png"> 								   </a> 																</div> 															</div>' + 
											'</div>');
	
	//绑定减号事件
	$('.leader').find('.organization').find('div.oper').find('.minus').on('click', function () {
		$(this).parent().parent().parent().remove();
	});
});

//绑定加号事件   俱乐部
$('.leader').find('.club').find('div.oper').find('a.add').on('click', function () {
	$('.leader').children('.club').last().after('<div class="row area add-blank first-blank club" data-target="practice">' +
											'<div class="col-xs-9">' + 
											$('.leader').children('.club').find('.col-xs-9').html() + 
											'</div>' + 
											'<div class="col-xs-3 text-right">' + 
											$('.leader').children('.club').find('.col-xs-3').html() + 
											'</div>' + 
											'<div class="oper">                                                         <div class="box">									                        <a class="minus" href="javascript:;"> 										<img src="images/main/minus.png"> 								   </a> 																</div> 															</div>' + 
											'</div>');
	
	//绑定减号事件
	$('.leader').find('.club').find('div.oper').find('.minus').on('click', function () {
		$(this).parent().parent().parent().remove();
	});
});






