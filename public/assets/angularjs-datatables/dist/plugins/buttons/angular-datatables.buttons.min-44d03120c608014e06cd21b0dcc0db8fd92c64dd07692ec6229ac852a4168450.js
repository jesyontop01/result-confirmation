/*!
 * angularjs-datatables - v0.5.9
 * https://github.com/dtaylor113/angularjs-datatables
 * License: MIT
 */

"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="datatables.buttons"),function(a,b,c,d){"use strict";function e(a){function b(a){function b(a,b){function e(a){var b="B";if(f.dom=f.dom?f.dom:c.fn.dataTable.defaults.sDom,-1===f.dom.indexOf(b)&&(f.dom=b+f.dom),d.isUndefined(a))throw new Error("You must define the options for the button extension. See https://datatables.net/reference/option/buttons#Examples for some example");return f.buttons=a,f}var f=a(b);return f.withButtons=e,f}var e=a.newOptions,f=a.fromSource,g=a.fromFnPromise;return a.newOptions=function(){return b(e)},a.fromSource=function(a){return b(f,a)},a.fromFnPromise=function(a){return b(g,a)},a}a.decorator("DTOptionsBuilder",b),b.$inject=["$delegate"]}function f(a){function b(a){a&&d.isArray(a.buttons)&&(a.buttonsTmp=a.buttons.slice())}function c(a){a&&d.isDefined(a.buttonsTmp)&&(a.buttons=a.buttonsTmp,delete a.buttonsTmp)}var e={preRender:b,postRender:c};a.registerPlugin(e)}d.module("datatables.buttons",["datatables"]).config(e).run(f),e.$inject=["$provide"],f.$inject=["DTRendererService"]}(window,document,jQuery,angular);
