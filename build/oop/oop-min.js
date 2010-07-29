/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("oop",function(I){var E=I.Lang,D=I.Array,C=Object.prototype,B="_~yuim~_",F="each",H="some",G=function(L,K,M,A,J){if(L&&L[J]&&L!==I){return L[J].call(L,K,M);}else{switch(D.test(L)){case 1:return D[J](L,K,M);case 2:return D[J](I.Array(L,0,true),K,M);default:return I.Object[J](L,K,M,A);}}};I.augment=function(A,W,L,U,Q){var O=W.prototype,S=null,V=W,R=(Q)?I.Array(Q):[],K=A.prototype,P=K||A,T=false,J,M,N;if(K&&V){J={};M={};S={};I.Object.each(O,function(Y,X){M[X]=function(){for(N in J){if(J.hasOwnProperty(N)&&(this[N]===M[N])){this[N]=J[N];}}V.apply(this,R);return J[X].apply(this,arguments);};if((!U||(X in U))&&(L||!(X in this))){if(E.isFunction(Y)){J[X]=Y;this[X]=M[X];}else{this[X]=Y;}}},S,true);}else{T=true;}I.mix(P,S||O,L,U);if(T){W.apply(P,R);}return A;};I.aggregate=function(K,J,A,L){return I.mix(K,J,A,L,0,true);};I.extend=function(L,K,A,N){if(!K||!L){I.error("extend failed, verify dependencies");}var M=K.prototype,J=I.Object(M);L.prototype=J;J.constructor=L;L.superclass=M;if(K!=Object&&M.constructor==C.constructor){M.constructor=K;}if(A){I.mix(J,A,true);}if(N){I.mix(L,N,true);}return L;};I.each=function(K,J,L,A){return G(K,J,L,A,F);};I.some=function(K,J,L,A){return G(K,J,L,A,H);};I.clone=function(L,M,P,Q,K,O){if(!E.isObject(L)){return L;}if(L instanceof YUI){return L;}var N,J=O||{},A,R=I.each||I.Object.each;switch(E.type(L)){case"date":return new Date(L);case"regexp":return L;case"function":return L;case"array":N=[];break;default:if(L[B]){return J[L[B]];}A=I.guid();N=(M)?{}:I.Object(L);L[B]=A;J[A]=L;}if(!L.addEventListener&&!L.attachEvent){R(L,function(T,S){if(!P||(P.call(Q||this,T,S,this,L)!==false)){if(S!==B){if(S=="prototype"){}else{this[S]=I.clone(T,M,P,Q,K||L,J);}}}},N);}if(!O){I.Object.each(J,function(T,S){delete T[B];});J=null;}return N;};I.bind=function(A,K){var J=arguments.length>2?I.Array(arguments,2,true):null;return function(){var M=E.isString(A)?K[A]:A,L=(J)?J.concat(I.Array(arguments,0,true)):arguments;return M.apply(K||M,L);};};I.rbind=function(A,K){var J=arguments.length>2?I.Array(arguments,2,true):null;return function(){var M=E.isString(A)?K[A]:A,L=(J)?I.Array(arguments,0,true).concat(J):arguments;return M.apply(K||M,L);};};},"3.2.0PR1");