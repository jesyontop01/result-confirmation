!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((t=t||self).svgpathdata={})}(this,(function(t){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(t,e)};function e(t,e){function a(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}function a(t){var r="";Array.isArray(t)||(t=[t]);for(var e=0;e<t.length;e++){var a=t[e];if(a.type===_.CLOSE_PATH)r+="z";else if(a.type===_.HORIZ_LINE_TO)r+=(a.relative?"h":"H")+a.x;else if(a.type===_.VERT_LINE_TO)r+=(a.relative?"v":"V")+a.y;else if(a.type===_.MOVE_TO)r+=(a.relative?"m":"M")+a.x+" "+a.y;else if(a.type===_.LINE_TO)r+=(a.relative?"l":"L")+a.x+" "+a.y;else if(a.type===_.CURVE_TO)r+=(a.relative?"c":"C")+a.x1+" "+a.y1+" "+a.x2+" "+a.y2+" "+a.x+" "+a.y;else if(a.type===_.SMOOTH_CURVE_TO)r+=(a.relative?"s":"S")+a.x2+" "+a.y2+" "+a.x+" "+a.y;else if(a.type===_.QUAD_TO)r+=(a.relative?"q":"Q")+a.x1+" "+a.y1+" "+a.x+" "+a.y;else if(a.type===_.SMOOTH_QUAD_TO)r+=(a.relative?"t":"T")+a.x+" "+a.y;else{if(a.type!==_.ARC)throw new Error('Unexpected command type "'+a.type+'" at index '+e+".");r+=(a.relative?"a":"A")+a.rX+" "+a.rY+" "+a.xRot+" "+ +a.lArcFlag+" "+ +a.sweepFlag+" "+a.x+" "+a.y}}return r}function i(t,r){var e=t[0],a=t[1];return[e*Math.cos(r)-a*Math.sin(r),e*Math.sin(r)+a*Math.cos(r)]}function n(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];for(var e=0;e<t.length;e++)if("number"!=typeof t[e])throw new Error("assertNumbers arguments["+e+"] is not a number. "+typeof t[e]+" == typeof "+t[e]);return!0}var o=Math.PI;function s(t,r,e){t.lArcFlag=0===t.lArcFlag?0:1,t.sweepFlag=0===t.sweepFlag?0:1;var a=t.rX,n=t.rY,s=t.x,u=t.y;a=Math.abs(t.rX),n=Math.abs(t.rY);var h=i([(r-s)/2,(e-u)/2],-t.xRot/180*o),c=h[0],m=h[1],y=Math.pow(c,2)/Math.pow(a,2)+Math.pow(m,2)/Math.pow(n,2);1<y&&(a*=Math.sqrt(y),n*=Math.sqrt(y)),t.rX=a,t.rY=n;var p=Math.pow(a,2)*Math.pow(m,2)+Math.pow(n,2)*Math.pow(c,2),T=(t.lArcFlag!==t.sweepFlag?1:-1)*Math.sqrt(Math.max(0,(Math.pow(a,2)*Math.pow(n,2)-p)/p)),f=a*m/n*T,O=-n*c/a*T,v=i([f,O],t.xRot/180*o);t.cX=v[0]+(r+s)/2,t.cY=v[1]+(e+u)/2,t.phi1=Math.atan2((m-O)/n,(c-f)/a),t.phi2=Math.atan2((-m-O)/n,(-c-f)/a),0===t.sweepFlag&&t.phi2>t.phi1&&(t.phi2-=2*o),1===t.sweepFlag&&t.phi2<t.phi1&&(t.phi2+=2*o),t.phi1*=180/o,t.phi2*=180/o}function u(t,r,e){n(t,r,e);var a=t*t+r*r-e*e;if(0>a)return[];if(0===a)return[[t*e/(t*t+r*r),r*e/(t*t+r*r)]];var i=Math.sqrt(a);return[[(t*e+r*i)/(t*t+r*r),(r*e-t*i)/(t*t+r*r)],[(t*e-r*i)/(t*t+r*r),(r*e+t*i)/(t*t+r*r)]]}var h=Math.PI/180;function c(t,r,e){return(1-e)*t+e*r}function m(t,r,e,a){return t+Math.cos(a/180*o)*r+Math.sin(a/180*o)*e}function y(t,r,e,a){var i=r-t,n=e-r,o=3*i+3*(a-e)-6*n,s=6*(n-i),u=3*i;return Math.abs(o)<1e-6?[-u/s]:function(t,r,e){void 0===e&&(e=1e-6);var a=t*t/4-r;if(a<-e)return[];if(a<=e)return[-t/2];var i=Math.sqrt(a);return[-t/2-i,-t/2+i]}(s/o,u/o,1e-6)}function p(t,r,e,a,i){var n=1-i;return t*(n*n*n)+r*(3*n*n*i)+e*(3*n*i*i)+a*(i*i*i)}!function(t){function r(){return o((function(t,r,e){return t.relative&&(void 0!==t.x1&&(t.x1+=r),void 0!==t.y1&&(t.y1+=e),void 0!==t.x2&&(t.x2+=r),void 0!==t.y2&&(t.y2+=e),void 0!==t.x&&(t.x+=r),void 0!==t.y&&(t.y+=e),t.relative=!1),t}))}function e(){var t=NaN,r=NaN,e=NaN,a=NaN;return o((function(i,n,o){return i.type&_.SMOOTH_CURVE_TO&&(i.type=_.CURVE_TO,t=isNaN(t)?n:t,r=isNaN(r)?o:r,i.x1=i.relative?n-t:2*n-t,i.y1=i.relative?o-r:2*o-r),i.type&_.CURVE_TO?(t=i.relative?n+i.x2:i.x2,r=i.relative?o+i.y2:i.y2):(t=NaN,r=NaN),i.type&_.SMOOTH_QUAD_TO&&(i.type=_.QUAD_TO,e=isNaN(e)?n:e,a=isNaN(a)?o:a,i.x1=i.relative?n-e:2*n-e,i.y1=i.relative?o-a:2*o-a),i.type&_.QUAD_TO?(e=i.relative?n+i.x1:i.x1,a=i.relative?o+i.y1:i.y1):(e=NaN,a=NaN),i}))}function a(){var t=NaN,r=NaN;return o((function(e,a,i){if(e.type&_.SMOOTH_QUAD_TO&&(e.type=_.QUAD_TO,t=isNaN(t)?a:t,r=isNaN(r)?i:r,e.x1=e.relative?a-t:2*a-t,e.y1=e.relative?i-r:2*i-r),e.type&_.QUAD_TO){t=e.relative?a+e.x1:e.x1,r=e.relative?i+e.y1:e.y1;var n=e.x1,o=e.y1;e.type=_.CURVE_TO,e.x1=((e.relative?0:a)+2*n)/3,e.y1=((e.relative?0:i)+2*o)/3,e.x2=(e.x+2*n)/3,e.y2=(e.y+2*o)/3}else t=NaN,r=NaN;return e}))}function o(t){var r=0,e=0,a=NaN,i=NaN;return function(n){if(isNaN(a)&&!(n.type&_.MOVE_TO))throw new Error("path must start with moveto");var o=t(n,r,e,a,i);return n.type&_.CLOSE_PATH&&(r=a,e=i),void 0!==n.x&&(r=n.relative?r+n.x:n.x),void 0!==n.y&&(e=n.relative?e+n.y:n.y),n.type&_.MOVE_TO&&(a=r,i=e),o}}function T(t,r,e,a,i,s){return n(t,r,e,a,i,s),o((function(n,o,u,h){var c=n.x1,m=n.x2,y=n.relative&&!isNaN(h),p=void 0!==n.x?n.x:y?0:o,T=void 0!==n.y?n.y:y?0:u;function f(t){return t*t}n.type&_.HORIZ_LINE_TO&&0!==r&&(n.type=_.LINE_TO,n.y=n.relative?0:u),n.type&_.VERT_LINE_TO&&0!==e&&(n.type=_.LINE_TO,n.x=n.relative?0:o),void 0!==n.x&&(n.x=n.x*t+T*e+(y?0:i)),void 0!==n.y&&(n.y=p*r+n.y*a+(y?0:s)),void 0!==n.x1&&(n.x1=n.x1*t+n.y1*e+(y?0:i)),void 0!==n.y1&&(n.y1=c*r+n.y1*a+(y?0:s)),void 0!==n.x2&&(n.x2=n.x2*t+n.y2*e+(y?0:i)),void 0!==n.y2&&(n.y2=m*r+n.y2*a+(y?0:s));var O=t*a-r*e;if(void 0!==n.xRot&&(1!==t||0!==r||0!==e||1!==a))if(0===O)delete n.rX,delete n.rY,delete n.xRot,delete n.lArcFlag,delete n.sweepFlag,n.type=_.LINE_TO;else{var v=n.xRot*Math.PI/180,l=Math.sin(v),N=Math.cos(v),d=1/f(n.rX),x=1/f(n.rY),A=f(N)*d+f(l)*x,E=2*l*N*(d-x),C=f(l)*d+f(N)*x,M=A*a*a-E*r*a+C*r*r,R=E*(t*a+r*e)-2*(A*e*a+C*t*r),S=A*e*e-E*t*e+C*t*t,g=(Math.atan2(R,M-S)+Math.PI)%Math.PI/2,I=Math.sin(g),V=Math.cos(g);n.rX=Math.abs(O)/Math.sqrt(M*f(V)+R*I*V+S*f(I)),n.rY=Math.abs(O)/Math.sqrt(M*f(I)-R*I*V+S*f(V)),n.xRot=180*g/Math.PI}return void 0!==n.sweepFlag&&0>O&&(n.sweepFlag=+!n.sweepFlag),n}))}function f(){return function(t){var r={};for(var e in t)r[e]=t[e];return r}}t.ROUND=function(t){function r(r){return Math.round(r*t)/t}return void 0===t&&(t=1e13),n(t),function(t){return void 0!==t.x1&&(t.x1=r(t.x1)),void 0!==t.y1&&(t.y1=r(t.y1)),void 0!==t.x2&&(t.x2=r(t.x2)),void 0!==t.y2&&(t.y2=r(t.y2)),void 0!==t.x&&(t.x=r(t.x)),void 0!==t.y&&(t.y=r(t.y)),void 0!==t.rX&&(t.rX=r(t.rX)),void 0!==t.rY&&(t.rY=r(t.rY)),t}},t.TO_ABS=r,t.TO_REL=function(){return o((function(t,r,e){return t.relative||(void 0!==t.x1&&(t.x1-=r),void 0!==t.y1&&(t.y1-=e),void 0!==t.x2&&(t.x2-=r),void 0!==t.y2&&(t.y2-=e),void 0!==t.x&&(t.x-=r),void 0!==t.y&&(t.y-=e),t.relative=!0),t}))},t.NORMALIZE_HVZ=function(t,r,e){return void 0===t&&(t=!0),void 0===r&&(r=!0),void 0===e&&(e=!0),o((function(a,i,n,o,s){if(isNaN(o)&&!(a.type&_.MOVE_TO))throw new Error("path must start with moveto");return r&&a.type&_.HORIZ_LINE_TO&&(a.type=_.LINE_TO,a.y=a.relative?0:n),e&&a.type&_.VERT_LINE_TO&&(a.type=_.LINE_TO,a.x=a.relative?0:i),t&&a.type&_.CLOSE_PATH&&(a.type=_.LINE_TO,a.x=a.relative?o-i:o,a.y=a.relative?s-n:s),a.type&_.ARC&&(0===a.rX||0===a.rY)&&(a.type=_.LINE_TO,delete a.rX,delete a.rY,delete a.xRot,delete a.lArcFlag,delete a.sweepFlag),a}))},t.NORMALIZE_ST=e,t.QT_TO_C=a,t.INFO=o,t.SANITIZE=function(t){void 0===t&&(t=0),n(t);var r=NaN,e=NaN,a=NaN,i=NaN;return o((function(n,o,s,u,h){var c=Math.abs,m=!1,y=0,p=0;if(n.type&_.SMOOTH_CURVE_TO&&(y=isNaN(r)?0:o-r,p=isNaN(e)?0:s-e),n.type&(_.CURVE_TO|_.SMOOTH_CURVE_TO)?(r=n.relative?o+n.x2:n.x2,e=n.relative?s+n.y2:n.y2):(r=NaN,e=NaN),n.type&_.SMOOTH_QUAD_TO?(a=isNaN(a)?o:2*o-a,i=isNaN(i)?s:2*s-i):n.type&_.QUAD_TO?(a=n.relative?o+n.x1:n.x1,i=n.relative?s+n.y1:n.y2):(a=NaN,i=NaN),n.type&_.LINE_COMMANDS||n.type&_.ARC&&(0===n.rX||0===n.rY||!n.lArcFlag)||n.type&_.CURVE_TO||n.type&_.SMOOTH_CURVE_TO||n.type&_.QUAD_TO||n.type&_.SMOOTH_QUAD_TO){var T=void 0===n.x?0:n.relative?n.x:n.x-o,f=void 0===n.y?0:n.relative?n.y:n.y-s;y=isNaN(a)?void 0===n.x1?y:n.relative?n.x:n.x1-o:a-o,p=isNaN(i)?void 0===n.y1?p:n.relative?n.y:n.y1-s:i-s;var O=void 0===n.x2?0:n.relative?n.x:n.x2-o,v=void 0===n.y2?0:n.relative?n.y:n.y2-s;c(T)<=t&&c(f)<=t&&c(y)<=t&&c(p)<=t&&c(O)<=t&&c(v)<=t&&(m=!0)}return n.type&_.CLOSE_PATH&&c(o-u)<=t&&c(s-h)<=t&&(m=!0),m?[]:n}))},t.MATRIX=T,t.ROTATE=function(t,r,e){void 0===r&&(r=0),void 0===e&&(e=0),n(t,r,e);var a=Math.sin(t),i=Math.cos(t);return T(i,a,-a,i,r-r*i+e*a,e-r*a-e*i)},t.TRANSLATE=function(t,r){return void 0===r&&(r=0),n(t,r),T(1,0,0,1,t,r)},t.SCALE=function(t,r){return void 0===r&&(r=t),n(t,r),T(t,0,0,r,0,0)},t.SKEW_X=function(t){return n(t),T(1,0,Math.atan(t),1,0,0)},t.SKEW_Y=function(t){return n(t),T(1,Math.atan(t),0,1,0,0)},t.X_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),n(t),T(-1,0,0,1,t,0)},t.Y_AXIS_SYMMETRY=function(t){return void 0===t&&(t=0),n(t),T(1,0,0,-1,0,t)},t.A_TO_C=function(){return o((function(t,r,e){return _.ARC===t.type?function(t,r,e){var a,n,o,u;t.cX||s(t,r,e);for(var m=Math.min(t.phi1,t.phi2),y=Math.max(t.phi1,t.phi2)-m,p=Math.ceil(y/90),T=new Array(p),f=r,O=e,v=0;v<p;v++){var l=c(t.phi1,t.phi2,v/p),N=c(t.phi1,t.phi2,(v+1)/p),d=N-l,x=4/3*Math.tan(d*h/4),A=[Math.cos(l*h)-x*Math.sin(l*h),Math.sin(l*h)+x*Math.cos(l*h)],E=A[0],C=A[1],M=[Math.cos(N*h),Math.sin(N*h)],R=M[0],S=M[1],g=[R+x*Math.sin(N*h),S-x*Math.cos(N*h)],I=g[0],V=g[1];T[v]={relative:t.relative,type:_.CURVE_TO};var D=function(r,e){var a=i([r*t.rX,e*t.rY],t.xRot),n=a[0],o=a[1];return[t.cX+n,t.cY+o]};a=D(E,C),T[v].x1=a[0],T[v].y1=a[1],n=D(I,V),T[v].x2=n[0],T[v].y2=n[1],o=D(R,S),T[v].x=o[0],T[v].y=o[1],t.relative&&(T[v].x1-=f,T[v].y1-=O,T[v].x2-=f,T[v].y2-=O,T[v].x-=f,T[v].y-=O),f=(u=[T[v].x,T[v].y])[0],O=u[1]}return T}(t,t.relative?0:r,t.relative?0:e):t}))},t.ANNOTATE_ARCS=function(){return o((function(t,r,e){return t.relative&&(r=0,e=0),_.ARC===t.type&&s(t,r,e),t}))},t.CLONE=f,t.CALCULATE_BOUNDS=function(){var t=function(t){var r={};for(var e in t)r[e]=t[e];return r},i=r(),n=a(),h=e(),c=o((function(r,e,a){var o=h(n(i(t(r))));function T(t){t>c.maxX&&(c.maxX=t),t<c.minX&&(c.minX=t)}function f(t){t>c.maxY&&(c.maxY=t),t<c.minY&&(c.minY=t)}if(o.type&_.DRAWING_COMMANDS&&(T(e),f(a)),o.type&_.HORIZ_LINE_TO&&T(o.x),o.type&_.VERT_LINE_TO&&f(o.y),o.type&_.LINE_TO&&(T(o.x),f(o.y)),o.type&_.CURVE_TO){T(o.x),f(o.y);for(var O=0,v=y(e,o.x1,o.x2,o.x);O<v.length;O++){0<(H=v[O])&&1>H&&T(p(e,o.x1,o.x2,o.x,H))}for(var l=0,N=y(a,o.y1,o.y2,o.y);l<N.length;l++){0<(H=N[l])&&1>H&&f(p(a,o.y1,o.y2,o.y,H))}}if(o.type&_.ARC){T(o.x),f(o.y),s(o,e,a);for(var d=o.xRot/180*Math.PI,x=Math.cos(d)*o.rX,A=Math.sin(d)*o.rX,E=-Math.sin(d)*o.rY,C=Math.cos(d)*o.rY,M=o.phi1<o.phi2?[o.phi1,o.phi2]:-180>o.phi2?[o.phi2+360,o.phi1+360]:[o.phi2,o.phi1],R=M[0],S=M[1],g=function(t){var r=t[0],e=t[1],a=180*Math.atan2(e,r)/Math.PI;return a<R?a+360:a},I=0,V=u(E,-x,0).map(g);I<V.length;I++){(H=V[I])>R&&H<S&&T(m(o.cX,x,E,H))}for(var D=0,L=u(C,-A,0).map(g);D<L.length;D++){var H;(H=L[D])>R&&H<S&&f(m(o.cY,A,C,H))}}return r}));return c.minX=1/0,c.maxX=-1/0,c.minY=1/0,c.maxY=-1/0,c}}(t.SVGPathDataTransformer||(t.SVGPathDataTransformer={}));var T,f=function(){function r(){}return r.prototype.round=function(r){return this.transform(t.SVGPathDataTransformer.ROUND(r))},r.prototype.toAbs=function(){return this.transform(t.SVGPathDataTransformer.TO_ABS())},r.prototype.toRel=function(){return this.transform(t.SVGPathDataTransformer.TO_REL())},r.prototype.normalizeHVZ=function(r,e,a){return this.transform(t.SVGPathDataTransformer.NORMALIZE_HVZ(r,e,a))},r.prototype.normalizeST=function(){return this.transform(t.SVGPathDataTransformer.NORMALIZE_ST())},r.prototype.qtToC=function(){return this.transform(t.SVGPathDataTransformer.QT_TO_C())},r.prototype.aToC=function(){return this.transform(t.SVGPathDataTransformer.A_TO_C())},r.prototype.sanitize=function(r){return this.transform(t.SVGPathDataTransformer.SANITIZE(r))},r.prototype.translate=function(r,e){return this.transform(t.SVGPathDataTransformer.TRANSLATE(r,e))},r.prototype.scale=function(r,e){return this.transform(t.SVGPathDataTransformer.SCALE(r,e))},r.prototype.rotate=function(r,e,a){return this.transform(t.SVGPathDataTransformer.ROTATE(r,e,a))},r.prototype.matrix=function(r,e,a,i,n,o){return this.transform(t.SVGPathDataTransformer.MATRIX(r,e,a,i,n,o))},r.prototype.skewX=function(r){return this.transform(t.SVGPathDataTransformer.SKEW_X(r))},r.prototype.skewY=function(r){return this.transform(t.SVGPathDataTransformer.SKEW_Y(r))},r.prototype.xSymmetry=function(r){return this.transform(t.SVGPathDataTransformer.X_AXIS_SYMMETRY(r))},r.prototype.ySymmetry=function(r){return this.transform(t.SVGPathDataTransformer.Y_AXIS_SYMMETRY(r))},r.prototype.annotateArcs=function(){return this.transform(t.SVGPathDataTransformer.ANNOTATE_ARCS())},r}(),O=function(t){return" "===t||"\t"===t||"\r"===t||"\n"===t},v=function(t){return"0".charCodeAt(0)<=t.charCodeAt(0)&&t.charCodeAt(0)<="9".charCodeAt(0)},l=function(t){function r(){var r=t.call(this)||this;return r.curNumber="",r.curCommandType=-1,r.curCommandRelative=!1,r.canParseCommandOrComma=!0,r.curNumberHasExp=!1,r.curNumberHasExpDigits=!1,r.curNumberHasDecimal=!1,r.curArgs=[],r}return e(r,t),r.prototype.finish=function(t){if(void 0===t&&(t=[]),this.parse(" ",t),0!==this.curArgs.length||!this.canParseCommandOrComma)throw new SyntaxError("Unterminated command at the path end.");return t},r.prototype.parse=function(t,r){var e=this;void 0===r&&(r=[]);for(var a=function(t){r.push(t),e.curArgs.length=0,e.canParseCommandOrComma=!0},i=0;i<t.length;i++){var n=t[i],o=!(this.curCommandType!==_.ARC||3!==this.curArgs.length&&4!==this.curArgs.length||1!==this.curNumber.length||"0"!==this.curNumber&&"1"!==this.curNumber),s=v(n)&&("0"===this.curNumber&&"0"===n||o);if(!v(n)||s)if("e"!==n&&"E"!==n)if("-"!==n&&"+"!==n||!this.curNumberHasExp||this.curNumberHasExpDigits)if("."!==n||this.curNumberHasExp||this.curNumberHasDecimal||o){if(this.curNumber&&-1!==this.curCommandType){var u=Number(this.curNumber);if(isNaN(u))throw new SyntaxError("Invalid number ending at "+i);if(this.curCommandType===_.ARC)if(0===this.curArgs.length||1===this.curArgs.length){if(0>u)throw new SyntaxError('Expected positive number, got "'+u+'" at index "'+i+'"')}else if((3===this.curArgs.length||4===this.curArgs.length)&&"0"!==this.curNumber&&"1"!==this.curNumber)throw new SyntaxError('Expected a flag, got "'+this.curNumber+'" at index "'+i+'"');this.curArgs.push(u),this.curArgs.length===N[this.curCommandType]&&(_.HORIZ_LINE_TO===this.curCommandType?a({type:_.HORIZ_LINE_TO,relative:this.curCommandRelative,x:u}):_.VERT_LINE_TO===this.curCommandType?a({type:_.VERT_LINE_TO,relative:this.curCommandRelative,y:u}):this.curCommandType===_.MOVE_TO||this.curCommandType===_.LINE_TO||this.curCommandType===_.SMOOTH_QUAD_TO?(a({type:this.curCommandType,relative:this.curCommandRelative,x:this.curArgs[0],y:this.curArgs[1]}),_.MOVE_TO===this.curCommandType&&(this.curCommandType=_.LINE_TO)):this.curCommandType===_.CURVE_TO?a({type:_.CURVE_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x2:this.curArgs[2],y2:this.curArgs[3],x:this.curArgs[4],y:this.curArgs[5]}):this.curCommandType===_.SMOOTH_CURVE_TO?a({type:_.SMOOTH_CURVE_TO,relative:this.curCommandRelative,x2:this.curArgs[0],y2:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.QUAD_TO?a({type:_.QUAD_TO,relative:this.curCommandRelative,x1:this.curArgs[0],y1:this.curArgs[1],x:this.curArgs[2],y:this.curArgs[3]}):this.curCommandType===_.ARC&&a({type:_.ARC,relative:this.curCommandRelative,rX:this.curArgs[0],rY:this.curArgs[1],xRot:this.curArgs[2],lArcFlag:this.curArgs[3],sweepFlag:this.curArgs[4],x:this.curArgs[5],y:this.curArgs[6]})),this.curNumber="",this.curNumberHasExpDigits=!1,this.curNumberHasExp=!1,this.curNumberHasDecimal=!1,this.canParseCommandOrComma=!0}if(!O(n))if(","===n&&this.canParseCommandOrComma)this.canParseCommandOrComma=!1;else if("+"!==n&&"-"!==n&&"."!==n)if(s)this.curNumber=n,this.curNumberHasDecimal=!1;else{if(0!==this.curArgs.length)throw new SyntaxError("Unterminated command at index "+i+".");if(!this.canParseCommandOrComma)throw new SyntaxError('Unexpected character "'+n+'" at index '+i+". Command cannot follow comma");if(this.canParseCommandOrComma=!1,"z"!==n&&"Z"!==n)if("h"===n||"H"===n)this.curCommandType=_.HORIZ_LINE_TO,this.curCommandRelative="h"===n;else if("v"===n||"V"===n)this.curCommandType=_.VERT_LINE_TO,this.curCommandRelative="v"===n;else if("m"===n||"M"===n)this.curCommandType=_.MOVE_TO,this.curCommandRelative="m"===n;else if("l"===n||"L"===n)this.curCommandType=_.LINE_TO,this.curCommandRelative="l"===n;else if("c"===n||"C"===n)this.curCommandType=_.CURVE_TO,this.curCommandRelative="c"===n;else if("s"===n||"S"===n)this.curCommandType=_.SMOOTH_CURVE_TO,this.curCommandRelative="s"===n;else if("q"===n||"Q"===n)this.curCommandType=_.QUAD_TO,this.curCommandRelative="q"===n;else if("t"===n||"T"===n)this.curCommandType=_.SMOOTH_QUAD_TO,this.curCommandRelative="t"===n;else{if("a"!==n&&"A"!==n)throw new SyntaxError('Unexpected character "'+n+'" at index '+i+".");this.curCommandType=_.ARC,this.curCommandRelative="a"===n}else r.push({type:_.CLOSE_PATH}),this.canParseCommandOrComma=!0,this.curCommandType=-1}else this.curNumber=n,this.curNumberHasDecimal="."===n}else this.curNumber+=n,this.curNumberHasDecimal=!0;else this.curNumber+=n;else this.curNumber+=n,this.curNumberHasExp=!0;else this.curNumber+=n,this.curNumberHasExpDigits=this.curNumberHasExp}return r},r.prototype.transform=function(t){return Object.create(this,{parse:{value:function(r,e){void 0===e&&(e=[]);for(var a=0,i=Object.getPrototypeOf(this).parse.call(this,r);a<i.length;a++){var n=i[a],o=t(n);Array.isArray(o)?e.push.apply(e,o):e.push(o)}return e}}})},r}(f),_=function(r){function i(t){var e=r.call(this)||this;return e.commands="string"==typeof t?i.parse(t):t,e}return e(i,r),i.prototype.encode=function(){return i.encode(this.commands)},i.prototype.getBounds=function(){var r=t.SVGPathDataTransformer.CALCULATE_BOUNDS();return this.transform(r),r},i.prototype.transform=function(t){for(var r=[],e=0,a=this.commands;e<a.length;e++){var i=t(a[e]);Array.isArray(i)?r.push.apply(r,i):r.push(i)}return this.commands=r,this},i.encode=function(t){return a(t)},i.parse=function(t){var r=new l,e=[];return r.parse(t,e),r.finish(e),e},i.CLOSE_PATH=1,i.MOVE_TO=2,i.HORIZ_LINE_TO=4,i.VERT_LINE_TO=8,i.LINE_TO=16,i.CURVE_TO=32,i.SMOOTH_CURVE_TO=64,i.QUAD_TO=128,i.SMOOTH_QUAD_TO=256,i.ARC=512,i.LINE_COMMANDS=i.LINE_TO|i.HORIZ_LINE_TO|i.VERT_LINE_TO,i.DRAWING_COMMANDS=i.HORIZ_LINE_TO|i.VERT_LINE_TO|i.LINE_TO|i.CURVE_TO|i.SMOOTH_CURVE_TO|i.QUAD_TO|i.SMOOTH_QUAD_TO|i.ARC,i}(f),N=((T={})[_.MOVE_TO]=2,T[_.LINE_TO]=2,T[_.HORIZ_LINE_TO]=1,T[_.VERT_LINE_TO]=1,T[_.CLOSE_PATH]=0,T[_.QUAD_TO]=4,T[_.SMOOTH_QUAD_TO]=2,T[_.CURVE_TO]=6,T[_.SMOOTH_CURVE_TO]=4,T[_.ARC]=7,T);t.COMMAND_ARG_COUNTS=N,t.SVGPathData=_,t.SVGPathDataParser=l,t.encodeSVGPath=a,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=/assets/svg-pathdata/lib/SVGPathData.js-82d33bbd1a7db3b4f6581bda2f46ee13c5083414af57957ddfc7aa542220aead.map
//!

;