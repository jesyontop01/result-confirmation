"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
var tokenizer_1 = require("../syntax/tokenizer");
exports.zIndex = {
    name: 'z-index',
    initialValue: 'auto',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.VALUE,
    parse: function (token) {
        if (token.type === tokenizer_1.TokenType.IDENT_TOKEN) {
            return { auto: true, order: 0 };
        }
        if (parser_1.isNumberToken(token)) {
            return { auto: false, order: token.number };
        }
        throw new Error("Invalid z-index number parsed");
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/z-index.js-9c212550dea6afeec8f630dd618ee3b2cd656dbb1d9fc7239e8c7c43da4692d0.map
//!

;
