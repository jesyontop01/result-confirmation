/*!
 * angularjs-datatables - v0.5.9
 * https://github.com/dtaylor113/angularjs-datatables
 * License: MIT
 */

"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.tabletools"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function e(a){console.warn("The tabletools extension has been retired. Please use the select and buttons extensions instead: https://datatables.net/extensions/select/ and https://datatables.net/extensions/buttons/");var b="T";return h.dom=h.dom?h.dom:c.fn.dataTable.defaults.sDom,-1===h.dom.indexOf(b)&&(h.dom=b+h.dom),h.hasTableTools=!0,d.isString(a)&&h.withTableToolsOption("sSwfPath",a),h}function f(a,b){return d.isString(a)&&(h.oTableTools=h.oTableTools&&null!==h.oTableTools?h.oTableTools:{},h.oTableTools[a]=b),h}function g(a){return d.isArray(a)&&h.withTableToolsOption("aButtons",a),h}var h=a(b);return h.withTableTools=e,h.withTableToolsOption=f,h.withTableToolsButtons=g,h}var e=a.newOptions,f=a.fromSource,g=a.fromFnPromise;return a.newOptions=function(){return b(e)},a.fromSource=function(a){return b(f,a)},a.fromFnPromise=function(a){return b(g,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}d.module("datatables.tabletools",["datatables"]).config(e),e.$inject=["$provide"]}(window,document,jQuery,angular);