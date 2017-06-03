'use strict'
/**
 * @constructor
 * @param {Object} option
 * @param {Object|bgColor} 背景颜色
 * @param {Object|href}    图片路径
 * @param {Object|ts} 	   CSS3过度效果
 */
function startIn (options) {
	
	/**
	 * @desc 初始化参数
	 */
	var options = options || {};
	/**
	 * @description 初始化背景颜色
	 */
	var bgColor = options.bgColor || '#FFF';
	
	/**
	 * @type {ImageURIString}
	 * @description 图片路径
	 */
	var href = options.href || 'img/run.gif';
	
	/**
	 * @type {AnimationEvent}
	 * 
	 */
	var ts = options.ts || 'all 1s ease-in-out';
	
	var zIndex = options.zIndex || 100;
	/**
	 * @type {Element}
	 * @description 创建一个背景元素 定位、
	 */
	this.InBg = document.createElement('div');
	this.InBg.style.backgroundColor = bgColor;
	this.InBg.style.position = 'fixed';
	this.InBg.style.left = 0;
	this.InBg.style.top = 0;
	this.InBg.style.bottom = 0;
	this.InBg.style.right = 0;
	this.InBg.style.zIndex = zIndex;
	this.InBg.style.webkitTransition = ts;
	//创建一个显示元素
	
	var oImg = new Image();
	oImg.setAttribute('src',href);
	oImg.style.position = 'absolute';
	oImg.style.maxWidth = '640px';
	oImg.style.width = '100%';
	oImg.style.left = 0;
	oImg.style.top = 0;
	oImg.style.bottom = 0;
	oImg.style.right = 0;
	oImg.style.margin = "auto";
	this.InBg.appendChild(oImg);
	
	//插入对象
	document.body.appendChild(this.InBg);
	
}

/**
 * @property {Object} Object
 * @property {Function} Object.hide
 * @property {Function} Object.show
 */
startIn.prototype = {
	hide : function  (fn) {
		
		var _this = this;
		//当运动完毕时
		
		function runEnd () {
			_this.InBg.style.display = 'none';
			
			fn && fn();
			//过度完毕删除事件
			_this.InBg.removeEventListener('webkitTransitionEnd',runEnd,false);
		}
		//添加过度完毕时间
		this.InBg.addEventListener('webkitTransitionEnd',runEnd,false);
		//影藏
		this.InBg.style.opacity = 0;
		
	},
	show : function  (fn) {
		var _this = this;
		
		function runEnd () {
			
			_this.InBg.style.display = 'block';
			
			fn && fn();
			_this.InBg.removeEventListener('webkitTransitionEnd',runEnd,false);
		}
		
		this.InBg.addEventListener('webkitTransitionEnd',runEnd,false);
		
		
		this.InBg.style.opacity = 1;
	}
}
