个人自己总结或积累的一点代码片段
<!-- more -->
根据id获取相应的dom节点
 ```bash
 function getElements(/*ids*/){
    var elements = {};
    for(var i = 0,j= arguments.length;i<j;i++){
        var id = arguments[i];
        var elt = document.getElementById(id);
        if(elt ==null)throw new Error("没有id为"+id+"的元素");
        elements[id] = elt;
    }
    return elements;
}
```
在低于IE8的浏览器中，getElementById()对匹配元素的ID不区分大小写，而且也返回匹配name属性的元素。

------------------------------------------------------------------------------------

document.getElementsByName  在低于IE10的浏览器中，都会获取id为name值的那个元素
并且document.getElementsByName 属于HTMLDocument类中，而不在Document中，所以只会对HTML文档可用，
对XHTML不可用
```bash
<div id = "hello"></div>
<input name = "hello" type="button" value="hello" />
var a1 = document.getElementsByName('hello');
//在低于IE10的浏览器中，都会获取id为name值的那个元素，即都会获取到div
```

 IE8及其以下的低版本不支持document.getElementsByClassName(),但是支持querySelectorAll()

------------------------------------------------------------------------------------
/**
 * Return the nth ancestor of e, or null if there is no such ancestor
 * or if that ancestor is not an Element (a Document or DocumentFragment e.g.).
 * If n is 0 return e itself.  If n is 1 (or
 * omitted) return the parent.  If n is 2, return the grandparent, etc.  
 */
```bash
function parent(e,n){
    if(n===undefined)n=1;
    while(n--&&e)e = e.parentNode;
    if(!e||e.nodeType!==1)return null;
    return e;
}
```
------------------------------------------------------------------------------------
/**
 * Return the nth sibling element of Element e.
 * If n is postive return the nth next sibling element.
 * If n is negative, return the -nth previous sibling element.
 * If n is zero, return e itself.
 */
```bash
function sibling(e,n){
    while(e&&n!==0){
        if(n>0){
            if(e.nextElementSibling)e=e.nextElementSibling;
            else {
                for(e=e.nextSibling;e&&e.nodeType!==1;e=e.nextSibling)
            }
            n--;
        }else{
            if(e.previousElementSibling)e=e.previousElementSibling;
            else{
                for(e=e.previousSibling;e&&e.nodeType!==1;e=previousSibling)
            }
            n++
        }
    }
    return e;
}
```
------------------------------------------------------------------------------------
/**
 * Return the nth element child of e, or null if it doesn't have one.
 * Negative values of n count from the end. 0 means the first child, but
 * -1 means the last child, -2 means the second to last, and so on.
 */
```bash
function child(e, n) {
    if (e.children) {                      // If children array exists
        if (n < 0) n += e.children.length; // Convert negative n to array index
        if (n < 0) return null;            // If still negative, no child
        return e.children[n];              // Return specified child
    }

    // If e does not have a children array, find the first child and count
    // forward or find the last child and count backwards from there.
    if (n >= 0) { // n is non-negative: count forward from the first child
        // Find the first child element of e
        if (e.firstElementChild) e = e.firstElementChild;
        else {
            for(e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling)
                /* empty */;
        }
        return sibling(e, n); // Return the nth sibling of the first child
    }
    else { // n is negative, so count backwards from the end
        if (e.lastElementChild) e = e.lastElementChild;
        else {
            for(e = e.lastChild; e && e.nodeType !== 1; e=e.previousSibling)
                /* empty */;
        }
        return sibling(e, n+1); // +1 to convert child -1 to sib 0 of last
    }
}

if(!document.documentElement.children){
    Element.prototype.__defineGetter__("children",function(){
        var kids = [];
        for(var c = this.firstChild;c!=null;c=c.nextSibling)
            if (c.nodeType ===1)kids.push(c);
        return kids;
    })
}
```
------------------------------------------------------------------------------------
// 一个参数返回textContent或者innerText 两个参数插入
```bash
function textContent(element,value){
    var content = element.textContent;
    if(value === undefined){
        if(content!==undefined)return conten;
        else return element.innerText;
    }else{
        if(content !== undefined)element.textContent = value;
        else element.innerText = value;
    }
}
```
------------------------------------------------------------------------------------
//将child插入到parent中，使其成为第n个子节点
```bash
function insertAt(parent,child,n){
    if(n<0||n>parent.childNodes.length)throw new Error('invalid index');
    else if (n==parent.childNodes.length)parent.appendChild(child);
    else parent.insertBefore(child,parent.childNodes[n]);
}
```
------------------------------------------------------------------------------------
//表格排序
```bash
function sortrows(table,n,comparator){
    var tbody = table.tBodies[0];
    var rows = tbody.getElementsByTagName('tr');
    rows = Array.prototype.slice.call(rows,0);
    rows.sort(function(row1,row2){
        var cell1 = document.getElementsByTagName('td')[n];
        var cell2 = document.getElementsByTagName('td')[n];

        var var1 = cell1.textContent||cell1.innerText;
        var var2 = cell2.textContent||cell1.innerText;

        if(comparator) return comparator(row1,row2);
        if(row1<row2) return -1;
        else if (row1 = row2) return 0;
        else return 1;

    });
    for(var i=0,j = rows.length;i<j;i++)tbody.appendChild(rows[i]);
}

function makeSortTable(table){
    var headers = table.getElementsByTagName('th');
    for(var i = 0,j = headers.length;i<j;i++){
        (function(n){
            headers[i].onclick = function(){
                sortrows(table,n);
            }
        })(i);
    }
}
```
------------------------------------------------------------------------------------
//用一个新的b标签n节点，并将n节点作为b的子节点
```bash
function embolden(n){
    //假如参数为字符串而不是子节点,将其当做元素的id
    if(typeof n =='string')n=document.getElementById(n);
    var parent = n.parentNode;
    var b = document.createElement('b');
    parent.replaceChild(b,n);
    b.appendChild(n);
}
```
------------------------------------------------------------------------------------
//倒序排列节点n的子节点
```bash
function reverse(n){
    var f = document.createDocumentFragment();
    while(n.lastChild)f.appendChild(n.lastChild);
    n.appendChild(f);
}
```
------------------------------------------------------------------------------------
//使用innerHTML实现insertAdjacentHTML()
```bash
var Insert = (function(){
    if(document.createElement('div').insertAdjacentHTML){
        return {
            before:function(e,h){e.insertAdjacentHTML('beforebegin',h);},
            after:function(e,h){e.insertAdjacentHTML('afterend',h);},
            atStart:function(e,h){e.insertAdjacentHTML('afterbegin',h);},
            atEnd:function(e,h){e.insertAdjacentHTML('beforeend',h);}
        }
    }
    function fragment(html){
        var elt = document.createElement('div');
        var frag = document.createDocumentFragment();
        elt.innerHTML = html;
        while(elt.firstChild){
            frag.appendChild(elt.firstChild);
        }
        return frag;
    }
    var Insert = {
        before:function(elt,html){
            elt.parentNode.insertBefore(fragment(html),elt);
        },
        after:function(elt,html){
            elt.parentNode.insertBefore(fragment(html),elt.nextSibling);
        },
        atStart:function(elt,html){
            elt.insertBefore(fragment(html),elt.firstChild);
        },
        atEnd:function(elt,html){
            elt.appendChild(fragment(html));
        }
    };
    Element.prototype.insertAdjacentHTML = function(pos,html){
        switch(pos.toLowerCase()){
            case "beforebegin":return Insert.before(this,html);
            case "afterend":return Insert.after(this,html);
            case "afterbegin":return Insert.atStart(this,html);
            case "beforeend":return Insert.atEnd(this,html);
        }
    };
    return Insert;
}())
```
------------------------------------------------------------------------------------
//查询窗口滚动条的位置
```bash
function getScrollOffsets(w){
    var w = w || window;
    //除了IE8及更早版本，其他都适用
    if(w.pageXOffset!=null)return{ x: w.pageXOffset,y: w.pageYOffset};
    //标准模式下的IE
    var d = w.document;
    if(document.compatMode=='CSS1Compat')
        return{x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop};
    //怪异模式下的浏览器
    return {x:d.body.scrollLeft,y:d.body.scrollTop};
}
```
------------------------------------------------------------------------------------
//针对innerHTML属性的流式操作
```bash
function ElementStream(elt){
    if(typeof elt === 'string')elt = document.getElementById(elt);
    this.elt = elt;
    this.buffer = '';
}
ElementStream.prototype.write = function(){
    this.buffer += Array.prototype.join.call(arguments,'');
};
ElementStream.prototype.close = function(){
    this.elt.innerHTML = this.buffer;
    this.buffer = '';
};
```
------------------------------------------------------------------------------------
//获取selection选中
```bash
function getSelectionText(){
    if(window.getSelection)  //HTML5  
        return window.getSelection().toString();
    else if(document.selection) //IE  <=8
        return document.selection.createRange().text;
}
```
------------------------------------------------------------------------------------
//简单的扩展方法
```bash
function extend (destination,source){
    for (var i in source){
        destination[i] = source[i];
    }
    return destination;
}
```
------------------------------------------------------------------------------------
//给一特定数字补空位
```bash
function pad(target,n){
    return ((1<<n).toString(2) + target).slice(-n);
}
pad(23,4);//0023
```
------------------------------------------------------------------------------------
//指定一个天数，判断在一年中的具体日期
```bash
    function getRealDate(count,year){
        var monthSecondCount = year % 4==0 ? 29 :28;
        var day = {} ;
        var arr = {
            1:31,2:monthSecondCount,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31
        }
        var num = Math.floor(count / 30);
        var dat = count % 30;
        var sum = 0;
        for(var i = 1 ;i < num+1; i++){
            sum += arr[i];
        }
        //实际天数与平均得到的天数的差值
        var numC =  sum - (num * 30 + dat);

        if(numC < 0 ){
            console.log('月份：'+ (num+1)+" 日期："+ (-numC));
        }else if(numC==0){
            if(num==2)console.log('月份：'+ num + " 日期："+ monthSecondCount)
            else console.log('月份：'+ num + " 日期："+ arr[num])
        }else{
            if(dat == 0)console.log('月份：'+ Number(num)+" 日期："+ arr[num]);
            else console.log('月份：'+ (num+1)+" 日期："+ dat); 
        } 
}
```
*后续继续添加*