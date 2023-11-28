"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var length_percentage_1 = require("../types/length-percentage");
var borderRadiusForSide = function (side) { return ({
    name: "border-radius-" + side,
    initialValue: '0 0',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.LIST,
    parse: function (tokens) { return length_percentage_1.parseLengthPercentageTuple(tokens.filter(length_percentage_1.isLengthPercentage)); }
}); };
exports.borderTopLeftRadius = borderRadiusForSide('top-left');
exports.borderTopRightRadius = borderRadiusForSide('top-right');
exports.borderBottomRightRadius = borderRadiusForSide('bottom-right');
exports.borderBottomLeftRadius = borderRadiusForSide('bottom-left');
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/border-radius.js-c9dce8b05996f5270e03578f03275c5eab7f5201b14265ee37bc1661f27d83ad.map
//!

;
