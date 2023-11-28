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
var CanvasElementContainer = /** @class */ (function (_super) {
    __extends(CanvasElementContainer, _super);
    function CanvasElementContainer(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.canvas = canvas;
        _this.intrinsicWidth = canvas.width;
        _this.intrinsicHeight = canvas.height;
        return _this;
    }
    return CanvasElementContainer;
}(element_container_1.ElementContainer));
exports.CanvasElementContainer = CanvasElementContainer;
//# sourceMappingURL=/assets/html2canvas/dist/lib/dom/replaced-elements/canvas-element-container.js-bd8f2150bca0ec96f72638dd4d1e586301ab89926fe3c8a06a1689a8dbae6e3a.map
//!

;
