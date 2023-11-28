"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var LINE_BREAK;
(function (LINE_BREAK) {
    LINE_BREAK["NORMAL"] = "normal";
    LINE_BREAK["STRICT"] = "strict";
})(LINE_BREAK = exports.LINE_BREAK || (exports.LINE_BREAK = {}));
exports.lineBreak = {
    name: 'line-break',
    initialValue: 'normal',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (lineBreak) {
        switch (lineBreak) {
            case 'strict':
                return LINE_BREAK.STRICT;
            case 'normal':
            default:
                return LINE_BREAK.NORMAL;
        }
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/line-break.js-6397edf93f0fb4077a9649e2132c28fa68ec7cbe357494014d0363ce7603dd25.map
//!

;
