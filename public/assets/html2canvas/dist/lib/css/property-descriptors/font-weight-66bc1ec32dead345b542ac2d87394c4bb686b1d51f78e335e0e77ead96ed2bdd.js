"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
exports.fontWeight = {
    name: 'font-weight',
    initialValue: 'normal',
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.VALUE,
    prefix: false,
    parse: function (token) {
        if (parser_1.isNumberToken(token)) {
            return token.number;
        }
        if (parser_1.isIdentToken(token)) {
            switch (token.value) {
                case 'bold':
                    return 700;
                case 'normal':
                default:
                    return 400;
            }
        }
        return 400;
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/font-weight.js-ae84422ee909908e12fc777c3b60390f22ef41c9448a9894d4fb6c4298b7cf04.map
//!

;
