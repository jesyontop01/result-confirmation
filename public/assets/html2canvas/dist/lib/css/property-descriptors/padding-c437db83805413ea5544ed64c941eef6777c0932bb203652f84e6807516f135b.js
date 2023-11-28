"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var paddingForSide = function (side) { return ({
    name: "padding-" + side,
    initialValue: '0',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.TYPE_VALUE,
    format: 'length-percentage'
}); };
exports.paddingTop = paddingForSide('top');
exports.paddingRight = paddingForSide('right');
exports.paddingBottom = paddingForSide('bottom');
exports.paddingLeft = paddingForSide('left');
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/padding.js-565908503a967a72dbcd5b873aa7c398fb11ddaa5cc3359c1996cebb9e64d2f3.map
//!

;
