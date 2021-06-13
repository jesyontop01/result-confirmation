/*
 Copyright (C) Federico Zivolo 2020
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?b(exports):'function'==typeof define&&define.amd?define(['exports'],b):b(a.PopperUtils={})})(this,function(a){'use strict';function b(a,b){if(1!==a.nodeType)return[];var c=a.ownerDocument.defaultView,d=c.getComputedStyle(a,null);return b?d[b]:d}function c(a){return'HTML'===a.nodeName?a:a.parentNode||a.host}function d(a){if(!a)return document.body;switch(a.nodeName){case'HTML':case'BODY':return a.ownerDocument.body;case'#document':return a.body;}var e=b(a),f=e.overflow,g=e.overflowX,h=e.overflowY;return /(auto|scroll|overlay)/.test(f+h+g)?a:d(c(a))}function e(a){return a&&a.referenceNode?a.referenceNode:a}function f(a){return 11===a?T:10===a?U:T||U}function g(a){if(!a)return document.documentElement;for(var c=f(10)?document.body:null,d=a.offsetParent||null;d===c&&a.nextElementSibling;)d=(a=a.nextElementSibling).offsetParent;var e=d&&d.nodeName;return e&&'BODY'!==e&&'HTML'!==e?-1!==['TH','TD','TABLE'].indexOf(d.nodeName)&&'static'===b(d,'position')?g(d):d:a?a.ownerDocument.documentElement:document.documentElement}function h(a){var b=a.nodeName;return'BODY'!==b&&('HTML'===b||g(a.firstElementChild)===a)}function i(a){return null===a.parentNode?a:i(a.parentNode)}function j(a,b){if(!a||!a.nodeType||!b||!b.nodeType)return document.documentElement;var c=a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING,d=c?a:b,e=c?b:a,f=document.createRange();f.setStart(d,0),f.setEnd(e,0);var k=f.commonAncestorContainer;if(a!==k&&b!==k||d.contains(e))return h(k)?k:g(k);var l=i(a);return l.host?j(l.host,b):j(a,i(b).host)}function k(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:'top',c='top'===b?'scrollTop':'scrollLeft',d=a.nodeName;if('BODY'===d||'HTML'===d){var e=a.ownerDocument.documentElement,f=a.ownerDocument.scrollingElement||e;return f[c]}return a[c]}function l(a,b){var c=2<arguments.length&&void 0!==arguments[2]&&arguments[2],d=k(b,'top'),e=k(b,'left'),f=c?-1:1;return a.top+=d*f,a.bottom+=d*f,a.left+=e*f,a.right+=e*f,a}function m(a,b){var c='x'===b?'Left':'Top',d='Left'==c?'Right':'Bottom';return parseFloat(a['border'+c+'Width'])+parseFloat(a['border'+d+'Width'])}function n(a,b,c,d){return R(b['offset'+a],b['scroll'+a],c['client'+a],c['offset'+a],c['scroll'+a],f(10)?parseInt(c['offset'+a])+parseInt(d['margin'+('Height'===a?'Top':'Left')])+parseInt(d['margin'+('Height'===a?'Bottom':'Right')]):0)}function o(a){var b=a.body,c=a.documentElement,d=f(10)&&getComputedStyle(c);return{height:n('Height',b,c,d),width:n('Width',b,c,d)}}function p(a){return V({},a,{right:a.left+a.width,bottom:a.top+a.height})}function q(a){var c={};try{if(f(10)){c=a.getBoundingClientRect();var d=k(a,'top'),e=k(a,'left');c.top+=d,c.left+=e,c.bottom+=d,c.right+=e}else c=a.getBoundingClientRect()}catch(a){}var g={left:c.left,top:c.top,width:c.right-c.left,height:c.bottom-c.top},h='HTML'===a.nodeName?o(a.ownerDocument):{},i=h.width||a.clientWidth||g.width,j=h.height||a.clientHeight||g.height,l=a.offsetWidth-i,n=a.offsetHeight-j;if(l||n){var q=b(a);l-=m(q,'x'),n-=m(q,'y'),g.width-=l,g.height-=n}return p(g)}function r(a,c){var e=2<arguments.length&&void 0!==arguments[2]&&arguments[2],g=f(10),h='HTML'===c.nodeName,i=q(a),j=q(c),k=d(a),m=b(c),n=parseFloat(m.borderTopWidth),o=parseFloat(m.borderLeftWidth);e&&h&&(j.top=R(j.top,0),j.left=R(j.left,0));var r=p({top:i.top-j.top-n,left:i.left-j.left-o,width:i.width,height:i.height});if(r.marginTop=0,r.marginLeft=0,!g&&h){var s=parseFloat(m.marginTop),t=parseFloat(m.marginLeft);r.top-=n-s,r.bottom-=n-s,r.left-=o-t,r.right-=o-t,r.marginTop=s,r.marginLeft=t}return(g&&!e?c.contains(k):c===k&&'BODY'!==k.nodeName)&&(r=l(r,c)),r}function s(a){var b=1<arguments.length&&arguments[1]!==void 0&&arguments[1],c=a.ownerDocument.documentElement,d=r(a,c),e=R(c.clientWidth,window.innerWidth||0),f=R(c.clientHeight,window.innerHeight||0),g=b?0:k(c),h=b?0:k(c,'left'),i={top:g-d.top+d.marginTop,left:h-d.left+d.marginLeft,width:e,height:f};return p(i)}function t(a){var d=a.nodeName;if('BODY'===d||'HTML'===d)return!1;if('fixed'===b(a,'position'))return!0;var e=c(a);return!!e&&t(e)}function u(a){if(!a||!a.parentElement||f())return document.documentElement;for(var c=a.parentElement;c&&'none'===b(c,'transform');)c=c.parentElement;return c||document.documentElement}function v(a,b,f,g){var h=4<arguments.length&&void 0!==arguments[4]&&arguments[4],i={top:0,left:0},k=h?u(a):j(a,e(b));if('viewport'===g)i=s(k,h);else{var l;'scrollParent'===g?(l=d(c(b)),'BODY'===l.nodeName&&(l=a.ownerDocument.documentElement)):'window'===g?l=a.ownerDocument.documentElement:l=g;var m=r(l,k,h);if('HTML'===l.nodeName&&!t(k)){var n=o(a.ownerDocument),p=n.height,q=n.width;i.top+=m.top-m.marginTop,i.bottom=p+m.top,i.left+=m.left-m.marginLeft,i.right=q+m.left}else i=m}f=f||0;var v='number'==typeof f;return i.left+=v?f:f.left||0,i.top+=v?f:f.top||0,i.right-=v?f:f.right||0,i.bottom-=v?f:f.bottom||0,i}function w(a){var b=a.width,c=a.height;return b*c}function x(a,b,c,d,e){var f=5<arguments.length&&arguments[5]!==void 0?arguments[5]:0;if(-1===a.indexOf('auto'))return a;var g=v(c,d,f,e),h={top:{width:g.width,height:b.top-g.top},right:{width:g.right-b.right,height:g.height},bottom:{width:g.width,height:g.bottom-b.bottom},left:{width:b.left-g.left,height:g.height}},i=Object.keys(h).map(function(a){return V({key:a},h[a],{area:w(h[a])})}).sort(function(c,a){return a.area-c.area}),j=i.filter(function(a){var b=a.width,d=a.height;return b>=c.clientWidth&&d>=c.clientHeight}),k=0<j.length?j[0].key:i[0].key,l=a.split('-')[1];return k+(l?'-'+l:'')}function y(a,b){return Array.prototype.find?a.find(b):a.filter(b)[0]}function z(a,b,c){if(Array.prototype.findIndex)return a.findIndex(function(a){return a[b]===c});var d=y(a,function(a){return a[b]===c});return a.indexOf(d)}function A(a){var b;if('HTML'===a.nodeName){var c=o(a.ownerDocument),d=c.width,e=c.height;b={width:d,height:e,left:0,top:0}}else b={width:a.offsetWidth,height:a.offsetHeight,left:a.offsetLeft,top:a.offsetTop};return p(b)}function B(a){var b=a.ownerDocument.defaultView,c=b.getComputedStyle(a),d=parseFloat(c.marginTop||0)+parseFloat(c.marginBottom||0),e=parseFloat(c.marginLeft||0)+parseFloat(c.marginRight||0),f={width:a.offsetWidth+e,height:a.offsetHeight+d};return f}function C(a){var b={left:'right',right:'left',bottom:'top',top:'bottom'};return a.replace(/left|right|bottom|top/g,function(a){return b[a]})}function D(a,b,c){c=c.split('-')[0];var d=B(a),e={width:d.width,height:d.height},f=-1!==['right','left'].indexOf(c),g=f?'top':'left',h=f?'left':'top',i=f?'height':'width',j=f?'width':'height';return e[g]=b[g]+b[i]/2-d[i]/2,e[h]=c===h?b[h]-d[j]:b[C(h)],e}function E(a,b,c){var d=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null,f=d?u(b):j(b,e(c));return r(c,f,d)}function F(a){for(var b=[!1,'ms','Webkit','Moz','O'],c=a.charAt(0).toUpperCase()+a.slice(1),d=0;d<b.length;d++){var e=b[d],f=e?''+e+c:a;if('undefined'!=typeof document.body.style[f])return f}return null}function G(a){return a&&'[object Function]'==={}.toString.call(a)}function H(a,b){return a.some(function(a){var c=a.name,d=a.enabled;return d&&c===b})}function I(a,b,c){var d=y(a,function(a){var c=a.name;return c===b}),e=!!d&&a.some(function(a){return a.name===c&&a.enabled&&a.order<d.order});if(!e){var f='`'+b+'`';console.warn('`'+c+'`'+' modifier is required by '+f+' modifier in order to work, be sure to include it before '+f+'!')}return e}function J(a){return''!==a&&!isNaN(parseFloat(a))&&isFinite(a)}function K(a){var b=a.ownerDocument;return b?b.defaultView:window}function L(a,b){return K(a).removeEventListener('resize',b.updateBound),b.scrollParents.forEach(function(a){a.removeEventListener('scroll',b.updateBound)}),b.updateBound=null,b.scrollParents=[],b.scrollElement=null,b.eventsEnabled=!1,b}function M(a,b,c){var d=void 0===c?a:a.slice(0,z(a,'name',c));return d.forEach(function(a){a['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var c=a['function']||a.fn;a.enabled&&G(c)&&(b.offsets.popper=p(b.offsets.popper),b.offsets.reference=p(b.offsets.reference),b=c(b,a))}),b}function N(a,b){Object.keys(b).forEach(function(c){var d=b[c];!1===d?a.removeAttribute(c):a.setAttribute(c,b[c])})}function O(a,b){Object.keys(b).forEach(function(c){var d='';-1!==['width','height','top','right','bottom','left'].indexOf(c)&&J(b[c])&&(d='px'),a.style[c]=b[c]+d})}function P(a,b,c,e){var f='BODY'===a.nodeName,g=f?a.ownerDocument.defaultView:a;g.addEventListener(b,c,{passive:!0}),f||P(d(g.parentNode),b,c,e),e.push(g)}function Q(a,b,c,e){c.updateBound=e,K(a).addEventListener('resize',c.updateBound,{passive:!0});var f=d(a);return P(f,'scroll',c.updateBound,c.scrollParents),c.scrollElement=f,c.eventsEnabled=!0,c}var R=Math.max,S='undefined'!=typeof window&&'undefined'!=typeof document&&'undefined'!=typeof navigator,T=S&&!!(window.MSInputMethodContext&&document.documentMode),U=S&&/MSIE 10/.test(navigator.userAgent),V=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},W=function(){for(var a=['Edge','Trident','Firefox'],b=0;b<a.length;b+=1)if(S&&0<=navigator.userAgent.indexOf(a[b]))return 1;return 0}(),X=S&&window.Promise,Y=X?function(a){var b=!1;return function(){b||(b=!0,window.Promise.resolve().then(function(){b=!1,a()}))}}:function(a){var b=!1;return function(){b||(b=!0,setTimeout(function(){b=!1,a()},W))}};a.computeAutoPlacement=x,a.debounce=Y,a.findIndex=z,a.getBordersSize=m,a.getBoundaries=v,a.getBoundingClientRect=q,a.getClientRect=p,a.getOffsetParent=g,a.getOffsetRect=A,a.getOffsetRectRelativeToArbitraryNode=r,a.getOuterSizes=B,a.getParentNode=c,a.getPopperOffsets=D,a.getReferenceOffsets=E,a.getScroll=k,a.getScrollParent=d,a.getStyleComputedProperty=b,a.getSupportedPropertyName=F,a.getWindowSizes=o,a.isFixed=t,a.isFunction=G,a.isModifierEnabled=H,a.isModifierRequired=I,a.isNumeric=J,a.removeEventListeners=L,a.runModifiers=M,a.setAttributes=N,a.setStyles=O,a.setupEventListeners=Q,a['default']={computeAutoPlacement:x,debounce:Y,findIndex:z,getBordersSize:m,getBoundaries:v,getBoundingClientRect:q,getClientRect:p,getOffsetParent:g,getOffsetRect:A,getOffsetRectRelativeToArbitraryNode:r,getOuterSizes:B,getParentNode:c,getPopperOffsets:D,getReferenceOffsets:E,getScroll:k,getScrollParent:d,getStyleComputedProperty:b,getSupportedPropertyName:F,getWindowSizes:o,isFixed:t,isFunction:G,isModifierEnabled:H,isModifierRequired:I,isNumeric:J,removeEventListeners:L,runModifiers:M,setAttributes:N,setStyles:O,setupEventListeners:Q},Object.defineProperty(a,'__esModule',{value:!0})});
//# sourceMappingURL=popper-utils.min.js.map
;
