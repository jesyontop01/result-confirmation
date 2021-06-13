/*!
 * angular-datatables - v0.5.6
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */

"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.colreorder"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function e(){var a="R";return i.dom=i.dom?i.dom:c.fn.dataTable.defaults.sDom,-1===i.dom.indexOf(a)&&(i.dom=a+i.dom),i.hasColReorder=!0,i}function f(a,b){return d.isString(a)&&(i.oColReorder=i.oColReorder&&null!==i.oColReorder?i.oColReorder:{},i.oColReorder[a]=b),i}function g(a){return d.isArray(a)&&i.withColReorderOption("aiOrder",a),i}function h(a){if(!d.isFunction(a))throw new Error("The reorder callback must be a function");return i.withColReorderOption("fnReorderCallback",a),i}var i=a(b);return i.withColReorder=e,i.withColReorderOption=f,i.withColReorderOrder=g,i.withColReorderCallback=h,i}var e=a.newOptions,f=a.fromSource,g=a.fromFnPromise;return a.newOptions=function(){return b(e)},a.fromSource=function(a){return b(f,a)},a.fromFnPromise=function(a){return b(g,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}d.module("datatables.colreorder",["datatables"]).config(e),e.$inject=["$provide"]}(window,document,jQuery,angular);
