/*!
 * angular-datatables - v0.5.6
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */

"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.colvis"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function e(){console.warn("The colvis extension has been retired. Please use the button extension instead: https://datatables.net/extensions/buttons/");var a="C";return h.dom=h.dom?h.dom:c.fn.dataTable.defaults.sDom,-1===h.dom.indexOf(a)&&(h.dom=a+h.dom),h.hasColVis=!0,h}function f(a,b){return d.isString(a)&&(h.oColVis=h.oColVis&&null!==h.oColVis?h.oColVis:{},h.oColVis[a]=b),h}function g(a){if(!d.isFunction(a))throw new Error("The state change must be a function");return h.withColVisOption("fnStateChange",a),h}var h=a(b);return h.withColVis=e,h.withColVisOption=f,h.withColVisStateChange=g,h}var e=a.newOptions,f=a.fromSource,g=a.fromFnPromise;return a.newOptions=function(){return b(e)},a.fromSource=function(a){return b(f,a)},a.fromFnPromise=function(a){return b(g,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}d.module("datatables.colvis",["datatables"]).config(e),e.$inject=["$provide"]}(window,document,jQuery,angular);
