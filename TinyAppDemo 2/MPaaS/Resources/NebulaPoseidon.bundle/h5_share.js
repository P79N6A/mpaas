window.AlipayH5Share||function(){var d,a={},b={title:"",imgUrl:"",link:"",desc:"",ready:!1},c={title:!1,link:!1,imgUrl:!1,desc:!1},e={init:function(a){var b=this;b.strict="undefined"==typeof a?!0:!!a,b.collectLink(),b.collectTitle(),b.collectDesc(),b.collectThumbnail()},collectLink:function(){var a=this,d=document.querySelector('meta[name="Alipay:link"]');d&&d.getAttribute("content")&&(b.link=d.getAttribute("content")),c.link=!0,a.collectReady()},collectTitle:function(){var e,a=this,d=document.querySelector('meta[name="Alipay:title"]');d&&d.getAttribute("content")?(c.title=!0,b.title=d.getAttribute("content"),a.collectReady()):document.title&&""!==document.title.trim()?(b.title=a.contentTidy(document.title),c.title=!0,a.collectReady()):document.getElementsByTagName("H1").length>0&&document.getElementsByTagName("H1")[0].textContent.length>0&&(e=a.nodeStrFliter(document.getElementsByTagName("H1")[0]),a.getStrLen(e)<=64&&e.length>0&&(b.title=e,c.title=!0,a.collectReady()))},collectThumbnail:function(){var f,a=this,e=document.querySelector('meta[name="Alipay:imgUrl"]');e&&e.getAttribute("content")?(c.imgUrl=!0,b.imgUrl=e.getAttribute("content"),a.collectReady()):(c.imgUrl=!1,a.collectReady(),d=Array.prototype.slice.call(document.images),a.findImgUrl(1e4,1e6),a.strict||(""==b.imgUrl&&a.findImgUrl(2500,1e4),""==b.imgUrl&&a.findImgUrl(1024,2500)),""==b.imgUrl&&(f=document.querySelector('link[type="image/x-icon"]'),f&&f.getAttribute("href")&&(c.imgUrl=!0,b.imgUrl=f.getAttribute("href"),a.collectReady())))},findImgUrl:function(a,f){var h,i,j,g=e;if(0===d.length)return c.imgUrl=!0,g.collectReady(),void 0;if(h=99999,d.length>0&&!c.imgUrl)for(i=0;i<d.length;i++)j=d[i],g.isHidden(j)||(j.complete||j.natureWidth)&&j.y<h&&j.naturalHeight*j.naturalWidth>=a&&j.naturalHeight*j.naturalWidth<f&&(b.imgUrl=j.src,h=j.y||0,c.imgUrl=!0,g.collectReady())},collectDesc:function(){var e,f,g,h,i,a=this,d=document.querySelector('meta[name="Alipay:desc"]');d&&d.getAttribute("content")&&(c.desc=!0,b.desc=d.getAttribute("content"),a.collectReady()),c.desc||a.tarvelPtags(50,2e3),c.desc||a.tarvelPtags(20,50),c.desc||a.travelDocument(document.body,50,2e3),c.desc||(e=document.querySelector('meta[name="description"]'),e&&e.getAttribute("content")&&(b.desc=a.contentTidy(e.getAttribute("content")),c.desc=!0,a.collectReady())),a.strict||(c.desc||a.travelDocument(document.body,20,50),c.desc||a.tarvelPtags(10,20),c.desc||a.travelDocument(document.body,10,20)),c.desc||(f=window.location.hostname,void 0!=f&&""!=f&&(b.desc=f,c.desc=!0,a.collectReady())),g=window.location.href,h=b.desc?b.desc:"",i=280-a.getStrLen(g),i<=a.getStrLen(h)&&i>=0&&(h=a.cutStr(h,Math.floor(i/2))),b.desc=h},collectReady:function(){c.title&&c.imgUrl&&c.link&&c.desc&&(b.ready=!0)},tarvelPtags:function(a,d){var g,h,i,e=this,f=Array.prototype.slice.call(document.getElementsByTagName("P"));if(f.length>0)for(g=0;g<f.length&&(h=f[g],"undefined"==typeof h||"Debug"==h.id||e.isHidden(h)||(i=h.textContent,e.getStrLen(i)>=a&&e.getStrLen(i)<d&&(i=e.nodeStrFliter(h,!1)),e.getStrLen(i)>=a&&e.getStrLen(i)<d&&(b.desc=i,c.desc=!0,e.collectReady()),!c.desc));g++);},travelDocument:function(a,d,e){var f,g,h,i,j;if(void 0!=a&&a.hasChildNodes()&&(f=this,g=a.childNodes,g&&g.length>0))for(h=0;h<g.length;h++)if(i=g[h],"undefined"!=typeof i){switch(i.nodeType){case 1:f.isHidden(i)||"P"!=i.nodeName&&"SCRIPT"!=i.nodeName&&"STYLE"!=i.nodeName&&"AUDIO"!=i.nodeName&&"VIDEO"!=i.nodeName&&f.travelDocument(i,d,e);break;case 3:j=i.nodeValue,f.getStrLen(j)>=d&&f.getStrLen(j)<e&&(j=f.contentTidy(j)),f.getStrLen(j)>=d&&f.getStrLen(j)<=e&&(b.desc=j,c.desc=!0,f.collectReady())}if(c.desc)break}},getStrLen:function(a){return a.replace(/[^\x00-\xff]/g,"xx").length},cutStr:function(a,b){var d,e,f,c=0;for(d=0;d<a.length;d++)if(e=a.charAt(d),c+=encodeURI(e).length>2?1:.5,c>=b)return f=c==b?d+1:d,a.substr(0,f)},getCurrentStyle:function(a,b){return window.getComputedStyle?window.getComputedStyle(a,null).getPropertyValue(b):a.currentStyle?a.currentStyle[b]:null},isHidden:function(a){var b=e,c=void 0!=a&&void 0!=a.nodeType&&"1"==a.nodeType&&("none"==b.getCurrentStyle(a,"display")||"hidden"==b.getCurrentStyle(a,"visibility"));return c?!0:void 0!=a.parentNode?b.isHidden(a.parentNode):!1},getType:function(a){return Object.prototype.toString.call(a).replace(/\[object (\w+)\]/,"$1").toLowerCase()},nodeStrFliter:function(a,b){b=b||!0;var c=this,d=a.cloneNode(!0);return b&&Array.prototype.forEach.call(d.querySelectorAll("img[alt]"),function(a){a.parentNode.replaceChild(document.createTextNode(a.alt),a)}),Array.prototype.forEach.call(d.querySelectorAll("script,style,link"),function(a){a.parentNode.replaceChild(document.createTextNode(""),a)}),d=c.contentTidy(d.textContent)},contentTidy:function(a){return a.replace(/\s{4}/g," ").replace(/(\r|\n)/g,"").trim()}};a.getShareContent=function(a){return a="undefined"==typeof a?!0:!!a,e.init(a),JSON.stringify(b)},document.addEventListener("JSPlugin_AlipayH5Share",function(a){var c="undefined"==typeof a.strict?!0:!!a.strict;window.AlipayJSBridge&&a.clientId&&(e.init(c),window.AlipayJSBridge&&a.clientId&&setTimeout(function(){e.init(c),AlipayJSBridge.callback(a.clientId,b)},0),AlipayJSBridge.callback(a.clientId,b))}),window.AlipayH5Share=a}();