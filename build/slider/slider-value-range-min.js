/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("slider-value-range",function(F){var B="min",E="max",D="value",C=Math.round;function A(){this._initSliderValueRange();}F.SliderValueRange=F.mix(A,{prototype:{_factor:1,_initSliderValueRange:function(){},_bindValueLogic:function(){this.after({minChange:this._afterMinChange,maxChange:this._afterMaxChange,valueChange:this._afterValueChange});},_syncThumbPosition:function(){this._calculateFactor();this._setPosition(this.get(D));},_calculateFactor:function(){var J=this.get("length"),H=this.thumb.getStyle(this._key.dim),I=this.get(B),G=this.get(E);J=parseFloat(J,10)||150;H=parseFloat(H,10)||15;this._factor=(G-I)/(J-H);},_defThumbMoveFn:function(I){var G=this.get(D),H=this._offsetToValue(I.offset);if(G!==H){this.set(D,H,{positioned:true});}},_offsetToValue:function(H){var G=C(H*this._factor)+this.get(B);return C(this._nearestValue(G));},_valueToOffset:function(G){var H=C((G-this.get(B))/this._factor);return H;},getValue:function(){return this.get(D);},setValue:function(G){return this.set(D,G);},_afterMinChange:function(G){this._verifyValue();this._syncThumbPosition();},_afterMaxChange:function(G){this._verifyValue();this._syncThumbPosition();},_verifyValue:function(){var H=this.get(D),G=this._nearestValue(H);if(H!==G){this.set(D,G);}},_afterValueChange:function(G){if(!G.positioned){this._setPosition(G.newVal);}},_setPosition:function(G){this._uiMoveThumb(this._valueToOffset(G));},_validateNewMin:function(G){return F.Lang.isNumber(G);},_validateNewMax:function(G){return F.Lang.isNumber(G);},_setNewValue:function(G){return C(this._nearestValue(G));},_nearestValue:function(J){var I=this.get(B),G=this.get(E),H;H=(G>I)?G:I;I=(G>I)?I:G;G=H;return(J<I)?I:(J>G)?G:J;}},ATTRS:{min:{value:0,validator:"_validateNewMin"},max:{value:100,validator:"_validateNewMax"},value:{value:0,setter:"_setNewValue"}}},true);},"3.2.0PR1",{requires:["slider-base"]});