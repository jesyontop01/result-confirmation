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
var LIElementContainer = /** @class */ (function (_super) {
    __extends(LIElementContainer, _super);
    function LIElementContainer(element) {
        var _this = _super.call(this, element) || this;
        _this.value = element.value;
        return _this;
    }
    return LIElementContainer;
}(element_container_1.ElementContainer));
exports.LIElementContainer = LIElementContainer;
//# sourceMappingURL=/assets/html2canvas/dist/lib/dom/elements/li-element-container.js-1b705cc8660beb466ecb5476e93d7d1975a50bd583947a98d26c1a1c2f2303dd.map
//!

;
