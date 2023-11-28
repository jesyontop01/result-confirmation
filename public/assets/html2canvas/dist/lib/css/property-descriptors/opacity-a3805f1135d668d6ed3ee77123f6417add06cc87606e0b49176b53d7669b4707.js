"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
exports.opacity = {
    name: 'opacity',
    initialValue: '1',
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.VALUE,
    prefix: false,
    parse: function (token) {
        if (parser_1.isNumberToken(token)) {
            return token.number;
        }
        return 1;
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/opacity.js-65bfe8c304338f7fe16ea17113a8c2657605f30e7045fdb0c79c2a8ba8233654.map
//!

;
