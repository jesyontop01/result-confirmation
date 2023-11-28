"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockCache = /** @class */ (function () {
    function MockCache() {
        this._cache = {};
    }
    MockCache.prototype.addImage = function (src) {
        var result = Promise.resolve();
        this._cache[src] = result;
        return result;
    };
    return MockCache;
}());
var current = new MockCache();
var CacheStorage = /** @class */ (function () {
    function CacheStorage() {
    }
    CacheStorage.getInstance = function () {
        return current;
    };
    return CacheStorage;
}());
exports.CacheStorage = CacheStorage;
//# sourceMappingURL=/assets/html2canvas/dist/lib/core/__mocks__/cache-storage.js-6d18c9aae1968a4ac9096bf54a7e6bafdf0a44e537486282243984e4d1b7ca55.map
//!

;
