/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("querystring-parse",function(E){var B=E.namespace("QueryString"),D=function(F){return function G(L,N){var H,M,K,J,I;if(arguments.length!==2){L=L.split(F);return G(B.unescape(L.shift()),B.unescape(L.join(F)));}L=L.replace(/^\s+|\s+$/g,"");if(E.Lang.isString(N)){N=N.replace(/^\s+|\s+$/g,"");if(!isNaN(N)){M=+N;if(N===M.toString(10)){N=M;}}}H=/(.*)\[([^\]]*)\]$/.exec(L);if(!H){I={};if(L){I[L]=N;}return I;}J=H[2];K=H[1];if(!J){return G(K,[N]);}I={};I[J]=N;return G(K,I);};},C=function(G,F){return((!G)?F:(E.Lang.isArray(G))?G.concat(F):(!E.Lang.isObject(G)||!E.Lang.isObject(F))?[G].concat(F):A(G,F));},A=function(H,F){for(var G in F){if(G&&F.hasOwnProperty(G)){H[G]=C(H[G],F[G]);}}return H;};B.parse=function(G,H,F){return E.Array.reduce(E.Array.map(G.split(H||"&"),D(F||"=")),{},C);};B.unescape=function(F){return decodeURIComponent(F.replace(/\+/g," "));};},"3.2.0PR1",{requires:["collection"]});YUI.add("querystring-stringify",function(D){var C=D.namespace("QueryString"),B=[],A=D.Lang;C.escape=encodeURIComponent;C.stringify=function(J,L,E){var G,I,K,H,F,P,O=L&&L.sep?L.sep:"&",M=L&&L.eq?L.eq:"=",N=L&&L.arrayKey?L.arrayKey:false;if(A.isNull(J)||A.isUndefined(J)||A.isFunction(J)){return E?C.escape(E)+M:"";}if(A.isBoolean(J)||Object.prototype.toString.call(J)==="[object Boolean]"){J=+J;}if(A.isNumber(J)||A.isString(J)){return C.escape(E)+M+C.escape(J);}if(A.isArray(J)){P=[];E=N?E+"[]":E;H=J.length;for(K=0;K<H;K++){P.push(C.stringify(J[K],L,E));}return P.join(O);}for(K=B.length-1;K>=0;--K){if(B[K]===J){throw new Error("QueryString.stringify. Cyclical reference");}}B.push(J);P=[];G=E?E+"[":"";I=E?"]":"";for(K in J){if(J.hasOwnProperty(K)){F=G+K+I;P.push(C.stringify(J[K],L,F));}}B.pop();P=P.join(O);if(!P&&E){return E+"=";}return P;};},"3.2.0PR1");YUI.add("querystring",function(A){},"3.2.0PR1",{use:["querystring-parse","querystring-stringify"]});