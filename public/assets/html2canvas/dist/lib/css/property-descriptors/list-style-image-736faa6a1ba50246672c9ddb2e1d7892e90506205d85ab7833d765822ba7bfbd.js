"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenizer_1 = require("../syntax/tokenizer");
var image_1 = require("../types/image");
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
exports.listStyleImage = {
    name: 'list-style-image',
    initialValue: 'none',
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.VALUE,
    prefix: false,
    parse: function (token) {
        if (token.type === tokenizer_1.TokenType.IDENT_TOKEN && token.value === 'none') {
            return null;
        }
        return image_1.image.parse(token);
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/list-style-image.js-00fb38d173fa11dd84c9767d26b2c37e0707ecb0280c6911a8dd14dc63205abe.map
//!

;
