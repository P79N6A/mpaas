(window.AlipayJSBridge&&!window.AlipayCallFromJS)||(function(){var iframe=null;function renderIframe(){if(iframe)return;try{iframe=document.createElement("iframe");iframe.id="__AlipayJSBridgeIframe";iframe.style.display="none";document.documentElement.appendChild(iframe);}catch(e){}}
function onDOMReady(callback){var readyRE=/complete|loaded|interactive/;if(readyRE.test(document.readyState)){setTimeout(function(){callback();},1);}else{document.defaultView.addEventListener('DOMContentLoaded',function(){callback();},false);}}
var NEBULA_TYPE_INFO="NEBULATYPEINFO",NEBULA_TYPE_OF_ARRAYBUFFER="ArrayBuffer";var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var lookup=new Uint8Array(256);for(var i=0;i<chars.length;i++){lookup[chars.charCodeAt(i)]=i;}
function arrayBufferToBase64(buffer){var binary='';var bytes=new Uint8Array(buffer);var len=bytes.byteLength;for(var i=0;i<len;i++){binary+=String.fromCharCode(bytes[i]);}
return window.btoa(binary);}
function base64ToArrayBuffer(base64){var bufferLength=base64.length*0.75,len=base64.length,i,p=0,encoded1,encoded2,encoded3,encoded4;if(base64[base64.length-1]==="="){bufferLength--;if(base64[base64.length-2]==="="){bufferLength--;}}
var arraybuffer=new ArrayBuffer(bufferLength),bytes=new Uint8Array(arraybuffer);for(i=0;i<len;i+=4){encoded1=lookup[base64.charCodeAt(i)];encoded2=lookup[base64.charCodeAt(i+1)];encoded3=lookup[base64.charCodeAt(i+2)];encoded4=lookup[base64.charCodeAt(i+3)];bytes[p++]=(encoded1<<2)|(encoded2>>4);bytes[p++]=((encoded2&15)<<4)|(encoded3>>2);bytes[p++]=((encoded3&3)<<6)|(encoded4&63);}
return arraybuffer;}
function transformCallParam(param){var result=param;for(var key in param){if(param.hasOwnProperty(key)){var val=param[key];if(val instanceof ArrayBuffer){param[key]=arrayBufferToBase64(val);if(!result[NEBULA_TYPE_INFO]){result[NEBULA_TYPE_INFO]={};}
result[NEBULA_TYPE_INFO][key]={"type":NEBULA_TYPE_OF_ARRAYBUFFER};}}}
return result;}
function transformResponseData(responsedata){if(responsedata&&responsedata[NEBULA_TYPE_INFO]){var nebulaTypeInfo=responsedata[NEBULA_TYPE_INFO];if(nebulaTypeInfo){for(var key in nebulaTypeInfo){if(nebulaTypeInfo.hasOwnProperty(key)){var item=nebulaTypeInfo[key];if(item.type){var typeVal=item["type"];if(typeVal===NEBULA_TYPE_OF_ARRAYBUFFER){responsedata[key]=base64ToArrayBuffer(responsedata[key]);}}}}
delete responsedata[NEBULA_TYPE_INFO];}}
return responsedata;}
var callbackPoll={};var sendMessageQueue=[];var receiveMessageQueue=[];var H5_PLUGIN_BASE_URL="jsplugin://www.alipay.com?plugins=";var H5_PLUGIN_CALLBACK_UNIQUE_ID=0;var H5_PLUGIN_CALLBACK_PREFIX="h5dp_callback_id_";var H5_PLUGIN_STACK=[];var JSAPI={call:function(func,param,callback){renderIframe();if('string'!==typeof func){return;}
if('function'===typeof param){callback=param;param=null;}else if(typeof param!=='object'){param=null;}
var callbackId=func+'_'+new Date().getTime()+(Math.random());if('function'===typeof callback){callbackPoll[callbackId]=callback;}
if(param&&param.callbackId){func={responseId:param.callbackId,responseData:param};delete param.callbackId;}else{func={handlerName:func,data:transformCallParam(param)};func.callbackId=''+callbackId;}
sendMessageQueue.push(func);if(window.AlipayCallFromJS&&'function'===typeof window.AlipayCallFromJS){window.AlipayCallFromJS(JSAPI._fetchQueue(),location.href);}else if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.PSDBRIDGEMESSAGEHANDLER&&window.webkit.messageHandlers.PSDBRIDGEMESSAGEHANDLER.postMessage){window.webkit.messageHandlers.PSDBRIDGEMESSAGEHANDLER.postMessage(JSAPI._fetchQueue());}else{iframe.src="alipaybridge://dispatch_message";}},trigger:function(name,data){if(name){var triggerEvent=function(name,data){var callbackId;if(data&&data.callbackId){callbackId=data.callbackId;data.callbackId=null;}
var evt=document.createEvent("Events");evt.initEvent(name,false,true);evt.syncJsApis=[];if(data){if(data.__pull__){delete data.__pull__;for(var k in data){evt[k]=data[k];}}else{evt.data=data;}}
var canceled=!document.dispatchEvent(evt);if(callbackId){var callbackData={};callbackData.callbackId=callbackId;callbackData[name+'EventCanceled']=canceled;callbackData['syncJsApis']=evt.syncJsApis;JSAPI.call('__nofunc__',callbackData);}};setTimeout(function(){triggerEvent(name,data);},1);}},_invokeJS:function(resp){resp=JSON.parse(resp);if(resp.responseId){var func=callbackPoll[resp.responseId];if(!(typeof resp.keepCallback=='boolean'&&resp.keepCallback)){delete callbackPoll[resp.responseId];}
if('function'===typeof func){setTimeout(function(){func(transformResponseData(resp.responseData));},1);}}else if(resp.handlerName){if(resp.handlerName=="H5DynamicPluginCallback"){if(callbackPoll[resp.data.callbackId]){var func=callbackPoll[resp.data.callbackId];if('function'===typeof func){setTimeout(function(){func();},1);}}}else{if(resp.callbackId){resp.data=resp.data||{};resp.data.callbackId=resp.callbackId;}
JSAPI.trigger(resp.handlerName,resp.data);}}},_handleMessageFromObjC:function(message){if(receiveMessageQueue&&!window.AlipayJSBridge){receiveMessageQueue.push(message);}else{JSAPI._invokeJS(message);}},_fetchQueue:function(){var messageQueueString=typeof[].toJSON=='function'?sendMessageQueue.toJSON():JSON.stringify(sendMessageQueue);if(typeof messageQueueString!='string'){messageQueueString=JSON.stringify(sendMessageQueue);}
sendMessageQueue=[];return messageQueueString;},loadPlugin:function(plugins,callback){if(navigator.userAgent.indexOf('iPhone')===-1&&navigator.userAgent.indexOf('iPad')===-1&&navigator.userAgent.indexOf('iPod')===-1){return;}
H5_PLUGIN_STACK.push({'plugins':plugins,'callback':callback});if(!window.H5_PLUGIN_LOADER){window.H5_PLUGIN_LOADER=setInterval(function(){var pluginsConfig=H5_PLUGIN_STACK.shift();if(typeof pluginsConfig!='undefined'&&typeof pluginsConfig.plugins!='undefined'){var plugins=pluginsConfig.plugins;var callback=pluginsConfig.callback;var pluginArray=[];if(Object.prototype.toString.call(plugins)==='[object Array]'){for(var i=0,l=plugins.length;i<l;i++){pluginArray.push(plugins[i]);}}else if(typeof plugins==='string'){pluginArray.push(plugins);}
if(callback&&typeof callback=='function'){var callbackId=H5_PLUGIN_CALLBACK_PREFIX+H5_PLUGIN_CALLBACK_UNIQUE_ID++;callbackPoll[callbackId]=callback;document.location.href=H5_PLUGIN_BASE_URL+encodeURIComponent(pluginArray.join(','))+'&callbackId='+callbackId;}else{document.location.href=H5_PLUGIN_BASE_URL+encodeURIComponent(pluginArray.join(','));}}else{window.clearInterval(window.H5_PLUGIN_LOADER);window.H5_PLUGIN_LOADER=undefined;}},50);}}};JSAPI.init=function(){JSAPI.init=null;"H5_BRIDGE_JS_***_REPLACE_STRING_***_SJ_EGDIRB_5H";var readyEvent=document.createEvent('Events');readyEvent.initEvent('AlipayJSBridgeReady',false,false);var docAddEventListener=document.addEventListener;document.addEventListener=function(name,func){if(name===readyEvent.type){setTimeout(function(){func(readyEvent);},1);}else{docAddEventListener.apply(document,arguments);}};document.dispatchEvent(readyEvent);var receivedMessages=receiveMessageQueue;receiveMessageQueue=null;for(var i=0;i<receivedMessages.length;i++){JSAPI._invokeJS(receivedMessages[i]);}};window.AlipayJSBridge=JSAPI;JSAPI.startupParams=window.ALIPAYH5STARTUPPARAMS||{};onDOMReady(JSAPI.init);onDOMReady(function(){if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.PSDBRIDGEDOMREADY&&window.webkit.messageHandlers.PSDBRIDGEDOMREADY.postMessage){window.webkit.messageHandlers.PSDBRIDGEDOMREADY.postMessage("");};});})();