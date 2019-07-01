# sns
社交网络分享组件

* `使用方法`：

```javascript
//pc
/*
** Compnt youzu social network services 
** Author 吾辈组长
** Usages 1. 正确引用js,不依赖任何库文件
**   	  2. 分享文案设置
			 yzsns.set({
				url:   // 分享地址, 必须线上可访问, 且无跳转, 默认当前页面地址
				title: // 分享标题, 默认页面标题
				desc:  // 分享描述, 默认页面标题
				pic:   // 分享图片, 必须为线上资源地址(300*300 *http), 多张用"||"隔开, 如 "pic1.jpg||pic2.jpg", 建议单张图片
			 }); 
**   	  3. API 
			 yzsns.sina()  // 分享到新浪微博
			 yzsns.qq()    // 分享给QQ好友
			 yzsns.qzone() // 分享到QQ空间
			 yzsns.tieba() // 分享到百度贴吧
			 yzsns.wx()    // 分享二维码
**   	  4. 定制化分享按钮
			 yzsns.init({
				box:      // 分享结构的父级dom对象, 必须是原生对象
				color:    // "分享到:" 字体颜色 默认 #fff
				bgcolor:  // 按钮背景颜色, 默认无
				list:     // 所需要显示的按钮, 用"," 隔开, 默认"wx,sina,qq,qzone,tieba"
			 }); 
*/
yzsns.set({
	url: 'http://hd.youzu.com/kb/pig/index',
	title: '我在领取《狂暴之翼》金猪，点击助我赢官方限定手办！',
	desc: '超多新春免费领取，每日抽转盘，100%中奖！',
	pic: 'http://pic.youzu.com/hd/kb/pig/images/share-icon.png'
}).init({
	box: $("#test")[0],
	bgcolor: "#fff",
	color: "#f6e5a2",
	list: "wx,sina,qzone,qq,tieba"
});

// mob
/*
** Compnt youzu social network services 
** Author 吾辈组长
** Usages 1. 正确引用js, 依赖px2rem
**   	  2. 分享文案设置
			 yzsns.set({
				url:   // 分享地址, 必须线上可访问, 且无跳转, 默认当前页面地址
				title: // 分享标题, 默认页面标题
				desc:  // 分享描述, 默认页面标题
				pic:   // 分享图片, 必须为线上资源地址(300*300 *http), 多张用"||"隔开, 如 "pic1.jpg||pic2.jpg", 建议单张图片
			 }); 
**   	  3. API 
			 yzsns.show()  // 打开分享面板
			 yzsns.hide()  // 关闭分享面板			 
			 yzsns.sina()  // 分享到新浪微博
			 yzsns.qq()    // 分享给QQ好友
			 yzsns.qzone() // 分享到QQ空间
			 yzsns.tieba() // 分享到百度贴吧
			 yzsns.wx()    // 分享二维码
*/
yzsns.set({
	url: 'http://hd.youzu.com/kb/pig/index',
	title: '我在领取《狂暴之翼》金猪，点击助我赢官方限定手办！',
	desc: '超多新春免费领取，每日抽转盘，100%中奖！',
	pic: 'http://pic.youzu.com/hd/kb/pig/images/share-icon.png'
});
```

* [`关于作者`](http://www.douchaoyang.com)