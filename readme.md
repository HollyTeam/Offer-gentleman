# Offer-gentleman

<p align="left">
	<img alt="" src="https://img.shields.io/badge/JavaScript-ES6-green.svg" />
</p>

***
## Collaborators
* [@HuangZhenyang](https://github.com/HuangZhenyang)
* [@regaliastar](https://github.com/regaliastar)

## tips
* 主页在Index文件夹内
* Firefox3.6+ or Chrome10+ only

## dependence
* imagecropper
* html2canvas
* jspdf

## Interface and data design
```
'POST /main'
{
	//简历头
	name: String,
	address: String,
	phone: Number,
	mail: String,
	school: String,

	//教育背景,edus: {}表示edus的JSON格式, works: []表work数组, 下亦同
	edus: {
		school: String,
		city: String,
		province: String,
		country: String,
		college: String,	//专业
		end_time: String,	//毕业时间
		grade: Number,
		Honors: String,		//使用#|#分隔, 如'三好学生#|#优秀学生干部'
		related_course: String	//使用#|#分隔
	}

	//工作经历
	works: [
		{
			company: String,
			city: String,
			province: String,
			country: String,
			position: String,	//职位
			project: String,	//项目名称
			start_time: String,
			end_time: String,
			sentence_1: String
			sentence_2: String,
			sentence_3: String,
			sentence_4: String
		}
	]

	//领导经验
	leader: {
		//学生社团
		organization: [
			{
				name: String,
				position: String,
				start_time: String,
				end_time: String,
				sentence_1: String,
				sentence_2: String,
				sentence_3: String
			}
		],
		//学生俱乐部
		club: [
			{
				name: String,
				position: String,
				start_time: String,
				end_time: String,
				sentence_1: String,
				sentence_2: String
			}
		]
	}

	//技能&兴趣
	skill: {
		language: String,
		computer: String,
		hobby: String	//使用#|#分隔
	}
}

//头像图片以二进制形式分开传输
路径：'POST /main/avatar'
```
