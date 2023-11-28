"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bounds = /** @class */ (function () {
    function Bounds(x, y, w, h) {
        this.left = x;
        this.top = y;
        this.width = w;
        this.height = h;
    }
    Bounds.prototype.add = function (x, y, w, h) {
        return new Bounds(this.left + x, this.top + y, this.width + w, this.height + h);
    };
    Bounds.fromClientRect = function (clientRect) {
        return new Bounds(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
    };
    return Bounds;
}());
exports.Bounds = Bounds;
exports.parseBounds = function (node) {
    return Bounds.fromClientRect(node.getBoundingClientRect());
};
exports.parseDocumentSize = function (document) {
    var body = document.body;
    var documentElement = document.documentElement;
    if (!body || !documentElement) {
        throw new Error("Unable to get document size");
    }
    var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
    var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
    return new Bounds(0, 0, width, height);
};
//# sourceMappingURL=/assets/html2canvas/dist/lib/css/layout/bounds.js-4f6fbdd8700e13224efbea437892796117b9695df47fbf5fad783e94c73b9720.map
//!

;
