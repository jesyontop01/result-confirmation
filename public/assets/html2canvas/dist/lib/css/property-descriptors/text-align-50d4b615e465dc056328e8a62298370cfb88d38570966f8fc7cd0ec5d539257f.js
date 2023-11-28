"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var TEXT_ALIGN;
(function (TEXT_ALIGN) {
    TEXT_ALIGN[TEXT_ALIGN["LEFT"] = 0] = "LEFT";
    TEXT_ALIGN[TEXT_ALIGN["CENTER"] = 1] = "CENTER";
    TEXT_ALIGN[TEXT_ALIGN["RIGHT"] = 2] = "RIGHT";
})(TEXT_ALIGN = exports.TEXT_ALIGN || (exports.TEXT_ALIGN = {}));
exports.textAlign = {
    name: 'text-align',
    initialValue: 'left',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (textAlign) {
        switch (textAlign) {
            case 'right':
                return TEXT_ALIGN.RIGHT;
            case 'center':
            case 'justify':
                return TEXT_ALIGN.CENTER;
            case 'left':
            default:
                return TEXT_ALIGN.LEFT;
        }
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/text-align.js-e0dfe954e42b2eea6d50f38e9637d4d6f0308e9b50091a31ad0c5f87a72e1078.map
//!

;
