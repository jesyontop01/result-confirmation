"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
exports.textDecorationLine = {
    name: 'text-decoration-line',
    initialValue: 'none',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.LIST,
    parse: function (tokens) {
        return tokens
            .filter(parser_1.isIdentToken)
            .map(function (token) {
            switch (token.value) {
                case 'underline':
                    return 1 /* UNDERLINE */;
                case 'overline':
                    return 2 /* OVERLINE */;
                case 'line-through':
                    return 3 /* LINE_THROUGH */;
                case 'none':
                    return 4 /* BLINK */;
            }
            return 0 /* NONE */;
        })
            .filter(function (line) { return line !== 0 /* NONE */; });
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/text-decoration-line.js-98e6cd99f8c5a70026bf59fb620713b8c041b5f95174fccf8604ad293594de5a.map
//!

;
