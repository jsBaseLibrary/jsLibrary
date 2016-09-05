/**
 * Created by supernever on 16/8/30.
 *使用方法 var $$ = new SN();
 *直接使用方法 var a1 = $$.getElements(ids)
 *解决命名冲突 var $$$ = new SN().noConflict(true);
 *之后$$$就为SN的直接引用
 */
(function(window,undefined){
	var window = this,
		undefined,
		_SN = window.SN,
		SN = window.SN = class{
			constructor(){
			    this.version = '0.0.1';
		}
	};
	Object.assign(SN.prototype,{
		constructor : SN,
		getElements(/*ids*/){
			var elements = {};
			    for(var i = 0,j= arguments.length;i<j;i++){
			        var id = arguments[i];
			        var elt = document.getElementById(id);
			        if(elt ==null)throw new Error("没有id为"+id+"的元素");
			        elements[id] = elt;
			    }
			return elements;
		},
		noConflict(deep){
			var deep = deep?deep:'true';
			if(deep)
				window.SN = _SN;
			return SN;
		}
	})


	// SN.prototype = {
	// 	constructor : SN,
	// 	/**
	// 	 * 根据id获取相应的dom节点,可以传入多个id
	// 	 * 在低于IE8的浏览器中，getElementById()对匹配元素的ID不区分大小写，
	// 	 * 而且也返回匹配name属性的元素
	// 	 * @return {[type]} [description]
	// 	 */
	// 	getElements : (/*ids*/)=>{
	// 		var elements = {};
	// 		    for(var i = 0,j= arguments.length;i<j;i++){
	// 		        var id = arguments[i];
	// 		        var elt = document.getElementById(id);
	// 		        if(elt ==null)throw new Error("没有id为"+id+"的元素");
	// 		        elements[id] = elt;
	// 		    }
	// 		return elements;
	// 	},
	// 	/**
	// 	 * 解决命名冲突
	// 	 * @param  {[boolean]} deep [默认为true]
	// 	 * @return {[type]}      [description]
	// 	 */
	// 	noConflict : (deep)=>{
	// 		var deep = deep?deep:'true';
	// 		if(deep)
	// 			window.SN = _SN;
	// 		return SN;
	// 	}
	// };
	return SN;
})(window,undefined)
