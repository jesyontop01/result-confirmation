"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
var length_percentage_1 = require("../types/length-percentage");
exports.backgroundPosition = {
    name: 'background-position',
    initialValue: '0% 0%',
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function (tokens) {
        return parser_1.parseFunctionArgs(tokens)
            .map(function (values) { return values.filter(length_percentage_1.isLengthPercentage); })
            .map(length_percentage_1.parseLengthPercentageTuple);
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/background-position.js-bab078a15ef2a095000d84240af10db80434bc0cb0c87167d753f27cd1c5ecf7.map
//!

;
