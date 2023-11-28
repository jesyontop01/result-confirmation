"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var borderColorForSide = function (side) { return ({
    name: "border-" + side + "-color",
    initialValue: 'transparent',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.TYPE_VALUE,
    format: 'color'
}); };
exports.borderTopColor = borderColorForSide('top');
exports.borderRightColor = borderColorForSide('right');
exports.borderBottomColor = borderColorForSide('bottom');
exports.borderLeftColor = borderColorForSide('left');
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/border-color.js-469f809dcc080d48a4a161c5d659f279d08990742a6aa32a4ed9e1a8156f889b.map
//!

;
