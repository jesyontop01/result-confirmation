/*!
 * angular-datatables - v0.5.6
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */

"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.light-columnfilter"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function c(a){return d.hasLightColumnFilter=!0,a&&(d.lightColumnFilterOptions=a),d}var d=a(b);return d.withLightColumnFilter=c,d}var c=a.newOptions,d=a.fromSource,e=a.fromFnPromise;return a.newOptions=function(){return b(c)},a.fromSource=function(a){return b(d,a)},a.fromFnPromise=function(a){return b(e,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}function f(a){function b(a,b){a&&a.hasLightColumnFilter&&new c.fn.dataTable.ColumnFilter(b.DataTable,a.lightColumnFilterOptions)}var d={postRender:b};a.registerPlugin(d)}d.module("datatables.light-columnfilter",["datatables"]).config(e).run(f),e.$inject=["$provide"],f.$inject=["DTRendererService"]}(window,document,jQuery,angular);