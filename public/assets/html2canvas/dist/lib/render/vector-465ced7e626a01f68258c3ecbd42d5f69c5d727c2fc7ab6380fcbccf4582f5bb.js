"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("./path");
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.type = path_1.PathType.VECTOR;
        this.x = x;
        this.y = y;
    }
    Vector.prototype.add = function (deltaX, deltaY) {
        return new Vector(this.x + deltaX, this.y + deltaY);
    };
    return Vector;
}());
exports.Vector = Vector;
exports.isVector = function (path) { return path.type === path_1.PathType.VECTOR; };
//# sourceMappingURL=/assets/html2canvas/dist/lib/render/vector.js-feed5df1c74c80763096b1081d6710184b1aa35f5aae324c68327ad141941921.map
//!

;
