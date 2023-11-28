"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../css/index");
var bounds_1 = require("../css/layout/bounds");
var node_parser_1 = require("./node-parser");
var ElementContainer = /** @class */ (function () {
    function ElementContainer(element) {
        this.styles = new index_1.CSSParsedDeclaration(window.getComputedStyle(element, null));
        this.textNodes = [];
        this.elements = [];
        if (this.styles.transform !== null && node_parser_1.isHTMLElementNode(element)) {
            // getBoundingClientRect takes transforms into account
            element.style.transform = 'none';
        }
        this.bounds = bounds_1.parseBounds(element);
        this.flags = 0;
    }
    return ElementContainer;
}());
exports.ElementContainer = ElementContainer;
//# sourceMappingURL=/assets/html2canvas/dist/lib/dom/element-container.js-30384cb7d9ac96f62381b3d5522c347c2a48db6fbbbc3ade8501844e177aac3c.map
//!

;
