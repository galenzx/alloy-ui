/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("event-focus",function(E){var D=E.Event,C=E.Lang,A=C.isString,B=C.isFunction(E.DOM.create('<p onbeforeactivate=";">').onbeforeactivate);function F(H,G,J){var I="_"+H+"Notifiers";E.Event.define(H,{_attach:function(L,M,K){if(E.DOM.isWindow(L)){return D._attach([H,function(N){M.fire(N);},L]);}else{return D._attach([G,this._proxy,L,this,M,K],{capture:true});}},_proxy:function(O,R,P){var M=O.target,Q=M.getData(I),S=E.stamp(O.currentTarget._node),K=(B||O.target!==O.currentTarget),L=R.handle.sub.filter,N;R.currentTarget=(P)?M:O.currentTarget;R.container=(P)?O.currentTarget:null;if(!L||L(O)){if(!Q){Q={};M.setData(I,Q);if(K){N=D._attach([J,this._notify,M._node]).sub;N.once=true;}}if(!Q[S]){Q[S]=[];}Q[S].push(R);if(!K){this._notify(O);}}},_notify:function(P,L){var M=P.currentTarget,R=M.getData(I),S=M.get("ownerDocument")||M,Q=M,K=[],T,N,O;if(R){while(Q&&Q!==S){K.push.apply(K,R[E.stamp(Q)]||[]);Q=Q.get("parentNode");}K.push.apply(K,R[E.stamp(S)]||[]);for(N=0,O=K.length;N<O;++N){T=K[N];P.currentTarget=K[N].currentTarget;if(T.container){P.container=T.container;}else{delete P.container;}T.fire(P);}M.clearData(I);}},allowDups:true,on:function(M,K,L){K.onHandle=this._attach(M._node,L);},detach:function(L,K){K.onHandle.detach();},delegate:function(N,L,M,K){if(A(K)){L.filter=E.delegate.compileFilter(K);}L.delegateHandle=this._attach(N._node,M,true);},detachDelegate:function(L,K){K.delegateHandle.detach();}},true);}if(B){F("focus","beforeactivate","focusin");F("blur","beforedeactivate","focusout");}else{F("focus","focus","focus");F("blur","blur","blur");}},"3.2.0PR1",{requires:["event-synthetic"]});