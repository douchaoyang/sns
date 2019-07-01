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
var yzsns = (function (yzsns) {
	// 分享文案配置
	var config = {
		url: encodeURIComponent(location.href),    // 地址
		title: encodeURIComponent(document.title), // 标题
		desc: encodeURIComponent(document.title),  // 描述
		pic: '',                                   // 图
	};
	// 加载分享结构
	(function() {
		var wx = /MicroMessenger/i.test(window.navigator.userAgent.toLowerCase());
		var ios = /(iphone|ipad|ipod|ios)/i.test(window.navigator.userAgent.toLowerCase());
		var _frag = '<style>'+
					'#sns_init {width: 100%;height: 100%;overflow: hidden;position: fixed;left: 0;top: 0;z-index: 999999;display: none;}'+
					'#sns_init.sns_init_show #sns_init_mask {opacity: 1;}'+
					'#sns_init.sns_init_show #sns_init_main {transform: translateY(0);-webkit-transform: translateY(0);}'+
					'#sns_init_mask {width: 100%;height: 100%;background-color: rgba(0,0,0,0.75);background-repeat: no-repeat;background-position: center top;background-size: 100%;opacity: 0;transition: all ease .3s;-webkit-transition: all ease .3s;}'+
					'#sns_init_mask.wx_tip {background-image: url(//pic.youzu.com/common/before_js/sns/yd/img/wx_tip.png);}'+
					'#sns_init_main {width: 100%;overflow: hidden;position: absolute;left: 0;bottom: 0;background-color: #fff;transform: translateY(100%);-webkit-transform: translateY(100%);transition: all ease .3s;-webkit-transition: all ease .3s;}'+
					'#sns_init_box {width: 200%;overflow: hidden;transition: all ease .3s;-webkit-transition: all ease .3s;}'+
					'#sns_init_box.sns_link_show {transform: translateX(-50%);-webkit-transform: translateX(-50%);}'+
					'#sns_init_part {width: 50%;float: left;overflow: hidden;}'+
					'#sns_init_list {width: 100%;overflow: hidden; padding-top: .4rem;}'+
					'#sns_init_list span {float: left;width: 25%;height: .6rem;line-height: .6rem;display: block;padding-top: 1rem;text-align: center;color: #333; font-size: .28rem;background-repeat: no-repeat;background-size: 1rem;background-position: center top; margin-bottom: .08rem;}'+
					'#sns_init_sina {background-image: url(//pic.youzu.com/common/before_js/sns/yd/img/sina_ico.png);}'+
					'#sns_init_qzone {background-image: url(//pic.youzu.com/common/before_js/sns/yd/img/qzone_ico.png);}'+
					'#sns_init_qq {background-image: url(//pic.youzu.com/common/before_js/sns/yd/img/qq_ico.png);}'+
					'#sns_init_tieba {background-image: url(//pic.youzu.com/common/before_js/sns/yd/img/tieba_ico.png);}'+
					'#sns_init_copy {background-image: url(//pic.youzu.com/common/before_js/sns/yd/img/copy_ico.png);}'+
					'#ios_tip {width: 100%;height: 1.1rem;background: url(//pic.youzu.com/common/before_js/sns/yd/img/ios_tip.png) no-repeat center top; background-size: 100%;}'+
					'#sns_init_cancel {display: block; width: 7.1rem;line-height: .84rem;text-align: center;color: #999;font-size: .32rem;border: 1px solid #ddd;border-radius: .12rem;margin: .34rem auto .48rem;}'+
					'#sns_init_link {width: 7.1rem;margin: .4rem auto 0;position: relative;padding-top: .56rem;font-size: .28rem;color: #1e1e1e;}'+
					'#sns_copy_hide {width: .56rem;height: .56rem;position: absolute;right: 0;top: 0;background: url(//pic.youzu.com/common/before_js/sns/yd/img/close_ico.png) no-repeat;background-size: 100%;}'+
					'#sns_copy_tip {line-height: .58rem;padding-bottom: .12rem;}'+
					'#sns_copy_box {line-height: 1.5;padding: .2rem;word-break: break-all;background-color: #e4e4e4;border-radius: .12rem;user-select:text;-webkit-user-select:text;}'+
					'</style>'+
					'<div id="sns_init">'+
					'	<div id="sns_init_mask"' + (wx ? ' class="wx_tip"' : '') + ' onclick="yzsns.hide()"></div>'+
					'	<div id="sns_init_main">'+
					'		<div id="sns_init_box">'+
					'			<div id="sns_init_part">'+
					'				<div id="sns_init_list">'+
					'					<span id="sns_init_sina" onclick="yzsns.sina()">新浪微博</span>'+
					'					<span id="sns_init_qzone" onclick="yzsns.qzone()">QQ空间</span>'+
					'					<span id="sns_init_qq" onclick="yzsns.qq()">QQ好友</span>'+
					'					<span id="sns_init_tieba" onclick="yzsns.tieba()">百度贴吧</span>'+
					'					<span id="sns_init_copy" onclick="yzsns.copy()">复制链接</span>'+
					'				</div>'+
					(!wx && ios ? '<p id="ios_tip"></p>' : '') +
					'			</div>		'+
					'			<div id="sns_init_part">'+
					'				<div id="sns_init_link">'+
					'					<span id="sns_copy_hide" onclick="yzsns.hideLink()"></span>'+
					'					<p id="sns_copy_tip">长按复制后分享给好友</p>'+
					'					<p id="sns_copy_box"><em>' + decodeURIComponent(config.url) + '</em></p>'+
					'				</div>'+
					'			</div>'+
					'		</div>'+
					'		<span id="sns_init_cancel" onclick="yzsns.hide()">取消</span>'+
					'	</div>'+
					'</div>';
		var _node = document.createElement("div");
		_node.innerHTML = _frag;
		document.getElementsByTagName("body")[0].appendChild(_node);
	})();
	function g(id) {
		return document.getElementById(id);
	};
	// 显示分享
	yzsns.show = function() {
		g("sns_init").style.display = "block";
		setTimeout(function() {
			g("sns_init").className = "sns_init_show";
		}, 50)
	}
	// 关闭分享
	yzsns.hide = function() {
		g("sns_init").className = "";
		setTimeout(function() {
			g("sns_init").style.display = "none";
			yzsns.hideLink();
		}, 300)
	}
	// 显示复制链接
	yzsns.showLink = function() {
		g("sns_init_box").className = "sns_link_show";
	}
	// 关闭复制链接
	yzsns.hideLink = function() {
		g("sns_init_box").className = "";
	}
	// 自定义分享文案
	yzsns.set = function(o) {
		o.url && (config.url = encodeURIComponent(o.url));
		o.title && (config.title = encodeURIComponent(o.title));
		o.desc && (config.desc = encodeURIComponent(o.desc));
		o.pic && (config.pic = o.pic);
		g("sns_copy_box").getElementsByTagName("em")[0].innerHTML = decodeURIComponent(config.url);
		return this;
	};
	// 新浪微博
	yzsns.sina = function() {
		this.shareByIndex(0);
	};
	// QQ好友
	yzsns.qq = function() {
		this.shareByIndex(1);
	};
	// QQ空间
	yzsns.qzone = function() {
		this.shareByIndex(2);
	};
	// 百度贴吧
	yzsns.tieba = function() {
		this.shareByIndex(3);
	};
	// 复制链接
	yzsns.copy = function() {
		this.showLink();
	};
	yzsns.shareByIndex = function(index) {
		window.open(shareApi(index));
		this.hide();
	};
	function shareApi(target) {
	    switch (target) {
	        case 0:
	            return "http://service.weibo.com/share/share.php?&searchPic=true&language=zh_cn&url=" + config.url + "&title=" + (config.title + " " + config.desc) + "&pic=" + config.pic;
	            break;
	        case 1:
	            return "http://connect.qq.com/widget/shareqq/index.html?title=" + config.title + "&url=" + config.url + "&summary=" + config.desc + "&desc=" + config.desc + "&pics=" + config.pic.split("||").join("|");
	            break;
	        case 2:
	            return "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + config.url + "&title=" + config.title + "&desc=" + config.desc + "&summary=" + config.desc + "&site={{100*100}}&pics=" + config.pic.split("||").join("|");
	            break;
	        case 3:
	        	return "http://tieba.baidu.com/f/commit/share/openShareApi?title=" + config.title + "&url=" + config.url + "&pic=" + encodeURIComponent(config.pic.split("||")[0]);
	        	break;
	        default:
	            break;
	    }
	};
	return yzsns;
})(window.yzsns || {});