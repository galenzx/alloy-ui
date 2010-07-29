/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("widget-position-constrain",function(C){var F="constrain",D="constrain|xyChange",B="constrainChange",N="preventOverlap",E="align",O="",G="bindUI",I="xy",A="x",M="y",J=C.Node,P="viewportRegion",L="region",K;function H(Q){if(!this._posNode){C.error("WidgetPosition needs to be added to the Widget, before WidgetPositionConstrain is added");}C.after(this._bindUIPosConstrained,this,G);}H.ATTRS={constrain:{value:null,setter:"_setConstrain"},preventOverlap:{value:false}};K=H._PREVENT_OVERLAP={x:{"tltr":1,"blbr":1,"brbl":1,"trtl":1},y:{"trbr":1,"tlbl":1,"bltl":1,"brtr":1}};H.prototype={getConstrainedXY:function(T,S){S=S||this.get(F);var R=this._getRegion((S===true)?null:S),Q=this._posNode.get(L);return[this._constrain(T[0],A,Q,R),this._constrain(T[1],M,Q,R)];},constrain:function(U,R){var T,Q,S=R||this.get(F);if(S){T=U||this.get(I);Q=this.getConstrainedXY(T,S);if(Q[0]!==T[0]||Q[1]!==T[1]){this.set(I,Q,{constrained:true});}}},_setConstrain:function(Q){return(Q===true)?Q:J.one(Q);},_constrain:function(Q,R,Y,S){if(S){if(this.get(N)){Q=this._preventOverlap(Q,R,Y,S);}var V=(R==A),X=(V)?S.width:S.height,U=(V)?Y.width:Y.height,T=(V)?S.left:S.top,W=(V)?S.right-U:S.bottom-U;if(Q<T||Q>W){if(U<X){if(Q<T){Q=T;}else{if(Q>W){Q=W;}}}else{Q=T;}}}return Q;},_preventOverlap:function(R,S,b,T){var W=this.get(E),a=(S===A),Y,V,U,X,Z,Q;if(W&&W.points&&K[S][W.points.join(O)]){V=this._getRegion(W.node);if(V){Y=(a)?b.width:b.height;U=(a)?V.left:V.top;X=(a)?V.right:V.bottom;Z=(a)?V.left-T.left:V.top-T.top;Q=(a)?T.right-V.right:T.bottom-V.bottom;}if(R>U){if(Q<Y&&Z>Y){R=U-Y;}}else{if(Z<Y&&Q>Y){R=X;}}}return R;},_bindUIPosConstrained:function(){this.after(B,this._afterConstrainChange);this._enableConstraints(this.get(F));},_afterConstrainChange:function(Q){this._enableConstraints(Q.newVal);},_enableConstraints:function(Q){if(Q){this.constrain();this._cxyHandle=this._cxyHandle||this.on(D,this._constrainOnXYChange);}else{if(this._cxyHandle){this._cxyHandle.detach();this._cxyHandle=null;}}},_constrainOnXYChange:function(Q){if(!Q.constrained){Q.newVal=this.getConstrainedXY(Q.newVal);}},_getRegion:function(Q){var R;if(!Q){R=this._posNode.get(P);}else{Q=J.one(Q);if(Q){R=Q.get(L);}}return R;}};C.WidgetPositionConstrain=H;},"3.2.0PR1",{requires:["widget-position"]});