/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("swf",function(B){var M=B.Event,G=B.SWFDetect,I=B.Lang,H=B.UA,J=B.Node,F="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",E="application/x-shockwave-flash",D="10.0.22",A="http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?"+Math.random(),C="SWF.eventHandler",K={align:"",allowFullScreen:"",allowNetworking:"",allowScriptAccess:"",base:"",bgcolor:"",menu:"",name:"",quality:"",salign:"",scale:"",tabindex:"",wmode:""};function L(R,O,b){this._id=B.guid("yuiswf");var S=this._id;var W=J.one(R);var e=b["version"]||D;var Z=(e+"").split(".");var T=G.isFlashVersionAtLeast(parseInt(Z[0]),parseInt(Z[1]),parseInt(Z[2]));var Y=(G.isFlashVersionAtLeast(8,0,0));var Q=Y&&!T&&b["useExpressInstall"];var P=(Q)?A:O;var d="<object ";var U,a;var c="yId="+B.id+"&YUISwfId="+S+"&YUIBridgeCallback="+C;B.SWF._instances[S]=this;if(W&&(T||Q)&&P){d+='id="'+S+'" ';if(H.ie){d+='classid="'+F+'" ';}else{d+='type="'+E+'" data="'+P+'" ';}U="100%";a="100%";d+='width="'+U+'" height="'+a+'">';if(H.ie){d+='<param name="movie" value="'+P+'"/>';}for(var V in b.fixedAttributes){if(K.hasOwnProperty(V)){d+='<param name="'+V+'" value="'+b.fixedAttributes[V]+'"/>';}}for(var X in b.flashVars){var N=b.flashVars[X];if(I.isString(N)){c+="&"+X+"="+encodeURIComponent(N);}}if(c){d+='<param name="flashVars" value="'+c+'"/>';}d+="</object>";W.setContent(d);this._swf=J.one("#"+S);}else{this.publish("wrongflashversion",{fireOnce:true});this.fire("wrongflashversion",event);}}L._instances=L._instances||{};L.eventHandler=function(N,O){L._instances[N]._eventHandler(O);};L.prototype={_eventHandler:function(N){if(N.type=="swfReady"){this.publish("swfReady",{fireOnce:true});this.fire("swfReady",N);}else{if(N.type=="log"){}else{this.fire(N.type,N);}}},callSWF:function(O,N){if(!N){N=[];}if(this._swf._node[O]){return(this._swf._node[O].apply(this._swf._node,N));}else{return null;}},toString:function(){return"SWF "+this._id;}};B.augment(L,B.EventTarget);B.SWF=L;},"3.2.0PR1");