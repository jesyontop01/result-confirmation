"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
var borderWidthForSide = function (side) { return ({
    name: "border-" + side + "-width",
    initialValue: '0',
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.VALUE,
    prefix: false,
    parse: function (token) {
        if (parser_1.isDimensionToken(token)) {
            return token.number;
        }
        return 0;
    }
}); };
exports.borderTopWidth = borderWidthForSide('top');
exports.borderRightWidth = borderWidthForSide('right');
exports.borderBottomWidth = borderWidthForSide('bottom');
exports.borderLeftWidth = borderWidthForSide('left');
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/border-width.js-d1f1568af6248b44647076c0ffd35c3e44470c8274e9404e18b7e737d65eab86.map
//!

;
