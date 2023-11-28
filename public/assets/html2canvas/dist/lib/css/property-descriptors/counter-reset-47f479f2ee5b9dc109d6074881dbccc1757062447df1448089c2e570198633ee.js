"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
exports.counterReset = {
    name: 'counter-reset',
    initialValue: 'none',
    prefix: true,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.LIST,
    parse: function (tokens) {
        if (tokens.length === 0) {
            return [];
        }
        var resets = [];
        var filtered = tokens.filter(parser_1.nonWhiteSpace);
        for (var i = 0; i < filtered.length; i++) {
            var counter = filtered[i];
            var next = filtered[i + 1];
            if (parser_1.isIdentToken(counter) && counter.value !== 'none') {
                var reset = next && parser_1.isNumberToken(next) ? next.number : 0;
                resets.push({ counter: counter.value, reset: reset });
            }
        }
        return resets;
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/counter-reset.js-bc6bd74acdc96d158e22c5d6a4f1294659c064dcb20907909fcb6f4e510359d8.map
//!

;
