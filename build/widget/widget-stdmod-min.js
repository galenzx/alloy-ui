/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("widget-stdmod",function(B){var F=B.Lang,S=B.Node,f=B.NodeList,a=B.UA,E=B.Widget,D="",n="hd",k="bd",K="ft",h="header",p="body",o="footer",s="fillHeight",O="stdmod",W="Node",m="Content",r="innerHTML",g="firstChild",I="childNodes",P="ownerDocument",X="contentBox",c="height",j="offsetHeight",b="auto",N="headerContentChange",e="bodyContentChange",Q="footerContentChange",U="fillHeightChange",V="heightChange",t="contentUpdate",Z="renderUI",i="bindUI",G="syncUI",l="_applyParsedConfig",T=B.Widget.UI_SRC;function u(L){this._stdModNode=this.get(X);B.before(this._renderUIStdMod,this,Z);B.before(this._bindUIStdMod,this,i);B.before(this._syncUIStdMod,this,G);}u.HEADER=h;u.BODY=p;u.FOOTER=o;u.AFTER="after";u.BEFORE="before";u.REPLACE="replace";var M=u.HEADER,d=u.BODY,R=u.FOOTER,A=M+m,C=R+m,J=d+m,q=u.AFTER,H=u.BEFORE;u.ATTRS={headerContent:{value:null},footerContent:{value:null},bodyContent:{value:null},fillHeight:{value:u.BODY,validator:function(L){return this._validateFillHeight(L);}}};u.HTML_PARSER={headerContent:function(L){return this._parseStdModHTML(M);},bodyContent:function(L){return this._parseStdModHTML(d);},footerContent:function(L){return this._parseStdModHTML(R);}};u.SECTION_CLASS_NAMES={header:E.getClassName(n),body:E.getClassName(k),footer:E.getClassName(K)};u.TEMPLATES={header:'<div class="'+u.SECTION_CLASS_NAMES[M]+'"></div>',body:'<div class="'+u.SECTION_CLASS_NAMES[d]+'"></div>',footer:'<div class="'+u.SECTION_CLASS_NAMES[R]+'"></div>'};u.prototype={_syncUIStdMod:function(){var L=this._stdModParsed;if(!L||!L[A]){this._uiSetStdMod(M,this.get(A));}if(!L||!L[J]){this._uiSetStdMod(d,this.get(J));}if(!L||!L[C]){this._uiSetStdMod(R,this.get(C));}this._uiSetFillHeight(this.get(s));},_renderUIStdMod:function(){this._stdModNode.addClass(E.getClassName(O));this._renderStdModSections();},_renderStdModSections:function(){if(F.isValue(this.get(A))){this._renderStdMod(M);}if(F.isValue(this.get(J))){this._renderStdMod(d);}if(F.isValue(this.get(C))){this._renderStdMod(R);}},_bindUIStdMod:function(){this.after(N,this._afterHeaderChange);this.after(e,this._afterBodyChange);this.after(Q,this._afterFooterChange);this.after(U,this._afterFillHeightChange);this.after(V,this._fillHeight);this.after(t,this._fillHeight);},_afterHeaderChange:function(L){if(L.src!==T){this._uiSetStdMod(M,L.newVal,L.stdModPosition);}},_afterBodyChange:function(L){if(L.src!==T){this._uiSetStdMod(d,L.newVal,L.stdModPosition);}},_afterFooterChange:function(L){if(L.src!==T){this._uiSetStdMod(R,L.newVal,L.stdModPosition);}},_afterFillHeightChange:function(L){this._uiSetFillHeight(L.newVal);},_validateFillHeight:function(L){return !L||L==u.BODY||L==u.HEADER||L==u.FOOTER;},_uiSetFillHeight:function(v){var Y=this.getStdModNode(v);var L=this._currFillNode;if(L&&Y!==L){L.setStyle(c,D);}if(Y){this._currFillNode=Y;}this._fillHeight();},_fillHeight:function(){if(this.get(s)){var L=this.get(c);if(L!=D&&L!=b){this.fillHeight(this._currFillNode);}}},_uiSetStdMod:function(w,v,L){if(F.isValue(v)){var Y=this.getStdModNode(w)||this._renderStdMod(w);if(v instanceof S||v instanceof f){this._addNodeRef(Y,v,L);}else{this._addNodeHTML(Y,v,L);}this.set(w+m,this._getStdModContent(w),{src:T});}else{this._eraseStdMod(w);}this.fire(t);},_renderStdMod:function(v){var L=this.get(X),Y=this._findStdModSection(v);if(!Y){Y=this._getStdModTemplate(v);}this._insertStdModSection(L,v,Y);this[v+W]=Y;return this[v+W];},_eraseStdMod:function(Y){var L=this.getStdModNode(Y);if(L){L.remove(true);delete this[Y+W];}},_insertStdModSection:function(L,w,v){var Y=L.get(g);if(w===R||!Y){L.appendChild(v);}else{if(w===M){L.insertBefore(v,Y);}else{var x=this[R+W];if(x){L.insertBefore(v,x);}else{L.appendChild(v);}}}},_getStdModTemplate:function(L){return S.create(u.TEMPLATES[L],this._stdModNode.get(P));},_addNodeHTML:function(v,Y,L){if(L==q){v.append(Y);}else{if(L==H){v.prepend(Y);}else{v.setContent(Y);}}},_addNodeRef:function(y,w,Y){var L=true,v,x;if(Y==H){var z=y.get(g);if(z){if(w instanceof f){for(v=w.size()-1;v>=0;--v){y.insertBefore(w.item(v),z);}}else{y.insertBefore(w,z);}L=false;}}else{if(Y!=q){y.set(r,D);}}if(L){if(w instanceof f){for(v=0,x=w.size();v<x;++v){y.appendChild(w.item(v));}}else{y.appendChild(w);}}},_getPreciseHeight:function(v){var L=(v)?v.get(j):0,w="getBoundingClientRect";if(v&&v.hasMethod(w)){var Y=v.invoke(w);if(Y){L=Y.bottom-Y.top;}}return L;},_findStdModSection:function(L){return this.get(X).one("> ."+u.SECTION_CLASS_NAMES[L]);},_parseStdModHTML:function(Y){var L=this._findStdModSection(Y);if(L){if(!this._stdModParsed){this._stdModParsed={};B.before(this._applyStdModParsedConfig,this,l);}this._stdModParsed[Y+m]=1;return L.get("innerHTML");}return null;},_applyStdModParsedConfig:function(w,L,v){var Y=this._stdModParsed;if(Y){Y[A]=!(A in L)&&(A in Y);Y[J]=!(J in L)&&(J in Y);Y[C]=!(C in L)&&(C in Y);}},_getStdModContent:function(L){return(this[L+W])?this[L+W].get(I):null;},setStdModContent:function(v,Y,L){this.set(v+m,Y,{stdModPosition:L});},getStdModNode:function(L){return this[L+W]||null;},fillHeight:function(Y){if(Y){var z=this.get(X),AA=[this.headerNode,this.bodyNode,this.footerNode],L,AB,AC=0,x=0,w=false;for(var y=0,v=AA.length;y<v;y++){L=AA[y];if(L){if(L!==Y){AC+=this._getPreciseHeight(L);}else{w=true;}}}if(w){if(a.ie||a.opera){Y.set(j,0);}AB=z.get(j)-parseInt(z.getComputedStyle("paddingTop"),10)-parseInt(z.getComputedStyle("paddingBottom"),10)-parseInt(z.getComputedStyle("borderBottomWidth"),10)-parseInt(z.getComputedStyle("borderTopWidth"),10);if(F.isNumber(AB)){x=AB-AC;if(x>=0){Y.set(j,x);}}}}}};B.WidgetStdMod=u;},"3.2.0PR1",{requires:["base-build","widget"]});