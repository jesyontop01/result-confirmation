"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var FONT_STYLE;
(function (FONT_STYLE) {
    FONT_STYLE["NORMAL"] = "normal";
    FONT_STYLE["ITALIC"] = "italic";
    FONT_STYLE["OBLIQUE"] = "oblique";
})(FONT_STYLE = exports.FONT_STYLE || (exports.FONT_STYLE = {}));
exports.fontStyle = {
    name: 'font-style',
    initialValue: 'normal',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (overflow) {
        switch (overflow) {
            case 'oblique':
                return FONT_STYLE.OBLIQUE;
            case 'italic':
                return FONT_STYLE.ITALIC;
            case 'normal':
            default:
                return FONT_STYLE.NORMAL;
        }
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/font-style.js-14273d04d0d1fff5055758c267ef717de2bdc935f04ed8654ea42983fe157581.map
//!

;
