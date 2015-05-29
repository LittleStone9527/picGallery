/**
 * Created by Administrator on 2015/5/29 0029.
 */


/*绑定多个函数*/
function addLoadEvent(func){
    //把现有window.onload事件处理函数的值存入变量oldonload
    var oldonload = window.onload;
    //若此事件处理函数没有绑定任何函数，则添加新函数。
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    //否则，把新的函数追加到现有指令末尾。
    else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

/*指定元素在后面插入*/
function insertAfter(newEle, targetEle){
    var parentEle = targetEle.parentNode;
    if(parentEle.lastChild == targetEle){
        parentEle.appendChild(newEle);
    }
    else{
        parentEle.insertBefore(newEle, targetEle.nextSibling);
    }
}
/*负责创建img p元素*/
function prepareImgBox(){
    if(!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById('imgShowList')) return false;

    var oImgBox = document.createElement("img");
    oImgBox.setAttribute("id", "imgBox");
    oImgBox.setAttribute("src", "image/13.jpg");
    oImgBox.setAttribute("alt", "图片占位符");

    var oDesc = document.createElement("p");
    oDesc.setAttribute("id", "desc");
    var oTxt1 = document.createTextNode("description");
    oDesc.appendChild(oTxt1);
    var imgShowList = document.getElementById('imgShowList');

    insertAfter(oImgBox, imgShowList);
    insertAfter(oDesc, oImgBox);
}
/*遍历图库里面的每一个链接，当用户点击某一个链接时，就会调用showPic函数*/
function picGallery(){
    if(!document.getElementsByTagName){
        return false;
    }
    if(!document.getElementById){
        return false;
    }
    if (!document.getElementById('imgShowList')) {
        return false;
    }
    var imgShowList = document.getElementById('imgShowList');
    var Links = imgShowList.getElementsByTagName('a');
    for (var i = 0; i<Links.length; i++) {
        Links[i].onclick = function(){
            return showPic(this) ? false : true;
        }
    }
}
/*负责把图片占位符 的图片切换为目标图片*/
function showPic(obj){
    if(!document.getElementById("imgBox")) return false;
    var source = obj.getAttribute("href");
    var oImgPlace = document.getElementById("imgBox");
    if (oImgPlace.nodeName != "IMG") return false;
    oImgPlace.setAttribute("src", source);

    if (document.getElementById("desc")){
        var oTxt = obj.getAttribute("title") ? obj.getAttribute("title") : "";
        // var oTxt = obj.getAttribute("title");
        var oDesc = document.getElementById('desc');
        //p元素本身是是一个空值，文本节点是p元素里面的第一个子节点。
        if (oDesc.firstChild.nodeType == 3) {
            oDesc.firstChild.nodeValue = oTxt;
        }
    }
    return true;
}
/*为了启用这些功能用addLoadEvent函数来调用prepareImgBox、picGallery函数*/
addLoadEvent(picGallery);
addLoadEvent(prepareImgBox);















