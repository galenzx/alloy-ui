/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("history-base",function(B){var H=B.Lang,E=B.Object,L=YUI.namespace("Env.History"),F=B.config.doc.documentMode,J=B.config.win,C={merge:true},I="change",A="add",G="replace";function D(){this._init.apply(this,arguments);}B.augment(D,B.EventTarget,null,null,{emitFacade:true,prefix:"history",preventable:false,queueable:true});if(!L._state){L._state={};}function K(M){return H.type(M)==="object";}D.NAME="historyBase";D.SRC_ADD=A;D.SRC_REPLACE=G;D.html5=!!(J.history&&J.history.pushState&&J.history.replaceState&&("onpopstate" in J||B.UA.gecko>=2));D.nativeHashChange="onhashchange" in J&&(!F||F>7);B.mix(D.prototype,{_init:function(M){M=this._config=M||{};this.publish(I,{broadcast:2,defaultFn:this._defChangeFn});if(M.initialState){this.add(M.initialState);}},add:function(){var M=B.Array(arguments,0,true);M.unshift(A);return this._change.apply(this,M);},addValue:function(N,P,M){var O={};O[N]=P;return this._change(A,O,M);},get:function(N){var O=L._state,M=K(O);if(N){return M&&E.owns(O,N)?O[N]:undefined;}else{return M?B.mix({},O,true):O;}},replace:function(){var M=B.Array(arguments,0,true);M.unshift(G);return this._change.apply(this,M);},replaceValue:function(N,P,M){var O={};O[N]=P;return this._change(G,O,M);},_change:function(O,N,M){M=M?B.merge(C,M):C;if(M.merge&&K(N)&&K(L._state)){N=B.merge(L._state,N);}this._resolveChanges(O,N,M);return this;},_fireEvents:function(O,N,M){this.fire(I,{_options:M,changed:N.changed,newVal:N.newState,prevVal:N.prevState,removed:N.removed,src:O});E.each(N.changed,function(Q,P){this._fireChangeEvent(O,P,Q);},this);E.each(N.removed,function(Q,P){this._fireRemoveEvent(O,P,Q);},this);},_fireChangeEvent:function(O,M,N){this.fire(M+"Change",{newVal:N.newVal,prevVal:N.prevVal,src:O});},_fireRemoveEvent:function(O,M,N){this.fire(M+"Remove",{prevVal:N,src:O});},_resolveChanges:function(S,Q,N){var R={},M,P=L._state,O={};if(!Q){Q={};}if(!N){N={};}if(K(Q)&&K(P)){E.each(Q,function(T,U){var V=P[U];if(T!==V){R[U]={newVal:T,prevVal:V};M=true;}},this);E.each(P,function(U,T){if(!E.owns(Q,T)||Q[T]===null){delete Q[T];O[T]=U;M=true;}},this);}else{M=Q!==P;}if(M){this._fireEvents(S,{changed:R,newState:Q,prevState:P,removed:O},N);}},_storeState:function(N,M){L._state=M||{};},_defChangeFn:function(M){this._storeState(M.src,M.newVal,M._options);}},true);B.HistoryBase=D;},"3.2.0PR1",{requires:["event-custom-complex"]});YUI.add("history-hash",function(A){var C=A.HistoryBase,F=A.Lang,K=A.Array,J=YUI.namespace("Env.HistoryHash"),B="hash",E,D,I,H=A.config.win,L=H.location,M=A.config.useHistoryHTML5;function G(){G.superclass.constructor.apply(this,arguments);}A.extend(G,C,{_init:function(N){N=N||{};N.initialState=N.initialState||G.parseHash();A.after("hashchange",A.bind(this._afterHashChange,this),H);G.superclass._init.call(this,N);},_storeState:function(P,O){var N=G.createHash(O);G.superclass._storeState.apply(this,arguments);if(G.getHash()!==N){G[P===C.SRC_REPLACE?"replaceHash":"setHash"](N);}},_afterHashChange:function(N){this._resolveChanges(B,G.parseHash(N.newHash),{});}},{NAME:"historyHash",SRC_HASH:B,hashPrefix:"",_REGEX_HASH:/([^\?#&]+)=([^&]+)/g,createHash:function(P){var N=G.encode,O=[];A.Object.each(P,function(R,Q){if(F.isValue(R)){O.push(N(Q)+"="+N(R));}});return O.join("&");},decode:function(N){return decodeURIComponent(N.replace(/\+/g," "));},encode:function(N){return encodeURIComponent(N).replace(/%20/g,"+");},getHash:(A.UA.gecko?function(){var O=/#(.*)$/.exec(L.href),P=O&&O[1]||"",N=G.hashPrefix;return N&&P.indexOf(N)===0?P.replace(N,""):P;}:function(){var O=L.hash.substr(1),N=G.hashPrefix;return N&&O.indexOf(N)===0?O.replace(N,""):O;}),getUrl:function(){return L.href;},parseHash:function(Q){var N=G.decode,R,U,S,O,P={},T=G.hashPrefix,V;Q=F.isValue(Q)?Q:G.getHash();if(T){V=Q.indexOf(T);if(V===0||(V===1&&Q.charAt(0)==="#")){Q=Q.replace(T,"");}}S=Q.match(G._REGEX_HASH)||[];for(R=0,U=S.length;R<U;++R){O=S[R].split("=");P[N(O[0])]=N(O[1]);}return P;},replaceHash:function(N){if(N.charAt(0)==="#"){N=N.substr(1);}L.replace("#"+(G.hashPrefix||"")+N);},setHash:function(N){if(N.charAt(0)==="#"){N=N.substr(1);}L.hash=(G.hashPrefix||"")+N;}});E=J._notifiers;if(!E){E=J._notifiers=[];}A.Event.define("hashchange",{on:function(P,N,O){if(P.compareTo(H)||P.compareTo(A.config.doc.body)){E.push(O);}},detach:function(Q,O,P){var N=K.indexOf(E,P);if(N!==-1){E.splice(N,1);}}});D=G.getHash();I=G.getUrl();if(C.nativeHashChange){A.Event.attach("hashchange",function(P){var N=G.getHash(),O=G.getUrl();K.each(E,function(Q){Q.fire({_event:P,oldHash:D,oldUrl:I,newHash:N,newUrl:O});});D=N;I=O;},H);}else{if(!J._hashPoll){if(A.UA.webkit&&!A.UA.chrome&&navigator.vendor.indexOf("Apple")!==-1){A.on("unload",function(){},H);}J._hashPoll=A.later(50,null,function(){var N=G.getHash(),O;if(D!==N){O=G.getUrl();K.each(E,function(P){P.fire({oldHash:D,oldUrl:I,newHash:N,newUrl:O});});D=N;I=O;}},null,true);}}A.HistoryHash=G;if(M===false||(!A.History&&M!==true&&(!C.html5||!A.HistoryHTML5))){A.History=G;}},"3.2.0PR1",{requires:["event-synthetic","history-base","yui-later"]});YUI.add("history-hash-ie",function(G){if(G.UA.ie&&!G.HistoryBase.nativeHashChange){var C=G.Do,D=YUI.namespace("Env.HistoryHash"),B=G.HistoryHash,E=D._iframe,F=G.config.win,A=F.location;B.getHash=function(){var H=B.hashPrefix,I=E?E.contentWindow.location.hash.substr(1):A.hash.substr(1);return H&&I.indexOf(H)===0?I.replace(H,""):I;};B.getUrl=function(){var H=B.getHash();if(H&&H!==A.hash.substr(1)){return A.href.replace(/#.*$/,"")+"#"+H;}else{return A.href;}};B._updateIframe=function(I,H){var J=E.contentWindow.document,K=J.location;J.open().close();if(H){K.replace(I.charAt(0)==="#"?I:"#"+I);}else{K.hash=I;}};C.after(B._updateIframe,B,"replaceHash",B,true);C.after(B._updateIframe,B,"setHash");if(!E){G.on("domready",function(){E=D._iframe=G.Node.getDOMNode(G.Node.create('<iframe src="javascript:0" style="display:none" height="0" width="0" tabindex="-1" title="empty"/>'));G.config.doc.documentElement.appendChild(E);B._updateIframe(A.hash.substr(1));});G.on("hashchange",function(H){if(A.hash.substr(1)!==H.newHash){A.hash=H.newHash;
}},F);}}},"3.2.0PR1",{requires:["history-base","history-hash","node-base"]});YUI.add("history-html5",function(A){var C=A.HistoryBase,J=A.config.doc,G=A.config.win,I=G.sessionStorage,L=A.config.useHistoryHTML5,K=A.JSON||G.JSON,E="enableSessionFallback",B="YUI_HistoryHTML5_state",D="popstate",F=C.SRC_REPLACE;function H(){H.superclass.constructor.apply(this,arguments);}A.extend(H,C,{_init:function(M){A.on("popstate",this._onPopState,G,this);if(M&&M[E]&&YUI.Env.windowLoaded){this._loadSessionState();}H.superclass._init.apply(this,arguments);},_getSessionKey:function(){return B+"_"+G.location.pathname;},_loadSessionState:function(){var M=K&&I&&I[this._getSessionKey()];if(M){try{this._resolveChanges(D,K.parse(M)||null);}catch(N){}}},_storeSessionState:function(M){if(this._config[E]&&K&&I){I[this._getSessionKey()]=K.stringify(M||null);}},_storeState:function(O,N,M){if(O!==D){G.history[O===F?"replaceState":"pushState"](N,M.title||J.title||"",M.url||null);}this._storeSessionState(N);H.superclass._storeState.apply(this,arguments);},_onPopState:function(N){var M=N._event.state;this._storeSessionState(M);this._resolveChanges(D,M||null);}},{NAME:"historyhtml5",SRC_POPSTATE:D});if(!A.Node.DOM_EVENTS.popstate){A.Node.DOM_EVENTS.popstate=1;}A.HistoryHTML5=H;if(L===true||(L!==false&&C.html5)){A.History=H;}},"3.2.0PR1",{requires:["event-base","history-base","node-base"],optional:["json"]});YUI.add("history",function(A){},"3.2.0PR1",{use:["history-base","history-hash","history-hash-ie","history-html5"]});