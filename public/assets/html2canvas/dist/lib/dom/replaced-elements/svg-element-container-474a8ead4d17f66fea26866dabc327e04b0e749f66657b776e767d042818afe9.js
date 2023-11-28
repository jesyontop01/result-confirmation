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
var cache_storage_1 = require("../../core/cache-storage");
var SVGElementContainer = /** @class */ (function (_super) {
    __extends(SVGElementContainer, _super);
    function SVGElementContainer(img) {
        var _this = _super.call(this, img) || this;
        var s = new XMLSerializer();
        _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
        _this.intrinsicWidth = img.width.baseVal.value;
        _this.intrinsicHeight = img.height.baseVal.value;
        cache_storage_1.CacheStorage.getInstance().addImage(_this.svg);
        return _this;
    }
    return SVGElementContainer;
}(element_container_1.ElementContainer));
exports.SVGElementContainer = SVGElementContainer;
//# sourceMappingURL=/assets/html2canvas/dist/lib/dom/replaced-elements/svg-element-container.js-d1251094002a3e14b4f6358047d19b56332ca89db8be9e272e6bf714890a0918.map
//!

;
