"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_transform_1 = require("../css/property-descriptors/text-transform");
var text_1 = require("../css/layout/text");
var TextContainer = /** @class */ (function () {
    function TextContainer(node, styles) {
        this.text = transform(node.data, styles.textTransform);
        this.textBounds = text_1.parseTextBounds(this.text, styles, node);
    }
    return TextContainer;
}());
exports.TextContainer = TextContainer;
var transform = function (text, transform) {
    switch (transform) {
        case text_transform_1.TEXT_TRANSFORM.LOWERCASE:
            return text.toLowerCase();
        case text_transform_1.TEXT_TRANSFORM.CAPITALIZE:
            return text.replace(CAPITALIZE, capitalize);
        case text_transform_1.TEXT_TRANSFORM.UPPERCASE:
            return text.toUpperCase();
        default:
            return text;
    }
};
var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
var capitalize = function (m, p1, p2) {
    if (m.length > 0) {
        return p1 + p2.toUpperCase();
    }
    return m;
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/dom/text-container.js-00b078643793474cef0b46b46b293ab3c6e9dd295c485a8b473e43a17c51fcf1.map
//!

;
