"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var marginForSide = function (side) { return ({
    name: "margin-" + side,
    initialValue: '0',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.TOKEN_VALUE
}); };
exports.marginTop = marginForSide('top');
exports.marginRight = marginForSide('right');
exports.marginBottom = marginForSide('bottom');
exports.marginLeft = marginForSide('left');
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/margin.js-678d8b25dc280f129be2716868cf27a922fccaa3d1ae833ca4bad23480231ad1.map
//!

;
