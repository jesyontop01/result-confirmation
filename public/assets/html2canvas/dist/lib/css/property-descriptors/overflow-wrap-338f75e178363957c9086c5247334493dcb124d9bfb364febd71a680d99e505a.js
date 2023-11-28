"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var OVERFLOW_WRAP;
(function (OVERFLOW_WRAP) {
    OVERFLOW_WRAP["NORMAL"] = "normal";
    OVERFLOW_WRAP["BREAK_WORD"] = "break-word";
})(OVERFLOW_WRAP = exports.OVERFLOW_WRAP || (exports.OVERFLOW_WRAP = {}));
exports.overflowWrap = {
    name: 'overflow-wrap',
    initialValue: 'normal',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (overflow) {
        switch (overflow) {
            case 'break-word':
                return OVERFLOW_WRAP.BREAK_WORD;
            case 'normal':
            default:
                return OVERFLOW_WRAP.NORMAL;
        }
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/overflow-wrap.js-44066843c834d3571d8358647d5b924cdddc410d81fd6ee4d8b883a98464beb9.map
//!

;
