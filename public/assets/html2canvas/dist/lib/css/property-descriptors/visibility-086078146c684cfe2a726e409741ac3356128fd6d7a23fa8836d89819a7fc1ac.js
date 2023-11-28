"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var VISIBILITY;
(function (VISIBILITY) {
    VISIBILITY[VISIBILITY["VISIBLE"] = 0] = "VISIBLE";
    VISIBILITY[VISIBILITY["HIDDEN"] = 1] = "HIDDEN";
    VISIBILITY[VISIBILITY["COLLAPSE"] = 2] = "COLLAPSE";
})(VISIBILITY = exports.VISIBILITY || (exports.VISIBILITY = {}));
exports.visibility = {
    name: 'visible',
    initialValue: 'none',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (visibility) {
        switch (visibility) {
            case 'hidden':
                return VISIBILITY.HIDDEN;
            case 'collapse':
                return VISIBILITY.COLLAPSE;
            case 'visible':
            default:
                return VISIBILITY.VISIBLE;
        }
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/visibility.js-9d16de5f48dac06627d1043210b67739ecb093e3f46ffb2ba2efb17233d0b964.map
//!

;
