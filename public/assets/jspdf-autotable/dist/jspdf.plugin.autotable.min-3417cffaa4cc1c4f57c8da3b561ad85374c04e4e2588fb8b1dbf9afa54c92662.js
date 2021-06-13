/*!
 * jsPDF AutoTable plugin v2.3.5
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable 
 * 
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * 
 * * /if (typeof window === 'object') window.jspdfAutoTableVersion = '2.3.5';/*
 */

!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("jspdf"));else if("function"==typeof define&&define.amd)define(["jspdf"],e);else{var r="object"==typeof exports?e(require("jspdf")):e(t.jsPDF);for(var o in r)("object"==typeof exports?exports:t)[o]=r[o]}}(window,function(t){return function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=17)}([function(t,e,r){"use strict";e.__esModule=!0,e.FONT_ROW_RATIO=1.15;var o=r(4),n=null,i=r(5),a=r(19);function l(){return{theme:"striped",styles:{},headerStyles:{},bodyStyles:{},alternateRowStyles:{},columnStyles:{},startY:!1,margin:40/u.scaleFactor(),pageBreak:"auto",tableWidth:"auto",showHeader:"everyPage",tableLineWidth:0,tableLineColor:200,createdHeaderCell:function(t,e){},createdCell:function(t,e){},drawHeaderRow:function(t,e){},drawRow:function(t,e){},drawHeaderCell:function(t,e){},drawCell:function(t,e){},addPageContent:function(t){}}}function s(){var t=u.scaleFactor();return{font:"helvetica",fontStyle:"normal",overflow:"ellipsize",fillColor:!1,textColor:20,halign:"left",valign:"top",fontSize:10,cellPadding:5/t,lineColor:200,lineWidth:0/t,columnWidth:"auto"}}e.getTheme=function(t){return{striped:{table:{fillColor:255,textColor:80,fontStyle:"normal"},header:{textColor:255,fillColor:[41,128,185],fontStyle:"bold"},body:{},alternateRow:{fillColor:245}},grid:{table:{fillColor:255,textColor:80,fontStyle:"normal",lineWidth:.1},header:{textColor:255,fillColor:[26,188,156],fontStyle:"bold",lineWidth:0},body:{},alternateRow:{}},plain:{header:{fontStyle:"bold"}}}[t]},e.getDefaults=l;var u=function(){function t(){}return t.pageSize=function(){var t=n.doc.internal.pageSize;return null==t.width&&(t={width:t.getWidth(),height:t.getHeight()}),t},t.applyUserStyles=function(){t.applyStyles(n.userStyles)},t.createTable=function(t){return n=new o.Table(t)},t.tableInstance=function(){return n},t.scaleFactor=function(){return n.doc.internal.scaleFactor},t.hooksData=function(t){return void 0===t&&(t={}),i({pageCount:n.pageCount,settings:n.settings,table:n,doc:n.doc,cursor:n.cursor},t||{})},t.initSettings=function(t,e){for(var r=function(r){var o=e.map(function(t){return t[r]||{}});t.styles[r]=i.apply(void 0,[{}].concat(o))},o=0,n=Object.keys(t.styles);o<n.length;o++){r(n[o])}for(var s=0,u=a(t.hooks);s<u.length;s++)for(var c=u[s],f=c[0],p=c[1],y=0,h=e;y<h.length;y++){var d=h[y];d&&d[f]&&p.push(d[f])}t.settings=i.apply(void 0,[l()].concat(e))},t.marginOrPadding=function(t,e){var r={};if(Array.isArray(t))t.length>=4?r={top:t[0],right:t[1],bottom:t[2],left:t[3]}:3===t.length?r={top:t[0],right:t[1],bottom:t[2],left:t[1]}:2===t.length?r={top:t[0],right:t[1],bottom:t[0],left:t[1]}:t=1===t.length?t[0]:e;else if("object"==typeof t){t.vertical?(t.top=t.vertical,t.bottom=t.vertical):t.horizontal&&(t.right=t.horizontal,t.left=t.horizontal);for(var o=0,n=["top","right","bottom","left"];o<n.length;o++){var i=n[o];r[i]=t[i]||0===t[i]?t[i]:e}}return"number"==typeof t&&(r={top:t,right:t,bottom:t,left:t}),r},t.styles=function(t){return t=Array.isArray(t)?t:[t],i.apply(void 0,[s()].concat(t))},t.applyStyles=function(t){var e=n.doc,r={fillColor:e.setFillColor,textColor:e.setTextColor,fontStyle:e.setFontStyle,lineColor:e.setDrawColor,lineWidth:e.setLineWidth,font:e.setFont,fontSize:e.setFontSize};Object.keys(r).forEach(function(e){var o=t[e],n=r[e];void 0!==o&&(Array.isArray(o)?n.apply(this,o):n(o))})},t}();e.Config=u},function(t,e,r){"use strict";var o=Function.prototype.toString,n=/^\s*class /,i=function(t){try{var e=o.call(t).replace(/\/\/.*\n/g,"").replace(/\/\*[.\s\S]*\*\//g,"").replace(/\n/gm," ").replace(/ {2}/g," ");return n.test(e)}catch(t){return!1}},a=Object.prototype.toString,l="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;t.exports=function(t){if(!t)return!1;if("function"!=typeof t&&"object"!=typeof t)return!1;if(l)return function(t){try{return!i(t)&&(o.call(t),!0)}catch(t){return!1}}(t);if(i(t))return!1;var e=a.call(t);return"[object Function]"===e||"[object GeneratorFunction]"===e}},function(t,e,r){var o=r(29);t.exports=Function.prototype.bind||o},function(t,e,r){"use strict";e.__esModule=!0;var o=r(0),n=r(16);function i(t,e){var r=o.Config.scaleFactor(),n=e.fontSize/r;o.Config.applyStyles(e);var i=0;(t=Array.isArray(t)?t:[t]).forEach(function(t){var e=o.Config.tableInstance().doc.getStringUnitWidth(t);e>i&&(i=e)});var a=1e4*r;return(i=Math.floor(i*a)/a)*n}function a(){var t=o.Config.tableInstance(),e={lineWidth:t.settings.tableLineWidth,lineColor:t.settings.tableLineColor};o.Config.applyStyles(e);var r=s(e);r&&t.doc.rect(t.pageStartX,t.pageStartY,t.width,t.cursor.y-t.pageStartY,r)}function l(){for(var t=0,e=o.Config.tableInstance().hooks.addPageContent;t<e.length;t++){var r=e[t];o.Config.applyUserStyles(),r(o.Config.hooksData())}o.Config.applyUserStyles()}function s(t){var e=t.lineWidth>0,r=t.fillColor||0===t.fillColor;return e&&r?"DF":e?"S":!!r&&"F"}function u(t){var e=t.internal.getCurrentPageInfo().pageNumber;t.setPage(e+1),t.internal.getCurrentPageInfo().pageNumber===e&&t.addPage()}e.getStringWidth=i,e.ellipsize=function t(e,r,n,a){if(void 0===a&&(a="..."),Array.isArray(e)){var l=[];return e.forEach(function(e,o){l[o]=t(e,r,n,a)}),l}var s=1e4*o.Config.scaleFactor();if((r=Math.ceil(r*s)/s)>=i(e,n))return e;for(;r<i(e+a,n)&&!(e.length<=1);)e=e.substring(0,e.length-1);return e.trim()+a},e.addTableBorder=a,e.addPage=function(){var t=o.Config.tableInstance();t.finalY=t.cursor.y,l(),a(),u(t.doc),t.pageCount++,t.cursor={x:t.margin("left"),y:t.margin("top")},t.pageStartX=t.cursor.x,t.pageStartY=t.cursor.y,!0!==t.settings.showHeader&&"everyPage"!==t.settings.showHeader||n.printRow(t.headerRow,t.hooks.drawHeaderRow,t.hooks.drawHeaderCell)},e.addContentHooks=l,e.getFillStyle=s,e.nextPage=u},function(t,e,r){"use strict";e.__esModule=!0;var o=r(0);e.table={};var n=function(){function t(t){this.height=0,this.width=0,this.contentWidth=0,this.preferredWidth=0,this.rows=[],this.columns=[],this.headerRow=null,this.pageCount=1,this.hooks={createdHeaderCell:[],createdCell:[],drawHeaderRow:[],drawRow:[],drawHeaderCell:[],drawCell:[],addPageContent:[]},this.styles={styles:{},headerStyles:{},bodyStyles:{},alternateRowStyles:{},columnStyles:{}},this.doc=t,this.userStyles={textColor:30,fontSize:t.internal.getFontSize(),fontStyle:t.internal.getFont().fontStyle}}return t.prototype.margin=function(t){return o.Config.marginOrPadding(this.settings.margin,o.getDefaults().margin)[t]},t}();e.Table=n;var i=function(){return function(t,e){this.cells={},this.spansMultiplePages=!1,this.pageCount=1,this.height=0,this.y=0,this.maxLineCount=1,this.raw=t,this.index=e}}();e.Row=i;var a=function(){function t(t){this.styles={},this.text="",this.contentWidth=0,this.textPos={},this.height=0,this.width=0,this.x=0,this.y=0,this.raw=t}return t.prototype.padding=function(t){var e=o.Config.marginOrPadding(this.styles.cellPadding,o.Config.styles([]).cellPadding);return"vertical"===t?e.top+e.bottom:"horizontal"===t?e.left+e.right:e[t]},t}();e.Cell=a;var l=function(){return function(t,e){this.options={},this.contentWidth=0,this.preferredWidth=0,this.widthStyle="auto",this.width=0,this.x=0,this.dataKey=t,this.index=e}}();e.Column=l},function(t,e,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(t){o[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var r,a,l=function(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(t),s=1;s<arguments.length;s++){for(var u in r=Object(arguments[s]))n.call(r,u)&&(l[u]=r[u]);if(o){a=o(r);for(var c=0;c<a.length;c++)i.call(r,a[c])&&(l[a[c]]=r[a[c]])}}return l}},function(t,e,r){"use strict";var o=r(20),n=r(22),i="function"==typeof Symbol&&"symbol"==typeof Symbol(),a=Object.prototype.toString,l=Object.defineProperty&&function(){var t={};try{for(var e in Object.defineProperty(t,"x",{enumerable:!1,value:t}),t)return!1;return t.x===t}catch(t){return!1}}(),s=function(t,e,r,o){(!(e in t)||function(t){return"function"==typeof t&&"[object Function]"===a.call(t)}(o)&&o())&&(l?Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:r,writable:!0}):t[e]=r)},u=function(t,e){var r=arguments.length>2?arguments[2]:{},a=o(e);i&&(a=a.concat(Object.getOwnPropertySymbols(e))),n(a,function(o){s(t,o,e[o],r[o])})};u.supportsDescriptors=!!l,t.exports=u},function(t,e,r){"use strict";var o=r(23),n=r(14),i=r(2).call(Function.call,Object.prototype.propertyIsEnumerable);t.exports=function(t){var e=o.RequireObjectCoercible(t),r=[];for(var a in e)n(e,a)&&i(e,a)&&r.push([a,e[a]]);return r}},function(t,e){t.exports=Number.isNaN||function(t){return t!=t}},function(t,e){var r=Number.isNaN||function(t){return t!=t};t.exports=Number.isFinite||function(t){return"number"==typeof t&&!r(t)&&t!==1/0&&t!==-1/0}},function(t,e){var r=Object.prototype.hasOwnProperty;t.exports=Object.assign||function(t,e){for(var o in e)r.call(e,o)&&(t[o]=e[o]);return t}},function(t,e){t.exports=function(t){return t>=0?1:-1}},function(t,e){t.exports=function(t,e){var r=t%e;return Math.floor(r>=0?r:r+e)}},function(t,e){t.exports=function(t){return null===t||"function"!=typeof t&&"object"!=typeof t}},function(t,e,r){var o=r(2);t.exports=o.call(Function.call,Object.prototype.hasOwnProperty)},function(t,e,r){"use strict";var o=r(7);t.exports=function(){return"function"==typeof Object.entries?Object.entries:o}},function(t,e,r){"use strict";e.__esModule=!0;var o=r(0),n=r(3);function i(t,e,r){var i=o.Config.tableInstance();t.y=i.cursor.y;for(var a=0,l=e;a<l.length;a++){if(!1===(0,l[a])(t,o.Config.hooksData({row:t,addPage:n.addPage})))return}i.cursor.x=i.margin("left");for(var s=0;s<i.columns.length;s++){var u=i.columns[s],c=t.cells[u.dataKey];if(c){o.Config.applyStyles(c.styles),c.x=i.cursor.x,c.y=i.cursor.y,c.height=t.height,c.width=u.width,"top"===c.styles.valign?c.textPos.y=i.cursor.y+c.padding("top"):"bottom"===c.styles.valign?c.textPos.y=i.cursor.y+t.height-c.padding("bottom"):c.textPos.y=i.cursor.y+t.height/2,"right"===c.styles.halign?c.textPos.x=c.x+c.width-c.padding("right"):"center"===c.styles.halign?c.textPos.x=c.x+c.width/2:c.textPos.x=c.x+c.padding("left");for(var f=!0,p=o.Config.hooksData({column:u,row:t,addPage:n.addPage}),y=0,h=r;y<h.length;y++){!1===(0,h[y])(c,p)&&(f=!1)}if(f){var d=n.getFillStyle(c.styles);d&&i.doc.rect(c.x,c.y,c.width,c.height,d),i.doc.autoTableText(c.text,c.textPos.x,c.textPos.y,{halign:c.styles.halign,valign:c.styles.valign})}i.cursor.x+=c.width}}i.cursor.y+=t.height}e.printFullRow=function t(e,r,a){var l=0,s={},u=o.Config.tableInstance();if(!function(t){var e=o.Config.tableInstance();return t+e.cursor.y+e.margin("bottom")<o.Config.pageSize().height}(e.height))if(e.maxLineCount<=1)n.addPage();else{e.spansMultiplePages=!0;for(var c=o.Config.pageSize().height,f=0,p=0;p<u.columns.length;p++){var y=u.columns[p],h=(S=e.cells[y.dataKey]).styles.fontSize/o.Config.scaleFactor()*o.FONT_ROW_RATIO,d=S.padding("vertical"),g=c-u.cursor.y-u.margin("bottom"),b=Math.floor((g-d)/h);if(b<0&&(b=0),Array.isArray(S.text)&&S.text.length>b){var v=S.text.splice(b,S.text.length);s[y.dataKey]=v;var m=S.text.length*h+d;m>f&&(f=m);var w=v.length*h+d;w>l&&(l=w)}}e.height=f}if(i(e,r,a),Object.keys(s).length>0){for(p=0;p<u.columns.length;p++){var S;y=u.columns[p],(S=e.cells[y.dataKey]).text=s[y.dataKey]||""}n.addPage(),e.pageCount++,e.height=l,t(e,r,a)}},e.printRow=i},function(t,e,r){"use strict";e.__esModule=!0;var o=r(18),n=r(0),i=r(3),a=r(16),l=r(34),s=r(35);o.API.autoTable=function(t,e,r){void 0===r&&(r={}),this.autoTableState=this.autoTableState||{},o.autoTableState=o.autoTableState||{};var u=[o.autoTableState.defaults||{},this.autoTableState.defaults||{},r||{}];s.validateInput(t,e,u);var c=n.Config.createTable(this);n.Config.initSettings(c,u);var f=c.settings;s.createModels(t,e),f.margin=n.Config.marginOrPadding(f.margin,n.getDefaults().margin),l.calculateWidths(this,n.Config.pageSize().width),c.cursor={x:c.margin("left"),y:!1===f.startY?c.margin("top"):f.startY};var p=f.startY+c.margin("bottom")+c.headerRow.height;"avoid"===f.pageBreak&&(p+=c.height);var y=n.Config.pageSize().height;("always"===f.pageBreak&&!1!==f.startY||!1!==f.startY&&p>y)&&(i.nextPage(c.doc),c.cursor.y=c.margin("top")),c.pageStartX=c.cursor.x,c.pageStartY=c.cursor.y,n.Config.applyUserStyles(),!0!==f.showHeader&&"firstPage"!==f.showHeader&&"everyPage"!==f.showHeader||a.printRow(c.headerRow,c.hooks.drawHeaderRow,c.hooks.drawHeaderCell),n.Config.applyUserStyles(),c.rows.forEach(function(t){a.printFullRow(t,c.hooks.drawRow,c.hooks.drawCell)}),i.addTableBorder();var h=this.internal.getCurrentPageInfo().pageNumber;return this.autoTableState.addPageHookPages&&this.autoTableState.addPageHookPages[h]?"function"==typeof r.addPageContent&&r.addPageContent(n.Config.hooksData()):(this.autoTableState.addPageHookPages||(this.autoTableState.addPageHookPages={}),this.autoTableState.addPageHookPages[h]=!0,i.addContentHooks()),c.finalY=c.cursor.y,this.autoTable.previous=c,n.Config.applyUserStyles(),this},o.API.autoTable.previous=!1,o.API.autoTableSetDefaults=function(t){return this.autoTableState||(this.autoTableState={}),t&&"object"==typeof t?this.autoTableState.defaults=t:delete this.autoTableState.defaults,this},o.autoTableSetDefaults=function(t){o.autoTableState||(o.autoTableState={}),t&&"object"==typeof t?this.autoTableState.defaults=t:delete this.autoTableState.defaults,o.autoTableState.defaults=t},o.API.autoTableHtmlToJson=function(t,e){if(e=e||!1,!(t&&t instanceof HTMLTableElement))return console.error("A HTMLTableElement has to be sent to autoTableHtmlToJson"),null;for(var r={},o=[],n=t.rows[0],i=0;i<n.cells.length;i++){var a=n.cells[i],l=window.getComputedStyle(a);(e||"none"!==l.display)&&(r[i]=a)}var s=function(n){var i=t.rows[n],a=window.getComputedStyle(i);if(e||"none"!==a.display){var l=[];Object.keys(r).forEach(function(t){var e=i.cells[t];l.push(e)}),o.push(l)}};for(i=1;i<t.rows.length;i++)s(i);return{columns:Object.keys(r).map(function(t){return r[t]}),rows:o,data:o}},o.API.autoTableText=function(t,e,r,o){"number"==typeof e&&"number"==typeof r||console.error("The x and y parameters are required. Missing for the text: ",t);var i=this.internal.scaleFactor,a=this.internal.getFontSize()/i,l=null,s=1;if("middle"!==o.valign&&"bottom"!==o.valign&&"center"!==o.halign&&"right"!==o.halign||(s=(l="string"==typeof t?t.split(/\r\n|\r|\n/g):t).length||1),r+=a*(2-n.FONT_ROW_RATIO),"middle"===o.valign?r-=s/2*a*n.FONT_ROW_RATIO:"bottom"===o.valign&&(r-=s*a*n.FONT_ROW_RATIO),"center"===o.halign||"right"===o.halign){var u=a;if("center"===o.halign&&(u*=.5),s>=1){for(var c=0;c<l.length;c++)this.text(l[c],e-this.getStringUnitWidth(l[c])*u,r),r+=a;return this}e-=this.getStringUnitWidth(t)*u}return this.text(t,e,r),this},o.API.autoTableEndPosY=function(){var t=this.autoTable.previous;return t.cursor&&"number"==typeof t.cursor.y?t.cursor.y:0},o.API.autoTableAddPageContent=function(t){return o.API.autoTable.globalDefaults||(o.API.autoTable.globalDefaults={}),o.API.autoTable.globalDefaults.addPageContent=t,this},o.API.autoTableAddPage=function(){return i.addPage(),this}},function(e,r){e.exports=t},function(t,e,r){"use strict";var o=r(6),n=r(7),i=r(15),a=r(33),l=i();o(l,{getPolyfill:i,implementation:n,shim:a}),t.exports=l},function(t,e,r){"use strict";var o=Object.prototype.hasOwnProperty,n=Object.prototype.toString,i=Array.prototype.slice,a=r(21),l=Object.prototype.propertyIsEnumerable,s=!l.call({toString:null},"toString"),u=l.call(function(){},"prototype"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],f=function(t){var e=t.constructor;return e&&e.prototype===t},p={$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},y=function(){if("undefined"==typeof window)return!1;for(var t in window)try{if(!p["$"+t]&&o.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{f(window[t])}catch(t){return!0}}catch(t){return!0}return!1}(),h=function(t){var e=null!==t&&"object"==typeof t,r="[object Function]"===n.call(t),i=a(t),l=e&&"[object String]"===n.call(t),p=[];if(!e&&!r&&!i)throw new TypeError("Object.keys called on a non-object");var h=u&&r;if(l&&t.length>0&&!o.call(t,0))for(var d=0;d<t.length;++d)p.push(String(d));if(i&&t.length>0)for(var g=0;g<t.length;++g)p.push(String(g));else for(var b in t)h&&"prototype"===b||!o.call(t,b)||p.push(String(b));if(s)for(var v=function(t){if("undefined"==typeof window||!y)return f(t);try{return f(t)}catch(t){return!1}}(t),m=0;m<c.length;++m)v&&"constructor"===c[m]||!o.call(t,c[m])||p.push(c[m]);return p};h.shim=function(){if(Object.keys){if(!function(){return 2===(Object.keys(arguments)||"").length}(1,2)){var t=Object.keys;Object.keys=function(e){return a(e)?t(i.call(e)):t(e)}}}else Object.keys=h;return Object.keys||h},t.exports=h},function(t,e,r){"use strict";var o=Object.prototype.toString;t.exports=function(t){var e=o.call(t),r="[object Arguments]"===e;return r||(r="[object Array]"!==e&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===o.call(t.callee)),r}},function(t,e){var r=Object.prototype.hasOwnProperty,o=Object.prototype.toString;t.exports=function(t,e,n){if("[object Function]"!==o.call(e))throw new TypeError("iterator must be a function");var i=t.length;if(i===+i)for(var a=0;a<i;a++)e.call(n,t[a],a,t);else for(var l in t)r.call(t,l)&&e.call(n,t[l],l,t)}},function(t,e,r){"use strict";var o=r(24),n=r(10)(o,{SameValueNonNumber:function(t,e){if("number"==typeof t||typeof t!=typeof e)throw new TypeError("SameValueNonNumber requires two non-number values of the same type.");return this.SameValue(t,e)}});t.exports=n},function(t,e,r){"use strict";var o=Object.prototype.toString,n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator,i=n?Symbol.prototype.toString:o,a=r(8),l=r(9),s=Number.MAX_SAFE_INTEGER||Math.pow(2,53)-1,u=r(10),c=r(11),f=r(12),p=r(25),y=r(26),h=parseInt,d=r(2),g=d.call(Function.call,String.prototype.slice),b=d.call(Function.call,RegExp.prototype.test,/^0b[01]+$/i),v=d.call(Function.call,RegExp.prototype.test,/^0o[0-7]+$/i),m=["","​","￾"].join(""),w=new RegExp("["+m+"]","g"),S=d.call(Function.call,RegExp.prototype.test,w),T=d.call(Function.call,RegExp.prototype.test,/^[-+]0x[0-9a-f]+$/i),x=["\t\n\v\f\r   ᠎    ","         　\u2028","\u2029\ufeff"].join(""),C=new RegExp("(^["+x+"]+)|(["+x+"]+$)","g"),j=d.call(Function.call,String.prototype.replace),O=r(30),P=r(32),I=u(u({},O),{Call:function(t,e){var r=arguments.length>2?arguments[2]:[];if(!this.IsCallable(t))throw new TypeError(t+" is not a function");return t.apply(e,r)},ToPrimitive:y,ToNumber:function(t){var e=p(t)?t:y(t,"number");if("symbol"==typeof e)throw new TypeError("Cannot convert a Symbol value to a number");if("string"==typeof e){if(b(e))return this.ToNumber(h(g(e,2),2));if(v(e))return this.ToNumber(h(g(e,2),8));if(S(e)||T(e))return NaN;var r=function(t){return j(t,C,"")}(e);if(r!==e)return this.ToNumber(r)}return Number(e)},ToInt16:function(t){var e=this.ToUint16(t);return e>=32768?e-65536:e},ToInt8:function(t){var e=this.ToUint8(t);return e>=128?e-256:e},ToUint8:function(t){var e=this.ToNumber(t);if(a(e)||0===e||!l(e))return 0;var r=c(e)*Math.floor(Math.abs(e));return f(r,256)},ToUint8Clamp:function(t){var e=this.ToNumber(t);if(a(e)||e<=0)return 0;if(e>=255)return 255;var r=Math.floor(t);return r+.5<e?r+1:e<r+.5?r:r%2!=0?r+1:r},ToString:function(t){if("symbol"==typeof t)throw new TypeError("Cannot convert a Symbol value to a string");return String(t)},ToObject:function(t){return this.RequireObjectCoercible(t),Object(t)},ToPropertyKey:function(t){var e=this.ToPrimitive(t,String);return"symbol"==typeof e?i.call(e):this.ToString(e)},ToLength:function(t){var e=this.ToInteger(t);return e<=0?0:e>s?s:e},CanonicalNumericIndexString:function(t){if("[object String]"!==o.call(t))throw new TypeError("must be a string");if("-0"===t)return-0;var e=this.ToNumber(t);return this.SameValue(this.ToString(e),t)?e:void 0},RequireObjectCoercible:O.CheckObjectCoercible,IsArray:Array.isArray||function(t){return"[object Array]"===o.call(t)},IsConstructor:function(t){return"function"==typeof t&&!!t.prototype},IsExtensible:function(t){return!Object.preventExtensions||!p(t)&&Object.isExtensible(t)},IsInteger:function(t){if("number"!=typeof t||a(t)||!l(t))return!1;var e=Math.abs(t);return Math.floor(e)===e},IsPropertyKey:function(t){return"string"==typeof t||"symbol"==typeof t},IsRegExp:function(t){if(!t||"object"!=typeof t)return!1;if(n){var e=t[Symbol.match];if(void 0!==e)return O.ToBoolean(e)}return P(t)},SameValueZero:function(t,e){return t===e||a(t)&&a(e)},GetV:function(t,e){if(!this.IsPropertyKey(e))throw new TypeError("Assertion failed: IsPropertyKey(P) is not true");return this.ToObject(t)[e]},GetMethod:function(t,e){if(!this.IsPropertyKey(e))throw new TypeError("Assertion failed: IsPropertyKey(P) is not true");var r=this.GetV(t,e);if(null!=r){if(!this.IsCallable(r))throw new TypeError(e+"is not a function");return r}},Get:function(t,e){if("Object"!==this.Type(t))throw new TypeError("Assertion failed: Type(O) is not Object");if(!this.IsPropertyKey(e))throw new TypeError("Assertion failed: IsPropertyKey(P) is not true");return t[e]},Type:function(t){return"symbol"==typeof t?"Symbol":O.Type(t)},SpeciesConstructor:function(t,e){if("Object"!==this.Type(t))throw new TypeError("Assertion failed: Type(O) is not Object");var r=t.constructor;if(void 0===r)return e;if("Object"!==this.Type(r))throw new TypeError("O.constructor is not an Object");var o=n&&Symbol.species?r[Symbol.species]:void 0;if(null==o)return e;if(this.IsConstructor(o))return o;throw new TypeError("no constructor found")}});delete I.CheckObjectCoercible,t.exports=I},function(t,e){t.exports=function(t){return null===t||"function"!=typeof t&&"object"!=typeof t}},function(t,e,r){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator,n=r(13),i=r(1),a=r(27),l=r(28);t.exports=function(t,e){if(n(t))return t;var r,s="default";if(arguments.length>1&&(e===String?s="string":e===Number&&(s="number")),o&&(Symbol.toPrimitive?r=function(t,e){var r=t[e];if(null!==r&&void 0!==r){if(!i(r))throw new TypeError(r+" returned for property "+e+" of object "+t+" is not a function");return r}}(t,Symbol.toPrimitive):l(t)&&(r=Symbol.prototype.valueOf)),void 0!==r){var u=r.call(t,s);if(n(u))return u;throw new TypeError("unable to convert exotic object to primitive")}return"default"===s&&(a(t)||l(t))&&(s="string"),function(t,e){if(void 0===t||null===t)throw new TypeError("Cannot call method on "+t);if("string"!=typeof e||"number"!==e&&"string"!==e)throw new TypeError('hint must be "string" or "number"');var r,o,a,l="string"===e?["toString","valueOf"]:["valueOf","toString"];for(a=0;a<l.length;++a)if(r=t[l[a]],i(r)&&(o=r.call(t),n(o)))return o;throw new TypeError("No default value")}(t,"default"===s?"number":s)}},function(t,e,r){"use strict";var o=Date.prototype.getDay,n=Object.prototype.toString,i="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;t.exports=function(t){return"object"==typeof t&&null!==t&&(i?function(t){try{return o.call(t),!0}catch(t){return!1}}(t):"[object Date]"===n.call(t))}},function(t,e,r){"use strict";var o=Object.prototype.toString;if("function"==typeof Symbol&&"symbol"==typeof Symbol()){var n=Symbol.prototype.toString,i=/^Symbol\(.*\)$/;t.exports=function(t){if("symbol"==typeof t)return!0;if("[object Symbol]"!==o.call(t))return!1;try{return function(t){return"symbol"==typeof t.valueOf()&&i.test(n.call(t))}(t)}catch(t){return!1}}}else t.exports=function(t){return!1}},function(t,e){var r=Array.prototype.slice,o=Object.prototype.toString;t.exports=function(t){var e=this;if("function"!=typeof e||"[object Function]"!==o.call(e))throw new TypeError("Function.prototype.bind called on incompatible "+e);for(var n,i=r.call(arguments,1),a=Math.max(0,e.length-i.length),l=[],s=0;s<a;s++)l.push("$"+s);if(n=Function("binder","return function ("+l.join(",")+"){ return binder.apply(this,arguments); }")(function(){if(this instanceof n){var o=e.apply(this,i.concat(r.call(arguments)));return Object(o)===o?o:this}return e.apply(t,i.concat(r.call(arguments)))}),e.prototype){var u=function(){};u.prototype=e.prototype,n.prototype=new u,u.prototype=null}return n}},function(t,e,r){"use strict";var o=r(8),n=r(9),i=r(11),a=r(12),l=r(1),s={ToPrimitive:r(31),ToBoolean:function(t){return Boolean(t)},ToNumber:function(t){return Number(t)},ToInteger:function(t){var e=this.ToNumber(t);return o(e)?0:0!==e&&n(e)?i(e)*Math.floor(Math.abs(e)):e},ToInt32:function(t){return this.ToNumber(t)>>0},ToUint32:function(t){return this.ToNumber(t)>>>0},ToUint16:function(t){var e=this.ToNumber(t);if(o(e)||0===e||!n(e))return 0;var r=i(e)*Math.floor(Math.abs(e));return a(r,65536)},ToString:function(t){return String(t)},ToObject:function(t){return this.CheckObjectCoercible(t),Object(t)},CheckObjectCoercible:function(t,e){if(null==t)throw new TypeError(e||"Cannot call method on "+t);return t},IsCallable:l,SameValue:function(t,e){return t===e?0!==t||1/t==1/e:o(t)&&o(e)},Type:function(t){return null===t?"Null":void 0===t?"Undefined":"function"==typeof t||"object"==typeof t?"Object":"number"==typeof t?"Number":"boolean"==typeof t?"Boolean":"string"==typeof t?"String":void 0}};t.exports=s},function(t,e,r){"use strict";var o=Object.prototype.toString,n=r(13),i=r(1),a=function(t,e){var r=e||("[object Date]"===o.call(t)?String:Number);if(r===String||r===Number){var a,l,s=r===String?["toString","valueOf"]:["valueOf","toString"];for(l=0;l<s.length;++l)if(i(t[s[l]])&&(a=t[s[l]](),n(a)))return a;throw new TypeError("No default value")}throw new TypeError("invalid [[DefaultValue]] hint supplied")};t.exports=function(t,e){return n(t)?t:a(t,e)}},function(t,e,r){"use strict";var o=r(14),n=RegExp.prototype.exec,i=Object.getOwnPropertyDescriptor,a=Object.prototype.toString,l="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;t.exports=function(t){if(!t||"object"!=typeof t)return!1;if(!l)return"[object RegExp]"===a.call(t);var e=i(t,"lastIndex");return!(!e||!o(e,"value"))&&function(t){try{var e=t.lastIndex;return t.lastIndex=0,n.call(t),!0}catch(t){return!1}finally{t.lastIndex=e}}(t)}},function(t,e,r){"use strict";var o=r(15),n=r(6);t.exports=function(){var t=o();return n(Object,{entries:t},{entries:function(){return Object.entries!==t}}),t}},function(t,e,r){"use strict";e.__esModule=!0;var o=r(0),n=r(3);e.calculateWidths=function(t,e){var r=o.Config.tableInstance(),i=0,a=0,l=[];r.columns.forEach(function(t){t.contentWidth=0,r.rows.concat(r.headerRow).forEach(function(e){var r=e.cells[t.dataKey];r.contentWidth=r.padding("horizontal")+n.getStringWidth(r.text,r.styles),r.contentWidth>t.contentWidth&&(t.contentWidth=r.contentWidth)}),r.contentWidth+=t.contentWidth,"number"==typeof t.widthStyle?(t.preferredWidth=t.widthStyle,i+=t.preferredWidth,t.width=t.preferredWidth):"wrap"===t.widthStyle?(t.preferredWidth=t.contentWidth,i+=t.preferredWidth,t.width=t.preferredWidth):(t.preferredWidth=t.contentWidth,a+=t.contentWidth,l.push(t)),r.preferredWidth+=t.preferredWidth}),"number"==typeof r.settings.tableWidth?r.width=r.settings.tableWidth:"wrap"===r.settings.tableWidth?r.width=r.preferredWidth:r.width=e-r.margin("left")-r.margin("right"),function t(e,r,n,i){for(var a=o.Config.tableInstance(),l=a.width-r-n,s=0;s<e.length;s++){var u=e[s],c=u.contentWidth/n,f=u.contentWidth+l*c<i;if(l<0&&f){e.splice(s,1),n-=u.contentWidth,u.width=i,r+=u.width,t(e,r,n,i);break}u.width=u.contentWidth+l*c}}(l,i,a,0),r.rows.concat(r.headerRow).forEach(function(e){r.columns.forEach(function(r){var i=e.cells[r.dataKey];o.Config.applyStyles(i.styles);var a=r.width-i.padding("horizontal"),l=o.Config.scaleFactor();if("linebreak"===i.styles.overflow)try{i.text=t.splitTextToSize(i.text,a+1/l,{fontSize:i.styles.fontSize})}catch(e){if(!(e instanceof TypeError&&Array.isArray(i.text)))throw e;i.text=t.splitTextToSize(i.text.join(" "),a+1/l,{fontSize:i.styles.fontSize})}else"ellipsize"===i.styles.overflow?i.text=n.ellipsize(i.text,a,i.styles):"visible"===i.styles.overflow||("hidden"===i.styles.overflow?i.text=n.ellipsize(i.text,a,i.styles,""):"function"==typeof i.styles.overflow?i.text=i.styles.overflow(i.text,a):console.error("Unrecognized overflow type: "+i.styles.overflow));var s=Array.isArray(i.text)?i.text.length:1,u=i.styles.fontSize/l*o.FONT_ROW_RATIO;i.contentHeight=s*u+i.padding("vertical"),i.contentHeight>e.height&&(e.height=i.contentHeight,e.maxLineCount=s)}),r.height+=e.height})}},function(t,e,r){"use strict";e.__esModule=!0;var o=r(4),n=r(0),i=r(5);e.validateInput=function(t,e,r){t&&"object"==typeof t||console.error("The headers should be an object or array, is: "+typeof t),e&&"object"==typeof e||console.error("The data should be an object or array, is: "+typeof e);for(var o=function(t){t&&"object"!=typeof t&&console.error("The options parameter should be of type object, is: "+typeof t),void 0!==t.extendWidth&&(t.tableWidth=t.extendWidth?"auto":"wrap",console.error("Use of deprecated option: extendWidth, use tableWidth instead.")),void 0!==t.margins&&(void 0===t.margin&&(t.margin=t.margins),console.error("Use of deprecated option: margins, use margin instead.")),void 0===t.afterPageContent&&void 0===t.beforePageContent&&void 0===t.afterPageAdd||(console.error("The afterPageContent, beforePageContent and afterPageAdd hooks are deprecated. Use addPageContent instead"),void 0===t.addPageContent&&(t.addPageContent=function(e){n.Config.applyUserStyles(),t.beforePageContent&&t.beforePageContent(e),n.Config.applyUserStyles(),t.afterPageContent&&t.afterPageContent(e),n.Config.applyUserStyles(),t.afterPageAdd&&e.pageCount>1&&e.afterPageAdd(e),n.Config.applyUserStyles()})),[["padding","cellPadding"],["lineHeight","rowHeight"],"fontSize","overflow"].forEach(function(e){var r="string"==typeof e?e:e[0],o="string"==typeof e?e:e[1];void 0!==t[r]&&(void 0===t.styles[o]&&(t.styles[o]=t[r]),console.error("Use of deprecated option: "+r+", use the style "+o+" instead."))});for(var e=0,r=["styles","bodyStyles","headerStyles","columnStyles"];e<r.length;e++){var o=r[e];t[o]&&"object"!=typeof t[o]?console.error("The "+o+" style should be of type object, is: "+typeof t[o]):t[o]&&t[o].rowHeight&&console.error("Use of deprecated style: rowHeight, use vertical cell padding instead")}},i=0,a=r;i<a.length;i++)o(a[i])},e.createModels=function(t,e){var r=/\r\n|\r|\n/g,a=n.Config.tableInstance(),l=a.settings,s=n.getTheme(l.theme),u=new o.Row(t,-1);u.index=-1,t.forEach(function(t,e){var i=e;void 0!==t.dataKey?i=t.dataKey:void 0!==t.key&&(console.error("Deprecation warning: Use dataKey instead of key"),i=t.key);var c=new o.Column(i,e);c.raw=t,c.widthStyle=n.Config.styles([s.table,s.header,a.styles.styles,a.styles.columnStyles[c.dataKey]||{}]).columnWidth,a.columns.push(c);var f=new o.Cell(t);if(f.styles=n.Config.styles([s.table,s.header,a.styles.styles,a.styles.headerStyles]),f.raw instanceof HTMLElement)f.text=(f.raw.innerText||"").trim();else{var p="object"==typeof f.raw?f.raw.title:f.raw;f.text=void 0!==f.raw?""+p:""}f.text=f.text.split(r),u.cells[i]=f;for(var y=0,h=a.hooks.createdHeaderCell;y<h.length;y++)(0,h[y])(f,{cell:f,column:c,row:u,settings:l})}),a.headerRow=u,e.forEach(function(t,e){var l=new o.Row(t,e),u=e%2==0?i({},s.alternateRow,a.styles.alternateRowStyles):{};a.columns.forEach(function(e){var i=new o.Cell(t[e.dataKey]),c=a.styles.columnStyles[e.dataKey]||{};i.styles=n.Config.styles([s.table,s.body,a.styles.styles,a.styles.bodyStyles,u,c]),i.raw&&i.raw instanceof HTMLElement?i.text=(i.raw.innerText||"").trim():i.text=void 0!==i.raw?""+i.raw:"",i.text=i.text.split(r),l.cells[e.dataKey]=i;for(var f=0,p=a.hooks.createdCell;f<p.length;f++)(0,p[f])(i,n.Config.hooksData({cell:i,column:e,row:l}))}),a.rows.push(l)})}}])});
