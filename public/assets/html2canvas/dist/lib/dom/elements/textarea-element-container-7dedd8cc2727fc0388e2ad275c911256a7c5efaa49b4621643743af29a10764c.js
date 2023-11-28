"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var element_container_1 = require("../element-container");
var TextareaElementContainer = /** @class */ (function (_super) {
    __extends(TextareaElementContainer, _super);
    function TextareaElementContainer(element) {
        var _this = _super.call(this, element) || this;
        _this.value = element.value;
        return _this;
    }
    return TextareaElementContainer;
}(element_container_1.ElementContainer));
exports.TextareaElementContainer = TextareaElementContainer;
//# sourceMappingURL=/assets/html2canvas/dist/lib/dom/elements/textarea-element-container.js-3e50e863bfd3f660b910234a29355ff22620fc522f382f53d2ac2bfb9a3850dd.map
//!

;