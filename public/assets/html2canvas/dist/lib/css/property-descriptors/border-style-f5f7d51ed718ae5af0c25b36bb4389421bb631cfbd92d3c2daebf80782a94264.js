"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var BORDER_STYLE;
(function (BORDER_STYLE) {
    BORDER_STYLE[BORDER_STYLE["NONE"] = 0] = "NONE";
    BORDER_STYLE[BORDER_STYLE["SOLID"] = 1] = "SOLID";
})(BORDER_STYLE = exports.BORDER_STYLE || (exports.BORDER_STYLE = {}));
var borderStyleForSide = function (side) { return ({
    name: "border-" + side + "-style",
    initialValue: 'solid',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (style) {
        switch (style) {
            case 'none':
                return BORDER_STYLE.NONE;
        }
        return BORDER_STYLE.SOLID;
    }
}); };
exports.borderTopStyle = borderStyleForSide('top');
exports.borderRightStyle = borderStyleForSide('right');
exports.borderBottomStyle = borderStyleForSide('bottom');
exports.borderLeftStyle = borderStyleForSide('left');
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/border-style.js-ffd5269ca5f206bd2ebfbef22450b2e4007bef49ab2aae681d2f51c131114137.map
//!

;
