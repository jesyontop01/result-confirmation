"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var parser_1 = require("../syntax/parser");
var tokenizer_1 = require("../syntax/tokenizer");
exports.quotes = {
    name: 'quotes',
    initialValue: 'none',
    prefix: true,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.LIST,
    parse: function (tokens) {
        if (tokens.length === 0) {
            return null;
        }
        var first = tokens[0];
        if (first.type === tokenizer_1.TokenType.IDENT_TOKEN && first.value === 'none') {
            return null;
        }
        var quotes = [];
        var filtered = tokens.filter(parser_1.isStringToken);
        if (filtered.length % 2 !== 0) {
            return null;
        }
        for (var i = 0; i < filtered.length; i += 2) {
            var open_1 = filtered[i].value;
            var close_1 = filtered[i + 1].value;
            quotes.push({ open: open_1, close: close_1 });
        }
        return quotes;
    }
};
exports.getQuote = function (quotes, depth, open) {
    if (!quotes) {
        return '';
    }
    var quote = quotes[Math.min(depth, quotes.length - 1)];
    if (!quote) {
        return '';
    }
    return open ? quote.open : quote.close;
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/quotes.js-ffe6b58030ef8a3cb7f171ba83b15747cbb5c78278068f3b5fcd5854a72b3a0d.map
//!

;
