"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var LIST_STYLE_POSITION;
(function (LIST_STYLE_POSITION) {
    LIST_STYLE_POSITION[LIST_STYLE_POSITION["INSIDE"] = 0] = "INSIDE";
    LIST_STYLE_POSITION[LIST_STYLE_POSITION["OUTSIDE"] = 1] = "OUTSIDE";
})(LIST_STYLE_POSITION = exports.LIST_STYLE_POSITION || (exports.LIST_STYLE_POSITION = {}));
exports.listStylePosition = {
    name: 'list-style-position',
    initialValue: 'outside',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (position) {
        switch (position) {
            case 'inside':
                return LIST_STYLE_POSITION.INSIDE;
            case 'outside':
            default:
                return LIST_STYLE_POSITION.OUTSIDE;
        }
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/list-style-position.js-57fc97f39ea5f3ae2fc518b2b049929d9cc1875ccb866038c64b08f145e22290.map
//!

;
