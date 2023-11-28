"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var POSITION;
(function (POSITION) {
    POSITION[POSITION["STATIC"] = 0] = "STATIC";
    POSITION[POSITION["RELATIVE"] = 1] = "RELATIVE";
    POSITION[POSITION["ABSOLUTE"] = 2] = "ABSOLUTE";
    POSITION[POSITION["FIXED"] = 3] = "FIXED";
    POSITION[POSITION["STICKY"] = 4] = "STICKY";
})(POSITION = exports.POSITION || (exports.POSITION = {}));
exports.position = {
    name: 'position',
    initialValue: 'static',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function (position) {
        switch (position) {
            case 'relative':
                return POSITION.RELATIVE;
            case 'absolute':
                return POSITION.ABSOLUTE;
            case 'fixed':
                return POSITION.FIXED;
            case 'sticky':
                return POSITION.STICKY;
        }
        return POSITION.STATIC;
    }
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/property-descriptors/position.js-9e823dfe99779c76b19f8d75805cbab52aee6e9f5b69c93c8a46f7603bfa18a1.map
//!

;
