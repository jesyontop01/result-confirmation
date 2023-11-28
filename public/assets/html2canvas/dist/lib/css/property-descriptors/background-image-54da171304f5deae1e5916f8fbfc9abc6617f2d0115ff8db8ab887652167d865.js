"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenizer_1 = require("../syntax/tokenizer");
var image_1 = require("../types/image");
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
exports.backgroundImage = {
    name: 'background-image',
    initialValue: 'none',
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function (tokens) {
        if (tokens.length === 0) {
            return [];
        }
        var first = tokens[0];
        if (first.type === tokenizer_1.TokenType.IDENT_TOKEN && first.value === 'none') {
            return [];
        }
        return tokens.filter(function (value) { return parser_1.nonFunctionArgSeparator(value) && image_1.isSupportedImage(value); }).map(image_1.image.parse);
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/background-image.js-cfb55857cf06908025ce3977b6a04a51fc11bab0f71789ceba5c788079339e13.map
//!

;
