"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var tokenizer_1 = require("../syntax/tokenizer");
exports.letterSpacing = {
    name: 'letter-spacing',
    initialValue: '0',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.VALUE,
    parse: function (token) {
        if (token.type === tokenizer_1.TokenType.IDENT_TOKEN && token.value === 'normal') {
            return 0;
        }
        if (token.type === tokenizer_1.TokenType.NUMBER_TOKEN) {
            return token.number;
        }
        if (token.type === tokenizer_1.TokenType.DIMENSION_TOKEN) {
            return token.number;
        }
        return 0;
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/letter-spacing.js-2be9b56e9266c6825a2f9c7ececd2f7b9f649bccbd780cb1f99e6dca35323a21.map
//!

;
