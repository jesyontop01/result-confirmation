/*!
 * angular-datatables - v0.5.6
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */

"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.scroller"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function d(){var a="S";return e.dom=e.dom?e.dom:c.fn.dataTable.defaults.sDom,-1===e.dom.indexOf(a)&&(e.dom=e.dom+a),e}var e=a(b);return e.withScroller=d,e}var d=a.newOptions,e=a.fromSource,f=a.fromFnPromise;return a.newOptions=function(){return b(d)},a.fromSource=function(a){return b(e,a)},a.fromFnPromise=function(a){return b(f,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}d.module("datatables.scroller",["datatables"]).config(e),e.$inject=["$provide"]}(window,document,jQuery,angular);
